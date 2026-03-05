import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { launchCleanContext } from '../../src/utils/browser';
import { BrowserContext, Page } from '@playwright/test';
let context: BrowserContext;
let page: Page;

test.beforeEach(async () => {
  context = await launchCleanContext();   // returns BrowserContext
  page = await context.newPage();         // returns Page
});

test.afterEach(async () => {
  await context.close();
});  


test('verify the forget password link clickable or not ', async ({ testLogin, testBaseurl }) => {
 test.setTimeout(60000); // ← extend test limit

  const login = new LoginPage(page);

  await page.goto(testBaseurl.baseURL, { timeout: 60000 }); // 60 seconds 
  // await page.waitForTimeout(3000);
  await login.forgetpasswordLink.click();
  await expect(page).toHaveTitle('Forget Password - Embrava Connect');
});