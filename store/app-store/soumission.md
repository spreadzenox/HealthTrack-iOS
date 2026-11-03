# Jour de la soumission (7 ou 8/11) — gestes du propriétaire dans App Store Connect

Décision du propriétaire du 2/11 : soumission le 7 ou le 8/11, après la fin de la période de lancement sur iPhone
(6/11 inclus). **La routine ne soumet jamais** : elle prépare, le propriétaire clique. Chaque geste ci-dessous se fait
dans App Store Connect → Apps → **Halcya**.

## Avant (dès que possible)

1. **Prix et disponibilité** (Distribution → Prix et disponibilité) :
   - prix : **Gratuit** ;
   - pays : **France, Belgique, Luxembourg, Suisse, Canada**, rien d'autre (décision P32) ;
   - ne pas rendre l'app disponible automatiquement dans les nouveaux pays.

   Ou répondre « ok prix et disponibilité » à la routine, qui le fait par l'API (workflow « App Store — prix,
   disponibilité et Content Rights »).
2. **Content Rights** (Informations sur l'app) : « Oui, l'app contient du contenu de tiers, et j'ai les droits
   nécessaires ». Ce sont les tables d'aliments, les modèles et les polices sous licence, cités dans Réglages →
   Licences. Ou « ok Content Rights » à la routine.

## Le 6/11 (la routine)

- Dernière version d'Android suivie, puis build finale envoyée sur TestFlight.
- Version d'App Store Connect renommée au numéro de cette build (« Fiche App Store — envoi », option
  `version_des_builds`). La build 717.216 s'en détache. Si Apple refuse le renommage, le propriétaire change le numéro
  dans la page de la version.
- La routine donne au propriétaire **le numéro exact de la build à choisir**.

## Le 7/11 au matin (vérification)

- Sur l'iPhone (TestFlight, build finale) : Paramètres ne dit plus « Gold offert pendant le test ».
- Roue en haut à droite → « Paramètres » → « Découvrir le premium » ouvre l'écran d'achat avec Silver (annuel avec
  essai, mensuel) et Gold.

## Le jour de la soumission (le propriétaire)

Page de la version iOS (« Prête à soumettre ») :

1. **Build** : choisir la build donnée par la routine.
2. **Achats intégrés et abonnements** : cocher les **trois** abonnements (`halcya_gold_mensuel`,
   `halcya_premium_annuel`, `halcya_premium_mensuel`). La section apparaît quand les abonnements sont prêts. Si elle
   manque encore, le dire à la routine avant d'aller plus loin.
3. **Informations pour l'examen** :
   - notes : coller le texte anglais de `notes-examen.md` (entre les deux traits), après l'avoir relu ;
   - « Connexion requise » décochée ;
   - coordonnées à jour.
4. **Publication de la version** : automatique (réglage actuel) ou manuelle, au choix du propriétaire.
5. Vérifier qu'aucun champ n'est signalé en rouge : captures iPhone 6,9" et iPad 13", classification par âge,
   confidentialité.
6. **Ajouter pour examen**, puis **Soumettre pour examen**.

Après l'envoi, la routine suit l'état de l'examen et note toute demande d'Apple dans le journal.
