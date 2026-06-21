import { parseRefs } from '@blitz/schema'
import { Link } from '@tanstack/react-router'
import { Fragment } from 'react'

import { useDataLocale } from '@/i18n/use-data-locale'
import { pageLinkRoute } from '@/lib/page-links'
import { type RefTone, resolveRef } from '@/lib/resolve-ref'
import { useRefDrawer } from '@/reference/ref-drawer'

const refBaseClass = 'box-decoration-clone px-1 font-semibold transition-colors'

/** A page reference navigates to a dedicated codex page rather than opening the drawer. */
const pageLinkClass =
  'font-semibold text-blood underline decoration-blood/40 decoration-2 underline-offset-2 transition-colors hover:decoration-blood'

/**
 * Per-category colours: a tinted tag at rest that fills its colour on hover,
 * so skills, rules terms, special rules and star abilities read distinctly.
 */
const refToneClass: Record<RefTone, string> = {
  skill: 'bg-blood/10 text-blood hover:bg-blood hover:text-paper',
  term: 'bg-ink/10 text-ink hover:bg-ink hover:text-paper',
  rule: 'bg-pitch/10 text-pitch hover:bg-pitch hover:text-paper',
  star: 'bg-gold/25 text-ink hover:bg-gold hover:text-ink',
}

/**
 * Renders text containing `[[key]]` / `[[key|label]]` references, turning each
 * reference into a button that opens it in the side-drawer, colour-coded by the
 * kind of entry it points to. Plain text passes through unchanged.
 */
export function RefText({
  children,
  idPrefix,
}: {
  children: string
  /** When set, each reference button gets a `<idPrefix>-<key>` test id — used to target refs inside the drawer. */
  idPrefix?: string
}) {
  const { openRef } = useRefDrawer()
  const locale = useDataLocale()

  return (
    <>
      {parseRefs(children).map((segment, index) => {
        if (segment.kind === 'text')
          return <Fragment key={index}>{segment.text}</Fragment>
        const route = pageLinkRoute(segment.key)
        if (route)
          return (
            <Link key={index} to={route} className={pageLinkClass}>
              {segment.label ?? segment.key}
            </Link>
          )
        const ref = resolveRef(segment.key, locale)
        return (
          <button
            key={index}
            type="button"
            data-testid={idPrefix ? `${idPrefix}-${segment.key}` : undefined}
            onClick={() => openRef(segment.key)}
            className={`${refBaseClass} ${refToneClass[ref?.tone ?? 'skill']}`}
          >
            {segment.label ?? ref?.name ?? segment.key}
          </button>
        )
      })}
    </>
  )
}
