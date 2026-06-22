import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/** The select root — owns the open state and selected value. */
function SelectRoot(props: ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root {...props} />
}

/** The current value (or placeholder) rendered inside the trigger. */
const SelectValue = SelectPrimitive.Value

/** The button that opens the select menu. */
function SelectTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'group inline-flex items-center justify-between gap-2 border-2 border-ink bg-paper py-2 pl-3 pr-2.5 font-headline text-sm font-semibold uppercase tracking-wide text-ink outline-none transition-colors focus-visible:border-blood data-[state=open]:border-blood',
        className
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 shrink-0 text-ink/55 transition-transform duration-150 group-data-[state=open]:rotate-180" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

/** The dropdown panel listing the options. */
function SelectContent({
  className,
  children,
  position = 'popper',
  sideOffset = 4,
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        sideOffset={sideOffset}
        className={cn(
          'relative z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden border-2 border-ink bg-paper text-ink shadow-[4px_4px_0_0_#16131024] data-[state=closed]:animate-select-out data-[state=open]:animate-select-in',
          className
        )}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-paper text-ink/55">
          <ChevronUp className="h-4 w-4" />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex h-6 cursor-default items-center justify-center bg-paper text-ink/55">
          <ChevronDown className="h-4 w-4" />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

/** A selectable option. */
function SelectItem({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'relative flex cursor-pointer select-none items-center py-1.5 pl-8 pr-3 font-headline text-sm font-semibold uppercase tracking-wide text-ink/80 outline-none transition-colors data-[highlighted]:bg-ink data-[highlighted]:text-paper data-[state=checked]:not-data-[highlighted]:text-blood data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
        className
      )}
      {...props}
    >
      <span className="absolute left-2 inline-flex items-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

/**
 * A select menu — Radix-powered and fully styled (no native dropdown) —
 * assembled from compound parts: `Select.Trigger`, `Select.Value`,
 * `Select.Content` and `Select.Item`.
 */
export const Select = Object.assign(SelectRoot, {
  Trigger: SelectTrigger,
  Value: SelectValue,
  Content: SelectContent,
  Item: SelectItem,
})
