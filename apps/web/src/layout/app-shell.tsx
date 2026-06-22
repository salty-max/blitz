import { Link, Outlet } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { LanguageToggle } from '@/i18n/language-toggle'
import { AuthNav } from '@/layout/auth-nav'
import { navLinkVariants, Text } from '@/ui'

const NAV = [
  { to: '/codex', key: 'codex' },
  { to: '/teams', key: 'teams' },
  { to: '/leagues', key: 'leagues' },
] as const

/** The app shell — masthead, primary navigation, the routed page, and the footer. */
export function AppShell() {
  const { t } = useTranslation('masthead')

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b-4 border-ink bg-ink text-paper">
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-4 px-5 pb-3 pt-4">
          <Link to="/" className="leading-none">
            <Text
              as="span"
              variant="eyebrow"
              tone="gold"
              className="block text-xs"
            >
              {t('tagline')}
            </Text>
            <Text
              as="span"
              variant="title"
              tone="paper"
              className="block tracking-tight"
            >
              Blitz
            </Text>
          </Link>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <nav className="flex flex-wrap gap-x-5 gap-y-1 font-headline text-sm font-semibold uppercase tracking-wide">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  data-testid={`nav-${item.key}`}
                  className={navLinkVariants({ tone: 'masthead' })}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>
            <AuthNav />
            <LanguageToggle />
          </div>
        </div>
        <div className="h-1.5 bg-blood" />
        <div className="h-1 bg-gold" />
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8">
        <Outlet />
      </main>

      <footer className="bg-ink text-paper">
        <div className="h-1 bg-gold" />
        <div className="h-1.5 bg-blood" />
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Text
              as="span"
              variant="subheading"
              tone="paper"
              className="block tracking-tight"
            >
              Blitz
            </Text>
            <Text
              as="span"
              variant="eyebrow"
              tone="gold"
              className="mt-0.5 block text-xs"
            >
              {t('tagline')}
            </Text>
            <Text tone="paperMuted" className="mt-3">
              {t('footer.copyright')}
            </Text>
          </div>
          <nav className="flex flex-col gap-1.5">
            <Text
              asChild
              variant="labelLg"
              tone="paperMuted"
              className="inline-flex items-center gap-1 transition-colors hover:text-gold"
            >
              <a
                href="https://github.com/salty-max/blitz"
                target="_blank"
                rel="noreferrer"
              >
                {t('footer.github')}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Text>
            <Text
              asChild
              variant="labelLg"
              tone="paperMuted"
              className="inline-flex items-center gap-1 transition-colors hover:text-gold"
            >
              <a
                href="https://github.com/salty-max/blitz/issues"
                target="_blank"
                rel="noreferrer"
              >
                {t('footer.reportIssue')}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Text>
          </nav>
        </div>
        <div className="border-t border-paper/15">
          <Text
            variant="caption"
            tone="paperMuted"
            className="mx-auto w-full max-w-5xl px-5 py-4 leading-relaxed"
          >
            {t('footer.disclaimer')}
          </Text>
        </div>
      </footer>
    </div>
  )
}
