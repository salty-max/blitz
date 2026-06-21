import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button, Card, Eyebrow } from '@/ui'

const PILLARS = [
  { to: '/codex', key: 'codex' },
  { to: '/teams', key: 'teams' },
  { to: '/leagues', key: 'leagues' },
] as const

/** The Blitz landing — the toolkit's hero and its three pillars. */
export function LandingPage() {
  const { t } = useTranslation('landing')

  return (
    <div>
      <section className="border-b-4 border-ink pb-8">
        <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
        <h1 className="mt-2 max-w-4xl font-display text-6xl uppercase leading-[0.9] sm:text-7xl">
          {t('hero.title')}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-ink/75">
          {t('hero.subtitle')}
        </p>
        <Button asChild className="mt-6">
          <Link to="/codex" data-testid="landing-cta-codex">
            {t('hero.cta')}
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
                {t(`pillars.${pillar.key}.kicker`)}
              </Eyebrow>
              <h2 className="mt-1 font-display text-3xl uppercase group-hover:text-paper">
                {t(`pillars.${pillar.key}.label`)}
              </h2>
              <p className="mt-3 flex-1 text-ink/70 group-hover:text-paper/80">
                {t(`pillars.${pillar.key}.blurb`)}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 font-headline text-sm font-semibold uppercase tracking-wide text-blood group-hover:text-gold">
                {t(`pillars.${pillar.key}.cta`)}
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
