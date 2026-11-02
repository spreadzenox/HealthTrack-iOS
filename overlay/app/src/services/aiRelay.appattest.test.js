import { describe, it, expect, vi, beforeEach } from 'vitest'

// Version iOS (HealthTrack-iOS), étape I6 : l'analyse des repas porte l'assertion App Attest de l'iPhone (correctif 38),
// calculée sur le corps exact envoyé : le relais d'Android la vérifie sur le corps brut (v713, #629, I6-RELAIS-5d-2).
const attest = vi.hoisted(() => ({ calls: [] }))
vi.mock('../ios/appAttest.js', () => ({
  iosAttestHeaders: vi.fn(async (args) => {
    attest.calls.push(args)
    return { 'X-AppAttest-Key': 'cle-1', 'X-AppAttest-Assertion': 'YXNzZXJ0aW9u', 'X-AppAttest-Time': '5' }
  }),
}))

import { analyzeTextViaRelay } from './aiRelay'

describe('analyse des repas : assertion App Attest de l’iPhone (correctif 38)', () => {
  beforeEach(() => {
    localStorage.clear()
    attest.calls.length = 0
  })

  it('en-têtes X-AppAttest-* ajoutés, signés sur le corps exact de la requête', async () => {
    const fetchImpl = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ parsed: { items: [] } }) }))
    await analyzeTextViaRelay('une salade', { fetchImpl, integrity: async () => ({ token: null, reason: 'no_plugin' }), testDevice: async () => false })
    const [url, init] = fetchImpl.mock.calls[0]
    expect(url).toMatch(/\/v1\/meal\/analyze$/)
    expect(init.headers).toMatchObject({ 'X-AppAttest-Key': 'cle-1', 'X-AppAttest-Assertion': 'YXNzZXJ0aW9u', 'X-AppAttest-Time': '5' })
    expect(attest.calls).toHaveLength(1)
    expect(attest.calls[0].body).toBe(init.body)
    expect(attest.calls[0].installId).toBe(init.headers['X-Install-Id'])
  })
})
