import { useEffect, useState } from 'react'
import { formatAgo } from '../utils/timeAgo'
import { countAllEntries, importFromJson, parseBackup } from '../storage/localHealthStorage'
import { appLocale } from '../i18n/locale.js'
import { readDeviceSnapshot } from './snapshot.js'

const measures = (n) => `${n.toLocaleString(appLocale())} ${n > 1 ? 'mesures' : 'mesure'}`

/**
 * Version iOS (dépôt HealthTrack-iOS) : premier écran de l'onboarding. La sauvegarde iCloud n'emporte pas la base de
 * l'app (WebKit l'exclut, mesuré le 28/10), seulement la copie de secours de Documents (overlay/app/src/ios/snapshot.js) ;
 * après une restauration, ou si iOS a repris la base, l'onboarding revient et la copie est proposée d'emblée.
 * « Reprendre » = l'import « ajouter » de Vos données (entrées et profil) ; l'onboarding continue ensuite (les
 * autorisations sont à redonner sur un nouveau téléphone). Hors de l'app iPhone, `readDeviceSnapshot` rend null : rien.
 */
export default function SnapshotWelcome({
  read = readDeviceSnapshot,
  count = countAllEntries,
  parse = parseBackup,
  importBackup = importFromJson,
  now,
}) {
  const [offer, setOffer] = useState(null)
  const [state, setState] = useState(null) // null | 'running' | 'dismissed' | { done } | { error }

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const snapshot = await read()
        if (!snapshot || (await count()) > 0) return
        const n = parse(snapshot.text).entries.length
        if (alive && n > 0) setOffer({ ...snapshot, n })
      } catch {
        // pas d'offre : l'onboarding continue comme d'habitude
      }
    })()
    return () => {
      alive = false
    }
  }, [read, count, parse])

  if (!offer || state === 'dismissed') return null

  const restore = async () => {
    setState('running')
    try {
      const { imported, profileRestored } = await importBackup(offer.text, { merge: true })
      window.dispatchEvent(new CustomEvent('health-entries-updated'))
      setState({ done: `${measures(imported)} ${imported > 1 ? 'reprises' : 'reprise'}${profileRestored ? ', avec votre profil' : ''}.` })
    } catch (err) {
      setState({ error: `La copie n’a pas pu être reprise (${err?.message || 'erreur inconnue'}). Elle reste dans Vos données.` })
    }
  }

  if (state?.done || state?.error) {
    return (
      <p className={state.done ? 'onb-note onb-note-ok' : 'onb-note'} role="status">
        {state.done ?? state.error}
      </p>
    )
  }

  return (
    <div className="onb-note">
      <p className="onb-fine">
        <strong>Une copie de secours de vos données est sur ce téléphone</strong> ({measures(offer.n)}, enregistrée{' '}
        {formatAgo(offer.savedAt, now || new Date())}).
      </p>
      <button type="button" className="btn onb-action" onClick={restore} disabled={state === 'running'}>
        Reprendre mes données
      </button>
      <button type="button" className="onb-later" onClick={() => setState('dismissed')} disabled={state === 'running'}>
        Commencer sans
      </button>
    </div>
  )
}
