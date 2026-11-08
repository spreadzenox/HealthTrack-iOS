# 2026-11-08 09:00 UTC — Outil des personas en mode iPhone (correctif 49) ; TestFlight 905 relancée

**Étape** : PERSONAS (décision (C) du propriétaire)  ·  **PR** : outil des personas  ·  **Android suivi** : v905
(`b02562f`)  ·  **iOS** : 904 sur TestFlight (904.385) ; 905 en cours d'envoi ; 896.376 en examen bêta ; version 844 dans
App Store Connect, build 844.344 attachée  ·  **Parité** : 67 % (30/45)

## Messages du propriétaire depuis le run précédent
- `POUR-IOS.md` relu : rien de neuf depuis 00:35.

## Examen bêta
- Relevé de 09:00 UTC : 896.376 « WAITING_FOR_REVIEW » ; 839.337 et 817.312 en test.

## Fin du run précédent (v905)
- #372 mergée (`1727a3c`) après trois vérifications vertes ; **TestFlight en échec** à l'étape « Paquets Swift (jusqu'à
  3 essais) » (« Could not resolve package dependencies » trois fois : réseau, avant toute compilation ; la même build
  est passée dans la PR) ; tâche relancée une fois (08:50 UTC) : **même échec** (09:20 UTC). Pas d'autre relance : le
  journal ne dit pas quel paquet ; `testflight.yml` affiche maintenant la fin du journal des paquets Swift et le joint aux
  journaux de la build ; le merge de cette PR (qui touche `patches/`) relance TestFlight sur un nouveau commit.

## Android depuis le run précédent
- Rien : `main` toujours à `b02562f` (v905).

## Ce qui a été fait
- **Correctif 49** : l'outil des personas d'Android (`npm run persona`) accepte `--store=appstore` (variante iPhone,
  écran de 390 × 844). Essai en local : ouverture, gestes, captures. Limites du navigateur notées au BACKLOG (PERSONAS).

## Suite
- Résultat de la relance TestFlight (905) ; passage des personas iPhone ce soir, avant l'envoi aux testeurs.
