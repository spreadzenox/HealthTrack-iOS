/**
 * Mode « captures » de la version iOS (dépôt HealthTrack-iOS), compilé seulement quand VITE_IOS_CAPTURE=1 : la build
 * simulateur du workflow ios-build, jamais une build envoyée aux utilisateurs. scripts/ios-captures.sh ouvre des liens
 * halcya-capture://go?… (schéma ajouté au projet Xcode par le workflow, pas dans le dépôt) pour :
 *   - data=demo   : ajouter une seule fois les données de démo d'Android (scripts/visual/demoData.mjs), et noter
 *                   l'onboarding fait et les nouveautés vues, comme `npm run visual` ;
 *   - theme=dark|light|system : thème de l'app (réglage Paramètres → Apparence) ;
 *   - route=/journal : la page à afficher (toujours un chemin de l'app).
 */
const SEEDED_KEY = 'halcya_ios_capture_seeded'
const THEMES = ['dark', 'light', 'system']

export function parseCaptureUrl(url) {
  let u
  try {
    u = new URL(url)
  } catch {
    return null
  }
  if (u.protocol !== 'halcya-capture:') return null
  const route = u.searchParams.get('route') || '/'
  const theme = u.searchParams.get('theme')
  return {
    route: route.startsWith('/') && !route.startsWith('//') ? route : '/',
    data: u.searchParams.get('data') === 'demo' ? 'demo' : null,
    theme: THEMES.includes(theme) ? theme : null,
  }
}

export async function applyCapture({ route, data, theme }, { storage, demoEntries, latestChangelogId, localStorage, go }) {
  if (data === 'demo' && !localStorage.getItem(SEEDED_KEY)) {
    await storage.upsertEntries(demoEntries())
    localStorage.setItem(SEEDED_KEY, '1')
    localStorage.setItem('healthtrack_onboarding', JSON.stringify({ done: true, endedBy: 'capture', goal: null }))
    if (latestChangelogId) localStorage.setItem('healthtrack-whats-new-last-seen', latestChangelogId)
  }
  if (theme) localStorage.setItem('healthtrack_theme', theme)
  go(route)
}

export async function installCaptureMode() {
  const { App } = await import('@capacitor/app')
  App.addListener('appUrlOpen', async ({ url }) => {
    const params = parseCaptureUrl(url)
    if (!params) return
    try {
      const [storage, demo, changelog] = await Promise.all([
        import('../storage/localHealthStorage.js'),
        import('../../scripts/visual/demoData.mjs'),
        import('../data/changelog.js'),
      ])
      await applyCapture(params, {
        storage,
        demoEntries: () => demo.generateDemoEntries(),
        latestChangelogId: changelog.ALL_CHANGELOG[0]?.id ?? null,
        localStorage: window.localStorage,
        go: (path) => window.location.assign(path),
      })
    } catch (e) {
      console.error('[capture] échec :', e)
    }
  })
  console.log('[capture] mode captures iOS prêt')
}
