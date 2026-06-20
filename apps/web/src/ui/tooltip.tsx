import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { type ComponentProps, type ReactNode } from 'react'

import { cn } from './cn'

/**
 * Wraps a tooltip provider — set it once near the app root to share the open
 * delay across every {@link Tooltip}.
 */
export const TooltipProvider = TooltipPrimitive.Provider

/** Props for {@link Tooltip}. */
export type TooltipProps = Pick<
  ComponentProps<typeof TooltipPrimitive.Root>,
  'open' | 'defaultOpen' | 'onOpenChange' | 'delayDuration'
> & {
  /** What the tooltip says — a hint, a per-roll probability. */
  content: ReactNode
  /** The element the tooltip describes; it becomes the trigger. */
  children: ReactNode
  side?: ComponentProps<typeof TooltipPrimitive.Content>['side']
  className?: string
}

/** A small ink tooltip — a hint or an odds readout on hover/focus. */
export function Tooltip({
  content,
  children,
  side = 'top',
  className,
  ...root
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root {...root}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={6}
          className={cn(
            'z-50 max-w-xs border-2 border-ink bg-ink px-2.5 py-1.5 font-body text-xs leading-snug text-paper shadow-[3px_3px_0_0_rgba(22,19,16,0.2)] data-[state=closed]:animate-select-out data-[state=delayed-open]:animate-select-in data-[state=instant-open]:animate-select-in',
            className
          )}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-ink" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}
