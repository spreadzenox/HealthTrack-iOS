# Journal de bord — Halcya sur iOS

## 📅 Semaine en cours — S46 (lundi 9 novembre → dimanche 15 novembre 2026)

> Résumé tenu à jour à chaque run de la routine iOS : **c'est ce que lit le propriétaire.**
> Le premier run d'une nouvelle semaine (lundi, heure de Paris) archive ce bloc dans `semaines/AAAA-Sww.md` et en
> ouvre un neuf. Semaine précédente : `semaines/2026-S45.md`.

**Où en est iOS**

| | Android (Google Play) | iOS (App Store) |
|---|---|---|
| Dernière version | v969 suivie (10/11) ; Alpha 100918 (nouvel accueil) chez les testeurs, en examen chez Google | **969.443 sur TestFlight et chez les testeurs externes** (10/11, 13:14 ; déploiement continu) ; **844.344 reste attachée à la version 844 pour votre soumission** |
| Où l'installer | Play Store, test fermé | **TestFlight** : groupe interne, et lien public du groupe « Testeurs Halcya » (969.443 depuis le 10/11, 13:14) |
| Parité des fonctions | référence | **67 %** (30 fonctions vérifiées sur 45 faisables) |

**👉 Prochaine action du propriétaire**
- **Dire si Halcya doit lire le cycle depuis l'app Santé sur iPhone** (règles et symptômes digestifs déjà notés dans
  Santé, sans saisie de plus) : « ok cycle Santé », « plus tard » ou « non ». Maquettes :
  `journal/maquettes/cycle-sante/`. Rien n'est codé sans votre accord (mode polish).
- Fait : déploiement continu en place (chaque nouvelle build part chez les testeurs) ; nettoyage après chaque envoi
  (restent 844.344 et la build des testeurs).

**Vos décisions en vigueur**
- **Mode polish dès le 9/11** (décision du 7/11 au soir, (A)) : plus de nouvelle fonction ; bugs, polissage, textes
  en trop, retraits ; une idée de fonction devient une proposition avec maquette (`journal/maquettes/`), jamais codée
  sans votre accord. (B) **intégrations** (seule exception) : Garmin et Samsung, Withings, Huawei (dont Huawei Health
  Kit sur iPhone), Xiaomi. (C) **personas** avant chaque envoi aux testeurs.
