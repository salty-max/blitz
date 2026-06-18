import { z } from 'zod'

/** The category a skill belongs to (and the access categories a position lists). */
export const skillCategorySchema = z.enum([
  'general',
  'agility',
  'passing',
  'strength',
  'mutation',
  'trait',
])
export type SkillCategory = z.infer<typeof skillCategorySchema>

/** A skill, trait or mutation — a catalogue entry and a tooltip source. */
export const skillSchema = z.object({
  /** Stable slug key, e.g. `block`, `mighty-blow`. */
  key: z.string().min(1),
  name: z.string().min(1),
  category: skillCategorySchema,
  /** Short effect; may contain `[[key]]` cross-references. */
  effect: z.string().min(1),
})
export type Skill = z.infer<typeof skillSchema>
