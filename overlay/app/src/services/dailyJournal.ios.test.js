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

// Version iOS : une nuit écrite dans l'app Santé par plusieurs sources (Apple Watch avec ses phases, l'iPhone « au
// lit », une app de sommeil) garde une seule source (sleepSources.js d'Android, v607) : toutes ont la source
// `health_connect` (même connecteur), seul `sourceName` (nom de la source HealthKit) les distingue
const BEDTIME = new Date('2026-10-07T23:00:00').getTime()
const night = (sourceName, sleepState, fromMin, mins) => {
  const at = BEDTIME + fromMin * 60000
  const endDate = new Date(at + mins * 60000).toISOString()
  return { type: 'sleep', source: 'health_connect', at: new Date(at).toISOString(), payload: { durationMinutes: mins, sleepState, endDate, sourceName } }
}

describe('Journal : une nuit de l’app Santé comptée une fois (iPhone)', () => {
  it('Apple Watch, iPhone et une app de sommeil sur la même nuit : 7 h, pas 14 h', () => {
    const watch = [night('Apple Watch', 'light', 0, 240), night('Apple Watch', 'deep', 240, 60), night('Apple Watch', 'rem', 300, 120)]
    const app = night('AutoSleep', 'asleep', 0, 420)
    const phone = night('iPhone', 'inBed', -15, 480)
    const days = buildDailyJournal([...watch, app, phone])
    expect(days.map((d) => d.summary.sleepMinutes)).toEqual([420])
  })
})
