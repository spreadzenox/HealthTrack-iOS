import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Version iOS (HealthTrack-iOS) : le même connecteur lit HealthKit (même plugin @capgo/capacitor-health, I4).
// HealthKit ne dit jamais si la lecture est accordée : « accordé » dès que la demande a été faite sur cet appareil.
// VFC : SDNN sur iOS contre RMSSD sur Android, pas encore séparées → ni demandée ni lue sur iPhone.
vi.mock('@capgo/capacitor-health', () => ({
  Health: {
    isAvailable: vi.fn(),
    checkAuthorization: vi.fn(),
    requestAuthorization: vi.fn(),
    readSamples: vi.fn(),
    queryAggregated: vi.fn(),
    queryWorkouts: vi.fn(),
  },
}))

import { Health } from '@capgo/capacitor-health'
import { HealthConnectConnector, _resetHealthPluginCache } from './HealthConnectConnector'

beforeEach(() => {
  vi.clearAllMocks()
  _resetHealthPluginCache()
  localStorage.clear()
  window.Capacitor = { isNativePlatform: () => true, getPlatform: () => 'ios' }
  Health.isAvailable.mockResolvedValue({ available: true, platform: 'ios' })
  Health.checkAuthorization.mockResolvedValue({ readAuthorized: [], readDenied: ['steps', 'sleep'], writeAuthorized: [], writeDenied: [] })
  Health.requestAuthorization.mockResolvedValue({ readAuthorized: [], readDenied: [], writeAuthorized: [], writeDenied: [] })
  Health.readSamples.mockResolvedValue({ samples: [] })
  Health.queryAggregated.mockResolvedValue({ samples: [] })
  Health.queryWorkouts.mockResolvedValue({ workouts: [] })
})
afterEach(() => {
  delete window.Capacitor
})

describe('HealthConnectConnector sur iPhone (HealthKit)', () => {
  it('disponible quand HealthKit l’est, indisponible (raison « ios ») sinon', async () => {
    const connector = new HealthConnectConnector()
    expect(await connector.availabilityDetails()).toMatchObject({ available: true, platform: 'ios' })
    expect(await connector.isAvailable()).toBe(true)
    Health.isAvailable.mockResolvedValue({ available: false, platform: 'ios' })
    expect(await new HealthConnectConnector().availabilityDetails()).toMatchObject({ available: false, reason: 'ios' })
  })

  it('pas encore demandé → « not_asked » ; après la demande → « granted », même si HealthKit dit tout refusé', async () => {
    const connector = new HealthConnectConnector()
    expect(await connector.checkPermissions()).toBe('not_asked')
    expect(await connector.requestPermissions()).toBe('granted')
    expect(await new HealthConnectConnector().checkPermissions()).toBe('granted')
    expect(connector.missingReadTypes).toEqual([])
  })

  it('ne demande ni ne lit la VFC (SDNN sur iOS, pas comparable à la RMSSD d’Android)', async () => {
    const connector = new HealthConnectConnector()
    await connector.requestPermissions()
    const asked = Health.requestAuthorization.mock.calls[0][0].read
    expect(asked).toContain('steps')
    expect(asked).not.toContain('heartRateVariability')
    await connector.sync({ since: new Date('2026-10-01T00:00:00Z'), until: new Date('2026-10-02T00:00:00Z'), writer: async () => {} })
    const read = [...Health.readSamples.mock.calls, ...Health.queryAggregated.mock.calls].map((c) => c[0].dataType)
    expect(read.length).toBeGreaterThan(0)
    expect(read).not.toContain('heartRateVariability')
  })

  it('carte de Sources : nom et description de l’app Santé, sans Health Connect', () => {
    const connector = new HealthConnectConnector()
    expect(connector.name).toBe('App Santé (montre, bague, balance…)')
    expect(connector.description).toMatch(/l’app Santé/)
    expect(`${connector.name} ${connector.description}`).not.toMatch(/Health Connect/)
  })
})
