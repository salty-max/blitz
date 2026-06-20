import { navLinkVariants } from '@blitz/ui'
import { Link, Outlet } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

const NAV = [
  { to: '/codex', label: 'Codex' },
  { to: '/teams', label: 'Teams' },
  { to: '/leagues', label: 'Leagues' },
] as const

/** The app shell — masthead, primary navigation, the routed page, and the footer. */
export function AppShell() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b-4 border-ink bg-ink text-paper">
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-4 px-5 pb-3 pt-4">
          <Link to="/" className="leading-none">
            <span className="block font-headline text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Blood Bowl Toolkit
            </span>
            <span className="block font-display text-5xl uppercase tracking-tight">
              Blitz
            </span>
          </Link>
          <nav className="flex flex-wrap gap-x-5 gap-y-1 font-headline text-sm font-semibold uppercase tracking-wide">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={navLinkVariants({ tone: 'masthead' })}
              >
                {item.label}
              </Link>
            ))}
          </nav>
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
              Blood Bowl Toolkit
            </span>
            <p className="mt-3 text-sm text-paper/55">© 2026 Blitz</p>
          </div>
          <nav className="flex flex-col gap-1.5 font-headline text-sm font-semibold uppercase tracking-wide">
            <a
              href="https://github.com/salty-max/blitz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-paper/70 transition-colors hover:text-gold"
            >
              GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://github.com/salty-max/blitz/issues"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-paper/70 transition-colors hover:text-gold"
            >
              Report an issue
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>
        <div className="border-t border-paper/15">
          <p className="mx-auto w-full max-w-5xl px-5 py-4 text-xs leading-relaxed text-paper/40">
            Blitz is an unofficial, fan-made tool. Blood Bowl and all associated
            names are trademarks of Games Workshop Limited. This project is not
            affiliated with or endorsed by Games Workshop.
          </p>
        </div>
      </footer>
    </div>
  )
}
