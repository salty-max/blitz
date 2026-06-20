import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from './cn'

/** Props for {@link Pagination}. */
export type PaginationProps = {
  /** The current page, 1-based. */
  page: number
  /** Total number of pages. */
  pageCount: number
  /** Called with the new page number. */
  onPageChange: (page: number) => void
  className?: string
  'aria-label'?: string
}

/** The pages to show: all of them when few, else ends + a window around the current. */
function pageItems(page: number, pageCount: number): (number | 'ellipsis')[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1)
  }
  const shown = [1, pageCount, page, page - 1, page + 1].filter(
    (p) => p >= 1 && p <= pageCount
  )
  const unique = [...new Set(shown)].sort((a, b) => a - b)
  const items: (number | 'ellipsis')[] = []
  let previous = 0
  for (const p of unique) {
    if (p - previous > 1) items.push('ellipsis')
    items.push(p)
    previous = p
  }
  return items
}

/** A page navigator — previous/next arrows around a windowed list of page numbers. */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  className,
  'aria-label': ariaLabel = 'Pagination',
}: PaginationProps) {
  const button =
    'inline-flex h-9 min-w-9 items-center justify-center border-2 border-ink bg-paper px-2 font-headline text-sm font-semibold tabular-nums text-ink outline-none transition-colors hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-paper disabled:hover:text-ink'

  return (
    <nav
      aria-label={ariaLabel}
      className={cn('inline-flex items-center gap-1', className)}
    >
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={button}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pageItems(page, pageCount).map((item, index) =>
        item === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="px-1 text-ink/40">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`Page ${item}`}
            aria-current={item === page ? 'page' : undefined}
            onClick={() => onPageChange(item)}
            className={cn(
              button,
              item === page && 'border-blood bg-blood text-paper'
            )}
          >
            {item}
          </button>
        )
      )}
      <button
        type="button"
        aria-label="Next page"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
        className={button}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}
