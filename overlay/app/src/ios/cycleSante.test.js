import { describe, it, expect, vi } from 'vitest'

// Version iOS (HealthTrack-iOS), CYCLE-iOS-1 (décision du propriétaire du 10/11, « Ok cycle ») : le cycle noté dans
// l'app Santé, lu par le plugin natif `CycleHealth`, rangé avec la brique partagée d'Android (`services/cycle.js`).
import { cycleEntriesFromSante, syncCycleFromSante, CYCLE_SANTE_SOURCE, requestSanteAuthorization, askCycleAfterOnboarding, IOS_HEALTHKIT_ASKED_KEY } from './cycleSante'
import { cycleByDay, periodEntry, symptomEntry } from '../services/cycle'

const noon = (y, m, d, h = 0) => new Date(y, m - 1, d, h).getTime()

describe('Cycle de l’app Santé → entrées partagées (iPhone)', () => {
  it('règles, saignement hors des règles et symptômes deviennent les entrées de la brique partagée, source Santé', () => {
    const entries = cycleEntriesFromSante([
      { kind: 'period', flow: 'medium', start: noon(2026, 11, 8), sourceName: 'Santé' },
      { kind: 'spotting', start: noon(2026, 11, 20) },
      { kind: 'symptom', symptom: 'cramps', start: noon(2026, 11, 8, 9), sourceName: 'Clue' },
    ])
    expect(entries).toHaveLength(3)
    expect(entries.every((e) => e.type === 'cycle' && e.source === CYCLE_SANTE_SOURCE)).toBe(true)
    expect(CYCLE_SANTE_SOURCE).toBe('health_connect')
    // mêmes heures que la saisie à la main : le dédoublonnage (source, type, heure) garde chaque sous-type d'un jour
    const period = entries.find((e) => e.payload.subtype === 'period')
    expect(period.at).toBe(periodEntry('2026-11-08', 'medium').at)
    expect(period.payload).toMatchObject({ subtype: 'period', flow: 'medium', sourceName: 'Santé', connector: 'health_connect' })
    expect(entries.find((e) => e.payload.subtype === 'symptom').at).toBe(symptomEntry('2026-11-08', 'cramps').at)
    // la brique partagée y lit le cycle
    expect(cycleByDay(entries, ['2026-11-09'])).toBeTruthy()
  })

  it('le jour est celui de l’heure locale du début (une saisie de Santé commence à minuit)', () => {
    const [e] = cycleEntriesFromSante([{ kind: 'period', flow: 'light', start: noon(2026, 11, 3, 0) }])
    expect(e.at).toBe(periodEntry('2026-11-03', 'light').at)
  })

  it('un même jour vu deux fois (deux apps écrivent dans Santé) ne donne qu’une entrée par sous-type', () => {
    const entries = cycleEntriesFromSante([
      { kind: 'period', flow: 'light', start: noon(2026, 11, 8) },
      { kind: 'period', flow: 'heavy', start: noon(2026, 11, 8, 7) },
      { kind: 'symptom', symptom: 'bloating', start: noon(2026, 11, 8) },
      { kind: 'symptom', symptom: 'bloating', start: noon(2026, 11, 8, 18) },
    ])
    expect(entries).toHaveLength(2)
    // la plus forte des deux saisies de flux, pas la dernière lue (l'ordre des apps n'a pas de sens)
    expect(entries.find((e) => e.payload.subtype === 'period').payload.flow).toBe('heavy')
  })

  it('rien d’inconnu ni d’invalide : sous-type, symptôme ou date hors de la brique partagée ignorés', () => {
    expect(cycleEntriesFromSante([
      { kind: 'symptom', symptom: 'constipation', start: noon(2026, 11, 8) },
      { kind: 'ovulation', start: noon(2026, 11, 8) },
      { kind: 'period', flow: 'medium' },
      null,
    ])).toEqual([])
    expect(cycleEntriesFromSante(undefined)).toEqual([])
    // un flux inconnu reste un jour de règles, flux non précisé
    expect(cycleEntriesFromSante([{ kind: 'period', flow: 'weird', start: noon(2026, 11, 8) }])[0].payload.flow).toBe('unknown')
  })

  it('la synchro lit Santé sur la période demandée et écrit les entrées', async () => {
    const plugin = { readCycle: vi.fn(async () => ({ samples: [{ kind: 'period', flow: 'medium', start: noon(2026, 11, 8) }] })) }
    const writer = vi.fn()
    const since = new Date(2026, 4, 10)
    const until = new Date(2026, 10, 10)
    expect(await syncCycleFromSante({ since, until, writer, plugin })).toBe(1)
    expect(plugin.readCycle).toHaveBeenCalledWith({ start: since.getTime(), end: until.getTime() })
    expect(writer).toHaveBeenCalledWith([expect.objectContaining({ type: 'cycle' })])
  })

  it('rien de lu (autorisation pas encore demandée, Santé vide) : rien d’écrit', async () => {
    const plugin = { readCycle: vi.fn(async () => ({ samples: [] })) }
    const writer = vi.fn()
    expect(await syncCycleFromSante({ since: new Date(2026, 10, 1), writer, plugin })).toBe(0)
    expect(writer).not.toHaveBeenCalled()
  })
})

// CYCLE-iOS-2 : une seule feuille d'Apple pour Santé et le cycle ; « Mon cycle » coché plus tard → le cycle seul
describe('Autorisation du cycle dans Santé (iPhone)', () => {
  it('demande les mesures et le cycle en une fois au plugin natif', async () => {
    const plugin = { requestAuthorization: vi.fn(async () => ({ asked: true })) }
    expect(await requestSanteAuthorization({ read: ['steps', 'sleep'], cycle: true, plugin })).toEqual({ asked: true })
    expect(plugin.requestAuthorization).toHaveBeenCalledWith({ read: ['steps', 'sleep'], cycle: true })
  })

  it('« Mon cycle » coché dans les Paramètres après un accueil où Santé a été autorisée : feuille du cycle, puis 6 mois relus', async () => {
    localStorage.setItem(IOS_HEALTHKIT_ASKED_KEY, '1')
    const plugin = {
      requestAuthorization: vi.fn(async () => ({ asked: true })),
      readCycle: vi.fn(async () => ({ samples: [{ kind: 'period', flow: 'light', start: noon(2026, 9, 2) }] })),
    }
    const writer = vi.fn()
    const now = new Date(2026, 10, 10, 20)
    expect(await askCycleAfterOnboarding({ platform: 'ios', plugin, writer, now })).toBe(1)
    expect(plugin.requestAuthorization).toHaveBeenCalledWith({ read: [], cycle: true })
    const { start, end } = plugin.readCycle.mock.calls[0][0]
    expect(Math.round((end - start) / 86400000)).toBe(183)
    expect(writer).toHaveBeenCalledWith([expect.objectContaining({ type: 'cycle' })])
    localStorage.clear()
  })

  it('rien sur Android, ni avant que Santé ait été autorisée à l’accueil (la feuille viendra avec les autres mesures)', async () => {
    const plugin = { requestAuthorization: vi.fn(), readCycle: vi.fn() }
    expect(await askCycleAfterOnboarding({ platform: 'android', plugin, writer: vi.fn() })).toBe(0)
    expect(await askCycleAfterOnboarding({ platform: 'ios', plugin, writer: vi.fn() })).toBe(0)
    expect(plugin.requestAuthorization).not.toHaveBeenCalled()
  })
})

