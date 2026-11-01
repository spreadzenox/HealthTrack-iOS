// Tests de scripts/store-subscriptions.mjs (node --test) : catalogue identique au plugin AppStoreBilling
// (BillingRule.swift) et au tableau de store/app-store/abonnements.md, limites d'Apple, choix du palier de prix, et
// création contre un App Store Connect simulé : tout se crée au premier passage, rien au second, et un prix déjà en
// place n'est jamais modifié.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { SUBSCRIPTIONS, LIMITS, TERRITORY, GROUP, bodies, pricePointFor, currentPrices, ensureSubscriptions } from './store-subscriptions.mjs'

const root = new URL('..', import.meta.url)
const read = (path) => readFileSync(new URL(path, root), 'utf8')

test('catalogue : les identifiants du plugin AppStoreBilling (BillingRule.swift), Gold au-dessus de Silver', () => {
  const swift = read('ios/HalcyaRules/Sources/HalcyaRules/BillingRule.swift')
  const plans = [...swift.matchAll(/\("(halcya_[a-z_]+)", "(halcya_[a-z]+)", "([a-z]+)"\)/g)].map((m) => ({ storeId: m[1], productId: m[2], basePlanId: m[3] }))
  assert.deepEqual(SUBSCRIPTIONS.map((s) => s.productId).sort(), plans.map((p) => p.storeId).sort())
  for (const s of SUBSCRIPTIONS) {
    const p = plans.find((x) => x.storeId === s.productId)
    assert.equal(s.groupLevel, p.productId === 'halcya_gold' ? 1 : 2, s.productId)
    assert.equal(s.period, p.basePlanId === 'annuel' ? 'ONE_YEAR' : 'ONE_MONTH', s.productId)
  }
})

test('catalogue : prix, essai et textes du tableau de store/app-store/abonnements.md, dans les limites d’Apple', () => {
  const md = read('store/app-store/abonnements.md')
  const rows = Object.fromEntries([...md.matchAll(/^\|\s*`(halcya_[a-z_]+)`\s*\|\s*(\d)\s*\|([^|]*)\|([^|]*)\|([^|]*)\|([^|]*)\|/gm)]
    .map((m) => [m[1], { level: Number(m[2]), trial: m[4].trim(), name: m[5].trim(), description: m[6].trim() }]))
  for (const s of SUBSCRIPTIONS) {
    const row = rows[s.productId]
    assert.ok(row, `${s.productId} absent de abonnements.md`)
    assert.equal(s.groupLevel, row.level, s.productId)
    assert.equal(s.name, row.name, s.productId)
    assert.equal(s.description, row.description, s.productId)
    assert.equal(Boolean(s.trial), /essai/.test(row.trial), s.productId)
    assert.ok(s.name.length <= LIMITS.name && s.description.length <= LIMITS.description && s.referenceName.length <= LIMITS.referenceName)
  }
  // Prix décidés : Silver 29,99 €/an avec 14 jours d'essai et 4,99 €/mois, Gold 9,99 €/mois sans essai
  const by = Object.fromEntries(SUBSCRIPTIONS.map((s) => [s.productId, s]))
  assert.equal(by.halcya_premium_annuel.price, '29.99')
  assert.deepEqual(by.halcya_premium_annuel.trial, { offerMode: 'FREE_TRIAL', duration: 'TWO_WEEKS', numberOfPeriods: 1 })
  assert.equal(by.halcya_premium_mensuel.price, '4.99')
  assert.equal(by.halcya_gold_mensuel.price, '9.99')
  assert.equal(by.halcya_gold_mensuel.trial, null)
  assert.equal(by.halcya_gold_annuel, undefined, 'Gold annuel : seulement si le propriétaire le décide')
  assert.match(md, /9,99 €/)
  assert.match(md, /4,99 €\/mois ou 29,99 €\/an/)
})

