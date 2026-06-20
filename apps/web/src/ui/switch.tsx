import * as SwitchPrimitive from '@radix-ui/react-switch'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/**
 * A sharp on/off toggle — Radix-powered, so it carries `role="switch"`,
 * keyboard support and form integration (pass `name` for a hidden input).
 * The track fills blood when on; the square thumb slides across.
 */
export function Switch({
  className,
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'inline-flex h-6 w-11 shrink-0 items-center border-2 border-ink bg-paper p-0.5 outline-none transition-colors focus-visible:border-blood data-[state=checked]:border-blood data-[state=checked]:bg-blood disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="h-4 w-4 bg-ink transition-transform duration-150 data-[state=checked]:translate-x-5 data-[state=checked]:bg-paper" />
    </SwitchPrimitive.Root>
  )
}
