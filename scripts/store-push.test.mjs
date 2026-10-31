// Tests de scripts/store-push.mjs (node --test) : fiche lue depuis store/app-store/fr-FR, jeton signé ES256 que la
// clé publique vérifie, choix de la version et des localisations modifiables d'App Store Connect.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { generateKeyPairSync, createVerify } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fiche, jwt, editable, versionString, classification, SUPPORT_URL, PRIVACY_URL } from './store-push.mjs'

test('fiche : textes de store/app-store/fr-FR et adresses du site', () => {
  const f = fiche()
  assert.equal(f.info.name, 'Halcya')
  assert.ok(f.info.subtitle.length > 0 && f.info.subtitle.length <= 30)
  assert.equal(f.info.privacyPolicyUrl, PRIVACY_URL)
  assert.ok(f.version.description.length > 1000 && f.version.description.length <= 4000)
  assert.ok(!f.version.description.endsWith('\n'))
  assert.ok(f.version.keywords.split(',').length > 3)
  assert.equal(f.version.supportUrl, SUPPORT_URL)
  assert.ok(f.version.promotionalText.length <= 170)
  assert.match(PRIVACY_URL, /^https:\/\/spreadzenox\.github\.io\/HealthTrack-iOS\/confidentialite\/$/)
  assert.match(SUPPORT_URL, /^https:\/\/spreadzenox\.github\.io\/HealthTrack-iOS\/assistance\/$/)
})

test('jwt : ES256, en-tête et charge attendus par App Store Connect, signature vérifiable', () => {
  const { privateKey, publicKey } = generateKeyPairSync('ec', { namedCurve: 'P-256' })
  const pem = privateKey.export({ type: 'pkcs8', format: 'pem' })
  const token = jwt({ keyId: 'ABC123', issuerId: 'iss-1', p8: pem, now: 1_000_000 })
  const [h, p, s] = token.split('.')
  const dec = (x) => JSON.parse(Buffer.from(x, 'base64url').toString())
  assert.deepEqual(dec(h), { alg: 'ES256', kid: 'ABC123', typ: 'JWT' })
  assert.deepEqual(dec(p), { iss: 'iss-1', iat: 1_000_000, exp: 1_000_000 + 1200, aud: 'appstoreconnect-v1' })
  const ok = createVerify('sha256').update(`${h}.${p}`).verify({ key: publicKey, dsaEncoding: 'ieee-p1363' }, Buffer.from(s, 'base64url'))
  assert.equal(ok, true)
})

test('editable : la version ou la fiche encore en préparation, jamais celle en vente ou en examen', () => {
  const items = [
    { id: '1', attributes: { appStoreState: 'READY_FOR_SALE' } },
    { id: '2', attributes: { appVersionState: 'PREPARE_FOR_SUBMISSION' } },
  ]
  assert.equal(editable(items).id, '2')
  assert.equal(editable([{ id: '3', attributes: { state: 'PREPARE_FOR_SUBMISSION' } }]).id, '3')
  assert.equal(editable([{ id: '4', attributes: { appStoreState: 'WAITING_FOR_REVIEW' } }]), undefined)
  assert.equal(editable([]), undefined)
})

test('captures : les 8 fichiers du tableau de store/app-store/captures.md, dans l’ordre d’affichage', async () => {
  const { captureFiles } = await import('./store-push.mjs')
  const files = captureFiles()
  assert.equal(files.length, 8)
  assert.equal(files[0], 'iphone-17-pro-max-demo-clair-accueil.png')
  assert.equal(files[7], 'iphone-17-pro-max-demo-sombre-accueil.png')
  assert.ok(files.every((f) => /^iphone-17-pro-max-.+\.png$/.test(f)))
})

test('envoi d’une capture : morceaux selon les opérations d’Apple, empreinte MD5 du fichier', async () => {
  const { slices, md5 } = await import('./store-push.mjs')
  const bytes = Buffer.from('abcdefghij')
  const ops = [
    { method: 'PUT', url: 'https://u/1', offset: 0, length: 4, requestHeaders: [{ name: 'Content-Type', value: 'image/png' }] },
    { method: 'PUT', url: 'https://u/2', offset: 4, length: 6, requestHeaders: [] },
  ]
  const parts = slices(bytes, ops)
  assert.deepEqual(parts.map((p) => p.body.toString()), ['abcd', 'efghij'])
  assert.deepEqual(parts[0].headers, { 'Content-Type': 'image/png' })
  assert.equal(parts[1].url, 'https://u/2')
  assert.equal(md5(bytes), 'a925576942e94b2ef57a066101b48876')
})

test('versionString : numéro de la version iOS = versionCode d’Android suivi, comme les builds envoyées', () => {
  const upstream = JSON.parse(readFileSync(new URL('../upstream.json', import.meta.url), 'utf8'))
  assert.equal(versionString(), String(upstream.versionCode))
  assert.equal(versionString({ versionCode: 648 }), '648')
  assert.throws(() => versionString({}), /versionCode/)
  assert.throws(() => versionString({ versionCode: '1.0' }), /versionCode/)
})

test('classification : catégorie Santé et forme, 18 ans et plus comme sur Google Play, réponses valides pour Apple', () => {
  const c = classification()
  assert.equal(c.primaryCategory, 'HEALTH_AND_FITNESS')
  const a = c.ageRating
  assert.equal(a.ageRatingOverrideV2, 'EIGHTEEN_PLUS')
  assert.equal(a.healthOrWellnessTopics, true)
  // Relevé des cigarettes, réintroduction FODMAP et rapport pour le médecin : déclarés, au plus prudent.
  assert.equal(a.alcoholTobaccoOrDrugUseOrReferences, 'FREQUENT')
  assert.equal(a.medicalOrTreatmentInformation, 'FREQUENT')
  // Ni publicité, ni échanges entre personnes, ni contenu publié par d'autres : tout reste sur le téléphone.
  for (const k of ['advertising', 'messagingAndChat', 'socialMedia', 'userGeneratedContent', 'unrestrictedWebAccess', 'gambling', 'lootBox']) {
    assert.equal(a[k], false, k)
  }
  // Valeurs admises par l'API d'App Store Connect (AgeRatingDeclarationUpdateRequest, relevées le 31/10/2026).
  const LEVELS = ['NONE', 'INFREQUENT_OR_MILD', 'FREQUENT_OR_INTENSE', 'INFREQUENT', 'FREQUENT']
  const BOOLEANS = ['advertising', 'ageAssurance', 'gambling', 'healthOrWellnessTopics', 'lootBox', 'messagingAndChat',
    'parentalControls', 'socialMedia', 'socialMediaAgeRestricted', 'unrestrictedWebAccess', 'userGeneratedContent']
  const LEVELED = ['alcoholTobaccoOrDrugUseOrReferences', 'contests', 'gamblingSimulated', 'gunsOrOtherWeapons',
    'horrorOrFearThemes', 'matureOrSuggestiveThemes', 'medicalOrTreatmentInformation', 'profanityOrCrudeHumor',
    'sexualContentGraphicAndNudity', 'sexualContentOrNudity', 'violenceCartoonOrFantasy', 'violenceRealistic',
    'violenceRealisticProlongedGraphicOrSadistic']
  for (const k of BOOLEANS) assert.equal(typeof a[k], 'boolean', k)
  for (const k of LEVELED) assert.ok(LEVELS.includes(a[k]), k)
  assert.deepEqual(Object.keys(a).sort(), [...BOOLEANS, ...LEVELED, 'ageRatingOverrideV2'].sort())
})
