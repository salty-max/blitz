import * as SelectPrimitive from '@radix-ui/react-select'
import { type ComponentProps } from 'react'

import { cn } from './cn'

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M6 8l4 4 4-4" />
    </svg>
  )
}

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M6 12l4-4 4 4" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M5 10.5l3.5 3.5L15 6.5" />
    </svg>
  )
}

/** A select menu — Radix-powered and fully styled (no native dropdown). */
export const Select = SelectPrimitive.Root

/** The current value (or placeholder) rendered inside the trigger. */
export const SelectValue = SelectPrimitive.Value

/** The button that opens the select menu. */
export function SelectTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'group inline-flex items-center justify-between gap-2 border-2 border-ink bg-paper py-1.5 pl-3 pr-2.5 font-headline text-sm font-semibold uppercase tracking-wide text-ink outline-none transition-colors focus-visible:border-blood data-[state=open]:border-blood',
        className
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="h-4 w-4 shrink-0 text-ink/55 transition-transform duration-150 group-data-[state=open]:rotate-180" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

/** The dropdown panel listing the options. */
export function SelectContent({
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
          <ChevronUpIcon className="h-4 w-4" />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex h-6 cursor-default items-center justify-center bg-paper text-ink/55">
          <ChevronDownIcon className="h-4 w-4" />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

/** A selectable option. */
export function SelectItem({
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
          <CheckIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}
