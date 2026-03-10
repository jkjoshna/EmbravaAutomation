import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['list'],
    ['allure-playwright'],
    ['html']
  ],
  /* Retry failed tests */
  retries: 1,
  testDir: './tests/e2e',
  /* Timeout for each test */
  timeout: 60000,

  use: {


    screenshot: "on",
    headless: true,
    actionTimeout: 0,
    trace: 'on-first-retry',
    //screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
});
