import { describe, expect, it } from 'vitest'
import { summaryChips } from './journalChips'

// Version iOS (HealthTrack-iOS) : sur l'écran de l'iPhone 12 (390 points), la tuile « 2 repas » du Journal n'a pas la
// place de « ≈ 1 039 kcal » sur une ligne ; sans aucune coupure permise, `overflow-wrap: anywhere` coupait le mot
// (« kca l », simulation de personas du 08/11). Correctif 51 : le nombre reste entier, la coupure n'est permise
// qu'avant l'unité. Demandé aussi à Android (DEMANDES.md). Vitest tourne depuis upstream/app
describe('Journal, tuile des repas sur iPhone : jamais « kca l »', () => {
  const meals = (s) => summaryChips(s).find(([label]) => /repas$/i.test(label))

  it('le nombre et « ≈ » restent ensemble, une coupure n’est possible qu’avant « kcal »', () => {
    const [, value] = meals({ meals: 2, mealKcal: 1039 })
    expect(value).toMatch(/^≈\u00a0\d[\d\u202f\u00a0]*\d kcal$/)
    expect(value.split(' ')).toHaveLength(2)
  })
})
