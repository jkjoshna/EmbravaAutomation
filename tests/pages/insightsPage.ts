import { Page, Locator } from '@playwright/test';

export class insightsPage {
 
  readonly tryforfree : Locator;
  readonly insigts : Locator;
  


  constructor(page: Page) {
    this.insigts = page.locator('[data-automation="insights"]');
    this.tryforfree =  page.getByRole('button', { name: 'Try for Free' })
    
   
  } 
}