import { getTeam, getTeams, starsForTeam } from '@blitz/data'
import { Link, useParams } from '@tanstack/react-router'
import { type ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CostBadge } from '@/components/cost-badge'
import { useDataLocale } from '@/i18n/use-data-locale'
import { gp } from '@/lib/format'
import { RefChips } from '@/reference/ref-chips'
import { RefText } from '@/reference/ref-text'
import {
  Button,
  Card,
  cn,
  EmptyState,
  PageHeading,
  SectionHeading,
  Table,
  Text,
  textVariants,
} from '@/ui'

/** Single-letter codes for the skill-access categories shown in the roster table. */
const ACCESS: Record<string, string> = {
  general: 'G',
  agility: 'A',
  strength: 'S',
  passing: 'P',
  mutation: 'M',
  devious: 'D',
  trait: 'T',
}

const access = (categories: readonly string[]): string =>
  categories.map((category) => ACCESS[category] ?? '?').join('')

const target = (value: number | null): string =>
  value === null ? '–' : `${value}+`

const TIERS = [1, 2, 3, 4] as const

/** Roster stat cells — tabular figures in the headline face. */
const statCell = cn(
  textVariants({ variant: 'figure', weight: 'semibold' }),
  'px-2 text-center'
)
const costCell = cn(
  textVariants({ variant: 'figure', weight: 'semibold' }),
  'px-2 text-right'
)

/** A label-over-value pair in a team's meta strip. */
function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Text as="dt" variant="overline" tone="muted">
        {label}
      </Text>
      <dd className="mt-1 text-base font-semibold">{children}</dd>
    </div>
  )
}

