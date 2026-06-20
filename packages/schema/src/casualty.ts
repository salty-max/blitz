import { z } from 'zod'

/**
 * A result on the Casualty table — rolled (D16) when an Injury roll comes up a
 * Casualty. Ranges from a knock-out with no lasting effect through to death.
 */
export const casualtySchema = z.object({
  /** Stable slug key, e.g. `badly-hurt`, `lasting-injury`. */
  key: z.string().min(1),
  name: z.string().min(1),
  /** The inclusive D16 roll range that yields this result, e.g. `[1, 8]`. */
  roll: z.tuple([
    z.number().int().min(1).max(16),
    z.number().int().min(1).max(16),
  ]),
  /** What happens to the player; may contain `[[key]]` cross-references. */
  effect: z.string().min(1),
})
export type Casualty = z.infer<typeof casualtySchema>
