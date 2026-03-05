import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { Homepage } from '../pages/homepage';
import { LoginPage } from '../pages/loginPage'; 
import { CommonFunctions } from '../../src/utils/commonfun';  
import { launchCleanContext } from '../../src/utils/browser';
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


test('Verify the account menu', async ({ testLogin, testBaseurl }) => {
 test.setTimeout(60000); // ← extend test limit
  const home = new Homepage(page);
  const login = new LoginPage(page);
  const commonFunctions = new CommonFunctions(page,testLogin, testBaseurl);
    await commonFunctions.login();
    // await page.waitForTimeout(3000);
    await home.settingsMenu.click();
    // await page.waitForTimeout(6000);
    await home.connectionsMenu.click();
    await expect(page.locator('h2')).toHaveText('Connections');
  
 
});