import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// Version iOS (HealthTrack-iOS), étape I6 : l'achat est ouvert sur iPhone. Paramètres dit les analyses comprises,
// comme sur Google Play, et un abonné de l'App Store gère son abonnement chez Apple (jamais « Google Play »).
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore'), STORE: actual.storeFor('appstore') }
})

import Settings from './Settings'
import { DebugProvider } from '../contexts/DebugContext'

const renderSettings = () => render(<DebugProvider><BrowserRouter><Settings /></BrowserRouter></DebugProvider>)
const subscribed = { premium: true, source: 'appstore', state: 'active', tier: 'silver', productId: 'halcya_premium', expiresAt: '2099-01-01T00:00:00.000Z' }
const credits = { plan: 'premium', remaining: 9, daily: 10, resetAt: '2099-11-01T00:00:00.000Z', state: 'active' }
const relayAnswer = (ent) => vi.fn((url) => Promise.resolve({
  ok: true, status: 200, json: () => Promise.resolve(String(url).endsWith('/v1/credits') ? { credits } : { ok: true, ...ent }),
}))

describe('Paramètres sur iPhone : abonnement de l’App Store', () => {
  beforeEach(() => localStorage.clear())

  it('abonné : « Gérer mon abonnement dans l’App Store » mène aux abonnements du compte Apple', async () => {
    localStorage.setItem('halcya_entitlement', JSON.stringify(subscribed))
    globalThis.fetch = relayAnswer(subscribed)
    const { container } = renderSettings()
    const manage = await screen.findByRole('link', { name: 'Gérer mon abonnement dans l’App Store' })
    expect(manage).toHaveAttribute('href', 'https://apps.apple.com/account/subscriptions')
    expect(container).not.toHaveTextContent(/Google Play/)
  })

  it('sans abonnement : les analyses comprises sont dites, comme sur Google Play', async () => {
    globalThis.fetch = relayAnswer({ premium: false })
    renderSettings()
    expect(await screen.findByTestId('ai-credits')).toBeInTheDocument()
    const block = screen.getByText('Analyse des repas (IA)').closest('.settings-block')
    expect(block).toHaveTextContent(/Sans abonnement : 10 analyses offertes/)
    expect(block).toHaveTextContent(/Silver : 10 par jour, Gold : 20\./)
  })

  it('Gold acheté dans l’App Store : 20 analyses par jour (Android v702, POL-PLAY-95)', async () => {
    const gold = { ...subscribed, tier: 'gold', productId: 'halcya_gold_mensuel' }
    localStorage.setItem('halcya_entitlement', JSON.stringify(gold))
    globalThis.fetch = relayAnswer(gold)
    renderSettings()
    expect(await screen.findByText('Avec Gold : jusqu’à 20 analyses par jour.')).toBeInTheDocument()
  })

  it('Premium acheté dans l’App Store : Silver, 10 analyses par jour', async () => {
    const silver = { ...subscribed, productId: 'halcya_premium_mensuel' }
    localStorage.setItem('halcya_entitlement', JSON.stringify(silver))
    globalThis.fetch = relayAnswer(silver)
    renderSettings()
    expect(await screen.findByText('Avec Silver : jusqu’à 10 analyses par jour.')).toBeInTheDocument()
  })

  it('période de test : Gold offert sur iPhone aussi, donc 20 analyses par jour', async () => {
    globalThis.fetch = relayAnswer({ premium: true, source: 'launch', launchUntil: '2099-11-19T23:00:00.000Z' })
    renderSettings()
    expect(await screen.findByText('Pendant le test : jusqu’à 20 analyses par jour, sans rien payer.')).toBeInTheDocument()
  })
})
