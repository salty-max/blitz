import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/** Class variants for a {@link Card} — chiefly whether it reacts to hover. */
export const cardVariants = cva('border-2 border-ink bg-paper-2 p-5', {
  variants: {
    interactive: {
      true: 'group transition-colors hover:bg-ink hover:text-paper',
      false: '',
    },
  },
  defaultVariants: { interactive: false },
})

/** Props for {@link Card}. */
export type CardProps = ComponentProps<'div'> &
  VariantProps<typeof cardVariants> & {
    /** Render the single child as the card (e.g. a router Link), merging styles onto it. */
    asChild?: boolean
  }

/** A bordered Blitz card; pass `interactive` to invert to ink on hover (e.g. a link). */
export function Card({
  className,
  asChild = false,
  interactive,
  ...props
}: CardProps) {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp className={cn(cardVariants({ interactive }), className)} {...props} />
  )
}
