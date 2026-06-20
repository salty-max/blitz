import { casualtySchema } from '@blitz/schema'

import data from './casualties.json'
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

/** Look up a casualty result by its key, or `undefined` when there is none. */
export function getCasualty(key: string): Casualty | undefined {
  return byKey.get(key)
}
