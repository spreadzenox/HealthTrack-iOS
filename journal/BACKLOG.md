# Backlog — Halcya sur iOS

> Un run = une étape testable et mergeable. L'ordre peut s'adapter, mais deux règles ne bougent pas : HealthTrack
> (Android) reste en lecture seule, et les livraisons Android sont reportées dans `PARITE.md` à chaque run, même
> pendant le rattrapage.

## Prochaines étapes

- [x] **I0 — Mise en place** (27/10, session de configuration avec le propriétaire) : dépôt `HealthTrack-iOS`
  public, charte, parité de départ, `upstream.json` + `scripts/upstream.sh` (testé : récupère Android v514, applique
  les correctifs, échoue clairement si l'un ne s'applique plus).
- [x] **I1 — Socle iOS sur simulateur** (27/10, PR #1 et #2)
  - [x] Variante `appstore` (27/10) : correctif de `app/src/config/distribution.js` (comme play : relais IA, pas
    d'auto-mise à jour, abonnement App Store) ; les tests d'Android passent avec le correctif.
  - [x] `@capacitor/ios` 8.2 installé par le workflow (`npm install --no-save`, pas de correctif de `package.json`),
    `cap add ios` (CLI 8 via `npx -p`) → projet dans `ios/` (Swift Package Manager), bundle id `fr.jpesquet.sante`,
    nom « Halcya », icône et écran de démarrage générés depuis le glyphe d'Android (27/10).
  - [x] Version : `MARKETING_VERSION` = `versionCode` de `upstream.json`, `CURRENT_PROJECT_VERSION` =
    `<versionCode>.<commits de ce dépôt>`, passés à `xcodebuild` par le workflow (27/10).
  - [x] Workflow `ios-build.yml` (PR, push `main`, `workflow_dispatch`) : `scripts/upstream.sh`, `npm ci`, tests
    d'Android avec les correctifs, build web (`VITE_DISTRIBUTION=appstore`), `cap sync ios`, `xcodebuild` pour le
    simulateur sans signature, `concurrency` qui annule les runs dépassés (27/10).
  - [x] Captures (27/10) : deux simulateurs (390 × 844 points comme l'iPhone 12 de test, et un récent), 14 pages avec
    les données de démo d'Android en clair, 3 en sombre, onboarding d'une installation vierge ; parcours piloté par
    l'app (`captureMode.js`), synchronisé par fichier (`Documents/capture/ready.txt` → capture → `ack.txt`) : les 36
    images de la PR #2 correspondent à leur page ; poussées sur la branche `captures/pr-<n>` ou `captures/main`.
  - [x] États vides de chaque page (29/10, PR #64, mergée) : 8 pages capturées onboarding fini et base vide
    (`vide-*`, `EMPTY_ROUTES`), entre l'onboarding et les données de démo ; regardées sur les deux iPhone simulés :
    textes justes sur iPhone (app Santé, lecture du visage dans Sources), aucune carte cassée.
  - [x] Faire échouer la build sur erreur JavaScript (29/10, PR #63, mergée : 0 ligne sur les 10 dernières CI ;
    étape finale bloquante, promesses rejetées sans traitement comptées en mode captures ; 0 sur sa CI aussi).
- [ ] **I2 — Audit de parité et replis propres** (déjà repérés le 27/10 : texte Premium « Google Play », détection
  des apps par noms de paquets Android, carte « Lecture du visage » en erreur — traités dans la PR #3 avec « Vos
  données », « Mes appareils », montre Huawei, temps d'écran et les phrases d'usage Bluetooth et Santé
  d'`Info.plist` ; carte Santé, Sources et onboarding sans Health Connect ni montre
  Huawei en direct, sauvegarde et rapport PDF par la feuille de partage, huit services à plugin Android absent qui
  retombent proprement : PR #4, mergée le 27/10 ;
  restent, dans l'ordre : « Vos sources » qui conseille Health Connect
  dans Gadgetbridge (→ guide des montres réécrit, sous I4) ; captures défilées pour les pages longues : faites, PR #5) : compléter `PARITE.md` fonction par fonction (changelog depuis le
  lancement play, `journal/PRODUIT.md`, écrans) ; sur iOS, chaque service qui appelle un plugin Android absent
  retombe proprement (pas d'erreur, pas de carte cassée, pas d'interrupteur qui ne fait rien) ; % de parité.
  - [x] Audit automatique des textes (29/10, PR #70 puis #71) : chaque page capturée est relue (`androidWords`,
    `pageText`) ; les mots propres à Android (Health Connect, Google Play, Play Store, Android, Gadgetbridge, Samsung
    Health, temps d'écran) sont listés dans `texte-android.txt`. Première liste (#70) : « temps d'écran » seulement,
    dans la carte qui dit « Pas encore disponible sur iPhone » (juste, mise à part par `IPHONE_OK`) ; étape de CI
    bloquante depuis #71.
  - [x] Captures de la fiche refaites le 30/10 (`captures/store`, Android v597) et regardées : 8 captures propres, barre
    d'état à 9:41, sans la bannière système « Prêt pour Apple Intelligence » vue une fois sur une capture de PR (#73) ;
    à revérifier à chaque nouvelle prise (aucun réglage `simctl` documenté pour l'empêcher).
  - [x] Rapport PDF pour le médecin essayé à chaque build (29/10, PR #51, mergée) : PDF créé et feuille de partage
    ouverte sur les deux iPhone simulés ; l'enregistrement dans Fichiers par le test d'interface (feuille dépliée)
    est à confirmer sur la CI de #52.
  - [ ] Nouveautés de l'iPhone à partir de sa propre version (29/10, correctif 28 : `APPSTORE_CHANGELOG_SINCE` =
    29/10) ; **à avancer à la date du premier TestFlight** (I9), pour que les premiers testeurs partent de là.
- [ ] **I3 — Données** : durabilité d'IndexedDB dans WKWebView (27/10 : non durable d'après Capacitor et WebKit,
  plan dans `RECHERCHE.md` : `persist()`, instantané automatique en fichier natif, restauration proposée si la base
  est vide ; 27/10 : copie de secours automatique, PR #6), sauvegarde iCloud, export / import JSON par la feuille
  de partage (y compris d'un téléphone Android vers un iPhone), secrets dans le Trousseau (ThisDeviceOnly).
  - [x] Aller-retour des données vérifié en capture (PR #29, mergée le 28/10) : 1924 mesures exportées, écrites dans
    un fichier, relues, réimportées sans doublon sur les deux iPhone simulés.
  - [x] Sauvegarde du téléphone mesurée (PR #30, mergée le 28/10) : `BackupMarker` en Swift (repère hors
    sauvegarde, lu par `restoreGuard.js` : `restored: false`) ; sonde Debug `CaptureProbe` : **WebKit exclut la base
    IndexedDB de la sauvegarde iCloud**, Documents (copie de secours) est sauvegardé.
  - [x] « Supprimer toutes mes données » efface aussi la copie de secours (correctif 22, PR #31, mergée le 28/10 ;
    elle gardait toutes les entrées et le profil, et partait dans la sauvegarde iCloud) ; sonde `[suppression]` :
    `après {"entries":1925,"count":0,"copie":false}` sur les deux iPhone simulés.
  - [x] Après une restauration (base vide, copie présente) : la copie proposée d'emblée au premier écran de
    l'onboarding (PR #32, mergée le 28/10 : `SnapshotWelcome`, correctif 23 ; « Reprendre » rend les 1925 mesures sur
    les deux iPhone simulés, captures regardées).
  - [x] Réglages dans la copie de secours (PR #38, intégrée à #37) : thème, note du soir, bilan du ventre, météo ;
    jamais un secret, un état propre au téléphone ni le consentement à l'IA.
  - [ ] Identifiant d'installation (crédits IA) après une restauration iCloud : sur Android, il revient avec la
    sauvegarde ; sur iPhone, l'app en crée un neuf. Le garder dans la copie (visible dans Fichiers) ou laisser le
    relais en décider (App Attest, I6) : à trancher. Plan (28/10 11:40) : **dans l'onboarding, au premier écran**, pas à l'Accueil. Après une
    restauration iCloud ou un effacement par iOS, le localStorage est perdu lui aussi, donc l'onboarding revient.
    À l'Accueil, la synchro Santé autorisée pendant l'onboarding remplirait la base avant l'offre (« base vide »
    serait faux). Carte « Reprendre vos données ? Copie de secours du … (n mesures) » [Reprendre mes données]
    [Commencer sans] → `importFromJson` en fusion (entrées et profil), puis l'onboarding continue (autorisations à
    redonner sur un nouveau téléphone). Correctif minimal d'`Onboarding.jsx` (une ligne au-dessus de `GoalStep`),
    composant dans `overlay/app/src/ios/`. Capture : une étape du plan qui vide la base (`deleteAllEntries`, sans
    toucher la copie), remet l'onboarding à zéro et ouvre `/bienvenue`, puis la sonde touche « Reprendre » et
    compte.
  - [x] Import par le sélecteur de fichiers d'un ancien fichier (tableau nu), geste réel — PR #34, mergée le 28/10
    (sonde `[import]` : 1926 → 1928 ; test d'interface `DonneesUITests` : Explorer › Sur mon iPhone › Halcya).
  - [x] Export par la feuille de partage, geste réel (PR #37) : « Enregistrer dans Fichiers », 2 fichiers sur les
    deux iPhone simulés.
  - [ ] Gestes réels, suite : puis export par la feuille de partage ;
    fichier exporté d'Android réimporté sur iPhone (même format, déjà couvert par l'aller-retour de #29).
- [ ] **I4 — Santé (HealthKit)** par `@capgo/capacitor-health` (déjà une dépendance d'Android ; 27/10 : code iOS
  vérifié, mêmes méthodes et types que le connecteur ; **VFC en SDNN sur iOS contre RMSSD sur Android**, à ne pas
  mélanger ; voir `RECHERCHE.md`. 27/10 : **HealthKit marche sur simulateur sans compte Apple** (build signée à la
  volée, feuille d'autorisation capturée, PR #7) : I4 peut avancer avant A1) :
  mêmes types que Health Connect, historique, autorisations au bon moment avec divulgation.
  - [~] Connecteur sur HealthKit (PR #9) : disponibilité de HealthKit, « accordé » une fois la demande faite (HealthKit
    ne révèle pas la lecture), VFC ni demandée ni lue, textes iPhone (carte de Sources, onboarding, divulgation).
  - [ ] Vérifier l'import réel : sonde d'écriture et de relecture (PR #11, mergée ; `idb` écarté : dépôt Homebrew
    tiers non approuvé) ; feuille acceptée par un test d'interface XCUITest du dépôt (`uitests/`, PR #12, mergée :
    1234 pas écrits puis relus sur les deux iPhone simulés) ; pas relus par le connecteur de l'app (PR #15 : vu sur
    l'iPhone 16e, toucher du test fiabilisé ; mergée, vu sur les deux iPhone) ; ensuite les montrer dans le Journal
    (30/10, PR #77 : la sonde ouvre le Journal après la synchronisation, y cherche « 1 234 » pas, `[healthkit] journal`,
    capture `healthkit-journal`) ; à refaire sur l'iPhone 12.
  - [x] Textes Santé sur iPhone : source « App Santé » des mesures importées (Journal, tuiles, rapport), résumé du
    premier import, confirmation de suppression (PR #13, mergée le 28/10).
  - [x] Guide « Votre montre n'apparaît pas ? » réécrit pour l'iPhone (Health Connect, Gadgetbridge et Bluetooth
    direct n'y ont pas cours) : Apple Watch, Huawei Health, Mi Fitness et Zepp, Garmin, autres marques, Galaxy
    Watch récentes incompatibles ; recherche du 27/10 (`RECHERCHE.md`) ; PR #14, mergée le 27/10. Menus de Huawei
    Health, Zepp et Garmin Connect à confirmer sur l'iPhone 12.
  - [~] VFC SDNN : type ou source à part, libellé, norme personnelle distincte de la RMSSD ; puis la lire. Plan
    (27/10) : sur iPhone, le connecteur lit la VFC et la range sous un **type d'entrée à part** (pas `heart_rate` :
    `dailyJournal.js` range une sous-catégorie inconnue de `heart_rate` dans la fréquence cardiaque, elle s'y
    mélangerait) ; vérifier que les 29 lectures de `heartRateVariability` et chaque `switch` sur le type ignorent ce
    nouveau type ; l'afficher « VFC (SDNN) » dans le Journal ; norme personnelle SDNN ensuite. 27/10 23:10 :
    `analysisEngine.js` et `dailyAggregates.js` testent chaque sous-catégorie de `heart_rate` ; seul
    `dailyJournal.js` tombe par défaut dans la fréquence cardiaque → une sous-catégorie à part
    (`heartRateVariabilitySdnn`) plus un correctif de `dailyJournal.js` suffiraient. 28/10 : fait ainsi (PR #16, mergée :
    correctifs 08 et 13 refaits, 17 ajouté ; pastille « VFC (SDNN) » ; sonde qui écrit 48 ms et vérifie la
    sous-catégorie). « Mes appareils » compte la VFC SDNN (correctif 19, PR #25). Norme personnelle SDNN prête
    (correctif 20, PR #26) ; radar avec la VFC SDNN prêt (correctif 21, branche `claude/ios-i4-radar-sdnn`, PR après #26).
  - [x] Simulateurs en français pour les captures (PR #9).
- [ ] **I5 — Notifications** : bilan du ventre du soir, note du soir, rappel de portion, rappel de fin d'essai ;
  actions dans la notification, réponse rangée à l'ouverture suivante.
  - [x] Règles du soir en Swift, testées par XCTest (`ios/HalcyaRules`, PR #18, mergée) : soirs programmés d'avance (iOS ne
    réveille pas l'app pour décider), geste après minuit rattaché au soir demandé.
  - [x] Plugin `GutEvening` en Swift (`configure`, `status`, `list`, `remove`, `requestNotifications`, PR #20), branché par une
    sous-classe de `CAPBridgeViewController` ; catégorie à actions Calme / Gêne / Douleur sans ouvrir l'app ; retirer
    `GutEvening` de `missingOnIos` ; capture de la notification.
  - [~] Sur simulateur (PR #21) : autorisation accordée et notification affichée dans le centre de notifications ✅ ;
    réponse « Gêne » depuis la bannière dépliée, rangée sans ouvrir l'app ✅ sur les deux iPhone simulés (PR #23,
    mergée) ; reste : import à l'ouverture suivante vérifié, geste réel sur l'iPhone 12 après A1.
  - [x] `EveningNote` en Swift (PR #24, mergée) : plugin, boîte commune avec le ventre (`EveningStore`), tests
    XCTest ; sur les deux iPhone simulés, les 6 notes s'affichent dans la notification dépliée et « 4 » est rangé
    sans ouvrir l'app.
  - [x] `PortionReminder` en Swift (PR #24, mergée) : rappels restants programmés d'avance ; bannière touchée app
    en arrière-plan → la réintroduction s'ouvre (le natif signale le toucher, transmis par iOS après le retour au
    premier plan : correctif 18) ; vérifié sur les deux iPhone simulés.
  - [x] Import des réponses à l'ouverture suivante vérifié en capture : bilan du ventre (PR #25 : inserted 1,
    boîte vide), note du soir (PR #26 : inserted 1, boîte vide), toujours vrai à chaque CI depuis ; gestes sur
    l'iPhone 12 après A1.
- [ ] **I6 — Abonnement et relais** : StoreKit 2 (plugin Swift dans `ios/`), mêmes formules (annuel mis en avant,
  mensuel, essai 14 jours), prix lus dans StoreKit ; côté relais (dans HealthTrack → `DEMANDES.md`) : vérification des
  transactions signées par Apple, notifications serveur V2, App Attest, mêmes crédits IA, même période de lancement.
  Plan (28/10 12:25, après lecture de `playBilling.js`, `entitlement.js`, `distribution.js` d'Android v553) :
  - Natif : plugin Swift `AppStoreBilling` (StoreKit 2) qui rend **la même forme que `PlayBilling`**, pour que toute
    la logique JS d'Android serve telle quelle (`describePlans`, achat, restauration, vérification par le relais).
    - `getProducts` : deux produits App Store `halcya_premium_annuel` et `halcya_premium_mensuel` (un groupe
      d'abonnements, pas de « base plans » chez Apple), rendus comme les formules `annuel` / `mensuel` de
      `halcya_premium`. Pour chacun : `offerToken` = id du produit ; phase d'essai (`priceMicros` 0, `P14D`) si
      `isEligibleForIntroOffer` ; puis prix (`displayPrice`, micros, devise, `P1Y` / `P1M`).
    - `purchase` : `product.purchase(options: [.appAccountToken(uuid)])`, où `uuid` est tiré de
      `obfuscatedAccountId`, déjà une empreinte SHA-256 ; le relais devra faire de même.
    - `queryPurchases` : `Transaction.currentEntitlements`.
    - Événement `purchasesUpdated` : `Transaction.updates`.
    - Le « jeton d'achat » = `jwsRepresentation`.
  - JS : une ligne de correctif dans `loadBillingPlugin()` (`playBilling.js`) : sur iPhone, l'adaptateur
    (`overlay/app/src/ios/`). `FEATURES.billing` reste faux pour `appstore` tant que le relais ne vérifie pas les
    transactions d'Apple. Sinon le premium se fermerait sur iPhone sans moyen de payer.
  - Essais sans compte Apple :
    - règle de conversion en Swift dans `HalcyaRules` (XCTest) ;
    - adaptateur en Vitest ;
    - achat de bout en bout sur simulateur avec un fichier de configuration StoreKit (`.storekit`) branché au
      schéma, la feuille d'achat de test touchée par XCUITest.
  - Propriétaire, après A1 à A4 : créer le groupe et les deux produits dans App Store Connect avec ces ids (valeurs
    exactes préparées le moment venu).
  - [x] Natif et branchement JS (PR #33, mergée le 28/10) : `BillingRule` (5 tests XCTest), plugin `AppStoreBilling`,
    correctif 24, contrat avec `describePlans` (Vitest). Inactifs tant que `FEATURES.billing` est faux.
  - [x] Achat d'essai sur simulateur : cible de tests unitaires hébergée par l'app + fichier `.storekit` +
    `SKTestSession` (`RECHERCHE.md`, 28/10 13:30) ; fait le 28/10 (PR #40 : un abonnement d'essai s'achète et reste
    actif) ; étape de la CI **bloquante depuis le 29/10** (PR #58), après quatre passages sans faute.
  - Relais (Android, « I6-RELAIS ») : préciser dans `DEMANDES.md` l'en-tête ou le champ du JWS et la règle de
    l'`appAccountToken`.
- [ ] **I7 — Bien-être par le visage** à l'ouverture de l'app : mêmes modèles qu'Android, mêmes scores sur ses vecteurs de référence.
  Étude du 28/10 (`RECHERCHE.md`) : ni Vision ni ARKit, qui changeraient les scores. Valence et éveil (HSEmotion, poids
  AffectNet) éteints tant que la licence n'est pas tranchée (`DEMANDES.md`). Étapes :
  - [x] 1. Paquet Swift pur `ios/HalcyaFace` (`swift test`) : ancres, letterbox et recadrage du détecteur, testés sur les portraits d'Android (entrées ±1e-5). 28/10 : passés sur le runner macOS (PR #43).
  - [x] 2. Décodage BlazeFace, zone du visage, points, sous-ensemble de 146 points, zone suivante (tolérances d'Android). 28/10 : 7 tests passés sur le runner macOS (PR #43).
  - [x] 3. Indices, `FaceRecord` et rafale `FacePipeline` sans valence ni éveil (28/10 : 20 tests Swift passés sur le runner macOS, PR #43) ; le JSON écrit sur iPhone est lu par `parseFaceBurst` d'Android (`overlay/app/src/ios/faceRecord.test.js`).
  - [x] 4. Moteur des 3 `.tflite` : TensorFlow Lite C 2.17.0 retenu (`RECHERCHE.md`). Modèles téléchargés en CI avec les empreintes d'Android (`scripts/face-models.sh`, empreinte du moteur figée), paquet `ios/HalcyaFaceModels`, workflow `face-models.yml`. 28/10 : les 5 tests passent du 1er coup sur iPhone simulé, aux tolérances de `FaceModelsTest` (PR #44) ; chaîne complète 108 à 122 ms pour la 1re image, 73 à 87 ms pour la suivante (simulateur ; à mesurer sur l'iPhone 12).
  - [x] 5. YUV → RVB (BT.601 plein écart, 4 rotations ; 28/10 : `FaceFrames`, plan CbCr entrelacé de l'iPhone et arrondi de Java, 9 tests, PR #44 ; garde-fous `FaceSchedule`, chaleur de l'iPhone sur l'échelle d'Android, 10 tests, PR #44 ; boîte des rafales `FaceInbox` et lecture `FaceOneShot` avec caméra et modèles injectables, 13 tests, branche `claude/ios-i7-plugin` ; caméra frontale `FrontCamera` (AVFoundation, 352 × 288, portrait sans miroir), conversion testée sur images fabriquées), puis plugin `FaceSense` en Swift (branché dans l'app, PR #46, mergée) avec images injectables (29/10 : un visage lu de bout en bout sur les deux iPhone simulés, PR #47).
  - [ ] 6. Sur l'iPhone 12 (dès TestFlight, après A1–A3) : la vraie caméra, le temps par lecture, la fluidité.
  - [ ] 7. Décision du propriétaire sur les poids AffectNet (valence et éveil), `DEMANDES.md`. À l'intégration dans l'app : relire le `PrivacyInfo.xcprivacy` livré dans `TensorFlowLiteC.xcframework`.
- [ ] **I8 — Le reste du natif** (28/10 : sonde vocale `VoiceProbe` en Swift, PR #40) : voix, temps d'écran, montre Huawei (BLE), détection des sources : étude honnête
  (sources datées) puis ce qui est faisable ; ⛔ argumentés dans `PARITE.md`.
- [ ] **I9 — Publication** (28/10 : fiche App Store fr-FR en brouillon, PR #35, mergée ; réponses « Confidentialité de l'app » (A5) et données collectées du manifeste, PR #39 ; `PrivacyInfo.xcprivacy` et `ITSAppUsesNonExemptEncryption` préparés, vérifiés par la
  CI ; données collectées à compléter avec A5 ; captures 6,9" à la demande, données de démo fidèles à l'iPhone, PR #41 mergée ; 8 captures choisies le 29/10, `store/app-store/captures.md` ; textes sans lecture du visage ni « dans Apple Watch », PR #42) : signature par la CI (A2), envoi TestFlight interne à chaque version suivie, fiche App
  Store fr-FR (`store/`), captures, `PrivacyInfo.xcprivacy`, réponses « Confidentialité de l'app » (A5), relecture
  des directives d'Apple (santé, abonnement, IA) ; la soumission reste un geste du propriétaire.
  - [x] Politique de confidentialité propre à l'iPhone, embarquée (29/10, `overlay/app/public/confidentialite-iphone.html`,
    correctif 26 : Réglages → Confidentialité l'ouvre sur iPhone) : app Santé, copie de secours et iCloud, capteurs
    Bluetooth, visage, météo, analyse IA sans jeton Google, aucun achat pour l'instant ; ni montre Huawei, ni temps
    d'écran, ni Withings. Lien « ‹ Revenir à Halcya » en tête (pas de bouton retour sur iPhone). Témoin : quand la
    page d'Android change, `privacyPolicyIphone.test.js` échoue jusqu'à relecture de la page iPhone (empreinte à
    mettre à jour).
  - [ ] Publier en ligne la page de confidentialité et une page d'assistance (deux URL exigées par la fiche) :
    29/10, workflow `pages.yml` et `scripts/site.mjs` prêts (page d'assistance `site/assistance.html` ; la
    confidentialité est celle de l'app, sans son lien de retour ; directive 2.3.10 vérifiée) ; attend **A8** (Pages
    à activer une fois par le propriétaire), puis lancer le workflow. Adresses prévues :
    `https://spreadzenox.github.io/HealthTrack-iOS/confidentialite/` et `…/assistance/`. Contact de l'assistance :
    les demandes GitHub ; une adresse e-mail si le propriétaire en donne une (directive 1.5 : un moyen simple de le
    joindre).
  - [x] Notes pour l'examen d'Apple, en anglais, prêtes à coller (`store/app-store/notes-examen.md`, 29/10) ; à relire
    avant la soumission (I6, directive 5.1.3 (ii), adresses après A8).
  - [x] Conditions d'utilisation propres à l'iPhone (29/10, `overlay/app/public/conditions-iphone.html`, correctif 26 :
    Réglages → Conditions les ouvre de nouveau sur iPhone) : aucun achat, App Store et contrat de licence standard
    d'Apple, app Santé et sauvegarde iCloud, « pas un dispositif médical » et 15 ou 112 (directive 1.4.1) ; même
    lien de retour ; témoin `conditionsIphone.test.js` (empreinte de la page d'Android) ; publiées aussi sur le site
    (`…/conditions/`, avec A8).
  - [ ] Avec I6 : leur partie vente (formules, renouvellement, annulation, remboursements par Apple), et les liens de
    confidentialité et de conditions du paywall (`PRIVACY_URL`, `TERMS_URL` d'Android) à remplacer.
  - [ ] Données de démo iPhone (`captureMode.js`, `iphoneDemoEntries`) : le poids et la masse grasse y viennent de
    « Withings » (connexion directe, absente sur iPhone) ; les montrer comme venant de l'app Santé (29/10, vu sur la
    capture Nutrition de #49, hors des 8 captures de la fiche). Mais le code partagé annonce un poids de Health Connect
    (et donc de l'app Santé) « (saisi le …) » : demande à Android (`DEMANDES.md`, 29/10) avant de toucher la démo.
  - [ ] **Directive 5.1.3 (ii) d'Apple** : une app « ne doit pas stocker de données de santé personnelles dans
    iCloud ». La copie de secours (I3) part dans la sauvegarde iCloud de l'iPhone : risque de refus à l'examen. À
    trancher avant la soumission : garder (sauvegarde du système, choisie et chiffrée par l'utilisateur), l'exclure
    de la sauvegarde (la restauration passe alors par l'export), ou n'y laisser que ce qui ne vient pas de l'app
    Santé (qui se réimporte seule). La page de confidentialité décrit l'état actuel. 29/10 : recherche dans
    `RECHERCHE.md` (rien d'officiel sur la sauvegarde de l'appareil) ; recommandation : demander à Apple
    (consultation « Meet with Apple » après A1), sinon exclure la copie de la sauvegarde avant la soumission.
- [ ] **Ensuite — suivi continu** : chaque version Android suivie, correctifs refaits, nouveautés vérifiées.

## Idées et questions ouvertes

- Sur l'iPhone 12 : toucher « Prendre une photo » (repas) et « Utiliser ma position approximative » (Météo) ; les phrases d'usage sont en place depuis le 28/10 (PR #45), le simulateur n'a ni caméra ni position réelle.

- Raccourci ou widget « Lire mon bien-être » pour compenser l'absence de lecture au déverrouillage.
- Apple Watch : HealthKit couvre déjà sommeil, FC, VFC, pas — atout de la version iOS.
- Huawei Santé sur iOS écrit une partie de ses données dans Santé : vérifier lesquelles (sommeil ? VFC ?).
