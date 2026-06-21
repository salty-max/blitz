import { prayerSchema } from '@blitz/schema'

import {
  type DataLocale,
  localizeAll,
  localizeOne,
  overlayMap,
  type Overlays,
} from './i18n'
import data from './locales/en/prayers.json'
import frData from './locales/fr/prayers.json'
import type { Prayer } from './types'

/**
 * The Prayers to Nuffle table (D16) — one-shot pre-match blessings the underdog
 * may pray for. Effects may carry `[[key]]` cross-references.
 */
export const prayers: Prayer[] = prayerSchema.array().parse(data) as Prayer[]

const byKey = new Map<string, Prayer>(
  prayers.map((prayer) => [prayer.key, prayer])
)
const overlays: Overlays<Prayer> = {
  fr: overlayMap<Prayer>(frData as unknown as Partial<Prayer>[]),
}

/** The Prayers to Nuffle table in the given locale (English when omitted). */
export function getPrayers(locale: DataLocale = 'en'): Prayer[] {
  return localizeAll(prayers, overlays[locale], locale)
}

/** Look up a prayer by its key in the given locale, or `undefined`. */
export function getPrayer(
  key: string,
  locale: DataLocale = 'en'
): Prayer | undefined {
  return localizeOne(byKey.get(key), overlays[locale], locale)
}
