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

//test.afterEach(async () => {
//  await context.close();
//});

test('user logs out functionality', async ({ testLogin, testBaseurl }) => {
 test.setTimeout(60000); // ← extend test limit

  const home = new Homepage(page);
  const login = new LoginPage(page);
  const commonFunctions = new CommonFunctions(page,testLogin, testBaseurl);
    await commonFunctions.login();
  
    // await page.waitForTimeout(7000);
    await home.profileMenu.click();
    // await page.waitForTimeout(5000);
    await home.logoutBtn.click();
    //await expect(page).toHaveTitle('Log In – Embrava Connect');

 
});
