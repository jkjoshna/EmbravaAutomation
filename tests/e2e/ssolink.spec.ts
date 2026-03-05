import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { launchCleanContext } from '../../src/utils/browser';
let context: BrowserContext;
let page: Page;

test.beforeEach(async () => {
  context = await launchCleanContext();   // returns BrowserContext
  page = await context.newPage();         // returns Page
});

test.afterEach(async () => {
  await context.close();
});

test('verify the login with sso link clickable or not ', async ({ page, testLogin, testBaseurl }) => {
 test.setTimeout(60000); // ← extend test limit

  const login = new LoginPage(page);

  await page.goto(testBaseurl.baseURL, { timeout: 60000 }); // 60 seconds 
  // await page.waitForTimeout(3000);
  await login.ssoBtn.click();
  await expect(page).toHaveTitle('Log In – Embrava Connect');
});