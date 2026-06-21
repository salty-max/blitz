import { expect, test } from '@playwright/test'

test('codex cards route to category pages and the masthead marks the active section', async ({
  page,
}) => {
  await page.goto('/codex')
  await expect(page.getByTestId('nav-codex')).toHaveAttribute(
    'data-status',
    'active'
  )

  await page.getByTestId('codex-card-teams').click()
  await expect(page).toHaveURL(/\/codex\/teams$/)
  await expect(page.getByTestId('tier-all')).toBeVisible()
  await expect(page.getByTestId('breadcrumb')).toBeVisible()

  await page.getByTestId('nav-codex').click()
  await expect(page).toHaveURL(/\/codex$/)
  await page.getByTestId('codex-card-stars').click()
  await expect(page).toHaveURL(/\/codex\/stars$/)
  await expect(page.getByTestId('stars-search')).toBeVisible()
})
