import {
  getLastingInjury,
  glossary,
  lastingInjuries,
  skills,
} from '@blitz/data'
import { refKeys } from '@blitz/schema'
import { describe, expect, test } from 'bun:test'

describe('lasting injuries', () => {
  test('load and resolve by key', () => {
    expect(lastingInjuries.length).toBe(5)
    expect(getLastingInjury('dislocated-shoulder')?.name).toBe(
      'Dislocated Shoulder'
    )
    expect(getLastingInjury('not-a-lasting-injury')).toBeUndefined()
  })

  test('the D6 ranges tile 1–6 with no gaps or overlaps', () => {
    const covered = Array.from({ length: 6 }, () => 0)
    for (const injury of lastingInjuries) {
      for (let roll = injury.roll[0]; roll <= injury.roll[1]; roll++) {
        covered[roll - 1]++
      }
    }
    expect(covered).toEqual(Array.from({ length: 6 }, () => 1))
  })

  test('effect cross-references resolve to a known skill or glossary term', () => {
    const known = new Set<string>([
      ...skills.map((s) => s.key),
      ...glossary.map((g) => g.key),
    ])
    const dangling: string[] = []
    for (const injury of lastingInjuries) {
      for (const key of refKeys(injury.effect)) {
        if (!known.has(key)) dangling.push(`${injury.key} → ${key}`)
      }
    }
    expect(dangling).toEqual([])
  })
})
