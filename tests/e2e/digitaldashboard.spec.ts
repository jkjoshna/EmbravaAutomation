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

test('Verify the digital signage dashboard', async ({ testLogin, testBaseurl }) => {
  test.setTimeout(60000); // ← extend test limit  
  const home = new Homepage(page);
  const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);
  await commonFunctions.login();
  // await page.waitForTimeout(4000);
  await page.getByRole('button', { name: 'Manage' }).nth(2).click();
  //await home.digitalsignagemanageBtn.click();


  await page.waitForURL('https://eccportaltest.azurewebsites.net/digital-signage');

  // await page.waitForTimeout(4000);

  await expect(page.getByText('Manage Organization Hierarchy')).toBeVisible();
  //await expect(page.getByText('screen with issues', { exact: true })).toBeVisible();
  await expect(page.locator('h1')).toHaveText('Dashboard');
});
