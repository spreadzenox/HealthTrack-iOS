import { describe, it, expect } from 'vitest'
import { resolveDistribution, featuresFor, DISTRIBUTIONS } from './distribution'

// Variante iOS (App Store), ajoutée par le dépôt HealthTrack-iOS (patches/01-variante-appstore.patch)
describe('variante appstore (iOS)', () => {
  it('est reconnue, sans tenir compte de la casse ni des espaces', () => {
    expect(DISTRIBUTIONS).toContain('appstore')
    expect(resolveDistribution('appstore')).toBe('appstore')
    expect(resolveDistribution(' AppStore ')).toBe('appstore')
  })

  it('se comporte comme play : relais IA, lecture du visage à l’ouverture, pas d’auto-mise à jour', () => {
    expect(featuresFor('appstore')).toMatchObject({
      selfUpdate: false,
      faceUnlock: false,
      faceAppOpen: true,
      aiRelay: true,
      debugMenu: false,
      withingsApi: false,
      gadgetbridgeGuide: false,
      cigaretteSetting: false,
    })
  })

  it("pas encore d'abonnement App Store (étape I6) : rien n'appelle Google Play Billing", () => {
    expect(featuresFor('appstore').billing).toBe(false)
  })

  it('ne change rien aux variantes Android', () => {
    expect(featuresFor('play')).toMatchObject({ faceAppOpen: true, aiRelay: true, billing: true, selfUpdate: false })
    expect(featuresFor('sideload')).toMatchObject({ faceAppOpen: false, aiRelay: false, billing: false, selfUpdate: true })
  })
})
