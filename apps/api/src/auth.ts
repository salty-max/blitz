import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

import { db } from './db'
import { account, session, user, verification } from './db/schema'
import { env } from './env'

/**
 * Authentication, backed by Postgres through the Drizzle adapter. Email and
 * password is enabled; the handler is mounted on the Hono app in index.ts.
 */
export const auth = betterAuth({
  baseURL: env.authUrl,
  secret: env.authSecret,
  trustedOrigins: env.trustedOrigins,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: { user, session, account, verification },
  }),
  emailAndPassword: { enabled: true },
})
