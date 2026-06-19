import {
  abilitiesOf,
  getStarPlayer,
  getTeam,
  inducementsForTeam,
  positionSkills,
  starsForTeam,
  starSkills,
  teams,
  teamsForSpecialRule,
  teamsForStar,
  teamSpecialRules,
} from '@blitz/data'
import { describe, expect, test } from 'bun:test'

describe('relationships', () => {
  test('teamSpecialRules resolves a team to its rule objects', () => {
    const human = getTeam('human')
    expect(teamSpecialRules(human!).map((r) => r.name)).toContain(
      'Old World Classic'
    )
  })

  test('starsForTeam matches on a shared special rule', () => {
    const human = getTeam('human')
    expect(starsForTeam(human!).map((s) => s.key)).toContain('griff-oberwald')
  })

  test('universal stars (empty playsFor) are hireable by every team', () => {
    const akhorne = getStarPlayer('akhorne-the-squirrel')
    expect(akhorne!.playsFor).toEqual([])
    expect(teamsForStar(akhorne!).length).toBe(teams.length)
    expect(starsForTeam(getTeam('human')!).map((s) => s.key)).toContain(
      'akhorne-the-squirrel'
    )
  })

  test('teamsForStar is the inverse of starsForTeam', () => {
    const griff = getStarPlayer('griff-oberwald')
    for (const team of teamsForStar(griff!)) {
      expect(starsForTeam(team).map((s) => s.key)).toContain(griff!.key)
    }
  })

  test('inducementsForTeam respects restrictedTo', () => {
    const nurgle = inducementsForTeam(getTeam('nurgle')!).map((i) => i.key)
    expect(nurgle).toContain('plague-doctor') // restricted to favoured-of-nurgle
    expect(nurgle).toContain('wizard') // unrestricted
    const human = inducementsForTeam(getTeam('human')!).map((i) => i.key)
    expect(human).not.toContain('plague-doctor')
  })

  test('teamsForSpecialRule lists the teams carrying a rule', () => {
    expect(
      teamsForSpecialRule('sylvanian-spotlight')
        .map((t) => t.key)
        .sort()
    ).toEqual([
      'necromantic-horror',
      'shambling-undead',
      'tomb-kings',
      'vampire',
    ])
  })

  test('abilitiesOf resolves a star to its ability objects', () => {
    const griff = getStarPlayer('griff-oberwald')
    expect(abilitiesOf(griff!).map((a) => a.name)).toContain(
      'Consummate Professional'
    )
  })

  test('positionSkills and starSkills resolve keys to skill objects', () => {
    const blitzer = getTeam('human')!.positions.find(
      (p) => p.key === 'human-blitzer'
    )
    expect(positionSkills(blitzer!).map((s) => s.name)).toEqual([
      'Block',
      'Tackle',
    ])
    expect(
      starSkills(getStarPlayer('griff-oberwald')!).map((s) => s.key)
    ).toContain('block')
  })
})
