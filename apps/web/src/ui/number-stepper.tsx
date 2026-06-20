import { Minus, Plus } from 'lucide-react'

import { cn } from './cn'

/** Props for {@link NumberStepper}. */
export type NumberStepperProps = {
  /** The current value. */
  value: number
  /** Called with the new value when stepped. */
  onValueChange: (value: number) => void
  /** Lowest allowed value; the minus button disables at it. */
  min?: number
  /** Highest allowed value; the plus button disables at it. */
  max?: number
  /** Amount each press adds or removes. */
  step?: number
  /** Accessible name for the group. */
  'aria-label'?: string
  className?: string
}

/**
 * A bordered −/value/+ stepper for bounded integer quantities — roster counts,
 * treasury, a match score. The value is clamped to `min`/`max`.
 */
export function NumberStepper({
  value,
  onValueChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  'aria-label': ariaLabel,
  className,
}: NumberStepperProps) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n))
  const button =
    'inline-flex h-8 w-8 items-center justify-center text-ink outline-none transition-colors hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink'

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center border-2 border-ink bg-paper',
        className
      )}
    >
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => onValueChange(clamp(value - step))}
        disabled={value <= min}
        className={cn(button, 'border-r-2 border-ink')}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-10 px-2 text-center font-display text-lg tabular-nums text-ink">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase"
        onClick={() => onValueChange(clamp(value + step))}
        disabled={value >= max}
        className={cn(button, 'border-l-2 border-ink')}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
