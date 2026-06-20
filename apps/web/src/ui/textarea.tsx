import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/** Class variants for a Blitz textarea — the multi-line sibling of {@link Input}. */
export const textareaVariants = cva(
  'w-full border-2 border-ink bg-paper px-3 py-2 font-body text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus-visible:border-blood disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      invalid: {
        true: 'border-blood',
        false: '',
      },
    },
    defaultVariants: { invalid: false },
  }
)

/** Props for {@link Textarea}. */
export type TextareaProps = ComponentProps<'textarea'> &
  VariantProps<typeof textareaVariants>

/** A multi-line text input — match notes, a league's description. */
export function Textarea({ className, invalid, ...props }: TextareaProps) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(textareaVariants({ invalid }), className)}
      {...props}
    />
  )
}
