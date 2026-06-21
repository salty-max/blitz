import { expect, test } from '@playwright/test'

test('the hireable-by filter and the search narrow the star list', async ({
  page,
}) => {
  await page.goto('/codex/stars')

  await page.getByTestId('stars-team-filter').click()
  await page.getByTestId('stars-team-option-dwarf').click()
  await expect(page.getByTestId('star-card-akhorne-the-squirrel')).toBeVisible()
  await expect(page.getByTestId('star-card-anqi-panqi')).toBeHidden()

  await page.getByTestId('stars-team-filter').click()
  await page.getByTestId('stars-team-option-any').click()
  await expect(page.getByTestId('star-card-anqi-panqi')).toBeVisible()

  await page.getByTestId('stars-search').fill('Akhorne')
  await expect(page.getByTestId('star-card-akhorne-the-squirrel')).toBeVisible()
  await expect(page.getByTestId('star-card-anqi-panqi')).toBeHidden()
})
