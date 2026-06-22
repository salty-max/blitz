import { accessibleCategories, canLearn } from '@blitz/resolver'
import type { Position } from '@blitz/schema'
import { describe, expect, test } from 'bun:test'

const blitzer: Position = {
  key: 'blitzer',
  name: 'Blitzer',
  max: 4,
  cost: 90_000,
  characteristics: { ma: 7, st: 3, ag: 3, pa: 4, av: 9 },
  startingSkills: ['block'],
  primary: ['general', 'strength'],
  secondary: ['agility'],
}

describe('skill access', () => {
  test('a position can learn from its primary and secondary categories only', () => {
    expect(canLearn(blitzer, 'general')).toBe(true) // primary
    expect(canLearn(blitzer, 'agility')).toBe(true) // secondary
    expect(canLearn(blitzer, 'mutation')).toBe(false) // neither
  })

  test('accessibleCategories is the union of primary and secondary', () => {
    expect(accessibleCategories(blitzer).sort()).toEqual([
      'agility',
      'general',
      'strength',
    ])
  })
})
