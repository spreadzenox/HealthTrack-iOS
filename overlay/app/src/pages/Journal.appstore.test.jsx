import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// Version iOS (HealthTrack-iOS, correctif 42) : Android v809 (SELLES-PHOTO-2) ajoute « Selles : estimer la forme avec
// une photo », envoyée à l'IA du relais. Sur iPhone, masquée jusqu'à la soumission à Apple (7 ou 8/11) : la phrase
// d'accès à la caméra, la page de confidentialité de l'iPhone et « Confidentialité de l'app » (photo de selles = donnée
// de santé chez Apple) ne la couvrent pas encore ; décision demandée au propriétaire (POUR-ORCHESTRATEUR.md, 5/11)
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore') }
})
vi.mock('../storage/localHealthStorage', () => ({
  listEntries: vi.fn(),
  countEntries: vi.fn(),
  deleteEntry: vi.fn(),
  updateEntry: vi.fn(),
}))
vi.mock('react-router-dom', async (importOriginal) => ({ ...(await importOriginal()), useNavigate: () => vi.fn() }))

import Journal from './Journal'

const ONBOARDING_KEY = 'healthtrack_onboarding'

describe('Journal sur iPhone : pas de photo des selles avant la soumission (correctif 42)', () => {
  beforeEach(async () => {
    const { listEntries, countEntries } = await import('../storage/localHealthStorage')
    listEntries.mockResolvedValue([])
    countEntries.mockResolvedValue(0)
  })

  it('même avec l’objectif « Mon ventre », aucun bouton « estimer la forme avec une photo »', async () => {
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify({ done: true, goal: 'gut' }))
    render(<BrowserRouter><Journal /></BrowserRouter>)
    await screen.findByText('Vos derniers jours')
    expect(screen.queryByRole('button', { name: /estimer la forme avec une photo/ })).toBeNull()
    localStorage.removeItem(ONBOARDING_KEY)
  })
})
