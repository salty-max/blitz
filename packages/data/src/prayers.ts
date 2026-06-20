import { prayerSchema } from '@blitz/schema'

import data from './prayers.json'
import type { Prayer } from './types'

/**
 * The Prayers to Nuffle table (D16) — one-shot pre-match blessings the underdog
 * may pray for. Effects may carry `[[key]]` cross-references.
 */
export const prayers: Prayer[] = prayerSchema.array().parse(data) as Prayer[]

const byKey = new Map<string, Prayer>(
  prayers.map((prayer) => [prayer.key, prayer])
)

/** Look up a prayer by its key, or `undefined` when there is none. */
export function getPrayer(key: string): Prayer | undefined {
  return byKey.get(key)
}
