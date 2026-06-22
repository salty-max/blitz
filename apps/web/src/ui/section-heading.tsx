import { type ComponentProps, type ReactNode } from 'react'

import { cn } from './cn'
import { Text } from './text'

/** Props for {@link SectionHeading}. */
export type SectionHeadingProps = ComponentProps<'h2'> & {
  /** Colour of the heading — neutral ink (default) or blood. */
  tone?: 'ink' | 'blood'
  /** Add a bottom rule beneath the heading. */
  bordered?: boolean
  /** A muted trailing kicker — a count, a die type, etc. */
  hint?: ReactNode
}

/** A catalogue section heading, with an optional muted trailing hint. */
export function SectionHeading({
  className,
  tone = 'ink',
  bordered = false,
  hint,
  children,
  ...props
}: SectionHeadingProps) {
  return (
    <Text
      as="h2"
      variant="heading"
      tone={tone === 'blood' ? 'blood' : 'default'}
      className={cn(
        'flex items-baseline gap-2',
        bordered && 'border-b-2 border-ink pb-1',
        className
      )}
      {...props}
    >
      {children}
      {hint != null && (
        <Text as="span" variant="labelLg" tone="muted">
          {hint}
        </Text>
      )}
    </Text>
  )
}
