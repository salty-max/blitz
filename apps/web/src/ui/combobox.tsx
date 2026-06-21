import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useMemo, useState } from 'react'

import { cn } from './cn'

/** A choice in a {@link Combobox}. */
export type ComboboxOption = { value: string; label: string }

type ComboboxBase = {
  /** The choices to search and pick from. */
  options: ComboboxOption[]
  /** Trigger text when nothing is selected. */
  placeholder?: string
  /** Placeholder for the search box. */
  searchPlaceholder?: string
  /** Shown when the query matches nothing. */
  emptyMessage?: string
  className?: string
  'aria-label'?: string
}

/** Props for a single-select {@link Combobox}. */
export type ComboboxSingleProps = ComboboxBase & {
  multiple?: false
  /** The selected value, or `null` for none. */
  value: string | null
  /** Called with the newly selected value. */
  onValueChange: (value: string) => void
}

/** Props for a multi-select {@link Combobox}. */
export type ComboboxMultipleProps = ComboboxBase & {
  multiple: true
  /** The selected values. */
  value: string[]
  /** Called with the next list of selected values when one is toggled. */
  onValueChange: (value: string[]) => void
}

/** Props for {@link Combobox}. */
export type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps

/**
 * A searchable select — a trigger that opens a filtered list in a popover.
 * Single-select by default; pass `multiple` to toggle several values (the list
 * stays open, and each pick is ticked). Reach for it over `Select` when the
 * options are many: a star player, a team, a set of skills.
 */
export function Combobox(props: ComboboxProps) {
  const {
    options,
    placeholder = 'Select…',
    searchPlaceholder = 'Search…',
    emptyMessage = 'No matches.',
    className,
    'aria-label': ariaLabel,
  } = props
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const selectedValues = props.multiple
    ? props.value
    : props.value === null
      ? []
      : [props.value]

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q
      ? options.filter((option) => option.label.toLowerCase().includes(q))
      : options
  }, [options, query])

  const selectedLabels = options
    .filter((option) => selectedValues.includes(option.value))
    .map((option) => option.label)
  const triggerText =
    selectedValues.length === 0
      ? placeholder
      : props.multiple && selectedValues.length > 1
        ? `${selectedValues.length} selected`
        : selectedLabels.join(', ')

  const select = (value: string) => {
    if (props.multiple) {
      props.onValueChange(
        props.value.includes(value)
          ? props.value.filter((v) => v !== value)
          : [...props.value, value]
      )
    } else {
      props.onValueChange(value)
      setOpen(false)
      setQuery('')
    }
  }

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
          selectedValues.length > 0 ? 'text-ink' : 'text-ink/45',
          className
        )}
      >
        <span className="truncate">{triggerText}</span>
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
              filtered.map((option) => {
                const isSelected = selectedValues.includes(option.value)
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => select(option.value)}
                      className={cn(
                        'flex w-full items-center justify-between gap-2 px-2 py-1.5 text-left font-headline text-sm font-semibold uppercase tracking-wide text-ink/80 outline-none transition-colors hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper',
                        isSelected && 'text-blood'
                      )}
                    >
                      {option.label}
                      {isSelected && <Check className="h-4 w-4" />}
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
