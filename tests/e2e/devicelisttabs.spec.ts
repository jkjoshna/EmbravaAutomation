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

test('Validate the different tabs in room booking device page ', async ({ testLogin, testBaseurl }) => {
 test.setTimeout(60000); // ← extend test limit

    const login = new LoginPage(page);
    const home = new Homepage(page);
    const commonFunctions = new CommonFunctions(page,testLogin, testBaseurl);
    await commonFunctions.login();
    // await page.waitForTimeout(4000);
   //await home.manageBtn.click();
    await page.locator('[data-automation="roomBooking"] > [data-automation="BTNManage"]').click();
    // await page.waitForTimeout(4000);
    await page.waitForURL('https://eccportaltest.azurewebsites.net/room-booking');
   
    
    // await page.waitForTimeout(4000);
    await page.getByText('Devices', { exact: true }).click();
    await page.getByRole('button', { name: 'Available (0)' }).click();
    await page.getByRole('button', { name: 'Reserved (0)' }).click();
    await page.getByRole('button', { name: 'Checked-In (0)' }).click();
    await page.getByRole('button', { name: 'Offline (1)' }).click();
});
    
