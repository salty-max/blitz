import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/** Class variants for a Blitz button — usable on its own or to style a link. */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-headline font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        solid: 'bg-blood text-paper hover:bg-blood-dark',
        outline: 'border-2 border-ink text-ink hover:bg-ink hover:text-paper',
        ghost: 'text-ink/70 hover:text-blood',
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-5 py-2.5 text-sm',
      },
    },
    defaultVariants: { variant: 'solid', size: 'md' },
  }
)

/** Props for {@link Button}. */
export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    /** Render the single child as the button (e.g. a router Link), merging styles onto it. */
    asChild?: boolean
  }

/** A button in the Blitz aesthetic; pass `asChild` to style a link as a button. */
export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}
