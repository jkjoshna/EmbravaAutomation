
import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Homepage } from '../pages/homepage';
import { AddconfigPage } from '../pages/addconfig';
import { DeskconfigPage } from '../pages/deskconfigPage';
//import { randomString } from '../../src/utils/commonutilfunctions'; 
import { randomString } from '../../src/utils/random';
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

test('Verify the desk configuration page and add and delete configuration functionality', async ({ testLogin, testBaseurl }) => {
    test.setTimeout(60000); // ← extend test limit  
    const home = new Homepage(page);
    const deskconfig = new DeskconfigPage(page);
    const addconfigPage = new AddconfigPage(page);
    const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);
    await commonFunctions.login();

    // await page.waitForTimeout(4000);
    await page.locator('[data-automation="DeskBooking"] > [data-automation="BTNManage"]').click();
    // await page.waitForTimeout(4000);
    await deskconfig.deskconfiguration.click();
    // await page.waitForTimeout(4000);
    await deskconfig.addconfigBtn.click();
    await page.getByRole('textbox', { name: 'Enter Configuration Name' }).click();
    await page.getByRole('textbox', { name: 'Enter Configuration Name' }).fill('testconfig1');
    await addconfigPage.saveBtn.click();

    await page.locator('.gap-2.whitespace-nowrap.rounded-md.text-sm.font-medium.transition-all.disabled\\:pointer-events-none.disabled\\:opacity-50.\\[\\&_svg\\]\\:pointer-events-none.\\[\\&_svg\\:not\\(\\[class\\*\\=\\\'size-\\\'\\]\\)\\]\\:size-4.shrink-0.\\[\\&_svg\\]\\:shrink-0.outline-none.focus-visible\\:border-ring.focus-visible\\:ring-ring\\/50.focus-visible\\:ring-\\[3px\\].aria-invalid\\:ring-destructive\\/20.dark\\:aria-invalid\\:ring-destructive\\/40.aria-invalid\\:border-destructive.flex.items-center.justify-center.h-9').first().click();
    await page.getByRole('button', { name: 'Delete' }).click();
});