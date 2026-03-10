import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Homepage } from '../pages/homepage';
import { ProfileEditPage } from '../pages/profileedit';
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

test('Verify that the user can update the details. ', async ({ page, testLogin, testBaseurl }) => {
  test.setTimeout(60000); // ← extend test limit

  const login = new LoginPage(page);
  const home = new Homepage(page);
  const profile = new ProfileEditPage(page);
  const message = page.locator('.Toastify');
  const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);

  await commonFunctions.login();
  // await page.waitForTimeout(3000);
  await home.profileMenu.click();
  // await page.waitForTimeout(4000);
  await home.usersettingsBtn.click();
  // await page.waitForTimeout(4000);
  await profile.editBtn.click();
  await page.getByRole('combobox').click();
  await page.getByText('America/New_York').click();
  // await page.waitForTimeout(4000);
  await page.getByRole('combobox').click();
  await page.getByText('Europe/Paris').click();
  //await profile.phone.fill('+33 1 09 75 83 88')
  // await page.waitForTimeout(2000);
  await profile.saveBtn.click();
  // await page.waitForTimeout(4000);
  //await expect(message).toBeVisible();
  await expect(message).toHaveText('Portal user updated successfully.');
  //await expect(page.getByText('Portal user updated')).toBeVisible();

});