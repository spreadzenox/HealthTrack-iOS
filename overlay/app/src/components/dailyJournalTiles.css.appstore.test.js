import { describe, it, expect } from 'vitest'
import process from 'node:process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Version iOS (HealthTrack-iOS) : sur l'iPhone 12 (390 points), la tuile « 2 repas » du Journal montrait
// « ≈ 1 039 kca / l » (personas iPhone du 8/11). L'espace avant l'unité est rendue insécable à l'affichage
// (`utils/frenchSpacing.js` : un nombre ne quitte jamais son unité), la seule coupure possible était donc au milieu du
// mot (`overflow-wrap: anywhere`). Correctif 54 : sur 400 points ou moins, la tuile gagne 4 px et les chiffres se
// resserrent un peu, assez pour 12 caractères en IBM Plex Mono (mesuré dans l'outil des personas). Vitest tourne
// depuis upstream/app
const css = readFileSync(join(process.cwd(), 'src/App.css'), 'utf8')

describe('Journal sur iPhone : les valeurs des tuiles tiennent sur une ligne', () => {
  it('sur 400 points ou moins, marge intérieure réduite et chiffres resserrés', () => {
    const block = css.match(/@media \(max-width: 400px\) \{([\s\S]*?)\n\}/)?.[1] ?? ''
    expect(block).toMatch(/\.day-summary-item \{ padding-inline: 7px; \}/)
    expect(block).toMatch(/\.day-summary-item dd \{ letter-spacing: -0\.04em; \}/)
  })

  it('le nombre ne quitte jamais son unité à l’affichage (règle d’Android gardée)', async () => {
    const { fixFrenchSpacing } = await import('../utils/frenchSpacing.js')
    expect(fixFrenchSpacing('≈ 1 039 kcal')).toBe('≈ 1 039 kcal')
  })
})
