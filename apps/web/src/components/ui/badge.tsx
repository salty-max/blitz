import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/** Class variants for a Blitz badge — a small uppercase label chip. */
export const badgeVariants = cva(
  'inline-block px-2 py-1 font-headline text-xs font-bold uppercase tracking-widest',
  {
    variants: {
      tone: {
        blood: 'bg-blood text-paper',
        gold: 'bg-gold text-ink',
        ink: 'bg-ink text-paper',
      },
    },
    defaultVariants: { tone: 'blood' },
  }
)

/** Props for {@link Badge}. */
export type BadgeProps = ComponentProps<'span'> &
  VariantProps<typeof badgeVariants>

/** A small uppercase label chip in the Blitz aesthetic. */
export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />
}
