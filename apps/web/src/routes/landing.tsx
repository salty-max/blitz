import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button, Card, Eyebrow, Text } from '@/ui'

const PILLARS = [
  { to: '/codex', key: 'codex' },
  { to: '/teams', key: 'teams' },
  { to: '/leagues', key: 'leagues' },
] as const

/**
 * The Blitz landing — the toolkit's hero and its three pillars. Pillars always
 * link to their section; the route guard sends a signed-out coach to login when
 * one needs an account, so the landing stays auth-agnostic and never flickers
 * while the session resolves.
 */
export function LandingPage() {
  const { t } = useTranslation('landing')

  return (
    <div>
      <section className="border-b-4 border-ink pb-8">
        <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
        <Text as="h1" variant="display" className="mt-2 max-w-4xl">
          {t('hero.title')}
        </Text>
        <Text variant="lead" tone="secondary" className="mt-5 max-w-2xl">
          {t('hero.subtitle')}
        </Text>
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
              <Text
                as="h2"
                variant="heading"
                className="mt-1 group-hover:text-paper"
              >
                {t(`pillars.${pillar.key}.label`)}
              </Text>
              <Text
                tone="secondary"
                className="mt-3 flex-1 group-hover:text-paper/80"
              >
                {t(`pillars.${pillar.key}.blurb`)}
              </Text>
              <Text
                as="span"
                variant="labelLg"
                tone="blood"
                className="mt-5 inline-flex items-center gap-1 group-hover:text-gold"
              >
                {t(`pillars.${pillar.key}.cta`)}
                <ArrowRight className="h-4 w-4" />
              </Text>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
