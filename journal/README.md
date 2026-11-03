# Journal de bord — Halcya sur iOS

## 📅 Semaine en cours — S45 (lundi 2 novembre → dimanche 8 novembre 2026)

> Résumé tenu à jour à chaque run de la routine iOS : **c'est ce que lit le propriétaire.**
> Le premier run d'une nouvelle semaine (lundi, heure de Paris) archive ce bloc dans `semaines/AAAA-Sww.md` et en
> ouvre un neuf. Semaine précédente : `semaines/2026-S44.md`.

**Où en est iOS**

| | Android (Google Play) | iOS (App Store) |
|---|---|---|
| Dernière version | v746 (3/11) | **744 sur TestFlight** (build 744.255, avec App Attest), achat ouvert ; dans App Store Connect, la version 717 garde la build 717.216 que vous avez choisie |
| Où l'installer | Play Store, test fermé | **TestFlight** (test interne : testeurs ajoutés par le propriétaire, action A6) |
| Parité des fonctions | référence | **67 %** (30 fonctions vérifiées sur 45 faisables, recompte du 2/11 : achat, conditions, fiche et TestFlight comptés depuis qu'ils marchent ; le temps d'écran, la voix et le Bluetooth attendent l'essai sur l'iPhone 12) |

**👉 Prochaine action du propriétaire**
- **« Prix et disponibilité » de l'app, avant la soumission** (App Store Connect → Halcya → Distribution, ou
  Monétisation → **Prix et disponibilité**). Apple dit que cette page n'a jamais été remplie (relevé du 3/11) ; c'est
  sans doute pour cela que les abonnements restent « métadonnées manquantes ».
  1. Prix de l'app : **Gratuit** (l'app est gratuite ; seuls les abonnements sont payants).
  2. Disponibilité : **France, Belgique, Luxembourg, Suisse, Canada**, rien d'autre (surtout pas les États-Unis),
     comme votre décision P32 pour Google Play ; ne pas la rendre disponible automatiquement dans les nouveaux pays.
  3. Enregistrer.

  Vous pouvez aussi me répondre « ok prix et disponibilité » : je le règle par l'API avec ces valeurs. Les trois
  abonnements sont déjà en vente dans ces 5 pays (prix en CHF et en $CA comme Google Play).
- **Content Rights** (App Store Connect → Halcya → Informations sur l'app) : l'app utilise des contenus de tiers sous
  licence (tables d'aliments, modèles, polices, cités dans Réglages → Licences). Je propose « Oui, elle contient du
  contenu de tiers, et j'ai les droits nécessaires ». Répondez « ok Content Rights » et je l'envoie par l'API, ou
  cochez-le vous-même.
- **Le 6 ou le 7/11, avant de soumettre** : je vous donnerai le numéro exact de la build à attacher. La version
  changera de numéro (717 → celui de la build finale, 72x), car Apple n'attache une build qu'à la version du même
  numéro ; la build 717.216 n'a ni App Attest ni le repère iPhone dont le serveur a besoin.
- **A6, quand vous pouvez** : inviter votre compagne dans App Store Connect (Utilisateurs et accès, rôle « Customer
  Support »), créer dans TestFlight un groupe de test interne avec elle et la build la plus récente, et me donner la
  version d'iOS de son iPhone 12 (Réglages → Général → Informations).
- Installez la build la plus récente de TestFlight (744.255 aujourd'hui) : Paramètres y dit « Gold offert pendant le
  test, jusqu'au 6 nov. » ; à partir du 7/11, l'écran d'achat y montre Silver et Gold (achats de test gratuits).

**Soumission prévue le 7 ou le 8/11** (votre décision du 2/11), gestes pas à pas dans `store/app-store/soumission.md`.
Avant cette date, je vérifie :
- que le serveur coupe bien la période de lancement sur iPhone : réglé ce soir par la routine Android, et vérifié sur
  l'iPhone simulé (« Gold offert pendant le test, jusqu'au 6 nov. 2026 ») ; Google Play garde le 27/11 ;
- l'écran d'achat avec les trois abonnements, et le chemin des notes d'examen (roue, Paramètres, Découvrir le premium) ;
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
| 3/11 21:00 | suivi d'Android v746 | sur Google Play, « Vos derniers jours » montre maintenant le score de la nuit et le cœur pendant la nuit, venus de la montre Huawei reliée en direct ; sur iPhone, rien ne les fournit (pas de liaison directe avec la montre, et Apple ne laisse pas les apps lire son score de sommeil) : les deux pastilles n'y apparaissent pas, sans chiffre inventé ; vérifications en cours (PR #257), puis TestFlight. Parité : 67 % | #257 (en vérification) |

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
