import { expect, test } from '@playwright/test'

test('the ref drawer opens, pushes a nested entry, and closes', async ({
  page,
}) => {
  await page.goto('/codex/teams/amazon')
  await expect(page.getByTestId('ref-drawer')).toBeHidden()

  await page.getByTestId('ref-chip-jump-up').click()
  await expect(page.getByTestId('ref-drawer')).toBeVisible()
  await expect(page.getByTestId('ref-drawer-back')).toBeHidden()

  await page.getByTestId('drawer-ref-prone').click()
  await expect(page.getByTestId('ref-drawer-back')).toBeVisible()

  await page.getByTestId('ref-drawer-back').click()
  await expect(page.getByTestId('ref-drawer-back')).toBeHidden()

  await page.getByTestId('ref-drawer-close').click()
  await expect(page.getByTestId('ref-drawer')).toBeHidden()
})
