# Captures de la fiche App Store (fr-FR, iPhone 6,9")

Faites par la CI (`ios-build.yml`, lancement manuel avec `devices: iPhone 17 Pro Max`) : **1320 × 2868**, la taille
6,9" qu'App Store Connect demande (elle sert aussi aux tailles plus petites). Barre d'état propre (9:41, batterie
pleine) ; données de démo ramenées à ce que l'iPhone reçoit (Apple Watch par l'app Santé, temps d'écran par
l'autorisation Temps d'écran ; ni app Android, ni montre Huawei en direct). Les fichiers sont sur la branche
`captures/store` (jamais dans `main`) ; `store-push.yml`, option « captures », les envoie par l'API d'App Store
Connect dans l'ordre du tableau, à la place des précédentes.

Sélection du 29/10. Captures refaites le 1/11 (`96835b0`, Android v678, build 678.169) et regardées :
- barre d'état à 9:41, aucune bannière du système, aucun mot d'Android, aucune erreur JavaScript ;
- Analyses (capture 2) : « Des liens repérés dans vos données, à vérifier avant d'y croire », « Ce qui va avec vos
  meilleurs jours », « Piste solide » et « À confirmer » ; sous « Autres liens repérés », la phrase de la v677 (« Le jour
  même : quand ce chiffre monte… »), que la v679 raccourcit encore : à refaire avec la prochaine série ;
- Réintroduction (capture 4) : « Un groupe à la fois, sur 3 jours : une portion, puis le double, puis le triple. »
  (Android v678) ;
- Accueil (clair et sombre), pris le matin : la carte « Votre ventre » propose Calme, Gêne, Douleur ; le bouton
  « + 1 cigarette » de la démo est visible, comme le déclare la classification par âge ;
- Sources : « Les apps et appareils qui envoient vos mesures. Elles restent sur ce téléphone. » (Android v673, au lieu
  de « jamais chez Halcya ») ; lecture du visage en menthe, temps d'écran en lilas ; sous l'Apple Watch, « Jamais reçu :
  SpO₂ » seulement.

Envoyées par l'API le 1/11, à la place de celles du 31/10. Dans l'ordre d'affichage ; les trois premières sont
celles qu'on voit sans faire défiler :

| # | Fichier (`captures/store`) | Ce qu'elle montre |
|---|---|---|
| 1 | `iphone-17-pro-max-demo-clair-accueil.png` | « Votre journée » : bien-être, sommeil, VFC, pas, la carte « Votre ventre », « Photo du repas » et « + 1 cigarette » |
| 2 | `iphone-17-pro-max-demo-clair-recommendations.png` | « Vos analyses » : « des liens repérés dans vos données, à vérifier avant d'y croire », pistes « Nuits plus longues → meilleur bien-être » (piste solide) et « Plus de pas » (à confirmer) |
| 3 | `iphone-17-pro-max-demo-clair-food.png` | Repas : « Photo du repas » en grand bouton, repas habituels, derniers repas avec leurs calories |
| 4 | `iphone-17-pro-max-demo-clair-reintroduction.png` | Réintroduction guidée des FODMAP, groupe par groupe |
| 5 | `iphone-17-pro-max-demo-clair-tendances.png` | Tendances : votre forme face à votre propre norme (FC au repos, VFC, sommeil) |
| 6 | `iphone-17-pro-max-demo-clair-journal.png` | Journal : vos derniers jours, mesure par mesure |
| 7 | `iphone-17-pro-max-demo-clair-connectors.png` | Sources : Apple Watch par l'app Santé, lecture du visage, temps d'écran, « Elles restent sur ce téléphone » |
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
