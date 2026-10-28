# 2026-10-28 05:59 UTC — Rappels de la note du soir et de la portion sur simulateur (PR #24)

**Étape** : I5  ·  **PR** : #24  ·  **Android suivi** : v542 (inchangé)  ·  **iOS** : 542 (simulateur)  ·  **Parité** : 23 % (11/47)

## Déclenchement
- Tâche planifiée de 05:59 UTC, à l'heure. `main` vert (753d77e, #23 ; run 83). PR #24 : CI verte (run 86),
  70 captures, 0 erreur JavaScript. `scripts/upstream.sh --latest` : toujours v542, rien de neuf côté Android.

## Ce que les sondes de la PR #24 ont montré (run 86, deux iPhone)
- Bilan du ventre : « Gêne » toujours rangé sans ouvrir l'app (`count 1`).
- **Note du soir** : notification « Votre soirée ? » affichée (icône, titre, « 0 = très bas, 5 = très bien »),
  mais **dans le centre de notifications** : l'étape précédente (test du centre de notifications) le laissait ouvert,
  la notification y arrivait en liste au lieu d'une bannière, et l'appui long sur la liste ne la déplie pas (comme à
  la PR #21) → 0 action trouvée. Le nombre d'actions affichées reste donc inconnu.
- **Rappel de portion** : programmé par `schedule`, bannière touchée app en arrière-plan, l'app revient au premier
  plan, le toucher est retenu (`open: true`)… mais **la réintroduction ne s'ouvre pas** (page restée
  `/recommendations`) : iOS transmet le toucher après le retour au premier plan, quand `usePortionOpen` a déjà
  vérifié. Défaut réel propre à iOS (sur Android, le toucher est connu avant).

## Ce qui a été fait
- Rappel de portion : le natif signale le toucher à la page (`halcya-portion-open`, `PortionReminderPlugin.load`) ;
  `overlay/app/src/ios/portionOpen.js` (3 tests écrits d'abord) et **correctif 18** (`Layout.jsx`, 5 lignes) : la
  page refait la même vérification à ce signal. App lancée par le toucher : le drapeau reste, lu au montage (inchangé).
- Captures : test du centre de notifications retiré (il échoue toujours depuis que la réponse retire la
  notification, et laissait le centre ouvert pour l'étape suivante).
- Suite d'Android avec les 18 correctifs : 2678 ✅ (code de sortie 0) ; build web `appstore` ✅.

## À savoir
- Le réglage de la note du soir est dans la carte bien-être de l'Accueil (`WellbeingPrompt`), celui du rappel de
  portion dans la page Réintroduction : rien de neuf dans Paramètres (captures regardées).

## Suite
- CI de #24 : « actions visibles » de la note du soir (bannière cette fois), `[portion] après le toucher`
  attendu `{"page":"/reintroduction","open":false}` ; merger #24 si c'est le cas.
- Si iOS coupe les actions de la note : extension de contenu de notification ou autre présentation (à décider).
