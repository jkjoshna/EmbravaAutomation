import { Page, Locator } from '@playwright/test';

export class Devicespage {
 
  readonly deviceslist : Locator;
  readonly adddeviceBtn: Locator;
  readonly deviceid: Locator;
  readonly building : Locator;
  readonly space : Locator;
  readonly desk : Locator;
  readonly saveBtn : Locator;
  readonly addroomBtn : Locator;
  readonly adddeskBtn : Locator;



    constructor(page: Page) {
    this.deviceslist = page.locator('[data-automation="devices"]');
    this.adddeviceBtn = page.getByRole('button', { name: 'Add Device' })
    this. deviceid =  page.getByRole('textbox', { name: 'e.g.,' })
    this.building =  page.locator('select[name="building"]')
    this.space = page.locator('select[name="space"]');
    this.desk = page.locator('select[name="desk"]');
    //this.desk = page.getByRole('dialog', { name: 'Add desk Device Connect a' });
    this. saveBtn = page.getByRole('button', { name: 'Add desk' })
    this.addroomBtn = page.getByRole('button', { name: 'Add room' })
    this.adddeskBtn = page.getByRole('button', { name: 'Add desk' })
}
}