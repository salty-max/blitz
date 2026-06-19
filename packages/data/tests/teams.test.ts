import { getTeam, skills, teams } from '@blitz/data'
import { describe, expect, test } from 'bun:test'

describe('team rosters', () => {
  const skillKeys = new Set(skills.map((skill) => skill.key))

  test('all 30 teams load and resolve by key', () => {
    expect(teams.length).toBe(30)
    expect(getTeam('human')?.name).toBe('Human')
    expect(getTeam('orc')?.positions.length).toBeGreaterThan(0)
    expect(getTeam('not-a-team')).toBeUndefined()
  })

  test('team keys are unique', () => {
    const keys = teams.map((team) => team.key)
    expect(new Set(keys).size).toBe(keys.length)
  })

  test('position keys are unique within each team', () => {
    for (const team of teams) {
      const keys = team.positions.map((position) => position.key)
      expect(new Set(keys).size).toBe(keys.length)
    }
  })

  test('every starting skill resolves to a known skill', () => {
    const dangling: string[] = []
    for (const team of teams) {
      for (const position of team.positions) {
        for (const key of position.startingSkills) {
          if (!skillKeys.has(key))
            dangling.push(`${team.key}/${position.key} → ${key}`)
        }
      }
    }
    expect(dangling).toEqual([])
  })

  test('rosters respect basic sanity bounds', () => {
    for (const team of teams) {
      expect(team.rerollCost).toBeGreaterThan(0)
      expect(team.positions.length).toBeGreaterThan(0)
      // every BB2025 team carries at least its league-affiliation special rule
      expect(team.specialRules.length).toBeGreaterThan(0)
      for (const position of team.positions) {
        expect(position.max).toBeGreaterThanOrEqual(1)
        expect(position.max).toBeLessThanOrEqual(16)
        expect(position.cost).toBeGreaterThanOrEqual(0)
      }
    }
  })
})
