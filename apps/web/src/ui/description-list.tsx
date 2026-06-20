import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, type ReactNode } from 'react'

import { cn } from './cn'

/** A term/definition list with hairline dividers between rows. */
function DescriptionListRoot({ className, ...props }: ComponentProps<'dl'>) {
  return <dl className={cn('divide-y divide-ink/10', className)} {...props} />
}

/** Class variants for a {@link DescriptionList.Row} — chiefly the term-column width. */
export const descriptionRowVariants = cva(
  'grid gap-1 py-2.5 sm:items-center sm:gap-4',
  {
    variants: {
      width: {
        md: 'sm:grid-cols-[12rem_1fr]',
        lg: 'sm:grid-cols-[14rem_1fr]',
      },
    },
    defaultVariants: { width: 'md' },
  }
)

/** Props for {@link DescriptionList.Row}. */
export type DescriptionRowProps = Omit<ComponentProps<'div'>, 'children'> &
  VariantProps<typeof descriptionRowVariants> & {
    /** The term shown in the left column. */
    term: ReactNode
    children: ReactNode
  }

/** A term/definition pair — the term on the left, its details on the right. */
function DescriptionRow({
  term,
  width,
  className,
  children,
  ...props
}: DescriptionRowProps) {
  return (
    <div
      className={cn(descriptionRowVariants({ width }), className)}
      {...props}
    >
      <dt className="font-headline text-lg font-semibold uppercase tracking-wide">
        {term}
      </dt>
      <dd className="text-ink/85">{children}</dd>
    </div>
  )
}

/** A description list; use `DescriptionList.Row` for each term/definition pair. */
export const DescriptionList = Object.assign(DescriptionListRoot, {
  Row: DescriptionRow,
})
