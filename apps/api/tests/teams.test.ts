import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from 'bun:test'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

import { db, schema, sql } from '../src/db'
import app from '../src/index'

// Integration tests need a live Postgres; they run when DATABASE_URL is set
// (CI's service, or local docker compose) and are skipped otherwise.
const dbSuite = process.env.DATABASE_URL ? describe : describe.skip

const orcRoster = {
  players: [],
  rerolls: 3,
  apothecary: true,
  assistantCoaches: 0,
  cheerleaders: 0,
  dedicatedFans: 1,
}

async function signUp(email: string): Promise<string> {
  const res = await app.request('/api/auth/sign-up/email', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Coach', email, password: 'password123' }),
  })
  return (res.headers.get('set-cookie') ?? '').split(';')[0]
}

dbSuite('teams API', () => {
  beforeAll(async () => {
    await migrate(db, { migrationsFolder: `${import.meta.dir}/../drizzle` })
  })

  beforeEach(async () => {
    await db.delete(schema.team)
    await db.delete(schema.session)
    await db.delete(schema.account)
    await db.delete(schema.verification)
    await db.delete(schema.user)
  })

  afterAll(async () => {
    await sql.end()
  })

  test('rejects unauthenticated requests', async () => {
    const res = await app.request('/teams')
    expect(res.status).toBe(401)
  })

  test('creates and lists a coach’s own teams', async () => {
    const cookie = await signUp('coach@blitz.test')
    const created = await app.request('/teams', {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie },
      body: JSON.stringify({
        name: 'My Orcs',
        teamKey: 'orc',
        roster: orcRoster,
      }),
    })
    expect(created.status).toBe(201)

    const list = await app.request('/teams', { headers: { cookie } })
    expect(list.status).toBe(200)
    const teams = (await list.json()) as { name: string }[]
    expect(teams).toHaveLength(1)
    expect(teams[0].name).toBe('My Orcs')
  })

  test('isolates teams between coaches', async () => {
    const owner = await signUp('owner@blitz.test')
    await app.request('/teams', {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie: owner },
      body: JSON.stringify({
        name: 'Owned',
        teamKey: 'orc',
        roster: orcRoster,
      }),
    })

    const other = await signUp('other@blitz.test')
    const list = await app.request('/teams', { headers: { cookie: other } })
    expect(await list.json()).toEqual([])
  })
})
