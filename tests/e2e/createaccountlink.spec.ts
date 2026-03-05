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



test('verify the create an account link ', async ({ testLogin, testBaseurl }) => {
 test.setTimeout(60000); // ← extend test limit

  const login = new LoginPage(page);

  await page.goto(testBaseurl.baseURL, { timeout: 60000 }); // 60 seconds 
  // await page.waitForTimeout(3000);
   await login.createaccountLink.click();


  await expect(page).toHaveTitle('Sign up - Embrava Connect');
});