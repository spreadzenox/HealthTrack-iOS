import Capacitor

/// Vue principale de l'app (désignée par `Main.storyboard`) : enregistre les plugins écrits dans ce dépôt pour
/// l'iPhone, qui remplacent ceux d'Android sous le même nom (`src/ios/nativePlugins.js` › `missingOnIos`).
class HalcyaBridgeViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        bridge?.registerPluginInstance(GutEveningPlugin())
        bridge?.registerPluginInstance(EveningNotePlugin())
        bridge?.registerPluginInstance(PortionReminderPlugin())
        bridge?.registerPluginInstance(BackupMarkerPlugin())
        bridge?.registerPluginInstance(AppStoreBillingPlugin()) // inactif côté JS tant que FEATURES.billing est faux
        bridge?.registerPluginInstance(VoiceProbePlugin())
        #if DEBUG
        bridge?.registerPluginInstance(CaptureProbePlugin()) // build de captures seulement
        #endif
        // Capacitor devient le délégué des notifications : il relaie les gestes à ce gestionnaire
        bridge?.notificationRouter.localNotificationHandler = HalcyaNotificationHandler.shared
    }
}
