import {
  type DataLocale,
  getSkill,
  getStarAbility,
  getTeam,
  getTeams,
  type StarPlayer,
  starPlayers,
  starsForTeam,
  teamsForStar,
} from '@blitz/data'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CharacteristicsRow } from '@/components/characteristics'
import { CostBadge } from '@/components/cost-badge'
import { TeamChips } from '@/components/team-chips'
import { useDataLocale } from '@/i18n/use-data-locale'
import { RefChips } from '@/reference/ref-chips'
import { Card, EmptyState, Field, PageHeading, Select, Text } from '@/ui'

/** Lowercase search text per star — its name and its skill/ability names in the active locale. */
function searchIndex(locale: DataLocale) {
  return starPlayers.map((star) => ({
    star,
    text: [
      star.name,
      ...star.skills.map((key) => getSkill(key, locale)?.name ?? key),
      ...star.abilities.map((key) => getStarAbility(key, locale)?.name ?? key),
    ]
      .join(' ')
      .toLowerCase(),
  }))
}

/** A single showcased star — stats, skills, abilities and eligibility. */
function StarCard({ star }: { star: StarPlayer }) {
  const { t } = useTranslation('codex')
  const locale = useDataLocale()
  return (
    <Card
      id={star.key}
      data-testid={`star-card-${star.key}`}
      className="scroll-mt-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Text as="h2" variant="subheading" className="leading-none">
            {star.name}
          </Text>
          <CostBadge cost={star.cost} />
        </div>
        <CharacteristicsRow characteristics={star.characteristics} />
      </div>

      <div className="mt-4 space-y-3">
        <Field label={t('stars.fields.skills')}>
          <RefChips keys={star.skills} />
        </Field>
        {star.abilities.length > 0 && (
          <Field label={t('stars.fields.abilities')}>
            <RefChips keys={star.abilities} tone="accent" />
          </Field>
        )}
        <Field label={t('stars.fields.playsFor')}>
          {star.playsFor.length === 0 ? (
            t('stars.anyTeam')
          ) : (
            <TeamChips teams={teamsForStar(star, locale)} />
          )}
        </Field>
        {star.playsFor.length > 0 && (
          <Field label={t('stars.fields.leaguesAndRules')}>
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
  const { t } = useTranslation('codex')
  const locale = useDataLocale()
  const [query, setQuery] = useState('')
  const [teamKey, setTeamKey] = useState(ANY_TEAM)

  const team = teamKey === ANY_TEAM ? undefined : getTeam(teamKey, locale)
  const eligible = team ? new Set(starsForTeam(team).map((s) => s.key)) : null
  const q = query.trim().toLowerCase()
  const index = useMemo(() => searchIndex(locale), [locale])

  const shown = index
    .filter(
      ({ star, text }) =>
        (!eligible || eligible.has(star.key)) && (!q || text.includes(q))
    )
    .map((entry) => entry.star)

  return (
    <div>
      <PageHeading>{t('stars.heading')}</PageHeading>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('stars.searchPlaceholder')}
          aria-label={t('stars.searchLabel')}
          data-testid="stars-search"
          className={`${CONTROL} w-full px-3 placeholder:text-ink/40 sm:w-64`}
        />
        <div className="flex items-center gap-2">
          <Field.Label>{t('stars.hireableBy')}</Field.Label>
          <Select value={teamKey} onValueChange={setTeamKey}>
            <Select.Trigger
              className="w-56"
              aria-label={t('stars.filterLabel')}
              data-testid="stars-team-filter"
            >
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value={ANY_TEAM} data-testid="stars-team-option-any">
                {t('stars.anyTeam')}
              </Select.Item>
              {getTeams(locale).map((team) => (
                <Select.Item
                  key={team.key}
                  value={team.key}
                  data-testid={`stars-team-option-${team.key}`}
                >
                  {team.name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>
        <Text as="span" variant="labelLg" tone="muted" tabular>
          {shown.length} / {starPlayers.length}
        </Text>
      </div>

      <div className="mt-6 space-y-4">
        {shown.length === 0 ? (
          <EmptyState>{t('stars.noMatch')}</EmptyState>
        ) : (
          shown.map((star) => <StarCard key={star.key} star={star} />)
        )}
      </div>
    </div>
  )
}
