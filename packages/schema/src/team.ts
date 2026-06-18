import { z } from 'zod'

import { skillCategorySchema } from './skill'

/**
 * A player's profile. MA and ST are values; AG, PA and AV are roll targets (e.g.
 * `3` means "3+"). PA is `null` when the player can't pass (the "-" profile).
 */
export const characteristicsSchema = z.object({
  ma: z.number().int().min(1),
  st: z.number().int().min(1),
  ag: z.number().int().min(1).max(6),
  pa: z.number().int().min(1).max(6).nullable(),
  av: z.number().int().min(1).max(11),
})
export type Characteristics = z.infer<typeof characteristicsSchema>

/** One position on a team's roster. */
export const positionSchema = z.object({
  /** Stable slug key, e.g. `lineman`, `blitzer`. */
  key: z.string().min(1),
  name: z.string().min(1),
  /** The 0–N count limit (the N). */
  max: z.number().int().min(1),
  /** Hiring cost in gold pieces. */
  cost: z.number().int().min(0),
  characteristics: characteristicsSchema,
  /** Skill keys the position starts with. */
  startingSkills: z.array(z.string().min(1)).default([]),
  /** Skill categories accessible as Primary advancements. */
  primary: z.array(skillCategorySchema).default([]),
  /** Skill categories accessible as Secondary advancements. */
  secondary: z.array(skillCategorySchema).default([]),
})
export type Position = z.infer<typeof positionSchema>

/** A team's roster and its team-building rules. */
export const teamSchema = z.object({
  /** Stable slug key, e.g. `skaven`, `orc`. */
  key: z.string().min(1),
  name: z.string().min(1),
  /** Cost of a team re-roll in gold pieces. */
  rerollCost: z.number().int().min(0),
  positions: z.array(positionSchema).min(1),
  /** Team special-rule keywords (govern inducement and star-player eligibility). */
  specialRules: z.array(z.string().min(1)).default([]),
  /** Whether the team may hire an Apothecary. */
  apothecary: z.boolean().default(true),
  /** Competitive tier (1 = strongest), where the roster defines one. */
  tier: z.number().int().min(1).max(3).optional(),
  /** Short codex blurb; may contain `[[key]]` cross-references. */
  description: z.string().optional(),
})
export type Team = z.infer<typeof teamSchema>
