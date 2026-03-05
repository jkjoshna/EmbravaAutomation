import { BrowserContext, Page } from '@playwright/test';
import test from '../fixtures/loginDataFixture';
import { CommonFunctions } from '../../src/utils/commonfun';
import { launchCleanContext } from '../../src/utils/browser';
import { expect } from '@playwright/test';


let context: BrowserContext;
let page: Page;

test.beforeEach(async () => {
  context = await launchCleanContext();   // returns BrowserContext
  page = await context.newPage();         // returns Page
});

test.afterEach(async () => {
  await context.close();
});

test('user logs in using fixture + POM', async ({testLogin, testBaseurl }) => {
  test.setTimeout(70000); 
  const commonFunctions = new CommonFunctions(page,testLogin, testBaseurl);
  await commonFunctions.login();
  await expect(page).toHaveTitle('Embrava Connect Portal');
   
});


