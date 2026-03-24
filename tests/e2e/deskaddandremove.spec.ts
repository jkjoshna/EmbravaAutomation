import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Homepage } from '../pages/homepage';
import { Devicespage } from '../pages/devicesPage';
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

test('Verify the add and remove functionality for Desk devices.', async ({ testLogin, testBaseurl }) => {
  test.setTimeout(60000); // ← extend test limit  
  const home = new Homepage(page);
  const devices = new Devicespage(page);
  const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);
  await commonFunctions.login();


  // await page.waitForTimeout(4000);
  await home.deskmanageBtn.click();
  await page.waitForTimeout(4000);
  await devices.deviceslist.click();
  await page.waitForTimeout(4000);
  await devices.adddeviceBtn.click();
  await page.waitForTimeout(4000);
  //await page.locator('[data-automation="DeskBooking"] > [data-automation="BTNManage"]').click();



  await page.getByRole('textbox', { name: 'e.g.,' }).click();
  await page.getByRole('textbox', { name: 'e.g.,' }).fill('42426359888');
  await page.locator('select[name="building"]').selectOption('17693');
  await page.locator('select[name="space"]').selectOption('133436');
  //await expect(page.locator('select[name="desk"]')).toBeEnabled();
  await page.waitForTimeout(4000);
  await page.locator('select[name="desk"]').selectOption('652312');
  await page.getByRole('button', { name: 'Add desk' }).click();

  // Assert that the "Device is not licensed" error is visible
  //await expect(page.getByText('Device is not licensed')).toBeVisible({ timeout: 10000 });
  //await page.getByRole('textbox', { name: 'e.g.,' }).click();
  await page.waitForTimeout(4000);

  // Use filter with hasText to find the row more reliably, avoiding exact text matching issues
  await page.getByRole('row').filter({ hasText: '42426359888' }).getByRole('checkbox').check();

  await page.getByRole('combobox').filter({ hasText: 'Actions' }).click();
  await page.getByText('Remove').click();
});





