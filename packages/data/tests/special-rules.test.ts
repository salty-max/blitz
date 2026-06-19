import {
  getSpecialRule,
  glossary,
  inducements,
  skills,
  specialRules,
  starPlayers,
  teams,
} from '@blitz/data'
import { refKeys } from '@blitz/schema'
import { describe, expect, test } from 'bun:test'

describe('special rules', () => {
  test('load and resolve by key or name', () => {
    expect(specialRules.length).toBe(19)
    expect(getSpecialRule('old-world-classic')?.name).toBe('Old World Classic')
    expect(getSpecialRule('Bribery and Corruption')?.category).toBe('special')
    expect(getSpecialRule('not-a-rule')).toBeUndefined()
  })

  test('keys and names are unique', () => {
    expect(new Set(specialRules.map((r) => r.key)).size).toBe(
      specialRules.length
    )
    expect(new Set(specialRules.map((r) => r.name)).size).toBe(
      specialRules.length
    )
  })

  test('every special-rule key referenced across the data is defined', () => {
    const keys = new Set(specialRules.map((r) => r.key))
    const dangling: string[] = []
    for (const team of teams) {
      for (const key of team.specialRules) {
        if (!keys.has(key)) dangling.push(`team ${team.key} → ${key}`)
      }
    }
    for (const star of starPlayers) {
      for (const key of star.playsFor) {
        if (!keys.has(key)) dangling.push(`star ${star.key} → ${key}`)
      }
    }
    for (const inducement of inducements) {
      for (const key of inducement.restrictedTo) {
        if (!keys.has(key))
          dangling.push(`inducement ${inducement.key} → ${key}`)
      }
    }
    expect(dangling).toEqual([])
  })

  test('every special rule is used by at least one team', () => {
    const used = new Set(teams.flatMap((t) => t.specialRules))
    const orphans = specialRules
      .filter((r) => !used.has(r.key))
      .map((r) => r.key)
    expect(orphans).toEqual([])
  })

  test('effect cross-references resolve to a known skill or glossary term', () => {
    const known = new Set([
      ...skills.map((s) => s.key),
      ...glossary.map((g) => g.key),
    ])
    const dangling: string[] = []
    for (const rule of specialRules) {
      for (const key of refKeys(rule.effect)) {
        if (!known.has(key)) dangling.push(`${rule.key} → ${key}`)
      }
    }
    expect(dangling).toEqual([])
  })
})
