import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { launchCleanContext } from '../../src/utils/browser';
import { BrowserContext, Page } from '@playwright/test';
import { CommonFunctions } from '../../src/utils/commonfun'; 
let context: BrowserContext;
let page: Page;

test.beforeEach(async () => {
  context = await launchCleanContext();   // returns BrowserContext
  page = await context.newPage();         // returns Page
});

test.afterEach(async () => {
  await context.close();
});  


test('verify the homepage title ', async ({ testLogin, testBaseurl }) => {
 test.setTimeout(60000); // ← extend test limit

  const login = new LoginPage(page);
  const commonFunctions = new CommonFunctions(page,testLogin, testBaseurl);
    await commonFunctions.login();
    // await page.waitForTimeout(3000);
    await expect(page).toHaveTitle('Embrava Connect Portal');
  //await page.waitForURL('**/dashboard');
  //await expect(page.locator('h1')).toHaveText('Dashboard');
});