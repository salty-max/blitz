import { Slot } from '@radix-ui/react-slot'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/** Props for {@link Card}. */
export type CardProps = ComponentProps<'div'> & {
  /** Render the single child as the card (e.g. a router Link), merging styles onto it. */
  asChild?: boolean
}

/** A bordered Blitz card that inverts to ink on hover. */
export function Card({ className, asChild = false, ...props }: CardProps) {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      className={cn(
        'group border-2 border-ink bg-paper-2 p-5 transition-colors hover:bg-ink hover:text-paper',
        className
      )}
      {...props}
    />
  )
}
