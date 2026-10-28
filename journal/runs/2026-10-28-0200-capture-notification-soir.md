# 2026-10-28 02:00 UTC — Notification du bilan du soir sur simulateur (PR #21), Android v534

**Étape** : I5 (3e partie), suivi d'Android  ·  **PR** : #21  ·  **Android suivi** : v534  ·  **iOS** : 534 (simulateur)  ·  **Parité** : 23 % (11/47)

## Déclenchement
- Tâche planifiée de 02:00 UTC, à l'heure. `main` vert (dd9298a : PR #20 mergée en fin de run précédent) ; aucune
  PR ouverte.

## Ce qu'Android a livré depuis le run précédent (v533 → v534)
- #449 R8 (optimisation, obscurcissement, mapping) de la version Play, test sur émulateur : natif Android et CI
  seulement, sans objet sur iOS. #450, #451 : journal et bilan Play Integrity (pas encore dans une build Play).
- Les 17 correctifs s'appliquent ; suite : 2657 ✅ (code de sortie 0).

## Ce qui a été fait
- PR #21 (I5) : montrer sur simulateur la notification du bilan du soir et la réponse donnée sans ouvrir l'app.
  - `testNotification` dans le plugin, compilée seulement en Debug (build de captures, jamais livrée) : la vraie
    notification du soir dans 3 s.
  - `probeGutEvening` (mode captures, tests écrits d'abord) : autorisation des notifications, notification d'essai,
    puis lecture de la boîte du plugin.
  - Tests d'interface `NotificationsUITests` (autoriser ; ouvrir le centre de notifications ; appui long puis
    « Gêne ») ; `scripts/ios-captures.sh` associe à chaque page ses tests d'interface (`ui_steps`) et capture
    l'écran laissé par chacun.
- Préparé : `EveningNote` (note du soir 0 à 5) suit le même modèle que `GutEvening` (mêmes méthodes, boîte,
  21 h par défaut, `{ v, score, at }`) ; six boutons au lieu de trois : à vérifier sur simulateur combien d'actions
  iOS montre dans la notification dépliée avant de le porter.

## Vérifications
- Suite d'Android avec les 17 correctifs, sur v534 : 2659 ✅ (44 ignorés, code de sortie 0) · build web `appstore` ✅.
