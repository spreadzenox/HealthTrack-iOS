import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

// Version iOS (HealthTrack-iOS) : iOS ferme l'app qui ouvre la caméra sans phrase d'usage dans Info.plist, et refuse la
// position sans la sienne. Toute fonction du code partagé qui y touche (photo du repas, météo) doit avoir sa phrase,
// en français, vraie sur iPhone.
// Vitest tourne depuis upstream/app, où scripts/upstream.sh a copié ios/
const src = join(process.cwd(), 'src')
const plist = readFileSync(join(process.cwd(), 'ios/App/App/Info.plist'), 'utf8')

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) return files(p)
    return /\.(jsx?|tsx?)$/.test(name) && !/\.test\./.test(name) ? [p] : []
  })
}
const code = files(src).map((p) => readFileSync(p, 'utf8')).join('\n')
const usage = (key) => plist.match(new RegExp(`<key>${key}</key>\\s*<string>([^<]+)</string>`))?.[1]
const flag = (key) => plist.match(new RegExp(`<key>${key}</key>\\s*<(true|false)/>`))?.[1]

describe('phrases d’usage de l’iPhone (Info.plist)', () => {
  it('la photo du repas ouvre la caméra : phrase d’usage de la caméra', () => {
    expect(code).toMatch(/capture="environment"/)
    expect(usage('NSCameraUsageDescription')).toMatch(/caméra.*repas/)
  })

  it('la lecture du visage (plugin FaceSense) : la phrase de la caméra le dit, images gardées sur l’iPhone', () => {
    expect(usage('NSCameraUsageDescription')).toMatch(/lire votre visage.*restent sur cet iPhone/)
  })

  it('la météo demande la position : phrase d’usage, position approximative seulement', () => {
    expect(code).toMatch(/navigator\.geolocation/)
    expect(usage('NSLocationWhenInUseUsageDescription')).toMatch(/position approximative.*météo/)
    expect(flag('NSLocationDefaultAccuracyReduced')).toBe('true')
  })

  it('aucune phrase ne parle d’Android, toutes vouvoient', () => {
    const all = [...plist.matchAll(/<key>NS\w+UsageDescription<\/key>\s*<string>([^<]+)<\/string>/g)].map((m) => m[1])
    expect(all.length).toBeGreaterThanOrEqual(4)
    for (const s of all) {
      expect(s).not.toMatch(/Android|Health Connect/)
      expect(s).not.toMatch(/\b(tu|ton|ta|tes)\b/)
    }
  })
})
