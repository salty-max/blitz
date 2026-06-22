import type { Roster, RosterPlayer } from '@blitz/resolver'
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

/** Re-number the squad 1..N in list order — a player's number is its position. */
function renumbered(players: readonly RosterPlayer[]): RosterPlayer[] {
  return players.map((player, index) => ({ ...player, number: index + 1 }))
}

/** How many players the roster fields at a given position. */
export function positionCount(roster: Roster, position: string): number {
  return roster.players.filter((player) => player.position === position).length
}

/** Builds a name for a freshly drafted player, given the names already taken. */
export type NameFactory = (used: ReadonlySet<string>) => string

/** The names already worn in the squad, for a {@link NameFactory} to avoid. */
function takenNames(roster: Roster): Set<string> {
  return new Set(
    roster.players
      .map((player) => player.name)
      .filter((name): name is string => Boolean(name))
  )
}

/** Remove the player wearing the given squad number. */
export function removePlayer(roster: Roster, number: number): Roster {
  return {
    ...roster,
    players: renumbered(
      roster.players.filter((player) => player.number !== number)
    ),
  }
}

/** Rename the player wearing the given squad number. */
export function renamePlayer(
  roster: Roster,
  number: number,
  name: string
): Roster {
  return {
    ...roster,
    players: roster.players.map((player) =>
      player.number === number ? { ...player, name } : player
    ),
  }
}

/**
 * Re-roll a player's name from `nameFor` — the current squad names are excluded,
 * so the fresh name differs from the player's own and stays unique.
 */
export function randomizePlayer(
  roster: Roster,
  number: number,
  nameFor: NameFactory
): Roster {
  return renamePlayer(roster, number, nameFor(takenNames(roster)))
}

/** Move the player at `from` to `to`, then re-number the squad. */
export function reorderPlayers(
  roster: Roster,
  from: number,
  to: number
): Roster {
  const players = [...roster.players]
  const [moved] = players.splice(from, 1)
  if (!moved) return roster
  players.splice(to, 0, moved)
  return { ...roster, players: renumbered(players) }
}

/**
 * Match the number of players at a position to `count` — drafting fresh players
 * (each auto-named via `nameFor`) to grow it, or trimming the surplus (keeping
 * the earlier ones and their names).
 */
export function setPositionCount(
  roster: Roster,
  position: string,
  count: number,
  nameFor: NameFactory
): Roster {
  const current = positionCount(roster, position)
  if (count > current) {
    const used = takenNames(roster)
    const drafted: RosterPlayer[] = []
    for (let i = current; i < count; i += 1) {
      const name = nameFor(used)
      used.add(name)
      drafted.push({ position, name })
    }
    return { ...roster, players: renumbered([...roster.players, ...drafted]) }
  }
  if (count < current) {
    const surplus = new Set(
      roster.players
        .filter((player) => player.position === position)
        .slice(count)
        .map((player) => player.number)
    )
    return {
      ...roster,
      players: renumbered(
        roster.players.filter(
          (player) =>
            player.position !== position || !surplus.has(player.number)
        )
      ),
    }
  }
  return roster
}
