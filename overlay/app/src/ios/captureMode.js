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
// Volets repliés à ouvrir puis capturer : bouton touché (`click`, texte exact), `<details>` ouvert (`open`, id),
// élément amené en haut de l'écran (`target`, id)
export const REVEALS = {
  '/connectors': [{ name: 'guides', click: 'Ajouter une source', open: 'guide-garmin', target: 'watch-guides-title' }],
}

const pageName = (route) => route.replace(/^\//, '') || 'accueil'

export function buildPlan(routes = ROUTES, darkRoutes = DARK_ROUTES, scrolls = SCROLLS, reveals = REVEALS) {
  const light = (route) => {
    const base = { name: `demo-clair-${pageName(route)}`, route, data: 'demo', theme: 'light' }
    const more = Array.from({ length: scrolls[route] || 0 }, (_, k) => ({ ...base, name: `${base.name}-${k + 2}`, scroll: k + 1 }))
    const opened = (reveals[route] || []).map((reveal) => ({ ...base, name: `${base.name}-${reveal.name}`, reveal }))
    return [base, ...more, ...opened]
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
  if (step.reveal) {
    await deps.reveal(step.reveal)
    await wait(800)
  }
  log(`[capture] page ${step.name}`)
  await signal(step.name)
  if (!(await waitAck(step.name))) log(`[capture] pas d'accusé pour ${step.name}, on continue`)
  const next = plan[index + 1]
  localStorage.setItem(STEP_KEY, String(index + 1))
  if (!next) {
    if (deps.probe) await deps.probe({ signal, waitAck, wait, log })
    log('[capture] fin')
    await signal('fin')
    return
  }
  await prepare(next, deps)
  go(next.route)
}

const READY = 'capture/ready.txt'
const ACK = 'capture/ack.txt'

/**
 * Attend que le script ait répondu `name` dans ack.txt, relu toutes les 300 ms ; 100 essais (30 s) suffisent pour
 * une capture. Rend faux si la réponse ne vient pas.
 */
export async function waitForAck({ readAck, sleep }, name, tries = 100) {
  for (let i = 0; i < tries; i++) {
    try {
      if (String(await readAck()).trim() === name) return true
    } catch {
      // pas encore de réponse
    }
    await sleep(300)
  }
  return false
}

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
      reveal: async ({ click, open, target }) => {
        ;[...document.querySelectorAll('button')].find((b) => b.textContent.trim() === click)?.click()
        await sleep(800) // le volet s'affiche au rendu suivant
        document.getElementById(open)?.setAttribute('open', '')
        document.getElementById(target)?.scrollIntoView({ block: 'start', behavior: 'instant' })
      },
      log: (message) => console.log(message),
      wait: sleep,
      signal: (name) => Filesystem.writeFile({ ...file, path: READY, data: name, recursive: true }),
      probe: probeHealthKit,
      waitAck: (name, tries) =>
        waitForAck({ readAck: async () => (await Filesystem.readFile({ ...file, path: ACK })).data, sleep }, name, tries),
    })
  } catch (e) {
    console.error('[capture] échec :', e)
  }
}

/**
 * Essai HealthKit (étape I4) : disponibilité, état des autorisations, puis demande d'autorisation (lecture, et
 * écriture des pas pour l'aller-retour, phrase d'usage ajoutée à la seule build de captures) ; sa feuille est
 * capturée (« healthkit-autorisation »), puis le test d'interface du dépôt (uitests/) l'accepte avant que le script
 * réponde : jusqu'à 3 min d'attente. Acceptée, des pas et une VFC sont écrits dans Santé, relus, puis relus par le
 * connecteur de l'app (VFC rangée en SDNN) : preuve que l'import marche de bout en bout. Résultats dans la console
 * (`[healthkit] …`).
 */
export async function probeHealthKit({ signal, waitAck, wait, log, health, connector }) {
  const say = (what, value) => log(`[healthkit] ${what} ${typeof value === 'string' ? value : JSON.stringify(value)}`)
  const failed = (what) => (e) => say(`${what} erreur`, e?.message || String(e))
  try {
    const Health = health ?? (await import('@capgo/capacitor-health')).Health
    const read = ['steps', 'sleep', 'heartRate', 'heartRateVariability'] // comme le connecteur (VFC lue en SDNN)
    await Health.isAvailable().then((r) => say('isAvailable', r), failed('isAvailable'))
    await Health.checkAuthorization({ read, write: [] }).then((r) => say('checkAuthorization', r), failed('checkAuthorization'))
    let answered = false
    Health.requestAuthorization({ read, write: ['steps', 'heartRateVariability'] }).then(
      (r) => { answered = true; say('requestAuthorization', r) },
      (e) => { answered = true; failed('requestAuthorization')(e) },
    )
    await wait(4000)
    if (!answered) say('requestAuthorization', 'feuille affichée, pas de réponse en 4 s')
    await signal('healthkit-autorisation')
    if (!(await waitAck('healthkit-autorisation', 600))) say('aller-retour', 'pas d’accusé du script en 3 min')
    for (let i = 0; i < 20 && !answered; i++) await wait(500)
    if (!answered) return say('aller-retour', 'feuille toujours ouverte : pas d’écriture ni de relecture')
    const endDate = new Date().toISOString()
    const startDate = new Date(Date.now() - 3600 * 1000).toISOString()
    await Health.saveSample({ dataType: 'steps', value: 1234, startDate, endDate }).then(() => say('saveSample', 'ok'), failed('saveSample'))
    // VFC de démonstration : HealthKit la donne en SDNN, que le connecteur doit ranger à part de la RMSSD d'Android
    await Health.saveSample({ dataType: 'heartRateVariability', value: 48, startDate, endDate }).then(() => say('saveSample VFC', 'ok'), failed('saveSample VFC'))
    await Health.readSamples({ dataType: 'steps', startDate, endDate, limit: 10 }).then(
      (r) => say('readSamples', { count: r?.samples?.length ?? 0, values: (r?.samples || []).map((x) => x.value) }),
      failed('readSamples'),
    )
    // Même lecture que l'app (Sources, onboarding) : le connecteur, avec un enregistreur qui ne garde rien
    const imported = []
    const sync = connector ?? new (await import('../connectors/HealthConnectConnector.js')).HealthConnectConnector()
    await sync.sync({ since: new Date(startDate), until: new Date(), writer: async (entries) => imported.push(...entries) }).then(
      (r) => say('connecteur', {
        synced: r?.synced,
        errors: r?.errors,
        pas: imported.filter((e) => e.type === 'steps').map((e) => ({ value: e.payload?.value, source: e.payload?.sourceName })),
        vfc: imported
          .filter((e) => e.type === 'heart_rate' && /^heartRateVariability/.test(e.payload?.subtype || ''))
          .map((e) => ({ value: e.payload?.value, subtype: e.payload?.subtype })),
      }),
      failed('connecteur'),
    )
  } catch (e) {
    say('échec', e?.message || String(e))
  }
}
