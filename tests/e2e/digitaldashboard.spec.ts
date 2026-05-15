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

  await page.waitForTimeout(4000);
  await page.evaluate(() => {
    document.body.style.zoom = '60%';
  });
  await page.locator('div').nth(2).click();
  //await page.getByRole('button', { name: 'Manage' }).nth(2).click();
  await home.digitalsignagemanageBtn.click({ force: true });
  await page.locator('[data-automation="digitalSignage"] button')
    .click({ force: true });

  //await page.locator('[data-automation="digitalSignage"] button').click();

  await page.waitForTimeout(6000);
  await expect(page.locator('h1')).toHaveText('Dashboard');

});
