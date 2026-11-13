# HealthTrack-iOS

> **Ce dépôt n'est plus le lieu de travail depuis le 13/11/2026.** La version iPhone de Halcya vit désormais dans
> [spreadzenox/HealthTrack](https://github.com/spreadzenox/HealthTrack), dossier
> [`iphone/`](https://github.com/spreadzenox/HealthTrack/tree/main/iphone) : même code, mêmes correctifs, même
> journal, et une seule routine pour Android et l'iPhone. Les builds TestFlight partent de là-bas.
>
> Ce dépôt reste ouvert pour deux raisons : les avis envoyés depuis l'iPhone (« Votre avis ») arrivent encore dans
> ses tickets, et les pages de confidentialité et d'assistance de la fiche App Store sont servies par son site. Ne
> rien y développer ; ce qui suit décrit l'ancien montage.

La version iPhone (App Store) de **Halcya**, l'app de santé dont le code vit dans
[spreadzenox/HealthTrack](https://github.com/spreadzenox/HealthTrack) (version Android, Google Play).

Ce dépôt ne copie pas l'app : il **suit** HealthTrack sans jamais le modifier.

- `upstream.json` : le commit Android suivi et son numéro de version (le même que sur Google Play).
- `scripts/upstream.sh` : récupère ce commit dans `upstream/` et y applique les adaptations iOS
  (`patches/`, `overlay/`, projet natif `ios/`).
- `journal/` : la mémoire de la routine iOS (charte, parité avec Android, backlog, comptes rendus).
  Commencer par [`journal/README.md`](journal/README.md).
