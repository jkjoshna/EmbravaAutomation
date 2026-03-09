import { BrowserContext, Page } from '@playwright/test';
import test from '../fixtures/loginDataFixture';
import { CommonFunctions } from '../../src/utils/commonfun';
import { launchCleanContext } from '../../src/utils/browser';
import { expect } from '@playwright/test';
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

test('M365 connection with custom attributes', async ({ testJoshLogin, testBaseurl }) => {
    test.setTimeout(70000);

    //const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);
    //await commonFunctions.login();
    const commonFunctions = new CommonFunctions(page, testJoshLogin, testBaseurl);
    await commonFunctions.joshLogin(testJoshLogin);
    const m365Page = new M365ConnectionPage(page);

    await m365Page.selectM365Integration();

    await m365Page.fillCredentials(
        '532bdb8a-cf91-4605-ad8a-cac039b8e70a',
        '74528f0c-c5d2-4284-ad41-70dba4827d6c',
        'f~77UR02j9.klsdNCZFD8~Gv8s5~Ke1a21'
    );

    await m365Page.selectEnvironment('Active Directory');

    await m365Page.configureCustomAttributes(
        'e26766316ab04d84b1966138de0ea545',
        'extensionAttribute1',
        'personalNumber'
    );

    await m365Page.submitTestConnection();
    await m365Page.disconnect();

});

