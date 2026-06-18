import { z } from 'zod'

/** A rules keyword and its definition — the tooltip source for plain terms. */
export const glossaryTermSchema = z.object({
  /** Stable slug key, e.g. `tackle-zone`, `turnover`. */
  key: z.string().min(1),
  term: z.string().min(1),
  /** Definition; may contain `[[key]]` cross-references. */
  definition: z.string().min(1),
})
export type GlossaryTerm = z.infer<typeof glossaryTermSchema>
