import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useId,
} from 'react'

import { cn } from './cn'

/** Props for {@link FormField}. */
export type FormFieldProps = {
  /** The field's label, shown above the control. */
  label: ReactNode
  /** Helper text shown below the control when there is no error. */
  hint?: ReactNode
  /** An error message; replaces the hint and flags the control as invalid. */
  error?: ReactNode
  /** Mark the field required, adding a blood asterisk to the label. */
  required?: boolean
  className?: string
  /** The control. Its `id`, `aria-invalid` and `aria-describedby` are wired up. */
  children: ReactNode
}

/**
 * Wraps a single form control with a label and optional hint or error, wiring
 * up the `id`/`aria-describedby`/`aria-invalid` links between them.
 */
export function FormField({
  label,
  hint,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  const id = useId()
  const messageId = `${id}-message`
  const message = error ?? hint

  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': message ? messageId : undefined,
      })
    : children

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={id}
        className="font-headline text-xs font-semibold uppercase tracking-wide text-ink/55"
      >
        {label}
        {required && <span className="text-blood"> *</span>}
      </label>
      {control}
      {message && (
        <p
          id={messageId}
          role={error ? 'alert' : undefined}
          className={cn('text-xs', error ? 'text-blood' : 'text-ink/55')}
        >
          {message}
        </p>
      )}
    </div>
  )
}
