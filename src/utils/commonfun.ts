
import { LoginPage } from '../../tests/pages/loginPage';
import { expect } from '@playwright/test';
import { Page } from 'playwright';
import { BaseUrlData, LoginData } from '../../tests/fixtures/loginDataFixture';
export class CommonFunctions {
    readonly page: Page;
    readonly loginData: LoginData;
    readonly baseUrlData: BaseUrlData;

    constructor(page: Page, testLogin: LoginData, testBaseurl: BaseUrlData) {
        this.page = page;
        this.loginData = testLogin;
        this.baseUrlData = testBaseurl;
    }

    async login(): Promise<void> {
        const login = new LoginPage(this.page);
        // const baseURL = 'https://eccportaltest.azurewebsites.net/';
        // const loginData = {
        //     email: "josh1@yopmail.com",
        //     password: "Josh@123#"
        // };

        await this.page.goto(this.baseUrlData.baseURL, { timeout: 60000 }); // 60 seconds
        await this.page.waitForLoadState('domcontentloaded');
        await login.emailInput.waitFor({ state: 'visible', timeout: 15000 });
        await login.emailInput.fill(this.loginData.email);
        await login.passwordInput.fill(this.loginData.password);
        await login.signinBtn.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveTitle('Embrava Connect Portal', { timeout: 20000 });
    }
}