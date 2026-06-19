import { type Inducement, inducementSchema } from '@blitz/schema'

import data from './inducements.json'

/**
 * The inducements a coach can buy before a match to even out a Team Value gap.
 * Effects may carry `[[key]]` cross-references; `restrictedTo` lists the team
 * special-rule keywords an inducement is limited to (empty = available to all).
 */
export const inducements: Inducement[] = inducementSchema.array().parse(data)

const byKey = new Map(
  inducements.map((inducement) => [inducement.key, inducement])
)

/** Look up an inducement by its key, or `undefined` when there is none. */
export function getInducement(key: string): Inducement | undefined {
  return byKey.get(key)
}
