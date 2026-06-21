import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright runs the end-to-end flows against the production build served by
 * `vite preview`. Selectors are the app's `data-testid`s, so they survive copy
 * and EN/FR locale changes.
 */
export default defineConfig({
  testDir: './e2e',
  // `.e2e.ts`, not `.spec.ts`, so the Bun test runner never picks these up.
  testMatch: '**/*.e2e.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'bun run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
