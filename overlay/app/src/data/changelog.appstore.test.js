import { describe, it, expect } from 'vitest'
import { ALL_CHANGELOG, APPSTORE_CHANGELOG_SINCE, APPSTORE_HIDDEN, changelogFor } from './changelog'

// Version iOS (HealthTrack-iOS) : les Nouveautés de l'iPhone partent de la version iPhone (correctif 28) ; avant,
// l'historique parle de « HealthTrack », de la clé Gemini, de la mise à jour par APK, de la montre en Bluetooth…
describe('Nouveautés sur iPhone (variante appstore)', () => {
  const LOG = [
    { id: '2026-10-31-0100-ios', variants: ['appstore'] },
    { id: '2026-10-30-2233-commune' },
    { id: '2026-10-30-2133-android', variants: ['play', 'sideload'] },
    { id: '2026-10-30-0433-avant-iphone' },
    { id: '2026-10-20-0100-ancienne' },
  ]

  it('ne montre que les notes communes ou propres à l’iPhone, depuis la version iPhone', () => {
    expect(changelogFor(LOG, 'appstore').map((e) => e.id)).toEqual(['2026-10-31-0100-ios', '2026-10-30-2233-commune'])
  })

  it('ne change rien pour Google Play ni pour la version hors store', () => {
    expect(changelogFor(LOG, 'play').map((e) => e.id)).toEqual(['2026-10-30-2233-commune', '2026-10-30-2133-android', '2026-10-30-0433-avant-iphone'])
    expect(changelogFor(LOG, 'sideload')).toHaveLength(4)
  })

  it('cache les notes d’Android fausses sur iPhone, en attendant leurs variants', () => {
    // v578 : « l'écran Premium dit jusqu'à quand tout est débloqué » : sur iPhone, pas de période de lancement
    expect(APPSTORE_HIDDEN.has('2026-10-29-0533-paywall-lancement')).toBe(true)
    // v590 : « les sources branchées (météo, Health Connect, temps d'écran…) » : ni l'un ni l'autre sur iPhone
    expect(APPSTORE_HIDDEN.has('2026-10-29-1737-sources-titre')).toBe(true)
    // v596 : « le stress de la montre s'affiche « 46 · normal » » : montre en direct, absente sur iPhone (pas de stress
    // dans l'app Santé)
    expect(APPSTORE_HIDDEN.has('2026-10-29-2333-repas-actions')).toBe(true)
    // v600 : « dans Paramètres, Premium et l'écran de la montre » : cet écran (montre en direct) n'existe pas sur iPhone
    expect(APPSTORE_HIDDEN.has('2026-10-30-0233-phrases-aide')).toBe(true)
    // v607 : « votre montre et Health Connect (Samsung Health, Health Sync…) » : la correction vaut sur iPhone (deux
    // apps qui écrivent la même nuit dans l'app Santé), mais pas ces noms
    expect(APPSTORE_HIDDEN.has('2026-10-30-0933-sommeil-une-source')).toBe(true)
    // v609 : « quand vous choisissez une montre Health Connect » : sur iPhone, c'est « une montre ou une bague qui
    // écrit dans l'app Santé » (le compteur, lui, ne grimpe plus non plus)
    expect(APPSTORE_HIDDEN.has('2026-10-30-1133-onboarding-compteur')).toBe(true)
    // v612 : « VFC nuit » dans le Journal et l'étiquette « premium » de la réintroduction : sur iPhone, la VFC de l'app
    // Santé s'appelle « VFC (SDNN) » et rien n'est vendu (l'étiquette n'y apparaît jamais)
    expect(APPSTORE_HIDDEN.has('2026-10-30-1433-vfc-nuit')).toBe(true)
    const ids = changelogFor(ALL_CHANGELOG, 'appstore').map((e) => e.id)
    for (const id of APPSTORE_HIDDEN) expect(ids).not.toContain(id)
    expect(changelogFor(ALL_CHANGELOG, 'play').map((e) => e.id)).toContain('2026-10-29-0533-paywall-lancement')
  })

  it('les notes de l’iPhone commencent au premier TestFlight (30/10) et aucune ne parle de Google Play ni d’Android', () => {
    expect(APPSTORE_CHANGELOG_SINCE).toBe('2026-10-30-2100')
    const notes = changelogFor(ALL_CHANGELOG, 'appstore')
    expect(notes.length).toBeGreaterThan(0)
    for (const n of notes) expect(JSON.stringify(n), n.id).not.toMatch(/Google Play|Android|Health Connect|Huawei/)
  })

  it('la première note de l’iPhone présente la version de test, et seulement sur iPhone', () => {
    const notes = changelogFor(ALL_CHANGELOG, 'appstore')
    expect(notes.at(-1)).toMatchObject({ id: '2026-10-30-2130-premiere-version-iphone', title: 'Halcya arrive sur iPhone' })
    expect(changelogFor(ALL_CHANGELOG, 'play').map((e) => e.id)).not.toContain('2026-10-30-2130-premiere-version-iphone')
  })
})
