import { injurySchema } from '@blitz/schema'

import { type DataLocale, localizeAll, localizeOne } from './i18n'
import data from './locales/en/injuries.json'
import { injuryOverlays as overlays } from './overlays'
import type { Injury } from './types'

/**
 * The Injury table (2D6) — the outcome when a Knocked Down player's armour is
 * broken, in its standard and harsher Stunty variants.
 */
export const injuries: Injury[] = injurySchema.array().parse(data) as Injury[]

const byKey = new Map<string, Injury>(
  injuries.map((injury) => [injury.key, injury])
)

/** The Injury table in the given locale (English when omitted). */
export function getInjuries(locale: DataLocale = 'en'): Injury[] {
  return localizeAll(injuries, overlays[locale], locale)
}

/** Look up an injury result by its key in the given locale, or `undefined`. */
export function getInjury(
  key: string,
  locale: DataLocale = 'en'
): Injury | undefined {
  return localizeOne(byKey.get(key), overlays[locale], locale)
}
