import { starAbilitySchema } from '@blitz/schema'

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

/** Look up a star ability by its key, or `undefined` when there is none. */
export function getStarAbility(key: string): StarAbility | undefined {
  return byKey.get(key)
}
