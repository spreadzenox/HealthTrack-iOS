# Journal de bord — Halcya sur iOS

## 📅 Semaine en cours — S44 (lundi 26 octobre → dimanche 1er novembre 2026)

> Résumé tenu à jour à chaque run de la routine iOS : **c'est ce que lit le propriétaire.**
> Le premier run d'une nouvelle semaine (lundi, heure de Paris) archive ce bloc dans `semaines/AAAA-Sww.md` et en
> ouvre un neuf.

**Où en est iOS**

| | Android (Google Play) | iOS (App Store) |
|---|---|---|
| Dernière version | v658 (31/10) | **658 sur TestFlight** (build 658.141 ; la 638.121 fut la première avec la phrase exigée par Apple) : même version qu'Android |
| Où l'installer | Play Store, test fermé | **TestFlight** (test interne : testeurs ajoutés par le propriétaire, action A6) |
| Parité des fonctions | référence | 48 % (23 fonctions vérifiées sur 48 faisables : le temps d'écran, devenu faisable, attend l'essai sur l'iPhone 12) |

**👉 Prochaine action du propriétaire** (rien d'urgent : tout avance d'abord sur simulateur)
- **31/10 : installez la build la plus récente (658.141), ou au moins la 638.121** : les builds d'avant manquaient d'une phrase exigée par Apple
  (votre e-mail du 31/10, ITMS-90683) ; la 638.121 l'a. Si Apple renvoie un e-mail pour elle, transmettez-le.
- **A6 maintenant : mettre l'app entre les mains de votre compagne** (pas à pas dans la conversation du 30/10) :
  l'inviter dans App Store Connect (Utilisateurs et accès, rôle « Customer Support »), puis créer dans TestFlight un
  groupe de test interne avec elle et la build la plus récente (658.141 aujourd'hui) ; elle installe l'app TestFlight sur son
  iPhone 12.
- (quand vous voulez) **La fiche App Store est complète** dans App Store Connect (Halcya → iOS 658, « Prête à
  soumettre ») : textes, 8 captures, catégorie Santé et forme, âge 18+. Rien n'est soumis. Avant une soumission,
  relisez-la, en particulier les réponses du questionnaire d'âge (`store/app-store/README.md`).
- ✅ **Premier envoi sur TestFlight le 30/10** : Halcya 616 (build 616.97) signée par Apple et reçue par App Store Connect.
- ✅ **A2 fait le 30/10** : clé API « Halcya CI » (Admin) rangée dans l'environnement `appstore` (réservé à `main`,
  sans contournement par les administrateurs) ; **accord du propriétaire pour la signature par Apple** (certificat de
  distribution géré par Apple, créé par la CI). Workflow d'envoi sur TestFlight écrit (`testflight.yml`).
- ✅ **Temps d'écran demandé et accordé le 30/10** (A7) : Apple a accordé « Family Controls (Distribution) » dans la
  minute ; le propriétaire a activé sur l'identifiant Halcya Family Controls (Distribution) **et** Family Controls
  App and Website Usage.
- ✅ **A3 fait le 30/10** : identifiant `fr.jpesquet.sante` (HealthKit, In-App Purchase, App Attest) et fiche créée
  dans App Store Connect sous le nom **« Halcya »** (choix du propriétaire), iOS 1.0 « Prêt à soumettre ».
- ✅ **A1 fait le 30/10** : l'e-mail de bienvenue d'Apple est arrivé (adhésion validée).
- ✅ **A8 fait le 30/10** : GitHub Pages activé ; site publié par la routine (déploiement réussi,
  https://spreadzenox.github.io/HealthTrack-iOS/ : confidentialité, conditions, assistance).
- ✅ Fait le 28/10 : vous avez transmis à la routine Android les 4 demandes de `DEMANDES.md` (iPhone au contrôle
  d'intégrité, abonnement App Store sur le serveur, Nouveautés propres à Android, textes de sauvegarde neutres) ;
  elle les a reprises le jour même (v553) : trois faites, l'abonnement App Store noté pour plus tard.
- (facultatif, quand vous voulez) Transmettre à la routine Android les demandes marquées « à transmettre » dans
  `journal/DEMANDES.md` : dont un défaut visible aujourd'hui sur Android (bouton « Autoriser Health Connect » étiré
  sur toute la hauteur dans l'accueil de l'app) et un libellé « saisi » faux pour un poids de Health Connect.
- Donner la version d'iOS de l'iPhone 12 de test (Réglages → Général → Informations → Version d'iOS) : le temps d'écran
  réel demande iOS 26.4 ou plus.
- **À prévoir, pas urgent tant que l'iPhone reste en TestFlight** : sur Android, la période de lancement (premium
  offert) finit le 20/11 ; sur iPhone, rien n'est vendu tant que l'abonnement App Store n'existe pas, donc tout y
  reste gratuit. Avant de publier sur l'App Store après le 20/11, il faudra A4 (contrat « Paid Applications »,
  banque et fiscalité, dans App Store Connect) ; la routine créera ensuite les abonnements par l'API et finira leur
  branchement (I6).

**Ce que vous pouvez voir dès maintenant** : les captures de l'app sur iPhone simulé, refaites à chaque changement
(taille de l'iPhone 12 et iPhone récent, clair et sombre) : https://github.com/spreadzenox/HealthTrack-iOS/tree/captures/main

**À essayer sur l'iPhone 12 dès l'installation** (build 638.121) : Sources › « Temps d'écran et sommeil » › Activer,
puis accepter la demande de l'iPhone (Face ID ou code). Il faut iOS 26.4 ou plus et un iPhone de l'Union
européenne ; sinon la carte le dit. Le lendemain, la carte montre le temps d'écran de la veille et une nuit estimée.

**Ce qui ne pourra pas marcher pareil sur iPhone** (à confirmer, détail dans `PARITE.md`)
- Lecture du visage **au déverrouillage** : iOS ne laisse pas une app utiliser la caméra en arrière-plan → lecture à
  l'ouverture de l'app (comme la version Google Play actuelle), raccourci ou widget à étudier.
- **Temps d'écran** du téléphone : possible seulement **dans l'Union européenne, avec iOS 26.4 ou plus** (règle
  d'Apple) ; ailleurs, la carte le dit et rien ne s'affiche. Écran écrit (PR #105), à essayer sur l'iPhone 12.
- **Montre Huawei** : en attendant, Huawei Santé écrit une partie des mesures (pas, cœur, sommeil, séances) dans l'app
  Santé d'Apple, que Halcya lit déjà. Deux pistes pour aller plus loin, sans verdict pour l'instant : la liaison
  directe en Bluetooth basse consommation (le seul Bluetooth permis aux apps iPhone, celui qu'utilise Huawei Santé
  sur iPhone), à essayer sur l'iPhone 12 ; et le « HUAWEI Health Kit » en ligne (Huawei Santé › Services tiers ›
  Lier), qui laisserait Halcya lire sommeil et cœur depuis votre compte Huawei, avec un léger différé : il faudrait
  un compte développeur Huawei et l'accord de Huawei (jusqu'à 15 jours ouvrés). À décider quand vous voulez
  (détail dans `RECHERCHE.md`, 31/10).
- **Repérer les apps de montre installées** (Garmin, Oura…) : iOS ne laisse pas une app voir les autres apps → la
  montre est reconnue par les données qu'elle écrit dans l'app Santé, et un guide dit quoi activer dans chaque app.

**Ce qui a changé cette semaine**
- **31/10 05:45 — Halcya 631 sur TestFlight** (build 631.110) : l'iPhone a le même numéro de version qu'Android ;
  Nutrition dit « incertain » plutôt que « bas » quand des repas manquent, champs de saisie à la police de l'app.
- **31/10 05:05 — le temps d'écran arrive sur iPhone** (build 625.108 sur TestFlight) : avec votre accord, Halcya lit
  le temps d'écran, l'écran tard le soir et les prises en main, et estime les nuits sans montre ; le temps par
  catégorie d'app (réseaux sociaux, vidéo…) suit (PR #110).
- **31/10 04:05 — Halcya 625 sur TestFlight** (build 625.107) : boutons inactifs gris clair, repas habituels à une
  majuscule ; Android v626 à v629 (Nutrition « incertain » quand des repas manquent, champs à la police de l'app) en
  vérification.
- **31/10 03:05 — Halcya 624 sur TestFlight, temps d'écran en route** : la 624 (build 624.105) est envoyée, signée
  par Apple avec les droits du temps d'écran ; sur iPhone, l'écran « Temps d'écran et sommeil » lira, avec votre
  accord, le temps d'écran, l'écran tard le soir et les prises en main (PR #105, en vérification).
- **28/10 19:00 — abonnement d'essai et captures de la fiche App Store** (PR #40 et #41, mergées) : sur iPhone
  simulé, un abonnement d'essai s'achète et reste actif, sans compte Apple ; les captures en taille 6,9" pour la fiche
  sont prêtes et ne montrent que ce que l'iPhone fait vraiment (montre Apple Watch, pas d'app Android).
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
| 28/10 14:05 | I6, I9, I3 | partie iPhone de l'abonnement App Store mise en place (éteinte tant que le serveur ne vérifie pas les achats d'Apple) ; brouillon de la fiche App Store en français (nom, sous-titre, description, mots-clés) ; choix d'un fichier dans l'app Fichiers : 1er essai raté (le bouton s'appelle « Explorer » sous iOS 26), corrigé et relancé | #33 (mergée), #34, #35 |
| 28/10 15:00 | suivi d'Android v559, I3, I6, I9 | vérifié : choisir un fichier de sauvegarde dans l'app Fichiers puis l'ajouter à vos données marche sur iPhone (un ancien fichier compris) ; Android v559 : boutons arrondis partout (aussi sur iPhone) ; achat d'abonnement d'essai sur simulateur : premier essai à corriger (erreur de compilation), relancé | #34 (mergée), #35, #36 |
| 28/10 16:00 | I9, I3, I6 | iPhone au niveau d'Android v559 (boutons arrondis vérifiés) ; fiche App Store en français prête en brouillon ; réponses du questionnaire « Confidentialité de l'app » préparées pour vous (les mêmes que pour Google Play) ; export par la feuille de partage : réussi sur un iPhone, l'autre relancé ; achat d'abonnement d'essai : 2e essai en cours | #35 (mergée), #36, #37, #38, #39 |
| 28/10 17:00 | suivi d'Android v563, I3, I9, I6 | réponses « Confidentialité de l'app » en place (PR #39 mergée) ; vos données s'exportent, s'importent et reviennent après une restauration sur iPhone, réglages compris (vérifié) : la fonction « Données » est au niveau d'Android (parité 32 %) ; Android v563 : textes plus justes sur où vont vos données (aussi sur iPhone, deux adaptations refaites) ; achat d'abonnement d'essai : bloqué par un bogue d'Apple sur iOS 26.5, 3e essai sur un iPhone simulé plus ancien | #39 (mergée), #36, #37 |
| 28/10 18:00 | suivi d'Android v565, I3, I6, I8 | vos données : export, import et restauration avec vos réglages, vérifiés et en place (PR #37 mergée) ; premier achat d'abonnement d'essai réussi sur iPhone simulé, sans compte Apple ; l'iPhone sait dire s'il reconnaît le français sur le téléphone (préalable de la dictée du soir) ; Android v565 : carte de Sources au titre court (aussi sur iPhone, « App Santé ») | #37 (mergée), #36, #40 |
| 28/10 19:00 | A1, I8, I6, I9, suivi d'Android v567 | votre inscription chez Apple est en cours (A1), la suite (A3 puis A2) est prête pas à pas ; achat d'abonnement d'essai et préalable de la dictée du soir en place sur iPhone (PR #40 mergée) ; captures en taille 6,9" pour la fiche App Store, fidèles à l'iPhone (plus de « Gadgetbridge » ni de montre Huawei, qui n'existent que sur Android) ; Android v567 : carte « Votre ventre » plus compacte (aussi sur iPhone) | #40, #41 (mergées) |
| 28/10 20:00 | I9, I7 | sur iPhone, l'accueil et l'historique du bien-être ne proposent plus d'activer la lecture du visage, qui n'y existe pas encore : ils invitent à noter soi-même ; pour une Apple Watch, Sources renvoie à l'app Watch de l'iPhone. Lecture du visage commencée : le calcul donne déjà les mêmes résultats qu'Android sur ses images de test ; restent la caméra et les modèles. Point à trancher plus tard par vous : une partie des modèles d'Android (humeur « valence / éveil ») a une licence réservée à la recherche, éteinte sur iPhone en attendant | #42 (mergée), #43 |
| 28/10 21:00 | I7 | textes justes sur iPhone en place (PR #42 mergée) ; lecture du visage : premier essai des vrais modèles sur iPhone simulé, avec le même moteur qu'Android pour garder les mêmes résultats | #42, #43 (mergées), #44 |
| 28/10 22:00 | I7, suivi d'Android v571 | lecture du visage : le calcul est en place (PR #43 mergée) ; les vrais modèles tournent sur iPhone simulé et donnent les mêmes résultats qu'Android, en un dixième de seconde par image environ ; restent la caméra et l'écran. Android v570 et v571 : textes plus honnêtes sur ce que garde le serveur d'analyse IA (un simple compteur, effacé après 13 mois), pistes présentées comme un lien (« Nuits plus longues → meilleur bien-être ») et non comme un ordre ; aussi sur iPhone (vérifié sur les captures). En préparation : la caméra de l'iPhone pour la lecture du visage | #43, #44 (mergées), #45 |
| 28/10 23:00 | I7, I9 | défaut trouvé et corrigé avant tout essai sur iPhone : la photo d'un repas aurait fermé l'app (il manquait la phrase qui explique l'usage de la caméra), et la météo n'aurait pas pu lire la position ; les deux phrases sont ajoutées et vérifiées à chaque build. Lecture du visage : la caméra de l'iPhone est prête côté calcul | #45 (mergée) |
| 29/10 00:00 | I7, suivi d'Android v572 | photo du repas et position de la météo corrigées (PR #45 mergée) ; la lecture du visage est maintenant dans l'app iPhone (simulée) avec ses modèles : reste à la voir lire un vrai visage, sur l'iPhone 12. Android v572 : boutons plus clairs (suppression en orange, chevrons de la réintroduction), aussi sur iPhone | #45, #46 (mergées) |
| 29/10 01:00 | I7, suivi d'Android v573 | lecture du visage dans l'app iPhone (PR #46 mergée) ; sur iPhone simulé, un visage (portrait de test) est lu de bout en bout et rangé dans vos données comme sur Android ; reste la vraie caméra, sur l'iPhone 12. Android v573 : « Photo du repas » bien en vue dans Repas, aussi sur iPhone | #46, #47 (mergées) |
| 29/10 02:00 | I9, suivi d'Android v574 et v575 | les 8 images de la fiche App Store sont choisies, à la bonne taille pour l'iPhone, avec des données d'exemple qui ne montrent que ce que l'iPhone sait faire ; l'iPhone a maintenant sa propre politique de confidentialité (celle d'Android parlait de Google et de fonctions absentes, et on ne pouvait pas en revenir sans quitter l'app) et une page d'assistance, prêtes à être mises en ligne (action A8, 1 minute) ; Android v574 et v575 : titres et coupures de lignes plus soignés, aussi sur iPhone | #49, #50 |
| 29/10 03:00 | I2, suivi d'Android v576 | la politique de confidentialité de l'iPhone est dans l'app (PR #50 mergée) ; le rapport PDF pour le médecin est maintenant essayé sur iPhone simulé à chaque build : créé, puis enregistré dans Fichiers par la feuille de partage (résultat au prochain run) ; « Envoyer un avis » mène désormais au dépôt de l'iPhone, plus à celui d'Android ; Android v576 : nombres et unités jamais coupés en fin de ligne, aussi sur iPhone. Parité : 34 % | #50 (mergée), #51 |
| 29/10 04:00 | I2, suivi d'Android v577 | **le rapport PDF pour le médecin marche sur iPhone simulé** : créé sur le téléphone puis proposé au partage, comme sur Android (PR #51 mergée) ; « Envoyer un avis » mène au dépôt de l'iPhone ; la page Nouveautés de l'iPhone ne montre plus l'ancienne histoire de la version Android (nom « HealthTrack », clé Gemini…), seulement les nouveautés depuis la version iPhone ; Android v577 : Tendances plus nettes quand rien n'est encore noté, aussi sur iPhone. Parité : 36 % | #51 (mergée), #52 |
| 29/10 05:00 | I2, suivi d'Android v578 | les Nouveautés propres à l'iPhone sont en place (PR #52 mergée), et une note d'Android fausse sur iPhone (l'écran Premium du lancement) y est cachée ; le test automatique enregistre maintenant le rapport PDF dans Fichiers sur le grand iPhone, correction pour le petit en cours ; une règle d'Apple sur les données de santé dans iCloud étudiée (décision à prendre avant la publication ; je vous la présenterai après A1) ; Android v578 : écran Premium du lancement plus simple. Parité : 38 % | #52 (mergée), #53 |
| 29/10 06:00 | I2 | **l'iPhone est à la même version qu'Android (v578)** ; le rapport PDF pour le médecin est créé puis enregistré dans Fichiers sur les deux iPhone simulés ; tout l'accueil de l'app (onboarding) vérifié sur iPhone ; un défaut visible aussi sur Android trouvé en chemin (bouton « Autoriser » étiré sur l'écran Santé), noté pour la routine Android. Parité : 40 % | #53 (mergée), #54 |
| 29/10 07:00 | I2, suivi d'Android v579 et v580 | v579 sur iPhone (PR #55 mergée) ; tranché : l'iPhone ne peut pas repérer les apps de montre installées comme Android, il reconnaît la montre par ses données dans l'app Santé (déjà en place) ; l'icône « Halcya » sur l'écran d'accueil de l'iPhone et l'écran de démarrage seront photographiés à chaque build ; Android v580 : « Enregistrer ce repas » plus net, aussi sur iPhone. Parité : 41 % | #55 (mergée), #56 |
| 29/10 08:00 | I2 | **l'iPhone est à la même version qu'Android (v580)** ; l'icône « Halcya » est vue sur l'écran d'accueil de l'iPhone (simulé) ; « Votre avis » et la page Nouveautés de l'iPhone confirmés ; l'écran de démarrage reste à photographier (un peu plus tard après le lancement). Parité : 45 % | #56 (mergée), #57 |
| 29/10 09:00 | I2, I4 | les mesures de l'app Santé sont bien rangées dans les données de l'app (vérifié sur iPhone simulé à chaque build) ; icône, nom et écran de démarrage vérifiés ; l'iPhone reste à la même version qu'Android (v580). Parité : 49 % | #57 (mergée), #58 |
| 29/10 10:00 | I9, suivi d'Android v583 | PR #58 mergée (achat d'essai vérifié à chaque build) ; les notes pour l'équipe d'examen d'Apple sont prêtes à coller au moment de la soumission ; Android v581 → v583 : fructanes plus justes pour le pain, le poireau, l'oignon et une cinquantaine d'aliments courants, aussi sur iPhone. Parité : 49 % | #58 (mergée), #59 |
| 29/10 11:00 | suivi d'Android, tests | **l'iPhone est à la même version qu'Android (v583)** (PR #59 mergée) ; un essai automatique d'import par Fichiers a échoué une fois sur le petit iPhone simulé et bloqué les suivants : il se referme désormais proprement en cas d'échec. Parité : 49 % | #59 (mergée), #60 |
| 29/10 12:00 | suivi d'Android v585, tests | PR #60 mergée ; l'essai automatique d'import par Fichiers échoue encore par moments sur les iPhone simulés (le sélecteur de fichiers ne s'ouvre pas toujours) sans gêner les autres essais : il réessaie maintenant d'ouvrir le sélecteur ; Android v584 et v585 : fructanes et polyols de nouveaux aliments, aussi sur iPhone. Parité : 49 % | #60 (mergée), #61 |
| 29/10 13:00 | suivi d'Android v586, tests | v585 sur iPhone (PR #61 mergée) ; les essais automatiques d'import, d'export et du rapport passent sur les deux iPhone simulés ; un autre essai (accepter l'alerte des notifications) touchait parfois sans effet : il vérifie maintenant que l'alerte se ferme ; Android v586 : fer de l'oignon cru corrigé, aussi sur iPhone. Parité : 49 % | #61 (mergée), #62 |
| 29/10 15:35 | suivi d'Android v587, contrôle des erreurs | v586 sur iPhone (PR #62 mergée : l'alerte des notifications est bien acceptée, les trois rappels vérifiés sur les deux iPhone simulés) ; la vérification automatique échoue désormais si l'app fait la moindre erreur JavaScript sur iPhone (aucune sur les 10 dernières) ; Android v587 : Analyses plus sobre, aussi sur iPhone. Parité : 49 % | #62 (mergée), #63 |
| 29/10 16:05 | contrôle des erreurs (fin), états vides | v587 sur iPhone, au même niveau qu'Android (PR #63 mergée, aucune erreur JavaScript, contrôle désormais bloquant) ; nouvelles captures de chaque page telle qu'elle apparaît avant la première donnée (Accueil, Journal, Analyses, Sources…), pour vérifier ce qu'un nouvel utilisateur d'iPhone voit. Parité : 49 % | #63 (mergée), #64 |
| 29/10 17:05 | suivi d'Android v588, états vides (fin) | les pages vides d'un nouvel utilisateur sont justes sur iPhone (8 pages regardées sur les deux iPhone simulés, PR #64 mergée) ; un essai automatique d'export a touché le bouton sans effet sur un iPhone : il retouche maintenant si la feuille de partage ne s'ouvre pas ; Android v588 : la réintroduction propose des aliments qui contiennent vraiment le groupe testé, aussi sur iPhone (vu : sorbitol → pruneaux, PR #65 mergée) ; **conditions d'utilisation propres à l'iPhone** (aucun achat, « pas un dispositif médical », appelez le 15 ou le 112) de nouveau dans Réglages ; Android v589 : rapport PDF sans zéros trompeurs. Parité : 49 % | #64, #65 (mergées), #66 |
| 29/10 18:00 | suivi d'Android v590 | v589 sur iPhone (PR #66 mergée : « Conditions » de retour dans Réglages, rapport PDF sans zéros trompeurs) ; Android v590 : l'onglet Sources range les sources branchées sous « Ce que lit Halcya », aussi sur iPhone ; sa note de Nouveautés parle de Health Connect et du temps d'écran, absents de l'iPhone : cachée sur iPhone, et une demande de plus pour la routine Android (`DEMANDES.md`). Parité : 49 % | #66 (mergée), #67 |
| 29/10 19:00 | suivi d'Android v591, captures | v590 sur iPhone (PR #67 mergée : « Ce que lit Halcya » vu dans Sources) ; un bandeau « Nouveau : … et 13 autres changements » s'était glissé sur toutes les captures (défaut de l'outil de capture, pas de l'app) : corrigé ; Android v591 : le Journal vide propose trois tuiles en couleur pour bien démarrer, aussi sur iPhone. Parité : 49 % | #67 (mergée), #68 |
| 29/10 20:00 | suivi d'Android v592, onboarding | v591 sur iPhone (PR #68 mergée : plus de bandeau parasite sur les captures, Journal vide en couleur vu) ; dans l'accueil de l'app, le bouton « Autoriser l'app Santé » s'étirait en grand ovale sur toute la hauteur de l'écran : ramené à sa taille sur iPhone (en attendant qu'Android corrige le même défaut chez lui, demande déjà notée) ; Android v592 : carte des pistes plus lisible, aussi sur iPhone. Parité : 49 % | #68 (mergée), #69 |
| 29/10 21:00 | contrôle des textes (I2) | v592 sur iPhone, au même niveau qu'Android (PR #69 mergée : bouton « Autoriser l'app Santé » à sa taille, vu sur les deux iPhone simulés) ; chaque vérification automatique relit maintenant le texte de toutes les pages de l'iPhone et signale un mot propre à Android (Health Connect, Google Play, temps d'écran…) qui y resterait. Parité : 49 % | #69 (mergée), #70 |
| 29/10 22:00 | suivi d'Android v594, contrôle des textes | relecture des textes en place (PR #70 mergée) : sur les 110 pages de l'iPhone, un seul mot propre à Android, « temps d'écran », dans la carte qui dit justement « Pas encore disponible sur iPhone » : mise à part, et le contrôle devient bloquant ; Android v594 : l'onglet Tendances vide propose des tuiles en couleur, aussi sur iPhone (un correctif iOS refait pour suivre). Parité : 49 % | #70 (mergée), #71 |
| 29/10 23:00 | contrôle des textes (fin), test d'import | v594 sur iPhone, au même niveau qu'Android (PR #71 mergée : aucune page de l'iPhone ne garde de mot propre à Android, contrôle désormais bloquant ; Tendances vides en couleur vues) ; l'essai automatique d'import, qui échouait parfois sur un iPhone, recommence maintenant tout le parcours une fois avant d'échouer. Parité : 49 % | #71 (mergée), #72 |
| 30/10 00:00 | suivi d'Android v596 | test d'import fiabilisé (PR #72 mergée, import réussi sur les deux iPhone simulés) ; Android v595 et v596 : Nutrition vide en couleur et actions des repas rangées derrière « ⋯ », aussi sur iPhone ; la note de Nouveautés de v596 parle aussi du stress de la montre en direct, absent de l'iPhone : cachée sur iPhone, demande à Android de la scinder. Parité : 49 % | #72 (mergée), #73 |
| 30/10 01:00 | suivi d'Android v597 | v596 sur iPhone (PR #73 mergée : Nutrition vide en couleur et « ⋯ » des repas vus) ; Android v597 : la réintroduction écrit son repère des portions comme une phrase, aussi sur iPhone. Parité : 49 % | #73 (mergée), #74 |
| 30/10 02:00 | suivi d'Android v598, captures de la fiche | v597 sur iPhone (PR #74 mergée) ; Android v598 : une réparation interne de la carte de lecture du visage, aussi sur iPhone ; nouvelles captures de la fiche App Store lancées (grand iPhone), avec l'interface du jour. Parité : 49 % | #74 (mergée), #75 |
| 30/10 03:00 | suivi d'Android v600, captures de la fiche | v598 sur iPhone (PR #75 mergée) ; les 8 captures de la fiche App Store refaites avec l'interface du jour et regardées (propres, sans bannière du système) ; Android v599 et v600 : réintroduction plus claire, phrases d'aide plus discrètes, aussi sur iPhone (une note qui parle d'un écran absent de l'iPhone y est cachée). Parité : 49 % | #75 (mergée), #76 |
| 30/10 04:00 | données de l'app Santé dans le Journal | v600 sur iPhone, au même niveau qu'Android (PR #76 mergée) ; l'essai automatique de l'app Santé va maintenant jusqu'au Journal : les pas écrits dans Santé y apparaissent bien (« Pas 1 234 » vu sur les deux iPhone simulés). Parité : 49 % | #76 (mergée), #77 |
| 30/10 05:00 | suivi d'Android v602 | Android v601 et v602 : plus de rapport PDF vide proposé, noms d'aliments plus courts dans les pistes, aussi sur iPhone (un correctif iOS refait) ; un essai d'achat simulé a échoué une fois sans dire pourquoi : il le dira la prochaine fois. Parité : 49 % | #77 |
| 30/10 06:00 | vérification (fin) | v602 sur iPhone, au même niveau qu'Android (PR #77 mergée) : l'essai d'achat simulé est repassé sans faute, les pas de l'app Santé sont vus dans le Journal sur les deux iPhone simulés. Parité : 49 % | #77 (mergée), #78 |
| 30/10 07:00 | suivi d'Android v604 | Android v603 et v604 : Nutrition aux couleurs plus calmes (« bas » en gris, pas en rouge), et l'Accueil compte vraiment les jours avant vos pistes du ventre, aussi sur iPhone. Parité : 49 % | #79 (mergée) |
| 30/10 08:00 | suivi d'Android v605 | v604 sur iPhone (PR #79 mergée : « bas » en gris dans Nutrition, vu) ; Android v605 : dans les premiers écrans, le bouton « Continuer » reste gris tant que rien n'est choisi, aussi sur iPhone. Parité : 49 % | #80 |
| 30/10 09:00 | vérification | v605 sur iPhone, au même niveau qu'Android (PR #80 mergée : « Continuer » gris, bouton « Autoriser l'app Santé » à sa hauteur, vus) ; pas de nouvelle version d'Android ; un fichier exporté d'un téléphone Android s'importe sur iPhone avec le même code, seul écart : ses mesures Health Connect y seraient marquées « App Santé ». Parité : 49 % | #80 (mergée) |
| 30/10 10:00 | suivi d'Android v607 | Android v607 : une nuit vue par deux sources (votre montre et une app de sommeil) n'est plus comptée deux fois ; vrai aussi sur iPhone, où l'Apple Watch, l'iPhone et une app de sommeil écrivent la même nuit dans l'app Santé (vérifié par un test : 7 h, pas 14 h) ; la note de Nouveautés d'Android parle de Health Connect : cachée sur iPhone, demande à Android de la reformuler. Parité : 49 % | #81 (mergée), #82 |
| 30/10 11:00 | suivi d'Android v608 | v607 sur iPhone (PR #82 mergée : Journal et Nouveautés regardés) ; Android v608 : une phrase fixe rappelle les signes à signaler vite à votre médecin (carte du ventre, réintroduction, rapport PDF), aussi sur iPhone. Parité : 49 % | #82 (mergée), #83 |
| 30/10 12:00 | suivi d'Android v609 | v608 sur iPhone (PR #83 mergée) ; Android v609 : au premier lancement, le compteur d'écrans (« 01/07 ») ne grimpe plus en cours de route ; c'était le cas aussi sur iPhone (« 01/05 » puis « 04/06 »), corrigé de même ; la note de Nouveautés d'Android parle de Health Connect : cachée sur iPhone, demande à Android de la reformuler. Parité : 49 % | #83 (mergée), #84 |
| 30/10 13:00 | suivi d'Android v610, fiche App Store | v609 sur iPhone (PR #84 mergée : compteur « 01/07 » puis « 04/07 », vu) ; Android v610 ne change que sa fiche Google Play ; la description de la fiche App Store suit le même ordre et dit enfin ce que l'iPhone sait faire : délais repas → ventre jusqu'à 48 h, FODMAP groupe par groupe, bilan du soir, rapport PDF pour le médecin. Parité : 49 % | #84 (mergée), #85 |
| 30/10 14:00 | suivi d'Android v611 | v610 sur iPhone (PR #85 mergée, nouvelle description de la fiche App Store) ; Android v611 : une séance de sport vue par deux sources (votre montre et une app de course) n'est plus comptée deux fois ; vrai aussi sur iPhone pour les séances de l'app Santé (vérifié par un test). Android réserve désormais lui-même à Google Play ses notes qui parlent de Health Connect. Parité : 49 % | #85 (mergée), #86 |
| 30/10 15:00 | suivi d'Android v612 | v611 sur iPhone (PR #86 mergée : une séance de sport comptée une fois, vu) ; Android v612 : deux retouches d'affichage (« VFC nuit » dans le Journal, étiquette « premium » espacée), sans effet visible sur iPhone (la VFC de l'app Santé y garde son nom, rien n'y est vendu) ; un correctif iOS refait, la note d'Android cachée sur iPhone. Trouvé en rendant la démo fidèle : sur un vrai iPhone, la variabilité cardiaque (VFC) de l'app Santé n'apparaissait pas sur l'Accueil, corrigé ; les Analyses suivront. Parité : 49 % | #86, #87 (mergées), #88 |
| 30/10 16:00 | suivi d'Android v613, VFC sur l'Accueil | la variabilité cardiaque de l'app Santé s'affiche sur l'Accueil de l'iPhone (PR #88 mergée, « VFC (SDNN) 46 ms » vu sur les deux iPhone simulés) ; Android v613 retouche une phrase des Paramètres sur l'abonnement : sur iPhone, où rien n'est vendu, cette phrase n'est plus montrée du tout. Parité : 49 % | #88 (mergée), #89 |
| 30/10 17:00 | suivi d'Android v614 | v613 sur iPhone (PR #89 mergée : plus de phrase sur l'abonnement dans Paramètres, vu) ; Android v614 : au premier import, la fréquence cardiaque et les pas des derniers jours ne se perdent plus quand la montre mesure souvent ; c'était vrai aussi avec l'Apple Watch sur iPhone, corrigé de même. Parité : 49 % | #89 (mergée), #90 |
| 30/10 18:00 | VFC de l'app Santé dans les Analyses | v614 sur iPhone, au même niveau qu'Android (PR #90 mergée : lecture de l'app Santé jour par jour essayée sur les deux iPhone simulés) ; la variabilité cardiaque de l'app Santé entre dans les Analyses, à part de celle d'Android pour ne pas inventer de fausses pistes, et dans le résumé du premier import. Parité : 49 % | #90 (mergée), #91 |
| 30/10 19:00 | vos actions Apple, VFC dans les Analyses | **vous avez fait A1, A3 et A8** : compte Apple validé, fiche « Halcya » créée dans App Store Connect, pages de confidentialité, de conditions et d'assistance en ligne ; nous avons passé en revue avec vous toutes les cases et demandes d'Apple (seuls HealthKit, achats intégrés, App Attest, et la demande Family Controls pour le temps d'écran, servent à Halcya) ; la variabilité cardiaque de l'app Santé est dans les Analyses de l'iPhone (PR #91 mergée, vue dans les captures). Parité : 49 % | #91 (mergée), #92, #93 |
| 30/10 20:00 | TestFlight, suivi d'Android v616 | **vous avez fait A2** (clé et accord pour la signature par Apple) et obtenu le droit du temps d'écran ; l'envoi automatique sur TestFlight est écrit (PR #95, premier envoi juste après sa vérification) ; Android v615 et v616 : lecture du visage sans plantage sur Android, et tout l'historique lu sans coupure, aussi pour l'app Santé sur iPhone. Parité : 49 % | #95, #96 |
| 30/10 21:00 | TestFlight, suivi d'Android v617 | **l'app iPhone est sur TestFlight** (version 616) : premier envoi refusé par Apple pour une phrase manquante sur l'app Santé, corrigée (PR #96), deuxième envoi réussi ; l'iPhone a maintenant ses propres Nouveautés, qui commencent à cette version de test ; Android v617 : un aliment par ligne dans les repas, aussi sur iPhone. Parité : 49 % | #96 (mergée), #97 |
| 30/10 22:00 | TestFlight 617 | v617 sur `main` (PR #97 mergée : Nouveautés de l'iPhone vues, une seule note « Halcya arrive sur iPhone ») ; la 617 part aussi sur TestFlight pour que votre compagne installe la plus récente. Parité : 49 % | #97 (mergée) |
| 30/10 23:00 | suivi d'Android v620 | la 617 est sur TestFlight (build 617.98) ; Android v618 à v620 : « œuf », « bœuf », « cœur » bien écrits, et ce qui manque aux Analyses dit en mots simples, aussi sur iPhone, dont les Nouveautés affichent désormais ces notes. Parité : 49 % | #99 |
| 31/10 00:00 | TestFlight 620, temps d'écran | la 620 est sur TestFlight (build 620.100) ; bonne nouvelle : en Europe, depuis iOS 26.4, le droit obtenu aujourd'hui permet de lire le vrai temps d'écran (par jour et par app, avec votre accord), comme sur Android ; ce sera la prochaine fonction iPhone, à essayer sur l'iPhone 12. Parité : 49 % | #99 (mergée) |
| 31/10 01:00 | suivi d'Android v622 | Android v621 et v622 : la réintroduction dit combien de jours calmes il reste à attendre, aussi sur iPhone (un correctif iOS refait) ; l'autre changement ne concerne que les anciens Android. Parité : 49 % | #101 |
| 31/10 02:00 | temps d'écran, suivi d'Android v624 | le code qui lit le temps d'écran de l'iPhone est corrigé : une pièce d'Apple se trouvait ailleurs que dans sa documentation (vérifié avec les outils d'Apple) ; l'app se construit de nouveau en entier ; Android v623 et v624 : modifier un repas tient sur un petit écran, aussi sur iPhone. Parité : 49 % | #102, #103, #104 |
| 31/10 03:00 | temps d'écran (suite), v624 | Android v624 sur iPhone (PR #104 : la note « Modifier un repas » s'affiche, version 624) ; l'écran « Temps d'écran et sommeil » de l'iPhone est écrit : il demande votre accord Temps d'écran (Face ID ou code) et compte les prises en main ; il reste à le vérifier en images puis à l'essayer sur l'iPhone 12, en Europe et avec iOS 26.4 ou plus. Parité : 49 % | #102 et #103 (mergées), #104 |
| 31/10 04:00 | TestFlight 624, suivi d'Android v625 | **la 624 est sur TestFlight** (build 624.105), signée par Apple avec les droits du temps d'écran (vérifiés dans l'app envoyée) ; Android v624 mergé (#104) ; Android v625 : boutons inactifs gris clair et repas habituels à une majuscule, aussi sur iPhone (PR #106) ; l'écran du temps d'écran de l'iPhone se construit (PR #105). Parité : 49 % | #104 (mergée), #105, #106 |
| 31/10 05:00 | TestFlight 625, temps d'écran, suivi d'Android v629 | **la 625 est sur TestFlight** (build 625.107) ; Android v625 mergé (#106 : boutons inactifs gris clair, repas habituels à une majuscule, vus en images) ; l'écran du temps d'écran de l'iPhone s'affiche bien en images (« Automatique », minutes d'écran, écran tard) : sa vérification repasse après une correction de notre contrôle de textes (PR #105) ; Android v626 à v629 : Nutrition dit « incertain » plutôt que « bas » quand des repas manquent, champs de saisie à la police de l'app, aussi sur iPhone. Parité : 49 % | #106 (mergée), #105 |
| 31/10 06:00 | temps d'écran sur TestFlight, v631 | **le temps d'écran est dans l'app iPhone** (PR #105 mergée, build 625.108 sur TestFlight) : à essayer sur l'iPhone 12 (iOS 26.4 ou plus) ; le temps par catégorie d'app et la politique de confidentialité qui en parle sont prêts (PR #110) ; Android v631 mergé (PR #109 : Nutrition « incertain » quand des repas manquent, police des champs, vus en images), envoi de la 631 sur TestFlight lancé. Parité : 49 % | #105, #108, #109 (mergées), #110 |
| 31/10 07:00 | 631 sur TestFlight, temps par app | **l'iPhone a la même version qu'Android** : la 631 est sur TestFlight (build 631.110), avec le temps d'écran ; le temps par catégorie d'app (réseaux sociaux, vidéo…) et la confidentialité qui en parle sont dans l'app (PR #110 mergée), nouvel envoi TestFlight lancé. Parité : 49 % | #110 (mergée) |
| 31/10 08:00 | TestFlight 631.112, suivi d'Android v633 | la 631.112 est sur TestFlight, avec le temps par catégorie d'app ; la page de confidentialité en ligne parle du temps d'écran ; la fiche App Store (brouillon) le mentionne aussi ; Android v633 : la recherche d'aliments propose d'abord le bon aliment (« ail », « lait »), aussi sur iPhone (PR #113 mergée, 633 vers TestFlight). Parité : 49 % | #113 (mergée) |
| 31/10 09:00 | TestFlight 633, suivi d'Android v635 | **la 633 est sur TestFlight** (build 633.114) ; Android v635 : dans Vos données, l'export dit combien d'entrées il contiendra et ne propose plus de fichier vide, aussi sur iPhone (PR #115 mergée, 635 vers TestFlight) ; les captures montrent maintenant la carte du temps d'écran complète (minutes, prises en main, temps par catégorie d'app, nuit estimée). Parité : 49 % | #115 (mergée) |
| 31/10 10:00 | TestFlight 635, suivi d'Android v638 | **la 635 est sur TestFlight** (build 635.116) ; Android v638 : dans Paramètres, ce que l'analyse IA envoie tient en une phrase (le détail reste à un toucher), et un lien mort mène à l'Accueil, aussi sur iPhone (un correctif iOS refait, PR #117 mergée, 638 vers TestFlight). Parité : 49 % | #117 (mergée) |
| 31/10 11:00 | e-mail d'Apple, TestFlight 638, fiche par l'API | **merci pour l'e-mail d'Apple** : il manquait une phrase d'explication (reconnaissance vocale) que l'iPhone exige ; les builds envoyées jusqu'ici sont sans doute refusées à l'installation ; corrigé (PR #121), une build corrigée part dès sa vérification ; la fiche App Store s'envoie maintenant par la routine (un caractère « ★ » à retirer d'abord) ; parité recomptée : 48 % | #119 (mergée), #121 |
| 31/10 12:00 | build corrigée, fiche App Store envoyée | **la build 638.121 est sur TestFlight avec la phrase demandée par Apple** (PR #121) : c'est elle à installer ; **la fiche App Store est remplie dans App Store Connect** (nom, sous-titre, description, mots-clés, adresses), sans rien soumettre (PR #122 : un caractère « ★ » refusé par Apple, retiré) ; Android v640 : page de la montre Huawei, sans objet sur iPhone. Parité : 48 % | #121, #122 (mergées) |
| 31/10 13:00 | suivi d'Android v642, captures de la fiche | Android v641 et v642 : l'onglet du bas reste surligné quand vous ouvrez la réintroduction ou l'historique du bien-être, aussi sur iPhone (PR #123, en vérification) ; l'envoi des captures de la fiche App Store est prêt (PR #124), elles seront refaites et regardées avant l'envoi. Parité : 48 % | #123, #124 |
| 31/10 14:00 | v642 mergée, captures de la fiche en cours | Android v642 sur iPhone (PR #123 mergée : l'onglet du bas reste surligné sur les sous-pages, vu en image), envoi de la 642 sur TestFlight ; la 642 est sur TestFlight (642.124) ; les captures de la fiche App Store, refaites sur l'iPhone le plus grand, ont été regardées une à une : elles ont montré un défaut réel, corrigé (Sources disait « Jamais reçu : VFC » sous une Apple Watch qui envoie sa VFC, PR #127) ; elles seront refaites après ce correctif, puis envoyées ; Android v644 sur iPhone (PR #126 mergée) : rien ne change sur iPhone (lecture du visage au déverrouillage, impossible sur iPhone), envoi de la 644 sur TestFlight. Parité : 48 % | #123, #124, #126 (mergées), #127 |
| 31/10 15:00 | 644 sur TestFlight, Android v648, VFC de l'Apple Watch | **la 644 est sur TestFlight (644.127)** ; Android v645 à v648 : un rappel de la lecture du visage au déverrouillage (Android seulement, jamais affiché sur iPhone) et une légende complète dans l'historique du bien-être, aussi sur iPhone ; regroupés avec le correctif de la VFC de l'Apple Watch dans une seule vérification (PR #127, mergée, vue en image), envoi de la 648 sur TestFlight ; les captures de la fiche App Store sont refaites ; le numéro de la version de la fiche App Store (« 1.0 ») suivra celui des builds, sinon aucune build ne pourrait être choisie à la soumission (PR #129, mergée). Parité : 48 % | #127, #129 (mergées), #128 |
| 31/10 16:00 | 648 sur TestFlight, fiche App Store complétée | **la 648 est sur TestFlight (648.128)**, avec le correctif de la VFC de l'Apple Watch ; **la fiche App Store est complète dans App Store Connect** : textes, 8 captures de la v648 regardées une à une, version renommée 648 comme les builds, catégorie Santé et forme et âge 18 ans et plus comme sur Google Play (réponses prudentes au questionnaire d'Apple, à relire avant de soumettre ; PR #130) ; Android v650 pas encore publié sur Google Play ; l'envoi dit désormais si Apple a bien traité chaque capture (7 sur 8 traitées, 1 en cours, aucune refusée ; PR #132). Parité : 48 % | #130, #132 (mergées) |
| 31/10 17:00 | Android v652, captures de la fiche traitées | les 8 captures de la fiche App Store sont traitées par Apple (8 sur 8, aucune refusée) ; Android v649 à v652 : dans Nutrition, les apports incertains sont hachurés pour mieux se voir, et « Noter votre bien-être » ouvre la note sur place dans le Journal, aussi sur iPhone (PR #134, mergée, vue en image) ; **la 652 est sur TestFlight (652.135)**, même version qu'Android, et la fiche App Store porte ce numéro. Parité : 48 % | #134 (mergée) |
| 31/10 18:00 | Android v654 | Android v653 et v654 : quand aucun repas n'est encore enregistré, Journal → Repas montre en trois étapes ce qui va se passer (photo ou quelques mots, aliments notés, comparaison avec votre ventre), aussi sur iPhone (PR #136, mergée, vue en image) ; **la 654 est sur TestFlight (654.137)**, même version qu'Android, et la fiche App Store porte ce numéro. Parité : 48 % | #136 (mergée) |
| 31/10 19:00 | Nutrition : poids de l'app Santé | dans votre profil de Nutrition, un poids lu dans l'app Santé (une balance, par exemple) s'affichait « saisi le … » comme si vous l'aviez tapé, et sa masse grasse n'apparaissait pas : corrigé sur iPhone, « (app Santé, 28/10) » (PR #138, mergée, vue en image), dans la build 654.139 sur TestFlight ; Android v656 pas encore publié sur Google Play (nos correctifs s'y appliquent déjà). Parité : 48 % | #138 (mergée) |
| 31/10 20:00 | Android v658 | Android v655 à v658 : les cartes de Sources prennent la couleur de leur thème (menthe pour l'app Santé et la lecture du visage, lilas pour la météo et le temps d'écran) et la question du soir de la carte « Votre ventre » se lit mieux, aussi sur iPhone ; la note d'Android qui nommait « Health Connect » est remplacée sur iPhone par une note qui parle de l'app Santé (PR #140, mergée, vue en image) ; **la 658 est sur TestFlight (658.141)**, même version qu'Android. Parité : 48 % | #140 (mergée) |

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
  car `scripts/upstream.sh` met les correctifs déjà appliqués dans l'index ; exception : un nouveau correctif sur un
  fichier qu'un correctif précédent touche déjà se tire de `git -C upstream diff -- <fichiers>`, sans HEAD, juste
  après `scripts/upstream.sh`, pour ne garder que la nouvelle modification) pour modifier un fichier Android ;
  le plus petit possible, un sujet par fichier, pour qu'il survive aux changements d'Android. Un correctif qui ne
  s'applique plus fait échouer le script : le refaire sur le nouveau code (c'est le travail normal du suivi).
  Le script applique les correctifs **directement**, comme la CI (leçon du 29/10 : avec `--3way`, le correctif 02
  passait en local par fusion à trois sur v575 et échouait sur la CI, dont le clone n'a pas l'historique) ; pour
  refaire un correctif : `git apply --3way` à la main sur la version d'avant, puis `git diff`.
- **Tests d'interface (Swift)** : ils ne compilent que sur la CI ; une erreur y laissait la CI verte, sans aucun
  geste essayé (leçon du 29/10, PR #53 : sondes à zéro, 70 captures au lieu de 84). Depuis, la dernière étape de la
  build échoue si `test-interface-build.txt` n'a pas « TEST BUILD SUCCEEDED ». Après un push de Swift, le lire.
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
  build quelques minutes plus tard. Après une fusion avec conflits, comparer le nombre de tests avant / après : un
  fichier de test rendu illisible par la fusion disparaît du total sans faire échouer la suite (28/10, #40).
  Plusieurs PR vertes à la fois : chaque merge oblige les autres à repasser la CI ; regrouper dans une seule PR
  celles qui touchent les mêmes fichiers (#38 dans #37, 28/10). Un lancement manuel sur `main` partageait le groupe
  de concurrence de la CI de `main` et l'aurait annulée (29/10) : les captures de la fiche ont désormais leur groupe.
  Une PR de journal seul (sans CI) se merge **en dernier** dans le run, après les PR de code : sinon leurs branches
  passent en retard sur `main` et leur CI repart (31/10, #107 mergée avant #106). Une PR qui dure (fonction en
  plusieurs étapes) se merge avant le suivi d'Android suivant, qui la remettrait sinon en retard à chaque heure.
- **Fichiers d'`overlay/`** : vérifier qu'un fichier n'existe pas avant d'en écrire un « nouveau » (`ls`) : l'écrire
  l'écrase sans erreur (31/10 : le test d'origine de la carte du temps d'écran, remis ensuite). Comparer la liste
  des fichiers de test (`npx vitest list --filesOnly`) avant / après quand le total ne bouge pas comme prévu.
- **Calcul natif d'Android réécrit en Swift** (I7, 28/10) : paquet Swift pur, mêmes cas et mêmes tolérances que les
  tests JVM d'Android, vecteurs et portraits lus dans `upstream/` (jamais copiés) ; arrondis et tris de Java reproduits
  (`Math.round`, `%.4f`, tri stable) ; modèles téléchargés en CI avec les empreintes d'Android (`scripts/face-models.sh`).
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
- **Version de la fiche App Store** : elle porte le même numéro que les builds (une version n'accepte que des builds
  de même numéro). Après chaque envoi TestFlight d'une nouvelle version, lancer `store-push.yml` sans « captures » :
  il renomme la version « Prête à soumettre » et dit l'état des captures chez Apple (31/10, #129, #132).
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
   **Chaque nouvelle note de Nouveautés** sans `variants` s'affiche aussi sur iPhone (depuis le 29/10, l'iPhone montre
   les notes à partir de sa propre version, correctif 28) : fausse sur iPhone → son id dans `APPSTORE_HIDDEN`
   (correctif 28) et une ligne dans `DEMANDES.md` pour qu'Android la marque `["play", "sideload"]`. La cacher
   **au suivi de sa version**, jamais plus tard : une note déjà vue sur un iPhone puis cachée n'est plus trouvée
   par `getUnseenEntries`, et l'app annoncerait toutes les autres comme nouvelles (vu en capture le 29/10, PR #67).
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
| A1 | Adhérer à l'Apple Developer Program (individuel, payant à l'année ; pas à pas ci-dessous) | signature, TestFlight, App Store | ✅ 30/10 : adhésion validée (e-mail de bienvenue d'Apple ; inscription et paiement le 28/10) |
| A2 | Créer une clé API App Store Connect (rôle Admin ; pas à pas « A2 et A3 » ci-dessous) et l'enregistrer en secrets GitHub Actions de ce dépôt, dans un environnement `appstore` réservé à `main` | builds signées et envoi TestFlight automatiques | ✅ 30/10 : clé « Halcya CI » (Admin), environnement `appstore` (main seulement, administrateurs sans contournement), « signature par Apple d'accord » |
| A3 | Créer la fiche de l'app dans App Store Connect (nom, langue principale français, bundle id, SKU) | envoi TestFlight, fiche | ✅ 30/10 : identifiant (HealthKit, In-App Purchase, App Attest) et fiche « Halcya » créés ; le nom se modifie encore dans « Informations sur l'app » tant que rien n'est soumis |
| A4 | Contrat « Paid Applications », coordonnées bancaires et fiscales | abonnement App Store | après A1 |
| A5 | Remplir « Confidentialité de l'app » (pas d'API) avec les réponses préparées dans `store/app-store/confidentialite.md` | examen Apple | avant la 1re soumission |
| A6 | Inviter les testeurs (d'abord sa compagne : interne via « Utilisateurs et accès » ou externe avec l'examen bêta, la routine dira), soumettre à l'examen, publier | testeurs, production | lui seul |
| A7 | **Maintenant, après A3** : demander à Apple « Family Controls (Distribution) » pour Halcya (Certificates, IDs & Profiles → Identifiers → Halcya → onglet **Capability Requests** → Family Controls (Distribution)), en demandant aussi dans le texte le droit **« Family Controls App and Website Usage »** (absent de cet onglet le 30/10 ; justification en anglais préparée dans la conversation du 30/10 et dans `RECHERCHE.md`). Rien d'autre à demander dans cet onglet (passé en revue le 30/10, `RECHERCHE.md`) | tuile « Écran » sur iPhone (temps d'écran, peut-être réel et non plus approché, `RECHERCHE.md`) | ✅ 30/10 : Family Controls (Distribution) accordé dans la minute ; Distribution et App and Website Usage activés sur l'identifiant |
| A8 | (1 minute, sur ordinateur, quand vous voulez) Activer GitHub Pages pour ce dépôt : sur github.com, HealthTrack-iOS → Settings → Pages → « Build and deployment » → Source : « GitHub Actions ». Rien d'autre : la routine publie ensuite les pages | adresses de la politique de confidentialité, des conditions d'utilisation et de l'assistance de l'iPhone, demandées par la fiche App Store (A3, A5) | ✅ 30/10 : Pages activé, site publié (`pages.yml`, déploiement réussi) |

#### A1 pas à pas (préparé le 27/10/2026)

1. **Compte Apple** : celui du propriétaire, avec l'identification à deux facteurs activée (obligatoire), au nom
   légal exact (il apparaîtra comme « vendeur » sur l'App Store).
2. **S'inscrire** : sur https://developer.apple.com/programs/enroll/ (ou depuis l'app « Apple Developer » sur
   iPhone, qui propose aussi l'inscription). Sans Mac ni iPhone : lien « Continue enrollment on the web » en bas de
   la page (fait ainsi le 28/10). Choisir **« Individu / entreprise individuelle »** : l'app paraîtra
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

#### A2 et A3 pas à pas (préparés le 28/10/2026, à faire après l'e-mail de confirmation d'A1)

**A3 d'abord : l'identifiant et la fiche de l'app** (sur un ordinateur, navigateur suffisant)
1. https://developer.apple.com/account → **Certificates, Identifiers & Profiles** → **Identifiers** → « + ».
   Choisir **App IDs** puis **App**.
   - Description : `Halcya`.
   - Bundle ID : **Explicit**, `fr.jpesquet.sante` (celui du projet iOS).
   - Capabilities : cocher **HealthKit**. « In-App Purchase » est déjà inclus. Rien d'autre pour l'instant : pas de
     Push Notifications, car les rappels sont des notifications locales.
   - Continue → Register.
2. https://appstoreconnect.apple.com → **Apps** → « + » → **Nouvelle app** :
   - Plateforme : iOS ;
   - Nom : `Halcya — ventre et bien-être` (30 caractères au plus ; s'il est déjà pris, `Halcya : ventre et bien-être`) ;
   - Langue principale : Français (France) ;
   - Identifiant de lot : `fr.jpesquet.sante` ;
   - SKU : `halcya-ios` ;
   - Accès utilisateur : Accès complet.

**A2 ensuite : la clé API pour que la CI envoie l'app sur TestFlight**
1. App Store Connect → **Utilisateurs et accès** → **Intégrations** → **API App Store Connect**. La première fois,
   cliquer « Demander l'accès » et accepter.
2. **Clés d'équipe** → « + ».
   - Nom : `Halcya CI`.
   - Accès : **Admin**. D'après les forums développeurs, c'est le seul rôle qui laisse la CI signer sans Mac, avec un
     certificat de distribution géré par Apple : la clé privée du certificat reste chez Apple, aucun fichier à garder.
     Avec ce rôle, **la CI créera ce certificat dans votre compte** : c'est votre accord, à me confirmer en une ligne
     (« A2 : signature par Apple d'accord »). Sinon, autre voie possible mais plus longue sans Mac : vous créez vous-même
     le certificat avec OpenSSL et le déposez en secret GitHub ; je vous la détaillerai.
3. **Télécharger la clé** : un fichier `AuthKey_XXXXXXXXXX.p8`, téléchargeable **une seule fois**. Noter le **Key ID**
   et l'**Issuer ID** affichés au-dessus du tableau.
4. Sur GitHub, dépôt `spreadzenox/HealthTrack-iOS` → Settings → **Environments** → New environment → nom `appstore`.
   - **Deployment branches** : Selected branches → `main` seulement.
   - **Environment secrets** :
     - `ASC_KEY_ID` = le Key ID ;
     - `ASC_ISSUER_ID` = l'Issuer ID ;
     - `ASC_KEY_P8` = tout le contenu du fichier `.p8`, ouvert avec le Bloc-notes, lignes BEGIN / END comprises.
5. Me dire « A2 fait ». Je n'ai jamais besoin de voir la clé : ne la collez pas dans la conversation.

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
