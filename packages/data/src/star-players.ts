import { starPlayerSchema } from '@blitz/schema'

import data from './star-players.json'
import type { StarPlayer } from './types'

/**
 * The mercenary star players available for hire as inducements. Skills are
 * catalogue keys; `playsFor` lists the team special-rule keys a star can be
 * hired under (empty = any team); `special` describes its unique ability.
 */
export const starPlayers: StarPlayer[] = starPlayerSchema
  .array()
  .parse(data) as StarPlayer[]

const byKey = new Map<string, StarPlayer>(
  starPlayers.map((star) => [star.key, star])
)

/** Look up a star player by its key, or `undefined` when there is none. */
export function getStarPlayer(key: string): StarPlayer | undefined {
  return byKey.get(key)
}
