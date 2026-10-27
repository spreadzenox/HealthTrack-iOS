import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Version iOS (HealthTrack-iOS) : la détection des apps n'existe pas sur iPhone (null) → pas de renvoi vers « l’app Android »
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore') }
})

import MyDevices from './MyDevices'

describe('Mes appareils sur iPhone (variante appstore)', () => {
  it('annonce la lecture de l’app Santé à venir, sans parler de l’app Android', async () => {
    render(<MyDevices detect={async () => null} loadEntries={async () => []} />)
    expect(await screen.findByText(/Sur iPhone, Halcya lira bientôt vos mesures dans l’app Santé d’Apple/)).toBeInTheDocument()
    expect(screen.queryByText(/app Android/)).not.toBeInTheDocument()
  })

  it('mesures jamais reçues : conseille le partage vers l’app Santé, pas vers Health Connect', async () => {
    const at = new Date(Date.now() - 3600 * 1000).toISOString()
    const hc = (type) => ({ source: 'health_connect', at, type, payload: { sourceName: 'Garmin Connect' } })
    render(<MyDevices detect={async () => null} loadEntries={async () => [hc('sleep'), hc('heart_rate')]} />)
    expect(await screen.findByText(/activez ce partage vers l’app Santé dans Garmin Connect/)).toBeInTheDocument()
    expect(screen.queryByText(/Health Connect/)).not.toBeInTheDocument()
  })
})

