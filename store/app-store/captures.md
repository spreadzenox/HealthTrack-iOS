# Captures de la fiche App Store (fr-FR, iPhone 6,9")

Faites par la CI (`ios-build.yml`, lancement manuel avec `devices: iPhone 17 Pro Max`) : **1320 × 2868**, la taille
6,9" qu'App Store Connect demande (elle sert aussi aux tailles plus petites). Barre d'état propre (9:41, batterie
pleine) ; données de démo ramenées à ce que l'iPhone reçoit (Apple Watch par l'app Santé ; ni app Android, ni montre
Huawei en direct, ni temps d'écran). Les fichiers sont sur la branche `captures/store` (jamais dans `main`) ; ils
seront envoyés par l'API d'App Store Connect une fois A2 et A3 faits, ou glissés à la main par le propriétaire.

Sélection du 29/10, captures refaites le 30/10 (`f91404a`, Android v597 : bouton de l'onboarding à sa taille, pages vides
en couleur, « Ce que lit Halcya », sorbitol → pruneaux) et regardées une à une : barre d'état à 9:41, aucune
bannière du système. Dans l'ordre d'affichage. Les trois premières sont celles
qu'on voit sans faire défiler :

| # | Fichier (`captures/store`) | Ce qu'elle montre |
|---|---|---|
| 1 | `iphone-17-pro-max-demo-clair-accueil.png` | « Votre journée » : bien-être, sommeil, VFC, pas, la carte « Votre ventre » et « Photo du repas » |
| 2 | `iphone-17-pro-max-demo-clair-recommendations.png` | « Vos analyses » : pistes « Nuits plus longues → meilleur bien-être », « des liens, pas des causes ni un diagnostic » |
| 3 | `iphone-17-pro-max-demo-clair-food.png` | Repas : « Photo du repas » en grand bouton, repas habituels, derniers repas avec leurs calories |
| 4 | `iphone-17-pro-max-demo-clair-reintroduction.png` | Réintroduction guidée des FODMAP, groupe par groupe |
| 5 | `iphone-17-pro-max-demo-clair-tendances.png` | Tendances : votre forme face à votre propre norme (FC au repos, VFC, sommeil) |
| 6 | `iphone-17-pro-max-demo-clair-journal.png` | Journal : vos derniers jours, mesure par mesure |
| 7 | `iphone-17-pro-max-demo-clair-connectors.png` | Sources : Apple Watch par l'app Santé, lecture du visage, « rangées sur ce téléphone, jamais chez Halcya » |
| 8 | `iphone-17-pro-max-demo-sombre-accueil.png` | L'accueil en mode sombre |

Écartées :
- les captures de notification (`note-du-soir`, `notification-bilan`), où la bannière n'apparaît pas à cette taille ;
- l'historique du bien-être, presque vide dans la démo (aucune lecture du visage) ;
- les écrans de réglages et de données, qui expliquent sans montrer.

Directives relues :
- 2.3.3 : l'app est montrée en usage réel, sans cadre ni texte ajouté.
- 2.3.10 : aucune autre plateforme mobile nommée ou montrée.
- 1.4.1 : les estimations restent présentées comme des pistes, jamais comme un diagnostic.

À refaire à chaque changement visible de ces écrans : relancer les captures sur `main`, regarder la planche, mettre ce
tableau à jour.
