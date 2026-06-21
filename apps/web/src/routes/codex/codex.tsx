import {
  glossary,
  inducements,
  injuries,
  prayers,
  skills,
  specialRules,
  starPlayers,
  teams,
} from '@blitz/data'
import { Link, Outlet } from '@tanstack/react-router'
import { ChevronLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Card, Eyebrow, navLinkVariants, PageHeading } from '@/ui'

const CATEGORIES = [
  { to: '/codex/teams', key: 'teams', count: teams.length },
  { to: '/codex/skills', key: 'skills', count: skills.length },
  { to: '/codex/stars', key: 'stars', count: starPlayers.length },
  {
    to: '/codex/inducements',
    key: 'inducements',
    count: inducements.length,
  },
  { to: '/codex/rules', key: 'rules', count: specialRules.length },
  { to: '/codex/injuries', key: 'injuries', count: injuries.length },
  { to: '/codex/prayers', key: 'prayers', count: prayers.length },
  { to: '/codex/glossary', key: 'glossary', count: glossary.length },
] as const

/**
 * The codex section shell for category pages — a sub-nav back to the index and
 * across the sibling categories, above whichever category page is active.
 */
export function CodexLayout() {
  const { t } = useTranslation('codex')

  return (
    <div>
      <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 border-b-2 border-ink pb-2 font-headline text-sm font-semibold uppercase tracking-wide">
        <Link
          to="/codex"
          activeOptions={{ exact: true }}
          className="inline-flex items-center gap-0.5 text-ink/45 transition-colors hover:text-blood"
        >
          <ChevronLeft className="h-4 w-4" />
          {t('back')}
        </Link>
        {CATEGORIES.map((category) => (
          <Link
            key={category.to}
            to={category.to}
            className={navLinkVariants({ tone: 'section' })}
          >
            {t(`categories.${category.key}`)}
          </Link>
        ))}
      </nav>
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
                <span className="font-display text-3xl text-blood group-hover:text-gold">
                  {category.count}
                </span>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
