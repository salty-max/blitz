import { type ComponentProps } from 'react'

import { cn } from './cn'

/** A horizontally scrollable data table with the codex's heavy header rule. */
export function Table({ className, ...props }: ComponentProps<'table'>) {
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
export function TableHeader(props: ComponentProps<'thead'>) {
  return <thead {...props} />
}

/** The body group of a {@link Table} — rows are separated by hairlines. */
export function TableBody({ className, ...props }: ComponentProps<'tbody'>) {
  return (
    <tbody className={cn('divide-y divide-ink/10', className)} {...props} />
  )
}

/** A table row, baseline-aligned so a tall cell lines up with its roll. */
export function TableRow({ className, ...props }: ComponentProps<'tr'>) {
  return <tr className={cn('align-baseline', className)} {...props} />
}

/** A header cell — uppercase, carrying the heavy rule beneath the header row. */
export function TableHead({ className, ...props }: ComponentProps<'th'>) {
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
export function TableCell({ className, ...props }: ComponentProps<'td'>) {
  return <td className={cn('py-2.5', className)} {...props} />
}
