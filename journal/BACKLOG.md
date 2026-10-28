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
  - [ ] Reste pour plus tard : états vides de chaque page ; faire échouer la build sur erreur JavaScript (plus de
    bruit depuis le 27/10 16:18 : 0 erreur sur la CI de la PR #2).
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
- [ ] **I3 — Données** : durabilité d'IndexedDB dans WKWebView (27/10 : non durable d'après Capacitor et WebKit,
  plan dans `RECHERCHE.md` : `persist()`, instantané automatique en fichier natif, restauration proposée si la base
  est vide ; 27/10 : copie de secours automatique, PR #6), sauvegarde iCloud, export / import JSON par la feuille
  de partage (y compris d'un téléphone Android vers un iPhone), secrets dans le Trousseau (ThisDeviceOnly).
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
    l'iPhone 16e, toucher du test fiabilisé ; mergée, vu sur les deux iPhone) ; ensuite les montrer dans le Journal ;
    à refaire sur l'iPhone 12.
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
    sous-catégorie). « Mes appareils » compte la VFC SDNN (correctif 19, PR #25). Reste : norme personnelle SDNN
    (`baselines.js` : par une liste propre à iOS, un test d'Android attend exactement deux mesures), radar.
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
  - [ ] Import des réponses à l'ouverture suivante vérifié en capture (boîte vidée dans l'historique) ; gestes sur
    l'iPhone 12 après A1.
- [ ] **I6 — Abonnement et relais** : StoreKit 2 (plugin Swift dans `ios/`), mêmes formules (annuel mis en avant,
  mensuel, essai 14 jours), prix lus dans StoreKit ; côté relais (dans HealthTrack → `DEMANDES.md`) : vérification des
  transactions signées par Apple, notifications serveur V2, App Attest, mêmes crédits IA, même période de lancement.
- [ ] **I7 — Bien-être par le visage** à l'ouverture de l'app : Vision + mêmes modèles (ONNX Runtime iOS ou Core ML),
  mêmes scores qu'Android sur les vecteurs de référence (`journal/protocoles/visage-*.py` d'Android).
- [ ] **I8 — Le reste du natif** : voix, temps d'écran, montre Huawei (BLE), détection des sources : étude honnête
  (sources datées) puis ce qui est faisable ; ⛔ argumentés dans `PARITE.md`.
- [ ] **I9 — Publication** : signature par la CI (A2), envoi TestFlight interne à chaque version suivie, fiche App
  Store fr-FR (`store/`), captures, `PrivacyInfo.xcprivacy`, réponses « Confidentialité de l'app » (A5), relecture
  des directives d'Apple (santé, abonnement, IA) ; la soumission reste un geste du propriétaire.
- [ ] **Ensuite — suivi continu** : chaque version Android suivie, correctifs refaits, nouveautés vérifiées.

## Idées et questions ouvertes

- Raccourci ou widget « Lire mon bien-être » pour compenser l'absence de lecture au déverrouillage.
- Apple Watch : HealthKit couvre déjà sommeil, FC, VFC, pas — atout de la version iOS.
- Huawei Santé sur iOS écrit une partie de ses données dans Santé : vérifier lesquelles (sommeil ? VFC ?).
