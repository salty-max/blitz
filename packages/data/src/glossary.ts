import { glossaryTermSchema } from '@blitz/schema'

import { type DataLocale, localizeAll, localizeOne } from './i18n'
import data from './locales/en/glossary.json'
import { glossaryOverlays as overlays } from './overlays'
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

/** The glossary in the given locale (English when omitted). */
export function getGlossary(locale: DataLocale = 'en'): GlossaryTerm[] {
  return localizeAll(glossary, overlays[locale], locale)
}

/** Look up a glossary term by its key in the given locale, or `undefined`. */
export function getGlossaryTerm(
  key: string,
  locale: DataLocale = 'en'
): GlossaryTerm | undefined {
  return localizeOne(byKey.get(key), overlays[locale], locale)
}
