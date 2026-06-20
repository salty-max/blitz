import { type ComponentProps, type ReactNode } from 'react'

import { cn } from './cn'

/** A small uppercase muted label that tops or prefixes a field's value. */
export function FieldLabel({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        'font-headline text-xs font-semibold uppercase tracking-wide text-ink/45',
        className
      )}
      {...props}
    />
  )
}

/** Props for {@link Field}. */
export type FieldProps = Omit<ComponentProps<'div'>, 'children'> & {
  /** The field's label, shown above its value. */
  label: ReactNode
  children: ReactNode
}

/** A labelled field — a {@link FieldLabel} above its value. */
export function Field({ label, className, children, ...props }: FieldProps) {
  return (
    <div className={className} {...props}>
      <FieldLabel>{label}</FieldLabel>
      <div className="mt-1.5 text-sm text-ink/85">{children}</div>
    </div>
  )
}
