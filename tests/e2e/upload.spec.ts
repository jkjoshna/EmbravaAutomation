import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Homepage } from '../pages/homepage';
import { ProfileEditPage } from '../pages/profileedit'; 
import { launchCleanContext } from '../../src/utils/browser';
import { CommonFunctions } from '../../src/utils/commonfun';
import { BrowserContext, Page } from '@playwright/test';
let context: BrowserContext;
let page: Page;

test.beforeEach(async () => {
  context = await launchCleanContext();   // returns BrowserContext
  page = await context.newPage();         // returns Page
});

test.afterEach(async () => {
  await context.close();
});

test('Verify that the user can update the details. ', async ({ page, testLogin, testBaseurl }) => {
 test.setTimeout(60000); // ← extend test limit

  const login = new LoginPage(page);
  const home = new Homepage(page);
  const profile = new ProfileEditPage(page);
  const message = page.locator('.Toastify');
  const commonFunctions = new CommonFunctions(page,testLogin, testBaseurl);

    await commonFunctions.login();
    // await page.waitForTimeout(3000);
    await  home.profileMenu.click();
    // await page.waitForTimeout(4000);
    await home.usersettingsBtn.click();
    // await page.waitForTimeout(4000);
    await profile.editBtn.click();
    await profile.uploadButton.click();
    
    await page.locator('[data-automation="BTNUpload"]').click();

  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles('C:\\ECCAutomation\\tests\\testdata\\download.jpg');
   // Upload a single image file
   //await fileChooser.setInputFiles('tests/test-data/download.jpg');
   //await page.getByRole('button', { name: 'Upload' }).setInputFiles('C:\ECCAutomation\download(31).jpg');
    // await page.waitForTimeout(4000);
    await profile.saveBtn.click();
    // await page.waitForTimeout(3000);
    await expect(message).toHaveText('Portal user updated successfully.');
    //await expect(page.getByText('Portal user updated')).toBeVisible();
    
});