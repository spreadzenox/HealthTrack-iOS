import XCTest
@testable import HalcyaRules

/// Abonnement App Store (étape I6) : les produits de StoreKit 2 rendus sous la forme des ProductDetails du plugin
/// PlayBilling d'Android, pour que `describePlans` et le reste de `playBilling.js` servent tels quels.
final class BillingRuleTests: XCTestCase {
    func testAnnuelAvecEssaiDe14JoursCommeUneOffreDePlay() throws {
        let offer = try XCTUnwrap(BillingRule.offer(
            storeId: "halcya_premium_annuel", displayPrice: "29,99 €", price: Decimal(string: "29.99")!, currency: "EUR",
            period: .init(value: 1, unit: "Y"), trial: .init(value: 2, unit: "W")
        ))
        XCTAssertEqual(offer["basePlanId"] as? String, "annuel")
        XCTAssertEqual(offer["offerToken"] as? String, "halcya_premium_annuel")
        let phases = try XCTUnwrap(offer["phases"] as? [[String: Any]])
        XCTAssertEqual(phases.count, 2)
        XCTAssertEqual(phases[0]["priceMicros"] as? Int, 0)
        XCTAssertEqual(phases[0]["billingPeriod"] as? String, "P2W")
        XCTAssertEqual(phases[1]["priceMicros"] as? Int, 29_990_000)
        XCTAssertEqual(phases[1]["formattedPrice"] as? String, "29,99 €")
        XCTAssertEqual(phases[1]["billingPeriod"] as? String, "P1Y")
        XCTAssertEqual(phases[1]["currency"] as? String, "EUR")
    }

    /// Sans droit à l'essai (déjà utilisé), seule la phase payante : comme Google, qui ne renvoie que les offres permises
    func testMensuelSansEssai() throws {
        let offer = try XCTUnwrap(BillingRule.offer(
            storeId: "halcya_premium_mensuel", displayPrice: "2,99 €", price: Decimal(string: "2.99")!, currency: "EUR",
            period: .init(value: 1, unit: "M"), trial: nil
        ))
        XCTAssertEqual(offer["basePlanId"] as? String, "mensuel")
        let phases = try XCTUnwrap(offer["phases"] as? [[String: Any]])
        XCTAssertEqual(phases.map { $0["billingPeriod"] as? String }, ["P1M"])
        XCTAssertEqual(phases[0]["priceMicros"] as? Int, 2_990_000)
    }

    func testProduitInconnuIgnore() {
        XCTAssertNil(BillingRule.offer(storeId: "autre", displayPrice: "1 €", price: 1, currency: "EUR", period: .init(value: 1, unit: "M"), trial: nil))
    }

    func testUnSeulProduitHalcyaPremiumAvecSesFormules() throws {
        let product = BillingRule.product(offers: [["basePlanId": "annuel"], ["basePlanId": "mensuel"]])
        XCTAssertEqual(product["productId"] as? String, "halcya_premium")
        XCTAssertEqual((product["offers"] as? [[String: Any]])?.count, 2)
        XCTAssertEqual(BillingRule.storeIds, ["halcya_premium_annuel", "halcya_premium_mensuel"])
    }

    /// `appAccountToken` est un UUID : tiré de l'empreinte SHA-256 (hex) que l'app donne déjà à Google Play
    func testJetonDeCompteTireDeLEmpreinte() {
        let hex = "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
        XCTAssertEqual(BillingRule.accountToken(hex)?.uuidString.lowercased(), "01234567-89ab-cdef-0123-456789abcdef")
        XCTAssertNil(BillingRule.accountToken("pas-hex"))
        XCTAssertNil(BillingRule.accountToken("0123"))
    }
}
