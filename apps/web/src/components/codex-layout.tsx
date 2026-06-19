import { Link, Outlet } from '@tanstack/react-router'

const NAV = [
  { to: '/teams', label: 'Teams' },
  { to: '/skills', label: 'Skills' },
  { to: '/stars', label: 'Star Players' },
  { to: '/inducements', label: 'Inducements' },
  { to: '/rules', label: 'Rules' },
] as const

/** The codex shell — masthead, primary navigation, and the routed page below. */
export function CodexLayout() {
  return (
    <div className="min-h-dvh">
      <header className="border-b-4 border-ink bg-ink text-paper">
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-4 px-5 pb-3 pt-4">
          <Link to="/" className="leading-none">
            <span className="block font-headline text-xs font-bold uppercase tracking-[0.3em] text-gold">
              The Blood Bowl Codex
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
                className="text-paper/70 transition-colors hover:text-gold"
                activeProps={{ className: 'text-gold' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="h-1.5 bg-blood" />
        <div className="h-1 bg-gold" />
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8">
        <Outlet />
      </main>
    </div>
  )
}
