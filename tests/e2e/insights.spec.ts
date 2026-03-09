import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { Homepage } from '../pages/homepage';
import { insightsPage } from '../pages/insightsPage';
import { BrowserContext, Page } from '@playwright/test';
import { CommonFunctions } from '../../src/utils/commonfun';
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

test('Verify the deskbooking insights page', async ({ testLogin, testBaseurl }) => {
  test.setTimeout(60000); // ← extend test limit  
  const home = new Homepage(page);
  const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);
  const insigtspage = new insightsPage(page);
  await commonFunctions.login();
  // await page.waitForTimeout(4000);
  await page.locator('[data-automation="DeskBooking"] > [data-automation="BTNManage"]').click();
  // await page.waitForTimeout(4000);
  await insigtspage.insigts.click();
  await expect(page.locator('h1')).toHaveText('Insights for Desks');

});