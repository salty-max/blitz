import * as TabsPrimitive from '@radix-ui/react-tabs'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/** The tabs root — owns the active tab. */
function TabsRoot(props: ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root {...props} />
}

/** The row of tab triggers, sitting on a hairline rule. */
function TabsList({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn('flex gap-1 border-b-2 border-ink/15', className)}
      {...props}
    />
  )
}

/** A tab trigger — underlines blood when active. */
function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        '-mb-0.5 border-b-2 border-transparent px-3 py-2 font-headline text-sm font-semibold uppercase tracking-wide text-ink/55 outline-none transition-colors hover:text-ink focus-visible:text-ink data-[state=active]:border-blood data-[state=active]:text-blood',
        className
      )}
      {...props}
    />
  )
}

/** A tab panel. */
function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn('py-4 outline-none', className)}
      {...props}
    />
  )
}

/**
 * Page-level tabbed sections — Radix-powered, with arrow-key navigation.
 * Compound parts: `Tabs.List`, `Tabs.Trigger` and `Tabs.Content`. Use it for a
 * team page (Roster / Staff / History) or a league page (Standings / Fixtures).
 */
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
})
