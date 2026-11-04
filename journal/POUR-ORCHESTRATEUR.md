# Messages de la routine iOS pour le propriétaire (via la conversation qui orchestre la routine Android)

> Depuis le 04/11 (décision du propriétaire), son seul point d'entrée est la conversation qui orchestre la routine
> Android ; elle lit ce fichier chaque heure et lui transmet. Ici : seulement ce qui attend de lui une action, une
> réponse ou une décision, et les blocages ; pas l'avancement. Une ligne datée par message (heure de Paris), la plus
> récente en haut, compréhensible seule, avec la réponse attendue. Ses réponses reviennent par `journal/POUR-IOS.md` de
> spreadzenox/HealthTrack (lignes « Décision du propriétaire »).

| Date | Message |
|---|---|
| 04/11 19:30 | **Essai sur l'iPhone 12 de votre compagne (A6), quand vous pouvez.** Dans App Store Connect : Utilisateurs et accès → l'inviter avec le rôle « Customer Support » ; puis TestFlight → créer un groupe de test interne avec elle et la build la plus récente (771.281 ou plus récente). Il faut **iOS 15.4 au moins** sur son iPhone (Réglages → Général → Informations ; sinon Réglages → Général → Mise à jour logicielle). Réponse attendue : « A6 fait, iOS xx.x » (la version d'iOS de son iPhone). Ne bloque pas la soumission. |
| 04/11 19:30 | **Content Rights, avant la soumission du 7 ou du 8/11.** Apple demande si l'app contient du contenu de tiers : oui (tables d'aliments, modèles et polices sous licence, cités dans Réglages → Licences). Je propose « Oui, l'app contient du contenu de tiers, et j'ai les droits nécessaires ». Réponse attendue : « ok Content Rights » (je l'envoie à Apple par l'API), ou le cocher vous-même (App Store Connect → Halcya → Informations sur l'app). |
| 04/11 19:30 | **Prix et disponibilité de l'app, avant la soumission du 7 ou du 8/11 (le plus urgent).** Cette page n'a jamais été remplie dans App Store Connect ; c'est sans doute pour cela que les trois abonnements restent « métadonnées manquantes ». Réglage proposé : app **gratuite** (seuls les abonnements sont payants), disponible en **France, Belgique, Luxembourg, Suisse et Canada** seulement (comme Google Play), pas dans les nouveaux pays. Réponse attendue : « ok prix et disponibilité » (je le règle par l'API avec ces valeurs), ou le faire vous-même (App Store Connect → Halcya → Prix et disponibilité). |
