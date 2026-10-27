# 2026-10-27 20:59 UTC — Test d'interface pour la feuille Santé (PR #12), source « App Santé » (PR #13)

**Étape** : I4 (vérification de l'import, textes Santé)  ·  **PR** : #11 (mergée), #12, #13  ·  **Android suivi** : v527  ·  **iOS** : 527 (simulateur)  ·  **Parité** : 23 % (11/47)

## Déclenchement
- Tâche planifiée de 20:59 UTC, à l'heure. `main` vert ; PR #11 ouverte (travail en cours, à finir d'abord).

## Ce qu'Android a livré depuis le run précédent
- #443 : journal seul (idées « bord à bord » et R8 prêtes à coder). Pas de nouvelle version : v527 reste la
  dernière build Play réussie (`scripts/upstream.sh --latest`). Ligne ajoutée dans `PARITE.md` §5.

## PR #11 terminée
- 3e CI verte (run 39, sans `idb`) : 50 captures ; feuille « Accès à Santé » en français, avec l'écriture
  (« Nombre de pas ») et la lecture ; « feuille toujours ouverte : pas d'écriture ni de relecture », comme prévu
  sans personne pour toucher ; aucun plantage ; 0 erreur JavaScript ; copie de secours présente sur les deux iPhone.
- Branche à jour sur `main` (10b98a2) → mergée (squash, 252ec02).

## Ce qui a été fait
- PR #12 (I4) : test d'interface XCUITest écrit ici, sans bibliothèque tierce (`uitests/`) : projet Xcode à part,
  cible de tests d'interface sans app hôte, qui remet Halcya au premier plan sans la relancer et touche « Tout
  activer » puis « Autoriser » ; construit par `build-for-testing`, lancé par `scripts/ios-captures.sh` sur la feuille
  « healthkit-autorisation » avant l'accusé (la sonde attend jusqu'à 3 min), puis capture de l'écran qui suit. La
  sonde ne demande plus la VFC (comme le connecteur) et, si la feuille est acceptée, relit les pas par le connecteur
  de l'app. Tests écrits d'abord (accusé, sonde acceptée ou non, passage par le connecteur).
- PR #13 (I4) : correctif 15. Sur iPhone, les mesures importées ont pour source « App Santé » (Journal, tuiles de
  l'Accueil, rapport PDF) au lieu de « Health Connect » ; résumé du premier import « via l'app Santé » ;
  confirmation de suppression « (montre, app Santé) ». Tests écrits d'abord.
- Recherche : quelles montres écrivent dans l'app Santé sur iPhone (Samsung Galaxy Watch Wear OS incompatible avec
  l'iPhone, Huawei Santé, Mi Fitness, Garmin Connect, Fitbit / Google Health) → `RECHERCHE.md`.
- PR #14 (I4, dernier point de l'audit I2) : correctif 16, guide « Votre montre n'apparaît pas ? » réécrit pour
  l'iPhone (il ne parlait que de Health Connect, de Gadgetbridge et du Bluetooth direct) : Apple Watch, Huawei
  Health, Mi Fitness et Zepp, Garmin Connect, autres marques ; Galaxy Watch récentes signalées incompatibles. Tests
  écrits d'abord.

## Vérifications
- `scripts/upstream.sh --latest` ✅ (v527) · suite d'Android avec les correctifs, sur chaque branche : PR #12 2638 ✅,
  PR #13 2638 ✅, PR #14 2637 ✅ (44 ignorés) · build web `appstore` ✅.
- Un passage de la suite (PR #14) a vu échouer `UpdateBanner.test.jsx` (test d'Android de la mise à jour hors
  store, sensible au temps sous charge, non touché par iOS) : il passe seul trois fois, puis dans la suite relancée.
