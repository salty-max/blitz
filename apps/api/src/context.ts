import type { auth } from './auth'

/** Hono context variables set by the session middleware. */
export type Variables = {
  user: typeof auth.$Infer.Session.user | null
  session: typeof auth.$Infer.Session.session | null
}

/** The Hono environment for the app and its route groups. */
export type AppEnv = { Variables: Variables }
