# Matrice de parité Android (variante play) → iOS

> **La vérité sur l'avancement d'iOS.** Tenue à jour à chaque run de la routine iOS. Référence : la variante
> **play** (Google Play). Graine écrite à la mise en place (26/10/2026) à partir des plugins natifs et de
> `app/src/config/distribution.js` : **l'étape I2 la complète fonction par fonction** (changelog, `journal/PRODUIT.md`,
> écrans) et vérifie chaque hypothèse ci-dessous (marquées « à vérifier »).

Légende : ✅ fait et vérifié sur iOS (preuve : capture, test ou workflow) · 🟡 partiel ou pas encore vérifié ·
❌ manquant · ⛔ impossible sur iOS (raison + source datée + alternative) · — sans objet sur iOS.

**Parité** : **19 %** au 27/10 16:55 (9 ✅ sur 47 lignes faisables ; 3 ⛔ et 3 — exclues) = ✅ / (toutes les lignes
des sections 1 à 4 sauf ⛔ et —). Calcul : compter la colonne « État » ; un 🟡 ne compte pas tant qu'il n'est pas
vérifié sur iOS.
**Dernière version Android suivie** : v522 (commit `efcdb21`, 27/10/2026), voir `upstream.json`.

## 1. Socle

| Fonction (play) | Android | iOS | État | Notes |
|---|---|---|---|---|
| Projet natif | `app/android` (Capacitor 8) | `ios/` de ce dépôt (Capacitor iOS 8.2, Swift Package Manager, 6 plugins iOS), copié dans `upstream/app/ios` | ✅ | créé le 27/10 ; build Xcode 26.6 ✅ (PR #1) |
| Build CI | `Play — AAB` (signé, `main`) | `ios-build.yml` : tests d'Android avec correctifs (Ubuntu) + build simulateur et captures (macOS, branche `captures/…`) | ✅ | simulateur (PR #1) ; signé en I9 |
| Numéro de version | `git rev-list --count HEAD` | même nombre en `CFBundleShortVersionString` (`MARKETING_VERSION`), build `<android>.<ios>` (`CURRENT_PROJECT_VERSION`) | 🟡 | passés à `xcodebuild` par le workflow ; affichage à vérifier en capture |
| Nom « Halcya », icône « H nuit », écran de démarrage | ✅ | `CFBundleDisplayName` Halcya, AppIcon 1024 opaque et écran de démarrage encre générés depuis le glyphe d'Android (`scripts/ios-icons.mjs`) | 🟡 | à vérifier sur l'écran d'accueil d'un simulateur |
| Variante de distribution | `play` | `appstore` (`patches/01-variante-appstore.patch`) | ✅ | comme play (relais IA, visage à l'ouverture, pas d'auto-mise à jour), sans abonnement jusqu'à I6 ; tests `overlay/…/distribution.appstore.test.js` |
| Zones sûres, barres système | `SystemBarsPlugin`, `--safe-top/--safe-bottom` | encoche / Dynamic Island / indicateur d'accueil | 🟡 | onboarding et Accueil corrects sur 16e et 17 Pro (27/10) ; bas de l'onboarding sur 390 × 844 à revoir (I2). Thème : clair par défaut comme Android, le sombre est un réglage de l'app (pas un défaut) |
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
| Sources (détection automatique) | 🟡 | sources iOS différentes : Santé (HealthKit) au lieu de Health Connect ; 27/10 : `canOpenURL` appelé avec des noms de paquets Android, refusés par iOS ; carte « Lecture du visage » en erreur (plugin absent) → I2 |
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
| Santé : imports et historique | Health Connect (`@capgo/capacitor-health`, patch Android) | HealthKit (le même plugin annonce le support iOS — à vérifier type par type) | ❌ | I4 ; capacité HealthKit, textes `NSHealthShareUsageDescription` |
| Abonnement | `PlayBillingPlugin` (play) | StoreKit 2 (plugin Swift) | ❌ | I6 ; mêmes formules, essai 14 j |
| Vérification des achats par le relais | Play Developer API, RTDN | JWS signés par Apple vérifiés par le relais, App Store Server Notifications V2 | ❌ | I6 ; le relais est dans HealthTrack : `DEMANDES.md` |
| Anti-abus des crédits IA | `PlayIntegrityPlugin` | App Attest (DeviceCheck) | ❌ | I6 ; vérification côté relais : `DEMANDES.md`. 27/10 : le relais est en `INTEGRITY_MODE=observe` (`relay-deploy.yml`), l'analyse des repas passe donc sans jeton depuis l'iPhone ; en `enforce`, elle serait refusée (403) tant qu'App Attest n'est pas accepté |
| Rappel de fin d'essai | `TrialReminderPlugin` | notification locale | ❌ | I5/I6 |
| Bilan du ventre du soir (notification à actions) | `GutEveningPlugin` | `UNNotificationCategory` + actions, réponse rangée à l'ouverture | ❌ | I5 |
| Note du soir | `EveningNotePlugin` | idem | ❌ | I5 |
| Rappel de la portion du jour | `PortionReminderPlugin` | idem | ❌ | I5 |
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
| 27/10 16:25 | #437 (v522) | versionCode Play = 100000 + commits (le numéro affiché reste 522) : sans objet sur iOS, qui suit le numéro affiché (charte §4) ; lecture au déverrouillage rallumée en test interne : Android seul (⛔ sur iOS) | — |
| 27/10 15:40 | #434 à #436 (v521) | #436 « pas de rapport PDF vide dans Analyses » : code web partagé, arrive tel quel ; à noter pour I2 : `saveAndShareReport` ne prévoit le natif que pour Android (sur iOS, téléchargement web, à vérifier dans WKWebView) ; #434 et #435 : scripts Play et journal, sans objet | 🟡 |
| 27/10 14:05 | #432, #433 (v518) | #433 « lecture au déverrouillage dans les versions de test interne » : workflow et scripts Play seulement, sans objet sur iOS (lecture au déverrouillage ⛔) ; #432 journal seul | — |
| 27/10 13:00 | #430, #431 (v516) | #431 « pas et kcal du jour : une source par heure » : code web partagé, arrive tel quel (vaudra aussi pour les sources Santé d'iOS) ; la partie kcal de la montre Huawei attend I8 ; #430 journal seul | 🟡 à vérifier en capture |
| 27/10 | jusqu'à #429 (v514) | point de départ : tout ce qui précède est couvert par les tableaux ci-dessus (à compléter en I2, notamment les livraisons du 26/10 au soir et du 27/10 : FODMAP par sous-groupe, i18n…) | — |
