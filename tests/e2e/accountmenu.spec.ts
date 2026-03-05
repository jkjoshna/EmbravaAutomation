import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Homepage } from '../pages/homepage';
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

test('Verify the account menu', async ({ testLogin, testBaseurl }) => {
 test.setTimeout(60000); // ← extend test limit

 const commonFunctions = new CommonFunctions(page,testLogin, testBaseurl);
    await commonFunctions.login();
    const home = new Homepage(page);
    // await page.waitForTimeout(3000);
    await home.settingsMenu.click();
    await page.screenshot()

    // await page.waitForTimeout(6000);
    await home.accountMenu.click();
    await expect(page.locator('h2')).toHaveText('Organization Details');

    //await expect(page).toHaveURL('https://eccportaltest.azurewebsites.net/account-management');

});