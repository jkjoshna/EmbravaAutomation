import { BrowserContext, Page } from '@playwright/test';
import test from '../fixtures/loginDataFixture';
import { CommonFunctions } from '../../src/utils/commonfun';
import { launchCleanContext } from '../../src/utils/browser';
import { ServiceNowConnectionPage } from '../pages/serviceNowConnectionPage';
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

test('Verify the Servicenow Connection process', async ({ testJoshLogin, testBaseurl }) => {
    test.setTimeout(70000);
    const commonFunctions = new CommonFunctions(page, testJoshLogin, testBaseurl);
    await commonFunctions.joshLogin(testJoshLogin);
    const serviceNowPage = new ServiceNowConnectionPage(page);
    await serviceNowPage.selectServiceNowIntegration();
    await serviceNowPage.fillCredentials('https://ven07032.service-now.com', 'EmbravaAPI', 'wE!G*1e&Mt)h]j3Q!PwU');
    await serviceNowPage.submitConnection();

    await page.getByText('Configurations').click();
    await page.getByRole('button', { name: 'Add Configuration' }).click();
    await page.getByRole('textbox', { name: 'Enter Configuration Name' }).click();
    await page.getByRole('textbox', { name: 'Enter Configuration Name' }).fill('test1');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button').nth(3).click();
    await page.getByRole('button', { name: 'Connections' }).click();
    await page.getByRole('button', { name: 'Disconnect' }).click();
});
