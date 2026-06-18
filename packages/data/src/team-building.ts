import { type TeamBuildingRules, teamBuildingRulesSchema } from '@blitz/schema'

import data from './team-building.json'

/**
 * The universal team-building constants — starting budget, player limits, the
 * team re-roll cap and the sideline-staff costs that are identical for every
 * team. Per-team numbers live on each `Team`.
 */
export const teamBuildingRules: TeamBuildingRules =
  teamBuildingRulesSchema.parse(data)
