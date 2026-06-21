import { expect, test } from '@playwright/test'

test('the landing hero opens the codex', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('landing-cta-codex').click()
  await expect(page).toHaveURL(/\/codex$/)
  await expect(page.getByTestId('codex-card-teams')).toBeVisible()
})
