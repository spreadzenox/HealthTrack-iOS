# 2026-10-27 13:07 UTC — I1 : captures de chaque page sur iPhone simulé

**Étape** : I1 (suite)  ·  **PR** : #2  ·  **Android suivi** : v518  ·  **iOS** : 518.<n> (simulateur)  ·  **Parité** : à calculer (I2)

## Ce qu'Android a livré depuis le run précédent
- #432 (journal) et #433 « lecture au déverrouillage dans les versions de test interne » (workflow et scripts Play
  seulement) : sans objet sur iOS. `main` de ce dépôt était vert après le merge de #1 (run 40506243742).

## Ce qui a été fait
- `overlay/app/src/ios/captureMode.js` (+ tests, écrits d'abord) : en build simulateur seulement (`VITE_IOS_CAPTURE=1`),
  l'app parcourt elle-même un plan de pages : installation vierge (onboarding), puis les 14 pages de `npm run visual`
  avec les données de démo d'Android (`scripts/visual/demoData.mjs`, ajoutées une fois ; onboarding et nouveautés
  notés vus) en clair, puis 3 pages en sombre ; à chaque page elle écrit « [capture] page <nom> » dans sa console.
- Premier essai abandonné : piloter l'app par des liens `halcya-capture://` (`simctl openurl`) ; le simulateur
  iOS 26 affiche « Open in "Halcya"? » à chaque lien et la page ne change jamais (toutes les captures montraient ce
  dialogue).
- `patches/02-mode-captures.patch` : une ligne dans `main.jsx`, conditionnée à `VITE_IOS_CAPTURE` (vérifié : aucun
  morceau « captureMode » dans une build sans cette variable).
- `scripts/ios-captures.sh` : lance l'app avec sa console (`simctl launch --console-pty`) sur les deux iPhone simulés,
  capture l'écran à chaque « [capture] page … » jusqu'à « [capture] fin », résume les erreurs JavaScript
  (`js-errors.txt`, affiché dans le résumé du job, pas encore bloquant).

## Vérifications
- `scripts/upstream.sh` ✅ (2 correctifs) · Tests d'Android avec correctifs : 2571 ✅ (44 ignorés) · Build web appstore
  avec et sans mode captures ✅ · Build iOS et captures : CI de la PR (voir la suite).

## Apprentissages / décisions
- La capture « sombre » du run précédent était en clair parce que Halcya est en clair par défaut et que le sombre est
  un réglage de l'app (`healthtrack_theme`), comme sur Android : pas un défaut iOS.

## Suite proposée
- Regarder les captures de chaque page, noter les défauts propres à iOS dans `PARITE.md`, puis I2 (replis des
  plugins Android absents) en commençant par les pages qui montrent une erreur.
