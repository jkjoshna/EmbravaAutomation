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

test('user logs in using fixture + POM', async ({ testLogin, testBaseurl }) => {
    test.setTimeout(70000);
    const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);
    await commonFunctions.login();
    await expect(page).toHaveTitle('Embrava Connect Portal');


    await page.getByRole('button').first().click();
    await page.getByRole('button', { name: 'Room Booking' }).click();
    await page.getByRole('button', { name: '×' }).click();
    await page.goto('https://eccportaltest.azurewebsites.net/account-management');
    await page.locator('div:nth-child(4)').click();
    await page.locator('div:nth-child(4)').click();
    await page.getByRole('button').first().click();
    await page.getByRole('button', { name: 'Room Booking' }).click();
    await page.getByRole('img', { name: 'https://eccstgacctest.z13.web.core.windows.net/connection-app-logos/o365.png' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('textbox', { name: 'Tenant Id' }).click();
    await page.getByRole('textbox', { name: 'Tenant Id' }).fill('532bdb8a-cf91-4605-ad8a-cac039b8e70a');
    await page.getByRole('textbox', { name: 'Client Id' }).click();
    await page.getByRole('textbox', { name: 'Client Id' }).fill('74528f0c-c5d2-4284-ad41-70dba4827d6c');
    await page.getByRole('textbox', { name: 'Client Secret' }).click();
    await page.getByRole('textbox', { name: 'Client Secret' }).fill(' f~77UR02j9.klsdNCZFD8~Gv8s5~Ke1a21    ');
    await page.getByRole('combobox').click();
    await page.getByLabel('Active Directory').getByText('Active Directory').click();
    await page.locator('label').filter({ hasText: 'Standard Attributes' }).click();
    await page.getByRole('combobox').filter({ hasText: 'Badge number field' }).click();
    await page.getByLabel('employeeId').getByText('employeeId').click();
    await page.getByRole('combobox').filter({ hasText: 'Employee Id field' }).click();
    await page.getByRole('option', { name: 'employeeId' }).click();
    await page.getByRole('button', { name: 'Test Connection' }).click();
    await page.getByRole('button', { name: 'Continue' }).click();
    await page.getByRole('button', { name: 'avatar_logo' }).click();
});
