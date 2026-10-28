import Capacitor
import Foundation
import HalcyaRules
import StoreKit

/// Abonnement App Store, sur iPhone (étape I6) : StoreKit 2, rendu sous la même forme que le plugin PlayBilling
/// d'Android (`src/services/playBilling.js` : `getProducts`, `purchase`, `queryPurchases`, événement
/// `purchasesUpdated`) ; conversion dans `HalcyaRules` › `BillingRule`. Le jeton d'achat envoyé au relais est la
/// transaction signée par Apple (`jwsRepresentation`) : l'app ne décide jamais seule d'un droit. Inactif côté JS tant
/// que `FEATURES.billing` est faux pour la variante appstore (le relais doit d'abord vérifier les achats d'Apple).
@objc(AppStoreBillingPlugin)
public class AppStoreBillingPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "AppStoreBillingPlugin"
    public let jsName = "AppStoreBilling"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getProducts", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "purchase", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "queryPurchases", returnType: CAPPluginReturnPromise),
    ]
    private var updates: Task<Void, Never>?

    /// Achats qui se terminent hors du parcours d'achat (paiement en attente confirmé, achat fait ailleurs) : comme
    /// l'écoute `purchasesUpdated` de Play Billing.
    override public func load() {
        updates = Task { [weak self] in
            for await result in Transaction.updates {
                if case .verified(let transaction) = result { await transaction.finish() }
                guard let self else { return }
                self.notifyListeners("purchasesUpdated", data: ["code": 0, "purchases": [Self.purchase(result)].compactMap { $0 }])
            }
        }
    }

    deinit {
        updates?.cancel()
    }

    @objc func getProducts(_ call: CAPPluginCall) {
        Task {
            do {
                let products = try await Product.products(for: BillingRule.storeIds)
                var offers: [[String: Any]] = []
                for storeId in BillingRule.storeIds {
                    guard let product = products.first(where: { $0.id == storeId }), let subscription = product.subscription else { continue }
                    // Comme Google, l'essai n'est proposé qu'à qui y a droit
                    let intro = subscription.introductoryOffer
                    let eligible = await subscription.isEligibleForIntroOffer
                    let trial = eligible && intro?.paymentMode == .freeTrial ? intro.map { Self.period($0.period) } : nil
                    if let offer = BillingRule.offer(
                        storeId: product.id, displayPrice: product.displayPrice, price: product.price,
                        currency: product.priceFormatStyle.currencyCode, period: Self.period(subscription.subscriptionPeriod), trial: trial
                    ) {
                        offers.append(offer)
                    }
                }
                call.resolve(["products": offers.isEmpty ? [] : [BillingRule.product(offers: offers)]])
            } catch {
                call.reject("formules indisponibles")
            }
        }
    }

    @objc func purchase(_ call: CAPPluginCall) {
        let storeId = call.getString("offerToken") ?? ""
        let account = BillingRule.accountToken(call.getString("obfuscatedAccountId") ?? "")
        Task {
            do {
                guard let product = try await Product.products(for: [storeId]).first else {
                    call.reject("formule inconnue")
                    return
                }
                var options: Set<Product.PurchaseOption> = []
                if let account { options.insert(.appAccountToken(account)) }
                switch try await product.purchase(options: options) {
                case .success(let result):
                    if case .verified(let transaction) = result { await transaction.finish() }
                    call.resolve(["status": "ok", "purchases": [Self.purchase(result)].compactMap { $0 }])
                case .pending:
                    call.resolve(["status": "pending", "purchases": []])
                case .userCancelled:
                    call.resolve(["status": "cancelled", "purchases": []])
                @unknown default:
                    call.resolve(["status": "error", "purchases": []])
                }
            } catch {
                call.reject("achat impossible")
            }
        }
    }

    /// « Restaurer un achat » et relecture à l'ouverture : les abonnements en cours de ce compte Apple.
    @objc func queryPurchases(_ call: CAPPluginCall) {
        Task {
            var purchases: [[String: Any]] = []
            for await result in Transaction.currentEntitlements {
                if let purchase = Self.purchase(result) { purchases.append(purchase) }
            }
            call.resolve(["purchases": purchases])
        }
    }

    /// Achat sous la forme de Play ; `purchaseToken` = la transaction signée par Apple, vérifiée par le relais.
    static func purchase(_ result: VerificationResult<Transaction>) -> [String: Any]? {
        guard case .verified(let transaction) = result, BillingRule.storeIds.contains(transaction.productID),
              transaction.revocationDate == nil else { return nil }
        return ["state": "purchased", "products": [BillingRule.productId], "purchaseToken": result.jwsRepresentation]
    }

    private static func period(_ period: Product.SubscriptionPeriod) -> BillingRule.Period {
        switch period.unit {
        case .day: return .init(value: period.value, unit: "D")
        case .week: return .init(value: period.value, unit: "W")
        case .month: return .init(value: period.value, unit: "M")
        case .year: return .init(value: period.value, unit: "Y")
        @unknown default: return .init(value: period.value, unit: "D")
        }
    }
}
