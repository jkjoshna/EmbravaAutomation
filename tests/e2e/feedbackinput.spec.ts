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

test('Verify the feedback text area and button functionality ', async ({ testLogin, testBaseurl }) => {
 test.setTimeout(60000); // ← extend test limit

  const home = new Homepage(page);
  const login = new LoginPage(page);
  const message = page.locator('.Toastify');
  const commonFunctions = new CommonFunctions(page,testLogin, testBaseurl);
    await commonFunctions.login();
  
    // await page.waitForTimeout(3000);
    await home.help.click();
    // await page.waitForTimeout(2000);
    
    await home.givefeedback.click();
    // await page.waitForTimeout(2000);
    await page.getByRole('combobox').selectOption('Needs improvement');
    await page.type('#feedBackNote', 'Sample feedback for needs improvement');
    // await page.waitForTimeout(2000);
    //await page.locator('[data-automation="submitBTN"]').first().click();
    //await page.waitForTimeout(2000);
    //await expect(message).toHaveText('Feedback updated successfully.');
    await expect(page.locator('[data-automation="submitBTN"]').first()).toHaveText('Send feedback');
 
});