import { Page, Locator } from '@playwright/test';

export class AddconfigPage {

  readonly name : Locator;
  readonly default : Locator;
  readonly saveBtn : Locator;
 


  constructor(page: Page) {
    this.name = page.locator('#configurationName');
    this.default = page.getByRole('combobox', { name: 'No' });
    this.saveBtn = page.getByRole('button', { name: 'Save' });
    
    
   
  } 
}