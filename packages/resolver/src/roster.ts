import type { Team, TeamBuildingRules } from '@blitz/schema'

import type { Diagnostic, Roster, RosterCost, RosterValidation } from './types'

/** Tally how many players fill each position key. */
function countByPosition(roster: Roster): Map<string, number> {
  const counts = new Map<string, number>()
  for (const player of roster.players) {
    counts.set(player.position, (counts.get(player.position) ?? 0) + 1)
  }
  return counts
}

/**
 * The gold-piece cost of a roster, split by line. `total` is the budget spend;
 * the starting Dedicated Fan is free, so only fans bought beyond
 * `rules.dedicatedFans.start` are charged.
 */
export function rosterCost(
  team: Team,
  rules: TeamBuildingRules,
  roster: Roster
): RosterCost {
  const costOf = new Map(team.positions.map((p) => [p.key, p.cost]))
  const players = roster.players.reduce(
    (sum, player) => sum + (costOf.get(player.position) ?? 0),
    0
  )
  const rerolls = roster.rerolls * team.rerollCost
  const staff =
    (roster.apothecary ? rules.apothecaryCost : 0) +
    roster.assistantCoaches * rules.assistantCoaches.cost +
    roster.cheerleaders * rules.cheerleaders.cost
  const dedicatedFans =
    Math.max(0, roster.dedicatedFans - rules.dedicatedFans.start) *
    rules.dedicatedFans.cost
  return {
    players,
    rerolls,
    staff,
    dedicatedFans,
    total: players + rerolls + staff + dedicatedFans,
  }
}

/**
 * Validate a drafted roster against its team's rules and the universal
 * team-building rules: positional limits, the 11–16 squad size, the re-roll cap,
 * apothecary eligibility, the staff caps and the budget. Rule violations are
 * errors; an under-strength squad (fewer than the minimum) is a warning, since a
 * roster is still being built — so a partial roster stays `valid`.
 */
export function validateRoster(
  team: Team,
  rules: TeamBuildingRules,
  roster: Roster
): RosterValidation {
  const diagnostics: Diagnostic[] = []
  const maxOf = new Map(team.positions.map((p) => [p.key, p.max]))

  for (const [position, count] of countByPosition(roster)) {
    const max = maxOf.get(position)
    if (max === undefined) {
      diagnostics.push({
        code: 'unknown-position',
        severity: 'error',
        position,
      })
    } else if (count > max) {
      diagnostics.push({
        code: 'position-limit',
        severity: 'error',
        position,
        actual: count,
        limit: max,
      })
    }
  }

  const playerCount = roster.players.length
  if (playerCount < rules.minPlayers) {
    diagnostics.push({
      code: 'too-few-players',
      severity: 'warning',
      actual: playerCount,
      limit: rules.minPlayers,
    })
  } else if (playerCount > rules.maxPlayers) {
    diagnostics.push({
      code: 'too-many-players',
      severity: 'error',
      actual: playerCount,
      limit: rules.maxPlayers,
    })
  }

  if (roster.rerolls > rules.rerollMax) {
    diagnostics.push({
      code: 'reroll-limit',
      severity: 'error',
      actual: roster.rerolls,
      limit: rules.rerollMax,
    })
  }
  if (roster.apothecary && !team.apothecary) {
    diagnostics.push({ code: 'apothecary-not-allowed', severity: 'error' })
  }
  if (roster.assistantCoaches > rules.assistantCoaches.max) {
    diagnostics.push({
      code: 'assistant-coach-limit',
      severity: 'error',
      actual: roster.assistantCoaches,
      limit: rules.assistantCoaches.max,
    })
  }
  if (roster.cheerleaders > rules.cheerleaders.max) {
    diagnostics.push({
      code: 'cheerleader-limit',
      severity: 'error',
      actual: roster.cheerleaders,
      limit: rules.cheerleaders.max,
    })
  }
  if (roster.dedicatedFans > rules.dedicatedFans.max) {
    diagnostics.push({
      code: 'dedicated-fans-limit',
      severity: 'error',
      actual: roster.dedicatedFans,
      limit: rules.dedicatedFans.max,
    })
  }

  const cost = rosterCost(team, rules, roster)
  if (cost.total > rules.budget) {
    diagnostics.push({
      code: 'over-budget',
      severity: 'error',
      actual: cost.total,
      limit: rules.budget,
    })
  }

  return {
    valid: !diagnostics.some((diagnostic) => diagnostic.severity === 'error'),
    diagnostics,
    playerCount,
    cost,
    teamValue: cost.players + cost.rerolls + cost.staff,
  }
}
