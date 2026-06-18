import {
  d6,
  mean,
  probAtLeast,
  successOnD6,
  twoD6,
  withReroll,
} from '@blitz/engine'
import { describe, expect, test } from 'bun:test'

describe('blood bowl dice primitives', () => {
  test('a d6 is uniform and sums to 1', () => {
    const d = d6()
    expect(d.reduce((sum, x) => sum + x, 0)).toBeCloseTo(1, 10)
    expect(mean(d)).toBeCloseTo(3.5, 10)
  })

  test('2d6 has mean 7 and the classic armour-break tail', () => {
    const d = twoD6()
    expect(mean(d)).toBeCloseTo(7, 10)
    // Breaking AV10 needs 11+: only 5-6, 6-5, 6-6 → 3/36.
    expect(probAtLeast(d, 11)).toBeCloseTo(3 / 36, 10)
  })

  test('successOnD6 honours the natural 1-fails / 6-succeeds rule', () => {
    expect(successOnD6(2)).toBeCloseTo(5 / 6, 10) // 2+
    expect(successOnD6(4)).toBeCloseTo(3 / 6, 10) // 4+
    expect(successOnD6(6)).toBeCloseTo(1 / 6, 10) // 6+
    expect(successOnD6(7)).toBeCloseTo(1 / 6, 10) // only a natural 6 saves it
  })

  test('a re-roll turns a 4+ (1/2) into 3/4', () => {
    expect(withReroll(successOnD6(4))).toBeCloseTo(3 / 4, 10)
  })
})
