import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/** Class variants for an eyebrow — the small uppercase kicker above a heading. */
export const eyebrowVariants = cva('font-headline font-bold uppercase', {
  variants: {
    tone: {
      blood: 'text-blood',
      gold: 'text-gold',
      muted: 'text-ink/45',
    },
    size: {
      sm: 'text-xs tracking-[0.25em]',
      md: 'text-sm tracking-[0.3em]',
    },
  },
  defaultVariants: { tone: 'blood', size: 'md' },
})

/** Props for {@link Eyebrow}. */
export type EyebrowProps = ComponentProps<'p'> &
  VariantProps<typeof eyebrowVariants>

/** The small uppercase kicker shown above a section heading. */
export function Eyebrow({ className, tone, size, ...props }: EyebrowProps) {
  return (
    <p className={cn(eyebrowVariants({ tone, size }), className)} {...props} />
  )
}
