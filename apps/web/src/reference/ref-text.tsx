import { parseRefs } from '@blitz/schema'
import { Fragment } from 'react'

import { resolveRef } from '@/lib/resolve-ref'
import { useRefDrawer } from '@/reference/ref-drawer'

const refLinkClass =
  'box-decoration-clone bg-blood/10 px-1 font-semibold text-blood transition-colors hover:bg-blood hover:text-paper'

/**
 * Renders text containing `[[key]]` / `[[key|label]]` references, turning each
 * reference into a button that opens it in the side-drawer. Plain text passes
 * through unchanged.
 */
export function RefText({ children }: { children: string }) {
  const { openRef } = useRefDrawer()

  return (
    <>
      {parseRefs(children).map((segment, index) =>
        segment.kind === 'text' ? (
          <Fragment key={index}>{segment.text}</Fragment>
        ) : (
          <button
            key={index}
            type="button"
            onClick={() => openRef(segment.key)}
            className={refLinkClass}
          >
            {segment.label ?? resolveRef(segment.key)?.name ?? segment.key}
          </button>
        )
      )}
    </>
  )
}
