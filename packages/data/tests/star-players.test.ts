import { getStarPlayer, skills, starPlayers, teams } from '@blitz/data'
import { describe, expect, test } from 'bun:test'

describe('star players', () => {
  const skillKeys = new Set(skills.map((skill) => skill.key))
  const rules = new Set(teams.flatMap((team) => team.specialRules))

  test('all 62 stars load and resolve by key', () => {
    expect(starPlayers.length).toBe(62)
    expect(getStarPlayer('griff-oberwald')?.cost).toBe(300000)
    expect(getStarPlayer('not-a-star')).toBeUndefined()
  })

  test('keys are unique', () => {
    const keys = starPlayers.map((star) => star.key)
    expect(new Set(keys).size).toBe(keys.length)
  })

  test('every skill resolves to a known catalogue skill', () => {
    const dangling: string[] = []
    for (const star of starPlayers) {
      for (const key of star.skills) {
        if (!skillKeys.has(key)) dangling.push(`${star.key} → ${key}`)
      }
    }
    expect(dangling).toEqual([])
  })

  test('every playsFor entry is a real team special rule (empty = any team)', () => {
    const dangling: string[] = []
    for (const star of starPlayers) {
      for (const rule of star.playsFor) {
        if (!rules.has(rule)) dangling.push(`${star.key} → ${rule}`)
      }
    }
    expect(dangling).toEqual([])
  })
})
