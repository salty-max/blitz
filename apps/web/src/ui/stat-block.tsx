import { type ReactNode } from 'react'

import { cn } from './cn'

/** Props for {@link StatBlock}. */
export type StatBlockProps = {
  /** The muted label above the value. */
  label: ReactNode
  /** The headline figure. */
  value: ReactNode
  /** Optional supporting note below the value. */
  hint?: ReactNode
  className?: string
}

/**
 * A bordered figure card — a team's value, treasury, or W–D–L record. The label
 * sits muted above a big display-face value, with an optional hint beneath.
 */
export function StatBlock({ label, value, hint, className }: StatBlockProps) {
  return (
    <div className={cn('border-2 border-ink bg-paper-2 px-4 py-3', className)}>
      <p className="font-headline text-xs font-semibold uppercase tracking-wide text-ink/55">
        {label}
      </p>
      <p className="mt-1 font-display text-3xl leading-none tabular-nums text-ink">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-ink/55">{hint}</p>}
    </div>
  )
}
