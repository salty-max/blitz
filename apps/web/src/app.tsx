import { RouterProvider } from '@tanstack/react-router'

import { RefDrawerProvider } from '@/reference/ref-drawer'
import { router } from '@/router'

/** The Blood Bowl codex — routed pages wrapped in the ref side-drawer. */
export default function App() {
  return (
    <RefDrawerProvider>
      <RouterProvider router={router} />
    </RefDrawerProvider>
  )
}
