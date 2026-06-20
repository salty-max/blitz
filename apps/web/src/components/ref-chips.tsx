import { useRefDrawer } from '@/components/ref-drawer'
import { cn } from '@/components/ui'
import { resolveRef } from '@/lib/resolve-ref'

const TONE = {
  default:
    'border-ink/25 text-ink/80 hover:border-blood hover:bg-blood hover:text-paper',
  accent:
    'border-blood/60 bg-blood/10 text-blood hover:border-blood hover:bg-blood hover:text-paper',
} as const

/** Class names for a badge chip in the given tone — usable on a button or a link. */
export function chipClass(tone: keyof typeof TONE = 'default'): string {
  return cn(
    'inline-flex items-center border px-2 py-0.5 font-headline text-xs font-semibold uppercase tracking-wide transition-colors',
    TONE[tone]
  )
}

/**
 * Renders a list of reference keys as clickable badge chips that open the
 * drawer — for enumerated lists like a star's skills or special rules.
 */
export function RefChips({
  keys,
  tone = 'default',
  className,
}: {
  keys: readonly string[]
  tone?: keyof typeof TONE
  className?: string
}) {
  const { openRef } = useRefDrawer()
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {keys.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => openRef(key)}
          className={chipClass(tone)}
        >
          {resolveRef(key)?.name ?? key}
        </button>
      ))}
    </div>
  )
}
