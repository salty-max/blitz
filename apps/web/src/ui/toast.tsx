import * as ToastPrimitive from '@radix-ui/react-toast'
import { X } from 'lucide-react'
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
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
}

type ToastEntry = ToastOptions & { id: number }

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
 * stack at the bottom-right and dismiss themselves. Use them for action
 * feedback — a roster saved, a result recorded.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([])
  const nextId = useRef(0)

  const toast = useCallback((options: ToastOptions) => {
    setToasts((current) => [...current, { ...options, id: nextId.current++ }])
  }, [])

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {toasts.map(({ id, title, description, tone = 'default' }) => (
          <ToastPrimitive.Root
            key={id}
            onOpenChange={(open) => {
              if (!open)
                setToasts((current) => current.filter((t) => t.id !== id))
            }}
            className={cn(
              'flex items-start justify-between gap-3 border-2 border-l-4 border-ink bg-paper px-4 py-3 shadow-[4px_4px_0_0_rgba(22,19,16,0.2)] data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in',
              toneAccent[tone]
            )}
          >
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
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-50 m-0 flex w-96 max-w-[calc(100vw-2rem)] list-none flex-col gap-2 p-4 outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}
