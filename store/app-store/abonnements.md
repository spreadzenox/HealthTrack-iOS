# Abonnements App Store : Silver et Gold (brouillon, I6)

Décision du propriétaire du 31/10, prise avec la routine Android : deux formules.

| | Silver | Gold |
|---|---|---|
| Prix | à fixer | **10 €/mois** |
| Crédits d'analyse IA | à fixer | plus que Silver |
| Analyse des repas (relais) | dernier Gemini Flash-Lite en Europe | dernier Gemini Flash en Europe |
| Par défaut | — | bêta-testeurs et propriétaire |

**Règles**
- Le modèle n'est jamais nommé à l'utilisateur : ni dans l'app, ni dans la fiche, ni dans les textes des abonnements.
- La page de confidentialité continue de nommer le prestataire (Google, Vertex AI, dans l'Union européenne), comme la
  loi l'exige, sans dire quel modèle sert quelle formule.
- Ce qu'on met en avant pour Gold : **moins d'erreurs sur la reconnaissance des aliments et l'estimation des
  quantités**. Le banc d'essai du relais sur des repas pesés (demande à Android) chiffre cet avantage : c'est ce qui
  le rend vérifiable si Apple ou un client le demande.

**App Store Connect** (un groupe d'abonnements « Halcya » ; Gold au niveau le plus haut, Silver en dessous : Apple
gère la montée et la descente de formule)

| Identifiant (proposé) | Nom affiché (30 car. max) | Description (45 car. max) |
|---|---|---|
| `halcya_gold_mensuel` | Halcya Gold | Repas mieux reconnus, plus de crédits |
| `halcya_silver_mensuel` | Halcya Silver | L'analyse des repas par l'IA |

Texte de l'écran d'abonnement (paywall, code partagé avec Android) et de la fiche, à reprendre quand les formules
seront branchées :
- « **Gold** : moins d'erreurs sur la reconnaissance des aliments et l'estimation des quantités, et plus de
  crédits d'analyse. »
- « **Silver** : l'analyse des repas par photo ou description, avec des crédits chaque mois. »

Restent à décider par le propriétaire : prix de Silver, crédits de chaque formule, formules annuelles, essai gratuit.
Les produits seront créés par l'API App Store Connect (autorisation permanente) une fois le contrat « Paid
Applications » signé (A4).
