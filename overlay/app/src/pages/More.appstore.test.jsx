import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// Version iOS (HealthTrack-iOS) : Réglages → Confidentialité ouvre la page propre à l'iPhone (correctif 26)
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

  it('ne montre pas les conditions d’Android (Google Play), en attendant celles de l’iPhone', () => {
    render(<MemoryRouter initialEntries={['/plus']}><More changelog={[]} /></MemoryRouter>)
    expect(screen.queryByRole('link', { name: /Conditions/ })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Nouveautés/ })).toBeInTheDocument()
  })
})
