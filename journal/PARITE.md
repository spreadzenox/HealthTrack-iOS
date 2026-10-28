# Matrice de parité Android (variante play) → iOS

> **La vérité sur l'avancement d'iOS.** Tenue à jour à chaque run de la routine iOS. Référence : la variante
> **play** (Google Play). Graine écrite à la mise en place (26/10/2026) à partir des plugins natifs et de
> `app/src/config/distribution.js` : **l'étape I2 la complète fonction par fonction** (changelog, `journal/PRODUIT.md`,
> écrans) et vérifie chaque hypothèse ci-dessous (marquées « à vérifier »).

Légende : ✅ fait et vérifié sur iOS (preuve : capture, test ou workflow) · 🟡 partiel ou pas encore vérifié ·
❌ manquant · ⛔ impossible sur iOS (raison + source datée + alternative) · — sans objet sur iOS.

**Parité** : **30 %** au 28/10 08:55 (14 ✅ sur 47 lignes faisables ; 3 ⛔ et 3 — exclues) = ✅ / (toutes les lignes
des sections 1 à 4 sauf ⛔ et —). Calcul : compter la colonne « État » ; un 🟡 ne compte pas tant qu'il n'est pas
vérifié sur iOS.
**Dernière version Android suivie** : v548 (commit `b8bddfe`, 28/10/2026), voir `upstream.json`.

## 1. Socle

