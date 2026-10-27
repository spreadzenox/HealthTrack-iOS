import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// Version iOS (HealthTrack-iOS) : la carte Health Connect dit pourquoi elle est indisponible sur iPhone,
// sans renvoyer vers les réglages d'Android ni proposer de revérifier
vi.mock('../connectors/connectorRegistry', () => ({
  CONNECTORS: [
    {
      id: 'health_connect',
      name: 'Health Connect',
      description: 'Montres et apps santé',
      dataTypes: ['steps', 'sleep'],
      isAvailable: vi.fn().mockResolvedValue(false),
      availabilityDetails: vi.fn().mockResolvedValue({ available: false, reason: 'ios', platform: 'ios' }),
      checkPermissions: vi.fn().mockResolvedValue('not_asked'),
      requestPermissions: vi.fn().mockResolvedValue('denied'),
      openHealthConnectSettings: vi.fn().mockResolvedValue(false),
      sync: vi.fn(),
    },
  ],
}))
vi.mock('../storage/localHealthStorage', () => ({
  upsertEntries: vi.fn(), getLatestEntryAt: vi.fn().mockResolvedValue(null), listEntries: vi.fn().mockResolvedValue([]),
}))
vi.mock('../settings/connectorSettings', () => ({
  getConnectorSettings: vi.fn().mockReturnValue({ enabled: true, lastSyncAt: null, lastSyncResult: null }),
  setConnectorSettings: vi.fn(),
}))
vi.mock('../devices/phoneApps', () => ({
  detectPhoneApps: vi.fn().mockResolvedValue(null),
  openPhoneApp: vi.fn(),
}))

import Connectors from './Connectors'

describe('Carte Health Connect sur iPhone', () => {
  it('annonce l’app Santé d’Apple, sans réglages Android ni bouton « Revérifier »', async () => {
    render(<MemoryRouter><Connectors /></MemoryRouter>)
    expect(await screen.findByText(/Health Connect est propre à Android/)).toBeInTheDocument()
    expect(screen.getByText(/Halcya lira bientôt l’app Santé d’Apple/)).toBeInTheDocument()
    expect(screen.queryByText(/Mises à jour du système Google/)).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Revérifier la disponibilité/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Ouvrir les paramètres Health Connect/ })).not.toBeInTheDocument()
  })
})
