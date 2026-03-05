import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { SignupPage } from '../pages/SignUpPage';
import { BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
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


test('Create a new user ', async ({ page, testLogin, testBaseurl }) => {
 test.setTimeout(60000); // ← extend test limit

  const login = new LoginPage(page);
  const signUp = new SignupPage(page);

  await page.goto(testBaseurl.baseURL, { timeout: 60000 }); // 60 seconds 
  // await page.waitForTimeout(3000);
  await login.createaccountLink.click();
  await signUp.usernameInput.fill('akash@yopmail.com');
  await signUp.signupBtn.click();
  await expect(page).toHaveTitle('Sign up - Embrava Connect');
});