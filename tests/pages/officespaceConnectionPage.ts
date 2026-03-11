import { Page, Locator } from '@playwright/test';

export class OfficespaceConnectionPage {
    readonly page: Page;
    readonly manageConnectionBtn: Locator;
    readonly officeSpaceIntegrationImg: Locator;
    readonly continueBtn: Locator;
    readonly apiSecretKeyInput: Locator;
    readonly testConnectionBtn: Locator;
    readonly closeBtn: Locator;
    readonly connectionsMenuBtn: Locator;
    readonly disconnectBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.manageConnectionBtn = page.locator('[data-automation="DeskBooking"] > [data-automation="BTNManage"]');
        this.officeSpaceIntegrationImg = page.getByRole('img', { name: 'https://eccstgacctest.z13.web.core.windows.net/connection-app-logos/office-' });
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.apiSecretKeyInput = page.getByRole('textbox', { name: 'Api Secret Key' });
        this.testConnectionBtn = page.getByRole('button', { name: 'Test Connection' });
        this.closeBtn = page.getByRole('button').nth(3);
        this.connectionsMenuBtn = page.getByRole('button', { name: 'Connections' });
        this.disconnectBtn = page.getByRole('button', { name: 'Disconnect' });
    }

    async selectOfficeSpaceIntegration() {
        await this.manageConnectionBtn.click();
        await this.officeSpaceIntegrationImg.click();
        await this.continueBtn.click();
        await this.continueBtn.click();
    }

    async fillApiSecretKey(secretKey: string) {
        await this.apiSecretKeyInput.click();
        await this.apiSecretKeyInput.fill(secretKey);
    }

    async testAndCompleteConnection() {
        await this.testConnectionBtn.click();
        await this.continueBtn.click();
    }

    async disconnectIntegration() {
        await this.closeBtn.click();
        await this.connectionsMenuBtn.click();
        await this.disconnectBtn.click();
    }
}
