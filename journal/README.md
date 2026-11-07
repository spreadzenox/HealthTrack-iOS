# Journal de bord — Halcya sur iOS

## 📅 Semaine en cours — S45 (lundi 2 novembre → dimanche 8 novembre 2026)

> Résumé tenu à jour à chaque run de la routine iOS : **c'est ce que lit le propriétaire.**
> Le premier run d'une nouvelle semaine (lundi, heure de Paris) archive ce bloc dans `semaines/AAAA-Sww.md` et en
> ouvre un neuf. Semaine précédente : `semaines/2026-S44.md`.

**Où en est iOS**

| | Android (Google Play) | iOS (App Store) |
|---|---|---|
| Dernière version | v848 (6/11) | **846 sur TestFlight** (build 846.346 ; **844.344 reste attachée à la version 844 pour la soumission**, avec « Votre avis », la photo des selles et App Attest, iOS 15.4 au moins ; chaque nouvelle version y part seule après ses vérifications), achat ouvert ; dans App Store Connect, la version 717 garde la build 717.216 que vous avez choisie |
| Où l'installer | Play Store, test fermé | **TestFlight** (test interne : testeurs ajoutés par le propriétaire, action A6) |
| Parité des fonctions | référence | **67 %** (30 fonctions vérifiées sur 45 faisables, recompte du 2/11 : achat, conditions, fiche et TestFlight comptés depuis qu'ils marchent ; le temps d'écran, la voix et le Bluetooth attendent l'essai sur l'iPhone 12) |

**👉 Prochaine action du propriétaire**
- **Examen bêta d'Apple (votre décision du 6/11 vers 18:20)** : je relève son état à chaque run, en lecture seule, et je
  vous écris en tête de `POUR-ORCHESTRATEUR.md` dès qu'une build passe en test ou est refusée.
- **Vos réglages du 5/11 vers 23:00 sont faits** (prix et pays, Content Rights, « Santé », groupes TestFlight, 817.312
  soumise à l'examen bêta). Deux points restent : (1) **les abonnements**, toujours « métadonnées manquantes » chez
  Apple (relevés du 6/11 à 10:10 et 16:05), à régler avant de soumettre : vérifiez d'abord la langue du **groupe**
  « Halcya » (cause la plus citée par Apple), puis ce qu'Apple écrit en haut de chaque page d'abonnement ; (2) **Mac et Vision Pro** : je recommande de
  les décocher pour cette première soumission (rien n'y a été essayé). Détails dans `POUR-ORCHESTRATEUR.md`.
- ✅ **Build finale : 844.344**, attachée à la version **844** dans App Store Connect (6/11 vers 21:15), rien de
  soumis. Demain matin : vérification de l'écran d'achat sur l'iPhone, puis votre soumission (`store/app-store/soumission.md`).
- ✅ **« Prix et disponibilité » de l'app** (fait par vous le 5/11 vers 23:00 ; Mac et Vision Pro laissés ouverts) (App Store Connect → Halcya → Distribution, ou
  Monétisation → **Prix et disponibilité**). Apple dit que cette page n'a jamais été remplie (relevé du 3/11) ; c'est
  sans doute pour cela que les abonnements restent « métadonnées manquantes ».
  1. Prix de l'app : **Gratuit** (l'app est gratuite ; seuls les abonnements sont payants).
  2. Disponibilité : **France, Belgique, Luxembourg, Suisse, Canada**, rien d'autre (surtout pas les États-Unis),
     comme votre décision P32 pour Google Play ; ne pas la rendre disponible automatiquement dans les nouveaux pays.
  3. Enregistrer.

  Les trois abonnements sont déjà en vente dans ces 5 pays (prix en CHF et en $CA comme Google Play).
- ✅ **Content Rights** (fait le 5/11 vers 23:00 ; App Store Connect → Halcya → Informations sur l'app) : l'app utilise des contenus de tiers sous
  licence (tables d'aliments, modèles, polices, cités dans Réglages → Licences). À cocher : « Oui, elle contient du
  contenu de tiers, et j'ai les droits nécessaires ».
- **Le 6 ou le 7/11, avant de soumettre** : je vous donnerai le numéro exact de la build à attacher. La version
  changera de numéro (717 → celui de la build finale, 72x), car Apple n'attache une build qu'à la version du même
  numéro ; la build 717.216 n'a ni App Attest ni le repère iPhone dont le serveur a besoin.
- **A6, quand vous pouvez** : inviter votre compagne dans App Store Connect (Utilisateurs et accès, rôle « Customer
  Support »), créer dans TestFlight un groupe de test interne avec elle et la build la plus récente, et me donner la
  version d'iOS de son iPhone 12 (Réglages → Général → Informations) : il faut au moins iOS 15.4 (sinon, Réglages → Général → Mise à jour
  logicielle).
- Installez la build la plus récente de TestFlight (846.346 aujourd'hui ; 844.344 est celle de la soumission) : Paramètres y dit « Gold offert pendant le
  test, jusqu'au 6 nov. » ; à partir du 7/11, l'écran d'achat y montre Silver et Gold (achats de test gratuits).

**Vos réglages du 5/11 (vers 23:00)** : prix et disponibilité (gratuit, 5 pays, sans les futurs ; Mac et Vision Pro
laissés disponibles), Content Rights (oui), « Santé » ajoutée et publiée dans Confidentialité de l'app (6 types),
TestFlight : groupe interne « Interne Halcya » et groupe externe « Testeurs Halcya », 817.312 soumise à l'examen bêta,
lien public gardé par vous. Aucune version envoyée à l'examen de l'App Store.

**Vos décisions du 5/11 (vers 20:15)** : (1) **TestFlight externe**, à la place du test interne de 12:00 : vous créez
le groupe et soumettez la build à l'examen bêta ; je prépare les textes (`store/app-store/testflight-externe.md`). (2)
**La photo des selles est dans la soumission** : rouverte sur iPhone, phrase de la caméra, confidentialité de
l'iPhone et notes pour l'examen mises à jour ; vous cochez « Santé ». (3) **Prix et disponibilité et Content Rights** :
vous les faites vous-même.

**Votre décision du 5/11 (vers 12:00)** : « ok test interne » (remplacée le même jour à 20:15 par le test externe) ; TestFlight reste en test interne jusqu'à la
soumission (pas de testeurs externes, donc pas d'examen d'Apple pour les builds de test). La question est retirée de
`POUR-ORCHESTRATEUR.md`.

**Votre décision du 4/11** : votre seul point d'entrée devient la conversation qui orchestre la routine Android ;
vos décisions et réponses pour l'iPhone m'arrivent par `journal/POUR-IOS.md` de HealthTrack (lignes « Décision du
propriétaire »), que je lis à chaque run ; dans l'autre sens, tout ce qui attend de vous une action ou une réponse est
dans `journal/POUR-ORCHESTRATEUR.md` de ce dépôt, que l'orchestrateur lit chaque heure et vous transmet. Après la soumission (7 ou 8/11), une session dédiée ramènera iOS dans HealthTrack : un seul
dépôt, une seule routine pour les deux apps, et cette routine-ci sera mise en pause. D'ici là rien ne change : la
soumission passe en premier et HealthTrack reste en lecture seule pour moi. Le prompt de la routine est à jour.

**Soumission prévue le 7 ou le 8/11** (votre décision du 2/11), gestes pas à pas dans `store/app-store/soumission.md`.
Avant cette date, je vérifie :
- que le serveur coupe bien la période de lancement sur iPhone : réglé ce soir par la routine Android, et vérifié sur
  l'iPhone simulé (« Gold offert pendant le test, jusqu'au 6 nov. 2026 ») ; Google Play garde le 27/11 ;
- l'écran d'achat avec les trois abonnements, et le chemin des notes d'examen (roue, Paramètres, Découvrir le premium) :
  vérifié à l'avance sur l'iPhone simulé le 4/11, reste l'essai sur votre iPhone le 7/11 au matin ;
- les captures iPad, les notes d'examen et App Attest.

**Où on en est pour vendre sur iPhone** : contrat de vente, banque et fiscalité actifs (A4) ; confidentialité de l'app
remplie (A5) ; trois abonnements chez Apple, prêts à partir avec une version (« Prepare for Submission ») : Gold
9,99 €/mois, Silver 29,99 €/an avec 2 semaines d'essai, Silver 4,99 €/mois, dans les 5 pays de P32 (prix en CHF et $CA
comme Google Play). Le serveur d'Android vérifie
les achats faits sur iPhone, et **l'achat est ouvert dans l'app**. App Attest est coché, le serveur l'observe depuis
le 2/11, et la build 722.221 l'utilise. Captures iPad 13" : choix « B » (Nutrition à la place de
Sources), 8 envoyées le 2/11, toutes acceptées par Apple.

