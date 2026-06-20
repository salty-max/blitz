import { getInjury, glossary, injuries, skills } from '@blitz/data'
import { refKeys } from '@blitz/schema'
import { describe, expect, test } from 'bun:test'

describe('injuries', () => {
  test('load and resolve by key', () => {
    expect(injuries.length).toBe(7)
    expect(getInjury('knocked-out')?.name).toBe('Knocked-out')
    expect(getInjury('not-an-injury')).toBeUndefined()
  })

  test('each 2D6 variant table tiles 2–12 with no gaps or overlaps', () => {
    for (const variant of ['standard', 'stunty'] as const) {
      const covered = Array.from({ length: 11 }, () => 0) // rolls 2..12
      for (const injury of injuries.filter((i) => i.variant === variant)) {
        for (let roll = injury.roll[0]; roll <= injury.roll[1]; roll++) {
          covered[roll - 2]++
        }
      }
      expect(covered).toEqual(Array.from({ length: 11 }, () => 1))
    }
  })

  test('effect cross-references resolve to a known skill or glossary term', () => {
    const known = new Set<string>([
      ...skills.map((s) => s.key),
      ...glossary.map((g) => g.key),
    ])
    const dangling: string[] = []
    for (const injury of injuries) {
      for (const key of refKeys(injury.effect)) {
        if (!known.has(key)) dangling.push(`${injury.key} → ${key}`)
      }
    }
    expect(dangling).toEqual([])
  })
})
