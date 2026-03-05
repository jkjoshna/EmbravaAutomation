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

test('Verify the system page log', async ({ testLogin, testBaseurl }) => {
 test.setTimeout(60000); // ← extend test limit  
    const home = new Homepage(page);
    const commonFunctions = new CommonFunctions(page,testLogin, testBaseurl);
    await commonFunctions.login();
    // await page.waitForTimeout(4000);
    await home.deskmanageBtn.click();
    // await page.waitForTimeout(4000);
    await page.locator('[data-automation="system-log"]').click();
    // await page.waitForTimeout(4000);
    await expect(
  page.locator(
    'div.text-sm.py-3.border-t.border-gray-100',
    { hasText: 'Logged in successfully' }
  ).first()
).toBeVisible();

});