import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Homepage } from '../pages/homepage';
import { DeskconfigPage } from '../pages/deskconfigPage';
import { BrowserContext, Page } from '@playwright/test';
import { CommonFunctions } from '../../src/utils/commonfun';
import { launchCleanContext } from '../../src/utils/browser';
import { M365ConnectionPage } from '../pages/m365ConnectionPage';
let context: BrowserContext;
let page: Page;

test.beforeEach(async () => {
    context = await launchCleanContext();   // returns BrowserContext
    page = await context.newPage();         // returns Page
});

test.afterEach(async () => {
    await context.close();
});
test('M365 add user functionality', async ({ testJoshLogin, testBaseurl }) => {
    test.setTimeout(60000); // ← extend test limit  
    const home = new Homepage(page);
    const deskconfig = new DeskconfigPage(page);
    const commonFunctions = new CommonFunctions(page, testJoshLogin, testBaseurl);
    await commonFunctions.joshLogin(testJoshLogin);
    //await commonFunctions.login();

    const m365Page = new M365ConnectionPage(page);

    await m365Page.selectM365Integration();

    await m365Page.fillCredentials(
        '532bdb8a-cf91-4605-ad8a-cac039b8e70a',
        '74528f0c-c5d2-4284-ad41-70dba4827d6c',
        'f~77UR02j9.klsdNCZFD8~Gv8s5~Ke1a21'
    );

    await m365Page.selectEnvironment('Embrava Connect');
    await m365Page.submitTestConnection();
    //await m365Page.submitConnection();
    // await m365Page.disconnect();
    await page.screenshot();
    await page.getByText('User List').click();
    await page.getByRole('button', { name: 'Add User' }).click();
    await page.getByRole('textbox', { name: 'External Id' }).click();
    await page.getByRole('textbox', { name: 'External Id' }).fill('qa.user@embrava.com');
    await page.getByRole('textbox', { name: 'Employee ID' }).click();
    await page.getByRole('textbox', { name: 'Employee ID' }).fill('123');
    await page.getByRole('button', { name: 'Save' }).click();


    await page.getByRole('button').nth(3).click();
    await page.getByRole('button', { name: 'Connections' }).click();
    await page.getByRole('button', { name: 'Disconnect' }).click();

    //await page.locator('[data-automation="BTNDisconnect"]').click();

});