test('catalogue : jamais de promesse de précision ni de nom de modèle dans les textes des abonnements', () => {
  for (const s of SUBSCRIPTIONS) {
    const text = `${s.name} ${s.description} ${s.referenceName}`
    assert.doesNotMatch(text, /erreur|précis|meilleur|Gemini|Flash|Google/i, s.productId)
  }
})

test('corps des requêtes : France seulement, pas de partage familial, niveau et durée du catalogue', () => {
  const gold = SUBSCRIPTIONS[0]
  assert.deepEqual(bodies.subscription(gold, 'g1').data.attributes, {
    name: 'Halcya Gold mensuel', productId: 'halcya_gold_mensuel', subscriptionPeriod: 'ONE_MONTH', groupLevel: 1, familySharable: false,
  })
  const av = bodies.availability('s1').data
  assert.equal(av.attributes.availableInNewTerritories, false)
  assert.deepEqual(av.relationships.availableTerritories.data, [{ type: 'territories', id: 'FRA' }])
  assert.equal(bodies.price('s1', 'pp').data.relationships.territory.data.id, TERRITORY)
  assert.equal(bodies.groupLocalization('g1').data.attributes.name, GROUP.name)
})

test('pricePointFor : le palier dont le prix client est exactement celui décidé', () => {
  const points = [{ id: 'a', attributes: { customerPrice: '4.49' } }, { id: 'b', attributes: { customerPrice: '4.99' } }, { id: 'c', attributes: { customerPrice: '29.99' } }]
  assert.equal(pricePointFor(points, '4.99').id, 'b')
  assert.equal(pricePointFor(points, '29.99').id, 'c')
  assert.throws(() => pricePointFor(points, '9.99'), /0 trouvé/)
})

test('currentPrices : prix clients en place lus dans les paliers inclus', () => {
  const res = {
    data: [{ id: 'p1', relationships: { subscriptionPricePoint: { data: { id: 'pp1' } } } }, { id: 'p2', relationships: { subscriptionPricePoint: { data: { id: 'pp1' } } } }],
    included: [{ type: 'subscriptionPricePoints', id: 'pp1', attributes: { customerPrice: '4.99' } }, { type: 'territories', id: 'FRA' }],
  }
  assert.deepEqual(currentPrices(res), ['4.99'])
  assert.deepEqual(currentPrices({ data: [] }), [])
})

