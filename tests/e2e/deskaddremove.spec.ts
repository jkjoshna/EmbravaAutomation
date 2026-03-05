import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Homepage } from '../pages/homepage'; 
import { Devicespage } from '../pages/devicesPage';
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

test('Verify the add and remove functionality for desk devices', async ({ testLogin, testBaseurl }) => {
 test.setTimeout(60000); // ← extend test limit  
    const home = new Homepage(page);
    const devices = new Devicespage(page);
    const commonFunctions = new CommonFunctions(page,testLogin, testBaseurl);
    await commonFunctions.login();

  
    // await page.waitForTimeout(4000);
    await home.deskmanageBtn.click();
    // await page.waitForTimeout(4000);
    await devices.deviceslist.click();
    // await page.waitForTimeout(4000);
    await devices.adddeviceBtn.click();
    // await page.waitForTimeout(4000);

     await devices.deviceid.fill('5666435435');
        await devices.building.selectOption('TestBuilding2');
        await devices.space.selectOption('Desks Space');
        //await devices.desk.selectOption('Pod 1 - Desk1C');
        await page.locator('select[name="desk"]').selectOption('Pod 3 - Desk 4444');
        await devices.adddeskBtn.click();
        // await page.waitForTimeout(4000);
        const deviceAdded = page.locator('text=RB-001').isVisible();
        expect(deviceAdded).toBeTruthy();
        //await page.locator('input[type="checkbox"]').nth(0).check();
        await page.getByRole('row', { name: '5666435435 5666435435 Desk 4444' }).getByRole('checkbox').check();
        await page.getByRole('combobox').filter({ hasText: 'Actions' }).click();
        await page.getByRole('option', { name: 'Remove' }).click();
        await page.getByRole('button', { name: 'Remove' }).click();
        await page.getByText('Device deleted successfully.').click();

});





