import { expect, type Page, test } from '@playwright/test'

// A complete-enough better-auth payload for the get-session endpoint.
const SESSION = JSON.stringify({
  session: {
    id: 'sess_1',
    token: 'tok_1',
    userId: 'user_1',
    expiresAt: '2999-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  user: {
    id: 'user_1',
    name: 'Test Coach',
    email: 'coach@blitz.test',
    emailVerified: true,
    image: null,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
})

// Stub the session endpoint so the auth UI is deterministic without a live API.
// `null` is better-auth's "no session" response; SESSION is a signed-in coach.
async function stubSession(page: Page, body: string): Promise<void> {
  await page.route(/\/api\/auth\/get-session/, (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body })
  )
}

test.describe('auth', () => {
  test('the team route bounces an unauthenticated coach to login', async ({
    page,
  }) => {
    await stubSession(page, 'null')
    await page.goto('/teams')
    await expect(page).toHaveURL(/\/login\?/)
    expect(new URL(page.url()).searchParams.get('redirect')).toBe('/teams')
    await expect(page.getByTestId('masthead-signin')).toBeVisible()
  })

  test('a signed-in coach reaches the team route', async ({ page }) => {
    await stubSession(page, SESSION)
    await page.goto('/teams')
    await expect(page).toHaveURL(/\/teams$/)
    await expect(page.getByTestId('masthead-account')).toContainText(
      'Test Coach'
    )
    await expect(page.getByTestId('masthead-signout')).toBeVisible()
  })

  test('login returns an authenticated coach to the route they asked for', async ({
    page,
  }) => {
    await stubSession(page, SESSION)
    await page.goto('/login?redirect=%2Fteams')
    await expect(page).toHaveURL(/\/teams$/)
  })

  test('login ignores an off-site redirect target', async ({ page }) => {
    await stubSession(page, SESSION)
    await page.goto('/login?redirect=https%3A%2F%2Fevil.example%2Fhack')
    await expect(page).toHaveURL(/\/$/)
  })
})
