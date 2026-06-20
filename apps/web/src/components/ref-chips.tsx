import { useRefDrawer } from '@/components/ref-drawer'
import { Chip, cn } from '@/components/ui'
import { resolveRef } from '@/lib/resolve-ref'

/**
 * Renders a list of reference keys as clickable chips that open the drawer —
 * for enumerated lists like a star's skills or special rules.
 */
export function RefChips({
  keys,
  tone = 'default',
  className,
}: {
  keys: readonly string[]
  tone?: 'default' | 'accent'
  className?: string
}) {
  const { openRef } = useRefDrawer()
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {keys.map((key) => (
        <Chip
          key={key}
          asChild
          interactive
          variant={tone === 'accent' ? 'accent' : 'outline'}
        >
          <button type="button" onClick={() => openRef(key)}>
            {resolveRef(key)?.name ?? key}
          </button>
        </Chip>
      ))}
    </div>
  )
}
