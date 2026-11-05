# Messages de la routine iOS pour le propriétaire (via la conversation qui orchestre la routine Android)

> Depuis le 04/11 (décision du propriétaire), son seul point d'entrée est la conversation qui orchestre la routine
> Android ; elle lit ce fichier chaque heure et lui transmet. Ici : seulement ce qui attend de lui une action, une
> réponse ou une décision, et les blocages ; pas l'avancement. Une ligne datée par message (heure de Paris), la plus
> récente en haut, compréhensible seule, avec la réponse attendue. Ses réponses reviennent par `journal/POUR-IOS.md` de
> spreadzenox/HealthTrack (lignes « Décision du propriétaire »).

| Date | Message |
|---|---|
| 05/11 22:15 | **Avant de soumettre, trois réglages de votre côté (vos décisions de 20:15).** Dans App Store Connect → Halcya : (1) Confidentialité de l'app → ajouter « Santé » (Fonctionnalités de l'app, liée à l'utilisateur, sans pistage) : la photo des selles est rouverte sur iPhone et partira dans la prochaine build ; (2) Prix et disponibilité : gratuit, France, Belgique, Luxembourg, Suisse, Canada ; (3) Informations sur l'app → Content Rights : « oui, contenu de tiers, avec les droits ». Pour TestFlight externe, les textes à coller sont dans `store/app-store/testflight-externe.md` du dépôt iOS. Réponse attendue : « réglages faits » (ou ce qui bloque). |
| 04/11 19:30 | **Essai sur l'iPhone 12 de votre compagne (A6), quand vous pouvez.** Dans App Store Connect : Utilisateurs et accès → l'inviter avec le rôle « Customer Support » ; puis TestFlight → créer un groupe de test interne avec elle et la build la plus récente (771.281 ou plus récente). Il faut **iOS 15.4 au moins** sur son iPhone (Réglages → Général → Informations ; sinon Réglages → Général → Mise à jour logicielle). Réponse attendue : « A6 fait, iOS xx.x » (la version d'iOS de son iPhone). Ne bloque pas la soumission. |
