import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/** The accordion root — single- or multiple-open, per its `type`. */
function AccordionRoot(props: ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root {...props} />
}

/** A collapsible section, separated by a hairline. */
function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn('border-b border-ink/15', className)}
      {...props}
    />
  )
}

/** The clickable header — its chevron flips when the section opens. */
function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex flex-1 items-center justify-between gap-3 py-3 text-left font-headline text-base font-semibold uppercase tracking-wide text-ink outline-none transition-colors hover:text-blood focus-visible:text-blood',
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 text-ink/55 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/** The collapsible body — animates to the measured height. */
function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-sm text-ink/80 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('pb-3', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

/**
 * Stacked collapsible sections — Radix-powered. Compound parts:
 * `Accordion.Item`, `Accordion.Trigger` and `Accordion.Content`. Use it for
 * expandable rules subsections or per-match details.
 */
export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
})
