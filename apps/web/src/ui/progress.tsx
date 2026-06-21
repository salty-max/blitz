import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from './cn'

/** Class variants for the filled portion of a {@link Progress} bar. */
const progressFill = cva('h-full transition-[width] duration-300 ease-out', {
  variants: {
    tone: {
      blood: 'bg-blood',
      gold: 'bg-gold',
      pitch: 'bg-pitch',
      ink: 'bg-ink',
    },
  },
  defaultVariants: { tone: 'blood' },
})

/** Props for {@link Progress}. */
export type ProgressProps = VariantProps<typeof progressFill> & {
  /** The current amount. */
  value: number
  /** The full amount; defaults to 100. */
  max?: number
  className?: string
  'aria-label'?: string
}

/**
 * A sharp meter bar — budget against the cap, SPP toward the next advance, a
 * team-value share. The fill is clamped to the `[0, max]` range.
 */
export function Progress({
  value,
  max = 100,
  tone,
  className,
  'aria-label': ariaLabel,
}: ProgressProps) {
  const clamped = Math.min(max, Math.max(0, value))
  const percent = (clamped / max) * 100
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
      className={cn(
        'h-3 w-full overflow-hidden border-2 border-ink bg-paper',
        className
      )}
    >
      <div
        className={progressFill({ tone })}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
