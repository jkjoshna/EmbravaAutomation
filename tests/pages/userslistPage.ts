import { Page, Locator } from '@playwright/test';

export class UserslistPage {
 
  readonly userlist : Locator;
  readonly adduserbtn: Locator;
  readonly searchbox: Locator;
  readonly savebtn: Locator;
  


  constructor(page: Page) {
    this.userlist = page.locator('[data-automation="users"]');
    this.adduserbtn = page.locator('[data-automation="addDeviceUser"]');
    this.searchbox =  page.getByRole('textbox', { name: 'Search for User…' });
        this.savebtn = page.getByRole('button', { name: 'Save' });
}
}