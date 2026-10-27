import { describe, it, expect, vi } from 'vitest'

// Version iOS (HealthTrack-iOS) : le connecteur « health_connect » lit l'app Santé d'Apple ; ses entrées disent
// d'où elles viennent sur iPhone (Journal, tuiles de l'Accueil, rapport)
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore') }
})

import { SOURCE_LABELS, entrySourceLabel } from './today'

describe('Source des entrées importées sur iPhone', () => {
  it('« App Santé », avec l’app d’origine quand Santé la donne', () => {
    expect(SOURCE_LABELS.health_connect).toBe('App Santé')
    expect(entrySourceLabel({ source: 'health_connect', payload: { sourceName: 'Garmin Connect' } })).toBe('App Santé · Garmin Connect')
    expect(Object.values(SOURCE_LABELS).join(' ')).not.toMatch(/Health Connect/)
  })
})
