import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Version iOS (HealthTrack-iOS) : Health Connect est propre à Android ; HealthKit arrive à l'étape I4.
// D'ici là, le connecteur ne touche jamais au plugin (pas de demande d'autorisation HealthKit à moitié branchée).
vi.mock('@capgo/capacitor-health', () => ({
  Health: {
    isAvailable: vi.fn().mockResolvedValue({ available: true, platform: 'ios' }),
    checkAuthorization: vi.fn(),
    requestAuthorization: vi.fn(),
    readSamples: vi.fn(),
  },
}))

import { Health } from '@capgo/capacitor-health'
import { HealthConnectConnector, _resetHealthPluginCache } from './HealthConnectConnector'

beforeEach(() => {
  vi.clearAllMocks()
  _resetHealthPluginCache()
  window.Capacitor = { isNativePlatform: () => true, getPlatform: () => 'ios' }
})
afterEach(() => {
  delete window.Capacitor
})

describe('HealthConnectConnector sur iPhone', () => {
  it('se dit indisponible, raison « ios », sans appeler le plugin', async () => {
    const connector = new HealthConnectConnector()
    expect(await connector.isAvailable()).toBe(false)
    expect(await connector.availabilityDetails()).toMatchObject({ available: false, reason: 'ios', platform: 'ios' })
    expect(Health.isAvailable).not.toHaveBeenCalled()
  })

  it('ne demande jamais d’autorisation', async () => {
    const connector = new HealthConnectConnector()
    expect(await connector.requestPermissions()).toBe('denied')
    expect(Health.requestAuthorization).not.toHaveBeenCalled()
  })
})
