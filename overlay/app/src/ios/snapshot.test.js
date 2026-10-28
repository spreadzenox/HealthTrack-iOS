import { describe, it, expect, vi } from 'vitest'
import { SNAPSHOT_FILE, saveSnapshot, installSnapshots } from './snapshot.js'

// Version iOS (HealthTrack-iOS) : IndexedDB n'est pas durable dans WKWebView (iOS peut le reprendre quand le
// téléphone manque de place) ; une copie de secours, le même JSON que l'export, est tenue à jour dans Documents
function deps(overrides = {}) {
  return {
    countAllEntries: vi.fn(async () => 12),
    exportToJson: vi.fn(async () => '{"entries":[1]}'),
    writeFile: vi.fn(async () => ({})),
    ...overrides,
  }
}

describe('copie de secours de la base sur iPhone', () => {
  it('écrit le même JSON que l’export dans Documents', async () => {
    const d = deps()
    expect(await saveSnapshot(d)).toBe(true)
    expect(d.writeFile).toHaveBeenCalledWith(SNAPSHOT_FILE, '{"entries":[1]}')
  })

  it('base vide : n’écrase jamais une copie existante (la base a peut-être été effacée par iOS)', async () => {
    const d = deps({ countAllEntries: vi.fn(async () => 0) })
    expect(await saveSnapshot(d)).toBe(false)
    expect(d.exportToJson).not.toHaveBeenCalled()
    expect(d.writeFile).not.toHaveBeenCalled()
  })

  it('une erreur ne remonte jamais', async () => {
    const d = deps({ writeFile: vi.fn(async () => { throw new Error('disque plein') }) })
    expect(await saveSnapshot(d)).toBe(false)
  })

  it('dans l’app iPhone : demande le stockage persistant, copie au démarrage et à chaque passage en arrière-plan', async () => {
    const listeners = {}
    const d = deps({
      platform: 'ios',
      persist: vi.fn(async () => false),
      addAppStateListener: vi.fn((fn) => { listeners.state = fn }),
      wait: async () => {},
    })
    await installSnapshots(d)
    expect(d.persist).toHaveBeenCalled()
    expect(d.writeFile).toHaveBeenCalledTimes(1)
    await listeners.state({ isActive: true })
    expect(d.writeFile).toHaveBeenCalledTimes(1)
    await listeners.state({ isActive: false })
    expect(d.writeFile).toHaveBeenCalledTimes(2)
  })

  it('ailleurs que dans l’app iPhone : rien', async () => {
    const d = deps({ platform: 'android', persist: vi.fn(), addAppStateListener: vi.fn(), wait: async () => {} })
    await installSnapshots(d)
    expect(d.persist).not.toHaveBeenCalled()
    expect(d.addAppStateListener).not.toHaveBeenCalled()
    expect(d.writeFile).not.toHaveBeenCalled()
  })
})

describe('lecture de la copie de secours', () => {
  it('rend son contenu et sa date, trouvés en listant Documents', async () => {
    const { readSnapshot } = await import('./snapshot.js')
    const fs = {
      list: vi.fn(async () => [{ name: 'autre.json', mtime: 1 }, { name: SNAPSHOT_FILE, mtime: Date.parse('2026-10-27T10:00:00Z') }]),
      readFile: vi.fn(async () => ({ data: '{"entries":[1]}' })),
    }
    expect(await readSnapshot(fs)).toEqual({ text: '{"entries":[1]}', savedAt: '2026-10-27T10:00:00.000Z' })
  })

  it('pas de copie : null, sans lire de fichier absent (Capacitor l’écrirait en erreur dans la console)', async () => {
    const { readSnapshot } = await import('./snapshot.js')
    const fs = { list: vi.fn(async () => [{ name: 'capture', mtime: 1 }]), readFile: vi.fn() }
    expect(await readSnapshot(fs)).toBeNull()
    expect(fs.readFile).not.toHaveBeenCalled()
  })
})

describe('« Supprimer toutes mes données » efface aussi la copie de secours', () => {
  it('efface la copie trouvée dans Documents, et elle seule (une sauvegarde exportée reste à la personne)', async () => {
    const { deleteSnapshot } = await import('./snapshot.js')
    const fs = {
      list: vi.fn(async () => [{ name: 'Halcya-sauvegarde-2026-10-28.json', mtime: 1 }, { name: SNAPSHOT_FILE, mtime: 2 }]),
      deleteFile: vi.fn(async () => {}),
    }
    expect(await deleteSnapshot(fs)).toBe(true)
    expect(fs.deleteFile).toHaveBeenCalledTimes(1)
    expect(fs.deleteFile).toHaveBeenCalledWith(SNAPSHOT_FILE)
  })

  it('pas de copie : rien à effacer, sans toucher à un fichier absent', async () => {
    const { deleteSnapshot } = await import('./snapshot.js')
    const fs = { list: vi.fn(async () => []), deleteFile: vi.fn() }
    expect(await deleteSnapshot(fs)).toBe(false)
    expect(fs.deleteFile).not.toHaveBeenCalled()
  })

  it('une erreur ne remonte jamais', async () => {
    const { deleteSnapshot } = await import('./snapshot.js')
    const fs = { list: vi.fn(async () => [{ name: SNAPSHOT_FILE, mtime: 1 }]), deleteFile: vi.fn(async () => { throw new Error('verrouillé') }) }
    expect(await deleteSnapshot(fs)).toBe(false)
  })

  it('ailleurs que dans l’app iPhone : rien', async () => {
    const { deleteDeviceSnapshot } = await import('./snapshot.js')
    expect(await deleteDeviceSnapshot()).toBe(false)
  })
})
