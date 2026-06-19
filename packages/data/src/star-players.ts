import { type StarPlayer, starPlayerSchema } from '@blitz/schema'

import data from './star-players.json'

/**
 * The mercenary star players available for hire as inducements. Skills are
 * catalogue keys; `playsFor` lists the team special-rule keywords a star can be
 * hired under (`any` = any team); `special` describes its unique ability.
 */
export const starPlayers: StarPlayer[] = starPlayerSchema.array().parse(data)

const byKey = new Map(starPlayers.map((star) => [star.key, star]))

/** Look up a star player by its key, or `undefined` when there is none. */
export function getStarPlayer(key: string): StarPlayer | undefined {
  return byKey.get(key)
}
