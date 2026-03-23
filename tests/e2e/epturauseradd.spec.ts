import { BrowserContext, Page } from '@playwright/test';
import test from '../fixtures/loginDataFixture';
import { CommonFunctions } from '../../src/utils/commonfun';
import { launchCleanContext } from '../../src/utils/browser';
import { expect } from '@playwright/test';
import { EpturaConnectionPage } from '../pages/epturaConnectionPage';

let context: BrowserContext;
let page: Page;

test.beforeEach(async () => {
    context = await launchCleanContext();   // returns BrowserContext
    page = await context.newPage();         // returns Page
});

test.afterEach(async () => {
    await context.close();
});

test('Verify the Eptura add user functionality', async ({ testJoshLogin, testBaseurl }) => {
    test.setTimeout(70000);
    const commonFunctions = new CommonFunctions(page, testJoshLogin, testBaseurl);
    await commonFunctions.joshLogin(testJoshLogin);
    await expect(page).toHaveTitle('Embrava Connect Portal');
    const epturaPage = new EpturaConnectionPage(page);

    await epturaPage.selectEpturaIntegration('room');

    await epturaPage.fillCredentials(
        'https://developer-sde.condecosoftware.com',
        'https://developer-api.condecosoftware.com/developer_sde ',
        '5364500a5068458385c822e418c8c294 ',
        'NTM2NDUwMGE1MDY4NDU4Mzg1YzgyMmU0MThjOGMyOTQ=',
        '4126a4f5d9a74280b3b955ff9ed1461a'
    );

    await epturaPage.submitTestConnection();
    await page.getByText('User List').click();
    await page.getByRole('button', { name: 'Add User' }).click();
    await page.getByRole('textbox', { name: 'External Id' }).click();
    await page.getByRole('textbox', { name: 'External Id' }).fill('sjose@embrava.com');
    await page.getByRole('textbox', { name: 'External Id' }).press('Enter');
    await page.locator('div').filter({ hasText: /^Employee ID$/ }).click();
    await page.getByRole('textbox', { name: 'Employee ID' }).click();
    await page.getByRole('textbox', { name: 'Employee ID' }).fill('333');
    await page.getByRole('textbox', { name: 'Badge Number' }).click();
    await page.getByRole('textbox', { name: 'Badge Number' }).fill('44444');
    await page.getByRole('button', { name: 'Save' }).click();

    await epturaPage.disconnect();
});