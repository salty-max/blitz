import { z } from 'zod'

/** A purchasable sideline-staff line: a per-unit cost and a maximum. */
const staffLineSchema = z.object({
  cost: z.number().int().min(0),
  max: z.number().int().min(0),
})

/**
 * The universal team-building constants — identical for every team (per-team
 * variation lives on `Team`). Drives the builder's budget maths and the codex's
 * team-building reference; the values are authored in the data package.
 */
export const teamBuildingRulesSchema = z.object({
  /** Starting budget for a rookie team, in gold pieces. */
  budget: z.number().int().min(0),
  /** Minimum players a team must field. */
  minPlayers: z.number().int().min(1),
  /** Maximum players on a roster. */
  maxPlayers: z.number().int().min(1),
  /** Most team re-rolls a roster may hold. */
  rerollMax: z.number().int().min(0),
  /** Cost of an Apothecary (for teams that may take one). */
  apothecaryCost: z.number().int().min(0),
  assistantCoaches: staffLineSchema,
  cheerleaders: staffLineSchema,
  /** Dedicated Fans: per-point cost, starting value, and draft maximum. */
  dedicatedFans: z.object({
    cost: z.number().int().min(0),
    start: z.number().int().min(0),
    max: z.number().int().min(0),
  }),
})
export type TeamBuildingRules = z.infer<typeof teamBuildingRulesSchema>
