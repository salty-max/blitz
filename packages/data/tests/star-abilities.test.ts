import {
  getStarAbility,
  glossary,
  skills,
  specialRules,
  starAbilities,
  starPlayers,
} from '@blitz/data'
import { refKeys } from '@blitz/schema'
import { describe, expect, test } from 'bun:test'

describe('star abilities', () => {
  test('load and resolve by key', () => {
    expect(starAbilities.length).toBeGreaterThan(50)
    expect(getStarAbility('consummate-professional')?.name).toBe(
      'Consummate Professional'
    )
    expect(getStarAbility('not-an-ability')).toBeUndefined()
  })

  test('keys are unique', () => {
    const keys = starAbilities.map((a) => a.key)
    expect(new Set(keys).size).toBe(keys.length)
  })

  test('no star-ability key collides with a special-rule key', () => {
    const ruleKeys = new Set<string>(specialRules.map((r) => r.key))
    const collisions = starAbilities
      .filter((a) => ruleKeys.has(a.key))
      .map((a) => a.key)
    expect(collisions).toEqual([])
  })

  test('every star references defined abilities, and at least one', () => {
    const keys = new Set(starAbilities.map((a) => a.key))
    const dangling: string[] = []
    for (const star of starPlayers) {
      expect(star.abilities.length).toBeGreaterThan(0)
      for (const key of star.abilities) {
        if (!keys.has(key)) dangling.push(`${star.key} → ${key}`)
      }
    }
    expect(dangling).toEqual([])
  })

  test('effect cross-references resolve to a known skill or glossary term', () => {
    const known = new Set<string>([
      ...skills.map((s) => s.key),
      ...glossary.map((g) => g.key),
    ])
    const dangling: string[] = []
    for (const ability of starAbilities) {
      for (const key of refKeys(ability.effect)) {
        if (!known.has(key)) dangling.push(`${ability.key} → ${key}`)
      }
    }
    expect(dangling).toEqual([])
  })
})
