import { describe, it, expect, vi } from 'vitest'
import { buildPlan, runCaptureStep, STEP_KEY, probeHealthKit, waitForAck } from './captureMode'

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
    signal: vi.fn(async () => {}),
    waitAck: vi.fn(async () => true),
    ...overrides,
  }
}

describe('mode captures iOS : parcours des pages piloté par l’app', () => {
  it('plan : installation vierge, puis chaque page en clair avec les données de démo, puis quelques-unes en sombre', () => {
    const plan = buildPlan(['/', '/journal'], ['/'], {})
    expect(plan.map((s) => s.name)).toEqual([
      'vierge-onboarding', 'vierge-onboarding-montre', 'demo-clair-accueil', 'demo-clair-journal', 'demo-sombre-accueil',
    ])
    expect(plan[1]).toMatchObject({ route: '/bienvenue', data: null, onboarding: { goal: 'energy', step: 2 } })
    expect(plan[2]).toMatchObject({ route: '/', data: 'demo', theme: 'light' })
    expect(plan[4]).toMatchObject({ route: '/', data: 'demo', theme: 'dark' })
  })

  it('plan : les pages longues ont aussi leurs écrans suivants, défilés', () => {
    const plan = buildPlan(['/connectors'], [], { '/connectors': 2 })
    expect(plan.slice(2).map((s) => [s.name, s.scroll ?? 0])).toEqual([
      ['demo-clair-connectors', 0], ['demo-clair-connectors-2', 1], ['demo-clair-connectors-3', 2],
    ])
  })

  it('écran de choix de la montre : l’onboarding reprend à son 3e écran', async () => {
    const plan = buildPlan(['/'], [], {})
    const local = memoryStorage()
    const d = deps(local)
    await runCaptureStep(plan, d) // vierge → choix de la montre
    expect(JSON.parse(local.data.healthtrack_onboarding)).toEqual({ goal: 'energy', step: 2 })
    expect(d.storage.upsertEntries).not.toHaveBeenCalled()
    expect(d.go).toHaveBeenLastCalledWith('/bienvenue')
  })

  it('écran défilé : la page descend avant d’être signalée', async () => {
    const plan = buildPlan(['/connectors'], [], { '/connectors': 1 })
    const local = memoryStorage({ [STEP_KEY]: '3' })
    const order = []
    const d = deps(local, {
      scroll: vi.fn((n) => order.push(`scroll ${n}`)),
      signal: vi.fn(async (name) => order.push(`signal ${name}`)),
    })
    await runCaptureStep(plan, d)
    expect(order).toEqual(['scroll 1', 'signal demo-clair-connectors-2', 'signal fin'])
  })

  it('annonce la page prête, puis prépare la suivante (données une seule fois, thème) et y va', async () => {
    const plan = buildPlan(['/', '/journal'], ['/'], {})
    const local = memoryStorage({ [STEP_KEY]: '1' })
    const d = deps(local)
    await runCaptureStep(plan, d) // choix de la montre → accueil
    expect(d.log).toHaveBeenCalledWith('[capture] page vierge-onboarding-montre')
    expect(d.storage.upsertEntries).toHaveBeenCalledTimes(1)
    expect(JSON.parse(local.data.healthtrack_onboarding)).toMatchObject({ done: true })
    expect(local.data['healthtrack-whats-new-last-seen']).toBe('x')
    expect(local.data.healthtrack_theme).toBe('light')
    expect(local.data[STEP_KEY]).toBe('2')
    expect(d.go).toHaveBeenLastCalledWith('/')

    await runCaptureStep(plan, d) // accueil → journal
    await runCaptureStep(plan, d) // journal → accueil sombre
    expect(local.data.healthtrack_theme).toBe('dark')
    expect(d.storage.upsertEntries).toHaveBeenCalledTimes(1)
    expect(d.go.mock.calls.map((c) => c[0])).toEqual(['/', '/journal', '/'])
  })

  it('après la dernière page : « fin », plus aucune navigation', async () => {
    const plan = buildPlan(['/'], [], {})
    const local = memoryStorage({ [STEP_KEY]: '2' })
    const d = deps(local)
    await runCaptureStep(plan, d)
    expect(d.log).toHaveBeenCalledWith('[capture] page demo-clair-accueil')
    expect(d.log).toHaveBeenLastCalledWith('[capture] fin')
    expect(d.go).not.toHaveBeenCalled()
    await runCaptureStep(plan, d)
    expect(d.go).not.toHaveBeenCalled()
  })

  it('chaque page est signalée au script, et l’app attend son accusé avant de passer à la suivante', async () => {
    const plan = buildPlan(['/'], [], {})
    const local = memoryStorage({ [STEP_KEY]: '1' })
    const order = []
    const d = deps(local, {
      signal: vi.fn(async (name) => order.push(`signal ${name}`)),
      waitAck: vi.fn(async (name) => {
        order.push(`ack ${name}`)
        return true
      }),
      go: vi.fn((route) => order.push(`go ${route}`)),
    })
    await runCaptureStep(plan, d)
    expect(order).toEqual(['signal vierge-onboarding-montre', 'ack vierge-onboarding-montre', 'go /'])
    await runCaptureStep(plan, d)
    expect(order.slice(3)).toEqual(['signal demo-clair-accueil', 'ack demo-clair-accueil', 'signal fin'])
  })

  it('après la dernière page : la sonde HealthKit passe avant « fin », avec les mêmes signal et accusé', async () => {
    const plan = buildPlan(['/'], [], {})
    const local = memoryStorage({ [STEP_KEY]: '2' })
    const order = []
    const d = deps(local, {
      signal: vi.fn(async (name) => order.push(`signal ${name}`)),
      probe: vi.fn(async ({ signal, waitAck }) => {
        await signal('healthkit-autorisation')
        await waitAck('healthkit-autorisation')
      }),
    })
    await runCaptureStep(plan, d)
    expect(d.probe).toHaveBeenCalledTimes(1)
    expect(order).toEqual(['signal demo-clair-accueil', 'signal healthkit-autorisation', 'signal fin'])
  })
})

