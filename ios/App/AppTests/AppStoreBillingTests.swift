import StoreKit
import StoreKitTest
import XCTest
@testable import App

/// Abonnement App Store (étape I6), sans compte Apple : StoreKit Test, avec le fichier `Halcya.storekit` de cette
/// cible (deux formules, essai gratuit de 2 semaines sur l'annuel, prix d'essai fictifs). Cible hébergée par l'app :
/// une session créée depuis un test d'interface, dans un autre processus, est refusée (`journal/RECHERCHE.md`, 28/10).
final class AppStoreBillingTests: XCTestCase {
    private var session: SKTestSession!

    override func setUpWithError() throws {
        let url = try XCTUnwrap(Bundle(for: Self.self).url(forResource: "Halcya", withExtension: "storekit"))
        session = try SKTestSession(contentsOf: url)
        session.disableDialogs = true
        session.clearTransactions()
    }

    func testFormulesLuesDansStoreKit() async throws {
        let products = try await Product.products(for: ["halcya_premium_annuel", "halcya_premium_mensuel"])
        XCTAssertEqual(Set(products.map(\.id)), ["halcya_premium_annuel", "halcya_premium_mensuel"])
        let annuel = try XCTUnwrap(products.first { $0.id == "halcya_premium_annuel" })
        XCTAssertEqual(annuel.subscription?.subscriptionPeriod.unit, .year)
        XCTAssertEqual(annuel.subscription?.introductoryOffer?.paymentMode, .freeTrial)
        let eligible = await annuel.subscription?.isEligibleForIntroOffer
        XCTAssertEqual(eligible, true)
    }

    func testAchatDEssaiRenduCommeUnAchatPlayEtGardeDansLesAbonnementsEnCours() async throws {
        let compte = try XCTUnwrap(UUID(uuidString: "01234567-89ab-cdef-0123-456789abcdef"))
        let mensuel = try XCTUnwrap(try await Product.products(for: ["halcya_premium_mensuel"]).first)
        guard case .success(let resultat) = try await mensuel.purchase(options: [.appAccountToken(compte)]) else {
            return XCTFail("achat d'essai non abouti")
        }
        let achat = try XCTUnwrap(AppStoreBillingPlugin.purchase(resultat))
        XCTAssertEqual(achat["state"] as? String, "purchased")
        XCTAssertEqual(achat["products"] as? [String], ["halcya_premium"])
        XCTAssertEqual((achat["purchaseToken"] as? String)?.split(separator: ".").count, 3) // JWS signé
        guard case .verified(let transaction) = resultat else { return XCTFail("transaction non vérifiée") }
        XCTAssertEqual(transaction.appAccountToken, compte)
        await transaction.finish()
        var enCours: [String] = []
        for await droit in Transaction.currentEntitlements {
            if case .verified(let t) = droit { enCours.append(t.productID) }
        }
        XCTAssertEqual(enCours, ["halcya_premium_mensuel"])
    }
}
