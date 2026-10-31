#!/usr/bin/env node
// Fiche App Store fr-FR (store/app-store/fr-FR) envoyée à App Store Connect par son API (I9, autorisation permanente du
// propriétaire : « mettre à jour la fiche App Store par l'API »). Ne touche qu'à une version encore « Prête à
// soumettre » : rien n'est publié ni soumis à l'examen (geste du propriétaire). Lancé par
// .github/workflows/store-push.yml avec la clé de l'environnement `appstore` (ASC_KEY_ID, ASC_ISSUER_ID, ASC_KEY_P8),
// jamais affichée. `--dry-run` : montre ce qui serait envoyé, sans réseau ni clé. `--captures <dossier>` : envoie aussi
// les captures 6,9" de store/app-store/captures.md (branche captures/store), dans l'ordre du tableau, à la place des
// précédentes. Le numéro de cette version prend celui des builds (versionCode d'Android suivi, `upstream.json`).
// Catégorie et classification par âge : store/app-store/classification.json.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createHash, sign } from 'node:crypto'
import { pathToFileURL } from 'node:url'

const DIR = join(import.meta.dirname, '..', 'store', 'app-store', 'fr-FR')
const CAPTURES_MD = join(import.meta.dirname, '..', 'store', 'app-store', 'captures.md')
const UPSTREAM_JSON = join(import.meta.dirname, '..', 'upstream.json')
const CLASSIFICATION_JSON = join(import.meta.dirname, '..', 'store', 'app-store', 'classification.json')
/** Captures 6,9" (1320 × 2868) : App Store Connect les reprend pour les iPhone plus petits. */
const DISPLAY_TYPE = 'APP_IPHONE_67'
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

/**
 * Numéro de la version iOS : le versionCode d'Android suivi (upstream.json), celui des builds envoyées sur TestFlight
 * (CFBundleShortVersionString, testflight.yml). App Store Connect ne laisse choisir pour une version que des builds de
 * même numéro : la version « Prête à soumettre » le reprend.
 */
export function versionString(json = JSON.parse(readFileSync(UPSTREAM_JSON, 'utf8'))) {
  const n = json?.versionCode
  if (!Number.isInteger(n) || n <= 0) throw new Error('upstream.json : versionCode absent ou invalide')
  return String(n)
}

/**
 * Catégorie et classification par âge (store/app-store/classification.json, expliquées dans le README) : Santé et
 * forme, 18 ans et plus comme sur Google Play.
 */
export function classification(path = CLASSIFICATION_JSON) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

