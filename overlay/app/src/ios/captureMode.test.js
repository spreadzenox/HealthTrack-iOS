import { describe, it, expect, vi } from 'vitest'
import { buildPlan, runCaptureStep, STEP_KEY, probeHealthKit, probeGutEvening, probeEveningNote, probePortionReminder, waitForAck } from './captureMode'

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
    const plan = buildPlan(['/connectors'], [], { '/connectors': 2 }, {})
    expect(plan.slice(2).map((s) => [s.name, s.scroll ?? 0])).toEqual([
      ['demo-clair-connectors', 0], ['demo-clair-connectors-2', 1], ['demo-clair-connectors-3', 2],
    ])
  })

  it('plan : un volet replié peut être ouvert puis capturé (guide des montres sous « Ajouter une source »)', () => {
    const reveal = { name: 'guides', click: 'Ajouter une source', open: 'guide-garmin', target: 'watch-guides-title' }
    const plan = buildPlan(['/connectors', '/data'], [], { '/connectors': 1 }, { '/connectors': [reveal] })
    expect(plan.slice(2).map((s) => s.name)).toEqual([
      'demo-clair-connectors', 'demo-clair-connectors-2', 'demo-clair-connectors-guides', 'demo-clair-data',
    ])
    expect(plan[4]).toMatchObject({ route: '/connectors', data: 'demo', theme: 'light', reveal })
    // par défaut : le guide des montres de Sources
    expect(buildPlan().map((s) => s.name)).toContain('demo-clair-connectors-guides')
  })

  it('volet à ouvrir : ouvert avant que la page soit signalée', async () => {
    const reveal = { name: 'guides', click: 'Ajouter une source', open: 'guide-garmin', target: 'watch-guides-title' }
    const plan = buildPlan(['/connectors'], [], {}, { '/connectors': [reveal] })
    const local = memoryStorage({ [STEP_KEY]: '3' })
    const order = []
    const d = deps(local, {
      reveal: vi.fn(async (r) => order.push(`reveal ${r.click}`)),
      signal: vi.fn(async (name) => order.push(`signal ${name}`)),
    })
    await runCaptureStep(plan, d)
    expect(order).toEqual(['reveal Ajouter une source', 'signal demo-clair-connectors-guides', 'signal fin'])
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
    const plan = buildPlan(['/connectors'], [], { '/connectors': 1 }, {})
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
    expect(h.api.requestAuthorization).toHaveBeenCalledWith({
      read: expect.arrayContaining(['steps', 'heartRateVariability']),
      write: ['steps', 'heartRateVariability'],
    })
    expect(h.api.saveSample).toHaveBeenCalledWith(expect.objectContaining({ dataType: 'steps', value: 1234 }))
    expect(h.api.saveSample).toHaveBeenCalledWith(expect.objectContaining({ dataType: 'heartRateVariability', value: 48 }))
    expect(logs.join('\n')).toMatch(/\[healthkit\] readSamples \{"count":1,"values":\[1234\]\}/)
  })

  it('acceptée : les pas écrits repassent par le connecteur de l’app (celui de Sources), sans rien enregistrer', async () => {
    const h = health({ acceptOnAck: true })
    const logs = []
    const sync = vi.fn(async ({ writer }) => {
      await writer([
        { type: 'steps', source: 'health_connect', payload: { value: 1234, sourceName: 'Halcya' } },
        { type: 'sleep', payload: {} },
        { type: 'heart_rate', payload: { value: 48, subtype: 'heartRateVariabilitySdnn' } },
        { type: 'heart_rate', payload: { bpm: 70, subtype: 'heartRate' } },
      ])
      return { synced: 2, skipped: 0, errors: [] }
    })
    const waitAck = async () => {
      h.accept({})
      return true
    }
    await probeHealthKit({ signal: async () => {}, waitAck, wait: async () => {}, log: (m) => logs.push(m), health: h.api, connector: { sync } })
    const { since, until } = sync.mock.calls[0][0]
    expect(until.getTime() - since.getTime()).toBeGreaterThanOrEqual(3600 * 1000)
    expect(logs.join('\n')).toContain(
      '[healthkit] connecteur {"synced":2,"errors":[],"pas":[{"value":1234,"source":"Halcya"}],"vfc":[{"value":48,"subtype":"heartRateVariabilitySdnn"}]}',
    )
  })

  it('feuille jamais acceptée : le dit et n’écrit rien', async () => {
    const h = health({ acceptOnAck: false })
    const logs = []
    await probeHealthKit({ signal: async () => {}, waitAck: async () => true, wait: async () => {}, log: (m) => logs.push(m), health: h.api })
    expect(h.api.saveSample).not.toHaveBeenCalled()
    expect(logs.join('\n')).toMatch(/feuille toujours ouverte/)
  })
})

