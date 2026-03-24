import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { OfficespaceConnectionPage } from '../pages/officespaceConnectionPage';
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
test('Officespace desk booking connection', async ({ testJoshLogin, testBaseurl }) => {
    test.setTimeout(60000); // ← extend test limit  
    const commonFunctions = new CommonFunctions(page, testJoshLogin, testBaseurl);
    await commonFunctions.joshLogin(testJoshLogin);

    const officespaceConnection = new OfficespaceConnectionPage(page);
    await officespaceConnection.selectOfficeSpaceIntegration();
    await officespaceConnection.fillApiSecretKey('YLH618PJ2RCjBZbci4xto0eUfwCaWDTC9fM6xc42eNwZwmEy');
    await officespaceConnection.testAndCompleteConnection();
    await page.getByText('Configurations').click();
    await page.getByRole('button', { name: 'Add Configuration' }).click();
    await page.getByRole('textbox', { name: 'Enter Configuration Name' }).click();
    await page.getByRole('textbox', { name: 'Enter Configuration Name' }).fill('test1');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button').nth(3).click();
    await page.getByRole('button', { name: 'Connections' }).click();
    await page.getByRole('button', { name: 'Disconnect' }).click();
});

