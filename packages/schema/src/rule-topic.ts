import { z } from 'zod'

/** One section of a rule topic — a heading and its prose, which may carry `[[key]]` refs. */
export const ruleSectionSchema = z.object({
  /** Stable slug key, unique within the topic, e.g. `rushing`. */
  key: z.string().min(1),
  heading: z.string().min(1),
  /** The section's prose; may contain `[[key]]` cross-references and line breaks. */
  body: z.string().min(1),
})
export type RuleSection = z.infer<typeof ruleSectionSchema>

/**
 * A rulebook topic — a chapter of the core rules (turn structure, blocking,
 * passing, the drive, …) modelled as an ordered list of prose sections so the
 * codex can render and cross-link it like the rest of the reference.
 */
export const ruleTopicSchema = z.object({
  /** Stable slug key, e.g. `core-game`, `combat`. */
  key: z.string().min(1),
  title: z.string().min(1),
  /** A one-line description for the topic card. */
  summary: z.string().min(1),
  sections: z.array(ruleSectionSchema).min(1),
})
export type RuleTopic = z.infer<typeof ruleTopicSchema>
