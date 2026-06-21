import { specialRuleSchema } from '@blitz/schema'

import {
  type DataLocale,
  localizeAll,
  localizeOne,
  overlayMap,
  type Overlays,
} from './i18n'
import data from './locales/en/special-rules.json'
import frData from './locales/fr/special-rules.json'
import type { SpecialRule } from './types'

/**
 * The team special rules — league affiliations (which gate star-player and
 * inducement eligibility) and mechanical team rules. Teams, star players and
 * inducements reference these by key.
 */
export const specialRules: SpecialRule[] = specialRuleSchema
  .array()
  .parse(data) as SpecialRule[]

const byKey = new Map<string, SpecialRule>(
  specialRules.map((rule) => [rule.key, rule])
)
const byName = new Map<string, SpecialRule>(
  specialRules.map((rule) => [rule.name, rule])
)
const overlays: Overlays<SpecialRule> = {
  fr: overlayMap<SpecialRule>(frData as unknown as Partial<SpecialRule>[]),
}

/** The special-rules catalogue in the given locale (English when omitted). */
export function getSpecialRules(locale: DataLocale = 'en'): SpecialRule[] {
  return localizeAll(specialRules, overlays[locale], locale)
}

/** Look up a special rule by its key or name in the given locale, or `undefined`. */
export function getSpecialRule(
  keyOrName: string,
  locale: DataLocale = 'en'
): SpecialRule | undefined {
  return localizeOne(
    byKey.get(keyOrName) ?? byName.get(keyOrName),
    overlays[locale],
    locale
  )
}