- **Nouvel accueil** (8/11, 18:45) : repris sur iPhone (Santé, 6 mois importés, temps d'écran de l'iPhone, visage à
  l'ouverture seulement).
- **Merges et examen bêta** (votre message du 7/11 vers 18:30) : je merge mes PR dès que les garde-fous sont verts ;
  chaque nuit, la dernière build part au groupe « Testeurs Halcya » et à l'examen bêta, jamais la version de l'App
  Store. **Numéro de version fixe** des builds de test (893) pendant le cycle (7/11, 19:35).
- **Déploiement continu** (10/11 vers 09:15, vos mots : « Ceci dit normalement la clé api apple permet à la routine de le faire j'aimerais qu'elle le fasse tout seul pour que le déploiement des nouvelles versions soit le plus continuous possible :) ») : à chaque run, dès que la build
  TestFlight la plus récente est traitée par Apple et n'est pas chez les testeurs externes, je l'ajoute au groupe
  « Testeurs Halcya » et la soumets (accord d'Apple immédiat grâce au même numéro de version), puis je lance le
  nettoyage. Remplace le rythme « chaque nuit ». Les passages des personas continuent, sans bloquer chaque envoi.
- **Nettoyage par la routine** (10/11 vers 09:30, vos mots dans cette session) : « J'autorise la routine à lancer elle-même le nettoyage réel des anciennes builds TestFlight (store-beta-expire.yml, nettoyage coché, essai décoché) après chaque mise d'une nouvelle build chez les testeurs externes, sans me redemander. »
- **Livraison continue** (9/11 vers 11:00, vos mots : « la routine doit expirer les versions précédentes à chaque fois
  qu'une nouvelle version arrive ») : après chaque nouvelle build, j'expire celles qui ne servent plus ; restent la
  build de votre soumission (844.344), la dernière distribuée aux testeurs externes jusqu'à ce que la suivante le soit,
  et celle en examen chez Apple. Une build en examen depuis plus de 24 h cède sa place à une plus récente.
- **« Digestif »** dans les textes visibles ; nom App Store « Halcya — digestion & bien-être » seulement après votre
  soumission (7/11). **Fusion des deux routines** après la soumission (4/11).

**Ce que vous pouvez voir** : les captures de l'app sur iPhone simulé, refaites à chaque changement :
https://github.com/spreadzenox/HealthTrack-iOS/tree/captures/main

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
- **Semaine précédente (S45), en bref** : l'iPhone a suivi Android de la v699 à la v924, chaque version sur TestFlight ;
  build 844.344 attachée à la version 844 pour votre soumission ; numéro de version fixe (893) ; « digestif » ;
  nouvel accueil ; premiers passages des personas sur iPhone ; panne de GitHub du 8/11 surmontée (paquets gardés en
  cache) ; examen bêta de la 918 bloqué par la 896 (détail dans `semaines/2026-S45.md`).
- **Cette semaine, polish sur iPhone** : temps d'écran pas proposé à l'accueil avant iOS 26.4 ; la VFC de l'app Santé
  (Apple Watch) a sa couleur dans le Journal, sa courbe dans Tendances et son « d'habitude » sur Aujourd'hui ; l'iPhone
  a suivi Android jusqu'à la v937.

**Runs de la semaine**

| Date (Paris) | Run | Ce qui a été fait | PR |
|---|---|---|---|
| 9/11 01:00 | semaine S46 ouverte ; examen bêta | résumé de la S45 archivé ; la 896.376 est toujours « en attente d'examen » hors du groupe, la 918.396 attend derrière (pas de nouvel essai : Apple refuserait) ; Android : visite guidée avec des pistes dès le jour 14, Gold expliqué en une phrase (sans objet sur iPhone) : v927 reprise, en vérification. Mode polish à partir d'aujourd'hui. Parité : 67 % | PR semaine S46 |
| 9/11 02:00 | suivi d'Android v928 | la 927 part sur TestFlight. Serveur : une analyse IA de repas qui ne reconnaît aucun aliment ne compte plus dans vos analyses restantes, sur Android comme sur iPhone (note de Nouveautés iPhone). Examen bêta : la 896.376 toujours en examen, la 918.396 attend. Parité : 67 % | #390 (mergée), PR v928 |
| 9/11 02:30 | polish : « kca l » du Journal | trouvé pourquoi la correction d'hier ne marchait pas (l'app colle chaque nombre à son unité à l'affichage) : la tuile des repas gagne un peu de place sur les iPhone de 6,1 pouces, « ≈ 1 039 kcal » tient sur une ligne ; la note de Nouveautés qui l'annonçait trop tôt est corrigée. Parité : 67 % | PR polish « kcal » |
| 9/11 03:00 | suivi d'Android v929 ; examen bêta | la 928 est sur TestFlight (calories du Journal sur une ligne). Android v929 : si vous fermez l'appareil photo sans photo, Halcya propose de décrire le repas. Examen bêta : la 896.376 est toujours « en attente d'examen » chez Apple (relevé corrigé : il ne regardait que les 20 dernières builds et l'a crue partie) ; la 918.396 attend votre geste (faire expirer la 896). Parité : 67 % | #391, #392 (mergées), PR v929 |
| 9/11 04:00 | polish : temps d'écran à l'accueil | l'écran « Branchez vos sources » ne propose plus le temps d'écran aux iPhone sous iOS 26.4, qui ne le permettent pas (comme Sources depuis le 7/11) ; Android n'a rien publié ; examen bêta : la 896.376 toujours en examen, la 918.396 attend. Parité : 67 % | #393 (mergée), PR polish |
| 9/11 05:00 | suivi d'Android v931 | Android a réglé de son côté les valeurs coupées du Journal (« kca l ») et rend les onglets lisibles en grande police sur petit écran : notre correction de l'iPhone, devenue inutile, est retirée. La 929 est sur TestFlight. Examen bêta : la 896.376 toujours en examen, la 918.396 attend. Parité : 67 % | PR polish + v931 |
| 9/11 06:00 | rien de neuf | la 931 est sur TestFlight (931.408 : valeurs du Journal entières, pas de temps d'écran à l'accueil avant iOS 26.4). Android n'a rien publié ; captures relues (Sources, Paramètres, Agir, Nouveautés) : rien à corriger. Examen bêta : la 896.376 toujours en examen, la 918.396 attend votre geste. Parité : 67 % | #394 (mergée) |
| 9/11 07:00 | suivi d'Android v933 | boutons d'ajout de l'Accueil lisibles en grande police ; Tendances sans historique, sans boutons de période inutiles. Examen bêta : la 896.376 toujours en examen, la 918.396 attend votre geste. Parité : 67 % | PR v933 |
| 9/11 08:00 | suivi d'Android v934 | la 933 est sur TestFlight. Android v934 : la phrase d'introduction des pages n'a plus l'air d'un titre ; « Version gratuite » dit plus court que vos notes restent. Examen bêta : la 896.376 toujours en examen, la 918.396 attend votre geste. Parité : 67 % | #396 (mergée), PR v934 |
| 9/11 09:00 | suivi d'Android v935 | rien de visible (outil des personas d'Android) ; la 934 part sur TestFlight. Examen bêta : la 896.376 toujours en examen, la 918.396 attend votre geste (faire expirer la 896). Parité : 67 % | #397 (mergée), PR v935 |
| 9/11 10:00 | polish : VFC de l'app Santé | la 935 est sur TestFlight (935.412). Android n'a rien publié. Repéré sur les captures : dans le Journal, la VFC de l'Apple Watch (« VFC (SDNN) ») était grise, sans son icône ; Tendances n'en avait aucune courbe, et la ligne de l'Accueil ouvrait la « VFC nuit », vide sur iPhone → couleur et icône de la VFC, courbe « VFC (SDNN) » ouverte depuis l'Accueil (note de Nouveautés iPhone). Examen bêta : la 896.376 toujours en examen, la 918.396 attend votre geste. Parité : 67 % | PR polish VFC |
| 9/11 11:00 | suivi d'Android v936, v937 | la correction de la VFC (10:00) est mergée et part sur TestFlight. Android v936 : la visite guidée ne blanchit plus le bas de l'écran ; v937 : sur Aujourd'hui, la VFC d'hier dit son « d'habitude ». Sur iPhone, la VFC vient de l'app Santé (Apple Watch) sous une autre forme, que ce calcul ne lisait pas : elle a maintenant sa propre habitude, sur Aujourd'hui et dans le Journal (note de Nouveautés iPhone). Examen bêta : la 896.376 toujours en examen, la 918.396 attend votre geste. Parité : 67 % | #399 (mergée), PR v937 |
| 9/11 12:00 | livraison continue ; suivi d'Android v939 | votre décision « expire la 896 » et la règle de livraison continue : outil d'expiration écrit, testé et mergé (il garde toujours la 844.344, la build des testeurs et celle en examen) ; essai à blanc juste ; **l'expiration elle-même a été bloquée par les permissions de ma session** : rien n'est expiré, votre geste en tête. La 937 est sur TestFlight (937.414). Android v939 : Analyses, « pt » expliqué et « Comment c'est calculé » en deux phrases (aussi sur iPhone). Parité : 67 % | #401 (mergée), PR v939 |
| 9/11 13:00 | suivi d'Android v940 ; livraison continue en attente | la 896.376 est toujours en examen chez Apple (votre geste de 12:15 attendu : lancer l'expiration, ou me donner la permission). Android v940 : dans le Journal, la tuile Repas dit « repas incomplets ? » quand les repas notés sont bien en dessous de la dépense du jour (aussi sur iPhone). Notre correctif de la VFC de l'app Santé refait sur ce code. Parité : 67 % | PR v939 + v940 |
| 9/11 14:00 | livraison continue : outil plus prudent | la 940 est sur TestFlight (940.416 : « repas incomplets ? », « pt » expliqué). Android n'a rien publié. La 896.376 est toujours en examen chez Apple : votre geste de 12:15 reste attendu. L'outil d'expiration garde maintenant aussi une build déjà dans le groupe des testeurs et pas encore soumise (la 918.396), pour qu'un nettoyage ne la retire jamais avant son examen. Captures des écrans vides relues : rien à corriger. Parité : 67 % | PR outil + journal |
| 9/11 15:00 | suivi d'Android v941, v942 | « Décrire un repas » ouvre directement le champ à écrire ; sous « En une phrase », la note de bien-être dit ce qu'elle fait de votre phrase (rien n'est gardé). Aussi sur iPhone. Essai à blanc du nettoyage : la 918.396 est bien gardée (141 anciennes builds à expirer). La 896.376 toujours en examen : votre geste de 12:15 attendu. Parité : 67 % | #403 (mergée), PR v942 |
| 9/11 16:00 | suivi d'Android v943 | profil nutrition : le niveau d'activité automatique dit « d'après vos pas » (sur iPhone, les pas de l'app Santé). La 942 part sur TestFlight. La 896.376 toujours en examen : votre geste de 12:15 attendu. Parité : 67 % | #404 (mergée), PR v943 |
| 9/11 17:00 | suivi d'Android v944 | Tendances : une ligne de repère à chaque graduation (aussi sur la courbe de la VFC de l'Apple Watch). La 943 part sur TestFlight, la 942 y est (942.418). La 896.376 toujours en examen : votre geste de 12:15 attendu. Parité : 67 % | #405 (mergée), PR v944 |
| 9/11 18:00 | v944 livrée | la v944 (grille de Tendances) est mergée et part sur TestFlight ; la 943 y est (943.419). Android n'a rien publié depuis. La 896.376 toujours en examen chez Apple : votre geste de 12:15 reste attendu (lancer l'expiration ou me donner la permission) ; sans lui, la soumission de cette nuit aux testeurs externes ne pourra pas partir. Parité : 67 % | #406 (mergée) |
| 9/11 19:00 | suivi d'Android v945, v946 | la 944 est sur TestFlight (944.420). Android : le chiffre de la note de bien-être choisie ressort mieux ; dans Agir, un essai proposé dit quoi faire (« Dormir au moins 7 h 53 »). Aussi sur iPhone. La 896.376 toujours en examen : votre geste de 12:15 attendu avant l'envoi de cette nuit. Parité : 67 % | PR v946 |
| 9/11 20:00 | examen bêta débloqué ; suivi d'Android v950 | la 896.376 n'est plus en examen : **la 918.396 est soumise à l'examen bêta d'Apple** (20:02) ; les testeurs gardent la 839.337 en attendant. La 946 est sur TestFlight (946.422). Android v950 : dans Agir, chaque essai a pour titre ce qu'il faut faire. Android prolonge son gel des envois aux testeurs jusqu'au 10/11 au soir. Reste votre geste pour le nettoyage des anciennes builds. Parité : 67 % | #408 (mergée), PR v950 |
| 9/11 21:00 | v950 livrée ; nettoyage refusé | votre « 896 expirée » confirmé par le relevé ; la 918.396 attend l'examen d'Apple (soumise à 20:02). La v950 (Agir : chaque essai a pour titre sa consigne) est mergée et part sur TestFlight. Le nettoyage des anciennes builds, lancé une fois comme vous l'avez demandé, a été refusé par ma session : votre geste en tête. Parité : 67 % | #410 (mergée) |
| 9/11 22:00 | suivi d'Android v952 | la 950 est sur TestFlight (950.424). Android v952 : sur la page d'un essai (Agir), les 14 jours numérotés en deux semaines. La 918.396 attend toujours l'examen d'Apple ; le nettoyage des anciennes builds attend votre geste. Parité : 67 % | PR v952 |
| 9/11 23:00 | suivi d'Android v953 ; examen en cours | **Apple examine la 918.396** (« en cours d'examen »). La v952 est mergée et part sur TestFlight. Android v953 : sur la page d'un essai, le résultat passe avant le calendrier. Pas d'Alpha d'Android cette nuit (gel jusqu'au 10/11 au soir) : rien d'autre à soumettre. Le nettoyage des anciennes builds attend toujours votre geste. Parité : 67 % | #412 (mergée), PR v953 |
| 10/11 00:00 | 918.396 chez les testeurs ; suivi d'Android v954 | **Apple a accepté la 918.396** : le lien public des testeurs la donne (même version que les testeurs Android). La 953 est sur TestFlight (953.427). Android v954 : le résultat d'un essai est dessiné dès le premier jour. Pas de soumission cette nuit (Android en pause d'Alpha, versions alignées). Le nettoyage des anciennes builds attend votre geste. Parité : 67 % | #413 (mergée), PR v954 |
| 10/11 01:00 | suivi d'Android v955 | la v954 est mergée et part sur TestFlight. Android v955 : sur la page d'un essai, le graphique « Avec / Sans » sur une même échelle et une phrase qui dit l'écart et sa fourchette. Les testeurs externes ont la 918.396. Le nettoyage des anciennes builds attend votre geste. Parité : 67 % | #415 (mergée), PR v955 |
| 10/11 02:00 | suivi d'Android v956 | la 955 est sur TestFlight (955.430). Android v956 : la réintroduction guidée se range sous Agir (retour « ← Agir »). Les testeurs externes ont la 918.396. Le nettoyage des anciennes builds attend votre geste. Parité : 67 % | #416 (mergée), PR v956 |
| 10/11 03:00 | v956 livrée | la v956 (réintroduction rangée sous Agir, retour « ← Agir » vu sur la capture) est mergée et part sur TestFlight. Android n'a rien publié depuis. Les testeurs externes ont la 918.396. Le nettoyage des anciennes builds attend votre geste. Parité : 67 % | #417 (mergée) |
| 10/11 04:00 | suivi d'Android v957 | la 956 est sur TestFlight (956.431). Android v957 : au premier jour, la barre « 0/28 jours » se voit vide (elle paraissait pleine, aussi sur iPhone). Les testeurs externes ont la 918.396. Le nettoyage des anciennes builds attend votre geste. Parité : 67 % | PR v957 |
| 10/11 05:00 | suivi d'Android v958, v959 | la v957 est mergée (barre « 0/28 jours » vide sur la capture iPhone) et part sur TestFlight. Android : Tendances dit la durée de la nuit même ; Nutrition, « Votre profil » plus compact. Les testeurs externes ont la 918.396. Le nettoyage des anciennes builds attend votre geste. Parité : 67 % | #419 (mergée), PR v959 |
| 10/11 06:00 | v959 livrée | la v959 (Nutrition : « Votre profil » resserré, vu sur la capture) est mergée et part sur TestFlight ; la 957 y est (957.433). Android n'a rien publié depuis. Les testeurs externes ont la 918.396. Ce soir, après l'Alpha d'Android (fin de son gel à 22:00) : passage des personas sur iPhone, puis soumission de la dernière build aux testeurs. Le nettoyage des anciennes builds attend votre geste. Parité : 67 % | #420 (mergée) |
| 10/11 07:00 | suivi d'Android v960, v961 | la 959 est sur TestFlight (959.434). Android : seuls les chiffres gardent leur police à chasse fixe (« 6 h 30 » sans grands blancs) ; les étiquettes reprennent la police du texte. Aussi sur iPhone ; deux de nos tests adaptés. Les testeurs externes ont la 918.396. Parité : 67 % | #421 (mergée), PR v961 |
| 10/11 08:00 | suivi d'Android v962 | la v961 est mergée (« 6 h 30 » sans grands blancs sur la capture) et part sur TestFlight. Android v962 : page d'abonnement, les mots dans la police du texte. Les testeurs externes ont la 918.396. Parité : 67 % | #422 (mergée), PR v962 |
| 10/11 09:00 | v962 livrée | la v962 (abonnement : « premium » dans la police du texte, vu sur la capture) est mergée et part sur TestFlight ; la 961 y est (961.436). Android n'a rien publié depuis. Les testeurs externes ont la 918.396. Parité : 67 % | #423 (mergée) |
| 10/11 09:00 (suite) | 959.434 chez les testeurs | relevé de 08:00 UTC : le groupe « Testeurs Halcya » ne contient plus que la **959.434, acceptée par Apple et en test** ; 918.396 et 839.337 en sont retirées (sans être expirées). Ce n'est pas un lancement de ma part (geste fait dans App Store Connect, par vous a priori). 159 builds actives : le nettoyage en expirerait 156 (restent 844.344, 959.434 et la plus récente). | journal |
| 10/11 10:00 | nettoyage fait | avec votre autorisation (« sans me redemander ») : **157 anciennes builds expirées** ; restent 844.344, 959.434 (testeurs) et 962.437 (la plus récente, sur TestFlight). Je relancerai le nettoyage après chaque nouvelle build mise chez les testeurs externes. Parité : 67 % | journal |
| 10/11 11:00 | déploiement continu | vos décisions de 09:05 (« déployé instantanément ») et 09:15 (« le plus continuous possible ») appliquées : la **962.437 soumise et acceptée en une minute**, chez les testeurs externes ; nettoyage : la 959.434 expirée ; restent 844.344 et 962.437. Android : gel Alpha levé, rien de changé dans l'app (v965 suivie). Parité : 67 % | PR v965 |
| 10/11 12:00 | suivi d'Android v968 | Android : sur l'écran de la montre et pendant l'accueil, les mots reprennent la police du texte. Sur iPhone, notre adaptation de l'accueil (« Import de vos 6 derniers mois ») refaite sur ce code ; note de Nouveautés iPhone. La v965 et la v968 partent ensemble. Les testeurs externes ont la 962.437. Parité : 67 % | PR v965 + v968 |
| 10/11 13:00 | suivi d'Android v969 | la v968 est mergée (accueil iPhone « 6 derniers mois » conservé) et part sur TestFlight puis chez les testeurs. Android v969 : la note du jour s'écrit « 3,2 » sans blancs autour de la virgule. Parité : 67 % | #428 (mergée), PR v969 |
| 10/11 13:00 (suite) | déploiement continu, 2e tour | la **968.442** est chez les testeurs depuis 12:12 (accord d'Apple en une minute) ; la 962.437 expirée. La v969 (« 3,2 ») est mergée et suit le même chemin. Android v970 : rien dans l'app (scripts d'envoi) ; reprise avec sa prochaine version qui change l'app, pour ne pas envoyer aux testeurs une build identique. Parité : 67 % | #429 (mergée) |
| 10/11 14:00 | personas du jour | la 969.443 est chez les testeurs (13:14) ; Android n'a rien changé dans l'app. Passage des personas sur la version 969 : une femme atteinte d'endométriose, iPhone seul, 14e jour ; elle note sa digestion, voit sa courbe et prépare le rapport PDF, mais ne trouve aucun endroit pour son cycle. Constats relayés à Android ; idée propre à l'iPhone (lire le cycle de l'app Santé) gardée pour une proposition. Parité : 67 % | journal |

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
  **Depuis le 7/11 (décision du propriétaire vers 19:35)** : les builds de TestFlight gardent un numéro de version
  fixe pendant un cycle, celui de la prochaine version de l'App Store (`testflight-version.json`, lu par
  `testflight.yml`, `ios-build.yml` et `store-push.mjs`), pour que l'examen bêta ne soit pas complet à chaque build ;
  la version affichée dans l'app reste le `versionCode` d'Android (`VITE_APP_VERSION`). Nouveau cycle après chaque
  soumission du propriétaire : le fichier prend le numéro d'Android du moment.
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
- **Expiration des builds** (décision du propriétaire du 09/11 vers 11:00) : après chaque build arrivée sur TestFlight,
  `store-beta-expire.yml` avec « nettoyage » (d'abord « essai » en cas de doute), puis `store-push.yml`. Restent : la
  build de la version de l'App Store (844.344), la dernière distribuée au groupe externe jusqu'à ce que sa remplaçante
  le soit, celles en examen bêta, celles du groupe pas encore soumises (plus récentes que la distribuée), celles en
  traitement et la plus récente. Soumission de la nuit : examen de plus de 24 h et build plus récente prête →
  `builds` = celle en examen, puis `store-beta-submit.yml`. Chaque expiration dans le compte rendu. **9/11 : le
  lancement réel est refusé par le système de permissions de la session** (action irréversible) tant que le
  propriétaire ne l'y autorise pas ; essais à blanc permis. **10/11 vers 09:30 : autorisé par le propriétaire dans la
  session** (« sans me redemander ») : nettoyage réel après chaque nouvelle build mise chez les testeurs externes.
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
