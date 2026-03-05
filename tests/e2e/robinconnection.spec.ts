import { BrowserContext, Page } from '@playwright/test';
import test from '../fixtures/loginDataFixture';
import { CommonFunctions } from '../../src/utils/commonfun';
import { launchCleanContext } from '../../src/utils/browser';
import { expect } from '@playwright/test';
import { Homepage } from '../pages/homepage';
import { RobinConnectionPage } from '../pages/robinConnectionPage';

test('user can successfully add a Robin integration connection', async ({ page, testLogin, testBaseurl }) => {
    // Set extended timeout for 3rd party API calls
    test.setTimeout(80000);

    const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);
    const home = new Homepage(page);
    const robinPage = new RobinConnectionPage(page);

    // 1. Initial Login Flow
    await commonFunctions.login();

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

    // 6. Verification Assertion
    // TODO: Add strict assertion here based on UI response, e.g., expect(page.locator('.success-toast')).toBeVisible();
});