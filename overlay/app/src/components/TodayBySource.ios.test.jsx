import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import TodayBySource from './TodayBySource'
import { defaultTrendsView } from '../services/trendsData'

// Version iOS (HealthTrack-iOS), correctif 56 : sur l'Accueil, la ligne « VFC (SDNN) » (la VFC de l'app Santé, que
// le correctif 30 range sous la clé `hrv`) ouvre sa courbe SDNN dans Tendances, pas la « VFC nuit » vide sur iPhone.
const NOW = new Date(2026, 10, 9, 10)
const wrap = (tiles) => render(
  <BrowserRouter>
    <TodayBySource now={NOW} entries={[]} summary={null} tiles={tiles} readNorms={async () => []} />
  </BrowserRouter>,
)

describe('Accueil : la VFC de l’app Santé ouvre sa courbe (iPhone)', () => {
  it('« VFC (SDNN) » mène à /tendances?mesure=hrvSdnn, en rose comme la VFC', () => {
    wrap([
      { key: 'sleep', label: 'Sommeil', value: '6 h 30', when: 'cette nuit', sources: ['Santé · Apple Watch'] },
      { key: 'hrv', label: 'VFC (SDNN)', value: '51 ms', when: 'hier', sources: ['Santé · Apple Watch'] },
    ])
    const link = screen.getByRole('link', { name: /VFC \(SDNN\).*51 ms/ })
    expect(link).toHaveAttribute('href', '/tendances?mesure=hrvSdnn')
    expect(link.closest('li')).toHaveAttribute('data-tone', 'rose')
    expect(screen.getByRole('link', { name: /Sommeil.*6 h 30/ })).toHaveAttribute('href', '/tendances?mesure=sleep')
    expect(defaultTrendsView({ asked: 'hrvSdnn' })).toEqual({ period: 'week', keys: ['hrvSdnn'] })
  })

  it('la VFC nuit (RMSSD) garde sa courbe', () => {
    wrap([{ key: 'hrv', label: 'VFC nuit', value: '42 ms', when: 'cette nuit', sources: ['Santé'] }])
    expect(screen.getByRole('link', { name: /VFC nuit.*42 ms/ })).toHaveAttribute('href', '/tendances?mesure=hrv')
  })
})
