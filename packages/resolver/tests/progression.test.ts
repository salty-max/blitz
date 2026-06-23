import {
  advancementCost,
  currentTeamValue,
  improvableCharacteristics,
  playerCharacteristics,
  playerLevel,
  playerValue,
  type Roster,
} from '@blitz/resolver'
import type {
  Progression,
  RosterPlayer,
  Team,
  TeamBuildingRules,
} from '@blitz/schema'
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
  ],
}

const lineman = team.positions[0]

const progression: Progression = {
  sppActions: [{ key: 'touchdown', action: 'Touchdown', spp: 3 }],
  advancementCosts: [
    {
      key: 'experienced',
      level: 'Experienced (1st)',
      randomPrimary: 3,
      chosenPrimary: 6,
      randomSecondary: 10,
      chosenSecondary: 14,
      characteristic: 14,
    },
    {
      key: 'veteran',
      level: 'Veteran (2nd)',
      randomPrimary: 4,
      chosenPrimary: 8,
      randomSecondary: 12,
      chosenSecondary: 16,
      characteristic: 16,
    },
    {
      key: 'emerging-star',
      level: 'Emerging Star (3rd)',
      randomPrimary: 6,
      chosenPrimary: 12,
      randomSecondary: 16,
      chosenSecondary: 20,
      characteristic: 20,
    },
    {
      key: 'star',
      level: 'Star (4th)',
      randomPrimary: 8,
      chosenPrimary: 16,
      randomSecondary: 20,
      chosenSecondary: 24,
      characteristic: 24,
    },
    {
      key: 'superstar',
      level: 'Superstar (5th)',
      randomPrimary: 10,
      chosenPrimary: 20,
      randomSecondary: 24,
      chosenSecondary: 28,
      characteristic: 28,
    },
    {
      key: 'legend',
      level: 'Legend (6th)',
      randomPrimary: 15,
      chosenPrimary: 30,
      randomSecondary: 34,
      chosenSecondary: 38,
      characteristic: 38,
    },
  ],
  characteristicGains: [{ key: 'd8-8', roll: [8, 8], gain: '+1 to any' }],
  valueIncreases: [
    { key: 'primary', advancement: 'Primary skill', value: '+20k', gp: 20_000 },
    {
      key: 'secondary',
      advancement: 'Secondary skill',
      value: '+40k',
      gp: 40_000,
    },
    { key: 'av', advancement: '+1 AV', value: '+10k', gp: 10_000 },
    { key: 'ma', advancement: '+1 MA', value: '+20k', gp: 20_000 },
    { key: 'pa', advancement: '+1 PA', value: '+20k', gp: 20_000 },
    { key: 'ag', advancement: '+1 AG', value: '+30k', gp: 30_000 },
    { key: 'st', advancement: '+1 ST', value: '+60k', gp: 60_000 },
  ],
}

const player = (overrides: Partial<RosterPlayer> = {}): RosterPlayer => ({
  position: 'lineman',
  ...overrides,
})

describe('playerLevel & advancementCost', () => {
  test("level is the count of advances; a fresh player's is zero", () => {
    expect(playerLevel(player())).toBe(0)
    expect(
      playerLevel(
        player({
          advancements: [
            { kind: 'skill', skill: 'block', secondary: false },
            { kind: 'characteristic', characteristic: 'ma' },
          ],
        })
      )
    ).toBe(2)
  })

  test('the next advance is priced by the level reached', () => {
    // Fresh player → Experienced (1st) row.
    expect(advancementCost(progression, player(), 'randomPrimary')).toBe(3)
    expect(advancementCost(progression, player(), 'chosenPrimary')).toBe(6)
    expect(advancementCost(progression, player(), 'characteristic')).toBe(14)
    // One advance taken → Veteran (2nd) row.
    const veteran = player({
      advancements: [{ kind: 'skill', skill: 'block', secondary: false }],
    })
    expect(advancementCost(progression, veteran, 'randomPrimary')).toBe(4)
  })

  test('past the sixth advance the cost holds at the Legend row', () => {
    const sixAdvances = player({
      advancements: Array.from({ length: 6 }, () => ({
        kind: 'characteristic' as const,
        characteristic: 'ma' as const,
      })),
    })
    expect(advancementCost(progression, sixAdvances, 'randomPrimary')).toBe(15)
  })
})

