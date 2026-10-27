import { describe, it, expect, vi } from 'vitest'
import { buildPlan, runCaptureStep, STEP_KEY } from './captureMode'

function memoryStorage(initial = {}) {
  const data = { ...initial }
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => {
      data[k] = String(v)
    },
    data,
  }
}

function deps(local, overrides = {}) {
  return {
    storage: { upsertEntries: vi.fn(async () => ({ inserted: 3 })) },
    demoEntries: () => [{}, {}, {}],
    latestChangelogId: 'x',
    localStorage: local,
    go: vi.fn(),
    log: vi.fn(),
    wait: async () => {},
    ...overrides,
  }
}

describe('mode captures iOS : parcours des pages piloté par l’app', () => {
  it('plan : installation vierge, puis chaque page en clair avec les données de démo, puis quelques-unes en sombre', () => {
    const plan = buildPlan(['/', '/journal'], ['/'])
    expect(plan.map((s) => s.name)).toEqual(['vierge-onboarding', 'demo-clair-accueil', 'demo-clair-journal', 'demo-sombre-accueil'])
    expect(plan[1]).toMatchObject({ route: '/', data: 'demo', theme: 'light' })
    expect(plan[3]).toMatchObject({ route: '/', data: 'demo', theme: 'dark' })
  })

  it('annonce la page prête, puis prépare la suivante (données une seule fois, thème) et y va', async () => {
    const plan = buildPlan(['/', '/journal'], ['/'])
    const local = memoryStorage()
    const d = deps(local)
    await runCaptureStep(plan, d) // vierge → accueil
    expect(d.log).toHaveBeenCalledWith('[capture] page vierge-onboarding')
    expect(d.storage.upsertEntries).toHaveBeenCalledTimes(1)
    expect(JSON.parse(local.data.healthtrack_onboarding)).toMatchObject({ done: true })
    expect(local.data['healthtrack-whats-new-last-seen']).toBe('x')
    expect(local.data.healthtrack_theme).toBe('light')
    expect(local.data[STEP_KEY]).toBe('1')
    expect(d.go).toHaveBeenLastCalledWith('/')

    await runCaptureStep(plan, d) // accueil → journal
    await runCaptureStep(plan, d) // journal → accueil sombre
    expect(local.data.healthtrack_theme).toBe('dark')
    expect(d.storage.upsertEntries).toHaveBeenCalledTimes(1)
    expect(d.go.mock.calls.map((c) => c[0])).toEqual(['/', '/journal', '/'])
  })

  it('après la dernière page : « fin », plus aucune navigation', async () => {
    const plan = buildPlan(['/'], [])
    const local = memoryStorage({ [STEP_KEY]: '1' })
    const d = deps(local)
    await runCaptureStep(plan, d)
    expect(d.log).toHaveBeenCalledWith('[capture] page demo-clair-accueil')
    expect(d.log).toHaveBeenLastCalledWith('[capture] fin')
    expect(d.go).not.toHaveBeenCalled()
    await runCaptureStep(plan, d)
    expect(d.go).not.toHaveBeenCalled()
  })
})
