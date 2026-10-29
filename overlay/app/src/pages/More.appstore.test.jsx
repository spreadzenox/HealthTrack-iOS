import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// Version iOS (HealthTrack-iOS) : Réglages → Confidentialité et Conditions ouvrent les pages propres à l'iPhone
// (correctif 26)
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore') }
})

import More from './More'

describe('Réglages sur iPhone (variante appstore)', () => {
  it('ouvre la politique de confidentialité de l’iPhone, embarquée dans l’app', () => {
    render(<MemoryRouter initialEntries={['/plus']}><More changelog={[]} /></MemoryRouter>)
    const link = screen.getByRole('link', { name: /Confidentialité/ })
    expect(link).toHaveAttribute('href', '/confidentialite-iphone.html')
    expect(link).toHaveTextContent(/Ce qui reste sur le téléphone/)
  })

  it('ouvre les conditions d’utilisation de l’iPhone (sans Google Play ni abonnement), embarquées dans l’app', () => {
    render(<MemoryRouter initialEntries={['/plus']}><More changelog={[]} /></MemoryRouter>)
    const link = screen.getByRole('link', { name: /Conditions/ })
    expect(link).toHaveAttribute('href', '/conditions-iphone.html')
    expect(link).not.toHaveTextContent(/abonnement|remboursement/i)
    expect(screen.getByRole('link', { name: /Nouveautés/ })).toBeInTheDocument()
  })
})
