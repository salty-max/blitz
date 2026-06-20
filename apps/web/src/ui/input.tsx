import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/** Class variants for a Blitz text input — a sharp bordered field. */
export const inputVariants = cva(
  'w-full border-2 border-ink bg-paper font-body text-ink outline-none transition-colors placeholder:text-ink/40 focus-visible:border-blood disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'px-2.5 py-1.5 text-xs',
        md: 'px-3 py-2 text-sm',
      },
      invalid: {
        true: 'border-blood',
        false: '',
      },
    },
    defaultVariants: { size: 'md', invalid: false },
  }
)

/** Props for {@link Input} — native input props, minus the conflicting numeric `size`. */
export type InputProps = Omit<ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants>

/** A single-line text input in the Blitz aesthetic; set `invalid` to flag a bad value. */
export function Input({ className, size, invalid, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(inputVariants({ size, invalid }), className)}
      {...props}
    />
  )
}
