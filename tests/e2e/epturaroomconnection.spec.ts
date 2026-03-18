import { BrowserContext, Page } from '@playwright/test';
import test from '../fixtures/loginDataFixture';
import { CommonFunctions } from '../../src/utils/commonfun';
import { launchCleanContext } from '../../src/utils/browser';
import { expect } from '@playwright/test';


let context: BrowserContext;
let page: Page;

test.beforeEach(async () => {
    context = await launchCleanContext();   // returns BrowserContext
    page = await context.newPage();         // returns Page
});

test.afterEach(async () => {
    await context.close();
});

test('Verify the Epturadesk connection', async ({ testJoshLogin, testBaseurl }) => {
    test.setTimeout(70000);
    const commonFunctions = new CommonFunctions(page, testJoshLogin, testBaseurl);
    await commonFunctions.joshLogin(testJoshLogin);
    await expect(page).toHaveTitle('Embrava Connect Portal');
    await page.locator('[data-automation="roomBooking"] > [data-automation="BTNManage"]').click();
    await page.locator('div').filter({ hasText: 'Eptura Engage' }).nth(4).click();
    await page.locator('.data-\\[state\\=open\\]\\:animate-in').first().click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('textbox', { name: 'Authentication URL' }).click();
    await page.getByRole('textbox', { name: 'Authentication URL' }).fill('https://developer-sde.condecosoftware.com');
    await page.getByRole('textbox', { name: 'Platform API URL' }).click();
    await page.getByRole('textbox', { name: 'Platform API URL' }).fill('https://developer-sde.condecosoftware.com');
    await page.getByRole('textbox', { name: 'Client Id' }).click();
    await page.getByRole('textbox', { name: 'Client Id' }).fill('5364500a5068458385c822e418c8c294');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('NTM2NDUwMGE1MDY4NDU4Mzg1YzgyMmU0MThjOGMyOTQ=');
    await page.getByRole('textbox', { name: 'Subscription Key' }).click();
    await page.getByRole('textbox', { name: 'Subscription Key' }).fill('4126a4f5d9a74280b3b955ff9ed1461a');
    await page.getByRole('button', { name: 'Test Connection' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
});
