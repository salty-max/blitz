import { glossaryTermSchema } from '@blitz/schema'

import data from './glossary.json'
import { type DataLocale, localizeAll, localizeOne, overlayMap } from './i18n'
import frData from './locales/fr/glossary.json'
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
const frOverlay = overlayMap<GlossaryTerm>(
  frData as unknown as Partial<GlossaryTerm>[]
)

/** The glossary in the given locale (English when omitted). */
export function getGlossary(locale: DataLocale = 'en'): GlossaryTerm[] {
  return localizeAll(glossary, frOverlay, locale)
}

/** Look up a glossary term by its key in the given locale, or `undefined`. */
export function getGlossaryTerm(
  key: string,
  locale: DataLocale = 'en'
): GlossaryTerm | undefined {
  return localizeOne(byKey.get(key), frOverlay, locale)
}
