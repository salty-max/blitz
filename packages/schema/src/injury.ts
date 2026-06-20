import { z } from 'zod'

/**
 * A result on the Injury table — rolled (2D6) when a Knocked Down player's
 * armour is broken. The standard table runs Stunned, Knocked-out, Casualty; the
 * `stunty` variant is harsher and adds an outright Badly Hurt result.
 */
export const injurySchema = z.object({
  /** Stable slug key, e.g. `knocked-out`, `stunty-badly-hurt`. */
  key: z.string().min(1),
  name: z.string().min(1),
  /** Which table this result belongs to — the standard or the Stunty one. */
  variant: z.enum(['standard', 'stunty']),
  /** The inclusive 2D6 roll range that yields this result, e.g. `[2, 7]`. */
  roll: z.tuple([
    z.number().int().min(2).max(12),
    z.number().int().min(2).max(12),
  ]),
  /** What happens to the player; may contain `[[key]]` cross-references. */
  effect: z.string().min(1),
})
export type Injury = z.infer<typeof injurySchema>
