/**
 * Version iOS (HealthTrack-iOS), CYCLE-iOS-1 (décision du propriétaire du 10/11 vers 18:50, « Ok cycle ») : le cycle
 * noté dans l'app Santé (règles, saignements hors des règles, symptômes), lu par le plugin natif `CycleHealth`
 * (`ios/App/App/CycleHealthPlugin.swift`, correspondance dans `ios/HalcyaRules` › `CycleRule`) et rangé avec la brique
 * partagée d'Android (`services/cycle.js`) : mêmes entrées `type: 'cycle'`, mêmes heures, source `health_connect`
 * comme les autres mesures de Santé sur iPhone. Rien ne sort du téléphone. Le cycle reste un contexte, jamais une
 * cause ni un diagnostic.
 *
 * Échantillons rendus par le plugin : `{ kind: 'period', flow }`, `{ kind: 'spotting' }`,
 * `{ kind: 'symptom', symptom }`, avec `start` (ms) et `sourceName` (app qui a écrit dans Santé).
 */
import { localDateKey } from '../services/analysisEngine'
import { FLOWS, periodEntry, spottingEntry, symptomEntry } from '../services/cycle'

/** Source des mesures de l'app Santé sur iPhone (même connecteur que Health Connect sur Android). */
export const CYCLE_SANTE_SOURCE = 'health_connect'

/** Rang d'un flux : deux apps qui notent le même jour, on garde la saisie la plus forte (non précisé en dernier). */
const flowRank = (flow) => ['unknown', 'light', 'medium', 'heavy'].indexOf(FLOWS.includes(flow) ? flow : 'unknown')

function toEntry(sample, day) {
  if (sample.kind === 'period') return periodEntry(day, sample.flow, CYCLE_SANTE_SOURCE)
  if (sample.kind === 'spotting') return spottingEntry(day, CYCLE_SANTE_SOURCE)
  if (sample.kind === 'symptom') return symptomEntry(day, sample.symptom, CYCLE_SANTE_SOURCE)
  return null
}

/** Entrées de la brique partagée, une par jour et par sous-type (symptôme compris). */
export function cycleEntriesFromSante(samples) {
  const byAt = new Map()
  for (const s of samples || []) {
    if (!s || !Number.isFinite(s.start)) continue
    let entry = null
    try {
      entry = toEntry(s, localDateKey(new Date(s.start)))
    } catch {
      entry = null // symptôme hors de la brique partagée (constipation, diarrhée : DEMANDES.md du 10/11)
    }
    if (!entry) continue
    entry.payload = { ...entry.payload, connector: 'health_connect', ...(s.sourceName ? { sourceName: s.sourceName } : {}) }
    const seen = byAt.get(entry.at)
    if (seen && !(entry.payload.subtype === 'period' && flowRank(entry.payload.flow) > flowRank(seen.payload.flow))) continue
    byAt.set(entry.at, entry)
  }
  return [...byAt.values()]
}

/** Lit le cycle dans Santé entre `since` et `until`, l'écrit par `writer` ; rend le nombre d'entrées écrites. */
export async function syncCycleFromSante({ since, until, writer, plugin }) {
  // Plugin enregistré à la demande : sur Android et dans les tests qui simulent @capacitor/core, rien n'est touché
  const CycleHealth = plugin ?? (await import('@capacitor/core')).registerPlugin('CycleHealth')
  const res = await CycleHealth.readCycle({ start: since.getTime(), end: (until || new Date()).getTime() })
  const entries = cycleEntriesFromSante(res?.samples)
  if (entries.length) await writer(entries)
  return entries.length
}
