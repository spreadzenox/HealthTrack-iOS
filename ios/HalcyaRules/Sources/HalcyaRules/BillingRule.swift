import Foundation

/// Abonnement App Store (étape I6) : les produits de StoreKit 2 rendus sous la forme des ProductDetails réduits du
/// plugin PlayBilling d'Android (`src/services/playBilling.js` › `describePlans`). Google Play a un abonnement
/// `halcya_premium` à deux formules (« base plans » `annuel` et `mensuel`) ; l'App Store, deux produits d'un même
/// groupe d'abonnements, rendus ici comme ces deux formules. L'offre d'essai n'est rendue que si la personne y a
/// droit, comme Google.
public enum BillingRule {
    public static let productId = "halcya_premium"
    /// Produit App Store → formule de Google Play, dans l'ordre d'affichage.
    public static let plans: [(storeId: String, basePlanId: String)] = [
        ("halcya_premium_annuel", "annuel"),
        ("halcya_premium_mensuel", "mensuel"),
    ]
    public static var storeIds: [String] { plans.map(\.storeId) }

    /// Durée d'abonnement ou d'essai, `unit` : « D », « W », « M » ou « Y » (ISO 8601, comme Google Play).
    public struct Period {
        public let value: Int
        public let unit: String
        public init(value: Int, unit: String) {
            self.value = value
            self.unit = unit
        }

        public var iso: String { "P\(value)\(unit)" }
    }

    public static func micros(_ price: Decimal) -> Int {
        var scaled = price * 1_000_000
        var rounded = Decimal()
        NSDecimalRound(&rounded, &scaled, 0, .plain)
        return NSDecimalNumber(decimal: rounded).intValue
    }

    /// Une formule sous la forme d'une offre de Play ; nil pour un produit qui n'est pas une formule de Halcya.
    public static func offer(storeId: String, displayPrice: String, price: Decimal, currency: String, period: Period, trial: Period?) -> [String: Any]? {
        guard let basePlanId = plans.first(where: { $0.storeId == storeId })?.basePlanId else { return nil }
        var phases: [[String: Any]] = []
        if let trial {
            phases.append(["priceMicros": 0, "formattedPrice": "", "billingPeriod": trial.iso, "currency": currency])
        }
        phases.append(["priceMicros": micros(price), "formattedPrice": displayPrice, "billingPeriod": period.iso, "currency": currency])
        return ["basePlanId": basePlanId, "offerToken": storeId, "phases": phases]
    }

    public static func product(offers: [[String: Any]]) -> [String: Any] {
        ["productId": productId, "offers": offers]
    }

    /// `appAccountToken` d'Apple (un UUID) tiré de `obfuscatedAccountId` (empreinte SHA-256 en hexadécimal que l'app
    /// donne déjà à Google Play) : ses 32 premiers chiffres. Le relais devra faire de même pour relier l'achat.
    public static func accountToken(_ hex: String) -> UUID? {
        let digits = Array(hex.lowercased())
        guard digits.count >= 32, digits.prefix(32).allSatisfy(\.isHexDigit) else { return nil }
        let s = String(digits.prefix(32))
        let parts = [s.prefix(8), s.dropFirst(8).prefix(4), s.dropFirst(12).prefix(4), s.dropFirst(16).prefix(4), s.dropFirst(20)]
        return UUID(uuidString: parts.joined(separator: "-"))
    }
}
