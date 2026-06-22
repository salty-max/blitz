import { type ComponentProps } from 'react'

import { cn } from './cn'
import { Text } from './text'

/** Props for {@link Eyebrow}. */
export type EyebrowProps = ComponentProps<'p'> & {
  /** Colour of the kicker. */
  tone?: 'blood' | 'gold' | 'muted'
  /** Scale — `md` (default) or the tighter, smaller `sm`. */
  size?: 'sm' | 'md'
}

/** The small uppercase kicker shown above a section heading or hero. */
export function Eyebrow({
  className,
  tone = 'blood',
  size = 'md',
  ...props
}: EyebrowProps) {
  return (
    <Text
      as="p"
      variant="eyebrow"
      tone={tone}
      className={cn(size === 'sm' && 'text-xs tracking-[0.25em]', className)}
      {...props}
    />
  )
}
