# Demandes de la routine iOS au propriétaire

> HealthTrack (Android) est en lecture seule pour la routine iOS. Ce qui devrait y changer pour iOS est noté ici ;
> le propriétaire décide et, s'il le veut, le transmet à la routine Android. Une ligne par demande : date, quoi,
> pourquoi iOS en a besoin, contournement en attendant, état.

| Date | Demande | Pourquoi | Contournement | État |
|---|---|---|---|---|
| 27/10 | **Avant de passer le relais en `INTEGRITY_MODE=enforce`** (prévu « quand quelques testeurs auront envoyé des jetons », BACKLOG d'Android) : laisser passer les requêtes de l'app iPhone (en-tête de plateforme ou identifiant d'installation iOS), ou n'exiger le jeton Play Integrity que des requêtes Android, jusqu'à ce qu'App Attest soit accepté (I6) | sur iPhone, il n'y a pas de jeton Play Integrity : en `enforce`, l'analyse IA des repas serait refusée (403) pour tous les utilisateurs iOS | aucun côté iOS (le relais décide) ; aujourd'hui le relais est en `observe`, tout passe | à transmettre à la routine Android si le propriétaire est d'accord |
| 27/10 | (à préciser en I6) Le relais accepte les achats App Store (transactions signées par Apple, notifications serveur V2) et App Attest en plus de Play Billing et Play Integrity, sans rien changer au chemin Google Play | abonnement et crédits IA sur iOS | aucun : I6 attend ; tout le reste avance | pas encore demandé |