describe('sonde du bilan du ventre du soir (I5)', () => {
  function gutEvening({ granted = true } = {}) {
    let notes = []
    return {
      requestNotifications: vi.fn(async () => ({ asked: true, notifications: granted })),
      testNotification: vi.fn(async () => {}),
      list: vi.fn(async () => ({ notes })),
      answer: (level) => {
        notes = [{ name: 'gut-1', json: `{"v":1,"level":"${level}","at":1}` }]
      },
    }
  }

  it('autorisation acceptée par le test d’interface, notification d’essai, « Gêne » retrouvé dans la boîte', async () => {
    const plugin = gutEvening()
    const order = []
    const logs = []
    const waitAck = vi.fn(async (name) => {
      order.push(`ack ${name}`)
      if (name === 'notification-bilan') plugin.answer('discomfort') // geste du test d'interface
      return true
    })
    await probeGutEvening({ signal: async (n) => order.push(`signal ${n}`), waitAck, wait: async () => {}, log: (m) => logs.push(m), plugin })
    expect(order).toEqual(['signal notification-autorisation', 'ack notification-autorisation', 'signal notification-bilan', 'ack notification-bilan'])
    expect(waitAck.mock.calls.every(([, tries]) => tries * 300 >= 120_000)).toBe(true)
    // notification d'essai en bannière, assez tard pour que le test d'interface l'attende déjà : xcodebuild met
    // jusqu'à ~30 s à lancer le test (iPhone 16e, 28/10), la bannière ne reste que quelques secondes
    expect(plugin.testNotification).toHaveBeenCalledWith({ delay: expect.any(Number), banner: true })
    expect(plugin.testNotification.mock.calls[0][0].delay).toBeGreaterThanOrEqual(40)
    expect(logs.join('\n')).toContain('[notification] boîte {"count":1,"levels":["discomfort"]}')
  })

  it('notifications refusées : le dit et ne déclenche rien', async () => {
    const plugin = gutEvening({ granted: false })
    const logs = []
    await probeGutEvening({ signal: async () => {}, waitAck: async () => true, wait: async () => {}, log: (m) => logs.push(m), plugin })
    expect(plugin.testNotification).not.toHaveBeenCalled()
    expect(logs.join('\n')).toMatch(/notifications refusées/)
  })
})

describe('sonde de la note du soir (I5)', () => {
  function eveningNote({ notifications = true } = {}) {
    let notes = []
    return {
      status: vi.fn(async () => ({ notifications })),
      testNotification: vi.fn(async () => {}),
      list: vi.fn(async () => ({ notes })),
      answer: (score) => {
        notes = [{ name: 'note-1', json: `{"v":1,"score":${score},"at":1}` }]
      },
    }
  }

  it('notification d’essai en bannière, note touchée par le test d’interface retrouvée dans la boîte', async () => {
    const plugin = eveningNote()
    const order = []
    const logs = []
    const waitAck = vi.fn(async (name) => {
      order.push(`ack ${name}`)
      if (name === 'note-du-soir') plugin.answer(4) // geste du test d'interface
      return true
    })
    await probeEveningNote({ signal: async (n) => order.push(`signal ${n}`), waitAck, wait: async () => {}, log: (m) => logs.push(m), plugin })
    expect(order).toEqual(['signal note-du-soir', 'ack note-du-soir'])
    expect(waitAck.mock.calls.every(([, tries]) => tries * 300 >= 240_000)).toBe(true)
    expect(plugin.testNotification).toHaveBeenCalledWith({ delay: expect.any(Number), banner: true })
    expect(plugin.testNotification.mock.calls[0][0].delay).toBeGreaterThanOrEqual(40)
    expect(logs.join('\n')).toContain('[note] boîte {"count":1,"scores":[4]}')
  })

  it('notifications non autorisées : le dit et ne déclenche rien', async () => {
    const plugin = eveningNote({ notifications: false })
    const logs = []
    const signal = vi.fn(async () => {})
    await probeEveningNote({ signal, waitAck: async () => true, wait: async () => {}, log: (m) => logs.push(m), plugin })
    expect(plugin.testNotification).not.toHaveBeenCalled()
    expect(signal).not.toHaveBeenCalled()
    expect(logs.join('\n')).toMatch(/\[note\] essai notifications non autorisées/)
  })
})

describe('sonde du rappel de portion (I5)', () => {
  function portionReminder({ notifications = true } = {}) {
    let open = false
    return {
      schedule: vi.fn(async ({ items }) => ({ count: items.length, notifications })),
      takeOpen: vi.fn(async () => {
        const was = open
        open = false
        return { open: was }
      }),
      touch: () => {
        open = true
      },
    }
  }

  it('rappel programmé par la vraie méthode, touché par le test d’interface : page et toucher relevés', async () => {
    const plugin = portionReminder()
    const order = []
    const logs = []
    const location = { pathname: '/settings' }
    const waitAck = vi.fn(async (name) => {
      order.push(`ack ${name}`)
      if (name === 'rappel-portion') plugin.touch() // toucher du test d'interface, l'app ne l'a pas encore lu
      return true
    })
    await probePortionReminder({ signal: async (n) => order.push(`signal ${n}`), waitAck, wait: async () => {}, log: (m) => logs.push(m), plugin, location, now: () => 1_000_000 })
    expect(order).toEqual(['signal rappel-portion', 'ack rappel-portion'])
    expect(waitAck.mock.calls.every(([, tries]) => tries * 300 >= 240_000)).toBe(true)
    const [{ items }] = plugin.schedule.mock.calls[0]
    expect(items).toHaveLength(1)
    expect(items[0].at - 1_000_000).toBeGreaterThanOrEqual(40_000)
    expect(items[0].title).toBe('Votre portion du jour')
    expect(logs.join('\n')).toContain('[portion] après le toucher {"page":"/settings","open":true}')
    // l'essai ne laisse aucun rappel derrière lui
    expect(plugin.schedule).toHaveBeenLastCalledWith({ items: [] })
  })

  it('notifications non autorisées : le dit, ne signale rien et ne laisse aucun rappel', async () => {
    const plugin = portionReminder({ notifications: false })
    const logs = []
    const signal = vi.fn(async () => {})
    await probePortionReminder({ signal, waitAck: async () => true, wait: async () => {}, log: (m) => logs.push(m), plugin, location: { pathname: '/' }, now: () => 0 })
    expect(signal).not.toHaveBeenCalled()
    expect(plugin.schedule).toHaveBeenLastCalledWith({ items: [] })
    expect(logs.join('\n')).toMatch(/\[portion\] essai notifications non autorisées/)
  })
})
