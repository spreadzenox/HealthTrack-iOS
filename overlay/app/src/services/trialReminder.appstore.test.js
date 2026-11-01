import { describe, it, expect } from 'vitest'
import { trialReminderPlan } from './trialReminder'

// Version iOS (HealthTrack-iOS), étape I6 : le rappel de fin d'essai promis par l'écran d'abonnement vaut aussi pour
// un essai de l'App Store (plugin TrialReminder en Swift), avec le nom et le lien de gestion de son magasin.
const now = Date.parse('2026-11-10T09:00:00Z')
const trial = (source) => ({
  premium: true, source, state: 'active', trial: true, autoRenewing: true, productId: 'halcya_premium', expiresAt: '2026-11-15T09:00:00Z',
})

describe('rappel de fin d’essai : un essai de l’App Store', () => {
  it('programmé 2 jours avant le premier paiement, avec « l’App Store » et la page d’abonnements d’Apple', () => {
    const plan = trialReminderPlan(trial('appstore'), now)
    expect(plan.at).toBe(Date.parse('2026-11-13T09:00:00Z'))
    expect(plan.title).toBe('Votre essai gratuit se termine dans 2 jours')
    expect(plan.body).toMatch(/Touchez pour gérer l’abonnement dans l’App Store\.$/)
    expect(plan.body).not.toMatch(/Google/)
    expect(plan.url).toBe('https://apps.apple.com/account/subscriptions')
  })

  it('un essai Google Play garde son texte et son lien', () => {
    const plan = trialReminderPlan(trial('play'), now)
    expect(plan.body).toMatch(/dans Google Play\.$/)
    expect(plan.url).toMatch(/^https:\/\/play\.google\.com\//)
  })

  it('rien pour la période de lancement, un essai annulé ou un abonnement payé', () => {
    expect(trialReminderPlan({ ...trial('appstore'), source: 'launch' }, now)).toBeNull()
    expect(trialReminderPlan({ ...trial('appstore'), autoRenewing: false }, now)).toBeNull()
    expect(trialReminderPlan({ ...trial('appstore'), trial: false }, now)).toBeNull()
  })
})
