# HealthTrack-iOS

La version iPhone (App Store) de **Halcya**, l'app de santé dont le code vit dans
[spreadzenox/HealthTrack](https://github.com/spreadzenox/HealthTrack) (version Android, Google Play).

Ce dépôt ne copie pas l'app : il **suit** HealthTrack sans jamais le modifier.

- `upstream.json` : le commit Android suivi et son numéro de version (le même que sur Google Play).
- `scripts/upstream.sh` : récupère ce commit dans `upstream/` et y applique les adaptations iOS
  (`patches/`, `overlay/`, projet natif `ios/`).
- `journal/` : la mémoire de la routine iOS (charte, parité avec Android, backlog, comptes rendus).
  Commencer par [`journal/README.md`](journal/README.md).
