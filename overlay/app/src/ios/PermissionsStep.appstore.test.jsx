import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

// Version iOS (HealthTrack-iOS) : étape « Autorisations » de l'accueil (retours du premier testeur, 06/11, point 5) :
// la position approximative (météo) et l'appareil photo demandés avant d'entrer dans l'app, chacun sur un geste
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore') }
})

import PermissionsStep from './PermissionsStep'
import { getWeatherSettings } from '../services/weatherSync'

const ANDROID = /Android|Health Connect|Google/

function props(over = {}) {
  return {
    getPosition: vi.fn(async () => ({ lat: 48.85, lon: 2.35 })),
    sync: vi.fn(async () => ({ ran: true })),
    camera: vi.fn(async () => 'granted'),
    cameraAvailable: true,
    ...over,
  }
}

describe('Accueil sur iPhone : position et appareil photo', () => {
  beforeEach(() => localStorage.clear())

  it('deux accès, chacun avec sa raison et « Autoriser », sans mot d’Android', () => {
    const { container } = render(<PermissionsStep {...props()} />)
    expect(screen.getByRole('heading', { name: 'Ce que Halcya peut utiliser' })).toBeInTheDocument()
    expect(screen.getByText('Position approximative')).toBeInTheDocument()
    expect(screen.getByText(/météo/)).toBeInTheDocument()
    expect(screen.getByText('Appareil photo')).toBeInTheDocument()
    expect(screen.getByText(/repas/)).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Autoriser' })).toHaveLength(2)
    expect(container.textContent).not.toMatch(ANDROID)
  })

  it('position : l’explication habituelle, puis la position lue une fois et la météo branchée', async () => {
    const p = props()
    render(<PermissionsStep {...p} />)
    fireEvent.click(screen.getAllByRole('button', { name: 'Autoriser' })[0])
    expect(await screen.findByText('Avant d’utiliser votre position')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'J’accepte, utiliser ma position' }))
    expect(await screen.findByText('Position autorisée : la météo de votre ville arrive.')).toBeInTheDocument()
    expect(p.getPosition).toHaveBeenCalledTimes(1)
    expect(getWeatherSettings().enabled).toBe(true)
    expect(getWeatherSettings().location).toMatchObject({ name: null }) // arrondie (≈ 10 km) par enableWeather
    await waitFor(() => expect(p.sync).toHaveBeenCalledWith({ force: true }))
  })

  it('position refusée par l’iPhone : on le dit, la ville reste possible dans Sources', async () => {
    const p = props({ getPosition: vi.fn(async () => { throw new Error('denied') }) })
    render(<PermissionsStep {...p} />)
    fireEvent.click(screen.getAllByRole('button', { name: 'Autoriser' })[0])
    fireEvent.click(await screen.findByRole('button', { name: 'J’accepte, utiliser ma position' }))
    expect(await screen.findByText(/Position non autorisée/)).toBeInTheDocument()
    expect(getWeatherSettings().enabled).toBeFalsy()
  })

  it('appareil photo : la demande de l’iPhone, puis « autorisé » ; refusé : où le changer', async () => {
    const p = props()
    const { unmount } = render(<PermissionsStep {...p} />)
    fireEvent.click(screen.getAllByRole('button', { name: 'Autoriser' })[1])
    expect(await screen.findByText('Appareil photo autorisé.')).toBeInTheDocument()
    expect(p.camera).toHaveBeenCalledTimes(1)
    unmount()
    render(<PermissionsStep {...props({ camera: vi.fn(async () => 'denied') })} />)
    fireEvent.click(screen.getAllByRole('button', { name: 'Autoriser' })[1])
    expect(await screen.findByText(/Réglages › Halcya/)).toBeInTheDocument()
  })

  it('sans module natif (hors de l’app) : pas de ligne pour l’appareil photo', () => {
    render(<PermissionsStep {...props({ cameraAvailable: false })} />)
    expect(screen.queryByText('Appareil photo')).toBeNull()
    expect(screen.getAllByRole('button', { name: 'Autoriser' })).toHaveLength(1)
  })

  it('météo déjà branchée : la position est dite autorisée, sans redemander', () => {
    localStorage.setItem('healthtrack_weather', JSON.stringify({ enabled: true, location: { lat: 1, lon: 2, name: null } }))
    render(<PermissionsStep {...props()} />)
    expect(screen.getByText('Position autorisée : la météo de votre ville arrive.')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Autoriser' })).toHaveLength(1)
  })
})
