import * as Dialog from '@radix-ui/react-dialog'
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { RefText } from '@/components/ref-text'
import { resolveRef } from '@/lib/resolve-ref'

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
          <Dialog.Overlay className="fixed inset-0 bg-ink/50" />
          <Dialog.Content className="fixed inset-y-0 right-0 flex w-full max-w-md flex-col overflow-y-auto border-l-4 border-ink bg-paper shadow-2xl focus:outline-none">
            <div className="flex items-center justify-between border-b-2 border-ink/15 px-5 py-3">
              <span className="bg-blood px-2 py-1 font-headline text-xs font-bold uppercase tracking-widest text-paper">
                {resolved?.kind ?? 'Reference'}
              </span>
              <div className="flex items-center gap-3 font-headline text-sm font-semibold uppercase tracking-wide">
                {stack.length > 1 && (
                  <button
                    type="button"
                    onClick={back}
                    className="text-ink/60 hover:text-ink"
                  >
                    ← Back
                  </button>
                )}
                <Dialog.Close className="text-ink/60 hover:text-blood">
                  Close ✕
                </Dialog.Close>
              </div>
            </div>

            <div className="px-5 py-4">
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
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </RefDrawerContext.Provider>
  )
}
