import { positionSchema, skillSchema, teamSchema } from '@blitz/schema'
import { describe, expect, test } from 'bun:test'

describe('schema validation', () => {
  test('a valid skill parses, with a cross-reference left intact in the effect', () => {
    const skill = skillSchema.parse({
      key: 'block',
      name: 'Block',
      category: 'general',
      effect: 'not knocked down on a [[both-down]] result',
    })
    expect(skill.name).toBe('Block')
    expect(skill.effect).toContain('[[both-down]]')
  })

  test('an unknown skill category is rejected', () => {
    expect(() =>
      skillSchema.parse({
        key: 'x',
        name: 'X',
        category: 'psychic',
        effect: 'e',
      })
    ).toThrow()
  })

  test('a position carries characteristics and skill access', () => {
    const pos = positionSchema.parse({
      key: 'blitzer',
      name: 'Blitzer',
      max: 4,
      cost: 90000,
      characteristics: { ma: 7, st: 3, ag: 3, pa: 4, av: 9 },
      startingSkills: ['block'],
      primary: ['general', 'strength'],
      secondary: ['agility'],
    })
    expect(pos.characteristics.pa).toBe(4)
    expect(pos.primary).toContain('strength')
  })

  test('a passless profile (pa: null) and schema defaults are applied', () => {
    const team = teamSchema.parse({
      key: 'orc',
      name: 'Orc',
      rerollCost: 60000,
      positions: [
        {
          key: 'lineman',
          name: 'Lineman',
          max: 16,
          cost: 50000,
          characteristics: { ma: 5, st: 3, ag: 3, pa: null, av: 10 },
        },
      ],
    })
    expect(team.positions[0]?.characteristics.pa).toBeNull()
    expect(team.positions[0]?.startingSkills).toEqual([]) // default
    expect(team.apothecary).toBe(true) // default
  })
})
