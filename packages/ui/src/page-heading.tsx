import { type ComponentProps } from 'react'

import { cn } from './cn'

/** A page's primary heading, set in the Blitz display face. */
export function PageHeading({ className, ...props }: ComponentProps<'h1'>) {
  return (
    <h1
      className={cn('font-display text-5xl uppercase', className)}
      {...props}
    />
  )
}
