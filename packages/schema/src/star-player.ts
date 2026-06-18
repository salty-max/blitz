import { z } from 'zod'

import { characteristicsSchema } from './team'

/** A star player available for hire as an inducement. */
export const starPlayerSchema = z.object({
  /** Stable slug key, e.g. `griff-oberwald`. */
  key: z.string().min(1),
  name: z.string().min(1),
  /** Fixed hiring fee in gold pieces. */
  cost: z.number().int().min(0),
  characteristics: characteristicsSchema,
  /** Skill keys. */
  skills: z.array(z.string().min(1)).default([]),
  /** Team special-rule keywords this star plays for (use `any` for all). */
  playsFor: z.array(z.string().min(1)).min(1),
  /** Optional special-rule text; may contain `[[key]]` cross-references. */
  special: z.string().optional(),
})
export type StarPlayer = z.infer<typeof starPlayerSchema>
