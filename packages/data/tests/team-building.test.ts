import { teamBuildingRules } from '@blitz/data'
import { describe, expect, test } from 'bun:test'

describe('team-building constants', () => {
  test('match the documented values', () => {
    expect(teamBuildingRules.budget).toBe(1_000_000)
    expect(teamBuildingRules.minPlayers).toBe(11)
    expect(teamBuildingRules.maxPlayers).toBe(16)
    expect(teamBuildingRules.rerollMax).toBe(8)
    expect(teamBuildingRules.apothecaryCost).toBe(50_000)
    expect(teamBuildingRules.cheerleaders).toEqual({ cost: 10_000, max: 6 })
    expect(teamBuildingRules.dedicatedFans).toEqual({
      cost: 5_000,
      start: 1,
      max: 3,
    })
  })
})
