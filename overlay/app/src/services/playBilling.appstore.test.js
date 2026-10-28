import { describe, it, expect } from 'vitest'
import { describePlans, annualSavingPercent } from './playBilling'

// Version iOS (HealthTrack-iOS), étape I6 : le plugin Swift rend les produits de StoreKit 2 sous la forme des
// ProductDetails de PlayBilling (ios/HalcyaRules › BillingRule, testé par XCTest) ; ce contrat garde
// `describePlans` d'Android utilisable tel quel. Mêmes valeurs que BillingRuleTests.swift.
const fromStoreKit = [
  {
    productId: 'halcya_premium',
    offers: [
      {
        basePlanId: 'annuel',
        offerToken: 'halcya_premium_annuel',
        phases: [
          { priceMicros: 0, formattedPrice: '', billingPeriod: 'P2W', currency: 'EUR' },
          { priceMicros: 29_990_000, formattedPrice: '29,99 €', billingPeriod: 'P1Y', currency: 'EUR' },
        ],
      },
      {
        basePlanId: 'mensuel',
        offerToken: 'halcya_premium_mensuel',
        phases: [{ priceMicros: 2_990_000, formattedPrice: '2,99 €', billingPeriod: 'P1M', currency: 'EUR' }],
      },
    ],
  },
]

describe('formules App Store lues par describePlans (contrat avec BillingRule.swift)', () => {
  it('annuel avec essai de 14 jours, puis mensuel ; le jeton d’offre est l’id du produit App Store', () => {
    expect(describePlans(fromStoreKit)).toEqual([
      { basePlanId: 'annuel', offerToken: 'halcya_premium_annuel', period: 'year', price: '29,99 €', priceMicros: 29_990_000, currency: 'EUR', trialDays: 14 },
      { basePlanId: 'mensuel', offerToken: 'halcya_premium_mensuel', period: 'month', price: '2,99 €', priceMicros: 2_990_000, currency: 'EUR', trialDays: null },
    ])
  })

  it('l’économie de l’annuel se calcule sur les prix de l’App Store, comme sur ceux de Google Play', () => {
    expect(annualSavingPercent(describePlans(fromStoreKit))).toBe(16)
  })
})
