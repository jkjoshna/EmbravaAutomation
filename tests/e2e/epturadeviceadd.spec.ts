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

test('Verify the Epturadesk add and remove desk devices', async ({ testJoshLogin, testBaseurl }) => {
    test.setTimeout(70000);
    const commonFunctions = new CommonFunctions(page, testJoshLogin, testBaseurl);
    await commonFunctions.joshLogin(testJoshLogin);
    await expect(page).toHaveTitle('Embrava Connect Portal');
    const epturaPage = new EpturaConnectionPage(page);

    await epturaPage.selectEpturaIntegration();

    await epturaPage.fillCredentials(
        'https://developer-sde.condecosoftware.com',
        'https://developer-api.condecosoftware.com/developer_sde',
        '5364500a5068458385c822e418c8c294',
        'NTM2NDUwMGE1MDY4NDU4Mzg1YzgyMmU0MThjOGMyOTQ=',
        '4126a4f5d9a74280b3b955ff9ed1461a'
    );

    await epturaPage.submitTestConnection();
    await page.getByText('Devices', { exact: true }).click();
    await page.getByRole('button', { name: 'Add Device' }).click();

    await page.getByRole('textbox', { name: 'e.g.,' }).fill('4242123456');
    await page.locator('select[name="building"]').selectOption('4');
    await page.locator('select[name="space"]').selectOption('5');
    await page.locator('select[name="desk"]').selectOption('7');
    await page.locator('.css-19bb58m').click();
    await page.getByRole('option', { name: 'Desk 01 / Floor -' }).click();
    await page.getByRole('button', { name: 'Add desk' }).click();
    await page.getByRole('row', { name: '4242123456 4242123456 Desk 01' }).getByRole('checkbox').check();
    await page.getByRole('combobox').filter({ hasText: 'Actions' }).click();
    await page.getByRole('option', { name: 'Remove' }).click();
    await page.getByRole('button', { name: 'Remove' }).click();
    await epturaPage.disconnect();

});
