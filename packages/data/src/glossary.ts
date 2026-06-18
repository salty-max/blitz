import { type GlossaryTerm, glossaryTermSchema } from '@blitz/schema'

import data from './glossary.json'

/**
 * The rules-keyword glossary — the tooltip source for terms like Tackle Zone,
 * Push Back and Turnover. Definitions may carry `[[key]]` cross-references.
 */
export const glossary: GlossaryTerm[] = glossaryTermSchema.array().parse(data)

const byKey = new Map(glossary.map((term) => [term.key, term]))

/** Look up a glossary term by its key, or `undefined` when there is none. */
export function getGlossaryTerm(key: string): GlossaryTerm | undefined {
  return byKey.get(key)
}
