#!/usr/bin/env node
// Fiche App Store fr-FR (store/app-store/fr-FR) envoyée à App Store Connect par son API (I9, autorisation permanente du
// propriétaire : « mettre à jour la fiche App Store par l'API »). Ne touche qu'à une version encore « Prête à
// soumettre » : rien n'est publié ni soumis à l'examen (geste du propriétaire). Lancé par
// .github/workflows/store-push.yml avec la clé de l'environnement `appstore` (ASC_KEY_ID, ASC_ISSUER_ID, ASC_KEY_P8),
// jamais affichée. `--dry-run` : montre ce qui serait envoyé, sans réseau ni clé.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { sign } from 'node:crypto'
import { pathToFileURL } from 'node:url'

const DIR = join(import.meta.dirname, '..', 'store', 'app-store', 'fr-FR')
const API = 'https://api.appstoreconnect.apple.com'
const BUNDLE_ID = 'fr.jpesquet.sante'
const LOCALE = 'fr-FR'
const SITE = 'https://spreadzenox.github.io/HealthTrack-iOS'
export const PRIVACY_URL = `${SITE}/confidentialite/`
export const SUPPORT_URL = `${SITE}/assistance/`
/** États où App Store Connect laisse modifier la fiche d'une version. */
const EDITABLE = new Set(['PREPARE_FOR_SUBMISSION', 'DEVELOPER_REJECTED', 'REJECTED', 'METADATA_REJECTED'])

const read = (name, dir = DIR) => readFileSync(join(dir, name), 'utf8').replace(/\n+$/, '')

/** Champs de la fiche : ceux de l'app (nom, sous-titre, confidentialité) et ceux de la version. */
export function fiche(dir = DIR) {
  return {
    info: { name: read('name.txt', dir), subtitle: read('subtitle.txt', dir), privacyPolicyUrl: PRIVACY_URL },
    version: {
      description: read('description.txt', dir),
      keywords: read('keywords.txt', dir),
      promotionalText: read('promotional-text.txt', dir),
      supportUrl: SUPPORT_URL,
    },
  }
}

/** Jeton de l'API App Store Connect (ES256, 20 minutes au plus). */
export function jwt({ keyId, issuerId, p8, now = Math.floor(Date.now() / 1000) }) {
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url')
  const input = `${b64({ alg: 'ES256', kid: keyId, typ: 'JWT' })}.${b64({ iss: issuerId, iat: now, exp: now + 1200, aud: 'appstoreconnect-v1' })}`
  const signature = sign('sha256', Buffer.from(input), { key: p8, dsaEncoding: 'ieee-p1363' })
  return `${input}.${signature.toString('base64url')}`
}

/** La version (ou les informations de l'app) encore modifiable, sinon undefined. */
export function editable(items) {
  return (items || []).find((it) => {
    const a = it?.attributes || {}
    return [a.appVersionState, a.appStoreState, a.state].some((s) => EDITABLE.has(s))
  })
}

async function api(token, method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = res.status === 204 ? {} : await res.json().catch(() => ({}))
  if (!res.ok) {
    const detail = (json.errors || []).map((e) => `${e.title || ''} ${e.detail || ''}`.trim()).join(' ; ')
    throw new Error(`${method} ${path.split('?')[0]} : ${res.status} ${detail}`)
  }
  return json
}

/** Localisation fr-FR mise à jour, ou créée si la version ou l'app ne l'ont pas encore. */
async function upsertLocalization(token, { listPath, type, parentType, parentRel, parentId, attributes }) {
  const { data = [] } = await api(token, 'GET', `${listPath}?limit=50`)
  const found = data.find((l) => l.attributes?.locale === LOCALE)
  if (found) {
    await api(token, 'PATCH', `/v1/${type}/${found.id}`, { data: { type, id: found.id, attributes } })
    return 'mise à jour'
  }
  await api(token, 'POST', `/v1/${type}`, {
    data: { type, attributes: { locale: LOCALE, ...attributes }, relationships: { [parentRel]: { data: { type: parentType, id: parentId } } } },
  })
  return 'créée'
}

async function main() {
  const f = fiche()
  const sizes = (o) => Object.entries(o).map(([k, v]) => `${k} ${[...v].length} car.`).join(', ')
  console.log(`Fiche ${LOCALE} — app : ${sizes(f.info)}`)
  console.log(`Fiche ${LOCALE} — version : ${sizes(f.version)}`)
  if (process.argv.includes('--dry-run')) return

  for (const name of ['ASC_KEY_ID', 'ASC_ISSUER_ID', 'ASC_KEY_P8']) {
    if (!process.env[name]) throw new Error(`secret ${name} absent de l'environnement appstore`)
  }
  const token = jwt({ keyId: process.env.ASC_KEY_ID, issuerId: process.env.ASC_ISSUER_ID, p8: process.env.ASC_KEY_P8 })

  const apps = await api(token, 'GET', `/v1/apps?filter[bundleId]=${BUNDLE_ID}&fields[apps]=bundleId,name`)
  const app = apps.data?.[0]
  if (!app) throw new Error(`aucune app ${BUNDLE_ID} dans App Store Connect`)

  const versions = await api(token, 'GET', `/v1/apps/${app.id}/appStoreVersions?filter[platform]=IOS&limit=20`)
  const version = editable(versions.data)
  if (!version) throw new Error('aucune version iOS « Prête à soumettre » : rien à modifier (version en examen ou en vente)')
  const v = await upsertLocalization(token, {
    listPath: `/v1/appStoreVersions/${version.id}/appStoreVersionLocalizations`,
    type: 'appStoreVersionLocalizations', parentType: 'appStoreVersions', parentRel: 'appStoreVersion', parentId: version.id,
    attributes: f.version,
  })
  console.log(`Version ${version.attributes?.versionString} : fiche ${LOCALE} ${v} (description, mots-clés, texte promotionnel, assistance)`)

  const infos = await api(token, 'GET', `/v1/apps/${app.id}/appInfos?limit=10`)
  const info = editable(infos.data)
  if (!info) throw new Error('aucune information d\'app modifiable (nom, sous-titre) : version en examen ou en vente')
  const i = await upsertLocalization(token, {
    listPath: `/v1/appInfos/${info.id}/appInfoLocalizations`,
    type: 'appInfoLocalizations', parentType: 'appInfos', parentRel: 'appInfo', parentId: info.id,
    attributes: f.info,
  })
  console.log(`App : nom, sous-titre et confidentialité ${LOCALE} ${i === 'créée' ? 'créés' : 'mis à jour'}`)
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.log(`::error::${e.message}`)
    process.exit(1)
  })
}
