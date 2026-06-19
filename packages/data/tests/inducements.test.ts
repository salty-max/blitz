import {
  getInducement,
  glossary,
  inducements,
  skills,
  teams,
} from '@blitz/data'
import { refKeys } from '@blitz/schema'
import { describe, expect, test } from 'bun:test'

describe('inducements', () => {
  test('load and resolve by key', () => {
    expect(inducements.length).toBeGreaterThan(10)
    expect(getInducement('wizard')?.cost).toBe(150000)
    expect(getInducement('not-an-inducement')).toBeUndefined()
  })

  test('restrictedTo keywords match a real team special rule', () => {
    const rules = new Set(teams.flatMap((team) => team.specialRules))
    const dangling: string[] = []
    for (const inducement of inducements) {
      for (const rule of inducement.restrictedTo) {
        if (!rules.has(rule)) dangling.push(`${inducement.key} → ${rule}`)
      }
    }
    expect(dangling).toEqual([])
  })

  test('effect cross-references resolve to a known skill or glossary term', () => {
    const known = new Set([
      ...skills.map((s) => s.key),
      ...glossary.map((g) => g.key),
    ])
    const dangling: string[] = []
    for (const inducement of inducements) {
      for (const key of refKeys(inducement.effect)) {
        if (!known.has(key)) dangling.push(`${inducement.key} → ${key}`)
      }
    }
    expect(dangling).toEqual([])
  })
})
