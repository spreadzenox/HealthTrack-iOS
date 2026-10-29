import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'

// Version iOS (HealthTrack-iOS) : Réglages → Confidentialité ouvre sur iPhone sa propre page
// (public/confidentialite-iphone.html, correctif 26), réécrite d'après celle d'Android. Celle d'Android évolue avec
// l'app : quand elle change, ce test échoue pour que la page iPhone soit relue avant de suivre la nouvelle version.
// Vitest tourne depuis upstream/app, où scripts/upstream.sh a copié overlay/
const read = (p) => readFileSync(join(process.cwd(), p), 'utf8')
const iphone = read('public/confidentialite-iphone.html')
const text = iphone.replace(/<!--[\s\S]*?-->/g, '').replace(/<style>[\s\S]*?<\/style>/, '').replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')

// Empreinte de app/public/privacypolicy.html d'Android lue en dernier (mise à jour du 28 octobre 2026, v574)
const ANDROID_POLICY_RELUE = 'ee5226dc8ebd8c678ee60631c301eefc8dac0b1211e55ada873ccd4b12843bba'

describe('politique de confidentialité sur iPhone', () => {
  it("suit la dernière version relue de la page d'Android", () => {
    const sha = createHash('sha256').update(readFileSync(join(process.cwd(), 'public/privacypolicy.html'))).digest('hex')
    expect(sha, "la page d'Android a changé : relire confidentialite-iphone.html, puis mettre à jour l'empreinte").toBe(ANDROID_POLICY_RELUE)
  })

  it("ne parle d'aucune fonction ni d'aucun service absents de l'iPhone", () => {
    for (const absent of [/Android/i, /Google Play/i, /Health Connect/i, /sauvegarde Google/i, /Huawei/i, /Withings/i,
      /temps d'écran/i, /données d'utilisation/i, /Play Integrity/i, /clé Gemini/i]) {
      expect(text, String(absent)).not.toMatch(absent)
    }
  })

  it("dit ce que l'iPhone fait vraiment", () => {
    expect(text).toMatch(/lit \(sans jamais y écrire\) dans l'app Santé/)
    for (const type of ['pas', 'sommeil', 'fréquence cardiaque au repos', 'variabilité de la fréquence cardiaque',
      'saturation en oxygène', 'tension artérielle', 'glycémie', 'masse grasse']) expect(text).toContain(type)
    expect(text).toMatch(/copie de secours/)
    expect(text).toMatch(/sauvegarde iCloud/)
    expect(text).toMatch(/arrondie à environ 10 km/)
    expect(text).toMatch(/système d'intelligence artificielle de reconnaissance des émotions/)
    expect(text).toMatch(/18 ans et plus/)
    expect(text).toMatch(/Supprimer toutes mes données/)
    expect(text).toMatch(/CNIL/)
    expect(text).toMatch(/13 mois/)
  })

  it("ramène à l'app, faute de bouton retour sur iPhone", () => {
    expect(iphone).toMatch(/<a class="back" href="\/plus">‹ Revenir à Halcya<\/a>/)
  })

  it('se lit hors ligne : aucune ressource externe', () => {
    expect(iphone).not.toMatch(/<script|<link|<img|<iframe|@import|url\(/i)
  })
})
