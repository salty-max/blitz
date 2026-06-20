import { cn } from '@/components/ui'
import { gp } from '@/lib/format'

const SIZE = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-base leading-none tracking-wide',
} as const

/** A gold price tag showing a cost in gold pieces. */
export function CostBadge({
  cost,
  size = 'md',
  className,
}: {
  cost: number
  size?: keyof typeof SIZE
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center bg-gold font-headline font-bold uppercase tabular-nums text-ink',
        SIZE[size],
        className
      )}
    >
      {gp(cost)}
    </span>
  )
}
