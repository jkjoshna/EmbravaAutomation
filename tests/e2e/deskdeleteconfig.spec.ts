import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Homepage } from '../pages/homepage';
import { DeskconfigPage } from '../pages/deskconfigPage';
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
test('Verify the desk configuration delete button', async ({ testLogin, testBaseurl }) => {
  test.setTimeout(60000); // ← extend test limit  
  const home = new Homepage(page);
  const deskconfig = new DeskconfigPage(page);
  const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);
  await commonFunctions.login();


  // await page.waitForTimeout(4000);
  await page.locator('[data-automation="DeskBooking"] > [data-automation="BTNManage"]').click();
  // await page.waitForTimeout(4000);
  await deskconfig.deskconfiguration.click();


  await deskconfig.deleteconfigBtn.click();
  await page.locator('[data-automation="deleteBTN"]').click();
  // await page.waitForTimeout(4000);

  //await expect(page.locator('h1')).toHaveText('Edit Configuration');

});