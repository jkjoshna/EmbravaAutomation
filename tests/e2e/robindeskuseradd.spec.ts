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

test('Validate the add user functionality in desk booking', async ({ testLogin, testBaseurl }) => {
    test.setTimeout(60000); // ← extend test limit  
    const home = new Homepage(page);
    const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);
    await commonFunctions.login();
    await page.locator('[data-automation="DeskBooking"] > [data-automation="BTNManage"]').click();
    await page.getByText('User List').click();
    await page.getByRole('button', { name: 'Add User' }).click();
    await page.getByRole('textbox', { name: 'Search for User…' }).click();
    await page.getByRole('textbox', { name: 'Search for User…' }).fill('apaul');
    await page.locator('form').getByRole('button').filter({ hasText: /^$/ }).click();
    await page.getByRole('cell', { name: 'apaul@embrava.com' }).first().click();
    await page.getByRole('textbox', { name: 'Employee ID' }).click();
    await page.getByRole('textbox', { name: 'Employee ID' }).fill('444');
    await page.getByRole('textbox', { name: 'Badge Number' }).click();
    await page.getByRole('textbox', { name: 'Badge Number' }).fill('2435435');
    await page.getByRole('button', { name: 'Save' }).click();

    // await page.waitForTimeout(4000);



});