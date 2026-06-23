import type {
  CharacteristicKey,
  Characteristics,
  Position,
  Progression,
  RosterPlayer,
  Team,
  TeamBuildingRules,
} from '@blitz/schema'

import { rosterCost } from './roster'
import type { Roster } from './types'

/** Which column of the advancement cost table an upgrade is bought from. */
export type AdvancementKind =
  | 'randomPrimary'
  | 'chosenPrimary'
  | 'randomSecondary'
  | 'chosenSecondary'
  | 'characteristic'

/** How many advancements a player has taken — its advance count, lowest zero. */
export function playerLevel(player: RosterPlayer): number {
  return player.advancements?.length ?? 0
}

/**
 * The SPP cost of a player's next advancement of the given kind. The cost rises
 * with each advance taken; past the sixth (Legend) it holds at the Legend row.
 */
export function advancementCost(
  progression: Progression,
  player: RosterPlayer,
  kind: AdvancementKind
): number {
  const costs = progression.advancementCosts
  const row = costs[Math.min(playerLevel(player), costs.length - 1)]
  return row[kind]
}

// MA, ST and AV improve as the number rises; AG and PA are roll targets that
// improve as the number falls. `delta` is positive for a gain, negative for a loss.
function applyDelta(
  characteristic: CharacteristicKey,
  value: number,
  delta: number
): number {
  const inverted = characteristic === 'ag' || characteristic === 'pa'
  return value + (inverted ? -delta : delta)
}

function clamp(characteristic: CharacteristicKey, value: number): number {
  if (characteristic === 'av') return Math.min(11, Math.max(1, value))
  if (characteristic === 'ag' || characteristic === 'pa') {
    return Math.min(6, Math.max(1, value))
  }
  return Math.max(1, value)
}

/**
 * A player's characteristics after its advancements and lasting injuries — each
 * characteristic gain raises the stat by one and each matching injury lowers it,
 * clamped to the playable range. A player with no Passing stat keeps it.
 */
export function playerCharacteristics(
  base: Characteristics,
  player: RosterPlayer
): Characteristics {
  const delta: Record<CharacteristicKey, number> = {
    ma: 0,
    st: 0,
    ag: 0,
    pa: 0,
    av: 0,
  }
  for (const advancement of player.advancements ?? []) {
    if (advancement.kind === 'characteristic')
      delta[advancement.characteristic] += 1
  }
  for (const injury of player.injuries ?? []) {
    if (injury.kind === 'characteristic') delta[injury.characteristic] -= 1
  }
  return {
    ma: clamp('ma', applyDelta('ma', base.ma, delta.ma)),
    st: clamp('st', applyDelta('st', base.st, delta.st)),
    ag: clamp('ag', applyDelta('ag', base.ag, delta.ag)),
    pa:
      base.pa === null
        ? null
        : clamp('pa', applyDelta('pa', base.pa, delta.pa)),
    av: clamp('av', applyDelta('av', base.av, delta.av)),
  }
}

function valueGp(progression: Progression, key: string): number {
  return progression.valueIncreases.find((entry) => entry.key === key)?.gp ?? 0
}

/**
 * A player's current value — its base hiring cost plus the value of every
 * advancement taken. A Journeyman is free and worth nothing; lasting injuries do
 * not reduce a player's value.
 */
export function playerValue(
  position: Position,
  player: RosterPlayer,
  progression: Progression
): number {
  if (player.journeyman) return 0
  const advances = (player.advancements ?? []).reduce((sum, advancement) => {
    if (advancement.kind === 'skill') {
      return (
        sum +
        valueGp(progression, advancement.secondary ? 'secondary' : 'primary')
      )
    }
    return sum + valueGp(progression, advancement.characteristic)
  }, 0)
  return position.cost + advances
}

/**
 * A team's current value — every player's current value (advancements included,
 * Journeymen excluded) plus the re-rolls and sideline staff. Treasury and
 * Dedicated Fans are excluded, matching the draft-time Team Value.
 */
export function currentTeamValue(
  team: Team,
  rules: TeamBuildingRules,
  roster: Roster,
  progression: Progression
): number {
  const positionOf = new Map(
    team.positions.map((position) => [position.key, position])
  )
  const players = roster.players.reduce((sum, player) => {
    const position = positionOf.get(player.position)
    return sum + (position ? playerValue(position, player, progression) : 0)
  }, 0)
  const cost = rosterCost(team, rules, roster)
  return players + cost.rerolls + cost.staff
}
