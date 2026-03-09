import { BrowserContext, Page } from '@playwright/test';
import test from '../fixtures/loginDataFixture';
import { CommonFunctions } from '../../src/utils/commonfun';
import { launchCleanContext } from '../../src/utils/browser';
import { expect } from '@playwright/test';
import { Homepage } from '../pages/homepage';
import { RobinConnectionPage } from '../pages/robinConnectionPage';

test('user can successfully add a Robin integration connection', async ({ page, testJoshLogin, testBaseurl }) => {
    // Set extended timeout for 3rd party API calls
    test.setTimeout(80000);

    const commonFunctions = new CommonFunctions(page, testJoshLogin, testBaseurl);
    const home = new Homepage(page);
    const robinPage = new RobinConnectionPage(page);

    // 1. Initial Login Flow
    await commonFunctions.joshLogin(testJoshLogin);

    // 2. Navigate to Connections (using Homepage POM)
    await home.roommanageBtn.click();
    await page.waitForLoadState('networkidle');

    // 3. Select Robin & Navigate to Form
    await robinPage.selectRobinIntegration();

    // 4. Fill credentials via POM
    await robinPage.fillCredentials(
        'https://api.robinpowered.com',
        '560936',
        'TFObcPAxDasEKiwuuoOwi3QXUZxxBcIOSuttSqSg0iBqV66Bp9nEozXZdGgqP1z1eih66IB6frNTQ3myU1gErjgCRCzyVZUnetajhHFKhcyxKSsNkP0sjGSurGIMS4hl'
    );

    // 5. Submit and test connection
    await robinPage.submitConnection();

    //page.waitForTimeout(80000);
    await page.locator('[data-automation="nextBTN"]').waitFor({ state: 'visible' });
    await page.locator('[data-automation="nextBTN"]').click();
    await page.screenshot();

    //await page.locator('[data-automation="submitBTN"]').click();

    await page.getByRole('button').nth(3).click();
    await page.getByRole('button', { name: 'Connections' }).click();
    await page.getByRole('button', { name: 'Disconnect' }).nth(1).click();
});