import { beforeEach, describe, expect, mock, test } from 'bun:test'

// These cover the teams routes' contract — auth gating, body validation, status
// codes and response shapes — so the data layer and the session are mocked. No
// Postgres: the routing and I/O are what's under test, not the SQL.

type Session = { user: { id: string }; session: Record<string, unknown> } | null
let session: Session = null

const rows = {
  select: [] as unknown[],
  insert: [] as unknown[],
  update: [] as unknown[],
  delete: [] as unknown[],
}
const recorded: {
  insert?: Record<string, unknown>
  update?: Record<string, unknown>
} = {}

// A drizzle-shaped stub matching exactly the chains the routes use: each query
// resolves to the rows a test queued, and the writes capture their payload.
mock.module('../src/db', () => ({
  db: {
    select: () => ({
      from: () => ({ where: () => Promise.resolve(rows.select) }),
    }),
    insert: () => ({
      values: (values: Record<string, unknown>) => {
        recorded.insert = values
        return { returning: () => Promise.resolve(rows.insert) }
      },
    }),
    update: () => ({
      set: (values: Record<string, unknown>) => {
        recorded.update = values
        return {
          where: () => ({ returning: () => Promise.resolve(rows.update) }),
        }
      },
    }),
    delete: () => ({
      where: () => ({ returning: () => Promise.resolve(rows.delete) }),
    }),
  },
}))

mock.module('../src/auth', () => ({
  auth: { api: { getSession: () => Promise.resolve(session) } },
}))

const { default: app } = await import('../src/index')

const json = (method: string, data: unknown) => ({
  method,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(data),
})

describe('teams API', () => {
  beforeEach(() => {
    session = null
    rows.select = []
    rows.insert = []
    rows.update = []
    rows.delete = []
    recorded.insert = undefined
    recorded.update = undefined
  })

  const signIn = () => {
    session = { user: { id: 'coach-1' }, session: {} }
  }

  test('rejects unauthenticated requests on every route', async () => {
    const requests = [
      app.request('/api/teams'),
      app.request('/api/teams', json('POST', {})),
      app.request('/api/teams/x'),
      app.request('/api/teams/x', json('PUT', {})),
      app.request('/api/teams/x', { method: 'DELETE' }),
    ]
    for (const request of requests) {
      expect((await request).status).toBe(401)
    }
  })

  test('rejects a create with an invalid body', async () => {
    signIn()
    const res = await app.request(
      '/api/teams',
      json('POST', { name: '', teamKey: 'orc', roster: {} })
    )
    expect(res.status).toBe(400)
  })

  const roster = {
    players: [{ position: 'blitzer', name: 'Grukk Bonesplitter', number: 7 }],
    rerolls: 2,
    apothecary: false,
    assistantCoaches: 0,
    cheerleaders: 0,
    dedicatedFans: 1,
  }

  test('creates a team, scopes it to the coach, and echoes it', async () => {
    signIn()
    const created = {
      id: 't1',
      userId: 'coach-1',
      name: 'My Orcs',
      teamKey: 'orc',
      roster,
    }
    rows.insert = [created]
    const res = await app.request(
      '/api/teams',
      json('POST', { name: 'My Orcs', teamKey: 'orc', roster })
    )
    expect(res.status).toBe(201)
    expect(await res.json()).toEqual(created)
    expect(recorded.insert?.userId).toBe('coach-1')
    expect(recorded.insert?.name).toBe('My Orcs')
    // Player names and numbers survive validation into the stored roster.
    expect(recorded.insert?.roster).toEqual(roster)
  })

  test('rejects a create whose roster is malformed', async () => {
    signIn()
    const res = await app.request(
      '/api/teams',
      json('POST', {
        name: 'My Orcs',
        teamKey: 'orc',
        roster: { ...roster, players: [{ position: 42 }] },
      })
    )
    expect(res.status).toBe(400)
  })

  test('lists the teams the store returns', async () => {
    signIn()
    rows.select = [{ id: 't1' }, { id: 't2' }]
    const res = await app.request('/api/teams')
    expect(res.status).toBe(200)
    expect(await res.json()).toHaveLength(2)
  })

  test('returns 404 when the store has no matching team', async () => {
    signIn()
    rows.select = []
    expect((await app.request('/api/teams/missing')).status).toBe(404)
  })

  test('updates a team, and 404s when it is absent', async () => {
    signIn()
    expect(
      (await app.request('/api/teams/x', json('PUT', { name: 'Renamed' })))
        .status
    ).toBe(404)

    rows.update = [{ id: 'x', name: 'Renamed' }]
    const res = await app.request(
      '/api/teams/x',
      json('PUT', { name: 'Renamed' })
    )
    expect(res.status).toBe(200)
    expect(recorded.update?.name).toBe('Renamed')
  })

  test('deletes a team, and 404s when it is absent', async () => {
    signIn()
    expect(
      (await app.request('/api/teams/x', { method: 'DELETE' })).status
    ).toBe(404)

    rows.delete = [{ id: 'x' }]
    const res = await app.request('/api/teams/x', { method: 'DELETE' })
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
  })
})
