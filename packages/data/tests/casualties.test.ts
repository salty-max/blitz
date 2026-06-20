import { casualties, getCasualty, glossary, skills } from '@blitz/data'
import { refKeys } from '@blitz/schema'
import { describe, expect, test } from 'bun:test'

describe('casualties', () => {
  test('load and resolve by key', () => {
    expect(casualties.length).toBe(5)
    expect(getCasualty('dead')?.name).toBe('Dead')
    expect(getCasualty('not-a-casualty')).toBeUndefined()
  })

  test('the D16 ranges tile 1–16 with no gaps or overlaps', () => {
    const covered = Array.from({ length: 16 }, () => 0)
    for (const casualty of casualties) {
      for (let roll = casualty.roll[0]; roll <= casualty.roll[1]; roll++) {
        covered[roll - 1]++
      }
    }
    expect(covered).toEqual(Array.from({ length: 16 }, () => 1))
  })

  test('effect cross-references resolve to a known skill or glossary term', () => {
    const known = new Set<string>([
      ...skills.map((s) => s.key),
      ...glossary.map((g) => g.key),
    ])
    const dangling: string[] = []
    for (const casualty of casualties) {
      for (const key of refKeys(casualty.effect)) {
        if (!known.has(key)) dangling.push(`${casualty.key} → ${key}`)
      }
    }
    expect(dangling).toEqual([])
  })
})
