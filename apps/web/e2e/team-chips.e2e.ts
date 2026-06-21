import { expect, test } from '@playwright/test'

test('a team chip navigates to that team roster', async ({ page }) => {
  await page.goto('/codex/stars')
  await page.getByTestId('team-chip-amazon').first().click()
  await expect(page).toHaveURL(/\/codex\/teams\/amazon$/)
  await expect(page.getByTestId('ref-chip-jump-up')).toBeVisible()
})
