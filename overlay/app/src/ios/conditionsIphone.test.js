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

// Empreinte de app/public/conditions.html d'Android lue en dernier (version du 24 octobre 2026, relue sur v588)
const ANDROID_CONDITIONS_RELUES = '6fdccbc9fff59848dbdda1fbd9e7eb35b0b4b2f8f0173be706af3f4cc704924f'

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
    expect(text).toMatch(/pistes ?, pas des causes/)
    expect(text).toMatch(/estimation, pas un diagnostic/)
    expect(text).toMatch(/18 ans et plus/)
    expect(text).toMatch(/ne propose aucun achat/)
    expect(text).toMatch(/achats intégrés de l'App Store/)
    expect(text).toMatch(/app Santé/)
    expect(text).toMatch(/sauvegarde iCloud/)
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
