# Journal de bord — Halcya sur iOS

## 📅 Semaine en cours — S44 (lundi 26 octobre → dimanche 1er novembre 2026)

> Résumé tenu à jour à chaque run de la routine iOS : **c'est ce que lit le propriétaire.**
> Le premier run d'une nouvelle semaine (lundi, heure de Paris) archive ce bloc dans `semaines/AAAA-Sww.md` et en
> ouvre un neuf.

**Où en est iOS**

| | Android (Google Play) | iOS (App Store) |
|---|---|---|
| Dernière version | v555 (28/10) | v553 sur iPhone simulé (28/10, PR #32) ; v555 en vérification (PR #34) |
| Où l'installer | Play Store, test fermé | pas encore (simulateur seulement ; TestFlight après l'action A1) |
| Parité des fonctions | référence | 30 % (14 fonctions vérifiées sur 47 faisables ; audit I2 en cours) |

**👉 Prochaine action du propriétaire** (rien d'urgent : tout avance d'abord sur simulateur)
- **A1** — quand il le décide : adhérer à l'Apple Developer Program (payant, à l'année ; marche à suivre en 5 étapes
  au §8, « A1 pas à pas »). C'est ce qui
  débloque l'installation sur un vrai iPhone, TestFlight et l'App Store.
- ✅ Fait le 28/10 : vous avez transmis à la routine Android les 4 demandes de `DEMANDES.md` (iPhone au contrôle
  d'intégrité, abonnement App Store sur le serveur, Nouveautés propres à Android, textes de sauvegarde neutres) ;
  elle les a reprises le jour même (v553) : trois faites, l'abonnement App Store noté pour plus tard.
- (facultatif) Donner la version d'iOS de l'iPhone 12 de test (Réglages → Général → Informations → Version d'iOS).

**Ce que vous pouvez voir dès maintenant** : les captures de l'app sur iPhone simulé, refaites à chaque changement
(taille de l'iPhone 12 et iPhone récent, clair et sombre) : https://github.com/spreadzenox/HealthTrack-iOS/tree/captures/main

**Ce qui ne pourra pas marcher pareil sur iPhone** (à confirmer, détail dans `PARITE.md`)
- Lecture du visage **au déverrouillage** : iOS ne laisse pas une app utiliser la caméra en arrière-plan → lecture à
  l'ouverture de l'app (comme la version Google Play actuelle), raccourci ou widget à étudier.
- **Temps d'écran** du téléphone : Apple ne laisse pas une app lire ces chiffres → à l'étude (I8).
- **Montre Huawei en direct** : sur iPhone, pas de Bluetooth « classique » pour les apps → passer par l'app Santé
  d'Apple (Huawei Santé y écrit une partie des mesures) ; piste Bluetooth basse consommation à étudier (I8).

**Ce qui a changé cette semaine**
- **28/10 08:55 — les rappels du soir et de portion sont prêts sur iPhone** (PR #23 à #26) : sur les deux iPhone
  simulés, répondre d'un geste au bilan du ventre ou à la note du soir range la réponse sans ouvrir l'app, et elle
  apparaît dans l'historique à l'ouverture suivante ; le rappel de portion rouvre la réintroduction. Votre norme
  personnelle de variabilité cardiaque (VFC) fonctionne aussi avec les mesures de l'app Santé. Parité : 30 %.
- **28/10 07:25 — la note du soir et le rappel de portion arrivent sur iPhone** (PR #24) : le soir, « Votre
  soirée ? » propose les 6 notes de 0 à 5 dans la notification (les 6 s'affichent bien sur iPhone), et la note est
  rangée sans ouvrir l'app ; pendant une réintroduction, le rappel de la portion du jour rouvre la page de la
  réintroduction quand on le touche (un défaut propre à l'iPhone trouvé et corrigé en chemin). Vérifié sur les deux
  iPhone simulés ; reste à le faire sur l'iPhone 12.
- **28/10 06:25 — répondre au bilan du ventre d'un geste, vérifié sur iPhone simulé** (PR #23) : sur les deux
  iPhone simulés, un test automatique déplie la notification du soir et touche « Gêne » ; la réponse est rangée sans
  ouvrir l'app, comme sur Android. En préparation (PR #24) : la note du soir d'un geste (0 à 5) et le rappel de la
  portion du jour pendant une réintroduction.
- **28/10 02:30 — le bilan du ventre du soir arrive sur iPhone** (PR #20, mergée ; notification capturée par la PR #21) : dans Paramètres, le réglage
  « Bilan du ventre le soir, d'un geste depuis une notification » apparaît ; le soir, une notification discrète
  propose Calme / Gêne / Douleur, et la réponse est rangée sans ouvrir l'app, comme sur Android. La notification
  s'affiche bien sur iPhone simulé ; le geste lui-même reste à vérifier (sur l'iPhone 12 au plus tard).
- **28/10 00:40 — la variabilité cardiaque (VFC) de l'app Santé arrive sur iPhone** (PR #16) : l'iPhone la mesure
  autrement qu'Android ; Halcya la lit, la montre à part dans le Journal (« VFC (SDNN) ») et ne la mélange jamais
  avec celle d'Android dans les analyses. Les mesures venues de l'app Santé y sont présentées comme telles (PR #13).
- **27/10 23:20 — un guide des montres pensé pour l'iPhone** (PR #14) : dans Sources, « Votre montre n'apparaît
  pas ? » explique maintenant comment faire arriver dans l'app Santé les mesures d'une Apple Watch, d'une Garmin,
  d'une Huawei, d'une Xiaomi ou d'autres marques, et prévient que les Galaxy Watch récentes ne marchent pas avec un
  iPhone. Plus aucun renvoi vers Android.
- **27/10 22:40 — Halcya lit vraiment l'app Santé (sur iPhone simulé)** (PR #12) : un test automatique accepte la
  fenêtre d'autorisation, puis Halcya écrit 1234 pas dans l'app Santé et les relit. C'est la preuve que l'import
  marche de bout en bout, avant même d'avoir l'iPhone 12. Prochaines versions : ces mesures affichées « App Santé »
  dans le Journal, et un guide des montres pensé pour l'iPhone (Apple Watch, Garmin, Huawei, Xiaomi…).
- **27/10 19:10 — Halcya sait lire l'app Santé sur iPhone** (PR #9) : la carte « App Santé » de Sources et
  l'onboarding demandent l'accès à l'app Santé d'Apple, comme Health Connect sur Android. La VFC n'est pas encore
  lue (l'iPhone la mesure autrement qu'Android). À confirmer avec de vraies mesures.
- **27/10 18:30 — la lecture de l'app Santé pourra se préparer sans attendre l'abonnement Apple** (PR #7) : sur
  l'iPhone simulé, Halcya obtient déjà la fenêtre d'autorisation de l'app Santé. L'étape « montres et santé » (I4)
  peut donc avancer avant votre adhésion à l'Apple Developer Program, qui reste nécessaire pour l'iPhone 12.
- **27/10 17:20 — une copie de secours de vos données sur iPhone** (PR #6) : sur iPhone, le système peut effacer
  la base d'une app quand le téléphone manque de place. Halcya y tiendra donc à jour une copie de toutes vos
  données dans l'app Fichiers (dossier Halcya), restaurable en un geste par « Importer ».
- **27/10 17:05 — sur iPhone, plus rien ne renvoie vers Android** (PR #4) : les montres passent
  par l'app Santé d'Apple (lecture dans une prochaine version), la sauvegarde et le rapport PDF s'envoient par la
  feuille de partage et se retrouvent dans l'app Fichiers, et les réglages qui dépendent d'Android (rappels du
  soir, voix) n'apparaissent plus tant que leur version iPhone n'existe pas. Parité mesurée : 19 %.
- **27/10 16:05 — toutes les pages photographiées sur iPhone simulé** : à chaque changement, 18 captures par iPhone
  (onboarding, 14 pages avec les données de démonstration, 3 en thème sombre), sur la taille de l'iPhone 12 et sur un
  iPhone récent. Elles ont montré ce qui parle encore d'Android sur iPhone (abonnement « Google Play », lecture du
  visage, sauvegarde Google, Health Connect) : l'étape suivante (I2) les corrige, première partie en relecture
  (PR #3) ; elle ajoute aussi les phrases d'autorisation Bluetooth et Santé sans lesquelles iOS fermerait l'app.
- **27/10 13:45 — Halcya démarre sur iPhone (simulé)** : projet iOS (nom, icône « H nuit », écran de démarrage),
  construit automatiquement à chaque changement ; sur un iPhone de la taille de l'iPhone 12, l'onboarding puis
  l'Accueil s'affichent correctement. Même numéro que la version Play (516). La version Android n'est pas touchée :
  ses 2 563 tests passent avec les adaptations iOS.
- **27/10 — dépôt iOS séparé** : la version iOS vit dans son propre dépôt, `spreadzenox/HealthTrack-iOS`, qui suit
  le dépôt Android sans jamais y écrire. Rien ne change pour la version Google Play ni pour sa routine.
- **26–27/10 — mise en place** avec le propriétaire : charte, liste de parité de départ, backlog I0 → I9, script qui
  récupère le code Android au commit suivi.

**Téléphone de test** (A0, réponse du propriétaire le 26/10) : l'**iPhone 12** de sa compagne, première testeuse
via TestFlight.

**Runs de la semaine**

| Date (Paris) | Run | Ce qui a été fait | PR |
|---|---|---|---|
| 27/10 12:30 | mise en place | dépôt iOS, charte, parité, backlog, `scripts/upstream.sh` | (commit initial) |
| 27/10 13:05 | I1 socle | variante appstore, projet Xcode, icône, build simulateur + captures (onboarding et Accueil OK) | #1 |
| 27/10 14:05 | I1 captures | parcours de 18 pages sans erreur JavaScript, mais captures décalées : PR laissée ouverte, synchronisation à fiabiliser | #2 (ouverte) |
| 27/10 15:40 | I1 captures (suite) | synchronisation par fichier + accusé : les 36 captures correspondent à leur page ; projet iOS prioritaire (runs pleins) ; I2 : 7 replis iPhone et phrases d'usage | #2, #3 (ouverte) |
| 27/10 16:22 | I2 Santé | suivi d'Android v522 ; PR #3 mergée ; sur iPhone, plus de Health Connect ni de montre Huawei en direct, sauvegarde et PDF par la feuille de partage, 8 services à plugin absent repliés ; parité 19 % | #3, #4 |
| 27/10 17:10 | I2 captures, I3 copie de secours | suivi d'Android v524 ; captures des pages longues et du choix de la montre ; IndexedDB non durable sur iOS → copie de secours automatique | #5, #6 |
| 27/10 18:00 | I3 (fin de la PR #6), essai I4 | suivi d'Android v525 ; lecture de l'app Santé : le module d'Android sert aussi sur iPhone, VFC à ne pas mélanger (SDNN contre RMSSD) ; essai HealthKit sur simulateur | #6, #7, #8 |
| 27/10 19:00 | I4 Santé | essai HealthKit mergé ; Halcya lit l'app Santé sur iPhone (à vérifier avec de vraies données) ; PR #8 réparée | #7, #8, #9 |
| 27/10 20:00 | finitions I2/I3 | suivi d'Android v527 ; plus d'erreur de console liée à la copie de secours ; « Mes appareils » parle de l'app Santé | #10 |
| 27/10 21:00 | essai d'import Santé | plantage de la build de test expliqué et corrigé (écriture dans Santé sans phrase d'usage) ; l'outil qui devait accepter la fenêtre Santé sur la CI est bloqué par une protection (non contournée) → test d'interface à écrire ; marche à suivre de l'adhésion Apple (A1) prête | #11 (ouverte) |
| 27/10 22:00 | I4 Santé (suite) | **Halcya écrit et relit une mesure de l'app Santé sur iPhone simulé** (test d'interface qui accepte la fenêtre, #12) ; mesures importées affichées « App Santé » (#13, un test à reprendre) ; guide des montres réécrit pour l'iPhone (#14) | #11, #12, #13, #14, #15 (ouvertes : #13 à #15) |
| 27/10 23:00 | I4 Santé (fin de vérification) | guide des montres pour l'iPhone mergé et photographié (#14) ; pas écrits dans Santé relus aussi par le connecteur de l'app (1 iPhone sur 2 : le test d'interface a raté un toucher sur l'autre, corrigé) ; un test d'Android capricieux signalé (`DEMANDES.md`) | #14, #15 ; #13 (ouverte) |
| 28/10 00:00 | suivi d'Android v530, I4 VFC | suivi d'Android v530 (plein écran Android : sans objet sur iPhone ; une seule piste « bouger ») ; mesures affichées « App Santé » (#13) ; la VFC de l'app Santé est lue sur iPhone, rangée à part de celle d'Android (mesurée autrement) et montrée dans le Journal (#16) | #13, #16 (mergées) |
| 28/10 01:00 | suivi d'Android v531, I5 (début) | suivi d'Android v531 (une seule question le soir sur la carte ventre) ; un test d'Android tombé en panne à minuit (date figée) réparé côté iOS et signalé (`DEMANDES.md`) ; premières règles des rappels du soir en Swift, testées (#18) | #17, #18 |
| 28/10 02:00 | suivi d'Android v533, I5 (bilan du soir) | suivi d'Android v533 : Android a repris nos deux demandes (tests réparés) ; le bilan du ventre du soir par notification existe sur iPhone (plugin en Swift, à vérifier en capture) | #19, #20 |
| 28/10 03:00 | suivi d'Android v534, I5 (notification) | sur iPhone simulé, l'autorisation des notifications est accordée et la notification du bilan du soir s'affiche (première version ratée par une erreur de ma part, corrigée) | #21 |
| 28/10 04:00 | I5 (notification, suite) | notification du soir visible dans le centre de notifications (capturée) ; la réponse d'un geste reste à automatiser ; Android v536 préparé | #21 |
| 28/10 05:00 | suivi d'Android v540, I5 (réponse d'un geste) | iOS à jour d'Android v540 (un correctif refait) ; **sur iPhone simulé, la réponse « Gêne » donnée depuis la notification est rangée sans ouvrir l'app** (1 iPhone sur 2 : l'autre a manqué la bannière, délai corrigé) | #22 (mergée), #23 |
| 28/10 06:00 | suivi d'Android v542, I5 (note du soir, rappel de portion) | Android v542 sans effet sur iPhone (signalement des appareils de test de Google) ; **réponse « Gêne » d'un geste vérifiée sur les deux iPhone simulés** (#23 mergée) ; la note du soir d'un geste (0 à 5) et le rappel de la portion du jour existent sur iPhone, à vérifier en capture : iOS n'affiche peut-être que 4 boutons sur 6 | #23 (mergée), #24 |
| 28/10 07:00 | I5 (note du soir, rappel de portion), I4 | **note du soir (les 6 notes s'affichent) et rappel de portion vérifiés sur les deux iPhone simulés** ; le rappel touché ne rouvrait pas la réintroduction sur iPhone (le toucher arrive plus tard que sur Android) → corrigé ; la VFC de l'app Santé comptée dans « Mes appareils » | #24 (mergée), #25 |
| 28/10 08:00 | suivi d'Android v544, I5, I4 | **les trois rappels (bilan du ventre, note du soir, rappel de portion) vérifiés de bout en bout sur iPhone simulé** : geste depuis la notification, réponse rangée puis entrée dans l'historique (**parité 30 %**) ; norme personnelle de la VFC de l'app Santé ; Android v544 (onglets du Journal plus lisibles, vérifiés sur la taille de l'iPhone 12) ; radar avec la VFC de l'app Santé en relecture | #25, #26 (mergées), #27 |
| 28/10 09:00 | suivi d'Android v545, I4, I9 | Android v545 : un écart à votre norme n'est plus affiché comme une alerte (aussi sur iPhone) ; radar avec la variabilité cardiaque de l'app Santé ; déclaration de confidentialité exigée par l'App Store préparée ; ce qu'il faudra au serveur pour l'abonnement sur iPhone précisé (`DEMANDES.md`) | #27 (mergée), #28 |
| 28/10 10:00 | suivi d'Android v548, I9, I3 | Android v548 : une piste n'est dite « solide » qu'avec assez de jours (aussi sur iPhone) ; déclaration de confidentialité exigée par l'App Store en place ; vos données exportées puis réimportées sur iPhone sans perte ni doublon ; après une restauration sur un nouvel iPhone, l'app retirera les codes propres à l'ancien téléphone, comme sur Android (en vérification) | #28, #29 (mergées), #30 |
| 28/10 11:00 | suivi d'Android v551, I3 | Android v551 : l'Accueil annonce vos pistes, Analyses dit chaque lien en une phrase (aussi sur iPhone) ; mesuré : la sauvegarde iCloud de l'iPhone n'emporte pas la base de l'app, seulement sa copie de secours, qui se restaure depuis « Vos données » ; corrigé : « Supprimer toutes mes données » laissait cette copie sur l'iPhone, elle est maintenant effacée aussi | #30 (mergée), #31 |
| 28/10 12:00 | suivi d'Android v553, I3 | « Supprimer toutes mes données » efface maintenant aussi la copie de secours sur iPhone (vérifié) ; Android v553 a repris vos 4 demandes (l'iPhone ne sera pas bloqué par le contrôle d'intégrité, notes propres à Android cachées sur iPhone) ; après une restauration iCloud, l'iPhone proposera de reprendre vos données dès le premier écran (en vérification) | #31 (mergée), #32 |
| 28/10 13:20 | suivi d'Android v555, I3, I6 | après une restauration iCloud, l'iPhone propose dès le premier écran de reprendre vos données (vérifié : toutes reprises d'un geste) ; Android v555 : historique du bien-être plus lisible (aussi sur iPhone) ; l'abonnement App Store est prêt côté iPhone mais reste éteint tant que le serveur ne sait pas vérifier les achats d'Apple ; en essai : choisir un fichier de sauvegarde dans l'app Fichiers | #32 (mergée), #33, #34 |

---

## Charte

### 1. Mission

Porter Halcya sur iPhone et **maintenir la version iOS au même niveau d'avancement et au même numéro de version que
la version Google Play**, sans jamais gêner, ralentir ni casser la version Android et son développement. La routine
Android (« HealthTrack — amélioration autonome », PR `[Auto]` dans HealthTrack) mène le produit ; la routine iOS
(« Halcya iOS — parité avec Android », dans ce dépôt) suit. **Depuis le 27/10 (vers 15:30), le projet iOS est la
priorité du propriétaire** : runs pleins (jusqu'à 50 min), étapes enchaînées ; HealthTrack reste en lecture seule.

- **Référence = la variante play** : même parcours, mêmes écrans, mêmes textes, mêmes fonctions, même modèle
  économique (abonnement par les achats intégrés d'Apple au lieu de Google Play Billing), même relais IA (Vertex AI,
  aucune clé dans l'app). Les fonctions propres à la sideload (mise à jour par APK, clé Gemini saisie, guides de
  développeur) sont sans objet sur iOS.
- **Chaque fonction play a son équivalent iOS**, ou une ligne « ⛔ impossible sur iOS » argumentée (règle Apple ou
  API inexistante, source datée) avec la meilleure alternative. [`PARITE.md`](PARITE.md) est la vérité.
- **Le prompt de la routine prime** sur cette charte en cas de contradiction ; la routine peut améliorer la charte
  quand elle trouve une meilleure façon de travailler.

### 2. Deux dépôts, une seule règle

| Dépôt | Rôle | Accès de la routine iOS |
|---|---|---|
| `spreadzenox/HealthTrack` | l'app (code web partagé), la version Android, le relais, le journal du produit | **lecture seule** |
| `spreadzenox/HealthTrack-iOS` (ici) | tout ce qui est propre à iOS : correctifs, projet natif, workflows macOS, fiche App Store, journal iOS | lecture et écriture |

- Dans HealthTrack, la routine iOS **lit** (code, `journal/PRODUIT.md`, `journal/BACKLOG.md`, `journal/DESIGN.md`,
  `app/src/data/changelog/`, workflows) et **n'écrit jamais** : ni push, ni branche, ni PR, ni commentaire, ni
  workflow lancé, ni réglage.
- Un changement nécessaire côté HealthTrack (ex. le relais qui doit vérifier les achats App Store, ou un petit point
  d'accroche qui rendrait un correctif inutile) → une ligne dans [`DEMANDES.md`](DEMANDES.md) ; le propriétaire la
  transmet s'il le veut à la routine Android. En attendant, contourner côté iOS.

### 3. Comment la build iOS est faite

1. `upstream.json` fixe le commit Android suivi et son numéro (`versionCode` = `git rev-list --count` de ce commit,
   comme l'AAB play).
2. `scripts/upstream.sh` récupère ce commit dans `upstream/` (ignoré par git), applique `patches/*.patch` dans
   l'ordre de leurs noms, copie `overlay/` par-dessus, et copie `ios/` (le projet Xcode) dans `upstream/app/ios`
   (une copie, pas un lien : le `Package.swift` régénéré par `cap sync ios` pointe en relatif vers `app/node_modules`).
   `scripts/upstream.sh --latest` avance d'abord `upstream.json` sur le **dernier commit de main dont « Play — AAB »
   a réussi** : la dernière version réellement envoyée sur Google Play.
3. La build web se fait dans `upstream/app` avec `VITE_DISTRIBUTION=appstore` et `VITE_APP_VERSION` = le
   `versionCode` suivi, puis `npx cap sync ios`, puis `xcodebuild` sur les runners macOS.

Règles des adaptations :
- **Correctif** (`patches/NN-sujet.patch`, produit par `git -C upstream diff HEAD -- <fichiers>` : **HEAD** obligatoire,
  car `git apply --3way` met les correctifs déjà appliqués dans l'index ; exception : un nouveau correctif sur un
  fichier qu'un correctif précédent touche déjà se tire de `git -C upstream diff -- <fichiers>`, sans HEAD, juste
  après `scripts/upstream.sh`, pour ne garder que la nouvelle modification) pour modifier un fichier Android ;
  le plus petit possible, un sujet par fichier, pour qu'il survive aux changements d'Android. Un correctif qui ne
  s'applique plus fait échouer le script : le refaire sur le nouveau code (c'est le travail normal du suivi).
- **Fichier ajouté** (`overlay/<chemin>`) pour du code nouveau propre à iOS (ex. `overlay/app/src/services/appStoreBilling.js`).
  Pas de nouvelle feuille CSS dans `overlay/` : le test `bundleGuard` d'Android exige que toute feuille soit
  chargée d'emblée par `src/pageStyles.js` ; réutiliser les classes d'Android (ex. `.actions`) ou, à défaut, un
  correctif de `pageStyles.js`.
- **Avant chaque push de code** : la suite complète d'Android avec les correctifs (`npx vitest run` dans
  `upstream/app`), pas seulement les tests ciblés (leçon du 27/10 : PR #8 rouge sur `bundleGuard`).
- **CI et commits de journal** (leçons du 28/10) : sur une PR, le filtre de chemins porte sur tout le diff de la
  PR ; un commit de journal seul relance donc la CI et annule celle en cours → le pousser avec le code ou en fin de
  run. Un `[skip ci]` en tête de PR la laisse sans CI. Après un merge, vérifier que la CI de `main` a bien démarré
  (celle de #22 n'est jamais partie : relancée par `workflow_dispatch`). Après un push de Swift, regarder l'étape de
  build quelques minutes plus tard.
- Jamais de copie d'un fichier Android entier dans `overlay/` : elle effacerait en silence les évolutions d'Android.
- Les tests d'Android (`npm run test` dans `upstream/app`) doivent passer avec les correctifs appliqués ; les tests
  propres à iOS vont dans `overlay/` (Vitest) ou `ios/` (XCTest).

### 4. Version

- **Numéro de version iOS** (`CFBundleShortVersionString`) = le `versionCode` Android suivi (ex. `514`) : le même
  nombre que sur Google Play, affiché aussi dans Paramètres (`VITE_APP_VERSION`). Depuis le 27/10 (Android #437),
  la variante play affiche ce nombre (`versionName` = commits de `main`) mais envoie à Google Play un `versionCode`
  de 100000 + ce nombre ; `upstream.json` garde le nombre affiché, qui reste celui d'iOS.
- **Numéro de build** (`CFBundleVersion`) = `<versionCode Android>.<nombre de commits de ce dépôt>` (ex. `514.12`) :
  toujours croissant, même quand seul le code iOS change.
- **Même version** = la dernière build iOS publiée suit le dernier commit envoyé sur Google Play, et `PARITE.md`
  n'y trouve aucune fonction faisable manquante. La plupart des nouveautés Android sont du code web partagé : elles
  arrivent sur iOS en avançant `upstream.json` ; il reste à refaire les correctifs cassés, vérifier sur simulateur et
  cocher.
- **Nouveautés in-app** : variante `appstore` (correctif de `app/src/config/distribution.js`) ; les entrées de
  changelog propres à iOS vont dans `overlay/app/src/data/changelog/` avec `"variants": ["appstore"]`, et
  l'historique iOS commence au lancement iOS (équivalent de `PLAY_CHANGELOG_SINCE`).

### 5. Contraintes techniques

- **Pas de Mac** : les sessions sont des conteneurs Linux. Tout ce qui compile, teste ou capture iOS passe par
  GitHub Actions sur des runners macOS (dépôt public : minutes gratuites). La routine écrit les workflows, les lance,
  lit leurs logs, télécharge leurs artefacts et **regarde** les captures du simulateur.
- **Xcode / SDK** : la version d'Xcode la plus récente des runners ; vérifier l'exigence courante d'Apple sur le SDK
  minimal pour publier, avec sa source, dans `RECHERCHE.md`.
- **Projet** : Capacitor iOS et CLI de **la même version exacte** que `@capacitor/core` d'Android (8.2.0 au 27/10 ;
  `npx -p @capacitor/cli@<version> cap …`, Node 22 exigé) : une CLI plus récente génère un projet qui ne compile pas
  avec le runtime (constaté le 27/10 : `SceneDelegateProxy` introuvable avec la CLI 8.5 et le runtime 8.2). Quand
  Android monte `@capacitor/core`, régénérer ou mettre à jour le projet iOS en conséquence. Swift Package Manager, bundle id `fr.jpesquet.sante` (comme le package play, à confirmer avec A3), nom « Halcya », icône
  « H nuit » (`journal/DESIGN.md` d'Android).
- **Téléphone de test : iPhone 12** (6,1", 390 × 844 points, encoche, puce A14, 4 Go). Cible de déploiement qui
  couvre sa version d'iOS ; captures sur un simulateur de cette taille en plus d'un iPhone récent ; fluidité à
  vérifier sur ce matériel.
- **WKWebView** : `isNativePlatform()` est vrai sur iOS, donc chaque service qui appelle un des plugins natifs maison
  d'Android doit avoir un repli propre tant que l'équivalent Swift n'existe pas (voir `PARITE.md`).
- **Données** : local-first. Vérifier tôt (I3) la durabilité d'IndexedDB dans WKWebView et la sauvegarde iCloud ;
  secrets (appairage, jetons) dans le Trousseau en « ThisDeviceOnly ».

### 6. Protocole d'un run

1. **Démarrage** : vérifier que les deux dépôts sont là (HealthTrack-iOS en écriture, HealthTrack en lecture), partir
   de `origin/main` à jour, lire ce fichier, `PARITE.md`, `BACKLOG.md`, `DEMANDES.md` et les 3 derniers comptes
   rendus (`ls journal/runs | tail -3`).
2. **Ce qu'Android a livré** depuis le dernier run : `scripts/upstream.sh --latest` (nouveau commit suivi), puis dans
   HealthTrack, en lecture, `git log` entre l'ancien et le nouveau commit, nouveaux fichiers de
   `app/src/data/changelog/`, tête de `journal/README.md` et de `journal/PRODUIT.md`. Reporter dans `PARITE.md` §5.
3. **Une autre exécution iOS en cours ?** (PR ouverte ici depuis moins de 75 min, ou workflow en cours sur une
   branche de la routine) → ne pas toucher aux mêmes fichiers.
4. **Priorités** : (a) `main` de ce dépôt rouge → réparer ; (b) une PR de la routine rouge ou en conflit → la
   réparer ; (c) correctifs cassés par la dernière version Android → les refaire ; (d) étape suivante de
   `BACKLOG.md`.
5. **Réaliser** : TDD (Vitest pour le web, XCTest pour le Swift), style du code d'Android, UI en français et au
   vouvoiement, identité visuelle validée (`journal/DESIGN.md` d'Android), conventions iOS (zones sûres, encoche /
   Dynamic Island, indicateur d'accueil, geste de retour). Pendant qu'une build macOS tourne (10 à 20 min), avancer
   la recherche ou la matrice.
6. **Livrer** : compte rendu, `PARITE.md`, `BACKLOG.md`, résumé de la semaine ; PR vers `main` de ce dépôt, merge
   (squash) quand tout est vert. **Bloqué** : pousser quand même compte rendu et résumé, PR ouverte qui explique.

### 7. Garde-fous avant tout merge sur `main`

- `scripts/upstream.sh` passe ; dans `upstream/app`, `npm ci`, `npm run test` et `npm run build`
  (avec `VITE_DISTRIBUTION=appstore`) passent.
- Dès qu'ils existent, les checks iOS de la PR sont verts (build simulateur, XCTest, captures) et les captures des
  écrans touchés ont été regardées.
- Branche remise à jour sur `origin/main` juste avant le merge.
- Sinon : pas de merge, PR laissée ouverte, raison et suite dans le compte rendu.

### 8. Actions du propriétaire (Apple)

Jamais faites par la routine (pas de création de compte, de clé, de certificat ni de dépense). La routine prépare
chaque étape pas à pas, avec les valeurs exactes à saisir, au moment où elle devient utile.

| | Action | Débloque | État |
|---|---|---|---|
| A0 | Téléphone de test | tests sur un vrai téléphone | ✅ 26/10 : iPhone 12 de sa compagne (version d'iOS à préciser) |
| A1 | Adhérer à l'Apple Developer Program (individuel, payant à l'année ; pas à pas ci-dessous) | signature, TestFlight, App Store | à décider |
| A2 | Créer une clé API App Store Connect (rôle exact précisé par la routine) et l'enregistrer en secrets GitHub Actions de ce dépôt, dans un environnement `appstore` réservé à `main` | builds signées et envoi TestFlight automatiques | après A1 |
| A3 | Créer la fiche de l'app dans App Store Connect (nom, langue principale français, bundle id, SKU) | envoi TestFlight, fiche | après A1 |
| A4 | Contrat « Paid Applications », coordonnées bancaires et fiscales | abonnement App Store | après A1 |
| A5 | Remplir « Confidentialité de l'app » (pas d'API) avec les réponses préparées dans `store/` | examen Apple | avant la 1re soumission |
| A6 | Inviter les testeurs (d'abord sa compagne : interne via « Utilisateurs et accès » ou externe avec l'examen bêta, la routine dira), soumettre à l'examen, publier | testeurs, production | lui seul |

#### A1 pas à pas (préparé le 27/10/2026)

1. **Compte Apple** : celui du propriétaire, avec l'identification à deux facteurs activée (obligatoire), au nom
   légal exact (il apparaîtra comme « vendeur » sur l'App Store).
2. **S'inscrire** : sur https://developer.apple.com/programs/enroll/ (ou depuis l'app « Apple Developer » sur
   iPhone, qui propose aussi l'inscription). Choisir **« Individu / entreprise individuelle »** : l'app paraîtra
   sous le nom du propriétaire. Le type « organisation » demande une société avec un numéro D-U-N-S, plus long.
3. **Payer la cotisation annuelle** : 99 USD par an, montant en euros (TVA comprise) affiché par Apple à ce moment-là
   — c'est la seule dépense, et elle revient chaque année (sans renouvellement, l'app quitte l'App Store).
4. **Attendre la validation** (souvent un ou deux jours, parfois une vérification d'identité), puis le dire à la
   routine en une ligne dans cette conversation. Elle prépare alors A2 (clé API, rôle exact) et A3 (fiche de l'app,
   avec les valeurs à recopier).
5. **À savoir avant de publier dans l'UE (Digital Services Act)** : App Store Connect demandera si vous êtes un
   « commerçant ». Avec un abonnement payant, la réponse est oui : une adresse (une boîte postale est acceptée), un
   téléphone et un e-mail seront affichés sur la page de l'app dans l'UE. Rien à faire avant A3 ; mieux vaut
   choisir ces coordonnées à l'avance. Source : aide d'App Store Connect, « Manage EU Digital Services Act compliance
   information » (lue le 27/10/2026).

### 9. Outillage

- **GitHub** : outils `mcp__github__*` s'ils sont présents, sinon `gh api` en REST (pas de GraphQL). Artefacts d'un
  run : `gh api repos/spreadzenox/HealthTrack-iOS/actions/runs/<id>/artifacts` puis `…/artifacts/<id>/zip`.
- **Captures iOS** : le workflow les pousse sur la branche `captures/pr-<N>` (PR) ou `captures/main` ; les lire avec
  `git fetch origin captures/pr-<N>:refs/remotes/origin/captures/pr-<N>` puis `git show origin/captures/pr-<N>:<fichier>`
  (le téléchargement des artefacts peut être bloqué par le réseau de la session).
- **Attendre la CI** sans boucle active : outil Monitor (`until` sur les check-runs) ou abonnement à la PR.
- **Vérification visuelle web** : dans `upstream/app`, `npm run visual` (options en tête de
  `scripts/visual/visual-check.mjs`), avec `VITE_DISTRIBUTION=appstore` ; pour iOS, captures du simulateur produites
  par le workflow iOS (clair et sombre, données vierges et de démo).
- **Mécanique** : la tâche planifiée « Halcya iOS — parité avec Android » se déclenche toutes les heures (à :59, heure
  de Paris, 30 min après la routine Android) dans la session claude.ai « Halcya iOS — routine », qui a les deux dépôts
  attachés, avec le prompt de [`PROMPT-ROUTINE.md`](PROMPT-ROUTINE.md). La conversation est résumée au fil du temps :
  la seule mémoire fiable est ce dossier. Ne pas archiver cette session.

### Modèle de compte rendu

`journal/runs/AAAA-MM-JJ-HHMM-<slug>.md` (heure UTC) :

```markdown
# AAAA-MM-JJ HH:MM UTC — <titre>

**Étape** : I<n>  ·  **PR** : #NN (fusionnée / ouverte)  ·  **Android suivi** : v<N>  ·  **iOS** : v<N>.<b> / —  ·  **Parité** : NN %

## Ce qu'Android a livré depuis le run précédent
- …

## Ce qui a été fait
- …

## Vérifications
- upstream.sh ✅ (N correctifs) · Tests Android avec correctifs : NNN ✅ · Build ✅ · iOS (simulateur) ✅ / —
- Captures regardées : …

## Apprentissages / décisions
- …

## Suite proposée
- …
```
