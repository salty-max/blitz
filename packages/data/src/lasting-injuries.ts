import { lastingInjurySchema } from '@blitz/schema'

import { type DataLocale, localizeAll, localizeOne, overlayMap } from './i18n'
import data from './locales/en/lasting-injuries.json'
import frData from './locales/fr/lasting-injuries.json'
import type { LastingInjury } from './types'

/**
 * The Lasting Injury table (D6) — which characteristic a Lasting Injury casualty
 * permanently lowers by 1.
 */
export const lastingInjuries: LastingInjury[] = lastingInjurySchema
  .array()
  .parse(data) as LastingInjury[]

const byKey = new Map<string, LastingInjury>(
  lastingInjuries.map((injury) => [injury.key, injury])
)
const frOverlay = overlayMap<LastingInjury>(
  frData as unknown as Partial<LastingInjury>[]
)

/** The Lasting Injury table in the given locale (English when omitted). */
export function getLastingInjuries(locale: DataLocale = 'en'): LastingInjury[] {
  return localizeAll(lastingInjuries, frOverlay, locale)
}

/** Look up a lasting injury by its key in the given locale, or `undefined`. */
export function getLastingInjury(
  key: string,
  locale: DataLocale = 'en'
): LastingInjury | undefined {
  return localizeOne(byKey.get(key), frOverlay, locale)
}
