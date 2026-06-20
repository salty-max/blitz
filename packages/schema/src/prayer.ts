import { z } from 'zod'

/**
 * A result on the Prayers to Nuffle table — a one-shot pre-match blessing (or a
 * curse on the opponent) the underdog may pray for; it lasts the game.
 */
export const prayerSchema = z.object({
  /** Stable slug key, e.g. `iron-man`, `blessing-of-nuffle`. */
  key: z.string().min(1),
  name: z.string().min(1),
  /** The D16 roll that yields this prayer (1–16). */
  roll: z.number().int().min(1).max(16),
  /** What the prayer does; may contain `[[key]]` cross-references. */
  effect: z.string().min(1),
})
export type Prayer = z.infer<typeof prayerSchema>
