import { injurySchema } from '@blitz/schema'

import data from './injuries.json'
import type { Injury } from './types'

/**
 * The Injury table (2D6) — the outcome when a Knocked Down player's armour is
 * broken, in its standard and harsher Stunty variants.
 */
export const injuries: Injury[] = injurySchema.array().parse(data) as Injury[]

const byKey = new Map<string, Injury>(
  injuries.map((injury) => [injury.key, injury])
)

/** Look up an injury result by its key, or `undefined` when there is none. */
export function getInjury(key: string): Injury | undefined {
  return byKey.get(key)
}
