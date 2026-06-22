import { createAuthClient } from 'better-auth/react'

/**
 * The browser auth client. In dev it talks to the API through the Vite proxy
 * (`/api/auth/*` → the Hono server, same-origin so the session cookie just
 * works); set `VITE_API_URL` to point at the API directly in other setups.
 */
export const authClient = createAuthClient({
  baseURL: (import.meta.env.VITE_API_URL as string | undefined) || undefined,
})
