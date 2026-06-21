import {
  getRuleTopic,
  getTeam,
  glossary,
  inducements,
  injuries,
  kickoffEvents,
  prayers,
  progression,
  ruleTopics,
  skills,
  specialRules,
  starPlayers,
  teams,
  weather,
} from '@blitz/data'
import { Link, Outlet, useRouterState } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { useDataLocale } from '@/i18n/use-data-locale'
import { Breadcrumb, Card, Eyebrow, PageHeading } from '@/ui'

const CATEGORIES = [
  { to: '/codex/teams', key: 'teams', count: teams.length },
  { to: '/codex/drafting', key: 'drafting' },
  { to: '/codex/skills', key: 'skills', count: skills.length },
  { to: '/codex/stars', key: 'stars', count: starPlayers.length },
  {
    to: '/codex/inducements',
    key: 'inducements',
    count: inducements.length,
  },
  { to: '/codex/rules', key: 'rules', count: specialRules.length },
  {
    to: '/codex/kickoff',
    key: 'kickoff',
    count: kickoffEvents.length + weather.length,
  },
  { to: '/codex/injuries', key: 'injuries', count: injuries.length },
  { to: '/codex/prayers', key: 'prayers', count: prayers.length },
  {
    to: '/codex/spp',
    key: 'spp',
    count:
      progression.sppActions.length +
      progression.advancementCosts.length +
      progression.characteristicGains.length +
      progression.valueIncreases.length,
  },
  { to: '/codex/glossary', key: 'glossary', count: glossary.length },
  { to: '/codex/rulebook', key: 'rulebook', count: ruleTopics.length },
] as const

/**
 * The codex section shell for category pages — a breadcrumb trail locating the
 * active category (and, on a team's roster, the team) above the routed page.
 */
export function CodexLayout() {
  const { t } = useTranslation('codex')
  const locale = useDataLocale()
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  const [, detailKey] = pathname.replace(/^\/codex\/?/, '').split('/')
  const category = CATEGORIES.find((entry) => pathname.startsWith(entry.to))
  const detailName = !detailKey
    ? undefined
    : category?.key === 'teams'
      ? (getTeam(detailKey, locale)?.name ?? detailKey)
      : category?.key === 'rulebook'
        ? (getRuleTopic(detailKey, locale)?.title ?? detailKey)
        : undefined

  return (
    <div>
      <Breadcrumb className="border-b-2 border-ink pb-2">
        <Breadcrumb.Item asChild>
          <Link to="/codex" activeOptions={{ exact: true }}>
            {t('back')}
          </Link>
        </Breadcrumb.Item>
        {category && (
          <>
            <Breadcrumb.Separator />
            {detailName ? (
              <Breadcrumb.Item asChild>
                <Link to={category.to} activeOptions={{ exact: true }}>
                  {t(`categories.${category.key}`)}
                </Link>
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item current>
                {t(`categories.${category.key}`)}
              </Breadcrumb.Item>
            )}
          </>
        )}
        {detailName && (
          <>
            <Breadcrumb.Separator />
            <Breadcrumb.Item current>{detailName}</Breadcrumb.Item>
          </>
        )}
      </Breadcrumb>
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  )
}

/** The codex landing — section heading and category cards. */
export function CodexHome() {
  const { t } = useTranslation('codex')

  return (
    <div>
      <section className="border-b-4 border-ink pb-6">
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <PageHeading className="mt-1">{t('heading')}</PageHeading>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => (
          <Card key={category.to} asChild interactive>
            <Link to={category.to}>
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-3xl uppercase group-hover:text-paper">
                  {t(`categories.${category.key}`)}
                </h2>
                {'count' in category && (
                  <span className="font-display text-3xl text-blood group-hover:text-gold">
                    {category.count}
                  </span>
                )}
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
