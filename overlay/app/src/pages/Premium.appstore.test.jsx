import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// Version iOS (HealthTrack-iOS) : pas encore d'abonnement App Store (étape I6), et jamais de renvoi vers Google Play
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore') }
})

import Premium from './Premium'

describe('Premium sur iPhone (variante appstore)', () => {
  it("annonce l'abonnement App Store à venir, sans parler de Google Play", () => {
    render(<MemoryRouter initialEntries={['/premium']}><Premium /></MemoryRouter>)
    expect(screen.getByText(/Sur iPhone, l’abonnement par l’App Store arrive bientôt/)).toBeInTheDocument()
    expect(screen.queryByText(/version Google Play/)).not.toBeInTheDocument()
  })
})
