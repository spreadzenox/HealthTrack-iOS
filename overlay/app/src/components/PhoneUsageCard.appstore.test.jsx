import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Version iOS (HealthTrack-iOS) : le temps d'écran n'existe que dans l'app Android
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore') }
})

import PhoneUsageCard from './PhoneUsageCard'

describe('Temps d’écran sur iPhone (variante appstore)', () => {
  it('dit que ce n’est pas encore sur iPhone, sans renvoi vers l’app Android', () => {
    render(<PhoneUsageCard available={false} />)
    expect(screen.getByText('Pas encore disponible sur iPhone.')).toBeInTheDocument()
    expect(screen.queryByText(/app Android/)).not.toBeInTheDocument()
  })
})
