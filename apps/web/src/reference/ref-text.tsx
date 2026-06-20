import { parseRefs } from '@blitz/schema'
import { Fragment } from 'react'

import { type RefTone, resolveRef } from '@/lib/resolve-ref'
import { useRefDrawer } from '@/reference/ref-drawer'

const refBaseClass = 'box-decoration-clone px-1 font-semibold transition-colors'

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
export function RefText({ children }: { children: string }) {
  const { openRef } = useRefDrawer()

  return (
    <>
      {parseRefs(children).map((segment, index) => {
        if (segment.kind === 'text')
          return <Fragment key={index}>{segment.text}</Fragment>
        const ref = resolveRef(segment.key)
        return (
          <button
            key={index}
            type="button"
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
