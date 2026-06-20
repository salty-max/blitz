import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/** Class variants for a {@link Card} — chiefly whether it reacts to hover. */
export const cardVariants = cva('border-2 border-ink bg-paper-2 p-5', {
  variants: {
    interactive: {
      // The background fades while each descendant runs its own colour
      // transition, so all text fades in step with it. The card's own colour
      // flips instantly (not transitioned), so children that inherit it animate
      // cleanly from a single change rather than chasing a moving value.
      true: 'group transition-[background-color] [&_*]:transition-colors hover:bg-ink hover:text-paper',
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

/**
 * A bordered Blitz card; pass `interactive` to invert to ink on hover (e.g. a
 * link). Give every text child its own `group-hover:` colour so it stays
 * legible on the inverted background and fades in step with it — text that
 * only inherits the colour starts its transition a frame late.
 */
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
