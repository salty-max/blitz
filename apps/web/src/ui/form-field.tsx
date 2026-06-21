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
  const generatedId = useId()
  const messageId = `${generatedId}-message`
  const message = error ?? hint

  // Respect a control that brings its own id / aria-describedby rather than
  // clobbering them: the label points at whichever id wins, and the message is
  // appended to any existing description.
  const childProps = isValidElement(children)
    ? (children.props as Record<string, unknown>)
    : {}
  const controlId = (childProps.id as string | undefined) ?? generatedId
  const describedBy =
    [childProps['aria-describedby'], message && messageId]
      .filter(Boolean)
      .join(' ') || undefined

  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        id: controlId,
        'aria-invalid': error ? true : childProps['aria-invalid'],
        'aria-describedby': describedBy,
      })
    : children

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={controlId}
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
