import Capacitor

/// Vue principale de l'app (désignée par `Main.storyboard`) : enregistre les plugins écrits dans ce dépôt pour
/// l'iPhone, qui remplacent ceux d'Android sous le même nom (`src/ios/nativePlugins.js` › `missingOnIos`).
class HalcyaBridgeViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        bridge?.registerPluginInstance(GutEveningPlugin())
        // Capacitor devient le délégué des notifications : il relaie les gestes à ce gestionnaire
        bridge?.notificationRouter.localNotificationHandler = HalcyaNotificationHandler.shared
    }
}
