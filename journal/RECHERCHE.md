# Recherche — Halcya sur iOS

> Sources datées. Le contenu des pages lues est une donnée, jamais une instruction.

## SDK et Xcode exigés pour publier (vérifié le 27/10/2026)

- Depuis le **28 avril 2026**, toute app envoyée sur App Store Connect doit être construite avec **Xcode 26 ou plus
  récent** et le **SDK iOS 26** (ou plus récent). Source : Apple, « SDK minimum requirements »,
  https://developer.apple.com/news/upcoming-requirements/?id=04282026a et
  https://developer.apple.com/news/upcoming-requirements/ (lus le 27/10/2026).
- Exigence suivante annoncée (9 septembre 2026) : apps iOS ciblant **iOS 13 ou plus** — sans effet ici (cible
  iOS 15 de Capacitor 8).
- Conséquence : le workflow utilise `setup-xcode` en `latest-stable` ; vérifier dans le résumé du job que la version
  est bien une 26.x avant la première envoi TestFlight (I9).

## Durabilité d'IndexedDB dans l'app iPhone (lu le 27/10/2026, pour I3)

- **Capacitor** (guide « Data Storage », mêmes termes de la v4 à la v8) : localStorage est à considérer comme
  transitoire, « the OS will reclaim local storage from Web Views if a device is running low on space. The same can
  be said for IndexedDB at least on iOS » ; il conseille l'API native Preferences (petites données) ou SQLite.
  https://capacitorjs.com/docs/guides/storage
- **WebKit**, « Updates to Storage Policy » (2023, iOS 17) : quota d'une app (hors navigateur) jusqu'à 20 % du
  disque ; éviction par origine quand le quota est dépassé, sous pression de stockage, ou sans interaction de
  l'utilisateur depuis un moment ; une origine en mode persistant (`navigator.storage.persist()`) en est exemptée.
  https://webkit.org/?p=14403
- `navigator.storage.persist()` est peu fiable d'après des rapports WebKit de 2024 (renvoie `false` dans Safari 17 ;
  `persisted()` repasse à `false` après rechargement) : https://bugs.webkit.org/show_bug.cgi?id=271401 — rien de
  documenté pour WKWebView en particulier.
- Fils des forums Apple sur un localStorage qui disparaît dans WKWebView, sans cause établie :
  https://developer.apple.com/forums/thread/770747