/** App Store Connect simulé : juste ce que le script lit et crée. */
function fakeAsc({ prePrice = null, monthlyPlans = false } = {}) {
  const db = { groups: [], groupLocs: [], subs: [], locs: [], avail: {}, prices: {}, offers: {} }
  const calls = []
  let n = 0
  const id = (p) => `${p}${++n}`
  const json = (status, body) => ({ ok: status < 300, status, json: async () => body })
  const pricePoints = (subId) => ['0.99', '4.99', '9.99', '29.99', '79.99'].map((c) => ({ id: `${subId}-pp-${c}`, type: 'subscriptionPricePoints', attributes: { customerPrice: c } }))
  const fetchImpl = async (url, { method, body }) => {
    const u = new URL(url)
    const path = u.pathname
    const data = body ? JSON.parse(body).data : null
    calls.push(`${method} ${path}`)
    let m
    if (method === 'GET' && path === '/v1/apps') return json(200, { data: [{ id: 'app1', type: 'apps' }] })
    if (method === 'GET' && path === '/v1/apps/app1/subscriptionGroups') return json(200, { data: db.groups })
    if (method === 'POST' && path === '/v1/subscriptionGroups') {
      const g = { id: id('g'), type: 'subscriptionGroups', attributes: data.attributes }
      db.groups.push(g)
      return json(201, { data: g })
    }
    if ((m = /^\/v1\/subscriptionGroups\/(\w+)\/subscriptionGroupLocalizations$/.exec(path))) return json(200, { data: db.groupLocs.filter((l) => l.group === m[1]) })
    if (method === 'POST' && path === '/v1/subscriptionGroupLocalizations') {
      db.groupLocs.push({ id: id('gl'), group: data.relationships.subscriptionGroup.data.id, attributes: data.attributes })
      return json(201, { data: {} })
    }
    if ((m = /^\/v1\/subscriptionGroups\/(\w+)\/subscriptions$/.exec(path))) return json(200, { data: db.subs.filter((s) => s.group === m[1]) })
    if (method === 'POST' && path === '/v1/subscriptions') {
      const s = { id: id('s'), type: 'subscriptions', group: data.relationships.group.data.id, attributes: { ...data.attributes, state: 'MISSING_METADATA' } }
      db.subs.push(s)
      if (prePrice) db.prices[s.id] = [prePrice]
      return json(201, { data: s })
    }
    if ((m = /^\/v1\/subscriptions\/(\w+)\/subscriptionLocalizations$/.exec(path))) return json(200, { data: db.locs.filter((l) => l.sub === m[1]) })
    if (method === 'POST' && path === '/v1/subscriptionLocalizations') {
      db.locs.push({ id: id('l'), sub: data.relationships.subscription.data.id, attributes: data.attributes })
      return json(201, { data: {} })
    }
    if ((m = /^\/v1\/subscriptions\/(\w+)\/subscriptionAvailability$/.exec(path))) {
      const a = db.avail[m[1]]
      return a ? json(200, { data: a, included: a.relationships.availableTerritories.data }) : json(404, { errors: [{ title: 'Not found' }] })
    }
    if (method === 'POST' && path === '/v1/subscriptionAvailabilities') {
      db.avail[data.relationships.subscription.data.id] = { id: id('a'), ...data }
      return json(201, { data: {} })
    }
    if ((m = /^\/v1\/subscriptions\/(\w+)\/prices$/.exec(path))) {
      assert.equal(u.searchParams.get('filter[territory]'), 'FRA')
      const list = db.prices[m[1]] || []
      return json(200, {
        data: list.map((c, i) => ({ id: `${m[1]}-p${i}`, relationships: { subscriptionPricePoint: { data: { id: `${m[1]}-pp-${c}` } } } })),
        included: list.map((c) => ({ type: 'subscriptionPricePoints', id: `${m[1]}-pp-${c}`, attributes: { customerPrice: c } })),
      })
    }
    if ((m = /^\/v1\/subscriptions\/(\w+)\/pricePoints$/.exec(path))) {
      // Deux pages, pour vérifier que le script suit `links.next` ; avec `monthlyPlans`, des paliers « MONTHLY »
      // au même prix que ceux du paiement d'avance, sauf si l'on filtre sur UPFRONT
      const upfront = u.searchParams.get('filter[planType]') === 'UPFRONT'
      const all = [...pricePoints(m[1]), ...(monthlyPlans && !upfront ? pricePoints(`${m[1]}m`) : [])]
      const second = u.searchParams.get('cursor') === '2'
      return json(200, second ? { data: all.slice(3), links: {} } : { data: all.slice(0, 3), links: { next: `${url}&cursor=2` } })
    }
    if (method === 'POST' && path === '/v1/subscriptionPrices') {
      const sub = data.relationships.subscription.data.id
      const c = data.relationships.subscriptionPricePoint.data.id.split('-pp-')[1]
      assert.equal(data.relationships.territory.data.id, 'FRA')
      db.prices[sub] = [...(db.prices[sub] || []), c]
      return json(201, { data: {} })
    }
    if ((m = /^\/v1\/subscriptions\/(\w+)\/introductoryOffers$/.exec(path))) return json(200, { data: db.offers[m[1]] || [] })
    if (method === 'POST' && path === '/v1/subscriptionIntroductoryOffers') {
      const sub = data.relationships.subscription.data.id
      db.offers[sub] = [{ id: id('o'), attributes: data.attributes, relationships: { territory: { data: data.relationships.territory.data } } }]
      return json(201, { data: {} })
    }
    if ((m = /^\/v1\/subscriptions\/(\w+)$/.exec(path)) && method === 'GET') return json(200, { data: db.subs.find((s) => s.id === m[1]) })
    return json(500, { errors: [{ title: `route non simulée ${method} ${path}` }] })
  }
  return { db, calls, fetchImpl }
}

