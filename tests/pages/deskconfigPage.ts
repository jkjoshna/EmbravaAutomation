import { Page, Locator } from '@playwright/test';

export class DeskconfigPage {
 
  readonly deskconfiguration : Locator;
  readonly addconfigBtn: Locator;
  readonly editconfigBtn: Locator;
  readonly deleteconfigBtn: Locator;
  


  constructor(page: Page) {
    this.deskconfiguration = page.locator('[data-automation="configurations"]');
   // this.addconfigBtn = page.locator('[data-automation="BTNaddConfiguration"]');
   this.addconfigBtn = page.getByRole('button', { name: 'Add Configuration' });
    //this.editconfigBtn = page.locator('[data-automation="BTNeditConfig"]');
    this.editconfigBtn = page.locator('tr').nth(1).locator('[data-automation="BTNeditConfig"]');
    this.deleteconfigBtn = page.locator('[data-automation="BTNdeleteConfig"]:not(:disabled)').first();
   
  } 
}