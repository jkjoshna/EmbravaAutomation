import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Homepage } from '../pages/homepage'; 
import { UserslistPage } from '../pages/userslistPage';
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

test('Verify the roombooking user search functionality', async ({ testLogin, testBaseurl }) => {
 test.setTimeout(60000); // ← extend test limit  
    const home = new Homepage(page);
    const userslist = new UserslistPage(page);
    const commonFunctions = new CommonFunctions(page,testLogin, testBaseurl);
    await commonFunctions.login();

  
    // await page.waitForTimeout(4000);
  //await home.manageBtn.click();
    await page.locator('[data-automation="roomBooking"] > [data-automation="BTNManage"]').click();
    // await page.waitForTimeout(4000);
    await userslist.userlist.click();
    // await page.waitForTimeout(4000);
    await userslist.adduserbtn.click();
    // await page.waitForTimeout(4000);
    await userslist.searchbox.fill('sumit');
    // await page.waitForTimeout(4000);
    await expect(page.locator('h1')).toHaveText('Add User');

  });