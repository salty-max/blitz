import {
  getSkill,
  getStarAbility,
  getTeam,
  type StarPlayer,
  starPlayers,
  starsForTeam,
  teams,
  teamsForStar,
} from '@blitz/data'
import { useState } from 'react'

import { CharacteristicsRow } from '@/components/characteristics'
import { CostBadge } from '@/components/cost-badge'
import { TeamChips } from '@/components/team-chips'
import { RefChips } from '@/reference/ref-chips'
import { Card, EmptyState, Field, PageHeading, Select } from '@/ui'

/** Pre-built lowercase search text per star — its name, skills and abilities. */
const SEARCH_INDEX = starPlayers.map((star) => ({
  star,
  text: [
    star.name,
    ...star.skills.map((key) => getSkill(key)?.name ?? key),
    ...star.abilities.map((key) => getStarAbility(key)?.name ?? key),
  ]
    .join(' ')
    .toLowerCase(),
}))

/** A single showcased star — stats, skills, abilities and eligibility. */
function StarCard({ star }: { star: StarPlayer }) {
  return (
    <Card id={star.key} className="scroll-mt-8">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2 className="font-display text-2xl uppercase leading-none">
            {star.name}
          </h2>
          <CostBadge cost={star.cost} />
        </div>
        <CharacteristicsRow characteristics={star.characteristics} />
      </div>

      <div className="mt-4 space-y-3">
        <Field label="Skills">
          <RefChips keys={star.skills} />
        </Field>
        {star.abilities.length > 0 && (
          <Field label="Abilities">
            <RefChips keys={star.abilities} tone="accent" />
          </Field>
        )}
        <Field label="Plays for">
          {star.playsFor.length === 0 ? (
            'Any team'
          ) : (
            <TeamChips teams={teamsForStar(star)} />
          )}
        </Field>
        {star.playsFor.length > 0 && (
          <Field label="Leagues & special rules">
            <RefChips keys={star.playsFor} />
          </Field>
        )}
      </div>
    </Card>
  )
}

const CONTROL =
  'border-2 border-ink bg-paper py-1.5 font-headline text-sm uppercase tracking-wide outline-none focus-visible:border-blood'

/** Sentinel value for the "any team" option (a Select value can't be empty). */
const ANY_TEAM = 'any'

/** The star-players catalogue — searchable and filterable by hiring team. */
export function StarsPage() {
  const [query, setQuery] = useState('')
  const [teamKey, setTeamKey] = useState(ANY_TEAM)

  const team = teamKey === ANY_TEAM ? undefined : getTeam(teamKey)
  const eligible = team ? new Set(starsForTeam(team).map((s) => s.key)) : null
  const q = query.trim().toLowerCase()

  const shown = SEARCH_INDEX.filter(
    ({ star, text }) =>
      (!eligible || eligible.has(star.key)) && (!q || text.includes(q))
  ).map((entry) => entry.star)

  return (
    <div>
      <PageHeading>Star Players</PageHeading>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name or skill…"
          aria-label="Search star players"
          className={`${CONTROL} w-full px-3 placeholder:text-ink/40 sm:w-64`}
        />
        <div className="flex items-center gap-2">
          <Field.Label>Hireable by</Field.Label>
          <Select value={teamKey} onValueChange={setTeamKey}>
            <Select.Trigger className="w-56" aria-label="Filter by hiring team">
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value={ANY_TEAM}>Any team</Select.Item>
              {teams.map((t) => (
                <Select.Item key={t.key} value={t.key}>
                  {t.name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>
        <span className="font-headline text-sm font-semibold uppercase tracking-wide tabular-nums text-ink/45">
          {shown.length} / {starPlayers.length}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {shown.length === 0 ? (
          <EmptyState>No stars match.</EmptyState>
        ) : (
          shown.map((star) => <StarCard key={star.key} star={star} />)
        )}
      </div>
    </div>
  )
}