/** Fichiers des captures de la fiche, dans l'ordre d'affichage (tableau de store/app-store/captures.md). */
export function captureFiles(md = readFileSync(CAPTURES_MD, 'utf8')) {
  return [...md.matchAll(/^\|\s*\d+\s*\|\s*`([^`]+\.png)`\s*\|/gm)].map((m) => m[1])
}

/** Empreinte MD5 qu'App Store Connect vérifie à la fin de l'envoi d'une capture. */
export const md5 = (bytes) => createHash('md5').update(bytes).digest('hex')

/** Morceaux à envoyer, d'après les opérations rendues par App Store Connect pour une capture. */
export function slices(bytes, operations) {
  return (operations || []).map((op) => ({
    method: op.method,
    url: op.url,
    body: bytes.subarray(op.offset, op.offset + op.length),
    headers: Object.fromEntries((op.requestHeaders || []).map((h) => [h.name, h.value])),
  }))
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
    return { action: 'mise à jour', id: found.id }
  }
  const created = await api(token, 'POST', `/v1/${type}`, {
    data: { type, attributes: { locale: LOCALE, ...attributes }, relationships: { [parentRel]: { data: { type: parentType, id: parentId } } } },
  })
  return { action: 'créée', id: created.data?.id }
}

/**
 * État des captures chez Apple (`assetDeliveryState`) : traitées (COMPLETE), en cours (envoyées, pas encore
 * traitées), refusées (FAILED, avec la raison donnée par Apple).
 */
export function screenshotStates(items) {
  const out = { total: 0, complete: 0, pending: 0, failed: [] }
  for (const it of items || []) {
    const a = it?.attributes || {}
    const st = a.assetDeliveryState || {}
    out.total += 1
    if (st.state === 'COMPLETE') out.complete += 1
    else if (st.state === 'FAILED') {
      const why = (st.errors || []).map((e) => e.description || e.code).filter(Boolean).join(', ')
      out.failed.push(`${a.fileName || '?'} : ${why || 'refusée'}`)
    } else out.pending += 1
  }
  return out
}

/** Lit l'état des captures 6,9" de la fiche ; attend jusqu'à `waitMs` que le traitement d'Apple se termine. */
async function screenshotReport(token, localizationId, { waitMs = 0 } = {}) {
  const sets = await api(token, 'GET', `/v1/appStoreVersionLocalizations/${localizationId}/appScreenshotSets?limit=50`)
  const set = (sets.data || []).find((x) => x.attributes?.screenshotDisplayType === DISPLAY_TYPE)
  if (!set) return null
  const until = Date.now() + waitMs
  for (;;) {
    const shots = await api(token, 'GET', `/v1/appScreenshotSets/${set.id}/appScreenshots?limit=50&fields[appScreenshots]=fileName,assetDeliveryState`)
    const r = screenshotStates(shots.data)
    if (r.pending === 0 || Date.now() >= until) return r
    await new Promise((ok) => setTimeout(ok, 5000))
  }
}

/** Captures de la fiche remplacées par celles du dossier, dans l'ordre de captures.md. */
async function uploadScreenshots(token, localizationId, dir) {
  const files = captureFiles()
  const sets = await api(token, 'GET', `/v1/appStoreVersionLocalizations/${localizationId}/appScreenshotSets?limit=50`)
  let set = (sets.data || []).find((s) => s.attributes?.screenshotDisplayType === DISPLAY_TYPE)
  if (!set) {
    set = (await api(token, 'POST', '/v1/appScreenshotSets', {
      data: {
        type: 'appScreenshotSets', attributes: { screenshotDisplayType: DISPLAY_TYPE },
        relationships: { appStoreVersionLocalization: { data: { type: 'appStoreVersionLocalizations', id: localizationId } } },
      },
    })).data
  }
  const old = await api(token, 'GET', `/v1/appScreenshotSets/${set.id}/appScreenshots?limit=50`)
  for (const shot of old.data || []) await api(token, 'DELETE', `/v1/appScreenshots/${shot.id}`)
  const ids = []
  for (const name of files) {
    const bytes = readFileSync(join(dir, name))
    const created = (await api(token, 'POST', '/v1/appScreenshots', {
      data: {
        type: 'appScreenshots', attributes: { fileName: name, fileSize: bytes.length },
        relationships: { appScreenshotSet: { data: { type: 'appScreenshotSets', id: set.id } } },
      },
    })).data
    for (const part of slices(bytes, created.attributes?.uploadOperations)) {
      const res = await fetch(part.url, { method: part.method, headers: part.headers, body: part.body })
      if (!res.ok) throw new Error(`envoi de ${name} : ${res.status}`)
    }
    await api(token, 'PATCH', `/v1/appScreenshots/${created.id}`, {
      data: { type: 'appScreenshots', id: created.id, attributes: { uploaded: true, sourceFileChecksum: md5(bytes) } },
    })
    ids.push(created.id)
  }
  await api(token, 'PATCH', `/v1/appScreenshotSets/${set.id}/relationships/appScreenshots`, {
    data: ids.map((id) => ({ type: 'appScreenshots', id })),
  })
  return files.length
}

async function main() {
  const f = fiche()
  const sizes = (o) => Object.entries(o).map(([k, v]) => `${k} ${[...v].length} car.`).join(', ')
  console.log(`Fiche ${LOCALE} — app : ${sizes(f.info)}`)
  console.log(`Fiche ${LOCALE} — version : ${sizes(f.version)}`)
  const at = process.argv.indexOf('--captures')
  const capturesDir = at > 0 ? process.argv[at + 1] : null
  if (capturesDir || process.argv.includes('--dry-run')) console.log(`Captures (${DISPLAY_TYPE}) : ${captureFiles().join(', ')}`)
  const c = classification()
  console.log(`Catégorie : ${c.primaryCategory} ; âge : ${c.ageRating.ageRatingOverrideV2}`)
  const wanted = versionString()
  console.log(`Numéro de la version : ${wanted} (versionCode d'Android suivi, comme les builds de TestFlight)`)
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
  if (version.attributes?.versionString !== wanted) {
    await api(token, 'PATCH', `/v1/appStoreVersions/${version.id}`, { data: { type: 'appStoreVersions', id: version.id, attributes: { versionString: wanted } } })
    console.log(`Version ${version.attributes?.versionString} renommée ${wanted}`)
    version.attributes = { ...version.attributes, versionString: wanted }
  }
  const v = await upsertLocalization(token, {
    listPath: `/v1/appStoreVersions/${version.id}/appStoreVersionLocalizations`,
    type: 'appStoreVersionLocalizations', parentType: 'appStoreVersions', parentRel: 'appStoreVersion', parentId: version.id,
    attributes: f.version,
  })
  console.log(`Version ${version.attributes?.versionString} : fiche ${LOCALE} ${v.action} (description, mots-clés, texte promotionnel, assistance)`)
  if (capturesDir) console.log(`Captures : ${await uploadScreenshots(token, v.id, capturesDir)} envoyées dans l'ordre de captures.md`)
  const shots = await screenshotReport(token, v.id, { waitMs: capturesDir ? 120000 : 0 })
  if (!shots) console.log(`Captures (${DISPLAY_TYPE}) : aucune dans la fiche`)
  else {
    console.log(`Captures (${DISPLAY_TYPE}) chez Apple : ${shots.complete}/${shots.total} traitées, ${shots.pending} en cours, ${shots.failed.length} refusées`)
    if (shots.failed.length) throw new Error(`captures refusées par Apple : ${shots.failed.join(' ; ')}`)
  }

  const infos = await api(token, 'GET', `/v1/apps/${app.id}/appInfos?limit=10`)
  const info = editable(infos.data)
  if (!info) throw new Error('aucune information d\'app modifiable (nom, sous-titre) : version en examen ou en vente')
  const i = await upsertLocalization(token, {
    listPath: `/v1/appInfos/${info.id}/appInfoLocalizations`,
    type: 'appInfoLocalizations', parentType: 'appInfos', parentRel: 'appInfo', parentId: info.id,
    attributes: f.info,
  })
  console.log(`App : nom, sous-titre et confidentialité ${LOCALE} ${i.action === 'créée' ? 'créés' : 'mis à jour'}`)

  await api(token, 'PATCH', `/v1/appInfos/${info.id}`, {
    data: { type: 'appInfos', id: info.id, relationships: { primaryCategory: { data: { type: 'appCategories', id: c.primaryCategory } } } },
  })
  const { data: rating } = await api(token, 'GET', `/v1/appInfos/${info.id}/ageRatingDeclaration`)
  if (!rating?.id) throw new Error('classification par âge introuvable dans App Store Connect')
  await api(token, 'PATCH', `/v1/ageRatingDeclarations/${rating.id}`, { data: { type: 'ageRatingDeclarations', id: rating.id, attributes: c.ageRating } })
  console.log(`App : catégorie ${c.primaryCategory}, classification par âge ${c.ageRating.ageRatingOverrideV2} (classification.json)`)
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.log(`::error::${e.message}`)
    process.exit(1)
  })
}
