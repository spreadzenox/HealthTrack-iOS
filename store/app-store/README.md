# Fiche App Store de Halcya (fr-FR) — brouillon

Préparée par la routine iOS (étape I9) à partir de la fiche Google Play d'Android (`app/store/listing/fr-FR/`),
réécrite pour l'iPhone : app Santé au lieu de Health Connect, aucune fonction absente de la version iOS (montre Huawei
en Bluetooth direct, temps d'écran, lecture du visage tant qu'I7 n'est pas fait), aucun nom d'une autre plateforme
mobile (directive 2.3.10 d'Apple). À revoir avant la première soumission, quand la parité est atteinte.

| Fichier | Champ d'App Store Connect | Limite |
|---|---|---|
| `fr-FR/name.txt` | Nom | 30 caractères |
| `fr-FR/subtitle.txt` | Sous-titre | 30 caractères |
| `fr-FR/promotional-text.txt` | Texte promotionnel (modifiable sans nouvel examen) | 170 caractères |
| `fr-FR/description.txt` | Description | 4 000 caractères |
| `fr-FR/keywords.txt` | Mots-clés, séparés par des virgules, sans répéter le nom ni le sous-titre | 100 caractères |

`scripts/store-check.mjs` vérifie ces limites et l'absence d'« Android », « Google », « Play », « Health Connect »
(workflow `store-check.yml`, sans runner macOS ; la fiche seule ne relance pas la build iOS).

Reste à préparer, au moment des actions A3 et A5 du propriétaire :
- **Catégorie** : Santé et forme (principale) ; pas « Médecine » : Halcya n'est pas un dispositif médical.
- **Âge** : 18 ans et plus, comme sur Google Play. Questionnaire d'App Store Connect à remplir ; prendre un âge plus élevé que celui qu'il calcule s'il le permet.
- **URL** : assistance et politique de confidentialité. Celles publiées pour Android parlent d'Android et de Google (#468), il en faudra une version iPhone.
- **Captures** : iPhone 6,9 pouces (1320 × 2868), exigées par App Store Connect. Le workflow « iOS — build simulateur » les produit à la demande : lancement manuel (`workflow_dispatch`) avec `devices` = « iPhone 17 Pro Max ». Toutes les pages du parcours sont prises avec les données de démo et publiées sur la branche `captures/store`, sans toucher aux captures des PR. Reste à choisir les 3 à 10 captures de la fiche.
- **Notes pour l'examen** :
  - pas de compte à créer ;
  - l'analyse IA d'un repas passe par le relais Halcya, sans clé dans l'app ;
  - HealthKit ne sert qu'à importer les mesures que la personne autorise ;
  - abonnement par l'App Store (I6).
- **Confidentialité de l'app** (A5) : réponses prêtes dans `confidentialite.md`, en accord avec `ios/App/App/PrivacyInfo.xcprivacy` et avec la déclaration Google Play d'Android (vérifié par un test).
