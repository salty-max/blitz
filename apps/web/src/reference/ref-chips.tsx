import { useDataLocale } from '@/i18n/use-data-locale'
import { resolveRef } from '@/lib/resolve-ref'
import { useRefDrawer } from '@/reference/ref-drawer'
import { Chip, cn } from '@/ui'

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
  const locale = useDataLocale()
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {keys.map((key) => (
        <Chip
          key={key}
          asChild
          interactive
          variant={tone === 'accent' ? 'accent' : 'outline'}
        >
          <button
            type="button"
            data-testid={`ref-chip-${key}`}
            onClick={() => openRef(key)}
          >
            {resolveRef(key, locale)?.name ?? key}
          </button>
        </Chip>
      ))}
    </div>
  )
}
