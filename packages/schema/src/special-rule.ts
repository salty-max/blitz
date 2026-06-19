import { z } from 'zod'

/** Whether a special rule is a league affiliation or a mechanical team rule. */
export const specialRuleCategorySchema = z.enum(['league', 'special'])
export type SpecialRuleCategory = z.infer<typeof specialRuleCategorySchema>

/**
 * A team special rule — either a league affiliation (which governs star-player
 * and inducement eligibility) or a mechanical team rule. The `name` is the exact
 * keyword used in a team's `specialRules`, a star's `playsFor`, and an
 * inducement's `restrictedTo`.
 */
export const specialRuleSchema = z.object({
  /** Stable slug key, e.g. `old-world-classic`, `bribery-and-corruption`. */
  key: z.string().min(1),
  name: z.string().min(1),
  category: specialRuleCategorySchema,
  /** What the rule does; may contain `[[key]]` cross-references. */
  effect: z.string().min(1),
})
export type SpecialRule = z.infer<typeof specialRuleSchema>
