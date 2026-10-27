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

/** Écrit la copie si la base contient quelque chose. Rend `true` si elle a été écrite ; ne lève jamais. */
export async function saveSnapshot({ countAllEntries, exportToJson, writeFile }) {
  try {
    if ((await countAllEntries()) === 0) return false
    await writeFile(SNAPSHOT_FILE, await exportToJson())
    return true
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
      writeFile: (path, data) => Filesystem.writeFile({ path, data, directory: Directory.Documents, encoding: Encoding.UTF8 }),
    })
  } catch {
    // jamais bloquant pour l'app
  }
}
