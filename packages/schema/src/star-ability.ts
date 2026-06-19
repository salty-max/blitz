import { z } from 'zod'

/**
 * A star player's unique special ability — modelled like a skill (a keyed
 * catalogue entry) so it can be tooltipped and cross-referenced.
 */
export const starAbilitySchema = z.object({
  /** Stable slug key, e.g. `consummate-professional`. */
  key: z.string().min(1),
  name: z.string().min(1),
  /** What the ability does; may contain `[[key]]` cross-references. */
  effect: z.string().min(1),
})
export type StarAbility = z.infer<typeof starAbilitySchema>
