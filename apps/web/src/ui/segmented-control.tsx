import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, type ReactNode } from 'react'

import { cn } from './cn'

/** One choice in a {@link SegmentedControl}. */
export type SegmentedControlOption<T extends string> = {
  value: T
  label: ReactNode
}

/** Class variants for a single segment — chiefly its padding and text size. */
export const segmentVariants = cva(
  'relative z-10 whitespace-nowrap text-center font-headline font-semibold uppercase tracking-wide text-ink/65 outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold data-[state=on]:text-paper',
  {
    variants: {
      size: {
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3.5 py-1.5 text-sm',
      },
    },
    defaultVariants: { size: 'md' },
  }
)

/** Props for {@link SegmentedControl} — its choices plus the props a FormField forwards. */
export type SegmentedControlProps<T extends string> = VariantProps<
  typeof segmentVariants
> &
  Pick<
    ComponentProps<'div'>,
    | 'className'
    | 'id'
    | 'aria-label'
    | 'aria-labelledby'
    | 'aria-describedby'
    | 'aria-invalid'
  > & {
    /** The choices, left to right. */
    options: SegmentedControlOption<T>[]
    /** The currently selected value. */
    value: T
    /** Called with the newly selected value on click or arrow-key navigation. */
    onValueChange: (value: T) => void
  }

/**
 * A single-select control rendered as a row of equal-width segments with a
 * sliding ink indicator behind the active one. Radix's toggle group gives it
 * radio-group semantics and arrow-key navigation; the indicator is exactly one
 * segment wide and slides by whole segments, so it always covers the target.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onValueChange,
  size,
  className,
  ...rest
}: SegmentedControlProps<T>) {
  const index = Math.max(
    0,
    options.findIndex((option) => option.value === value)
  )

  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={value}
      onValueChange={(next) => {
        if (next) onValueChange(next as T)
      }}
      className={cn(
        'relative inline-grid grid-flow-col auto-cols-[1fr] border-2 border-ink bg-paper p-0.5',
        className
      )}
      {...rest}
    >
      <span
        aria-hidden
        className="absolute inset-y-0.5 left-0.5 bg-ink transition-transform duration-200 ease-out motion-reduce:transition-none"
        style={{
          width: `calc((100% - 4px) / ${options.length})`,
          transform: `translateX(${index * 100}%)`,
        }}
      />
      {options.map((option) => (
        <ToggleGroupPrimitive.Item
          key={option.value}
          value={option.value}
          className={segmentVariants({ size })}
        >
          {option.label}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  )
}
