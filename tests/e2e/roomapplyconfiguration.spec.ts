import test from '../fixtures/loginDataFixture';
import { devices, expect } from '@playwright/test';
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

test('Verify the apply configuration functionality', async ({ testLogin, testBaseurl }) => {
  test.setTimeout(60000); // ← extend test limit

  const login = new LoginPage(page);
  const home = new Homepage(page);
  const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);
  await commonFunctions.login();
  // await page.waitForTimeout(4000);
  //await home.manageBtn.click();
  await page.locator('[data-automation="roomBooking"] > [data-automation="BTNManage"]').click();


  await page.getByText('Devices').click();
  await page.getByRole('row', { name: '52526199923 52526199923 Desks' }).getByRole('checkbox').check();
  await page.getByRole('combobox').filter({ hasText: 'Actions' }).click();
  await page.getByText('Apply Configuration').click();
  await page.getByRole('radio', { name: 'Room Sign template default' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
});
// await page.waitForTimeout(4000);
// await page.waitForURL('https://eccportaltest.azurewebsites.net/room-booking');


// await page.waitForTimeout(4000);

//await page.getByRole('combobox', { name: 'Actions' }).click();

// Select the first item
//await page.getByRole('option').first().click();


//});
