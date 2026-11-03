import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// Version iOS (HealthTrack-iOS, Android v749, FIN-LANCEMENT-1) : la carte « Gold offert jusqu'au … » n'apparaît
// jamais sur iPhone, même dans les 3 derniers jours de la période de l'iPhone (fin au 6/11 inclus, décision du
// propriétaire du 2/11) : l'examen d'Apple, le 7 ou le 8/11, doit voir l'écran d'achat, et l'app n'annonce pas de date
// d'ici là (Paramètres dit seulement « jusqu'au 6 nov. »)
const store = vi.hoisted(() => ({ id: 'appstore' }))
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore'), get STORE() { return actual.storeFor(store.id) } }
})

import LaunchEndCard from './LaunchEndCard'

const IOS_UNTIL = '2026-11-06T23:00:00Z'
const DAY = 86_400_000
const storeEnt = (ent) => localStorage.setItem('halcya_entitlement', JSON.stringify({ checkedAt: new Date().toISOString(), ...ent }))
const renderCard = (now) => render(<MemoryRouter><LaunchEndCard now={now} /></MemoryRouter>)

describe('Fin de Gold offert sur iPhone (variante appstore)', () => {
  beforeEach(() => {
    localStorage.clear()
    store.id = 'appstore'
    storeEnt({ premium: true, source: 'launch', state: 'active', tier: 'gold', launchUntil: IOS_UNTIL })
  })

  it('pas de carte dans les 3 derniers jours de la période de l’iPhone', () => {
    for (const before of [2.5, 1, 0.1]) {
      const { unmount } = renderCard(Date.parse(IOS_UNTIL) - before * DAY)
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
      expect(screen.queryByText(/Gold offert jusqu/)).not.toBeInTheDocument()
      unmount()
    }
  })

  it('témoin : le même droit, avec le magasin Google Play, montre la carte (le test voit bien la différence)', () => {
    store.id = 'play'
    renderCard(Date.parse(IOS_UNTIL) - DAY)
    expect(screen.getByText(/Gold offert jusqu.au 6 nov/)).toBeInTheDocument()
  })
})
