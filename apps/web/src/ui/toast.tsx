import * as ToastPrimitive from '@radix-ui/react-toast'
import { X } from 'lucide-react'
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { cn } from './cn'

/** The accent of a toast — neutral by default, pitch for success, blood for danger. */
type ToastTone = 'default' | 'success' | 'danger'

const toneAccent: Record<ToastTone, string> = {
  default: 'border-l-ink',
  success: 'border-l-pitch',
  danger: 'border-l-blood',
}

/** A queued toast. */
type ToastOptions = {
  title: ReactNode
  description?: ReactNode
  tone?: ToastTone
  /** An optional action button, e.g. an Undo. */
  action?: { label: string; onClick: () => void }
}

type ToastEntry = ToastOptions & { id: number; open: boolean }

type ToastContextValue = {
  /** Raise a toast. */
  toast: (options: ToastOptions) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

/** Access the toast opener. Must be used within a {@link ToastProvider}. */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}

/**
 * Provides app-wide toasts via {@link useToast}. Wrap the app once; toasts
 * slide up at the bottom-right, dismiss themselves, and slide out to the right.
 * Use them for action feedback — a roster saved, a result recorded — and pass
 * an `action` for a follow-up like Undo.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([])
  const nextId = useRef(0)
  const exitTimers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => exitTimers.current.forEach(clearTimeout), [])

  const toast = useCallback((options: ToastOptions) => {
    setToasts((current) => [
      ...current,
      { ...options, id: nextId.current++, open: true },
    ])
  }, [])

  // Close (so the exit animation plays), then drop the entry once it has. The
  // 250ms must stay above the toast-out animation (160ms, see theme.css).
  const dismiss = useCallback((id: number) => {
    setToasts((current) =>
      current.map((t) => (t.id === id ? { ...t, open: false } : t))
    )
    exitTimers.current.push(
      setTimeout(() => {
        setToasts((current) => current.filter((t) => t.id !== id))
      }, 250)
    )
  }, [])

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {toasts.map(
          ({ id, title, description, tone = 'default', action, open }) => (
            <ToastPrimitive.Root
              key={id}
              open={open}
              onOpenChange={(next) => {
                if (!next) dismiss(id)
              }}
              className={cn(
                'border-2 border-l-4 border-ink bg-paper px-4 py-3 shadow-[4px_4px_0_0_rgba(22,19,16,0.2)] data-[state=closed]:animate-toast-out data-[state=open]:animate-toast-in data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=end]:animate-toast-out data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
                toneAccent[tone]
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <ToastPrimitive.Title className="font-headline text-sm font-semibold uppercase tracking-wide text-ink">
                    {title}
                  </ToastPrimitive.Title>
                  {description && (
                    <ToastPrimitive.Description className="mt-0.5 text-sm text-ink/70">
                      {description}
                    </ToastPrimitive.Description>
                  )}
                </div>
                <ToastPrimitive.Close
                  aria-label="Dismiss"
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center text-ink/55 transition-colors hover:text-blood"
                >
                  <X className="h-4 w-4" />
                </ToastPrimitive.Close>
              </div>
              {action && (
                <ToastPrimitive.Action
                  altText={action.label}
                  onClick={action.onClick}
                  className="mt-2 inline-flex border-2 border-ink px-2.5 py-1 font-headline text-xs font-semibold uppercase tracking-wide text-ink outline-none transition-colors hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper"
                >
                  {action.label}
                </ToastPrimitive.Action>
              )}
            </ToastPrimitive.Root>
          )
        )}
        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-50 m-0 flex w-96 max-w-[calc(100vw-2rem)] list-none flex-col gap-2 p-4 outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}
