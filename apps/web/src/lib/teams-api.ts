import type { Roster } from '@blitz/resolver'

/**
 * A team persisted for the signed-in coach. The roster is stored verbatim as the
 * resolver's {@link Roster} shape; the API treats it as opaque JSON.
 */
export interface SavedTeam {
  id: string
  name: string
  teamKey: string
  roster: Roster
  createdAt: string
  updatedAt: string
}

/** The fields the coach supplies when creating or updating a team. */
export interface TeamInput {
  name: string
  teamKey: string
  roster: Roster
}

// Same-origin in dev via the Vite proxy (/api → the Hono server), so the session
// cookie rides along automatically.
const BASE = '/api/teams'

const JSON_HEADERS = { 'content-type': 'application/json' }

async function unwrap<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`teams API ${res.status}`)
  return res.json() as Promise<T>
}

/** CRUD over the signed-in coach's own teams. */
export const teamsApi = {
  list: (): Promise<SavedTeam[]> => fetch(BASE).then((r) => unwrap(r)),
  get: (id: string): Promise<SavedTeam> =>
    fetch(`${BASE}/${id}`).then((r) => unwrap(r)),
  create: (input: TeamInput): Promise<SavedTeam> =>
    fetch(BASE, {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify(input),
    }).then((r) => unwrap(r)),
  update: (id: string, input: Partial<TeamInput>): Promise<SavedTeam> =>
    fetch(`${BASE}/${id}`, {
      method: 'PUT',
      headers: JSON_HEADERS,
      body: JSON.stringify(input),
    }).then((r) => unwrap(r)),
  remove: (id: string): Promise<void> =>
    fetch(`${BASE}/${id}`, { method: 'DELETE' }).then((r) => {
      if (!r.ok) throw new Error(`teams API ${r.status}`)
    }),
}
