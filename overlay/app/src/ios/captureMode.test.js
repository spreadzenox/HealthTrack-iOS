import { describe, it, expect, vi } from 'vitest'
import { parseCaptureUrl, applyCapture } from './captureMode'

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

describe('mode captures iOS : liens halcya-capture://', () => {
  it('lit la page, les données et le thème', () => {
    expect(parseCaptureUrl('halcya-capture://go?route=%2Fjournal&data=demo&theme=dark')).toEqual({
      route: '/journal',
      data: 'demo',
      theme: 'dark',
    })
  })

  it("ignore les autres liens et les valeurs inconnues (jamais de page hors de l'app)", () => {
    expect(parseCaptureUrl('https://exemple.fr/?route=/journal')).toBeNull()
    expect(parseCaptureUrl('halcya-capture://go?route=https://exemple.fr&data=tout&theme=rose')).toEqual({
      route: '/',
      data: null,
      theme: null,
    })
  })

  it('données de démo ajoutées une seule fois, onboarding et nouveautés notés vus, puis la page demandée', async () => {
    const storage = { upsertEntries: vi.fn(async () => ({ inserted: 3 })) }
    const local = memoryStorage()
    const go = vi.fn()
    const deps = { storage, demoEntries: () => [{}, {}, {}], latestChangelogId: 'x', localStorage: local, go }
    await applyCapture({ route: '/journal', data: 'demo', theme: 'dark' }, deps)
    await applyCapture({ route: '/food', data: 'demo', theme: null }, deps)
    expect(storage.upsertEntries).toHaveBeenCalledTimes(1)
    expect(JSON.parse(local.data.healthtrack_onboarding)).toMatchObject({ done: true })
    expect(local.data['healthtrack-whats-new-last-seen']).toBe('x')
    expect(local.data.healthtrack_theme).toBe('dark')
    expect(go.mock.calls).toEqual([['/journal'], ['/food']])
  })

  it("sans données demandées, rien n'est écrit dans la base", async () => {
    const storage = { upsertEntries: vi.fn() }
    const go = vi.fn()
    await applyCapture({ route: '/', data: null, theme: null }, { storage, localStorage: memoryStorage(), go })
    expect(storage.upsertEntries).not.toHaveBeenCalled()
    expect(go).toHaveBeenCalledWith('/')
  })
})
