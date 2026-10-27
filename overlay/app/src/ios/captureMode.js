/**
 * Mode « captures » de la version iOS (dépôt HealthTrack-iOS), compilé seulement quand VITE_IOS_CAPTURE=1 : la build
 * simulateur du workflow ios-build, jamais une build envoyée aux utilisateurs.
 *
 * L'app parcourt elle-même un plan de pages (le simulateur affiche « Ouvrir dans Halcya ? » pour tout lien externe,
 * donc on ne la pilote pas de l'extérieur). À chaque page, elle attend que l'écran se pose, écrit le nom de la page
 * dans Documents/capture/ready.txt (la console relayée arrive par paquets : trop tard pour synchroniser), attend que
 * scripts/ios-captures.sh, qui lit ce fichier dans le conteneur de l'app sur le Mac, ait capturé l'écran et répondu
 * dans Documents/capture/ack.txt, puis prépare l'étape suivante et recharge sur sa page. Comme `npm run visual` d'Android : données
 * de démo (scripts/visual/demoData.mjs) ajoutées une seule fois, onboarding noté fait, nouveautés notées vues.
 */
export const STEP_KEY = 'halcya_ios_capture_step'
const SEEDED_KEY = 'halcya_ios_capture_seeded'

// Les mêmes pages que `npm run visual` d'Android (scripts/visual/visual-check.mjs, DEFAULT_ROUTES), sauf /bienvenue
export const ROUTES = ['/', '/journal', '/tendances', '/food', '/nutrition', '/data', '/connectors', '/recommendations',
  '/settings', '/plus', '/montre', '/premium', '/bien-etre', '/reintroduction']
export const DARK_ROUTES = ['/', '/journal', '/recommendations']
// Pages longues : écrans suivants, défilés d'environ 80 % de l'écran chacun (`-2`, `-3`…)
export const SCROLLS = { '/connectors': 2, '/data': 1, '/settings': 1 }

const pageName = (route) => route.replace(/^\//, '') || 'accueil'

export function buildPlan(routes = ROUTES, darkRoutes = DARK_ROUTES, scrolls = SCROLLS) {
  const light = (route) => {
    const base = { name: `demo-clair-${pageName(route)}`, route, data: 'demo', theme: 'light' }
    const more = Array.from({ length: scrolls[route] || 0 }, (_, k) => ({ ...base, name: `${base.name}-${k + 2}`, scroll: k + 1 }))
    return [base, ...more]
  }
  return [
    { name: 'vierge-onboarding', route: null, data: null, theme: null },
    // 3e écran de l'onboarding (choix de la montre), avant que les données de démo ne le marquent fait
    { name: 'vierge-onboarding-montre', route: '/bienvenue', data: null, theme: null, onboarding: { goal: 'energy', step: 2 } },
    ...routes.flatMap(light),
    ...darkRoutes.map((route) => ({ name: `demo-sombre-${pageName(route)}`, route, data: 'demo', theme: 'dark' })),
  ]
}

async function prepare(step, { storage, demoEntries, latestChangelogId, localStorage }) {
  if (step.onboarding) localStorage.setItem('healthtrack_onboarding', JSON.stringify(step.onboarding))
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
export async function runCaptureStep(plan, deps, { settleMs = 5000 } = {}) {
  const { localStorage, go, log, wait, signal, waitAck, scroll } = deps
  const index = Number(localStorage.getItem(STEP_KEY) ?? 0)
  const step = plan[index]
  if (!step) return
  await wait(settleMs)
  if (step.scroll) {
    scroll(step.scroll)
    await wait(800)
  }
  log(`[capture] page ${step.name}`)
  await signal(step.name)
  if (!(await waitAck(step.name))) log(`[capture] pas d'accusé pour ${step.name}, on continue`)
  const next = plan[index + 1]
  localStorage.setItem(STEP_KEY, String(index + 1))
  if (!next) {
    log('[capture] fin')
    await signal('fin')
    return
  }
  await prepare(next, deps)
  go(next.route)
}

const READY = 'capture/ready.txt'
const ACK = 'capture/ack.txt'

export async function installCaptureMode() {
  try {
    const [storage, demo, changelog, { Filesystem, Directory, Encoding }] = await Promise.all([
      import('../storage/localHealthStorage.js'),
      import('../../scripts/visual/demoData.mjs'),
      import('../data/changelog.js'),
      import('@capacitor/filesystem'),
    ])
    const file = { directory: Directory.Documents, encoding: Encoding.UTF8 }
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    await runCaptureStep(buildPlan(), {
      storage,
      demoEntries: () => demo.generateDemoEntries(),
      latestChangelogId: changelog.ALL_CHANGELOG[0]?.id ?? null,
      localStorage: window.localStorage,
      go: (path) => window.location.assign(path),
      scroll: (screens) => window.scrollTo({ top: screens * Math.round(window.innerHeight * 0.8), behavior: 'instant' }),
      log: (message) => console.log(message),
      wait: sleep,
      signal: (name) => Filesystem.writeFile({ ...file, path: READY, data: name, recursive: true }),
      // Jusqu'à 30 s : le temps que le script capture l'écran et réponde
      waitAck: async (name) => {
        for (let i = 0; i < 100; i++) {
          try {
            const { data } = await Filesystem.readFile({ ...file, path: ACK })
            if (String(data).trim() === name) return true
          } catch {
            // pas encore de réponse
          }
          await sleep(300)
        }
        return false
      },
    })
  } catch (e) {
    console.error('[capture] échec :', e)
  }
}
