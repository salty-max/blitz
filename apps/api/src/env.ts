/** Server configuration, read from the environment (Bun loads `.env` automatically). */
export const env = {
  /**
   * Postgres connection string. Defaults to the local docker-compose database;
   * production must set `DATABASE_URL` explicitly.
   */
  databaseUrl:
    process.env.DATABASE_URL ?? 'postgres://blitz:blitz@localhost:5432/blitz',
  /** Signing secret for sessions; required in production, defaulted for local dev. */
  authSecret: process.env.BETTER_AUTH_SECRET ?? 'dev-secret-change-me',
  /** The auth server's own base URL. */
  authUrl: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
}
