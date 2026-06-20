import * as DialogPrimitive from '@radix-ui/react-dialog'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/** The sheet root — owns the open state. */
function SheetRoot(props: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />
}

/** Opens the sheet. */
const SheetTrigger = DialogPrimitive.Trigger

/** Closes the sheet. */
const SheetClose = DialogPrimitive.Close

/** The sheet's accessible title, in the display face. */
function SheetTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn('font-display text-3xl uppercase leading-none', className)}
      {...props}
    />
  )
}

/** The sheet's accessible description. */
const SheetDescription = DialogPrimitive.Description

/** The bottom panel — a paper sheet with the heavy ink top rule, sliding up. */
function SheetContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-ink/50 data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in" />
      <DialogPrimitive.Content
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto border-t-4 border-ink bg-paper shadow-2xl focus:outline-none data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in',
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

/**
 * A bottom-sheet overlay — Radix Dialog positioned as a panel that slides up
 * from the bottom edge. Compound parts: `Sheet.Trigger`, `Sheet.Content`,
 * `Sheet.Title`, `Sheet.Description` and `Sheet.Close`. Backs the reference
 * drawer; reach for it for filters or a record's quick view.
 */
export const Sheet = Object.assign(SheetRoot, {
  Trigger: SheetTrigger,
  Content: SheetContent,
  Title: SheetTitle,
  Description: SheetDescription,
  Close: SheetClose,
})
