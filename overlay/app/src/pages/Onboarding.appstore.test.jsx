import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

// Version iOS (HealthTrack-iOS) : sur iPhone, les montres passent par l'app Santé d'Apple (lue à l'étape I4) ;
// ni Health Connect ni montre Huawei en direct dans l'onboarding
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore') }
})
const hc = vi.hoisted(() => ({
  id: 'health_connect',
  availabilityDetails: vi.fn(),
  checkPermissions: vi.fn(),
  requestPermissions: vi.fn(),
  sync: vi.fn(),
}))
vi.mock('../connectors/connectorRegistry', () => ({ getConnector: () => hc, CONNECTORS: [hc] }))

import Onboarding from './Onboarding'
import { saveOnboarding } from '../settings/onboarding'

const cont = () => screen.getByRole('button', { name: 'Continuer' })

describe('Onboarding sur iPhone (variante appstore)', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    hc.availabilityDetails.mockResolvedValue({ available: false, reason: 'ios', platform: 'ios' })
    hc.checkPermissions.mockResolvedValue('not_asked')
  })

  it('montres de l’app Santé ; app Santé absente : on le dit et on continue, sans Health Connect ni Huawei', async () => {
    saveOnboarding({ goal: 'energy', step: 2 })
    render(
      <MemoryRouter initialEntries={['/bienvenue']}>
        <Routes>
          <Route path="/bienvenue" element={<Onboarding />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.queryByRole('radio', { name: /Health Connect/ })).not.toBeInTheDocument()
    expect(screen.queryByRole('radio', { name: /compatible Huawei/ })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('radio', { name: /écrit dans l’app Santé/ }))
    fireEvent.click(cont())
    expect(screen.getByRole('heading', { name: 'Vos données de l’app Santé' })).toBeInTheDocument()
    expect(await screen.findByText(/L’app Santé n’est pas disponible sur cet appareil/)).toBeInTheDocument()
    expect(screen.queryByText(/Health Connect/)).not.toBeInTheDocument()
    expect(cont()).toBeEnabled()
  })

  it('app Santé disponible : « Autoriser l’app Santé »', async () => {
    hc.availabilityDetails.mockResolvedValue({ available: true, platform: 'ios' })
    saveOnboarding({ goal: 'energy', watch: 'health_connect', step: 3 })
    render(
      <MemoryRouter initialEntries={['/bienvenue']}>
        <Routes>
          <Route path="/bienvenue" element={<Onboarding />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(await screen.findByRole('button', { name: 'Autoriser l’app Santé' })).toBeInTheDocument()
    expect(screen.queryByText(/Health Connect/)).not.toBeInTheDocument()
  })
})
