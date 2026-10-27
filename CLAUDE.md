# HealthTrack-iOS — consignes pour toute session

Ce dépôt est la version iOS de Halcya. L'app elle-même (React + Vite + Capacitor) vit dans
`spreadzenox/HealthTrack`, la version Android, que ce dépôt suit.

- Commence par `journal/README.md` (résumé de la semaine + charte), puis `journal/PARITE.md` et `journal/BACKLOG.md`.
- **`spreadzenox/HealthTrack` est en lecture seule** : jamais de push, de branche, de PR, de commentaire, de
  workflow lancé ni de modification de réglage là-bas. Ce qu'il faudrait y changer va dans `journal/DEMANDES.md`.
- Le code Android suivi est fixé par `upstream.json` ; `scripts/upstream.sh` le prépare dans `upstream/` (ignoré par
  git) avec les adaptations iOS. Toute adaptation du code partagé est un correctif dans `patches/` ou un fichier
  ajouté dans `overlay/`, jamais une copie de fichier entier.
- Pas de Mac : ce qui compile, teste ou capture iOS passe par GitHub Actions (runners macOS).
- UI en français, au vouvoiement ; jamais de secret, de certificat ni de profil dans le dépôt ou les logs.
