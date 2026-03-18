import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Homepage } from '../pages/homepage';
import { BrowserContext, Page } from '@playwright/test';
import { CommonFunctions } from '../../src/utils/commonfun';
import { launchCleanContext } from '../../src/utils/browser';
import { TIMEOUT } from 'dns';
let context: BrowserContext;
let page: Page;

test.beforeEach(async () => {
    context = await launchCleanContext();   // returns BrowserContext
    page = await context.newPage();         // returns Page
});

test.afterEach(async () => {
    await context.close();
});

test('Validate the user search in room booking', async ({ testLogin, testBaseurl }) => {
    test.setTimeout(60000); // ← extend test limit  
    const home = new Homepage(page);
    const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);
    await commonFunctions.login();
    await page.locator('[data-automation="roomBooking"] > [data-automation="BTNManage"]').click();

    await page.getByText('User List').click();

    await page.getByRole('textbox', { name: 'Search users...' }).click();
    await page.getByRole('textbox', { name: 'Search users...' }).fill('sumith');
    await page.waitForTimeout(5000);
    //await page.getByRole('textbox', { name: 'Search users...' }).click();

});

