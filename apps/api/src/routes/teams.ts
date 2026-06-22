import { and, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { z } from 'zod'

import type { AppEnv } from '../context'
import { db } from '../db'
import { team } from '../db/schema'

const teamInput = z.object({
  name: z.string().min(1).max(100),
  teamKey: z.string().min(1),
  /** The drafted roster, stored verbatim (validated client-side by the resolver). */
  roster: z.record(z.string(), z.unknown()),
})

/** A coach's saved teams — owned by the authenticated user, isolated per user. */
export const teams = new Hono<AppEnv>()

teams.get('/', async (c) => {
  const user = c.get('user')
  if (!user) return c.json({ error: 'unauthorized' }, 401)
  const rows = await db.select().from(team).where(eq(team.userId, user.id))
  return c.json(rows)
})

teams.post('/', async (c) => {
  const user = c.get('user')
  if (!user) return c.json({ error: 'unauthorized' }, 401)
  const body = teamInput.safeParse(await c.req.json().catch(() => null))
  if (!body.success) {
    return c.json({ error: 'invalid', issues: body.error.issues }, 400)
  }
  const [created] = await db
    .insert(team)
    .values({ ...body.data, userId: user.id })
    .returning()
  return c.json(created, 201)
})

teams.get('/:id', async (c) => {
  const user = c.get('user')
  if (!user) return c.json({ error: 'unauthorized' }, 401)
  const [row] = await db
    .select()
    .from(team)
    .where(and(eq(team.id, c.req.param('id')), eq(team.userId, user.id)))
  if (!row) return c.json({ error: 'not-found' }, 404)
  return c.json(row)
})

teams.put('/:id', async (c) => {
  const user = c.get('user')
  if (!user) return c.json({ error: 'unauthorized' }, 401)
  const body = teamInput
    .partial()
    .safeParse(await c.req.json().catch(() => null))
  if (!body.success) {
    return c.json({ error: 'invalid', issues: body.error.issues }, 400)
  }
  const [updated] = await db
    .update(team)
    .set({ ...body.data, updatedAt: new Date() })
    .where(and(eq(team.id, c.req.param('id')), eq(team.userId, user.id)))
    .returning()
  if (!updated) return c.json({ error: 'not-found' }, 404)
  return c.json(updated)
})

teams.delete('/:id', async (c) => {
  const user = c.get('user')
  if (!user) return c.json({ error: 'unauthorized' }, 401)
  const [deleted] = await db
    .delete(team)
    .where(and(eq(team.id, c.req.param('id')), eq(team.userId, user.id)))
    .returning()
  if (!deleted) return c.json({ error: 'not-found' }, 404)
  return c.json({ ok: true })
})
