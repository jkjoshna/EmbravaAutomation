import { Page, Locator } from '@playwright/test';

export class EpturaConnectionPage {
    readonly page: Page;
    readonly epturaIntegrationImg: Locator;
    readonly epturaIntegrationText: Locator;
    readonly continueBtn: Locator;
    readonly authUrlInput: Locator;
    readonly platformApiUrlInput: Locator;
    readonly clientIdInput: Locator;
    readonly passwordInput: Locator;
    readonly subscriptionKeyInput: Locator;
    readonly testConnectionBtn: Locator;
    readonly closeIconBtn: Locator;
    readonly connectionsBtn: Locator;
    readonly disconnectBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.epturaIntegrationImg = page.locator('div').filter({ hasText: 'Eptura Engage' }).nth(4);
        this.epturaIntegrationText = page.getByText('Eptura Engage', { exact: true });
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.authUrlInput = page.getByRole('textbox', { name: 'Authentication URL' });
        this.platformApiUrlInput = page.getByRole('textbox', { name: 'Platform API URL' });
        this.clientIdInput = page.getByRole('textbox', { name: 'Client Id' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.subscriptionKeyInput = page.getByRole('textbox', { name: 'Subscription Key' });
        this.testConnectionBtn = page.getByRole('button', { name: 'Test Connection' });
        this.closeIconBtn = page.getByRole('button').nth(3);
        this.connectionsBtn = page.getByRole('button', { name: 'Connections' });
        this.disconnectBtn = page.getByRole('button', { name: 'Disconnect' });
    }

    async selectEpturaIntegration(type: 'desk' | 'room' = 'desk') {
        if (type === 'desk') {
            await this.page.getByRole('button', { name: 'Manage' }).first().click();
        } else {
            await this.page.getByRole('button', { name: 'Manage' }).nth(1).click();
        }
        await this.epturaIntegrationImg.click();
        await this.epturaIntegrationText.click();
        await this.continueBtn.click();
        await this.continueBtn.click();
    }

    async fillCredentials(authUrl: string, apiUrl: string, clientId: string, password: string, subscriptionKey: string) {
        await this.authUrlInput.click();
        await this.authUrlInput.fill(authUrl);

        await this.platformApiUrlInput.click();
        await this.platformApiUrlInput.fill(apiUrl);

        await this.clientIdInput.click();
        await this.clientIdInput.fill(clientId);

        await this.passwordInput.click();
        await this.passwordInput.fill(password);

        await this.subscriptionKeyInput.click();
        await this.subscriptionKeyInput.fill(subscriptionKey);
    }

    async submitTestConnection() {
        await this.testConnectionBtn.click();
        await this.continueBtn.click();
    }

    async disconnect() {
        await this.closeIconBtn.click();
        await this.connectionsBtn.click();
        await this.disconnectBtn.click();
    }
}
