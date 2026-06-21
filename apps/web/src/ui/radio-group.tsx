import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/** The radio group root — owns the selected value. */
function RadioGroupRoot({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

/** A single radio option — pair it with a label. */
function RadioGroupItem({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'inline-flex h-5 w-5 shrink-0 items-center justify-center border-2 border-ink bg-paper align-middle outline-none transition-colors focus-visible:border-blood data-[state=checked]:border-blood disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="h-2.5 w-2.5 bg-blood" />
    </RadioGroupPrimitive.Item>
  )
}

/**
 * A single-select radio group — Radix-powered, with arrow-key navigation.
 * Use `RadioGroup.Item` for each choice, each beside its own label.
 */
export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
})
