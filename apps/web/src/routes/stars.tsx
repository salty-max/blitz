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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@blitz/ui'
import { Link } from '@tanstack/react-router'
import { type ReactNode, useState } from 'react'

import { CharacteristicsRow } from '@/components/characteristics'
import { FieldLabel } from '@/components/field-label'
import { chipClass, RefChips } from '@/components/ref-chips'
import { gp } from '@/lib/format'

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

/** A labelled detail row inside a star card. */
function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="mt-1.5 text-sm text-ink/85">{children}</div>
    </div>
  )
}

/** A single showcased star — stats, skills, abilities and eligibility. */
function StarCard({ star }: { star: StarPlayer }) {
  return (
    <article
      id={star.key}
      className="scroll-mt-8 border-2 border-ink bg-paper-2 p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2 className="font-display text-2xl uppercase leading-none">
            {star.name}
          </h2>
          <span className="inline-flex items-center bg-gold px-2.5 py-1 font-headline text-base font-bold uppercase leading-none tracking-wide tabular-nums text-ink">
            {gp(star.cost)}
          </span>
        </div>
        <CharacteristicsRow characteristics={star.characteristics} />
      </div>

      <div className="mt-4 space-y-3">
        <Row label="Skills">
          <RefChips keys={star.skills} />
        </Row>
        {star.abilities.length > 0 && (
          <Row label="Abilities">
            <RefChips keys={star.abilities} tone="accent" />
          </Row>
        )}
        <Row label="Plays for">
          {star.playsFor.length === 0 ? (
            'Any team'
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {teamsForStar(star).map((team) => (
                <Link
                  key={team.key}
                  to="/codex/teams/$key"
                  params={{ key: team.key }}
                  className={chipClass()}
                >
                  {team.name}
                </Link>
              ))}
            </div>
          )}
        </Row>
        {star.playsFor.length > 0 && (
          <Row label="Leagues & special rules">
            <RefChips keys={star.playsFor} />
          </Row>
        )}
      </div>
    </article>
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
      <h1 className="font-display text-5xl uppercase">Star Players</h1>

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
          <FieldLabel>Hireable by</FieldLabel>
          <Select value={teamKey} onValueChange={setTeamKey}>
            <SelectTrigger className="w-56" aria-label="Filter by hiring team">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ANY_TEAM}>Any team</SelectItem>
              {teams.map((t) => (
                <SelectItem key={t.key} value={t.key}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span className="font-headline text-sm font-semibold uppercase tracking-wide tabular-nums text-ink/45">
          {shown.length} / {starPlayers.length}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {shown.length === 0 ? (
          <p className="font-headline text-lg uppercase tracking-wide text-ink/55">
            No stars match.
          </p>
        ) : (
          shown.map((star) => <StarCard key={star.key} star={star} />)
        )}
      </div>
    </div>
  )
}
