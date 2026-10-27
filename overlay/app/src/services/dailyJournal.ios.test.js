import { describe, it, expect } from 'vitest'
import { buildDailyJournal } from './dailyJournal'
import { summaryChips } from './journalChips'

// Version iOS (HealthTrack-iOS) : la VFC de l'app Santé est en SDNN (`heartRateVariabilitySdnn`) ; le Journal la
// montre à part, jamais comme une fréquence cardiaque ni comme la VFC RMSSD d'Android
const sdnn = { type: 'heart_rate', source: 'health_connect', at: '2026-10-20T03:00:00Z', payload: { value: 48, unit: 'millisecond', subtype: 'heartRateVariabilitySdnn' } }
const hr = { type: 'heart_rate', source: 'health_connect', at: '2026-10-20T09:00:00Z', payload: { bpm: 70, subtype: 'heartRate' } }

describe('Journal : VFC en SDNN (iPhone)', () => {
  it('« VFC (SDNN) » à part ; ni fréquence cardiaque, ni VFC RMSSD', () => {
    const [day] = buildDailyJournal([sdnn, hr])
    expect(day.summary.hrvSdnn).toBe(48)
    expect(day.summary.hrv).toBeNull()
    const chips = summaryChips(day.summary)
    expect(chips).toContainEqual(['VFC (SDNN)', '48 ms'])
    expect(chips).toContainEqual(['FC', '70 bpm']) // la SDNN n'entre pas dans la fréquence cardiaque
    expect(chips.map(([label]) => label)).not.toContain('VFC')
  })
})
