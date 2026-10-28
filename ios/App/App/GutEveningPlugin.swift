import Capacitor
import HalcyaRules
import UserNotifications

/// Bilan du ventre du soir sur iPhone (étape I5) : même plugin `GutEvening`, mêmes méthodes que la version Android
/// (`GutEveningPlugin.java`), vu de `src/services/gutEvening.js`. Les règles et la boîte sont dans `HalcyaRules`
/// (testées par XCTest) ; ici, la colle avec Capacitor et `UNUserNotificationCenter`.
///
/// iOS ne réveille pas l'app le soir : `configure` programme d'avance les prochains soirs (une notification par soir,
/// sans aujourd'hui si le bilan est fait), et un geste sur Calme / Gêne / Douleur est rangé sans ouvrir l'app
/// (`GutEveningNotifications.answer`, appelé par le délégué de l'app).
@objc(GutEveningPlugin)
public class GutEveningPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "GutEveningPlugin"
    public let jsName = "GutEvening"
    public let pluginMethods: [CAPPluginMethod] = GutEveningPlugin.methods

    private static var methods: [CAPPluginMethod] {
        var methods: [CAPPluginMethod] = [
            CAPPluginMethod(name: "status", returnType: CAPPluginReturnPromise),
            CAPPluginMethod(name: "configure", returnType: CAPPluginReturnPromise),
            CAPPluginMethod(name: "list", returnType: CAPPluginReturnPromise),
            CAPPluginMethod(name: "remove", returnType: CAPPluginReturnPromise),
            CAPPluginMethod(name: "requestNotifications", returnType: CAPPluginReturnPromise),
        ]
        #if DEBUG
        methods.append(CAPPluginMethod(name: "testNotification", returnType: CAPPluginReturnPromise))
        #endif
        return methods
    }

    private let store = GutEveningNotifications.store

    @objc func status(_ call: CAPPluginCall) {
        GutEveningNotifications.status { call.resolve($0) }
    }

    /// { enabled, minuteOfDay, noteDay } → reprogramme les soirs ; rend le nouvel état.
    @objc func configure(_ call: CAPPluginCall) {
        store.configure(enabled: call.getBool("enabled"), minuteOfDay: call.getInt("minuteOfDay"),
                        noteDay: call.getString("noteDay"))
        GutEveningNotifications.reschedule {
            GutEveningNotifications.status { call.resolve($0) }
        }
    }

    @objc func list(_ call: CAPPluginCall) {
        call.resolve(["notes": store.inbox().map { ["name": $0.name, "json": $0.json] }])
    }

    /// Retire les bilans importés : { names: [...] } → { removed }.
    @objc func remove(_ call: CAPPluginCall) {
        guard let names = call.getArray("names", String.self) else {
            call.reject("noms de bilans invalides")
            return
        }
        call.resolve(["removed": store.remove(names: names)])
    }

    #if DEBUG
    /// Build de captures seulement (configuration Debug, jamais livrée) : la notification du soir dans `delay` s (3 par
    /// défaut), en bannière si `banner` (sinon discrète comme la vraie), pour la capturer et y répondre sur simulateur
    /// (`src/ios/captureMode.js` › `probeGutEvening`).
    @objc func testNotification(_ call: CAPPluginCall) {
        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: Double(call.getInt("delay") ?? 3), repeats: false)
        let content = GutEveningNotifications.content()
        if call.getBool("banner") ?? false { content.interruptionLevel = .active }
        let request = UNNotificationRequest(identifier: GutEveningNotifications.requestPrefix + "essai",
                                            content: content, trigger: trigger)
        UNUserNotificationCenter.current().add(request) { error in
            if let error {
                call.reject(error.localizedDescription)
            } else {
                call.resolve()
            }
        }
    }
    #endif

    /// Demande l'autorisation des notifications (une seule fois, iOS ne la redemande plus) ; rend { asked, notifications }.
    @objc func requestNotifications(_ call: CAPPluginCall) {
        let center = UNUserNotificationCenter.current()
        center.getNotificationSettings { settings in
            guard settings.authorizationStatus == .notDetermined else {
                call.resolve(["asked": false, "notifications": GutEveningNotifications.allowed(settings)])
                return
            }
            center.requestAuthorization(options: [.alert]) { granted, _ in
                call.resolve(["asked": true, "notifications": granted])
            }
        }
    }
}

