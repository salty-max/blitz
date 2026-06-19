import { glossaryTermSchema } from '@blitz/schema'

import data from './glossary.json'
import type { GlossaryTerm } from './types'

/**
 * The rules-keyword glossary — the tooltip source for terms like Tackle Zone,
 * Push Back and Turnover. Definitions may carry `[[key]]` cross-references.
 */
export const glossary: GlossaryTerm[] = glossaryTermSchema
  .array()
  .parse(data) as GlossaryTerm[]

const byKey = new Map<string, GlossaryTerm>(
  glossary.map((term) => [term.key, term])
)

/** Look up a glossary term by its key, or `undefined` when there is none. */
export function getGlossaryTerm(key: string): GlossaryTerm | undefined {
  return byKey.get(key)
}
