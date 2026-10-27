import { describe, it, expect, vi } from 'vitest'

// Version iOS (HealthTrack-iOS) : la divulgation avant l'autorisation parle de l'app Santé ; la VFC y figure comme
// sur Android (lue en SDNN sur iPhone, rangée à part : voir HealthConnectConnector)
vi.mock('./distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore') }
})

import { DISCLOSURES } from './permissionDisclosures'

describe('Divulgation Santé sur iPhone', () => {
  it('l’app Santé, réglable dans iOS, avec la VFC, sans Health Connect ni Android', () => {
    const d = DISCLOSURES.health_connect
    const text = [d.title, ...d.points, d.leaves].join(' ')
    expect(d.title).toBe('Avant d’autoriser l’app Santé')
    expect(text).toMatch(/iOS vous laisse choisir type par type/)
    expect(text).toMatch(/fréquence cardiaque, VFC, activité/)
    expect(text).not.toMatch(/Health Connect|Android/)
  })
})
