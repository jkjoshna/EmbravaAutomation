import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signinBtn: Locator;
  readonly forgetpasswordLink: Locator;
  readonly ssoBtn: Locator;
  readonly createaccountLink: Locator;

  constructor(page: Page) {
    this.emailInput = page.locator('#signInName');
    this.passwordInput = page.locator('#password');
    this.signinBtn = page.locator('#next');
    this.forgetpasswordLink = page.locator('#forgotPassword');
    this.ssoBtn = page.locator('#SSOClaimExchange');
    this.createaccountLink = page.locator('#createAccount');
  }


}
