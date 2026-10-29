import { describe, it, expect } from 'vitest'
import { feedbackLink } from './feedback'

// Version iOS (HealthTrack-iOS) : sur iPhone, « Votre avis » ouvre un ticket du dépôt de l'iPhone (correctif 27),
// ni le Play Store ni le dépôt d'Android
describe('« Votre avis » sur iPhone (variante appstore)', () => {
  it('ouvre un ticket du dépôt de l’iPhone, titré avec la version, sans rien joindre', () => {
    const link = feedbackLink('appstore', '576')
    const url = new URL(link.url)
    expect(url.origin + url.pathname).toBe('https://github.com/spreadzenox/HealthTrack-iOS/issues/new')
    expect(url.searchParams.get('title')).toBe('Avis — Halcya pour iPhone v576')
    expect([...url.searchParams.keys()]).toEqual(['title'])
    expect(link.label).toBe('Envoyer un avis')
    expect(link.hint).not.toMatch(/Play|Google|Android/)
  })
})
