# 2026-10-28 10:00 UTC — Aller-retour des données (PR #29), sauvegarde du téléphone (sonde préparée)

**Étape** : I3  ·  **PR** : #29  ·  **Android suivi** : v548 (inchangé)  ·  **iOS** : 548 (simulateur)  ·  **Parité** : 30 % (14/47)

## Déclenchement
- Tâche planifiée de 10:00 UTC, à l'heure. `main` : 1697b08 (#28), CI de push en cours (run 99). PR #29 : CI en
  cours (run 101, relancée à 09:46 par le journal des demandes). `scripts/upstream.sh --latest` : toujours v548.

## Messages du propriétaire depuis le run précédent
- « c'est quoi les demandes pour la routine android ? » → les 4 demandes en attente expliquées, texte prêt à coller.
- « j'ai transmis le tout » (≈ 09:45 UTC) → `DEMANDES.md` mis à jour (transmises), résumé de la semaine aussi.
- « ok, c'est quoi A1 exactement ? comment je fais ? » → pas à pas d'A1 redonné (compte Apple avec validation en deux
  étapes, nom légal, sa propre carte, « Individu », 99 USD par an, attendre la validation puis le dire ici).

## Ce qui a été fait (pendant la CI de #29)
- Préparé (branche `claude/ios-i3-sauvegarde`, empilée sur #29, poussée sans PR) : **sonde de la sauvegarde du
  téléphone** — plugin `CaptureProbe` (build Debug seulement) qui relève, pour Documents (copie de secours),
  Library/WebKit et chaque dossier IndexedDB sous Library, la marque « exclu de la sauvegarde » (ou Library/Caches)
  et la taille ; `probeBackup` l'écrit dans la console. 2 tests écrits d'abord ; suite : 2694 ✅ ; build ✅.
  Répond à la question laissée ouverte le 27/10 (`RECHERCHE.md` : « où WKWebView range IndexedDB et si iCloud
  l'inclut »).

## Suite
- CI de #29 : `[données] aller-retour` attendu `imported 0, after = count` → merger ; puis PR de la sonde de
  sauvegarde : si rien n'est exclu, « Sauvegarde du téléphone » passe ✅ (sauvegarde iCloud du conteneur).
