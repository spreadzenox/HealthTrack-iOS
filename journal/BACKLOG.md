# Backlog — Halcya sur iOS

> Un run = une étape testable et mergeable. L'ordre peut s'adapter, mais deux règles ne bougent pas : HealthTrack
> (Android) reste en lecture seule, et les livraisons Android sont reportées dans `PARITE.md` à chaque run, même
> pendant le rattrapage.

## Prochaines étapes

- [x] **I0 — Mise en place** (27/10, session de configuration avec le propriétaire) : dépôt `HealthTrack-iOS`
  public, charte, parité de départ, `upstream.json` + `scripts/upstream.sh` (testé : récupère Android v514, applique
  les correctifs, échoue clairement si l'un ne s'applique plus).
- [ ] **I1 — Socle iOS sur simulateur**
  - [x] Variante `appstore` (27/10) : correctif de `app/src/config/distribution.js` (comme play : relais IA, pas
    d'auto-mise à jour, abonnement App Store) ; les tests d'Android passent avec le correctif.
  - [x] `@capacitor/ios` 8.2 installé par le workflow (`npm install --no-save`, pas de correctif de `package.json`),
    `cap add ios` (CLI 8 via `npx -p`) → projet dans `ios/` (Swift Package Manager), bundle id `fr.jpesquet.sante`,
    nom « Halcya », icône et écran de démarrage générés depuis le glyphe d'Android (27/10).
  - [x] Version : `MARKETING_VERSION` = `versionCode` de `upstream.json`, `CURRENT_PROJECT_VERSION` =
    `<versionCode>.<commits de ce dépôt>`, passés à `xcodebuild` par le workflow (27/10).
  - [~] Workflow `ios-build.yml` (27/10 : build + captures ; 27/10 14:05 : chaque page avec les données de démo
    d'Android, en clair et quelques-unes en sombre, onboarding d'une installation vierge, parcours piloté par l'app
    elle-même (`captureMode.js`), console JavaScript relayée dans `js-errors.txt` ; reste : états vides de chaque page, et faire échouer la build sur erreur JavaScript une fois
    le bruit connu) (PR, push `main`, `workflow_dispatch`) : `scripts/upstream.sh`, `npm ci`,
    `npm run test`, build web (`VITE_DISTRIBUTION=appstore`), `cap sync ios`, `xcodebuild` pour le simulateur sans
    signature, lancement sur deux simulateurs (390 × 844 points comme l'iPhone 12 de test, et un récent), captures de
    chaque page (clair / sombre, données vierges / démo) en artefact, échec sur erreur JS ; `concurrency` qui annule
    les runs dépassés d'une même PR.
- [ ] **I2 — Audit de parité et replis propres** : compléter `PARITE.md` fonction par fonction (changelog depuis le
  lancement play, `journal/PRODUIT.md`, écrans) ; sur iOS, chaque service qui appelle un plugin Android absent
  retombe proprement (pas d'erreur, pas de carte cassée, pas d'interrupteur qui ne fait rien) ; % de parité.
- [ ] **I3 — Données** : durabilité d'IndexedDB dans WKWebView, sauvegarde iCloud, export / import JSON par la feuille
  de partage (y compris d'un téléphone Android vers un iPhone), secrets dans le Trousseau (ThisDeviceOnly).
- [ ] **I4 — Santé (HealthKit)** par `@capgo/capacitor-health` (déjà une dépendance d'Android ; il annonce iOS) :
  mêmes types que Health Connect, historique, autorisations au bon moment avec divulgation.
- [ ] **I5 — Notifications** : bilan du ventre du soir, note du soir, rappel de portion, rappel de fin d'essai ;
  actions dans la notification, réponse rangée à l'ouverture suivante.
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
