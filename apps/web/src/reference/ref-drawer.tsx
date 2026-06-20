import * as Dialog from '@radix-ui/react-dialog'
import { ArrowLeft, X } from 'lucide-react'
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { resolveRef } from '@/lib/resolve-ref'
import { RefText } from '@/reference/ref-text'
import { Chip } from '@/ui'

interface RefDrawerValue {
  /** Open the drawer on a reference key (pushes onto the back-stack). */
  openRef: (key: string) => void
}

const RefDrawerContext = createContext<RefDrawerValue | null>(null)

/** Access the ref-drawer opener. Must be used within a `RefDrawerProvider`. */
export function useRefDrawer(): RefDrawerValue {
  const ctx = useContext(RefDrawerContext)
  if (!ctx)
    throw new Error('useRefDrawer must be used within a RefDrawerProvider')
  return ctx
}

/** Provides the click-to-open rule/term side-drawer for the whole codex. */
export function RefDrawerProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<string[]>([])

  const openRef = useCallback((key: string) => {
    setStack((current) => (current.length === 0 ? [key] : [...current, key]))
  }, [])
  const close = useCallback(() => setStack([]), [])
  const back = useCallback(
    () => setStack((current) => current.slice(0, -1)),
    []
  )

  const value = useMemo(() => ({ openRef }), [openRef])
  const currentKey = stack.at(-1)
  const resolved = currentKey ? resolveRef(currentKey) : undefined

  return (
    <RefDrawerContext.Provider value={value}>
      {children}
      <Dialog.Root
        open={stack.length > 0}
        onOpenChange={(open) => {
          if (!open) close()
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-ink/50 data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in" />
          <Dialog.Content className="fixed inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto border-t-4 border-ink bg-paper shadow-2xl focus:outline-none data-[state=closed]:animate-sheet-out data-[state=open]:animate-sheet-in">
            <div className="mx-auto w-full max-w-3xl">
              <div className="flex items-center justify-between border-b-2 border-ink/15 px-5 py-3">
                <Chip variant="blood">{resolved?.kind ?? 'Reference'}</Chip>
                <div className="flex items-center gap-1">
                  {stack.length > 1 && (
                    <button
                      type="button"
                      onClick={back}
                      aria-label="Back"
                      className="inline-flex h-8 w-8 items-center justify-center text-ink/55 transition-colors hover:bg-ink/5 hover:text-ink"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                  )}
                  <Dialog.Close
                    aria-label="Close"
                    className="inline-flex h-8 w-8 items-center justify-center text-ink/55 transition-colors hover:bg-ink/5 hover:text-blood"
                  >
                    <X className="h-5 w-5" />
                  </Dialog.Close>
                </div>
              </div>

              <div className="px-5 py-5">
                <Dialog.Title className="font-display text-3xl uppercase leading-none">
                  {resolved?.name ?? 'Unknown reference'}
                </Dialog.Title>
                {resolved?.meta && (
                  <p className="mt-1 font-headline text-sm font-semibold uppercase tracking-wide text-ink/55">
                    {resolved.meta}
                  </p>
                )}
                <p className="mt-4 leading-relaxed text-ink/90">
                  {resolved ? (
                    <RefText>{resolved.body}</RefText>
                  ) : (
                    `No entry found for "${currentKey ?? ''}".`
                  )}
                </p>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </RefDrawerContext.Provider>
  )
}
