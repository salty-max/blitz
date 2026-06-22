import { Hono } from 'hono'

import { auth } from './auth'
import type { AppEnv } from './context'
import { teams } from './routes/teams'

/** The blitz API: better-auth for sessions, and the user-owned team store. */
const app = new Hono<AppEnv>()

// Liveness check — registered before the session middleware so it never touches
// the database.
app.get('/health', (c) => c.json({ status: 'ok' }))

// Resolve the session once per request so routes can read the current user.
app.use('*', async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  c.set('user', session?.user ?? null)
  c.set('session', session?.session ?? null)
  await next()
})

// better-auth owns every /api/auth/* route (sign-up, sign-in, sign-out, …).
app.on(['GET', 'POST'], '/api/auth/*', (c) => auth.handler(c.req.raw))

app.route('/teams', teams)

/** The Hono app type, for a future end-to-end-typed client. */
export type AppType = typeof app

export default app
