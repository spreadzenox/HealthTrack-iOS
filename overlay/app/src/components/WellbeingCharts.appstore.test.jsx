import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Version iOS (HealthTrack-iOS) : la lecture du visage n'est pas encore sur iPhone (I7) → l'historique vide n'invite pas à l'activer
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore') }
})

vi.mock('../storage/localHealthStorage', () => ({
  listEntries: vi.fn().mockResolvedValue([]),
  countEntries: vi.fn().mockResolvedValue(0),
  listEntriesForAnalysis: vi.fn().mockResolvedValue([]),
}))

vi.mock('../services/analysisEngine', () => ({
  computeTodayPrediction: vi.fn(),
}))

import WellbeingCharts from './WellbeingCharts'

describe('Historique du bien-être sur iPhone (variante appstore)', () => {
  it('sans aucune note : invite à noter son bien-être, sans parler d’activer la lecture du visage', async () => {
    render(<WellbeingCharts />)
    expect((await screen.findAllByText(/Pas encore de bien-être noté\. Notez-le avec «.Noter moi-même.», dans la carte Bien-être estimé\./)).length).toBeGreaterThan(0)
    expect(screen.queryByText(/Activez la lecture du visage/)).not.toBeInTheDocument()
  })
})
