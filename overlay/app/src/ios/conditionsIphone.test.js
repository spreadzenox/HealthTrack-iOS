import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join } from 'node:path'

// Version iOS (HealthTrack-iOS) : Réglages → Conditions ouvre sur iPhone sa propre page
// (public/conditions-iphone.html, correctif 26), réécrite d'après celle d'Android, qui parle de Google Play. Celle
// d'Android évolue avec l'app : quand elle change, ce test échoue pour que la page iPhone soit relue.
// Vitest tourne depuis upstream/app, où scripts/upstream.sh a copié overlay/
const read = (p) => readFileSync(join(process.cwd(), p), 'utf8')
const iphone = read('public/conditions-iphone.html')
const text = iphone.replace(/<!--[\s\S]*?-->/g, '').replace(/<style>[\s\S]*?<\/style>/, '').replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')

// Empreinte de app/public/conditions.html d'Android lue en dernier (version du 1er novembre 2026, relue sur v671)
const ANDROID_CONDITIONS_RELUES = '7d52926ca69138f39aa0f8221bb94d958803f3d0e1afd86cc9f58b4afe2f51c9'

describe("conditions d'utilisation sur iPhone", () => {
  it("suivent la dernière version relue de la page d'Android", () => {
    const sha = createHash('sha256').update(readFileSync(join(process.cwd(), 'public/conditions.html'))).digest('hex')
    expect(sha, "la page d'Android a changé : relire conditions-iphone.html, puis mettre à jour l'empreinte").toBe(ANDROID_CONDITIONS_RELUES)
  })

  it("ne parlent d'aucun service ni d'aucun achat absents de l'iPhone", () => {
    for (const absent of [/Android/i, /Google/i, /Health Connect/i, /Huawei/i, /Withings/i, /sideload|hors App Store/i,
      /essai gratuit/i, /période de grâce/i, /Restaurer un achat/i, /\d+ ?€/]) {
      expect(text, String(absent)).not.toMatch(absent)
    }
  })

  it("gardent ce que l'app n'est pas, et ce que l'iPhone fait vraiment", () => {
    expect(text).toMatch(/n'est pas un dispositif médical/)
    expect(text).toMatch(/appelez le 15 ou le 112/)
    expect(text).toMatch(/piste à vérifier : il ne prouve pas que l'un entraîne l'autre/)
    expect(text).toMatch(/ne pose pas de diagnostic/)
    expect(text).not.toMatch(/pas des causes|estimation, pas un diagnostic/)
    expect(text).toMatch(/18 ans et plus/)
    expect(text).toMatch(/ne propose aucun achat/)
    expect(text).toMatch(/achats intégrés de l'App Store/)
    expect(text).toMatch(/app Santé/)
    expect(text).toMatch(/sauvegarde iCloud/)
    expect(text).toMatch(/elle n'est pas incluse dans la sauvegarde iCloud/) // 1/11, directive 5.1.3 (ii)
    expect(text).toMatch(/droit français/)
  })

  it("renvoient à la politique de confidentialité de l'iPhone et ramènent à l'app", () => {
    expect(iphone).toContain('href="/confidentialite-iphone.html"')
    expect(iphone).not.toContain('href="/privacypolicy.html"')
    expect(iphone).toMatch(/<a class="back" href="\/plus">‹ Revenir à Halcya<\/a>/)
  })

  it('se lisent hors ligne : aucune ressource externe', () => {
    expect(iphone).not.toMatch(/<script|<link|<img|<iframe|@import|url\(/i)
  })
})
