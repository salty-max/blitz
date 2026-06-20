import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useMemo, useState } from 'react'

import { cn } from './cn'

/** A choice in a {@link Combobox}. */
export type ComboboxOption = { value: string; label: string }

/** Props for {@link Combobox}. */
export type ComboboxProps = {
  /** The choices to search and pick from. */
  options: ComboboxOption[]
  /** The selected value, or `null` for none. */
  value: string | null
  /** Called with the newly selected value. */
  onValueChange: (value: string) => void
  /** Trigger text when nothing is selected. */
  placeholder?: string
  /** Placeholder for the search box. */
  searchPlaceholder?: string
  /** Shown when the query matches nothing. */
  emptyMessage?: string
  className?: string
  'aria-label'?: string
}

/**
 * A searchable single-select — a trigger that opens a filtered list in a
 * popover. Reach for it over `Select` when the options are many: a star player,
 * a team, a skill.
 */
export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = 'Select…',
  searchPlaceholder = 'Search…',
  emptyMessage = 'No matches.',
  className,
  'aria-label': ariaLabel,
}: ComboboxProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const selected = options.find((option) => option.value === value)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q
      ? options.filter((option) => option.label.toLowerCase().includes(q))
      : options
  }, [options, query])

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) setQuery('')
      }}
    >
      <PopoverPrimitive.Trigger
        aria-label={ariaLabel}
        className={cn(
          'inline-flex w-64 items-center justify-between gap-2 border-2 border-ink bg-paper py-1.5 pl-3 pr-2.5 font-headline text-sm font-semibold uppercase tracking-wide outline-none transition-colors focus-visible:border-blood data-[state=open]:border-blood',
          selected ? 'text-ink' : 'text-ink/45',
          className
        )}
      >
        <span className="truncate">{selected?.label ?? placeholder}</span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 text-ink/55" />
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className="z-50 w-[var(--radix-popover-trigger-width)] border-2 border-ink bg-paper shadow-[4px_4px_0_0_rgba(22,19,16,0.14)] outline-none data-[state=closed]:animate-select-out data-[state=open]:animate-select-in"
        >
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="w-full border-b-2 border-ink/15 bg-paper px-3 py-2 font-body text-sm text-ink outline-none placeholder:text-ink/40"
          />
          <ul className="max-h-60 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <li className="px-2 py-2 text-sm text-ink/55">{emptyMessage}</li>
            ) : (
              filtered.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onValueChange(option.value)
                      setOpen(false)
                      setQuery('')
                    }}
                    className={cn(
                      'flex w-full items-center justify-between gap-2 px-2 py-1.5 text-left font-headline text-sm font-semibold uppercase tracking-wide text-ink/80 outline-none transition-colors hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper',
                      option.value === value && 'text-blood'
                    )}
                  >
                    {option.label}
                    {option.value === value && <Check className="h-4 w-4" />}
                  </button>
                </li>
              ))
            )}
          </ul>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
