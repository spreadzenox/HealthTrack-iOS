# 2026-10-31 15:00 UTC — 648 sur TestFlight ; fiche App Store : catégorie et âge ; captures refaites

**Étape** : I9 (fiche)  ·  **PR** : #130 (catégorie et âge), journal  ·  **Android suivi** : v648 sur `main` (v650 pas encore publié sur Google Play)  ·  **iOS** : 648 sur `main` et sur TestFlight (648.128)  ·  **Parité** : 48 % (23/48)

## Messages du propriétaire depuis le run précédent
- Aucun. A6 et version d'iOS de l'iPhone 12 attendus.

## Ce qui a été fait
- **Envoi TestFlight de la 648** (run 41212310775, `main` 7ed9849) : réussi, build **648.128**, la première avec le
  correctif de la VFC de l'Apple Watch.
- **Android** : v649 (#565, journal) et v650 (#566, Nutrition : barres « incertain » hachurées) sont sur `main`
  d'Android, mais « Play — AAB » n'a pas encore réussi pour eux : `--latest` reste sur v648. Rien à suivre ce run.
- **PR #130 : catégorie et classification par âge envoyées par l'API.**
  - `classification.json` : catégorie principale `HEALTH_AND_FITNESS` ; questionnaire d'âge au plus prudent
    (santé et bien-être ; informations médicales « fréquentes » pour la réintroduction et le rapport au médecin ;
    tabac « fréquent » pour le relevé des cigarettes ; tout le reste à non) ; âge forcé à 18 ans et plus.
  - Envoi : `store-push.mjs`, après la fiche (`PATCH appInfos` pour la catégorie, `PATCH ageRatingDeclarations`).
  - Noms et valeurs admises relevés dans la documentation de l'API ; 1 test rouge avant ; README de la fiche :
    réponses à relire par le propriétaire avant la soumission.
- **Captures 6,9" de la fiche** (`main` 7ed9849, Android v648, avec le correctif de la VFC) : en cours.

## Suite
- Captures : les regarder une à une, `captures.md`, puis `store-push.yml` avec « captures » ; il enverra aussi le
  numéro 648 (#129), la catégorie et l'âge (#130).
- Android v650 dès sa publication sur Google Play (barres « incertain » hachurées de Nutrition).
