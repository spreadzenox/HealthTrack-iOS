import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// Version iOS (HealthTrack-iOS) : dans l'app iPhone, la sauvegarde va dans Documents puis la feuille de partage
// (le lien de téléchargement ne fait rien dans WKWebView)
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore') }
})
vi.mock('@capacitor/core', async (importOriginal) => ({
  ...(await importOriginal()),
  Capacitor: { isNativePlatform: () => true, getPlatform: () => 'ios' },
}))
vi.mock('@capacitor/filesystem', () => ({
  Filesystem: { writeFile: vi.fn().mockResolvedValue({ uri: 'file:///Documents/sauvegarde.json' }) },
  Directory: { Documents: 'DOCUMENTS' },
}))
vi.mock('@capacitor/share', () => ({ Share: { share: vi.fn().mockResolvedValue({}) } }))
vi.mock('../storage/localHealthStorage', () => ({
  exportToJson: vi.fn().mockResolvedValue('{"entries":[]}'), importFromJson: vi.fn(), parseBackup: vi.fn(), countAllEntries: vi.fn(),
}))
vi.mock('../components/DoctorReportCard', () => ({ default: () => null }))
vi.mock('../services/deleteAllData', () => ({ deleteAllMyData: vi.fn() }))

import { Filesystem } from '@capacitor/filesystem'
import { Share } from '@capacitor/share'
import Data from './Data'

describe('Sauvegarde sur iPhone', () => {
  it('écrit le fichier dans Documents, ouvre la feuille de partage et dit où le retrouver', async () => {
    render(<MemoryRouter><Data /></MemoryRouter>)
    fireEvent.click(screen.getByRole('button', { name: /Télécharger la sauvegarde/ }))
    expect(await screen.findByText(/est aussi dans l’app Fichiers › Sur mon iPhone › Halcya/)).toBeInTheDocument()
    expect(Filesystem.writeFile).toHaveBeenCalledWith(expect.objectContaining({ directory: 'DOCUMENTS' }))
    expect(Share.share).toHaveBeenCalledWith(expect.objectContaining({ files: ['file:///Documents/sauvegarde.json'] }))
  })
})
