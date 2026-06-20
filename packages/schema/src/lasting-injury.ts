import { z } from 'zod'

/**
 * A result on the Lasting Injury table — rolled (D6) when a player suffers a
 * Lasting Injury casualty (Casualty 13–14). Each result permanently lowers one
 * characteristic by 1.
 */
export const lastingInjurySchema = z.object({
  /** Stable slug key, e.g. `head-injury`, `dislocated-shoulder`. */
  key: z.string().min(1),
  name: z.string().min(1),
  /** The inclusive D6 roll range that yields this result, e.g. `[1, 2]`. */
  roll: z.tuple([
    z.number().int().min(1).max(6),
    z.number().int().min(1).max(6),
  ]),
  /** The characteristic reduction; may contain `[[key]]` cross-references. */
  effect: z.string().min(1),
})
export type LastingInjury = z.infer<typeof lastingInjurySchema>
