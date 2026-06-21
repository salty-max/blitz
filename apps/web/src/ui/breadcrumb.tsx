import { Slot } from '@radix-ui/react-slot'
import { ChevronRight } from 'lucide-react'
import { type ComponentProps, type ReactNode } from 'react'

import { cn } from './cn'

/** The breadcrumb trail — interleave `Breadcrumb.Item` and `Breadcrumb.Separator`. */
function BreadcrumbRoot({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 font-headline text-sm font-semibold uppercase tracking-wide text-ink/55">
        {children}
      </ol>
    </nav>
  )
}

/** A crumb. Pass `current` for the active page, or `asChild` to wrap a link. */
function BreadcrumbItem({
  asChild = false,
  current = false,
  className,
  ...props
}: ComponentProps<'span'> & { asChild?: boolean; current?: boolean }) {
  const Comp = asChild ? Slot : 'span'
  return (
    <li>
      <Comp
        aria-current={current ? 'page' : undefined}
        className={cn(
          'transition-colors',
          current ? 'text-blood' : 'hover:text-ink',
          className
        )}
        {...props}
      />
    </li>
  )
}

/** The chevron between crumbs. */
function BreadcrumbSeparator() {
  return (
    <li role="presentation" aria-hidden className="text-ink/30">
      <ChevronRight className="h-3.5 w-3.5" />
    </li>
  )
}

/**
 * A breadcrumb trail. Compound parts: `Breadcrumb.Item` (with `asChild` for
 * links, `current` for the active page) and `Breadcrumb.Separator`, interleaved.
 */
export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Item: BreadcrumbItem,
  Separator: BreadcrumbSeparator,
})
