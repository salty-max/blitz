import { Link, Outlet } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { LanguageToggle } from '@/i18n/language-toggle'
import { AuthNav } from '@/layout/auth-nav'
import { navLinkVariants } from '@/ui'

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
            <span className="block font-headline text-xs font-bold uppercase tracking-[0.3em] text-gold">
              {t('tagline')}
            </span>
            <span className="block font-display text-5xl uppercase tracking-tight">
              Blitz
            </span>
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
            <span className="block font-display text-2xl uppercase tracking-tight">
              Blitz
            </span>
            <span className="mt-0.5 block font-headline text-xs font-bold uppercase tracking-[0.3em] text-gold">
              {t('tagline')}
            </span>
            <p className="mt-3 text-sm text-paper/55">
              {t('footer.copyright')}
            </p>
          </div>
          <nav className="flex flex-col gap-1.5 font-headline text-sm font-semibold uppercase tracking-wide">
            <a
              href="https://github.com/salty-max/blitz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-paper/70 transition-colors hover:text-gold"
            >
              {t('footer.github')}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://github.com/salty-max/blitz/issues"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-paper/70 transition-colors hover:text-gold"
            >
              {t('footer.reportIssue')}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>
        <div className="border-t border-paper/15">
          <p className="mx-auto w-full max-w-5xl px-5 py-4 text-xs leading-relaxed text-paper/40">
            {t('footer.disclaimer')}
          </p>
        </div>
      </footer>
    </div>
  )
}
