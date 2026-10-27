# 2026-10-27 14:36 UTC — I1 : captures synchronisées par fichier et accusé

**Étape** : I1 (suite, PR #2)  ·  **PR** : #2  ·  **Android suivi** : v521  ·  **iOS** : 521.10 (simulateur)  ·  **Parité** : à calculer (I2)

## Message du propriétaire (27/10 vers 15:30)
- « Tu peux setup la routine pour une fois toutes les heures, le projet d'adaptation iOS est prio » : le déclenchement
  de 14:59 (heure de Paris) n'était pas parti (tâche bloquée sur son échéance précédente) ; tâche réenregistrée, run
  lancé à la main, contrôle programmé à 16:40. Le prompt rend le projet iOS prioritaire (runs pleins, jusqu'à 50 min,
  étapes enchaînées, PR ouverte reprise en premier) ; HealthTrack reste en lecture seule.

## Ce qu'Android a livré depuis le run précédent
- #434, #435 (scripts Play de la lecture au déverrouillage, journal) : sans objet ; #436 « pas de rapport PDF vide
  dans Analyses » : code partagé, arrive tel quel. Repéré : `saveAndShareReport` ne prévoit le natif que pour Android.

## Ce qui a été fait
- `captureMode.js` : chaque page prête est écrite dans `Documents/capture/ready.txt` (`@capacitor/filesystem`) et l'app
  attend `Documents/capture/ack.txt` (30 s au plus) avant de passer à la suivante ; attente de 5 s avant d'annoncer.
  Test ajouté d'abord (ordre signal → accusé → page suivante).
- `scripts/ios-captures.sh` : lit `ready.txt` dans le conteneur de l'app (`simctl get_app_container … data`),
  capture, répond dans `ack.txt`, s'arrête sur « fin ».

## Vérifications
- `scripts/upstream.sh` ✅ (2 correctifs) · Tests d'Android avec correctifs : 2573 ✅ (44 ignorés) · Build web appstore
  avec mode captures ✅ · Build iOS et captures : CI de la PR #2 ✅ sur `b58d624`.
- Captures (branche `captures/pr-2`, 36 images) regardées une à une : chaque image correspond enfin à sa page, sur
  les deux simulateurs ; thème sombre correct sur les 3 pages prévues.
- `js-errors.txt` : uniquement des « readFile … ack.txt does not exist » (l'app qui attend l'accusé avant qu'il
  existe). Corrigé : le script crée un accusé vide avant le lancement (`dae4bc6`), CI relancée.

## Défauts iOS vus sur les captures (pour I2)
- Déjà traités sur la branche `claude/ios-i2-replis` : Premium « Google Play », carte « Lecture du visage » en
  erreur, détection des apps par noms de paquets Android.
- Nouveaux : « Vos données » parle de la sauvegarde Google du téléphone et d'Android ; « Vos sources » conseille
  Health Connect dans Gadgetbridge ; textes à adapter à iOS (I2) ou à remplacer par HealthKit (I4).

## Suite
- Merger la PR #2, puis ouvrir la PR d'I2 (1re tranche) rebasée sur `main`.
