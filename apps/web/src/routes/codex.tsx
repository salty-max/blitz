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

import { Card, Eyebrow, navLinkVariants, PageHeading } from '@/components/ui'

const CATEGORIES = [
  { to: '/codex/teams', label: 'Teams', count: teams.length },
  { to: '/codex/skills', label: 'Skills', count: skills.length },
  { to: '/codex/stars', label: 'Star Players', count: starPlayers.length },
  {
    to: '/codex/inducements',
    label: 'Inducements',
    count: inducements.length,
  },
  { to: '/codex/rules', label: 'Special Rules', count: specialRules.length },
  { to: '/codex/injuries', label: 'Injuries', count: injuries.length },
  { to: '/codex/prayers', label: 'Prayers', count: prayers.length },
  { to: '/codex/glossary', label: 'Glossary', count: glossary.length },
] as const

/**
 * The codex section shell for category pages — a sub-nav back to the index and
 * across the sibling categories, above whichever category page is active.
 */
export function CodexLayout() {
  return (
    <div>
      <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 border-b-2 border-ink pb-2 font-headline text-sm font-semibold uppercase tracking-wide">
        <Link
          to="/codex"
          activeOptions={{ exact: true }}
          className="inline-flex items-center gap-0.5 text-ink/45 transition-colors hover:text-blood"
        >
          <ChevronLeft className="h-4 w-4" />
          Codex
        </Link>
        {CATEGORIES.map((category) => (
          <Link
            key={category.to}
            to={category.to}
            className={navLinkVariants({ tone: 'section' })}
          >
            {category.label}
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
  return (
    <div>
      <section className="border-b-4 border-ink pb-6">
        <Eyebrow>Third Season Edition</Eyebrow>
        <PageHeading className="mt-1">The Blood Bowl Codex</PageHeading>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => (
          <Card key={category.to} asChild interactive>
            <Link to={category.to}>
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-3xl uppercase">
                  {category.label}
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
