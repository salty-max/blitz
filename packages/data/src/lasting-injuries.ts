import { lastingInjurySchema } from '@blitz/schema'

import data from './lasting-injuries.json'
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

/** Look up a lasting injury by its key, or `undefined` when there is none. */
export function getLastingInjury(key: string): LastingInjury | undefined {
  return byKey.get(key)
}
