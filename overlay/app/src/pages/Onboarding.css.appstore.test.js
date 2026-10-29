import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Version iOS (HealthTrack-iOS), correctif 29 : dans la colonne flexible `.onb-body`, le bouton « Autoriser l'app
// Santé » (`.btn.btn-secondary.onb-action`) héritait de `.btn { flex: 1 }` (App.css) et s'étirait sur toute la hauteur
// libre, en grand ovale (captures de l'iPhone 16e, 29/10). En attendant la demande à Android (DEMANDES.md d'iOS).
// Vitest tourne depuis upstream/app, où scripts/upstream.sh a appliqué les correctifs
const css = readFileSync(join(process.cwd(), 'src/pages/Onboarding.css'), 'utf8')

describe('onboarding sur iPhone : boutons d’action à leur hauteur', () => {
  it('`.onb-action` ne s’étire pas dans la colonne de l’onboarding', () => {
    const rule = css.match(/\.onb-action\s*\{([^}]*)\}/)?.[1] ?? ''
    expect(rule).toMatch(/flex:\s*0 0 auto/)
    expect(rule).toMatch(/min-height:\s*var\(--button-height\)/)
  })
})
