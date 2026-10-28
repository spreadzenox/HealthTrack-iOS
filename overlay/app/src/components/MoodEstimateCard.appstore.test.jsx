import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// Version iOS (HealthTrack-iOS) : la lecture du visage n'est pas encore sur iPhone (I7) → la carte vide n'y renvoie pas
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore') }
})

import MoodEstimateCard from './MoodEstimateCard'

const renderCard = (props) => render(<MemoryRouter><MoodEstimateCard data={null} onAddManual={() => {}} {...props} /></MemoryRouter>)

describe('Bien-être estimé sur iPhone (variante appstore)', () => {
  it('sans lecture du visage sur l’iPhone : « Noter moi-même », sans renvoi vers Sources', () => {
    renderCard()
    expect(screen.getByText('Notez votre bien-être du jour. Son estimation par la lecture du visage arrive bientôt sur iPhone.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Noter moi-même' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'L’activer dans Sources' })).not.toBeInTheDocument()
  })

  it('dès que la lecture du visage existe sur l’iPhone : l’invitation d’Android revient', () => {
    renderCard({ faceReading: true })
    expect(screen.getByRole('link', { name: 'L’activer dans Sources' })).toBeInTheDocument()
  })
})
