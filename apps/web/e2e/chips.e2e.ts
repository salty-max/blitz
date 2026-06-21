import { expect, test } from '@playwright/test'

test('skill and special-rule chips open the ref drawer', async ({ page }) => {
  await page.goto('/codex/teams/amazon')

  await page.getByTestId('ref-chip-lustrian-superleague').click()
  await expect(page.getByTestId('ref-drawer')).toBeVisible()
  await page.getByTestId('ref-drawer-close').click()
  await expect(page.getByTestId('ref-drawer')).toBeHidden()

  await page.getByTestId('ref-chip-jump-up').click()
  await expect(page.getByTestId('ref-drawer')).toBeVisible()
})
