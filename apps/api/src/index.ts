import { Hono } from 'hono'

/** The blitz read API. Endpoints are added as the data layer grows. */
const app = new Hono()

app.get('/health', (c) => c.json({ status: 'ok' }))

/** The Hono app type, for a future end-to-end-typed client. */
export type AppType = typeof app

export default app