/// Notifications du bilan du ventre du soir : catégorie à trois actions, programmation des soirs, gestes.
enum GutEveningNotifications {
    static let category = "gut-evening"
    static let requestPrefix = "gut-evening-"
    static let store = GutEveningStore(defaults: UserDefaults.standard)

    /// Calme / Gêne / Douleur, sans ouvrir l'app (pas d'option `.foreground`).
    static var notificationCategory: UNNotificationCategory {
        let actions = zip(GutEveningRule.levels, GutEveningRule.labels).map { level, label in
            UNNotificationAction(identifier: requestPrefix + level, title: label, options: [])
        }
        return UNNotificationCategory(identifier: category, actions: actions, intentIdentifiers: [], options: [])
    }

    static func allowed(_ settings: UNNotificationSettings) -> Bool {
        settings.authorizationStatus == .authorized || settings.authorizationStatus == .provisional
    }

    /// « Et votre ventre aujourd'hui ? », discrète comme le canal « bas » d'Android, avec Calme / Gêne / Douleur.
    static func content() -> UNMutableNotificationContent {
        let content = UNMutableNotificationContent()
        content.title = "Et votre ventre aujourd’hui ?"
        content.body = "Dans l’ensemble, d’un geste."
        content.categoryIdentifier = category
        content.interruptionLevel = .passive
        return content
    }

    /// Retire les soirs programmés, puis programme ceux de `store.plan` (rien si éteint).
    static func reschedule(_ done: @escaping () -> Void) {
        let center = UNUserNotificationCenter.current()
        center.getPendingNotificationRequests { pending in
            let old = pending.map(\.identifier).filter { $0.hasPrefix(requestPrefix) }
            center.removePendingNotificationRequests(withIdentifiers: old)
            let calendar = Calendar.current
            let dates = store.plan(now: Date(), calendar: calendar)
            store.nextAt = dates.first.map { $0.timeIntervalSince1970 * 1000 } ?? 0
            for date in dates {
                let parts = calendar.dateComponents([.year, .month, .day, .hour, .minute], from: date)
                let trigger = UNCalendarNotificationTrigger(dateMatching: parts, repeats: false)
                let id = requestPrefix + EveningRule.dayKey(date, calendar: calendar)
                center.add(UNNotificationRequest(identifier: id, content: content(), trigger: trigger))
            }
            done()
        }
    }

    /// Geste sur la notification. Vrai s'il s'agissait d'un bilan du ventre.
    static func answer(_ response: UNNotificationResponse) -> Bool {
        guard response.notification.request.content.categoryIdentifier == category,
              response.actionIdentifier.hasPrefix(requestPrefix) else { return false }
        let level = String(response.actionIdentifier.dropFirst(requestPrefix.count))
        store.answer(level: level, answeredAt: Date(), askedAt: response.notification.date, calendar: Calendar.current)
        return true
    }

    static func status(_ done: @escaping ([String: Any]) -> Void) {
        UNUserNotificationCenter.current().getNotificationSettings { settings in
            done([
                "enabled": store.enabled,
                "minuteOfDay": store.minuteOfDay,
                "nextAt": store.nextAt,
                "notifications": allowed(settings),
                "pending": store.inbox().count,
                "answers": store.answers,
                "noteDay": store.noteDay ?? NSNull(),
            ])
        }
    }
}

/// Reçoit les gestes sur les notifications de Halcya, qu'ils arrivent avant le chargement de Capacitor (app lancée en
/// arrière-plan par le geste : délégué posé par `AppDelegate`) ou après (relayés par le `NotificationRouter` de
/// Capacitor, qui devient alors le délégué).
final class HalcyaNotificationHandler: NSObject, UNUserNotificationCenterDelegate, NotificationHandlerProtocol {
    static let shared = HalcyaNotificationHandler()

    func willPresent(notification: UNNotification) -> UNNotificationPresentationOptions {
        [.banner, .list]
    }

    func didReceive(response: UNNotificationResponse) {
        _ = GutEveningNotifications.answer(response)
    }

    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification,
                                withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        completionHandler(willPresent(notification: notification))
    }

    func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse,
                                withCompletionHandler completionHandler: @escaping () -> Void) {
        didReceive(response: response)
        completionHandler()
    }
}
