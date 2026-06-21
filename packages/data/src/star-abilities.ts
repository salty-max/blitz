import { starAbilitySchema } from '@blitz/schema'

import { type DataLocale, localizeAll, localizeOne, overlayMap } from './i18n'
import frData from './locales/fr/star-abilities.json'
import data from './star-abilities.json'
import type { StarAbility } from './types'

/**
 * The catalogue of star players' unique special abilities — modelled like
 * skills (a keyed catalogue) so the codex can tooltip and link them. A star
 * references its abilities by key.
 */
export const starAbilities: StarAbility[] = starAbilitySchema
  .array()
  .parse(data) as StarAbility[]

const byKey = new Map<string, StarAbility>(
  starAbilities.map((ability) => [ability.key, ability])
)
const frOverlay = overlayMap<StarAbility>(
  frData as unknown as Partial<StarAbility>[]
)

/** The star-abilities catalogue in the given locale (English when omitted). */
export function getStarAbilities(locale: DataLocale = 'en'): StarAbility[] {
  return localizeAll(starAbilities, frOverlay, locale)
}

/** Look up a star ability by its key in the given locale, or `undefined`. */
export function getStarAbility(
  key: string,
  locale: DataLocale = 'en'
): StarAbility | undefined {
  return localizeOne(byKey.get(key), frOverlay, locale)
}
