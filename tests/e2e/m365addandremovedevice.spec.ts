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
import { Devicespage } from '../pages/devicesPage';

test('M365 add and remove devices ', async ({ testJoshLogin, testBaseurl }) => {
    test.setTimeout(60000); // ← extend test limit  
    const home = new Homepage(page);
    const deskconfig = new DeskconfigPage(page);
    const devices = new Devicespage(page);
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
    await devices.deviceslist.click(); // Resolves strict mode error on getByText('Devices')
    await devices.adddeviceBtn.click();
    await devices.deviceid.click();
    await devices.deviceid.fill('525252200886');
    await devices.roomMailboxInput.click();
    await devices.roomMailboxInput.fill('deska3@embrava.com');
    await devices.addroomBtn.click();
    await page.waitForTimeout(5000);

    await devices.getDeviceCheckbox('525252200886').check();
    await devices.actionsCombobox.click();
    await devices.removeAction.click();
    await devices.removeConfirmBtn.click();
    await devices.closeDeletedModalBtn.click();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Connections' }).click();
    await page.getByRole('button', { name: 'Disconnect' }).click();

    //await page.locator('[data-automation="BTNDisconnect"]').click();

});