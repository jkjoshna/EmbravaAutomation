import test from '../fixtures/loginDataFixture';
import { expect } from '@playwright/test';
import { CommonFunctions } from '../../src/utils/commonfun';
import { launchCleanContext } from '../../src/utils/browser';

test('Check DOM', async ({ testLogin, testBaseurl }) => {
  const context = await launchCleanContext();
  const page = await context.newPage();
  const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);
  await commonFunctions.login();
  await page.waitForTimeout(5000);
  
  const manageBtns = await page.locator('[data-automation="BTNManage"]').all();
  console.log(`Found ${manageBtns.length} Manage buttons`);
  for (const btn of manageBtns) {
      const parentDataAuto = await btn.evaluate(node => node.parentElement?.getAttribute('data-automation'));
      const grandparentDataAuto = await btn.evaluate(node => node.parentElement?.parentElement?.getAttribute('data-automation'));
      console.log('Parent data-automation:', parentDataAuto, 'Grandparent:', grandparentDataAuto);
  }
  await context.close();
});
