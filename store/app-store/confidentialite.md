# « Confidentialité de l'app » dans App Store Connect (action A5) — réponses préparées

Reprises de la « Sécurité des données » de Google Play d'Android (`app/store/data-safety/answers.mjs`, lu le
28/10), dans les catégories d'Apple. Elles disent la même chose que `ios/App/App/PrivacyInfo.xcprivacy`, et
`overlay/app/src/ios/privacyManifest.test.js` vérifie que les deux listes restent identiques.

1. **« Collectez-vous des données de cette app ? »** → **Oui**.
2. **Types de données à cocher** (libellés anglais d'App Store Connect entre parenthèses) :

| Catégorie | Type | Ce qui part, et quand |
|---|---|---|
| Localisation (Location) | Localisation approximative (Coarse Location) | ville choisie ou position arrondie à ~10 km, envoyée à Open-Meteo pour la météo |
| Contenu de l'utilisateur (User Content) | Photos ou vidéos (Photos or Videos) | photo du repas, réduite et sans métadonnées, envoyée au relais Halcya (analyse par Vertex AI, UE) seulement quand la personne lance l'analyse |
| Contenu de l'utilisateur (User Content) | Autre contenu de l'utilisateur (Other User Content) | description écrite d'un repas, même chemin |
| Identifiants (Identifiers) | Identifiant de l'appareil (Device ID) | identifiant aléatoire créé par l'app (pas l'identifiant publicitaire), envoyé au relais avec chaque analyse et chaque vérification d'abonnement : crédits IA et plafond contre les abus ; le relais n'en garde qu'un compteur d'analyses sous une empreinte, effacé 13 mois après la dernière analyse (Android v570) |
| Achats (Purchases) | Historique des achats (Purchase History) | transaction App Store envoyée au relais pour vérifier l'abonnement (dès que l'abonnement iPhone est actif, I6) |

3. **Pour chacun de ces types** :
   - **Usage** : « Fonctionnalités de l'app » (App Functionality) seulement. La prévention de la fraude en fait partie chez Apple.
   - **Pistage** : Non.
   - **Lié à l'utilisateur** : Non pour la localisation (envoyée sans identifiant). Oui pour les quatre autres, envoyés avec l'identifiant d'installation : choix prudent, comme Android, qui ne déclare rien « éphémère ».
4. **À ne pas cocher** :
   - Santé et forme : sommeil, fréquence cardiaque, ventre, repas notés… restent sur le téléphone et ne partent jamais à l'IA ;
   - Données de diagnostic : aucun outil de suivi ni de plantages ;
   - Contacts, Historique de navigation, Identifiants publicitaires, Données financières hors achats ;
   - Lecture du visage : aucune image gardée ni envoyée.
5. **URL de la politique de confidentialité** : à fournir. Celle d'Android parle d'Android et de Google (#468) ; il faut une version iPhone (`store/app-store/README.md`).
