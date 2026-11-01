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

// Empreinte de app/public/privacypolicy.html d'Android lue en dernier (mise à jour du 1er novembre 2026, v671 ; la
// lecture au déverrouillage qu'elle ajoute n'existe pas sur iPhone)
const ANDROID_POLICY_RELUE = '9be1e5fa63cbf0ff14c0d192638cea02235ae76d245730ac5571bce736718a66'

describe('politique de confidentialité sur iPhone', () => {
  it("suit la dernière version relue de la page d'Android", () => {
    const sha = createHash('sha256').update(readFileSync(join(process.cwd(), 'public/privacypolicy.html'))).digest('hex')
    expect(sha, "la page d'Android a changé : relire confidentialite-iphone.html, puis mettre à jour l'empreinte").toBe(ANDROID_POLICY_RELUE)
  })

  it("ne parle d'aucune fonction ni d'aucun service absents de l'iPhone", () => {
    for (const absent of [/Android/i, /Google Play/i, /Health Connect/i, /sauvegarde Google/i, /Huawei/i, /Withings/i,
      /données d'utilisation/i, /Play Integrity/i, /clé Gemini/i]) {
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
    // Temps d'écran (31/10) : autorisation Temps d'écran d'Apple, sur l'iPhone seulement
    expect(text).toMatch(/Temps d'écran \(facultatif\)/)
    expect(text).toMatch(/autorisation Temps d'écran/)
    expect(text).toMatch(/par application/)
  })

  it("ramène à l'app, faute de bouton retour sur iPhone", () => {
    expect(iphone).toMatch(/<a class="back" href="\/plus">‹ Revenir à Halcya<\/a>/)
  })

  it('se lit hors ligne : aucune ressource externe', () => {
    expect(iphone).not.toMatch(/<script|<link|<img|<iframe|@import|url\(/i)
  })
})
