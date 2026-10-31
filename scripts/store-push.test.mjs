// Tests de scripts/store-push.mjs (node --test) : fiche lue depuis store/app-store/fr-FR, jeton signé ES256 que la
// clé publique vérifie, choix de la version et des localisations modifiables d'App Store Connect.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { generateKeyPairSync, createVerify } from 'node:crypto'
import { fiche, jwt, editable, SUPPORT_URL, PRIVACY_URL } from './store-push.mjs'

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
