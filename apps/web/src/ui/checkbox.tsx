import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/**
 * A sharp square checkbox — Radix-powered, so it carries the right role,
 * keyboard support and form integration. Fills blood with a check when on.
 */
export function Checkbox({
  className,
  ...props
}: ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'inline-flex h-5 w-5 shrink-0 items-center justify-center border-2 border-ink bg-paper align-middle text-paper outline-none transition-colors focus-visible:border-blood data-[state=checked]:border-blood data-[state=checked]:bg-blood disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator>
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
