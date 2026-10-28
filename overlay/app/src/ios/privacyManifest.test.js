import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

// Projet iOS copié dans upstream/app/ios par scripts/upstream.sh (les tests tournent depuis upstream/app)
const app = (name) => resolve(process.cwd(), 'ios/App/App', name)

/** Valeur d'une clé de premier niveau d'un plist XML (assez pour ces vérifications). */
const plistValue = (xml, key) => xml.match(new RegExp(`<key>${key}</key>\\s*(<[^>]+>)`))?.[1] ?? null

// App Store (I9) : sans manifeste de confidentialité déclarant les API « à raison requise » utilisées, l'envoi est
// refusé ; l'app n'utilise pas de chiffrement non exempté (HTTPS seulement), dit dans Info.plist pour que la
// question ne soit pas posée à chaque envoi.
describe('manifeste de confidentialité et chiffrement (App Store)', () => {
  it('PrivacyInfo.xcprivacy : aucun pistage, UserDefaults déclaré pour les données de l’app elle-même', () => {
    expect(existsSync(app('PrivacyInfo.xcprivacy'))).toBe(true)
    const xml = readFileSync(app('PrivacyInfo.xcprivacy'), 'utf8')
    expect(plistValue(xml, 'NSPrivacyTracking')).toBe('<false/>')
    expect(xml).toMatch(/<key>NSPrivacyAccessedAPIType<\/key>\s*<string>NSPrivacyAccessedAPICategoryUserDefaults<\/string>/)
    expect(xml).toMatch(/<string>CA92\.1<\/string>/)
  })

  it('Info.plist : pas de chiffrement non exempté', () => {
    const xml = readFileSync(app('Info.plist'), 'utf8')
    expect(plistValue(xml, 'ITSAppUsesNonExemptEncryption')).toBe('<false/>')
  })
})
