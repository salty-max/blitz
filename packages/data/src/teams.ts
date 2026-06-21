import { teamSchema } from '@blitz/schema'

import { type DataLocale } from './i18n'
import frData from './locales/fr/teams.json'
import data from './teams.json'
import type { Team } from './types'

/**
 * Every Blood Bowl 2025 team roster — its positions (characteristics, cost,
 * count limit, starting skills and Primary/Secondary skill access), team re-roll
 * cost, special rules, apothecary access and competitive tier.
 */
export const teams: Team[] = teamSchema.array().parse(data) as Team[]

const byKey = new Map<string, Team>(teams.map((team) => [team.key, team]))

/** A team's locale overlay — its name, optional description and position names. */
type TeamOverlay = {
  key: string
  name?: string
  description?: string
  positions?: { key: string; name: string }[]
}
const frOverlay = new Map<string, TeamOverlay>(
  (frData as unknown as TeamOverlay[]).map((team) => [team.key, team])
)

/** Merge a team's overlay — its name, description and per-position names. */
function localizeTeam(team: Team, locale: DataLocale): Team {
  if (locale === 'en') return team
  const tr = frOverlay.get(team.key)
  if (!tr) return team
  const names = new Map((tr.positions ?? []).map((p) => [p.key, p.name]))
  return {
    ...team,
    name: tr.name ?? team.name,
    ...(tr.description !== undefined ? { description: tr.description } : {}),
    positions: team.positions.map((position) => {
      const name = names.get(position.key)
      return name ? { ...position, name } : position
    }),
  }
}

/** Every team roster in the given locale (English when omitted). */
export function getTeams(locale: DataLocale = 'en'): Team[] {
  return locale === 'en'
    ? teams
    : teams.map((team) => localizeTeam(team, locale))
}

/** Look up a team by its key in the given locale, or `undefined`. */
export function getTeam(
  key: string,
  locale: DataLocale = 'en'
): Team | undefined {
  const team = byKey.get(key)
  return team ? localizeTeam(team, locale) : undefined
}
