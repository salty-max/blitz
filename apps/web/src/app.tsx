import { RouterProvider } from '@tanstack/react-router'

import { RefDrawerProvider } from '@/reference/ref-drawer'
import { router } from '@/router'
import { ToastProvider } from '@/ui'

/** The Blood Bowl codex — routed pages wrapped in toasts and the ref side-drawer. */
export default function App() {
  return (
    <ToastProvider>
      <RefDrawerProvider>
        <RouterProvider router={router} />
      </RefDrawerProvider>
    </ToastProvider>
  )
}
