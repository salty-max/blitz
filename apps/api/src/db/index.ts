import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env } from '../env'
import * as schema from './schema'

/** The raw postgres-js client — exported so tests and shutdown can close it. */
export const sql = postgres(env.databaseUrl)

/** The Drizzle database client, bound to the schema. */
export const db = drizzle(sql, { schema })

export { schema }