describe('accusé du script (waitForAck)', () => {
  it('rend vrai dès que l’accusé porte le nom attendu, faux après le nombre d’essais donné', async () => {
    const reads = ['', 'autre', 'page']
    const readAck = vi.fn(async () => reads.shift() ?? '')
    const sleep = vi.fn(async () => {})
    expect(await waitForAck({ readAck, sleep }, 'page', 10)).toBe(true)
    expect(readAck).toHaveBeenCalledTimes(3)
    const never = vi.fn(async () => {
      throw new Error('absent')
    })
    expect(await waitForAck({ readAck: never, sleep }, 'page', 4)).toBe(false)
    expect(never).toHaveBeenCalledTimes(4)
  })
})

describe('sonde HealthKit (I4)', () => {
  function health({ acceptOnAck }) {
    let accept
    const answer = new Promise((resolve) => {
      accept = resolve
    })
    return {
      accept,
      api: {
        isAvailable: vi.fn(async () => ({ available: true })),
        checkAuthorization: vi.fn(async () => ({ readAuthorized: [] })),
        requestAuthorization: vi.fn(() => (acceptOnAck ? answer : new Promise(() => {}))),
        saveSample: vi.fn(async () => {}),
        readSamples: vi.fn(async () => ({ samples: [{ value: 1234 }] })),
      },
    }
  }

  it('laisse au script le temps du test d’interface (au moins 2 min), puis écrit et relit des pas', async () => {
    const h = health({ acceptOnAck: true })
    const logs = []
    const waitAck = vi.fn(async () => {
      h.accept({ readAuthorized: ['steps'] }) // le test d'interface a touché « Autoriser » avant l'accusé
      return true
    })
    await probeHealthKit({ signal: vi.fn(async () => {}), waitAck, wait: async () => {}, log: (m) => logs.push(m), health: h.api })
    const [name, tries] = waitAck.mock.calls[0]
    expect(name).toBe('healthkit-autorisation')
    expect(tries * 300).toBeGreaterThanOrEqual(120_000)
    expect(h.api.requestAuthorization).toHaveBeenCalledWith({ read: expect.not.arrayContaining(['heartRateVariability']), write: ['steps'] })
    expect(h.api.saveSample).toHaveBeenCalledWith(expect.objectContaining({ dataType: 'steps', value: 1234 }))
    expect(logs.join('\n')).toMatch(/\[healthkit\] readSamples \{"count":1,"values":\[1234\]\}/)
  })

  it('acceptée : les pas écrits repassent par le connecteur de l’app (celui de Sources), sans rien enregistrer', async () => {
    const h = health({ acceptOnAck: true })
    const logs = []
    const sync = vi.fn(async ({ writer }) => {
      await writer([{ type: 'steps', source: 'health_connect', payload: { value: 1234, sourceName: 'Halcya' } }, { type: 'sleep', payload: {} }])
      return { synced: 2, skipped: 0, errors: [] }
    })
    const waitAck = async () => {
      h.accept({})
      return true
    }
    await probeHealthKit({ signal: async () => {}, waitAck, wait: async () => {}, log: (m) => logs.push(m), health: h.api, connector: { sync } })
    const { since, until } = sync.mock.calls[0][0]
    expect(until.getTime() - since.getTime()).toBeGreaterThanOrEqual(3600 * 1000)
    expect(logs.join('\n')).toMatch(/\[healthkit\] connecteur \{"synced":2,"errors":\[\],"pas":\[\{"value":1234,"source":"Halcya"\}\]\}/)
  })

  it('feuille jamais acceptée : le dit et n’écrit rien', async () => {
    const h = health({ acceptOnAck: false })
    const logs = []
    await probeHealthKit({ signal: async () => {}, waitAck: async () => true, wait: async () => {}, log: (m) => logs.push(m), health: h.api })
    expect(h.api.saveSample).not.toHaveBeenCalled()
    expect(logs.join('\n')).toMatch(/feuille toujours ouverte/)
  })
})
