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

const CHARACTERISTICS: CharacteristicKey[] = ['ma', 'st', 'ag', 'pa', 'av']

// The bounds a characteristic may never pass (stored as the roll target where
// applicable). A characteristic may also be improved at most twice.
const CHARACTERISTIC_BOUNDS: Record<
  CharacteristicKey,
  readonly [number, number]
> = {
  ma: [1, 9],
  st: [1, 8],
  ag: [1, 6],
  pa: [1, 6],
  av: [3, 11],
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
  const [min, max] = CHARACTERISTIC_BOUNDS[characteristic]
  return Math.min(max, Math.max(min, value))
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

/**
 * The characteristics a player may still improve — improved fewer than twice and
 * not yet at the better end of their range. A player with no Passing can't raise it.
 */
export function improvableCharacteristics(
  base: Characteristics,
  player: RosterPlayer
): CharacteristicKey[] {
  const current = playerCharacteristics(base, player)
  const timesImproved = (key: CharacteristicKey) =>
    (player.advancements ?? []).filter(
      (advancement) =>
        advancement.kind === 'characteristic' &&
        advancement.characteristic === key
    ).length
  const atBest = (key: CharacteristicKey) => {
    const [min, max] = CHARACTERISTIC_BOUNDS[key]
    const value = current[key]
    if (value === null) return true
    // AG and PA improve toward their minimum; the others toward their maximum.
    return key === 'ag' || key === 'pa' ? value <= min : value >= max
  }
  return CHARACTERISTICS.filter(
    (key) =>
      !(key === 'pa' && base.pa === null) &&
      timesImproved(key) < 2 &&
      !atBest(key)
  )
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
