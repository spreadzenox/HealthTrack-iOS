import { describe, it, expect, vi } from 'vitest'

// Version iOS (HealthTrack-iOS) : le résumé du premier import (onboarding) nomme l'app Santé, pas Health Connect
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore') }
})

import { summarizeImport } from './firstImport'

const now = new Date('2026-10-20T12:00:00Z')
const steps = (day, value, sourceName) => ({
  type: 'steps',
  source: 'health_connect',
  at: `2026-10-${day}T10:00:00Z`,
  payload: { value, ...(sourceName ? { sourceName } : {}) },
})

describe('Résumé du premier import sur iPhone', () => {
  it('« via l’app Santé » avec l’app d’origine, « App Santé » sans elle', () => {
    const withOrigin = summarizeImport([steps('18', 6000, 'Garmin Connect'), steps('19', 8000, 'Garmin Connect')], now)
    expect(withOrigin.map((f) => f.source)).toContain('Garmin Connect via l’app Santé')
    const without = summarizeImport([steps('18', 6000), steps('19', 8000)], now)
    expect(without.map((f) => f.source)).toContain('App Santé')
    expect(JSON.stringify([withOrigin, without])).not.toMatch(/Health Connect/)
  })
})
