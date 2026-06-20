import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, type ReactNode } from 'react'

import { cn } from './cn'

/** Class variants for a {@link SectionHeading}. */
export const sectionHeadingVariants = cva(
  'flex items-baseline gap-2 font-display text-3xl uppercase',
  {
    variants: {
      tone: {
        ink: '',
        blood: 'text-blood',
      },
      bordered: {
        true: 'border-b-2 border-ink pb-1',
        false: '',
      },
    },
    defaultVariants: { tone: 'ink', bordered: false },
  }
)

/** Props for {@link SectionHeading}. */
export type SectionHeadingProps = ComponentProps<'h2'> &
  VariantProps<typeof sectionHeadingVariants> & {
    /** A muted trailing kicker — a count, a die type, etc. */
    hint?: ReactNode
  }

/** A catalogue section heading, with an optional muted trailing hint. */
export function SectionHeading({
  className,
  tone,
  bordered,
  hint,
  children,
  ...props
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(sectionHeadingVariants({ tone, bordered }), className)}
      {...props}
    >
      {children}
      {hint != null && (
        <span className="font-headline text-sm font-semibold uppercase tracking-wide text-ink/45">
          {hint}
        </span>
      )}
    </h2>
  )
}
