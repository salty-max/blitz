import { type ComponentProps } from 'react'

import { cn } from './cn'
import { Text } from './text'

/** A muted, uppercase notice for empty results or absent content. */
export function EmptyState({ className, ...props }: ComponentProps<'p'>) {
  return (
    <Text
      variant="labelLg"
      weight="normal"
      tone="muted"
      className={cn('text-lg', className)}
      {...props}
    />
  )
}
