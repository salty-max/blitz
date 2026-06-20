import { type ComponentProps } from 'react'

import { cn } from './cn'

/** A muted, uppercase notice for empty results or absent content. */
export function EmptyState({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'font-headline text-lg uppercase tracking-wide text-ink/55',
        className
      )}
      {...props}
    />
  )
}
