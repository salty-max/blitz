import { type Roster, rosterCost, validateRoster } from '@blitz/resolver'
import type { Team, TeamBuildingRules } from '@blitz/schema'
import { describe, expect, test } from 'bun:test'

const rules: TeamBuildingRules = {
  budget: 1_000_000,
  minPlayers: 11,
  maxPlayers: 16,
  rerollMax: 8,
  apothecaryCost: 50_000,
  assistantCoaches: { cost: 10_000, max: 6 },
  cheerleaders: { cost: 10_000, max: 6 },
  dedicatedFans: { cost: 5_000, start: 1, max: 3 },
}

const stats = { ma: 6, st: 3, ag: 3, pa: 4, av: 9 }

const team: Team = {
  key: 'test',
  name: 'Test',
  rerollCost: 60_000,
  apothecary: true,
  specialRules: [],
  positions: [
    {
      key: 'lineman',
      name: 'Lineman',
      max: 16,
      cost: 50_000,
      characteristics: stats,
      startingSkills: [],
      primary: ['general'],
      secondary: ['strength'],
    },
    {
      key: 'blitzer',
      name: 'Blitzer',
      max: 4,
      cost: 90_000,
      characteristics: stats,
      startingSkills: ['block'],
      primary: ['general', 'strength'],
      secondary: ['agility'],
    },
  ],
}

const fill = (position: string, n: number): Roster['players'] =>
  Array.from({ length: n }, () => ({ position }))

const roster = (overrides: Partial<Roster> = {}): Roster => ({
  players: [],
  rerolls: 0,
  apothecary: false,
  assistantCoaches: 0,
  cheerleaders: 0,
  dedicatedFans: 1,
  ...overrides,
})

describe('validateRoster', () => {
  test('a legal roster has no diagnostics', () => {
    // 11 linemen (11 × 50k = 550k) + 3 re-rolls (3 × 60k = 180k) + apothecary (50k) = 780k ≤ 1M.
    const result = validateRoster(
      team,
      rules,
      roster({ players: fill('lineman', 11), rerolls: 3, apothecary: true })
    )
    expect(result.valid).toBe(true)
    expect(result.diagnostics).toEqual([])
    expect(result.playerCount).toBe(11)
    expect(result.cost.total).toBe(780_000)
    expect(result.teamValue).toBe(780_000)
  })

  test('an under-strength squad is a warning, still valid', () => {
    const result = validateRoster(
      team,
      rules,
      roster({ players: fill('lineman', 5) })
    )
    expect(result.valid).toBe(true)
    expect(result.diagnostics).toContainEqual({
      code: 'too-few-players',
      severity: 'warning',
      actual: 5,
      limit: 11,
    })
  })

  test('an over-budget roster is invalid', () => {
    // 16 linemen (800k) + 8 re-rolls (480k) = 1.28M > 1M.
    const result = validateRoster(
      team,
      rules,
      roster({ players: fill('lineman', 16), rerolls: 8 })
    )
    expect(result.valid).toBe(false)
    expect(result.diagnostics).toContainEqual({
      code: 'over-budget',
      severity: 'error',
      actual: 1_280_000,
      limit: 1_000_000,
    })
  })

  test('a position over its limit is flagged', () => {
    // Blitzers cap at 4; six linemen keep the squad a legal size.
    const result = validateRoster(
      team,
      rules,
      roster({ players: [...fill('blitzer', 5), ...fill('lineman', 6)] })
    )
    expect(result.diagnostics).toContainEqual({
      code: 'position-limit',
      severity: 'error',
      position: 'blitzer',
      actual: 5,
      limit: 4,
    })
  })

  test('more than the maximum squad size is flagged', () => {
    // 16 linemen + 1 blitzer = 17 players; neither position is over its own cap.
    const result = validateRoster(
      team,
      rules,
      roster({ players: [...fill('lineman', 16), ...fill('blitzer', 1)] })
    )
    expect(result.diagnostics).toContainEqual({
      code: 'too-many-players',
      severity: 'error',
      actual: 17,
      limit: 16,
    })
    expect(result.diagnostics.some((d) => d.code === 'position-limit')).toBe(
      false
    )
  })

  test('too many re-rolls is flagged', () => {
    const result = validateRoster(
      team,
      rules,
      roster({ players: fill('lineman', 11), rerolls: 9 })
    )
    expect(result.diagnostics).toContainEqual({
      code: 'reroll-limit',
      severity: 'error',
      actual: 9,
      limit: 8,
    })
  })

  test('an apothecary on a team that may not hire one is flagged', () => {
    const noApothecary: Team = { ...team, apothecary: false }
    const result = validateRoster(
      noApothecary,
      rules,
      roster({ players: fill('lineman', 11), apothecary: true })
    )
    expect(result.diagnostics).toContainEqual({
      code: 'apothecary-not-allowed',
      severity: 'error',
    })
  })

  test('staff over their caps are flagged', () => {
    const result = validateRoster(
      team,
      rules,
      roster({
        players: fill('lineman', 11),
        assistantCoaches: 7,
        cheerleaders: 7,
        dedicatedFans: 4,
      })
    )
    const codes = result.diagnostics.map((diagnostic) => diagnostic.code)
    expect(codes).toContain('assistant-coach-limit')
    expect(codes).toContain('cheerleader-limit')
    expect(codes).toContain('dedicated-fans-limit')
  })

  test('a player in a position the team lacks is flagged', () => {
    const result = validateRoster(
      team,
      rules,
      roster({ players: [...fill('lineman', 11), { position: 'wizard' }] })
    )
    expect(result.diagnostics).toContainEqual({
      code: 'unknown-position',
      severity: 'error',
      position: 'wizard',
    })
  })
})

describe('rosterCost', () => {
  test('the first Dedicated Fan is free; the rest cost', () => {
    // 11 linemen (550k); 3 fans → (3 − 1) × 5k = 10k.
    const cost = rosterCost(
      team,
      rules,
      roster({ players: fill('lineman', 11), dedicatedFans: 3 })
    )
    expect(cost.players).toBe(550_000)
    expect(cost.dedicatedFans).toBe(10_000)
    expect(cost.total).toBe(560_000)
  })
})