describe('playerCharacteristics', () => {
  test('value stats rise and roll-target stats fall as they improve', () => {
    const result = playerCharacteristics(
      stats,
      player({
        advancements: [
          { kind: 'characteristic', characteristic: 'ma' }, // 6 → 7
          { kind: 'characteristic', characteristic: 'ag' }, // 3+ → 2+ (lower is better)
          { kind: 'characteristic', characteristic: 'av' }, // 9+ → 10+
        ],
      })
    )
    expect(result).toEqual({ ma: 7, st: 3, ag: 2, pa: 4, av: 10 })
  })

  test('a lasting injury reverses an improvement', () => {
    const result = playerCharacteristics(
      stats,
      player({
        injuries: [
          { kind: 'characteristic', characteristic: 'av' }, // 9+ → 8+
          { kind: 'characteristic', characteristic: 'ag' }, // 3+ → 4+ (worse)
        ],
      })
    )
    expect(result.av).toBe(8)
    expect(result.ag).toBe(4)
  })

  test('a gain and a matching injury cancel out', () => {
    const result = playerCharacteristics(
      stats,
      player({
        advancements: [{ kind: 'characteristic', characteristic: 'st' }],
        injuries: [{ kind: 'characteristic', characteristic: 'st' }],
      })
    )
    expect(result.st).toBe(3)
  })

  test('stats clamp to the playable range and a missing PA stays null', () => {
    // AG already 1+ cannot improve further; a passer-less profile keeps null PA.
    const noPass = { ma: 6, st: 3, ag: 1, pa: null, av: 9 }
    const result = playerCharacteristics(
      noPass,
      player({
        advancements: [
          { kind: 'characteristic', characteristic: 'ag' },
          { kind: 'characteristic', characteristic: 'pa' },
        ],
      })
    )
    expect(result.ag).toBe(1)
    expect(result.pa).toBeNull()
  })
})

describe('playerValue', () => {
  test('base cost plus the value of each advancement', () => {
    // 50k base + primary skill 20k + ST 60k = 130k.
    const value = playerValue(
      lineman,
      player({
        advancements: [
          { kind: 'skill', skill: 'block', secondary: false },
          { kind: 'characteristic', characteristic: 'st' },
        ],
      }),
      progression
    )
    expect(value).toBe(130_000)
  })

  test('a secondary skill is worth more than a primary one', () => {
    const primary = playerValue(
      lineman,
      player({
        advancements: [{ kind: 'skill', skill: 'block', secondary: false }],
      }),
      progression
    )
    const secondary = playerValue(
      lineman,
      player({
        advancements: [{ kind: 'skill', skill: 'dodge', secondary: true }],
      }),
      progression
    )
    expect(primary).toBe(70_000) // 50k + 20k
    expect(secondary).toBe(90_000) // 50k + 40k
  })

  test('a Journeyman is worth nothing', () => {
    expect(
      playerValue(lineman, player({ journeyman: true }), progression)
    ).toBe(0)
  })
})

describe('currentTeamValue', () => {
  test('sums advanced player values plus re-rolls and staff', () => {
    // 2 linemen (one with a primary skill): 50k + 70k = 120k.
    // 2 re-rolls (2 × 60k = 120k) + apothecary (50k) = 170k. Total 290k.
    const roster: Roster = {
      players: [
        player(),
        player({
          advancements: [{ kind: 'skill', skill: 'block', secondary: false }],
        }),
      ],
      rerolls: 2,
      apothecary: true,
      assistantCoaches: 0,
      cheerleaders: 0,
      dedicatedFans: 1,
    }
    expect(currentTeamValue(team, rules, roster, progression)).toBe(290_000)
  })

  test('a Journeyman adds nothing to Team Value', () => {
    const roster: Roster = {
      players: [player(), player({ journeyman: true })],
      rerolls: 0,
      apothecary: false,
      assistantCoaches: 0,
      cheerleaders: 0,
      dedicatedFans: 1,
    }
    expect(currentTeamValue(team, rules, roster, progression)).toBe(50_000)
  })
})

describe('characteristic bounds & improvability', () => {
  test('a stat cannot rise past its maximum (ST 8)', () => {
    const strong = { ma: 6, st: 8, ag: 3, pa: 4, av: 9 }
    const result = playerCharacteristics(
      strong,
      player({
        advancements: [{ kind: 'characteristic', characteristic: 'st' }],
      })
    )
    expect(result.st).toBe(8)
  })

  test('an injury cannot drop AV below its minimum (3+)', () => {
    const brittle = { ma: 6, st: 3, ag: 3, pa: 4, av: 3 }
    const result = playerCharacteristics(
      brittle,
      player({ injuries: [{ kind: 'characteristic', characteristic: 'av' }] })
    )
    expect(result.av).toBe(3)
  })

  test('improvable list excludes twice-improved, capped and absent stats', () => {
    // A fresh lineman can improve any characteristic.
    expect(improvableCharacteristics(stats, player())).toEqual([
      'ma',
      'st',
      'ag',
      'pa',
      'av',
    ])
    // MA improved twice is no longer improvable.
    const maxedMa = player({
      advancements: [
        { kind: 'characteristic', characteristic: 'ma' },
        { kind: 'characteristic', characteristic: 'ma' },
      ],
    })
    expect(improvableCharacteristics(stats, maxedMa)).not.toContain('ma')
    // A passer-less profile can't raise PA.
    const noPass = { ma: 6, st: 3, ag: 3, pa: null, av: 9 }
    expect(improvableCharacteristics(noPass, player())).not.toContain('pa')
  })
})
