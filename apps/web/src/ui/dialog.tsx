import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { type ComponentProps } from 'react'

import { cn } from './cn'

/** The dialog root — owns the open state. */
function DialogRoot(props: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root {...props} />
}

/** Opens the dialog. */
const DialogTrigger = DialogPrimitive.Trigger

/** Closes the dialog — wrap an action button with `asChild` to confirm-and-close. */
const DialogClose = DialogPrimitive.Close

/** The centered modal card, over a dimming overlay. Carries its own close button. */
function DialogContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-ink/50 data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in" />
      <DialogPrimitive.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 border-2 border-ink bg-paper p-6 shadow-[8px_8px_0_0_rgba(22,19,16,0.2)] focus:outline-none data-[state=closed]:animate-select-out data-[state=open]:animate-select-in',
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center text-ink/55 transition-colors hover:bg-ink/5 hover:text-blood"
        >
          <X className="h-5 w-5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

/** The dialog's title, in the display face. */
function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn(
        'pr-8 font-display text-2xl uppercase leading-none',
        className
      )}
      {...props}
    />
  )
}

/** Supporting copy beneath the title. */
function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={cn('mt-2 text-sm text-ink/75', className)}
      {...props}
    />
  )
}

/** The action row, right-aligned at the foot of the dialog. */
function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('mt-6 flex justify-end gap-2', className)} {...props} />
  )
}

/**
 * A centered modal — Radix Dialog styled as a bordered paper card with a hard
 * offset shadow. Compound parts: `Dialog.Trigger`, `Dialog.Content`,
 * `Dialog.Title`, `Dialog.Description`, `Dialog.Footer` and `Dialog.Close`. Use
 * it for confirmations (deleting a team) and short modal forms.
 */
export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose,
})