| Fonction (play) | Android | iOS | État | Notes |
|---|---|---|---|---|
| Projet natif | `app/android` (Capacitor 8) | `ios/` de ce dépôt (Capacitor iOS 8.2, Swift Package Manager, 6 plugins iOS), copié dans `upstream/app/ios` | ✅ | créé le 27/10 ; build Xcode 26.6 ✅ (PR #1) |
| Build CI | `Play — AAB` (signé, `main`) | `ios-build.yml` : tests d'Android avec correctifs (Ubuntu) + build simulateur et captures (macOS, branche `captures/…`) | ✅ | simulateur (PR #1) ; signé en I9 |
| Numéro de version | `git rev-list --count HEAD` | même nombre en `CFBundleShortVersionString` (`MARKETING_VERSION`), build `<android>.<ios>` (`CURRENT_PROJECT_VERSION`) | ✅ | passés à `xcodebuild` par le workflow ; affichage à vérifier en capture ; 27/10 : « Version 524 » affiché en bas de Paramètres sur iPhone simulé (captures défilées, PR #5) |
| Nom « Halcya », icône « H nuit », écran de démarrage | ✅ | `CFBundleDisplayName` Halcya, AppIcon 1024 opaque et écran de démarrage encre générés depuis le glyphe d'Android (`scripts/ios-icons.mjs`) | 🟡 | à vérifier sur l'écran d'accueil d'un simulateur |
| Variante de distribution | `play` | `appstore` (`patches/01-variante-appstore.patch`) | ✅ | comme play (relais IA, visage à l'ouverture, pas d'auto-mise à jour), sans abonnement jusqu'à I6 ; tests `overlay/…/distribution.appstore.test.js` |
| Zones sûres, barres système | `SystemBarsPlugin`, `--safe-top/--safe-bottom` | encoche / Dynamic Island / indicateur d'accueil | ✅ | onboarding et Accueil corrects sur 16e et 17 Pro (27/10) ; bas de l'onboarding sur 390 × 844 à revoir (I2). Thème : clair par défaut comme Android, le sombre est un réglage de l'app (pas un défaut) ; 27/10 : en-tête sous la barre d'état et la Dynamic Island, barre d'onglets au-dessus de l'indicateur d'accueil, icônes de la barre d'état lisibles en sombre (captures iPhone 16e et 17 Pro, PR #5) ; geste de retour à vérifier sur l'iPhone 12 |
| Mise à jour de l'app | Play Store | App Store | — | pas de bandeau de mise à jour |

## 2. Écrans (code web partagé : arrivent avec le socle, à vérifier en captures)

| Écran | État | Notes |
|---|---|---|
| Onboarding (objectif, sources, autorisations, paywall passable) | 🟡 | autorisations iOS : HealthKit, caméra, notifications, Bluetooth |
| Accueil « Aujourd'hui » (bien-être estimé, tuiles, ventre, boutons, pistes) | ✅ | 27/10 : affiché correctement sur iPhone simulé (captures des PR #2 et #3, données de démo, clair et sombre), gestes à confirmer sur l'iPhone 12 |
| Journal (derniers jours, repas, galerie, tendances) | ✅ | 27/10 : affiché correctement sur iPhone simulé (captures des PR #2 et #3, données de démo, clair et sombre), gestes à confirmer sur l'iPhone 12 |
| Photo du repas + analyse IA (relais) | 🟡 | caméra / photothèque dans WKWebView, divulgation |
| Nutrition (Ciqual) | ✅ | 27/10 : affiché correctement sur iPhone simulé (captures des PR #2 et #3, données de démo, en clair), gestes à confirmer sur l'iPhone 12 |
| Analyses (pistes repas → ventre, délais) | ✅ | 27/10 : affiché correctement sur iPhone simulé (captures des PR #2 et #3, données de démo, clair et sombre), gestes à confirmer sur l'iPhone 12 |
| Réintroduction FODMAP guidée | ✅ | rappel de portion : voir §3 ; 27/10 : affiché correctement sur iPhone simulé (captures des PR #2 et #3, données de démo, en clair), gestes à confirmer sur l'iPhone 12 |
| Rapport PDF médecin | 🟡 | partage / enregistrement du fichier sur iOS : `saveAndShareReport` n'écrit dans Documents + feuille de partage que sur Android ; sur iOS il tente un téléchargement web (à vérifier, sinon correctif I2) |
| Sources (détection automatique) | 🟡 | sources iOS différentes : Santé (HealthKit) au lieu de Health Connect ; 27/10 : `canOpenURL` appelé avec des noms de paquets Android, refusés par iOS ; carte « Lecture du visage » en erreur (plugin absent) → I2 ; 27/10 (captures défilées) : la carte Health Connect garde sa description Android (« Importe ce que vos apps santé écrivent dans Health Connect… ») → I4 (HealthKit) |
| Données (export / import JSON et CSV) | 🟡 | partage de fichier iOS (`@capacitor/filesystem` + feuille de partage) ; 27/10 : hors Android, l'export passe par un lien de téléchargement que WKWebView ignore → I2/I3 ; texte « sauvegarde Google » retiré (PR #3) |
| Paramètres, mode diagnostic caché (7 touches) | ✅ | 27/10 : affiché correctement sur iPhone simulé (captures des PR #2 et #3, données de démo, en clair), gestes à confirmer sur l'iPhone 12 |
| Premium / paywall | ❌ | prix lus dans StoreKit, jamais codés en dur ; 27/10 : affiche « L'abonnement se prend depuis la version Google Play de l'app » (texte de la sideload) → PR #3 : « Sur iPhone, l'abonnement par l'App Store arrive bientôt » |
| Période de lancement (premium offert jusqu'au 20/11, Nouveautés du 24 et 25/10) | 🟡 | sur iPhone, `premium = !FEATURES.billing || …` ouvre déjà tout le premium tant que l'abonnement App Store n'existe pas (I6) ; après le 20/11, Android le fera payer et iOS non : à aligner en I6 |
| « Donnez-nous votre avis » (Nouveautés du 25/10) | 🟡 | code web partagé, lien à essayer depuis l'iPhone |
| Nouveautés | 🟡 | `variants: ["appstore"]`, historique iOS depuis le lancement iOS |
| Confidentialité, conditions | 🟡 | textes à rendre exacts pour iOS (iCloud au lieu de la sauvegarde Android, HealthKit) |

**Nouveautés d'Android (206 entrées au 27/10, toutes visibles dans la variante play)** : 77 touchent au natif.
Elles se rangent dans les lignes de §3 : montre Huawei en direct (≈ 35 entrées, 11→25/10), capteurs Bluetooth
(12/10), temps d'écran et sommeil estimé du téléphone (12/10), lecture du visage (≈ 12 entrées, 18→23/10),
notifications (note du soir 19/10, bilan du ventre 26/10, rappel de portion 26/10, fin d'essai 24/10), abonnement
et premium (23→27/10), sauvegarde du téléphone (10 et 24/10), Health Connect (23/10), mise à jour en un clic (20/10,
sideload : —), diagnostic de la voix (20/10). Les 129 autres sont du code web partagé (repas, nutrition, FODMAP,
analyses, journal, Accueil) : ils arrivent avec `upstream.json` et sont couverts par les lignes d'écrans de §2.

## 3. Natif : plugins et services

| Fonction (play) | Android | iOS (piste) | État | Notes |
|---|---|---|---|---|
| Santé : imports et historique | Health Connect (`@capgo/capacitor-health`, patch Android) | HealthKit par le même plugin et le même connecteur (code iOS du plugin vérifié le 27/10) | 🟡 | 27/10 : entitlement et phrase d'usage en place ; HealthKit disponible et feuille d'autorisation affichée sur simulateur (PR #7) ; connecteur branché sur HealthKit avec ses textes iPhone (PR #9) ; 27/10 22:40 : feuille acceptée par un test d'interface, 1234 pas écrits puis relus sur simulateur (PR #12) ; 23:50 : relus aussi par le connecteur de l'app sur les deux iPhone (PR #15) ; 28/10 : VFC lue en SDNN, rangée à part de la RMSSD d'Android et montrée « VFC (SDNN) » dans le Journal (PR #16, mergée : 48 ms écrits puis relus en SDNN sur les deux iPhone) ; reste : pas importés visibles dans le Journal en capture, norme personnelle SDNN, iPhone 12 |
| Abonnement | `PlayBillingPlugin` (play) | StoreKit 2 (plugin Swift) | ❌ | I6 ; mêmes formules, essai 14 j |
| Vérification des achats par le relais | Play Developer API, RTDN | JWS signés par Apple vérifiés par le relais, App Store Server Notifications V2 | ❌ | I6 ; le relais est dans HealthTrack : `DEMANDES.md` |
| Anti-abus des crédits IA | `PlayIntegrityPlugin` | App Attest (DeviceCheck) | ❌ | I6 ; vérification côté relais : `DEMANDES.md`. 27/10 : le relais est en `INTEGRITY_MODE=observe` (`relay-deploy.yml`), l'analyse des repas passe donc sans jeton depuis l'iPhone ; en `enforce`, elle serait refusée (403) tant qu'App Attest n'est pas accepté |
| Rappel de fin d'essai | `TrialReminderPlugin` | notification locale | ❌ | I5/I6 |
| Bilan du ventre du soir (notification à actions) | `GutEveningPlugin` | `UNNotificationCategory` + actions, réponse rangée à l'ouverture | ✅ | I5 : plugin en Swift (PR #20), soirs programmés d'avance ; sur les deux iPhone simulés : notification affichée, « Gêne » touché depuis la bannière dépliée et rangé sans ouvrir l'app (PR #23), puis entré dans l'historique par l'import de l'app (PR #25 : inserted 1, boîte vide) ; geste à refaire sur l'iPhone 12 |
| Note du soir | `EveningNotePlugin` | idem | ✅ | I5 : plugin en Swift (PR #24) ; sur les deux iPhone simulés, les 6 notes s'affichent dans la notification dépliée, la note touchée est rangée sans ouvrir l'app puis entre dans l'historique par l'import de l'app (PR #26 : inserted 1, boîte vide) ; geste à refaire sur l'iPhone 12 |
| Rappel de la portion du jour | `PortionReminderPlugin` | notifications locales programmées d'avance, toucher retenu (`takeOpen`) | ✅ | I5 : plugin en Swift (PR #24) ; sur les deux iPhone simulés, rappel programmé par `schedule`, bannière touchée app en arrière-plan → la réintroduction s'ouvre (signal du natif + correctif 18 ; PR #24 et #25) ; vrai rappel du jour à voir sur l'iPhone 12 |
| Bien-être par le visage, à l'ouverture de l'app | `FaceSensePlugin`, ONNX / LiteRT | Vision + ONNX Runtime iOS ou Core ML ; mêmes scores sur `journal/protocoles/visage-*.py` | ❌ | I7 |
| Bien-être par le visage, au déverrouillage | `FaceSenseService` (service caméra de premier plan) | — | ⛔ à confirmer | iOS n'autorise pas la caméra en arrière-plan ; alternative : ouverture de l'app, widget, raccourci |
| Voix | `VoiceProbePlugin` | AVAudioEngine, traitement local | ❌ | I8 |
| Temps d'écran / usage du téléphone | `PhoneUsagePlugin` (UsageStats) | API Temps d'écran (DeviceActivity) | ⛔ à confirmer | données non lisibles par l'app d'après ce qu'on sait ; I8 |
| Montre Huawei en direct | `BtClassicPlugin`, `RfcommTransport`, `huawei/*` (RFCOMM) | CoreBluetooth (BLE seulement) | ⛔/🔬 à étudier | pas de RFCOMM sans MFi ; piste BLE ; Huawei Santé iOS écrit une partie dans Santé → HealthKit |
| Synchro montre en arrière-plan | `WatchSyncJob`, `BackgroundWatchSync`, `WatchPresenceService` | BGTaskScheduler | dépend de la ligne précédente | |
| Coffre de la montre (clés) | `WatchVaultPlugin` | Trousseau « ThisDeviceOnly » | dépend | |
| Captures de trames montre (diagnostic) | `WatchCapturePlugin` | — | dépend | |
| Applications installées / compagnons | `AppManagerPlugin`, `CompanionPlugin`, `devices/phoneApps.js` | `canOpenURL` sur schémas déclarés | 🔬 | iOS ne liste pas les apps installées |
| Sauvegarde du téléphone (décision du 24/10 : conservée) | sauvegarde Android + règles d'exclusion, `BackupMarkerPlugin`, `restoreGuard.js` | sauvegarde iCloud du conteneur ; secrets exclus (Trousseau ThisDeviceOnly) | ❌ | I3 |
| Persistance des données locales | IndexedDB (WebView Android) | IndexedDB (WKWebView) | 🔬 | I3 : risque d'effacement à étudier |
| Ouvrir une autre app | `@capacitor/app-launcher` | idem (iOS supporté) | 🟡 | |
| Fichiers (export) | `@capacitor/filesystem` | idem (iOS supporté) | 🟡 | |
| BLE générique | `@capacitor-community/bluetooth-le` | idem (iOS supporté) | 🟡 | phrase `NSBluetoothAlwaysUsageDescription` ajoutée (PR #3) ; la carte « Capteurs Bluetooth » est active sur iPhone, à essayer sur l'iPhone 12 (A1) |
| Mise à jour par APK | `AppUpdatePlugin`, `@m430/capacitor-app-install` | — | — | sideload seulement |

## 4. Store et conformité

| Fonction (play) | Android | iOS | État | Notes |
|---|---|---|---|---|
| Piste de test interne automatique | test interne Play à chaque version | TestFlight interne à chaque version | ❌ | après A1–A3 |
| Test fermé | piste Alpha + groupe | TestFlight externe (examen bêta d'Apple) | ❌ | A6 |
| Fiche du Store fr-FR (titre, textes, captures, icône) | `app/store/`, `Play — fiche du Store` | `store/` de ce dépôt | ❌ | sous-titre 30 caractères, captures 6,9" |
| Sécurité des données | `app/store/data-safety` | « Confidentialité de l'app » (A5) + `PrivacyInfo.xcprivacy` | ❌ | |
| Déclarations santé, âge 18+ | Contenu de l'app | classification par âge, directives santé d'Apple | ❌ | |
| Chiffrement à l'export | — | `ITSAppUsesNonExemptEncryption` | ❌ | |
| Production | « Promouvoir la version » (propriétaire) | « Soumettre pour examen » puis publier (propriétaire) | — | A6 |

## 5. Suivi des livraisons Android

Une ligne par livraison Android reportée ici (date, PR `[Auto]`, ce que ça change pour iOS, état).

| Date | PR Android | Ce que ça demande côté iOS | État |
|---|---|---|---|
| 28/10 10:00 | #461, #462, #463 (v548) | #463 « piste solide » seulement à partir de 8 jours de chaque côté (`statistics.js`, `behaviorTags.js`) : analyse partagée, arrive telle quelle, note de Nouveautés vraie sur iPhone ; #461, #462 journal d'Android (audit écran par écran de la version Play, POL-PLAY-21 à 28, à relire pour le §2) | — |
| 28/10 09:05 | #460 (v545) | écart à la norme (FC repos, VFC) en gris au lieu d'orange, la norme en vert (`BaselineCards.css`) : CSS partagé, vaut aussi pour la carte « VFC (SDNN) » d'iPhone ; note de Nouveautés vraie sur iPhone ; le correctif 20 s'applique toujours | — |
| 28/10 08:05 | #458, #459 (v544) | #459 onglets du Journal lisibles sur petit écran (`TabBar.css` : largeur selon le libellé, marge, police réduite sous 380 px) : CSS partagé, vaut aussi pour l'iPhone 12 (390 points) ; sa note de Nouveautés est vraie sur iPhone ; contrôle « texte qui déborde » ajouté au script visuel d'Android (Android seulement) ; #458 journal d'Android | — |
| 28/10 06:05 | #456, #457 (v542) | #457 « robots du rapport de pré-lancement comptés à part » : l'app signale au relais un appareil de test de Google (Firebase Test Lab, `isTestDevice`, en-tête `X-Test-Device`) ; sur iPhone, `loadIntegrityPlugin` rend `null` hors Android → jamais signalé, rien à faire (pas d'équivalent des robots de Google chez Apple) ; ajout à la politique de confidentialité sur ces appareils de test (Google seulement) ; #456 journal d'Android | — |
| 28/10 05:05 | #453, #455 (v540) | #453 table Ciqual embarquée une seule fois, plugin d'installation d'APK retiré : code partagé, arrive tel quel ; #455 montre Huawei « À reconnecter » après une restauration de la sauvegarde Android (`restoreGuard.js`) : sans objet sur iPhone (pas de `BackupMarker`, pas de montre Huawei en direct), mais sa note de Nouveautés parle de la sauvegarde Android (même demande que pour #444) ; le correctif 10 ne s'appliquait plus (import ajouté au même endroit) : refait, mêmes changements | — |
| 28/10 04:05 | #451 (v536) | le relais IA reçoit, sans jeton Play Integrity, la raison de son absence (`X-Integrity-Status`) : sur iPhone, `no_plugin` (pas de plugin Play Integrity), indiscernable d'un Android sans plugin → précisé dans `DEMANDES.md` | — |
| 28/10 03:05 | #449 (v534) | R8 (optimisation et obscurcissement) de la version Play : natif Android et CI seulement, sans objet sur iOS | — |
| 28/10 02:05 | #447, #448 (v533) | #447 textes plus clairs (stress de la montre en mots dans le Journal, Analyses, Paramètres) : code web partagé, arrive tel quel (le correctif 17 de `journalChips.js` s'applique toujours) ; #448 répare les tests `UpdateBanner` et Réintroduction (même correction que le correctif 18 d'iOS, retiré) | — |
| 28/10 01:05 | #446 (v531) | « Votre ventre » le soir : une seule question à l'Accueil (`TodayCards`) : code web partagé, arrive tel quel ; à revoir en capture le soir quand la version iOS aura ses notifications du soir (I5) | — |
| 28/10 00:05 | #444, #445 (v530) | #444 « bord à bord » sous Android 8 à 14 : natif Android seulement (`MainActivity`, `SystemBarsPlugin.java`), sans objet sur iOS (l'app y est déjà sous les barres, zones sûres vérifiées en captures) ; sa note « Plein écran aussi sous Android 8 à 14 » n'a pas de `variants` et s'afficherait dans les Nouveautés sur iPhone (→ `DEMANDES.md`) ; #445 une seule piste « mouvement » dans Analyses : code web partagé, arrive tel quel | — |
| 27/10 22:05 | #443 (pas de nouvelle version) | journal seul (idées « bord à bord » et R8 prêtes à coder) : rien à faire tant que ce n'est pas codé ; le « bord à bord » touchera peut-être les marges du code web partagé → à revérifier en captures (zones sûres de l'iPhone) quand il arrivera | — |
| 27/10 20:05 | #441, #442 (v527) | tuiles « hier », repas sur une ligne, une seule piste « calories » dans Analyses : code web partagé, arrive tel quel | — |
| 27/10 18:05 | #440 (v525) | « hier à 10:19 », plus de « Health Connect » dans un titre d'Analyses : code web partagé, arrive tel quel (bon pour iOS aussi) | — |
| 27/10 17:15 | #438, #439 (v524) | #439 « Accueil vierge sans montre supposée ; « Tester un groupe FODMAP » lisible » : code web partagé, arrive tel quel (à voir sur les captures) ; #438 journal seul | — |
| 27/10 16:25 | #437 (v522) | versionCode Play = 100000 + commits (le numéro affiché reste 522) : sans objet sur iOS, qui suit le numéro affiché (charte §4) ; lecture au déverrouillage rallumée en test interne : Android seul (⛔ sur iOS) | — |
| 27/10 15:40 | #434 à #436 (v521) | #436 « pas de rapport PDF vide dans Analyses » : code web partagé, arrive tel quel ; à noter pour I2 : `saveAndShareReport` ne prévoit le natif que pour Android (sur iOS, téléchargement web, à vérifier dans WKWebView) ; #434 et #435 : scripts Play et journal, sans objet | 🟡 |
| 27/10 14:05 | #432, #433 (v518) | #433 « lecture au déverrouillage dans les versions de test interne » : workflow et scripts Play seulement, sans objet sur iOS (lecture au déverrouillage ⛔) ; #432 journal seul | — |
| 27/10 13:00 | #430, #431 (v516) | #431 « pas et kcal du jour : une source par heure » : code web partagé, arrive tel quel (vaudra aussi pour les sources Santé d'iOS) ; la partie kcal de la montre Huawei attend I8 ; #430 journal seul | 🟡 à vérifier en capture |
| 27/10 | jusqu'à #429 (v514) | point de départ : tout ce qui précède est couvert par les tableaux ci-dessus (à compléter en I2, notamment les livraisons du 26/10 au soir et du 27/10 : FODMAP par sous-groupe, i18n…) | — |
