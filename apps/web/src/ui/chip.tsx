import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/** Class variants for a {@link Chip} — a small uppercase headline pill. */
export const chipVariants = cva(
  'inline-flex items-center font-headline font-semibold uppercase tracking-wide',
  {
    variants: {
      variant: {
        blood: 'bg-blood text-paper',
        ink: 'bg-ink text-paper',
        gold: 'bg-gold tabular-nums text-ink',
        outline: 'border border-ink/25 text-ink/80',
        accent: 'border border-blood/60 bg-blood/10 text-blood',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-base leading-none',
      },
      interactive: {
        true: 'transition-colors',
        false: '',
      },
    },
    // Only the bordered chips react to hover (filling with blood).
    compoundVariants: [
      {
        variant: ['outline', 'accent'],
        interactive: true,
        class:
          'cursor-pointer hover:border-blood hover:bg-blood hover:text-paper',
      },
    ],
    defaultVariants: { variant: 'outline', size: 'sm', interactive: false },
  }
)

/** Props for {@link Chip}. */
export type ChipProps = ComponentProps<'span'> &
  VariantProps<typeof chipVariants> & {
    /** Render the single child as the chip (e.g. a button or link), merging styles onto it. */
    asChild?: boolean
  }

/** A small uppercase pill — a static label, a price, or an interactive reference. */
export function Chip({
  className,
  variant,
  size,
  interactive,
  asChild = false,
  ...props
}: ChipProps) {
  const Comp = asChild ? Slot : 'span'
  return (
    <Comp
      className={cn(chipVariants({ variant, size, interactive }), className)}
      {...props}
    />
  )
}
