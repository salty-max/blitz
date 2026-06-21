import { z } from 'zod'

/**
 * A result on the Kick-off Event table — rolled (2D6) the moment the ball is
 * kicked, before the receiving team's first turn, affecting both teams.
 */
export const kickoffEventSchema = z.object({
  /** Stable slug key, e.g. `get-the-ref`, `pitch-invasion`. */
  key: z.string().min(1),
  name: z.string().min(1),
  /** The 2D6 roll that triggers this event (2–12). */
  roll: z.number().int().min(2).max(12),
  /** What the event does; may contain `[[key]]` cross-references. */
  effect: z.string().min(1),
})
export type KickoffEvent = z.infer<typeof kickoffEventSchema>
