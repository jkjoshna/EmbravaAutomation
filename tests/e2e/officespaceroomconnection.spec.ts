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
test('Officespace roombooking connection', async ({ testJoshLogin, testBaseurl }) => {
    test.setTimeout(60000); // ← extend test limit  
    const commonFunctions = new CommonFunctions(page, testJoshLogin, testBaseurl);
    await commonFunctions.joshLogin(testJoshLogin);

    const officespacePage = new OfficespaceConnectionPage(page);
    await officespacePage.selectOfficeSpaceRoomIntegration();
    await officespacePage.fillApiSecretKey('YLH618PJ2RCjBZbci4xto0eUfwCaWDTC9fM6xc42eNwZwmEy');
    await officespacePage.testAndCompleteConnection();
    await officespacePage.disconnectIntegration();
});