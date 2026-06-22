import type { Roster } from '@blitz/resolver'
import type { TeamBuildingRules } from '@blitz/schema'

/** A fresh roster — no players or staff, and the free starting Dedicated Fan. */
export function emptyRoster(rules: TeamBuildingRules): Roster {
  return {
    players: [],
    rerolls: 0,
    apothecary: false,
    assistantCoaches: 0,
    cheerleaders: 0,
    dedicatedFans: rules.dedicatedFans.start,
  }
}

/** How many players the roster fields at a given position. */
export function positionCount(roster: Roster, position: string): number {
  return roster.players.filter((player) => player.position === position).length
}

/** Set the number of players at a position, rebuilding that slice of the squad. */
export function setPositionCount(
  roster: Roster,
  position: string,
  count: number
): Roster {
  const others = roster.players.filter((player) => player.position !== position)
  const drafted = Array.from({ length: count }, () => ({ position }))
  return { ...roster, players: [...others, ...drafted] }
}
