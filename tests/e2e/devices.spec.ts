import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Homepage } from '../pages/homepage';
import { Devicespage } from '../pages/devicesPage';
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

test('Verify the devices page and add device button', async ({ testLogin, testBaseurl }) => {
  test.setTimeout(60000); // ← extend test limit  
  const home = new Homepage(page);
  const devices = new Devicespage(page);
  const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);
  await commonFunctions.login();


  // await page.waitForTimeout(4000);
  //await home.manageBtn.click();
  await page.locator('[data-automation="DeskBooking"] > [data-automation="BTNManage"]').click();
  // await page.waitForTimeout(4000);
  await devices.deviceslist.click();
  // await page.waitForTimeout(4000);
  await devices.adddeviceBtn.click();
  // await page.waitForTimeout(4000);
  await expect(page.getByText('Connect a desk device to your workspace')).toBeVisible();
  //await expect(page.locator('h2')).toHaveText('Add desk DeviceConnect a desk device to your workspace');

});