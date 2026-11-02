/**
 * Version iOS (HealthTrack-iOS) : l'app iPhone se signale au relais par l'en-tête `X-Platform: ios`, que lit
 * `requestPlatform` (relay/src/integrity.js d'Android) et qu'autorise son CORS. Sans lui, le relais devine l'iPhone à
 * `X-Integrity-Status: no_plugin`, valeur qu'App Attest remplace sur le simulateur (`unsupported`) ; la vérification
 * des droits (`/v1/subscription/verify`) ne portait rien du tout, alors que la période de lancement doit s'arrêter
 * plus tôt sur iPhone (décision du propriétaire du 2/11). Rien sur Android.
 */
import { DISTRIBUTION } from '../config/distribution'

export const IOS_PLATFORM_HEADER = Object.freeze({ 'X-Platform': 'ios' })

/** En-têtes de plateforme d'une requête au relais : `X-Platform: ios` dans la version App Store, rien ailleurs. */
export const platformHeaders = (distribution = DISTRIBUTION) => (distribution === 'appstore' ? { ...IOS_PLATFORM_HEADER } : {})
