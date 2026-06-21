import { inducementSchema } from '@blitz/schema'

import { type DataLocale, localizeAll, localizeOne, overlayMap } from './i18n'
import data from './inducements.json'
import frData from './locales/fr/inducements.json'
import type { Inducement } from './types'

/**
 * The inducements a coach can buy before a match to even out a Team Value gap.
 * Effects may carry `[[key]]` cross-references; `restrictedTo` lists the team
 * special-rule keywords an inducement is limited to (empty = available to all).
 */
export const inducements: Inducement[] = inducementSchema
  .array()
  .parse(data) as Inducement[]

const byKey = new Map<string, Inducement>(
  inducements.map((inducement) => [inducement.key, inducement])
)
const frOverlay = overlayMap<Inducement>(
  frData as unknown as Partial<Inducement>[]
)

/** The inducements catalogue in the given locale (English when omitted). */
export function getInducements(locale: DataLocale = 'en'): Inducement[] {
  return localizeAll(inducements, frOverlay, locale)
}

/** Look up an inducement by its key in the given locale, or `undefined`. */
export function getInducement(
  key: string,
  locale: DataLocale = 'en'
): Inducement | undefined {
  return localizeOne(byKey.get(key), frOverlay, locale)
}
