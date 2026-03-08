import { Page, Locator } from '@playwright/test';

export class ServiceNowConnectionPage {
    readonly page: Page;
    readonly manageConnectionBtn: Locator;
    readonly serviceNowIntegrationImg: Locator;
    readonly continueBtn: Locator;
    readonly serviceUrlInput: Locator;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly testConnectionBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.manageConnectionBtn = page.locator('[data-automation="roomBooking"] > [data-automation="BTNManage"]');
        this.serviceNowIntegrationImg = page.getByRole('img', { name: 'https://eccstgacctest.z13.web.core.windows.net/connection-app-logos/service-now' });
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        
        this.serviceUrlInput = page.getByRole('textbox', { name: 'Service URL' });
        this.userNameInput = page.getByRole('textbox', { name: 'User Name' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        
        this.testConnectionBtn = page.getByRole('button', { name: 'Test Connection' });
    }

    async selectServiceNowIntegration() {
        await this.manageConnectionBtn.click();
        await this.serviceNowIntegrationImg.click();
        await this.continueBtn.click();
        await this.continueBtn.click();
    }

    async fillCredentials(serviceUrl: string, userName: string, password: string) {
        await this.serviceUrlInput.click();
        await this.serviceUrlInput.fill(serviceUrl);
        
        await this.userNameInput.click();
        await this.userNameInput.fill(userName);
        
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
    }

    async submitConnection() {
        await this.testConnectionBtn.click();
        await this.continueBtn.click();
    }
}
