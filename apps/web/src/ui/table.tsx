import { type ComponentProps } from 'react'

import { cn } from './cn'

/** A horizontally scrollable data table with the codex's heavy header rule. */
function TableRoot({ className, ...props }: ComponentProps<'table'>) {
  return (
    <div className="overflow-x-auto">
      <table
        className={cn('w-full border-collapse text-left text-sm', className)}
        {...props}
      />
    </div>
  )
}

/** The header group of a {@link Table}. */
function TableHeader(props: ComponentProps<'thead'>) {
  return <thead {...props} />
}

/** The body group of a {@link Table} — rows are separated by hairlines. */
function TableBody({ className, ...props }: ComponentProps<'tbody'>) {
  return (
    <tbody className={cn('divide-y divide-ink/10', className)} {...props} />
  )
}

/** A table row; cells are vertically centred so a tall cell sits level with its text. */
function TableRow({ className, ...props }: ComponentProps<'tr'>) {
  return <tr className={cn('align-middle', className)} {...props} />
}

/** A header cell — uppercase, carrying the heavy rule beneath the header row. */
function TableHead({ className, ...props }: ComponentProps<'th'>) {
  return (
    <th
      className={cn(
        'border-b-2 border-ink py-2 font-headline text-xs uppercase tracking-wide text-ink/55',
        className
      )}
      {...props}
    />
  )
}

/** A body cell. */
function TableCell({ className, ...props }: ComponentProps<'td'>) {
  return <td className={cn('py-2.5', className)} {...props} />
}

/**
 * A data table assembled from compound parts: `Table.Header`, `Table.Body`,
 * `Table.Row`, `Table.Head` and `Table.Cell`.
 */
export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
})
