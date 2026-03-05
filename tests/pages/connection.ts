import { Page, Locator } from '@playwright/test';

export class connectionPage {

  readonly connections : Locator;
  readonly editsettings : Locator;
  readonly disconnect : Locator;
  


  constructor(page: Page) {
    this.connections = page.locator('[data-automation="connections"]');
    this.editsettings = page.locator('[data-automation="editBTN"]');
    this.disconnect =  page.locator('[data-automation="submitBTN"]');
    
   
  } 
}