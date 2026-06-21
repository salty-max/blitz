import { casualtySchema } from '@blitz/schema'

import {
  type DataLocale,
  localizeAll,
  localizeOne,
  overlayMap,
  type Overlays,
} from './i18n'
import data from './locales/en/casualties.json'
import frData from './locales/fr/casualties.json'
import type { Casualty } from './types'

/**
 * The Casualty table (D16) — the outcome when an Injury roll comes up a
 * Casualty, from a full recovery through to death.
 */
export const casualties: Casualty[] = casualtySchema
  .array()
  .parse(data) as Casualty[]

const byKey = new Map<string, Casualty>(
  casualties.map((casualty) => [casualty.key, casualty])
)
const overlays: Overlays<Casualty> = {
  fr: overlayMap<Casualty>(frData as unknown as Partial<Casualty>[]),
}

/** The Casualty table in the given locale (English when omitted). */
export function getCasualties(locale: DataLocale = 'en'): Casualty[] {
  return localizeAll(casualties, overlays[locale], locale)
}

/** Look up a casualty result by its key in the given locale, or `undefined`. */
export function getCasualty(
  key: string,
  locale: DataLocale = 'en'
): Casualty | undefined {
  return localizeOne(byKey.get(key), overlays[locale], locale)
}
