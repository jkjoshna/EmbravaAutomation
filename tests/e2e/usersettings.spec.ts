import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Homepage } from '../pages/homepage';
import { launchCleanContext } from '../../src/utils/browser';
import { CommonFunctions } from '../../src/utils/commonfun';
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


test('Verify the user settings items ', async ({ page, testLogin, testBaseurl }) => {
 test.setTimeout(60000); // ← extend test limit

  const login = new LoginPage(page);
  const home = new Homepage(page);
  const commonFunctions = new CommonFunctions(page,testLogin, testBaseurl);
  const message = page.locator('.Toastify');

    await commonFunctions.login();
    // await page.waitForTimeout(10000);
    await  home.profileMenu.click();
    // await page.waitForTimeout(4000);
    await home.usersettingsBtn.click();
    await expect(page.locator('h1')).toHaveText('Profile');
    //await expect(message).toHaveText('Portal user updated successfully.');
});