/**
 * Copie de secours de la base, version iOS (dépôt HealthTrack-iOS).
 *
 * Dans WKWebView, IndexedDB n'est pas durable : iOS peut le reprendre quand le téléphone manque de place (guide
 * « Data Storage » de Capacitor, politique de stockage de WebKit ; journal/RECHERCHE.md). L'app tient donc à jour,
 * dans son dossier Documents (visible dans Fichiers › Sur mon iPhone › Halcya, et sauvegardé par iCloud avec le
 * reste de l'app), le même fichier JSON que « Télécharger la sauvegarde » : il se restaure par « Importer ».
 * Rien ne quitte le téléphone ; une base vide n'écrase jamais la copie existante.
 */
export const SNAPSHOT_FILE = 'Halcya-copie-de-secours.json'

/**
 * Réglages gardés dans la copie (champ `iosSettings`, ignoré par l'import) : la sauvegarde iCloud n'emporte pas le
 * localStorage de WKWebView (mesuré le 28/10), alors que la sauvegarde Android les ramène. Des préférences seulement :
 * jamais un secret ni un état propre au téléphone (`DEVICE_BOUND_KEYS` de `restoreGuard.js`, appairages, jetons,
 * abonnement, consentement à l'IA redemandé sur le nouveau téléphone) ; l'identifiant d'installation non plus.
 */
export const SNAPSHOT_SETTINGS = ['healthtrack_theme', 'healthtrack_evening_note', 'healthtrack_gut_evening', 'healthtrack_weather']

function pickSettings(storage) {
  const settings = {}
  for (const key of SNAPSHOT_SETTINGS) {
    const value = storage?.getItem(key)
    if (value != null) settings[key] = value
  }
  return Object.keys(settings).length ? settings : null
}

/** Écrit la copie si la base contient quelque chose. Rend `true` si elle a été écrite ; ne lève jamais. */
export async function saveSnapshot({ countAllEntries, exportToJson, writeFile, storage }) {
  try {
    if ((await countAllEntries()) === 0) return false
    const json = await exportToJson()
    const settings = pickSettings(storage)
    await writeFile(SNAPSHOT_FILE, settings ? JSON.stringify({ ...JSON.parse(json), iosSettings: settings }, null, 2) : json)
    return true
  } catch {
    return false
  }
}

/** Rétablit les réglages de la liste trouvés dans une copie ; rend leurs clés. Ne lève jamais. */
export function restoreSnapshotSettings(text, storage = globalThis.localStorage) {
  try {
    const settings = JSON.parse(text)?.iosSettings
    if (!settings || typeof settings !== 'object') return []
    const restored = SNAPSHOT_SETTINGS.filter((key) => typeof settings[key] === 'string')
    for (const key of restored) storage.setItem(key, settings[key])
    return restored
  } catch {
    return []
  }
}

/**
 * La copie de secours (`{ text, savedAt }`), ou null s'il n'y en a pas. `fs.list()` rend les fichiers de Documents
 * (`{ name, mtime }`) : on n'interroge jamais un fichier absent, que Capacitor écrirait en erreur dans la console.
 * Ne lève jamais.
 */
export async function readSnapshot(fs) {
  try {
    const entry = (await fs.list()).find((f) => f.name === SNAPSHOT_FILE)
    if (!entry) return null
    const { data } = await fs.readFile(SNAPSHOT_FILE)
    return { text: String(data), savedAt: new Date(entry.mtime).toISOString() }
  } catch {
    return null
  }
}

/** Lecture réelle, dans l'app iPhone seulement. */
export async function readDeviceSnapshot() {
  try {
    const [{ Capacitor }, { Filesystem, Directory, Encoding }] = await Promise.all([import('@capacitor/core'), import('@capacitor/filesystem')])
    if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'ios') return null
    return readSnapshot({
      list: async () => (await Filesystem.readdir({ path: '', directory: Directory.Documents })).files,
      readFile: (path) => Filesystem.readFile({ path, directory: Directory.Documents, encoding: Encoding.UTF8 }),
    })
  } catch {
    return null
  }
}

/**
 * « Supprimer toutes mes données » : la copie contient toutes les entrées et le profil, et part dans la sauvegarde
 * iCloud ; elle est effacée aussi (les sauvegardes exportées par la personne restent). Rend `true` si elle l'a été ;
 * ne lève jamais.
 */
export async function deleteSnapshot(fs) {
  try {
    if (!(await fs.list()).some((f) => f.name === SNAPSHOT_FILE)) return false
    await fs.deleteFile(SNAPSHOT_FILE)
    return true
  } catch {
    return false
  }
}

/** Effacement réel, dans l'app iPhone seulement. */
export async function deleteDeviceSnapshot() {
  try {
    const [{ Capacitor }, { Filesystem, Directory }] = await Promise.all([import('@capacitor/core'), import('@capacitor/filesystem')])
    if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'ios') return false
    return deleteSnapshot({
      list: async () => (await Filesystem.readdir({ path: '', directory: Directory.Documents })).files,
      deleteFile: (path) => Filesystem.deleteFile({ path, directory: Directory.Documents }),
    })
  } catch {
    return false
  }
}

/** Dans l'app iPhone : stockage persistant demandé, copie au démarrage puis à chaque passage en arrière-plan. */
export async function installSnapshots(deps) {
  if (deps.platform !== 'ios') return
  try {
    await deps.persist?.()
  } catch {
    // sans garantie de toute façon : la copie de secours reste le filet
  }
  deps.addAppStateListener(({ isActive }) => (isActive ? undefined : saveSnapshot(deps)))
  // Laisser l'Accueil se charger avant la première copie
  await deps.wait(10_000)
  await saveSnapshot(deps)
}

/** Branchement réel : Capacitor, @capacitor/app, @capacitor/filesystem et la base de l'app. */
export async function startSnapshots() {
  try {
    const [{ Capacitor }, { App }, { Filesystem, Directory, Encoding }, storage] = await Promise.all([
      import('@capacitor/core'),
      import('@capacitor/app'),
      import('@capacitor/filesystem'),
      import('../storage/localHealthStorage.js'),
    ])
    await installSnapshots({
      platform: Capacitor.isNativePlatform() ? Capacitor.getPlatform() : 'web',
      persist: () => navigator.storage?.persist?.(),
      addAppStateListener: (fn) => App.addListener('appStateChange', fn),
      wait: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
      countAllEntries: storage.countAllEntries,
      exportToJson: storage.exportToJson,
      storage: window.localStorage,
      writeFile: (path, data) => Filesystem.writeFile({ path, data, directory: Directory.Documents, encoding: Encoding.UTF8 }),
    })
  } catch {
    // jamais bloquant pour l'app
  }
}
