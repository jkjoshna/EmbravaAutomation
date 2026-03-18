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

test('Validate the add and remove functionality for Room devices.', async ({ testLogin, testBaseurl }) => {
    test.setTimeout(60000); // ← extend test limit  
    const home = new Homepage(page);
    const devices = new Devicespage(page);
    const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);
    await commonFunctions.login();


    await page.waitForTimeout(4000);
    await home.roommanageBtn.click();
    await page.waitForTimeout(4000);
    await devices.deviceslist.click();
    await page.waitForTimeout(4000);
    await devices.adddeviceBtn.click();
    //await page.waitForTimeout(4000);
    //await page.locator('[data-automation="DeskBooking"] > [data-automation="BTNManage"]').click();
    //await page.getByRole('button').nth(1).click();
    //await page.getByRole('button', { name: 'Room Booking' }).click();
    // await page.getByText('Devices').click();
    //await page.getByRole('button', { name: 'Add Device' }).click();
    await page.getByRole('textbox', { name: 'e.g.,' }).click();
    await page.getByRole('textbox', { name: 'e.g.,' }).fill('52526199923');
    await page.locator('select[name="building"]').selectOption('17693');
    await page.locator('select[name="space"]').selectOption('133436');
    await page.getByRole('button', { name: 'Add room' }).click();
    await page.getByRole('row', { name: '52526199923 52526199923 Desks' }).getByRole('checkbox').check();
    await page.getByRole('combobox').filter({ hasText: 'Actions' }).click();
    await page.getByRole('option', { name: 'Remove' }).click();
    await page.getByRole('button', { name: 'Remove' }).click();
});

