# 2026-10-27 19:59 UTC — Essai d'import Santé (PR #11) : plantage expliqué, corrections

**Étape** : I4 (vérification de l'import)  ·  **PR** : #11  ·  **Android suivi** : v527  ·  **iOS** : 527 (simulateur)  ·  **Parité** : 23 % (11/47)

## Déclenchement
- Tâche planifiée de 19:59 UTC, à l'heure. `main` vert ; PR #11 ouverte (travail en cours).

## Ce qu'Android a livré depuis le run précédent
- Rien de nouveau depuis v527.

## Constats sur la 1re CI de la PR #11 (verte, mais l'essai a échoué)
- La sonde s'arrête après `checkAuthorization` : **l'app est fermée par iOS** à la demande d'écriture des pas, faute
  de phrase d'usage (`NSHealthUpdateUsageDescription must be set in the app's Info.plist in order to request write
  authorization … HKQuantityTypeIdentifierStepCount`, dans la console). Le script a ensuite attendu sa limite de
  15 min sur chaque iPhone (d'où 40 min de captures).
- `idb-companion` ne s'est pas installé (`brew install` en échec, sortie masquée) : la feuille n'aurait pas pu être
  touchée de toute façon. D'après la documentation d'idb, le paquet Homebrew est une version précompilée qui
  demande un Mac arm64 sous macOS 15 et Xcode 26 (https://fbidb.io/docs/idb/installation).
- Les 2 lignes de `js-errors.txt` venaient de l'ancienne lecture de la copie de secours (corrigée par la PR #10).

## Ce qui a été fait
- Branche remise à jour sur `main` (PR #10).
- `ios-build.yml` : la phrase d'écriture Santé est ajoutée par la CI à la **seule build de captures**
  (`PlistBuddy`), jamais à `ios/App/App/Info.plist` du dépôt : l'app livrée n'écrit rien dans Santé.
- `scripts/ios-captures.sh` : arrêt immédiat si l'app se ferme en cours de parcours, avec la ligne
  « Terminating app » de la console, au lieu d'attendre la limite.
- Journal de l'installation d'`idb` affiché en cas d'échec.

## Suite
- Selon la 2e CI : si `idb` s'installe, vérifier « Tout activer » / « Autoriser » puis `saveSample` /
  `readSamples` (1234 pas). Sinon, piste XCUITest : `XCTHealthKit` (Stanford, licence MIT) sait accepter la feuille
  d'autorisation depuis un test d'interface ; la cible de test serait ajoutée au projet par la CI (gem `xcodeproj`).
