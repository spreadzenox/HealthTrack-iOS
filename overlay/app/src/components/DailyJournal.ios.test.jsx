import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// Version iOS (HealthTrack-iOS), correctif 57 : dans le Journal, la tuile « VFC (SDNN) » (la VFC de l'app Santé) dit
// son « d'habitude » quand l'écart est net, comme la VFC nuit d'Android, contre sa propre habitude en SDNN
vi.mock('../storage/localHealthStorage', async (orig) => ({
  ...(await orig()),
  listEntries: vi.fn(),
  countEntries: vi.fn(async () => 0),
}))
vi.mock('react-router-dom', async (importOriginal) => ({ ...(await importOriginal()), useNavigate: () => vi.fn() }))

import DailyJournal from './DailyJournal'

function sdnnHistory() {
  const out = []
  const now = new Date()
  for (let back = 12; back >= 1; back--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - back, 4)
    const value = back === 1 ? 70 : 46 + (back % 3) * 2
    out.push({ id: `s${back}`, type: 'heart_rate', source: 'health_connect', at: d.toISOString(), payload: { subtype: 'heartRateVariabilitySdnn', value, unit: 'millisecond' } })
  }
  return out
}

describe('Journal : « d’habitude » de la VFC de l’app Santé (iPhone)', () => {
  it('la tuile « VFC (SDNN) » d’hier, nettement plus haute, dit son habitude en SDNN', async () => {
    const { listEntries } = await import('../storage/localHealthStorage')
    const hist = sdnnHistory()
    listEntries.mockImplementation(async (q = {}) => (!q.type || q.type === 'heart_rate' ? hist : []))
    render(<BrowserRouter><DailyJournal /></BrowserRouter>)
    // Android v960 (MONO-CHIFFRES) découpe la valeur (chiffres en mono) : on la retrouve par son texte complet
    const tile = (await screen.findByText((_, el) => el?.tagName === 'DD' && el.textContent.replace(/\s+/g, ' ') === '70 ms')).closest('.day-summary-item')
    expect(tile).toHaveTextContent('VFC (SDNN)')
    await waitFor(() => expect(tile).toHaveTextContent('d’habitude 48 ms'))
    expect(tile.querySelector('.day-summary-usual')).toHaveAttribute('aria-label', 'VFC plus haute')
  })
})
