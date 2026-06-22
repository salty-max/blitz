import { type ReactNode } from 'react'

import { cn } from './cn'
import { Text } from './text'

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
      <Text variant="label" tone="muted">
        {label}
      </Text>
      <Text variant="stat" className="mt-1 text-3xl">
        {value}
      </Text>
      {hint && (
        <Text variant="caption" tone="muted" className="mt-1">
          {hint}
        </Text>
      )}
    </div>
  )
}