/** The teams index — tier-filterable cards, each linking to its detail page. */
export function TeamsIndex() {
  const { t } = useTranslation('codex')
  const locale = useDataLocale()
  const [tier, setTier] = useState<number | null>(null)
  const localizedTeams = getTeams(locale)
  const shown =
    tier === null
      ? localizedTeams
      : localizedTeams.filter((team) => team.tier === tier)

  return (
    <div>
      <PageHeading>{t('teams.heading')}</PageHeading>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={tier === null ? 'solid' : 'outline'}
          onClick={() => setTier(null)}
          data-testid="tier-all"
        >
          {t('teams.filterAll')}
        </Button>
        {TIERS.map((value) => (
          <Button
            key={value}
            size="sm"
            variant={tier === value ? 'solid' : 'outline'}
            onClick={() => setTier(value)}
            data-testid={`tier-${value}`}
          >
            {t('teams.tier', { n: value })}
          </Button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((team) => (
          <Card key={team.key} asChild interactive>
            <Link
              to="/codex/teams/$key"
              params={{ key: team.key }}
              data-testid={`team-card-${team.key}`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <Text
                  as="h2"
                  variant="heading"
                  className="leading-none group-hover:text-paper"
                >
                  {team.name}
                </Text>
                {team.tier != null && (
                  <Text
                    as="span"
                    variant="labelLg"
                    tone="blood"
                    className="group-hover:text-gold"
                  >
                    {t('teams.tier', { n: team.tier })}
                  </Text>
                )}
              </div>
              <Text
                tone="secondary"
                className="mt-2 text-sm group-hover:text-paper/70"
              >
                {t('teams.positions', { n: team.positions.length })}
              </Text>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

/** A single team's roster — profile, special rules, positions and available stars. */
export function TeamDetail() {
  const { t } = useTranslation('codex')
  const locale = useDataLocale()
  const { key } = useParams({ strict: false })
  const team = key ? getTeam(key, locale) : undefined

  if (!team) {
    return <EmptyState>{t('teams.notFound')}</EmptyState>
  }

  const stars = starsForTeam(team)

  return (
    <div>
      <header className="border-b-4 border-ink pb-5">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <PageHeading className="leading-none">{team.name}</PageHeading>
          {team.tier != null && (
            <Text as="span" variant="labelLg" tone="blood" className="text-lg">
              {t('teams.tier', { n: team.tier })}
            </Text>
          )}
        </div>
        {team.description && (
          <Text as="p" tone="secondary" className="mt-3 max-w-2xl">
            <RefText>{team.description}</RefText>
          </Text>
        )}
        <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
          <Meta label={t('teams.rerolls')}>
            <Text as="span" variant="figure">
              {gp(team.rerollCost)}
            </Text>
          </Meta>
          <Meta label={t('teams.apothecary')}>
            <Text as="span" variant="figure">
              {team.apothecary ? t('teams.yes') : t('teams.no')}
            </Text>
          </Meta>
          <Meta label={t('teams.specialRules')}>
            <RefChips keys={team.specialRules} />
          </Meta>
        </dl>
      </header>

      <div className="mt-6">
        <Table className="min-w-[44rem]">
          <Table.Header>
            <Table.Row>
              <Table.Head className="pr-3">
                {t('teams.table.position')}
              </Table.Head>
              <Table.Head className="px-2 text-center">
                {t('teams.table.max')}
              </Table.Head>
              <Table.Head className="px-2 text-center">MA</Table.Head>
              <Table.Head className="px-2 text-center">ST</Table.Head>
              <Table.Head className="px-2 text-center">AG</Table.Head>
              <Table.Head className="px-2 text-center">PA</Table.Head>
              <Table.Head className="px-2 text-center">AV</Table.Head>
              <Table.Head className="px-2 text-right">
                {t('teams.table.cost')}
              </Table.Head>
              <Table.Head className="px-2">
                {t('teams.table.skills')}
              </Table.Head>
              <Table.Head className="px-2">
                {t('teams.table.access')}
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {team.positions.map((position) => (
              <Table.Row key={position.key}>
                <Table.Cell
                  className={cn(textVariants({ variant: 'labelLg' }), 'pr-3')}
                >
                  {position.name}
                </Table.Cell>
                <Table.Cell className={statCell}>{position.max}</Table.Cell>
                <Table.Cell className={statCell}>
                  {position.characteristics.ma}
                </Table.Cell>
                <Table.Cell className={statCell}>
                  {position.characteristics.st}
                </Table.Cell>
                <Table.Cell className={statCell}>
                  {target(position.characteristics.ag)}
                </Table.Cell>
                <Table.Cell className={statCell}>
                  {target(position.characteristics.pa)}
                </Table.Cell>
                <Table.Cell className={statCell}>
                  {target(position.characteristics.av)}
                </Table.Cell>
                <Table.Cell className={costCell}>
                  {gp(position.cost)}
                </Table.Cell>
                <Table.Cell className="px-2">
                  {position.startingSkills.length > 0 ? (
                    <RefChips
                      keys={position.startingSkills}
                      className="max-w-[22rem]"
                    />
                  ) : (
                    <span className="text-ink/40">—</span>
                  )}
                </Table.Cell>
                <Table.Cell className="px-2 font-headline tracking-wide text-ink/70">
                  {access(position.primary)}
                  {position.secondary.length > 0 && (
                    <span className="text-ink/35">
                      {' / '}
                      {access(position.secondary)}
                    </span>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <Text variant="caption" tone="muted" className="mt-2">
        {t('teams.accessLegend')}
      </Text>

      {stars.length > 0 && (
        <section className="mt-8">
          <SectionHeading tone="blood" bordered>
            {t('teams.stars')}
          </SectionHeading>
          <ul className="mt-3 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {stars.map((star) => (
              <li key={star.key}>
                <Link
                  to="/codex/stars"
                  hash={star.key}
                  className="flex items-center justify-between gap-3 border-b border-ink/10 py-1.5 transition-colors hover:text-blood"
                >
                  <Text as="span" variant="labelLg" weight="normal">
                    {star.name}
                  </Text>
                  <CostBadge cost={star.cost} size="sm" className="shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
