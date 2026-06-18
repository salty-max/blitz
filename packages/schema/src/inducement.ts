import { z } from 'zod'

/** A one-off service or asset bought before a match to even out Team Value. */
export const inducementSchema = z.object({
  /** Stable slug key, e.g. `bloodweiser-kegs`, `wizard`. */
  key: z.string().min(1),
  name: z.string().min(1),
  /** Cost in gold pieces. */
  cost: z.number().int().min(0),
  /** The 0–N limit (the N). */
  max: z.number().int().min(1),
  /** Effect; may contain `[[key]]` cross-references. */
  effect: z.string().min(1),
  /** Team special-rule keywords this is restricted to, if any. */
  restrictedTo: z.array(z.string().min(1)).default([]),
})
export type Inducement = z.infer<typeof inducementSchema>
