import { getPrayer, glossary, prayers, skills } from '@blitz/data'
import { refKeys } from '@blitz/schema'
import { describe, expect, test } from 'bun:test'

describe('prayers to Nuffle', () => {
  test('load and resolve by key', () => {
    expect(prayers.length).toBe(16)
    expect(getPrayer('iron-man')?.roll).toBe(4)
    expect(getPrayer('not-a-prayer')).toBeUndefined()
  })

  test('the table covers D16 exactly once', () => {
    expect(prayers.map((prayer) => prayer.roll).sort((a, b) => a - b)).toEqual(
      Array.from({ length: 16 }, (_, i) => i + 1)
    )
  })

  test('effect cross-references resolve to a known skill or glossary term', () => {
    const known = new Set<string>([
      ...skills.map((s) => s.key),
      ...glossary.map((g) => g.key),
    ])
    const dangling: string[] = []
    for (const prayer of prayers) {
      for (const key of refKeys(prayer.effect)) {
        if (!known.has(key)) dangling.push(`${prayer.key} → ${key}`)
      }
    }
    expect(dangling).toEqual([])
  })
})
