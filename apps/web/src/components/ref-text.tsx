import { parseRefs } from '@blitz/schema'
import { Fragment } from 'react'

import { useRefDrawer } from '@/components/ref-drawer'
import { resolveRef } from '@/lib/resolve-ref'

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
            className="font-semibold text-blood underline decoration-blood/40 decoration-2 underline-offset-2 transition-colors hover:decoration-blood"
          >
            {segment.label ?? resolveRef(segment.key)?.name ?? segment.key}
          </button>
        )
      )}
    </>
  )
}
