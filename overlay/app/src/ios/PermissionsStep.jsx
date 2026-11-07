/**
 * Version iOS (HealthTrack-iOS) — étape « Autorisations » de l'accueil (retours du premier testeur iPhone, 06/11, point 5,
 * décision du propriétaire) : la position approximative (météo) et l'appareil photo demandés avant d'entrer dans
 * l'app, chacun sur un geste (« Autoriser »), avec sa raison ; « Continuer » reste toujours possible (rien n'est
 * obligatoire). L'app Santé a sa propre étape juste avant. La position suit le même chemin que la carte météo de
 * Sources (explication `location`, position lue une fois, arrondie à ≈ 10 km par `enableWeather`) ; l'appareil photo
 * passe par `FaceSense.requestCamera`, qui n'active pas la lecture du visage.
 */
import { useState } from 'react'
import useDisclosure from '../hooks/useDisclosure'
import { getWeatherSettings, enableWeather, syncWeather } from '../services/weatherSync'
import { getApproxPosition } from '../services/approxPosition' // Android v856 : la même position que son écran météo
import { faceSensePlugin } from '../services/faceSense'
import { requestCamera } from './cameraPermission'

const weatherOn = () => {
  const w = getWeatherSettings()
  return !!(w.enabled && w.location)
}

// Styles en ligne : tout le CSS de l'app est chargé d'emblée par `pageStyles.js` d'Android (bundleGuard.test.js) ;
// l'étape reprend les classes de l'accueil et n'ajoute que l'espacement
const LIST = { listStyle: 'none', margin: '8px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 20 }
const TITLE = { margin: 0, fontWeight: 600 }
const TEXT = { margin: '4px 0 10px' }

function Permission({ title, text, state, onAllow, busy, messages }) {
  return (
    <li>
      <p style={TITLE}>{title}</p>
      <p className="onb-lead" style={TEXT}>{text}</p>
      {messages[state] ? (
        <p className={`onb-note${state === 'granted' ? ' onb-note-ok' : ''}`} role="status">{messages[state]}</p>
      ) : (
        <button type="button" className="btn btn-secondary onb-action" onClick={onAllow} disabled={busy}>
          Autoriser
        </button>
      )}
    </li>
  )
}

/**
 * @param {{ getPosition?: Function, sync?: Function, camera?: Function, cameraAvailable?: boolean }} props
 */
export default function PermissionsStep({
  getPosition = getApproxPosition,
  sync = syncWeather,
  camera = requestCamera,
  cameraAvailable = faceSensePlugin() != null,
}) {
  const [disclosure, askConsent] = useDisclosure()
  const [location, setLocation] = useState(() => (weatherOn() ? 'granted' : null))
  const [cam, setCam] = useState(null)
  const [busy, setBusy] = useState(false)

  async function allowLocation() {
    if (!(await askConsent('location'))) {
      setLocation('later')
      return
    }
    setBusy(true)
    try {
      const pos = await getPosition()
      enableWeather({ ...pos, name: null })
      setLocation('granted')
      sync({ force: true }).catch(() => {})
    } catch {
      setLocation('denied')
    } finally {
      setBusy(false)
    }
  }

  async function allowCamera() {
    setBusy(true)
    try {
      setCam(await camera())
    } catch {
      setCam('denied')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {disclosure}
      <h1 className="onb-title">Ce que Halcya peut utiliser</h1>
      <p className="onb-lead">Autorisez maintenant ce que vous voulez : rien n’est obligatoire, et tout se change plus tard.</p>
      <ul style={LIST}>
        <Permission
          title="Position approximative"
          text="Pour la météo, la pression et les pollens de votre ville. Lue une fois, arrondie à environ 10 km."
          state={location}
          onAllow={allowLocation}
          busy={busy}
          messages={{
            granted: 'Position autorisée : la météo de votre ville arrive.',
            denied: 'Position non autorisée. Vous pourrez choisir une ville dans Sources, ou la changer dans Réglages › Halcya.',
            later: 'Vous pourrez choisir une ville plus tard dans Sources.',
          }}
        />
        {cameraAvailable && (
          <Permission
            title="Appareil photo"
            text="Pour photographier vos repas et, si vous le voulez, estimer la forme de vos selles ou lire votre visage."
            state={cam}
            onAllow={allowCamera}
            busy={busy}
            messages={{
              granted: 'Appareil photo autorisé.',
              denied: 'Appareil photo non autorisé. Vous pourrez le changer dans Réglages › Halcya.',
            }}
          />
        )}
      </ul>
    </>
  )
}
