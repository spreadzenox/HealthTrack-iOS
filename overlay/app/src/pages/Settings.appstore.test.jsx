import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// Version iOS (HealthTrack-iOS) : rien n'est vendu sur iPhone. Paramètres ne parle donc ni d'abonnement ni de premium
// dans l'analyse IA ; le nombre d'analyses restantes, relu auprès du relais, dit ce qui reste (correctif 31)
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore') }
})

import Settings from './Settings'
import { DebugProvider } from '../contexts/DebugContext'

const renderSettings = () => render(<DebugProvider><BrowserRouter><Settings /></BrowserRouter></DebugProvider>)
const credits = { plan: 'premium', remaining: 9, daily: 10, resetAt: '2099-11-01T00:00:00.000Z', state: 'launch' }
const relayAnswer = () => vi.fn((url) => Promise.resolve({
  ok: true, status: 200, json: () => Promise.resolve(String(url).endsWith('/v1/credits') ? { credits } : { ok: true, premium: false }),
}))

describe('Paramètres sur iPhone : l’analyse IA sans abonnement', () => {
  beforeEach(() => {
    localStorage.clear()
    globalThis.fetch = relayAnswer()
  })

  it('ni « abonnement » ni « premium » ; les analyses restantes relues auprès du relais', async () => {
    renderSettings()
    expect(screen.getByText('Analyse des repas (IA)')).toBeInTheDocument()
    expect(await screen.findByTestId('ai-credits')).toBeInTheDocument()
    const block = screen.getByText('Analyse des repas (IA)').closest('.settings-block')
    expect(block).not.toHaveTextContent(/abonnement|premium/i)
  })
})
