import { expect, test } from '@playwright/test'

test('the tier filter narrows the team grid', async ({ page }) => {
  await page.goto('/codex/teams')
  await expect(page.getByTestId('team-card-amazon')).toBeVisible()
  await expect(page.getByTestId('team-card-black-orc')).toBeVisible()

  await page.getByTestId('tier-1').click()
  await expect(page.getByTestId('team-card-amazon')).toBeVisible()
  await expect(page.getByTestId('team-card-black-orc')).toBeHidden()

  await page.getByTestId('tier-all').click()
  await expect(page.getByTestId('team-card-black-orc')).toBeVisible()
})
