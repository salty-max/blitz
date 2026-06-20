import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { Button, Card, Eyebrow } from '@/components/ui'

const PILLARS = [
  {
    to: '/codex',
    kicker: 'The reference',
    label: 'Codex',
    blurb:
      'Every team, skill, star player, inducement and rule — cross-linked and searchable, always a tap away.',
    cta: 'Open the codex',
  },
  {
    to: '/teams',
    kicker: 'Team management',
    label: 'Teams',
    blurb:
      'Draft a roster within the rules and your budget, then carry it through a season: SPP, advancements, lasting injuries and team value.',
    cta: 'Build a team',
  },
  {
    to: '/leagues',
    kicker: 'Leagues & tournaments',
    label: 'Leagues',
    blurb:
      'Set up a competition, schedule fixtures, record results, and track standings and progression to the final.',
    cta: 'Run a league',
  },
] as const

/** The Blitz landing — the toolkit's hero and its three pillars. */
export function LandingPage() {
  return (
    <div>
      <section className="border-b-4 border-ink pb-8">
        <Eyebrow>Blood Bowl</Eyebrow>
        <h1 className="mt-2 max-w-4xl font-display text-6xl uppercase leading-[0.9] sm:text-7xl">
          Everything off the pitch
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink/75">
          Build and manage your teams, run your leagues and tournaments, and
          look up every rule, skill and star in a searchable codex.
        </p>
        <Button asChild className="mt-6">
          <Link to="/codex">
            Open the codex
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {PILLARS.map((pillar) => (
          <Card
            key={pillar.to}
            asChild
            interactive
            className="flex flex-col p-6"
          >
            <Link to={pillar.to}>
              <Eyebrow size="sm" className="group-hover:text-gold">
                {pillar.kicker}
              </Eyebrow>
              <h2 className="mt-1 font-display text-3xl uppercase">
                {pillar.label}
              </h2>
              <p className="mt-3 flex-1 text-ink/70 group-hover:text-paper/80">
                {pillar.blurb}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 font-headline text-sm font-semibold uppercase tracking-wide text-blood group-hover:text-gold">
                {pillar.cta}
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
