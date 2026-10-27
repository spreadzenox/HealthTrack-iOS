/**
 * Mode « captures » de la version iOS (dépôt HealthTrack-iOS), compilé seulement quand VITE_IOS_CAPTURE=1 : la build
 * simulateur du workflow ios-build, jamais une build envoyée aux utilisateurs.
 *
 * L'app parcourt elle-même un plan de pages (le simulateur affiche « Ouvrir dans Halcya ? » pour tout lien externe,
 * donc on ne la pilote pas de l'extérieur) : à chaque page, elle attend que l'écran se pose, écrit
 * « [capture] page <nom> » dans la console (relayée par Capacitor), laisse le temps à scripts/ios-captures.sh de
 * faire la capture, puis prépare l'étape suivante et recharge sur sa page. Comme `npm run visual` d'Android : données
 * de démo (scripts/visual/demoData.mjs) ajoutées une seule fois, onboarding noté fait, nouveautés notées vues.
 */
export const STEP_KEY = 'halcya_ios_capture_step'
const SEEDED_KEY = 'halcya_ios_capture_seeded'

// Les mêmes pages que `npm run visual` d'Android (scripts/visual/visual-check.mjs, DEFAULT_ROUTES), sauf /bienvenue
export const ROUTES = ['/', '/journal', '/tendances', '/food', '/nutrition', '/data', '/connectors', '/recommendations',
  '/settings', '/plus', '/montre', '/premium', '/bien-etre', '/reintroduction']
export const DARK_ROUTES = ['/', '/journal', '/recommendations']

const pageName = (route) => route.replace(/^\//, '') || 'accueil'

export function buildPlan(routes = ROUTES, darkRoutes = DARK_ROUTES) {
  return [
    { name: 'vierge-onboarding', route: null, data: null, theme: null },
    ...routes.map((route) => ({ name: `demo-clair-${pageName(route)}`, route, data: 'demo', theme: 'light' })),
    ...darkRoutes.map((route) => ({ name: `demo-sombre-${pageName(route)}`, route, data: 'demo', theme: 'dark' })),
  ]
}

async function prepare(step, { storage, demoEntries, latestChangelogId, localStorage }) {
  if (step.data === 'demo' && !localStorage.getItem(SEEDED_KEY)) {
    await storage.upsertEntries(demoEntries())
    localStorage.setItem(SEEDED_KEY, '1')
    localStorage.setItem('healthtrack_onboarding', JSON.stringify({ done: true, endedBy: 'capture', goal: null }))
    if (latestChangelogId) localStorage.setItem('healthtrack-whats-new-last-seen', latestChangelogId)
  }
  // Lu par initTheme() au démarrage : appliqué au rechargement qui suit
  if (step.theme) localStorage.setItem('healthtrack_theme', step.theme)
}

/** Une étape par chargement de page : annonce la page courante, puis passe à la suivante. */
export async function runCaptureStep(plan, deps, { settleMs = 4000, holdMs = 3000 } = {}) {
  const { localStorage, go, log, wait } = deps
  const index = Number(localStorage.getItem(STEP_KEY) ?? 0)
  const step = plan[index]
  if (!step) return
  await wait(settleMs)
  log(`[capture] page ${step.name}`)
  await wait(holdMs)
  const next = plan[index + 1]
  localStorage.setItem(STEP_KEY, String(index + 1))
  if (!next) {
    log('[capture] fin')
    return
  }
  await prepare(next, deps)
  go(next.route)
}

export async function installCaptureMode() {
  try {
    const [storage, demo, changelog] = await Promise.all([
      import('../storage/localHealthStorage.js'),
      import('../../scripts/visual/demoData.mjs'),
      import('../data/changelog.js'),
    ])
    await runCaptureStep(buildPlan(), {
      storage,
      demoEntries: () => demo.generateDemoEntries(),
      latestChangelogId: changelog.ALL_CHANGELOG[0]?.id ?? null,
      localStorage: window.localStorage,
      go: (path) => window.location.assign(path),
      log: (message) => console.log(message),
      wait: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    })
  } catch (e) {
    console.error('[capture] échec :', e)
  }
}
