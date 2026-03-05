import { Page, Locator } from '@playwright/test';
export class SignupPage {
    readonly usernameInput: Locator;
    readonly signupBtn: Locator;
    readonly LoginLink: Locator;

constructor(page: Page) {
    this.usernameInput = page.locator('#email');
    this.signupBtn = page.locator('#continue');
    this.LoginLink = page.locator('text=Log in'); 
    
    
  }

}
