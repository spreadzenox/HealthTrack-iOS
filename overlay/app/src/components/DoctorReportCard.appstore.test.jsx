import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

// Version iOS (HealthTrack-iOS) : le fichier se retrouve dans Fichiers › Sur mon iPhone › Halcya
vi.mock('../config/distribution', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, DISTRIBUTION: 'appstore', FEATURES: actual.featuresFor('appstore') }
})

import DoctorReportCard from './DoctorReportCard'

describe('Rapport PDF sur iPhone (variante appstore)', () => {
  it('indique où retrouver le fichier sur iPhone', async () => {
    const create = vi.fn().mockResolvedValue({ fileName: 'rapport.pdf', bytes: new Uint8Array() })
    const save = vi.fn().mockResolvedValue({ saved: 'documents', shared: true })
    render(<DoctorReportCard create={create} save={save} />)
    fireEvent.click(screen.getByRole('button', { name: /Préparer le rapport/ }))
    fireEvent.click(screen.getByRole('button', { name: 'Créer le PDF' }))
    expect(await screen.findByText('rapport.pdf est aussi dans l’app Fichiers › Sur mon iPhone › Halcya.')).toBeInTheDocument()
  })
})
