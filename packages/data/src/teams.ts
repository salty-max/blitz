import { type Team, teamSchema } from '@blitz/schema'

import data from './teams.json'

/**
 * Every Blood Bowl 2025 team roster — its positions (characteristics, cost,
 * count limit, starting skills and Primary/Secondary skill access), team re-roll
 * cost, special rules, apothecary access and competitive tier.
 */
export const teams: Team[] = teamSchema.array().parse(data)

const byKey = new Map(teams.map((team) => [team.key, team]))

/** Look up a team by its key, or `undefined` when there is none. */
export function getTeam(key: string): Team | undefined {
  return byKey.get(key)
}
