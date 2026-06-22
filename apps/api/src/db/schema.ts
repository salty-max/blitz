import { boolean, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

// ───────────────────────── better-auth core tables ─────────────────────────
// Column names match better-auth's field names (camelCase) so the Drizzle
// adapter maps them without extra configuration. See the auth config in auth.ts.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull(),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expiresAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  idToken: text('idToken'),
  /** Hashed password, for email-and-password accounts. */
  password: text('password'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
})

// ───────────────────────────── domain tables ───────────────────────────────

/** A user-owned saved team: a drafted roster plus its coach-given name. */
export const team = pgTable('team', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  /** The coach's name for this team. */
  name: text('name').notNull(),
  /** The roster's team key from the codex (e.g. `orc`). */
  teamKey: text('teamKey').notNull(),
  /** The drafted roster — players, re-rolls and staff (the resolver's `Roster` shape). */
  roster: jsonb('roster').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export type Team = typeof team.$inferSelect
export type NewTeam = typeof team.$inferInsert
