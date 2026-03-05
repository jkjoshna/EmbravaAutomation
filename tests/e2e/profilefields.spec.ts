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

test('Verify the profile menu', async ({ testLogin, testBaseurl }) => {
 test.setTimeout(60000); // ← extend test limit

  const login = new LoginPage(page);
  const home = new Homepage(page);
  const commonFunctions = new CommonFunctions(page,testLogin, testBaseurl);
  await commonFunctions.login();
  // await page.waitForTimeout(6000);
  await home.profileMenu.click();
  await home.usersettingsBtn.click();

 
  await expect (page.getByText('Joshna')).toHaveText('Joshna');
  await expect(page.getByText('ecctest1@yopmail.com')).toHaveText('ecctest1@yopmail.com');
  //await expect(page.getByText('+919544905555')).toHaveText('+919544905555');
    //await expect(page.getByText('Asia/Kabul')).toHaveText('Asia/Kabul');
  
});
