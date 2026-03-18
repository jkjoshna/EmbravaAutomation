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

test('Verify the roomdevice add and remove functionality ', async ({ testLogin, testBaseurl }) => {
  test.setTimeout(60000); // ← extend test limit

  const login = new LoginPage(page);
  const home = new Homepage(page);
  const commonFunctions = new CommonFunctions(page, testLogin, testBaseurl);
  const devices = new Devicespage(page);
  await commonFunctions.login();
  // await page.waitForTimeout(4000);
  await home.roommanageBtn.click();

  await page.getByRole('button').nth(3).click();
  await page.getByRole('button', { name: 'Connections' }).click();
  await page.getByRole('button', { name: 'Disconnect' }).click();


  await devices.deviceslist.click();
  await devices.adddeviceBtn.click();
  // await page.waitForTimeout(2000);
  await devices.deviceid.fill('433267888678');
  await devices.building.selectOption('TestBuilding2');
  await devices.space.selectOption('Desks Space');
  await devices.addroomBtn.click();
  // await page.waitForTimeout(4000);
  const deviceAdded = page.locator('text=RB-001').isVisible();
  expect(deviceAdded).toBeTruthy();
  await page.getByRole('row', { name: '433267888678 433267888678 Desks' }).getByRole('checkbox').check();
  await page.getByRole('combobox').filter({ hasText: 'Actions' }).click();
  await page.getByRole('option', { name: 'Remove' }).click();
  await page.getByRole('button', { name: 'Remove' }).click();
  await page.getByText('Device deleted successfully.').click();

});