Restent :
- « Prix et disponibilité » de l'app (gratuite, 5 pays) ;
- Content Rights ;
- l'essai sur l'iPhone 12 ;
- votre relecture, puis votre soumission. La section des abonnements apparaîtra sur la page de la version : cochez-y
  les trois.

Statut de professionnel (DSA) : en examen chez Apple.

**Ce que vous pouvez voir dès maintenant** : les captures de l'app sur iPhone simulé, refaites à chaque changement
(taille de l'iPhone 12 et iPhone récent, clair et sombre) : https://github.com/spreadzenox/HealthTrack-iOS/tree/captures/main

**À essayer sur l'iPhone 12 dès l'installation** (build la plus récente sur TestFlight) : Sources › « Temps d'écran et sommeil » › Activer,
puis accepter la demande de l'iPhone (Face ID ou code). Il faut iOS 26.4 ou plus et un iPhone de l'Union
européenne ; sinon la carte le dit. Le lendemain, la carte montre le temps d'écran de la veille et une nuit estimée.

**Ce qui ne pourra pas marcher pareil sur iPhone** (à confirmer, détail dans `PARITE.md`)
- **Taille du texte réglée dans iOS** : Halcya ne la suit pas encore (Android, si) ; possible sur iPhone, prévu après
  la soumission.
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
- **Semaine précédente (S44), en bref** : l'iPhone a rattrapé Android jusqu'à la v698 et sort à chaque fois sur
  TestFlight avec le même numéro ; app Santé, notes du soir, lecture du visage, temps d'écran, copie de secours hors
  d'iCloud ; fiche App Store complète ; le 1/11, contrat de vente actif, abonnements créés et achat ouvert sur iPhone
  (détail dans `semaines/2026-S44.md`).

**Runs de la semaine**

| Date (Paris) | Run | Ce qui a été fait | PR |
|---|---|---|---|
| 2/11 01:00 | nouvelle semaine | résumé de la semaine S44 archivé (`semaines/2026-S44.md`) ; Android n'a changé que son serveur (prix de l'IA au 1er janvier) ; **la 698 est sur TestFlight (698.190)**. Parité : 48 % | — |
| 2/11 02:00 | suivi d'Android v700 | Android v700 (serveur seulement) suivie (PR #192, mergée) : **la 700 est sur TestFlight (700.193)** ; la prochaine version d'Android (grands nombres plus lisibles) a été essayée à l'avance : rien ne cassera sur iPhone. Parité : 48 % | #192 (mergée) |
| 2/11 03:00 | suivi d'Android v702 | Android v702 suivie (PR #194) : les grands nombres gardent une espace visible (« 1 039 kcal ») ; Paramètres dit le bon nombre d'analyses IA par jour (Silver 10, Gold 20, et 20 pendant le test), avec sa note de Nouveautés sur iPhone ; le passage de Silver à Gold depuis l'iPhone est vérifié par un test ; **la 702 est sur TestFlight (702.195)**. Parité : 48 % | #194 (mergée) |
| 2/11 04:00 | suivi d'Android v703 | Android v703 suivie (PR #196) : sur la page d'abonnement, la formule mensuelle ne répète plus son prix sous le bouton (il reste sur la formule et sur le bouton) ; note de Nouveautés sur iPhone ; **la 703 est sur TestFlight (703.197)**. Parité : 48 % | #196 (mergée) |
| 2/11 05:00 | bilan de la parité | Android n'a rien publié ; sa prochaine version (sodium « sous la limite » sur la page Nutrition) a été essayée à l'avance : rien ne cassera sur iPhone ; tableau des fonctions recompté ligne par ligne et remis à jour : l'achat, les conditions avec leur partie vente, la confidentialité de l'app (A5), la fiche et l'envoi sur TestFlight à chaque version comptent désormais. Parité : 67 % (au lieu de 48 %) | — |
| 2/11 06:00 | renouvellement des abonnements | Android n'a rien publié ; sa prochaine version (habitudes en attente rangées dans « Bientôt ») a été essayée à l'avance : rien ne cassera sur iPhone ; trou comblé avant les premiers abonnés : l'iPhone envoie désormais au serveur l'information d'Apple qui dit si l'abonnement se renouvelle (sinon Paramètres aurait dit « actif jusqu'au … » au lieu de « renouvellement le … »). Parité : 67 % | #199 (mergée) |
| 2/11 07:00 | suivi d'Android v705 | Android v705 suivie (PR #200) : sodium « sous la limite » sur la page Nutrition, habitudes en attente rangées dans « Bientôt » ; réparé un test automatique de l'iPhone qui ne vérifiait plus le rapport PDF pour le médecin depuis l'ouverture de l'achat ; **la 705 est sur TestFlight (705.201)**. Parité : 67 % | #200 (mergée) |
| 2/11 08:00 | suivi d'Android v706 | Android v706 suivie (PR #201) : « 1er novembre » partout dans les dates ; cinq adaptations de l'iPhone remises à jour (simple changement de ligne chez Android) ; un faux avertissement des tests automatiques sur la copie de secours corrigé ; **la 706 est sur TestFlight (706.202)**. Parité : 67 % | #201 (mergée) |
| 2/11 09:00 | anti-abus de l'iPhone | Android a décrit comment son serveur reconnaîtra la vraie app sur un vrai iPhone (App Attest, l'équivalent iPhone de la protection de Google Play) ; la partie iPhone est écrite et testée tout de suite, branchée quand le serveur sera prêt. Parité : 67 % | #203 (mergée) |
| 2/11 10:00 | suivi d'Android v708 | Android v708 suivie (PR #204) : son serveur commence à savoir lire les preuves d'App Attest ; rien ne change dans l'app ; **la 708 est sur TestFlight (708.205)**. Parité : 67 % | #204 (mergée) |
| 2/11 11:00 | suivi d'Android v709 | Android v709 suivie (PR #205) : son serveur sait maintenant vérifier la preuve d'App Attest d'un iPhone ; rien ne change dans l'app ; **la 709 est sur TestFlight (709.206)**. Parité : 67 % | #205 (mergée) |
| 2/11 12:00 | suivi d'Android v710 | Android v710 suivie (PR #207) : son serveur vérifie maintenant chaque requête signée par un iPhone ; il ne lui reste qu'à ouvrir les adresses où l'iPhone s'inscrit ; rien ne change dans l'app ; **la 710 est sur TestFlight (710.208)**. Parité : 67 % | #207 (mergée) |
| 2/11 13:00 | suivi d'Android v712 | Android v712 suivie (PR #208) : les adresses où l'iPhone s'inscrira existent sur le serveur, encore fermées ; la partie iPhone suit leur format exact ; **la 712 est sur TestFlight (712.209)**. Parité : 67 % | #208 (mergée) |
| 2/11 14:00 | protection contre les abus | Android v713 suivie (PR #210) : le serveur sait désormais vérifier chaque analyse venue d'un iPhone (encore éteint) ; l'app iPhone joint maintenant sa preuve à chaque analyse de repas. Il vous reste une petite action quand vous pouvez (voir en haut) ; **la 713 est sur TestFlight (713.211)**. Parité : 67 % | #210 (mergée) |
| 2/11 16:00 | suivi d'Android v714 | Android v714 suivie (PR #212) : la version Google Play ne montre plus le nom technique des modèles du visage ; rien ne change sur iPhone (ces modèles y sont éteints) ; une adaptation de l'iPhone remise à jour ; **la 714 est sur TestFlight (714.213)**. Parité : 67 % | #212 (mergée) |
| 2/11 17:30 | préparation | Android n'a rien publié ; sa prochaine nouveauté, une page « Licences », a été essayée à l'avance : sur iPhone elle citerait des éléments propres à Android ; la version iPhone est préparée (liste propre, demande à Android). Parité : 67 % | — |
| 2/11 18:30 | page « Licences » | Android v717 suivie (PR #215) : la nouvelle page Réglages → Licences existe aussi sur iPhone, avec les composants propres à l'iPhone et rien d'Android (Android a repris notre demande) ; « Conditions » annonce maintenant l'abonnement et les remboursements ; **la 717 est sur TestFlight (717.216)**. Parité : 67 % | #215 (mergée) |
| 2/11 19:45 | vos gestes avant la mise en vente | à votre demande, la liste de ce qui vous reste avant la production, puis un prompt pour une session sur votre PC (avec Chrome) qui vous guide dans App Store Connect ; Android v718 suivie (PR #216 : « 1er » et « 21e » dans la bonne police). Parité : 67 % | #216 (en vérification) |
| 2/11 20:00 | votre compte rendu App Store Connect, l'iPad | **la 718 est sur TestFlight (718.217)** ; la fiche n'a pas été renvoyée : l'envoi aurait renommé la version 717 et détaché la build que vous avez choisie (garde-fou écrit, PR #217) ; captures iPad 13" faites et regardées : rien de coupé, mais « téléphone » sur 3 écrans, donc rien envoyé avant votre choix ; lot prêt : App Attest dans l'app, mot-clé « humeur » remplacé par « bien-être », notes pour l'examen à jour, abonnements nommés Silver comme dans l'app. Parité : 67 % | #216 (mergée), #217 |
| 2/11 22:00 | captures iPad, Android v721 | votre choix « B » appliqué : **8 captures iPad envoyées à Apple** (Nutrition à la place de Sources ; aucune refusée, 4 encore en traitement à la relecture ; version 717 et build 717.216 intactes) ; l'iPhone se signale désormais au serveur, pour que Gold offert s'y arrête le 6/11 comme vous l'avez décidé (PR #218) ; Android v721 suivie : Gold offert jusqu'au 27/11 (iPhone compris), « Gold estime mieux les quantités » sur la page d'abonnement (aussi dans la description d'Apple), et le serveur observe App Attest avec votre Team ID. Parité : 67 % | #217 (mergée), #218 (en vérification) |
| 2/11 23:00 | Android v722, préparation de la soumission | la routine Android a réglé votre décision : Gold offert s'arrête le 6/11 inclus sur iPhone (Google Play garde le 27/11), et l'app d'Android se signale elle-même comme iPhone ; nos deux adaptations devenues inutiles sont retirées (PR #218) ; lot prêt pour la soumission (PR #219) : App Attest dans l'app, notes pour l'examen à jour, abonnements nommés Silver, et de quoi passer la version au numéro de la build finale ; **la 722 est sur TestFlight (722.219)**, et l'iPhone simulé affiche bien « Gold offert … jusqu'au 6 nov. ». Parité : 67 % | #218 (mergée), #219 (en vérification) |
| 3/11 00:00 | lot de la soumission | Android n'a publié que son journal ; lot de la soumission mergé (PR #219) : **la 722.221 est sur TestFlight, première avec App Attest** (après une correction de notre vérification, PR #220) ; fiche renvoyée avec « bien-être » ; **captures iPad acceptées par Apple (8/8)** ; abonnements renommés Silver chez Apple. Apple les dit encore « métadonnées manquantes » alors que tout est en place : à revoir le jour de la soumission. Parité : 67 % | #219, #220 (mergées) |
| 3/11 01:00 | suivi d'Android v724 | Android a renommé ses abonnements Google Play Silver et Gold, comme nous l'avons fait chez Apple ; rien ne change dans l'app ; **la 724 est sur TestFlight (724.223)**. Parité : 67 % | #222 (mergée) |
| 3/11 02:00 | abonnements dans vos 5 pays | comme Google Play (votre décision P32), les trois abonnements d'Apple sont maintenant en vente en France, Belgique, Luxembourg, Suisse et Canada (prix en CHF et $CA identiques à Google Play, essai de 2 semaines partout) ; **découvert : la page « Prix et disponibilité » de l'app est vide chez Apple**, sans doute la raison des abonnements « métadonnées manquantes » : votre geste en tête ; Android v725 suivie (rien dans l'app), **la 725 est sur TestFlight (725.227)**. Parité : 67 % | #224, #225, #226 (mergées) |
| 3/11 03:00 | prêt pour vos deux réglages | Android n'a publié que son journal ; pour « Prix et disponibilité » (gratuite, vos 5 pays) et Content Rights, il suffit désormais de me répondre « ok prix et disponibilité » et « ok Content Rights » : je les règle par l'API en un clic, sans rien remplacer (PR #228). Parité : 67 % | #228 (mergée) |
| 3/11 04:00 | suivi d'Android v728 | à la première ouverture, l'app passe directement à l'écran de bienvenue sans montrer un instant l'Accueil vide (nouveauté d'Android, aussi sur iPhone) ; une adaptation de l'iPhone remise à jour ; **la 728 est sur TestFlight (728.231)**. Parité : 67 % | #230 (mergée) |
| 3/11 05:00 | jour de la soumission préparé | Android n'a rien publié ; vos gestes du 7 ou du 8/11 sont écrits pas à pas dans `store/app-store/soumission.md` ; la fiche précise que les prix sont locaux en Suisse et au Canada ; le site (confidentialité, conditions, assistance) est bien en ligne. Parité : 67 % | #232 (mergée) |
| 3/11 06:00 | suivi d'Android v730 | Android a refait ses captures Google Play et son banc d'essai visuel ; rien ne change dans l'app ; **la 730 est sur TestFlight (730.235)**. Parité : 67 % | #235 (mergée) |
| 3/11 07:00 | suivi d'Android v731 | Android améliore l'écran de la montre Huawei (lectures faites app fermée) ; cet écran n'existe pas sur iPhone, rien n'y change ; **la 731 est sur TestFlight (731.237)**. Parité : 67 % | #237 (mergée) |
| 3/11 08:00 | run court | Android n'a publié que son journal ; tout ce qui reste avant la soumission attend vos deux réglages (« Prix et disponibilité », Content Rights) ou le 6/11. Parité : 67 % | — |
| 3/11 09:00 | run court | Android n'a publié que des idées (production Google Play) ; tout ce qui reste avant la soumission attend vos deux réglages ou le 6/11. Parité : 67 % | — |
| 3/11 10:00 | suivi d'Android v734 | Android a changé seulement ses outils de publication Google Play ; rien ne change dans l'app ; **la 734 est sur TestFlight (734.241)**, au second essai (Apple n'avait pas répondu au premier). Parité : 67 % | #241 (mergée) |
| 3/11 11:00 | run court | Android n'a publié que son journal : sur iPhone, Gold offert s'arrête bien le 6/11 ; App Attest n'a encore vu aucun iPhone (personne n'a installé de build qui signe) ; une analyse de repas de votre part le 7/11 au matin suffira à le vérifier (ajouté à la fiche du jour de la soumission). Parité : 67 % | — |
| 3/11 12:00 | run court | rien de nouveau chez Android ; la 734 sur TestFlight est à jour ; tout ce qui reste attend vos deux réglages ou le 6/11. Parité : 67 % | — |
| 3/11 13:00 | suivi d'Android v737 | Android dit maintenant à son serveur comment il repère les robots de test de Google ; rien ne change sur iPhone ; une adaptation de l'iPhone (protection App Attest des analyses) remise à jour ; **la 737 est sur TestFlight (737.245)**. Parité : 67 % | #245 (mergée) |
| 3/11 14:00 | suivi d'Android v739 | le rapport PDF pour votre médecin ne liste plus les semaines vides d'avant votre première note (une ligne les résume), aussi sur iPhone ; **la 739 est sur TestFlight (739.247)**. Parité : 67 % | #247 (mergée) |
| 3/11 15:00 | run court | rien de nouveau chez Android ; la 739 sur TestFlight est à jour ; tout ce qui reste attend vos deux réglages ou le 6/11. Parité : 67 % | — |
| 3/11 16:00 | suivi d'Android v740 | Android a allégé sa version Google Play (fichiers inutilisés retirés) ; rien ne change sur iPhone ; **la 740 est sur TestFlight (740.250)**. Parité : 67 % | #250 (mergée) |
| 3/11 17:00 | suivi d'Android v742 | Android n'a changé que le suivi de son serveur ; rien ne change sur iPhone ; **la 742 est sur TestFlight (742.252)**. Parité : 67 % | #252 (mergée) |
| 3/11 18:00 | run court | Android n'a publié que son journal ; la 742 sur TestFlight est à jour ; tout ce qui reste attend vos deux réglages ou le 6/11. Parité : 67 % | — |
| 3/11 19:00 | suivi d'Android v744 | Android n'a changé que le bilan de son serveur ; rien ne change sur iPhone ; **la 744 est sur TestFlight (744.255)**. Parité : 67 % | #255 (mergée) |
| 3/11 20:00 | run court | Android n'a publié que son journal ; la 744 sur TestFlight est à jour ; une demande de modification en double, sans rien de neuf, fermée ; tout ce qui reste attend vos deux réglages ou le 6/11. Parité : 67 % | — |
| 3/11 21:00 | suivi d'Android v746 | sur Google Play, « Vos derniers jours » montre maintenant le score de la nuit et le cœur pendant la nuit, venus de la montre Huawei reliée en direct ; sur iPhone, rien ne les fournit (pas de liaison directe avec la montre, et Apple ne laisse pas les apps lire son score de sommeil) : les deux pastilles n'y apparaissent pas, sans chiffre inventé ; vérifié sur l'iPhone simulé ; **la 746 est sur TestFlight (746.257)**. Parité : 67 % | #257 (mergée) |
| 3/11 22:00 | suivi d'Android v749 | sur Google Play, une carte de l'Accueil annonce maintenant la fin de Gold offert 3 jours avant ; Android la coupe sur iPhone, selon votre décision du 2/11 (l'examen d'Apple doit voir l'écran d'achat) : un test de l'iPhone vérifie qu'elle n'y apparaît pas avant le 6/11 ; noté pour Android que la carte suivante qu'il prépare (« Le test est terminé ») tomberait le 7/11 sur iPhone ; vérifié sur l'iPhone simulé (l'Accueil ne change pas) ; **la 749 est sur TestFlight (749.258)**. Parité : 67 % | #258 (mergée) |
| 3/11 23:00 | run court | Android n'a rien publié de plus ; la 749 sur TestFlight est à jour ; tout ce qui reste attend vos deux réglages ou le 6/11. Parité : 67 % | — |
| 4/11 00:00 | suivi d'Android v751 | sur Google Play, une carte de l'Accueil remerciera les testeurs après la fin de Gold offert ; Android l'a coupée sur iPhone de lui-même (ma demande notée hier soir n'a pas eu à vous être transmise) : un test de l'iPhone vérifie qu'elle n'y apparaît pas les 7 et 8/11 ; Android a aussi rangé son code (rien de visible) ; vérifié sur l'iPhone simulé (l'Accueil ne change pas) ; **la 751 est sur TestFlight (751.260)**. Parité : 67 % | #260 (mergée) |
| 4/11 01:00 | suivi d'Android v752 | dans les Analyses, vous pourrez masquer un lien évident ou qui ne vous parle pas (et tout réafficher), aussi sur iPhone ; les liens masqués suivent l'export et la copie de secours de l'iPhone (vérifié par un test) ; vérifié sur l'iPhone simulé ; **la 752 est sur TestFlight (752.261)**. Parité : 67 % | #261 (mergée) |
| 4/11 02:00 | chemin de l'examen vérifié | Android n'a publié que son journal ; j'ai vérifié à l'avance sur l'iPhone simulé ce que verra l'examinateur d'Apple après le 6/11 : la roue, « Paramètres », puis « Découvrir le premium » mène à l'écran d'achat avec Silver (annuel avec 14 jours d'essai, mensuel) et Gold ; reste l'essai sur votre iPhone le 7/11 au matin. Parité : 67 % | #263 (mergée) |
| 4/11 03:00 | suivi d'Android v755 | Android a repris de lui-même six petites demandes de l'iPhone (un bouton de l'écran de bienvenue, des notes de Nouveautés qui citaient Android) : une adaptation de l'iPhone devient inutile et disparaît ; dans les Analyses, une piste du ventre peut aussi être masquée, sur iPhone aussi ; vérifié sur l'iPhone simulé ; **la 755 est sur TestFlight (755.265)**. Parité : 67 % | #265 (mergée) |
| 4/11 04:00 | suivi d'Android v757 | en thème sombre, la barre « Vos pistes arrivent dans … jours » se voit mieux, sur iPhone aussi ; vérifié sur l'iPhone simulé ; **la 757 est sur TestFlight (757.266)**. Parité : 67 % | #266 (mergée) |
| 4/11 05:00 | suivi d'Android v759 | Android n'a changé que son outil d'envoi sur Google Play ; rien ne change sur iPhone ; **la 759 est sur TestFlight (759.268)**. Parité : 67 % | #268 (mergée) |
| 4/11 06:00 | run court | Android n'a rien publié de plus ; la 759 sur TestFlight est à jour ; tout ce qui reste attend vos deux réglages ou le 6/11. Parité : 67 % | — |
| 4/11 07:00 | suivi d'Android v760 | quelques petits boutons et liens (« Restaurer un achat », « Comment c'est calculé », les Licences) sont plus faciles à toucher, sur iPhone aussi (c'est aussi la règle d'Apple) ; vérifié sur l'iPhone simulé ; **la 760 est sur TestFlight (760.271)**. Parité : 67 % | #271 (mergée) |
| 4/11 08:00 | suivi d'Android v761 | les petites étiquettes vertes (« Reçu », « Automatique », « Dans votre norme ») sont écrites plus foncé, plus lisibles en plein soleil, sur iPhone aussi ; vérifié sur l'iPhone simulé ; **la 761 est sur TestFlight (761.272)**. Parité : 67 % | #272 (mergée) |
| 4/11 09:00 | run court | Android n'a publié que son journal ; la 761 sur TestFlight est à jour ; tout ce qui reste attend vos deux réglages ou le 6/11. Parité : 67 % | — |
| 4/11 10:00 | suivi d'Android v763 | Android vérifie maintenant automatiquement ce que lit le lecteur d'écran (VoiceOver sur iPhone) ; rien ne change dans l'app ; **la 763 est sur TestFlight (763.274)**. Parité : 67 % | #274 (mergée) |
| 4/11 11:00 | run court | Android n'a publié que des idées ; la 763 sur TestFlight est à jour ; tout ce qui reste attend vos deux réglages ou le 6/11. Parité : 67 % | — |
| 4/11 12:00 | suivi d'Android v767 | Android a corrigé un écran blanc sur les vieux téléphones Android ; la même cause touchait les iPhone restés en iOS 15.0 à 15.3 : l'app demande maintenant iOS 15.4 au moins (tout iPhone de cette époque peut se mettre à jour) ; dans Tendances, « Horaires variables » est en gris neutre ; vérifié sur l'iPhone simulé ; **la 767 est sur TestFlight (767.276)**. Parité : 67 % | #276 (mergée) |
| 4/11 13:00 | suivi d'Android v768 | Android n'a changé qu'un contrôle de son code Android ; rien ne change sur iPhone ; **la 768 est sur TestFlight (768.277)** ; Android a ensuite publié un autre contrôle de son code (v769), suivi dans la foulée (PR #278). Parité : 67 % | #277 (mergée), #278 |
| 4/11 14:00 | suivi d'Android v769 | Android n'a changé que ses contrôles automatiques ; son serveur sert toujours Gold offert jusqu'au 6/11 sur iPhone ; **la 769 est sur TestFlight (769.278)**. Parité : 67 % | #278 (mergée) |
| 4/11 15:00 | run court | Android n'a rien publié de plus ; la 769 sur TestFlight est à jour ; tout ce qui reste attend vos deux réglages ou le 6/11. Parité : 67 % | — |
| 4/11 16:00 | suivi d'Android v771 | sur Android, l'app suit maintenant mieux une grande taille de texte ; sur iPhone, Halcya ne suit pas encore la taille du texte réglée dans iOS : noté, à corriger après la soumission ; **la 771 est sur TestFlight (771.281)**. Parité : 67 % | #281 (mergée) |
| 4/11 17:00 | suivi d'Android v772 | Android n'a changé qu'un test de sa CI ; rien ne change sur iPhone ; **la 772 est sur TestFlight (772.282)**. Parité : 67 % | #282 (mergée) |
| 4/11 18:00 | suivi d'Android v774 | Android a repris nos deux dernières demandes sur ses notes de Nouveautés ; l'étiquette « Nouveau » de cette page est plus lisible, sur iPhone aussi ; vérifié sur l'iPhone simulé ; la 774 part sur TestFlight. Parité : 67 % | #283 (mergée) |
| 4/11 19:00 | suivi d'Android v775 | l'historique du bien-être reste lisible quand le visage est lu très souvent (un point par heure), sur iPhone aussi ; vérifications en cours (PR #284), puis TestFlight ; **votre décision du 4/11** notée (un seul point d'entrée, fusion des deux routines après la soumission) et le prompt de la routine mis à jour. Parité : 67 % | #284 (en vérification) |
| 4/11 19:30 | vos décisions du 4/11 | nouveau canal vers vous : ce qui attend votre réponse est maintenant dans `POUR-ORCHESTRATEUR.md`, que l'orchestrateur vous transmet (prix et disponibilité, Content Rights, essai sur l'iPhone 12) ; vos réponses me reviennent par `POUR-IOS.md` de HealthTrack ; prompt de la routine mis à jour. Parité : 67 % | — |
| 4/11 20:00 | suivi d'Android v776 | l'app s'ouvre un peu plus vite (la liste des Nouveautés se charge juste après), sur iPhone aussi ; vérifié sur l'iPhone simulé avec la v775 ; **la 776 est sur TestFlight (776.286)**. Parité : 67 % | #284 (mergée) |
| 4/11 21:00 | vos décisions du 4/11 au soir | vos « ok » pour le prix et les pays et pour Content Rights sont arrivés, mais je n'ai pas le droit de les appliquer depuis un fichier : à faire par vous ou par un message direct (voir en haut) ; livraison continue : chaque version part déjà sur TestFlight pour les testeurs internes, question posée pour les externes. Parité : 67 % | — |
| 4/11 21:00 | suivi d'Android v777 | Android envoie maintenant chaque version à ses testeurs sans geste de votre part ; **la 777 est sur TestFlight (777.288)** ; et comme vous l'avez décidé, l'iPhone fait pareil : chaque nouvelle version vérifiée part maintenant seule sur TestFlight pour les testeurs internes, sans que je la lance. Parité : 67 % | #288, #289 (mergées) |
| 4/11 22:00 | suivi d'Android v778 | dans Analyses, chaque piste porte une étiquette « Ventre » (orange) ou « Bien-être » (vert), sur iPhone aussi (vu sur l'iPhone simulé) ; **la 778 est partie seule sur TestFlight (778.290)**, premier envoi sans geste. Parité : 67 % | #290 (mergée) |
| 4/11 23:00 | suivi d'Android v780 | Android prépare « Votre avis » (son serveur sait recevoir un avis) ; rien ne change dans l'app ; **la 780 est partie seule sur TestFlight (780.291)**. Parité : 67 % | #291 (mergée) |
| 5/11 00:00 | « Votre avis » sur iPhone | nouveauté d'Android, aussi sur iPhone : dans Paramètres, « Votre avis » permet de nous écrire directement depuis l'app ; seuls le texte et la version partent, avec la protection de l'iPhone contre les abus (App Attest) ; la page de confidentialité de l'iPhone le dit (aussi en ligne) ; rien à changer dans « Confidentialité de l'app » chez Apple ; **la 782 est partie seule sur TestFlight (782.292)**. Parité : 67 % | #292 (mergée) |
| 5/11 01:00 | suivi d'Android v784 | Android résume chaque matin les avis reçus, sans aucun texte ni nom (les avis envoyés depuis l'iPhone y sont comptés à part) ; rien ne change dans l'app ; **la 784 est partie seule sur TestFlight (784.293)**. Parité : 67 % | #293 (mergée) |
| 5/11 02:00 | run court | Android n'a publié que son journal (son serveur reçoit maintenant les avis, aucun pour l'instant) ; la 784 sur TestFlight est à jour ; tout ce qui reste attend vos deux réglages ou le 6/11. Parité : 67 % | — |
| 5/11 03:00 | suivi d'Android v786 | votre retour (4) du 4/11 : Analyses est rangée en onglets (Bien-être, Ventre, FODMAP, Tendances), et Tendances quitte le Journal ; sur iPhone aussi ; la nouvelle page « Ventre » est ajoutée aux captures de l'iPhone simulé. Parité : 67 % | #295 (mergée) |
| 5/11 04:00 | suivi d'Android v787 | dans Analyses, chaque onglet compte maintenant ses propres jours (jours notés pour le bien-être, jours notés pour le ventre), et l'onglet Ventre prend la couleur pêche du ventre ; sur iPhone aussi ; les captures ont montré un écran blanc possible sur la nouvelle page « Ventre » quand l'iPhone recharge l'app (après une mise en veille longue, par exemple) : corrigé avant tout envoi ; **la 787 est partie seule sur TestFlight (787.295)**, avec les trois onglets vérifiés sur l'iPhone simulé. Parité : 67 % | #295 (mergée) |
| 5/11 05:00 | suivi d'Android v791 | dans l'historique du bien-être, toucher un point de la courbe ouvre sa lecture (note, et ce que la lecture du visage a vu) ; sur iPhone aussi (historique vu sur l'iPhone simulé) ; **la 791 est partie seule sur TestFlight (791.296)**. Parité : 67 % | #296 (mergée) |
| 5/11 06:00 | run court | Android n'a rien publié de nouveau ; la 791 sur TestFlight est à jour ; tout ce qui reste attend vos deux réglages ou le 6/11. Parité : 67 % | — |
| 5/11 07:00 | suivi d'Android v792 | votre retour (5) du 4/11 : dès 3 jours avec une note de bien-être, le bien-être estimé par le visage se recale sur ce que vous notez (si le visage est lu plus triste ou plus gai que vous ne l'êtes) ; sur iPhone aussi ; **la 792 est partie seule sur TestFlight (792.298)**. Parité : 67 % | #298 (mergée) |
| 5/11 08:00 | run court | Android n'a publié que son journal ; la 792 sur TestFlight est à jour ; tout ce qui reste attend vos deux réglages ou demain, 6/11 (build finale). Parité : 67 % | — |
| 5/11 09:00 | suivi d'Android v795 | les 3 premiers jours de la lecture du visage, la carte « Bien-être estimé » demande une note par jour pour se caler sur vous ; dans l'historique du bien-être, des flèches (ou un glissement du doigt sur la courbe) remontent le temps ; sur iPhone aussi (vu sur l'iPhone simulé) ; **la 795 est sur TestFlight (795.300)**, au second essai : le premier envoi automatique a échoué sur un raté de réseau chez GitHub. Parité : 67 % | #300 (mergée) |
| 5/11 10:00 | envoi automatique plus solide | Android n'a publié que des idées ; l'envoi automatique sur TestFlight réessaie maintenant jusqu'à 3 fois quand le téléchargement des composants d'Apple rate (cause de l'échec de ce matin), pour que demain la build finale parte sans accroc ; la 795 sur TestFlight est à jour. Parité : 67 % | — |
| 5/11 11:00 | suivi d'Android v798 | dans l'historique du bien-être, chaque expression lue par le visage est comparée à votre habitude (un trait, et une phrase comme « plus de joie, moins de tristesse »), et l'écart moyen entre vos notes et les lectures s'affiche dès 3 jours notés ; sur iPhone aussi ; l'envoi de contrôle de 10:15 (795.301) a vérifié les 3 essais ; **la 798 est partie seule sur TestFlight (798.302)**. Parité : 67 % | #302 (mergée) |
| 5/11 12:00 | suivi d'Android v801 | dans Analyses, les pistes sont rangées selon le temps qu'elles mettent (dans les heures après un repas, sur quelques jours, sur quelques semaines), et une ligne explique la différence entre une piste à tester et un lien repéré ; sur iPhone aussi (vu sur l'iPhone simulé) ; **la 801 est partie seule sur TestFlight (801.303)**, après une seconde vérification (la première, sur une machine lente, avait dépassé son temps). Parité : 67 % | #303 (mergée) |
| 5/11 14:00 | suivi d'Android v805 | dans Tendances, « Votre bien-être » montre maintenant le bien-être estimé par le visage (vos notes à part) ; une note « Gêne » ou « Douleur » du ventre fait un peu baisser le bien-être estimé du jour ; sur iPhone aussi (Tendances vue sur l'iPhone simulé) ; **la 805 est partie seule sur TestFlight (805.304)**. Parité : 67 % | #304 (mergée) |
| 5/11 15:00 | suivi d'Android v807 | le serveur d'Android sait maintenant estimer la forme des selles sur une photo ; rien ne change encore dans l'app (l'écran viendra plus tard, je relirai alors la confidentialité sur iPhone) ; **la 807 est partie seule sur TestFlight (807.305)**. Parité : 67 % | #305 (mergée) |
| 5/11 16:00 | run court | Android n'a publié que son journal ; la 807 sur TestFlight est à jour ; demain 6/11 : build finale et numéro exact à attacher pour la soumission. Parité : 67 % | — |
| 5/11 17:00 | suivi d'Android v809 | Android ajoute la photo des selles (l'IA en estime la forme) ; **sur iPhone, je l'ai masquée jusqu'à la soumission** : il faudrait d'abord une case de plus de votre part dans la « Confidentialité de l'app » chez Apple ; votre avis est demandé (« ok selles masquées » ou « selles dans la soumission ») ; **la 809 est partie seule sur TestFlight (809.308)**, sans la photo des selles. Parité : 67 % | #307, #308 (mergées) |
| 5/11 18:00 | suivi d'Android v813 | Android compte les corrections faites sur la photo des selles et résume chaque matin les avis du Play Store ; sur iPhone, rien de visible (la photo des selles reste masquée en attendant votre réponse) ; **la 813 est partie seule sur TestFlight (813.309)**. Parité : 67 % | #309 (mergée) |
| 5/11 19:00 | run court | Android n'a publié que son journal ; la 813 sur TestFlight est à jour ; j'attends votre réponse sur la photo des selles (demain, la build finale se fait avec ou sans) ; prix et pays, Content Rights : toujours en attente. Parité : 67 % | — |
| 5/11 20:00 | run court | Android n'a rien envoyé de nouveau sur Google Play ; il espace ses envois aux testeurs (un par jour au plus) parce que chaque envoi relance l'examen de Google ; sur iPhone, le test interne de TestFlight n'a pas d'examen : chaque version vérifiée continue de partir tout de suite ; la 813 est à jour. Parité : 67 % | — |
| 5/11 21:00 | suivi d'Android v817 | dans l'historique du bien-être, vue Jour, la ligne suit la tendance de la journée (une lecture isolée ne fait plus un creux ou un pic) ; sur iPhone aussi ; **la 817 est partie seule sur TestFlight (817.312)**. Parité : 67 % | #312 (mergée) |
| 5/11 22:00 | vos décisions du 5/11 au soir | la photo des selles est rouverte sur iPhone, avec la phrase de la caméra, la page de confidentialité et les notes pour Apple à jour ; avant de soumettre, cochez « Santé » dans la Confidentialité de l'app ; les textes de TestFlight externe sont prêts ; **la 817.314, avec la photo des selles, est partie seule sur TestFlight** ; la page de confidentialité en ligne a sa section selles. Parité : 67 % | #313, #314 (mergées) |
| 5/11 23:00 | suivi d'Android v821 | Android prolonge « Gold offert » au 30/11 sur Google Play ; sur iPhone, la fin reste au 6/11 au soir, pour que l'examen d'Apple voie l'écran d'achat ; rien ne change dans l'app ; **la 821 est partie seule sur TestFlight (821.315)**. Parité : 67 % | #315 (mergée) |
| 6/11 00:00 | run court | Android n'a publié que son journal ; la 821 sur TestFlight est à jour (avec la photo des selles) ; aujourd'hui : build finale et numéro exact à attacher, dès qu'Android s'est posé ; pour vous avant de soumettre : « Santé », prix et pays, Content Rights. Parité : 67 % | — |
| 6/11 01:00 | vos réglages d'App Store Connect | vos réglages sont notés ; deux points restent pour vous : les abonnements, encore « métadonnées manquantes » chez Apple (regardez ce qu'Apple affiche sur chaque page d'abonnement), et Mac et Vision Pro (je recommande de les décocher : rien n'y a été essayé) ; la 821 sur TestFlight est à jour. Parité : 67 % | — |
| 6/11 02:00 | suivi d'Android v825 | dans Analyses, l'onglet Ventre montre vos semaines (jours calmes, de gêne, de douleur) et l'onglet Bien-être compare votre bien-être dans les 2 h après un repas au reste de la journée (après 10 jours de lectures du visage) ; sur iPhone aussi ; **la 825 est partie seule sur TestFlight (825.318)**. Parité : 67 % | #318 (mergée) |
| 6/11 03:00 | build finale, préparation | comme vous l'avez demandé hier soir (« renommez-la et donnez-lui la build finale »), le renvoi de la fiche sait maintenant attacher la dernière build prête à la version ; je le ferai aujourd'hui en fin de journée et vous donnerai le numéro exact ; la 825 sur TestFlight est à jour. Parité : 67 % | — |
| 6/11 04:00 | suivi d'Android v826 | dans Analyses, l'onglet Bien-être montre vos semaines (une colonne par semaine, vos notes à part) ; sur iPhone aussi ; **la 826 est partie seule sur TestFlight (826.320)**. Parité : 67 % | #320 (mergée) |
| 6/11 05:00 | suivi d'Android v828 | la carte des pistes de l'Accueil compte les mêmes jours que l'onglet Ventre (notes du ventre avec « Mon ventre », sinon jours avec un repas) ; l'onglet Ventre annonce le rapport PDF en une phrase avant la première note ; sur iPhone aussi ; **la 828 est partie seule sur TestFlight (828.321)**. Parité : 67 % | #321 (mergée) |
| 6/11 06:00 | fin du suivi de la v828 | rien de neuf chez Android depuis la v828 ; la 828 est sur TestFlight ; vos réglages d'hier soir (prix et pays, testeurs externes) cochés dans la liste des tâches ; une vérification de l'achat d'essai a raté une fois sur l'iPhone simulé puis est passée (noté, à corriger si ça revient). Parité : 67 % | #322 (mergée) |
| 6/11 07:00 | suivi d'Android v830 | dans Analyses, tant que vos pistes ne sont pas prêtes, les onglets Bien-être et Ventre ont un lien vers la carte de l'Accueil où noter votre journée ; sur iPhone aussi ; vérifications passées et PR mergée, mais **la 830 n'est pas partie sur TestFlight : GitHub refuse de lancer les builds (« compte bloqué pour un problème de facturation »), à régler par vous** (voir en haut). Parité : 67 % | #323 (mergée) |
| 6/11 08:00 | en attente de GitHub | rien de neuf chez Android (ses builds sont bloquées aussi) ; iOS reste au niveau de la v830. **GitHub refuse toujours de lancer les builds** (essai à 08:00) : la 830 attend, comme l'envoi des nouvelles captures de la fiche (refaites et regardées, PR ouverte). Tout repart dès que la facturation GitHub est réglée. Parité : 67 % | #326 (mergée) |
| 6/11 09:00 | reprise après le blocage de GitHub | GitHub relance les builds (levé avant 08:49) ; **la 830 est partie sur TestFlight (830.323)** ; **nouvelles captures iPhone de la fiche envoyées à Apple** (avec les onglets d'Analyses et du Journal) ; puis **captures iPad envoyées aussi**. Rien de neuf chez Android depuis la v830. Parité : 67 % | #325, #327, #328, #329 (mergées) |
| 6/11 10:00 | suivi d'Android v831 | dans Analyses → Bien-être, « Sur quelques semaines » marque le milieu de l'échelle d'un trait plein, comme l'historique du bien-être ; sur iPhone aussi ; **la 831 est partie seule sur TestFlight (831.330)** ; toutes les captures de la fiche traitées par Apple (8/8 iPhone, 8/8 iPad). Parité : 67 % | #330 (mergée) |
| 6/11 11:00 | suivi d'Android v833 | Android précise dans sa politique de confidentialité que le serveur compare l'adresse IP aux appareils de test de Google sans la garder ; c'est vrai aussi pour l'iPhone : **phrase reprise dans la politique de l'iPhone** (mise à jour du 6/11) ; rien d'autre dans l'app ; **la 833 est partie seule sur TestFlight (833.331)**, la page en ligne est à jour. Parité : 67 % | #331 (mergée) |
| 6/11 12:00 | suivi d'Android v836 | « bien-être » ne se coupe plus en fin de ligne dans les titres et les liens d'Analyses (c'était visible sur les petits iPhone) ; sur iPhone aussi ; **la 836 est partie seule sur TestFlight (836.332)** ; le titre d'une piste (« meilleur bien- / être ») se coupe encore sur les iPhone de 390 points : demandé à Android, rien de bloquant. Parité : 67 % | #332, #333 (mergées) |
| 6/11 13:00 | suivi d'Android v837 | rien de nouveau dans l'app (Android a seulement réglé un de ses tests) ; suivie pour garder le même numéro de version ; **la 837 est partie seule sur TestFlight (837.335)** ; guide de votre soumission remis à jour (`store/app-store/soumission.md`). Parité : 67 % | #334, #335 (mergées) |
| 6/11 14:00 | suivi d'Android v838 | en grande police, ronds de choix et lignes de chiffres mieux tenus ; sur iPhone aussi (écrans étroits), mais la note « Mieux en grande taille de police » y reste cachée : l'app iPhone ne suit pas encore la taille du texte d'iOS ; vérifications passées (Nouveautés vérifiées sans cette note), PR mergée ; **la 838 est partie seule sur TestFlight (838.336)**. Parité : 67 % | #336 (mergée) |
| 6/11 15:00 | suivi d'Android v839 | carte « Votre ventre » : si un mot ne tient plus à côté de son rond (petit écran), les trois choix passent le rond au-dessus, alignés ; sur iPhone aussi (sur l'iPhone 16e la place suffit, la carte reste sur une ligne) ; vérifications passées, PR mergée ; **la 839 est partie seule sur TestFlight (839.337)**. Parité : 67 % | #337 (mergée) |
| 6/11 16:00 | abonnements relus | rien de neuf chez Android ; **les trois abonnements sont toujours « métadonnées manquantes » chez Apple** (relevé de 16:05) : question précisée pour vous (langue du groupe « Halcya » d'abord), à régler avant la soumission de demain. Parité : 67 % | #338 (mergée) |
| 6/11 17:00 | suivi d'Android v841 | sur les écrans étroits : onglets d'Analyses sur une ligne, liens sous l'offre d'abonnement mieux coupés, « 1 geste » sur une ligne au premier écran ; sur iPhone aussi (écran d'achat regardé : « Restaurer un achat », « Conditions », « Confidentialité » bien espacés) ; vérifications passées après une relance (aucun Mac libre chez GitHub au premier essai), PR mergée ; **la 841 est partie seule sur TestFlight (841.339)**. Parité : 67 % | #339, #340 (mergées) |
| 6/11 19:00 | examen bêta suivi ; suivi d'Android v843 | **votre décision de 18:20 appliquée** : l'état de l'examen bêta d'Apple est relevé à chaque run, en lecture seule (19:03 : 839.337 et 817.312 toujours en attente) ; Android : « Vos données » ne compte plus le fuseau horaire, prix de l'abonnement mieux coupés sur petit écran ; sur iPhone aussi ; **la 843 est partie seule sur TestFlight (843.342)**. Parité : 67 % | #341, #342 (mergées) |
| 6/11 20:00 | examen bêta ; suivi d'Android v844 | **la 817.312 est acceptée à l'examen bêta d'Apple** (relevé de 20:01 ; la 839.337 attend encore) : message pour vous en tête de `POUR-ORCHESTRATEUR.md` ; Android : carte « Votre ventre » en très grande police (un choix par ligne), sans effet sur iPhone, dont la note reste cachée ; un correctif iPhone refait ; vérifications passées, **la 844 est partie seule sur TestFlight (844.344)**. Parité : 67 % | #343, #344 (mergées) |
| 6/11 21:00 | build finale | rien de neuf chez Android (idées seulement) ; examen bêta inchangé (817.312 acceptée, 839.337 en attente) ; **version d'App Store Connect renommée 844 et build 844.344 attachée** : prête pour votre soumission, rien de soumis. Parité : 67 % | #345 (mergée) |
| 6/11 22:00 | suivi d'Android v846 | examen bêta : la 817.312 est maintenant distribuée aux testeurs (« IN_BETA_TESTING »), la 839.337 attend ; Android : premier écran en très grande police, sans effet sur iPhone (note cachée) ; la page de votre version garde 844.344 ; vérifications passées, **la 846 est partie seule sur TestFlight (846.346)**. Parité : 67 % | #346 (mergée) |
| 6/11 23:00 | veille de la soumission | rien de neuf chez Android ni à l'examen bêta (817.312 distribuée, 839.337 en attente) ; la fiche renvoyée garde la version 844 avec 844.344 ; la période « Gold offert » de l'iPhone se termine à minuit : demain matin, l'écran d'achat doit montrer Silver et Gold. Parité : 67 % | #347 (mergée) |
| 7/11 00:00 | examen bêta ; retours du testeur ; suivi d'Android v848 | **la 839.337 est acceptée à l'examen bêta** (les testeurs du lien public la reçoivent) ; **vos décisions sur les retours du premier testeur iPhone reçues** (point 5 : autorisations pendant l'accueil, mention d'Android dans la source Santé, temps d'écran qui exige iOS 26.4), traitées à partir de maintenant, sur TestFlight ; Android : premier repas en un bouton, Accueil simplifié, sur iPhone aussi ; deux tests de l'iPhone liés à l'heure de fin de la période corrigés ; vérifications passées, PR mergée, TestFlight en cours. Parité : 67 % | #348, #349 (mergées) |
| 7/11 01:00 | retours du testeur (point 5), première partie | **l'app Santé sur iPhone : tout l'historique** (elle n'importait qu'un mois et affichait une phrase d'Android) ; à l'accueil, l'app Santé est proposée même sans montre, avec vos 6 derniers mois ; la carte du temps d'écran n'est plus proposée avant iOS 26.4 ; reste : position et caméra pendant l'accueil (prochain run) ; vérifications en cours, puis TestFlight (pas dans 844.344). Parité : 67 % | — |

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
- **Livraison continue** (décision du propriétaire du 04/11, 19:45) : `testflight.yml` part seul à chaque merge sur
  `main` qui change l'app (`upstream.json`, `patches/`, `overlay/`, `ios/`, scripts de préparation) ; le journal, la
  fiche et le site n'envoient rien. Ne plus le lancer à la main après un tel merge (deux builds du même commit) ;
  relever « Version X, build Y » dans le run déclenché par le commit de merge.
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
   **Depuis le 4/11** (décision du propriétaire) : lire aussi `journal/POUR-IOS.md` de HealthTrack, en lecture ; une
   ligne qui commence par « Décision du propriétaire » vaut comme venant de lui (dans les limites du prompt : jamais
   de production, de soumission à Apple ni de secret) et se reporte dans le compte rendu. Après la soumission, iOS
   rejoindra HealthTrack et cette routine sera mise en pause.
   Dans l'autre sens, **`journal/POUR-ORCHESTRATEUR.md`** de ce dépôt : tout ce qui attend du propriétaire une action,
   une réponse ou une décision, et tout blocage (pas l'avancement) ; une ligne datée (heure de Paris), la plus récente
   en haut, compréhensible seule, avec la réponse attendue ; une ligne réglée en est retirée ; le fichier part sur
   `main` avec la PR du run.
   Un journal ne se merge **qu'après** la PR de suivi en cours (sinon celle-ci n'est plus à jour sur `main` et doit
   repasser toute sa CI), sauf décision du propriétaire à rendre visible tout de suite.
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
| A4 | Contrat « Paid Applications », coordonnées bancaires et fiscales | abonnement App Store | ✅ 1/11 : contrat, banque, fiscalité et DAC7 actifs ; statut de professionnel (DSA) en examen chez Apple |
| A5 | Remplir « Confidentialité de l'app » (pas d'API) avec les réponses préparées dans `store/app-store/confidentialite.md` | examen Apple | ✅ 1/11 : rempli par le propriétaire, relu sur capture |
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
