import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { fakeAppStoreBilling } from '../ios/captureMode.js'

// Version iOS (HealthTrack-iOS), étape I6 : l'achat est ouvert sur iPhone (relais d'Android, v689). L'écran
// d'abonnement est celui d'Android, avec le nom de l'App Store (VITE_STORE=appstore) : formules, prix et
// renouvellement près du bouton, « Restaurer un achat », conditions et confidentialité ; jamais « Google Play ».
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore'), STORE: actual.storeFor('appstore') }
})

import Premium from './Premium'

describe('Premium sur iPhone (variante appstore)', () => {
  beforeEach(() => {
    localStorage.clear()
    window.__HT_PLAY_BILLING__ = fakeAppStoreBilling()
    globalThis.fetch = vi.fn(() => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ ok: true, premium: false }) }))
  })

  it('propose Silver et Gold de l’App Store, essai et renouvellement dits près du bouton, sans parler de Google Play', async () => {
    const { container } = render(<MemoryRouter initialEntries={['/premium']}><Premium /></MemoryRouter>)
    expect(await screen.findByRole('button', { name: /Essayer 14 jours gratuitement/ })).toBeInTheDocument()
    expect(screen.getByText(/Puis 29,99 € par an\./)).toBeInTheDocument()
    expect(screen.getByText(/Annulable à tout moment dans l’App Store\./)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Restaurer un achat' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Conditions' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Confidentialité' })).toBeInTheDocument()
    expect(container).not.toHaveTextContent(/Google|arrive bientôt/)
  })
})
