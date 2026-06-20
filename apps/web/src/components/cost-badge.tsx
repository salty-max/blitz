import { Chip } from '@/components/ui'
import { gp } from '@/lib/format'

/** A gold price tag showing a cost in gold pieces. */
export function CostBadge({
  cost,
  size = 'md',
  className,
}: {
  cost: number
  size?: 'sm' | 'md'
  className?: string
}) {
  return (
    <Chip variant="gold" size={size} className={className}>
      {gp(cost)}
    </Chip>
  )
}
