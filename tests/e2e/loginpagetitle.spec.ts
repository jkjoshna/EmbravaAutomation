import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { BrowserContext, Page } from '@playwright/test';
import { CommonFunctions } from '../../src/utils/commonfun';
import { launchCleanContext } from '../../src/utils/browser';
//import { allure } from 'allure-playwright'; 
let context: BrowserContext;
let page: Page;

test.beforeEach(async () => {
  context = await launchCleanContext();   // returns BrowserContext
  page = await context.newPage();         // returns Page
});

test.afterEach(async () => {
  await context.close();
});
test('Verify the login page title', async ({ testLogin, testBaseurl }) => {
  test.setTimeout(60000); // ← extend test limit

  const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);
  await page.goto(testBaseurl.baseURL, { timeout: 60000 }); // 60 seconds 
  // await page.waitForTimeout(3000);
  await commonFunctions.login();
  await expect(page).toHaveTitle('Embrava Connect Portal');

});