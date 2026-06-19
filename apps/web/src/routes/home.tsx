import {
  inducements,
  skills,
  specialRules,
  starPlayers,
  teams,
} from '@blitz/data'
import { Link } from '@tanstack/react-router'

const SECTIONS = [
  {
    to: '/teams',
    label: 'Teams',
    count: teams.length,
    blurb: 'Rosters, positions, costs and skill access for every team.',
  },
  {
    to: '/skills',
    label: 'Skills',
    count: skills.length,
    blurb: 'Every skill, trait and mutation, by category.',
  },
  {
    to: '/stars',
    label: 'Star Players',
    count: starPlayers.length,
    blurb: 'Mercenary stars and their unique special abilities.',
  },
  {
    to: '/inducements',
    label: 'Inducements',
    count: inducements.length,
    blurb: 'One-off help to hire before a match.',
  },
  {
    to: '/rules',
    label: 'Special Rules',
    count: specialRules.length,
    blurb: 'League affiliations and mechanical team rules.',
  },
] as const

/** The codex landing — masthead and section cards. */
export function HomePage() {
  return (
    <div>
      <section className="border-b-4 border-ink pb-6">
        <p className="font-headline text-sm font-bold uppercase tracking-[0.3em] text-blood">
          Third Season Edition
        </p>
        <h1 className="mt-1 font-display text-6xl uppercase leading-[0.9] sm:text-7xl">
          The Blood Bowl Codex
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink/75">
          Every team, skill, star player and rule — cross-linked. Tap any{' '}
          <span className="font-semibold text-blood">highlighted term</span> to
          open it in the drawer.
        </p>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className="group border-2 border-ink bg-paper-2 p-5 transition-colors hover:bg-ink hover:text-paper"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-display text-3xl uppercase">
                {section.label}
              </h2>
              <span className="font-display text-3xl text-blood group-hover:text-gold">
                {section.count}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink/70 group-hover:text-paper/80">
              {section.blurb}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