test('ensureSubscriptions : tout se crée au premier passage, rien au second (idempotent)', async () => {
  const asc = fakeAsc()
  const lines = []
  const first = await ensureSubscriptions({ token: 't', fetchImpl: asc.fetchImpl, log: (l) => lines.push(l) })
  assert.deepEqual(first.drift, [])
  assert.equal(asc.db.groups.length, 1)
  assert.equal(asc.db.groups[0].attributes.referenceName, 'Halcya')
  assert.equal(asc.db.groupLocs.length, 1)
  assert.deepEqual(asc.db.subs.map((s) => [s.attributes.productId, s.attributes.groupLevel]), [
    ['halcya_gold_mensuel', 1], ['halcya_premium_annuel', 2], ['halcya_premium_mensuel', 2],
  ])
  const priceOf = (pid) => asc.db.prices[asc.db.subs.find((s) => s.attributes.productId === pid).id]
  assert.deepEqual(priceOf('halcya_gold_mensuel'), ['9.99'])
  assert.deepEqual(priceOf('halcya_premium_annuel'), ['29.99'])
  assert.deepEqual(priceOf('halcya_premium_mensuel'), ['4.99'])
  const offers = Object.entries(asc.db.offers)
  assert.equal(offers.length, 1, 'un seul essai : Silver annuel')
  assert.equal(asc.db.subs.find((s) => s.id === offers[0][0]).attributes.productId, 'halcya_premium_annuel')
  assert.equal(offers[0][1][0].attributes.duration, 'TWO_WEEKS')
  assert.ok(Object.values(asc.db.avail).every((a) => a.attributes.availableInNewTerritories === false))
  assert.deepEqual(first.states, { halcya_gold_mensuel: 'MISSING_METADATA', halcya_premium_annuel: 'MISSING_METADATA', halcya_premium_mensuel: 'MISSING_METADATA' })
  assert.ok(lines.some((l) => /halcya_premium_annuel : créé, .*essai gratuit/.test(l)))

  const before = asc.calls.filter((c) => !c.startsWith('GET')).length
  const again = []
  const second = await ensureSubscriptions({ token: 't', fetchImpl: asc.fetchImpl, log: (l) => again.push(l) })
  assert.deepEqual(second.drift, [])
  assert.equal(asc.calls.filter((c) => !c.startsWith('GET')).length, before, 'aucune écriture au second passage')
  assert.equal(asc.db.subs.length, 3)
  assert.ok(again.filter((l) => /^halcya_/.test(l)).every((l) => /déjà en place/.test(l)))
})

test('ensureSubscriptions : un prix déjà en place n’est jamais modifié, l’écart est signalé', async () => {
  const asc = fakeAsc({ prePrice: '0.99' })
  const { drift } = await ensureSubscriptions({ token: 't', fetchImpl: asc.fetchImpl })
  assert.equal(drift.length, 3)
  assert.match(drift[0], /prix 0\.99 € en place, 9\.99 € décidé \(non modifié\)/)
  assert.equal(asc.calls.filter((c) => c === 'POST /v1/subscriptionPrices').length, 0)
})

test('ensureSubscriptions : deux paliers au même prix (paiement mensuel d’Apple) → celui du paiement d’avance', async () => {
  const asc = fakeAsc({ monthlyPlans: true })
  const { drift } = await ensureSubscriptions({ token: 't', fetchImpl: asc.fetchImpl })
  assert.deepEqual(drift, [])
  for (const s of asc.db.subs) assert.equal(asc.db.prices[s.id].length, 1)
  assert.equal(asc.calls.filter((c) => c === 'POST /v1/subscriptionPrices').length, 3)
})
