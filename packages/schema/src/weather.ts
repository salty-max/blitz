import { z } from 'zod'

/**
 * A result on the Weather table — rolled (2D6) before the match and re-rolled
 * by the Changing Weather kick-off event. It applies for the whole drive.
 */
export const weatherSchema = z.object({
  /** Stable slug key, e.g. `sweltering-heat`, `blizzard`. */
  key: z.string().min(1),
  name: z.string().min(1),
  /** The inclusive 2D6 roll range that yields this weather, e.g. `[4, 10]`. */
  roll: z.tuple([
    z.number().int().min(2).max(12),
    z.number().int().min(2).max(12),
  ]),
  /** What the weather does; may contain `[[key]]` cross-references. */
  effect: z.string().min(1),
})
export type Weather = z.infer<typeof weatherSchema>