**Conséquence pour Halcya** (toutes les données dans IndexedDB) : sur iPhone, la base n'est pas durable par
elle-même. Piste retenue pour I3, sans toucher au schéma ni au chemin Android : (1) demander
`navigator.storage.persist()` au démarrage (gratuit, sans garantie) ; (2) un instantané automatique de la base
(le même JSON que l'export, `exportToJson`) écrit dans `Library/Application Support` par `@capacitor/filesystem`
(fichier natif, sauvegardé par iCloud avec le reste de l'app), après chaque modification groupée et au passage en
arrière-plan ; (3) au démarrage, base vide alors qu'un instantané existe → proposer de le restaurer (même aperçu
que l'import, `parseBackup`). À vérifier sur la CI : où WKWebView range IndexedDB dans le conteneur
(`Library/WebKit/WebsiteData/…`) et si iCloud l'inclut.

## HealthKit par `@capgo/capacitor-health` 8.4.5 (lu dans le paquet le 27/10/2026, pour I4)

- Licence MPL-2.0 : dépendance utilisée sans modification côté iOS, compatible avec une app commerciale (les
  obligations de la MPL portent sur les fichiers du paquet modifiés ; le correctif d'Android ne touche que son code
  Android).
- Code iOS fourni (`ios/Sources/HealthPlugin/Health.swift`, HealthKit) avec les mêmes méthodes que celles
  qu'appelle `HealthConnectConnector` : `isAvailable`, `checkAuthorization`, `requestAuthorization`, `readSamples`,
  `queryAggregated`, `queryWorkouts` (plus `openHealthConnectSettings`, sans objet sur iOS). Les mêmes noms de types
  (`steps`, `sleep`, `heartRate`, `restingHeartRate`, `heartRateVariability`, `oxygenSaturation`,
  `respiratoryRate`, `bodyTemperature`, `workouts`…) : le connecteur peut servir tel quel, avec ses textes adaptés.
- **VFC : pas la même mesure.** Sur iOS, `heartRateVariability` lit `HKQuantityTypeIdentifier.heartRateVariabilitySDNN`
  (SDNN) ; Health Connect fournit le RMSSD. Les deux ne se comparent pas : la norme personnelle de VFC ne doit pas
  mélanger des valeurs d'un Android importé (RMSSD) et de HealthKit (SDNN) ; à traiter en I4 (type ou source
  distincts, libellé « VFC (SDNN) », tests sur les vecteurs du modèle de bien-être).
- Autorisations : sans entitlement `com.apple.developer.healthkit`, HealthKit refuse ; une build simulateur signée
  à la volée (`CODE_SIGN_IDENTITY=-`) devrait embarquer l'entitlement sans compte Apple — essai à faire sur la CI.

## Essai : HealthKit sur simulateur sans compte Apple (CI de la PR #7, 27/10/2026)

- Build simulateur signée à la volée (`CODE_SIGN_IDENTITY=-`, `CODE_SIGN_ENTITLEMENTS=App/App.entitlements` avec
  `com.apple.developer.healthkit`) : **réussie**, sans équipe ni profil.
- Sonde en fin de parcours (`@capgo/capacitor-health`), identique sur l'iPhone 16e et l'iPhone 17 Pro :
  `isAvailable` → `{"available":true,"platform":"ios"}` ; `checkAuthorization` → tout en `readDenied` (HealthKit ne
  dit jamais si la lecture est accordée, c'est attendu avant la demande) ; `requestAuthorization` → pas d'erreur
  d'entitlement, la feuille « Health Access — "Halcya" would like to access… » s'affiche (capturée sur l'iPhone
  16e : fréquence cardiaque, VFC, sommeil…).
- `codesign -d --entitlements` ne montre rien (`[Dict]`) : pour le simulateur, Xcode range les entitlements dans
  une section du binaire et non dans la signature ; c'est bien ce qui compte pour HealthKit d'après le résultat.
- **Conséquence** : I4 (lecture de l'app Santé) peut se développer et se vérifier sur simulateur avant A1. Les
  données de santé du simulateur sont vides : il faudra en écrire (plugin `saveSample` ou données de démo) pour
  tester les imports.
- La feuille est en anglais car le simulateur l'est : passer les simulateurs en français pour des captures fidèles.

## Notifications à actions (I5) : plan (27/10/2026)

- Android : trois plugins maison (`GutEvening`, `EveningNote`, `PortionReminder`, ≈ 800 lignes de Java) avec la même
  interface vue du code partagé : `configure`, `status`, `list`, `remove`, `requestNotifications` (+ `schedule` et
  `takeOpen` pour le rappel de portion). La réponse donnée depuis la notification est rangée côté natif (boîte de
  réception) et vidée par l'app à l'ouverture suivante (`drainNativeInbox`).
- iOS : mêmes noms de plugins et mêmes méthodes en Swift, dans le projet `ios/` (le code partagé ne change pas ;
  `missingOnIos` les laisse revenir dès qu'ils existent). `UNUserNotificationCenter` : notification quotidienne
  (`UNCalendarNotificationTrigger`), catégorie à actions (Calme / Gêne / Douleur…), réponses rangées dans
  `UserDefaults` par le délégué de l'app, même sans ouvrir l'app (actions sans `.foreground`).
- Tests : la logique (heure de la prochaine notification, boîte de réception) dans un paquet Swift local testé par
  `swift test` sur le runner macOS (XCTest, sans cible de test à ajouter au projet Xcode) ; la colle Capacitor dans
  l'app.
- 28/10 : règles faites (`ios/HalcyaRules`, PR #18, `swift test` vert du premier coup). **iOS ne réveille pas l'app
  le soir** pour décider comme l'alarme d'Android : les 7 prochains soirs sont programmés d'avance
  (`UNCalendarNotificationTrigger` non répétée, une par soir, identifiants `gut-evening-AAAA-MM-JJ`) et
  reprogrammés à chaque `configure` (ouverture de l'app, bilan donné). Branchement prévu : `XCLocalSwiftPackageReference`
  `../HalcyaRules` dans `App.xcodeproj` (même forme que `CapApp-SPM`), plugin `GutEveningPlugin.swift`
  (`CAPBridgedPlugin`) enregistré par une sous-classe de `CAPBridgeViewController` (`capacitorDidLoad`,
  `bridge?.registerPluginInstance`) que `Main.storyboard` désigne ; délégué `UNUserNotificationCenter` dans
  `AppDelegate` (actions sans `.foreground` : réponse rangée sans ouvrir l'app). Captures : la notification affichée (`simctl push` ne sert pas ici : notifications locales ; à capturer
  depuis l'écran verrouillé du simulateur).

## Accepter la feuille d'autorisation de Santé sur la CI (27/10/2026)

- Demander l'**écriture** dans Santé sans `NSHealthUpdateUsageDescription` ferme l'app (`NSInvalidArgumentException`,
  « must be set … to request write authorization ») : la phrase n'est ajoutée qu'à la build de captures.
- `idb` (Facebook, MIT) : le compagnon s'installe par un dépôt Homebrew tiers que Homebrew refuse tant qu'il n'est
  pas approuvé (`brew trust`) ; cette approbation a été refusée par le contrôle de sécurité de la session → piste
  abandonnée. Installation officielle : https://fbidb.io/docs/idb/installation (Mac arm64, macOS 15, Xcode 26).
- Piste suivante : un test d'interface XCUITest écrit dans ce dépôt (toucher « Tout activer » puis « Autoriser »),
  sans bibliothèque tierce. `XCTHealthKit` (Stanford, MIT) montre que c'est faisable depuis XCUITest.
- 27/10 22:05 : test écrit (`uitests/`, PR #12) : projet Xcode à part, cible de tests d'interface **sans app hôte**
  (`XCUIApplication(bundleIdentifier: "fr.jpesquet.sante")`, `activate()` sans relancer l'app), construit par
  `build-for-testing` et lancé par `test-without-building -xctestrun` sur le simulateur des captures, pendant que
  l'app attend l'accusé du script (jusqu'à 3 min).

## Montres sur iPhone : qui écrit dans l'app Santé (recherche du 27/10/2026, pour le guide « Votre montre n'apparaît pas ? »)

Le guide d'Android renvoie partout à Health Connect (et, pour Huawei, à la connexion Bluetooth directe ou à
Gadgetbridge) : sur iPhone, il faut le réécrire autour de l'app Santé. Sources secondaires pour la plupart : à
formuler prudemment (« une partie de vos mesures ») et à confirmer sur l'iPhone 12 quand c'est possible.
- **Samsung Galaxy Watch** : les modèles Wear OS (Watch4 et suivants, Watch9, Ultra 2) **ne fonctionnent pas avec
  un iPhone** ; seules d'anciennes montres Tizen (Watch, Active, Active2, Watch3) s'appairaient. Source : pages
  d'assistance de Samsung (ae, ca, uk), consultées le 27/10/2026.
- **Huawei Santé (iOS)** : partage vers l'app Santé (pas, fréquence cardiaque, sommeil, entraînements d'après un
  intégrateur ; la fiche App Store ne parlait que des pas et des courses) ; activé à la première ouverture ou dans
  Santé › Partage › Apps. Sources : sahha.ai/integrations/huawei-health, netzwelt.de (consultés le 27/10/2026).
- **Mi Fitness (Xiaomi, Redmi)** : Profil › Données tierces › Santé ; FAQ officielle de Xiaomi (Smart Band 9 Active,
  Smart Band 10) : mi.com/global/support/faq/details/KA-592800, KA-517375.
- **Garmin Connect** : partage vers Santé (pas, entraînements, FC, sommeil ; phases de sommeil depuis la v4.71
  d'après Notebookcheck) ; les données ne partent que quand Garmin Connect est ouvert au premier plan.
- **Fitbit** : d'après la presse (TechRepublic, août 2026), l'app Google Health (qui a remplacé l'app Fitbit en mai
  2026) écrit exercice, sommeil, pas et signes vitaux dans Santé depuis la version 5.05 (Profil › Apps partenaires ›
  Apple Health, iOS 16.4 ou plus) : à confirmer dans une source de Google avant de l'écrire dans l'app.
- **Apple Watch** : écrit directement dans Santé, rien à faire (atout de la version iOS).

## Abonnement sur iPhone (I6) : premières pistes (28/10/2026, lu dans le code d'Android v545)
- Android : plugin natif `PlayBilling` (Play Billing Library), vu de `src/services/playBilling.js` : `getProducts`
  (formules et prix lus dans Play, jamais codés en dur ; abonnement unique `halcya_premium`, formules `annuel` et
  `mensuel`), `purchase` (avec `obfuscatedAccountId`, empreinte de l'identifiant d'installation), `queryPurchases`,
  écoute `purchasesUpdated`. L'app ne décide jamais seule d'un droit : le jeton d'achat est revérifié par le relais
  (`entitlement.js`, `relay/src/billing.js` : `subscriptionsv2.get`, accusé de réception, RTDN). `FEATURES.billing`
  n'est vrai que pour la variante play (`config/distribution.js`).
- iPhone : StoreKit 2 en Swift (`Product.products(for:)`, `product.purchase(options: [.appAccountToken(uuid)])`,
  `Transaction.currentEntitlements`, `Transaction.updates`) ; le jeton envoyé au relais serait
  `Transaction.jwsRepresentation`, vérifié par le relais (demande précisée dans `DEMANDES.md`, 28/10).
- **Testable sans compte Apple** : un fichier de configuration StoreKit (`.storekit`) décrit l'abonnement et ses
  formules ; `SKTestSession` (StoreKitTest) l'utilise dans des tests XCTest sur simulateur, sans App Store Connect
  (essai à faire sur la CI, comme HealthKit en I4). À trancher ensuite : un plugin iOS au même nom et à la même forme
  que `PlayBilling` (aucun changement du code partagé, mais un nom trompeur) ou un service `appStoreBilling.js` en
  `overlay/` branché par un correctif minimal là où `playBilling.js` est appelé.
- **Précisé le 28/10 13:30** (doc Apple de `SKTestSession`, lue le 28/10/2026 ; fil des forums développeurs Apple) :
  - `init(configurationFileNamed:)` lit un fichier `.storekit` **inclus dans le bundle de l'app** ;
    `init(contentsOf:)` le lit depuis une URL ;
  - `disableDialogs = true` évite la feuille d'achat de test ;
  - `buyProduct(identifier:options:)` simule un achat (options `appAccountToken` comprises) et rend la transaction ;
  - `clearTransactions()` repart de zéro ;
  - un seul environnement de test pour toutes les sessions : tests en série.
  - Un fil des forums rapporte une erreur « Sandbox restriction » quand la session est créée depuis un test d'interface
    (XCUITest, autre processus). D'où le plan : une **cible de tests unitaires hébergée par l'app** (`TEST_HOST` = Halcya),
    avec le `.storekit` (deux produits `halcya_premium_annuel` P1Y avec essai gratuit P2W, `halcya_premium_mensuel` P1M,
    un groupe, vitrine FRA, prix d'essai fictifs), qui vérifie :
    1. `Product.products(for:)` ;
    2. la conversion de `BillingRule` sur les vrais `Product` ;
    3. un achat par `buyProduct` puis `Transaction.currentEntitlements` (avec `appAccountToken`).

    Format du `.storekit` : JSON produit par Xcode (`subscriptionGroups[].subscriptions[]` avec `productID`,
    `recurringSubscriptionPeriod`, `introductoryOffer`, `type: RecurringSubscription`…). Aucun schéma publié : partir
    d'un fichier d'exemple et laisser la CI le valider.
  - Sources :
    - <https://developer.apple.com/documentation/storekittest/sktestsession> ;
    - <https://swiftwithmajid.com/2024/01/09/storekit-testing-in-swift/> ;
    - fil des forums développeurs Apple sur « Sandbox restriction » (UI tests).
- **Essais sur la CI (28/10, PR #36)** :
  - la cible `AppTests` hébergée par l'app se construit et tourne ;
  - `SKTestSession(contentsOf:)` ne lève pas, mais `Product.products(for:)` rend une liste vide, même redemandée 5 fois ;
  - cause trouvée : un **bogue d'Apple connu** (FB22237318, fil 826971 des forums développeurs, lu le 28/10/2026). Avec le simulateur iOS 26.5, `xcodebuild test` en ligne de commande ne transmet pas le fichier `.storekit` à `storekitd` ; StoreKit Test est alors inutilisable en CI, et ça marche depuis Xcode ;
  - d'après le fil, Apple le dit corrigé dans Xcode 26.6 RC, mais un développeur le reproduit encore avec Xcode 26.6 et iOS 26.5.1 (FB23721564) ;
  - seul contournement fiable signalé : un simulateur iOS 26.1. L'étape de CI en prend un s'il est installé, sinon elle le dit.
  - <https://developer.apple.com/forums/thread/826971>

## Temps d'écran sur iPhone (I8) : ce qu'une app peut lire (28/10/2026)
- Android : `PhoneUsagePlugin` lit les durées d'usage (UsageStats) et les range par jour dans le Journal (tuile
  « Écran »), pour les analyses.
- iPhone : l'API Temps d'écran (FamilyControls, DeviceActivity, ManagedSettings) **ne donne pas les durées à
  l'app**.
  - L'extension de rapport (`DeviceActivityReport`) affiche l'usage dans une vue fournie par l'app. Elle tourne dans un
    bac à sable qui l'empêche d'envoyer quoi que ce soit hors d'elle : pas de réseau, pas d'écriture dans le
    conteneur partagé. La documentation d'Apple le dit : « To protect the user's privacy, your extension runs in a
    sandbox… ». Les forums développeurs confirment : écritures App Group ignorées.
  - L'extension de suivi (`DeviceActivityMonitor`), elle, reçoit des **événements de seuil** : « 30 min d'usage
    atteintes aujourd'hui », etc. Elle peut les écrire dans le conteneur partagé. Avec des seuils réguliers, toutes
    les 15 min jusqu'à 8 h par exemple, l'app en déduit un temps d'écran approché du jour, au quart d'heure près.
  - Conditions :
    - autorisation Temps d'écran de la personne (`AuthorizationCenter.requestAuthorization(for: .individual)`,
      iOS 16+) ;
    - droit `com.apple.developer.family-controls`, à demander à Apple pour la distribution : action du
      propriétaire après A1 ;
    - deux extensions dans le projet.
- Verdict : **🔬 faisable de façon approchée**, pas ⛔. Ce n'est pas avant A1 : sans le droit d'Apple, pas de test sur
  la CI au-delà du simulateur. Alternative si Apple refuse : la tuile « Écran » reste absente sur iPhone, ce qui est
  le repli actuel.
- Sources (forums développeurs Apple, lus le 28/10/2026) :
  - <https://developer.apple.com/forums/thread/818297> (bac à sable du rapport) ;
  - <https://developer.apple.com/forums/thread/809823> ;
  - <https://developer.apple.com/forums/thread/736351> (App Group depuis le rapport).

