import { expect, type Page, test } from '@playwright/test'

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

const SAVED_TEAM = {
  id: 't1',
  name: 'My Orcs',
  teamKey: 'orc',
  roster: {
    players: Array.from({ length: 11 }, () => ({ position: 'lineman' })),
    rerolls: 2,
    apothecary: false,
    assistantCoaches: 0,
    cheerleaders: 0,
    dedicatedFans: 1,
  },
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
}

async function signIn(page: Page): Promise<void> {
  await page.route(/\/api\/auth\/get-session/, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: SESSION,
    })
  )
}

test.describe('team builder', () => {
  test('an authenticated coach sees their saved teams', async ({ page }) => {
    await signIn(page)
    await page.route(/\/api\/teams$/, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([SAVED_TEAM]),
      })
    )
    await page.goto('/teams')
    await expect(page.getByTestId('teams-new')).toBeVisible()
    await expect(page.getByTestId(`team-card-${SAVED_TEAM.id}`)).toContainText(
      'My Orcs'
    )
  })

  test('the builder validates a drafted roster and saves it', async ({
    page,
  }) => {
    await signIn(page)
    let postedName: string | undefined
    await page.route(/\/api\/teams$/, (route) => {
      if (route.request().method() === 'POST') {
        const body = JSON.parse(route.request().postData() ?? '{}') as {
          name?: string
        }
        postedName = body.name
        return route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({ ...SAVED_TEAM, name: body.name ?? '' }),
        })
      }
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '[]',
      })
    })

    await page.goto('/teams/new')
    await page.getByTestId('builder-name').fill('The Gouged Eye')

    // Pick the first roster from the Select; the draft table then appears.
    await page.getByTestId('builder-team').click()
    await page.getByRole('option').first().click()
    await expect(page.getByTestId('builder-status')).toBeVisible()

    // Draft one player via the first position's stepper, then save.
    await page.locator('tbody tr').first().getByRole('button').last().click()
    await page.getByTestId('builder-save').click()

    await expect(page).toHaveURL(/\/teams$/)
    expect(postedName).toBe('The Gouged Eye')
  })
})
