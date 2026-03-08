import { Page, Locator } from '@playwright/test';

export class M365ConnectionPage {
    readonly page: Page;
    readonly manageConnectionBtn: Locator;
    readonly m365IntegrationImg: Locator;
    readonly continueBtn: Locator;
    readonly tenantIdInput: Locator;
    readonly clientIdInput: Locator;
    readonly clientSecretInput: Locator;
    readonly environmentCombobox: Locator;
    readonly environmentOption: Locator;
    readonly testConnectionBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.manageConnectionBtn = page.locator('[data-automation="roomBooking"] > [data-automation="BTNManage"]');
        this.m365IntegrationImg = page.getByRole('img', { name: 'https://eccstgacctest.z13.web.core.windows.net/connection-app-logos/o365.png' });
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        
        this.tenantIdInput = page.getByRole('textbox', { name: 'Tenant Id' });
        this.clientIdInput = page.getByRole('textbox', { name: 'Client Id' });
        this.clientSecretInput = page.getByRole('textbox', { name: 'Client Secret' });
        
        this.environmentCombobox = page.getByRole('combobox');
        this.environmentOption = page.getByLabel('Embrava Connect').getByText('Embrava Connect');
        
        this.testConnectionBtn = page.getByRole('button', { name: 'Test Connection' });
    }

    async selectM365Integration() {
        await this.manageConnectionBtn.click();
        await this.m365IntegrationImg.click();
        
        // Remove the erratic state-open animate-in click which was likely recorded accidentally
        await this.continueBtn.click();
        await this.continueBtn.click();
    }

    async fillCredentials(tenantId: string, clientId: string, clientSecret: string) {
        await this.tenantIdInput.click();
        await this.tenantIdInput.fill(tenantId);
        
        await this.clientIdInput.click();
        await this.clientIdInput.fill(clientId);
        
        await this.clientSecretInput.click();
        await this.clientSecretInput.fill(clientSecret);
    }
    
    async selectEnvironment() {
        await this.environmentCombobox.click();
        await this.environmentOption.click();
    }

    async submitConnection() {
        await this.testConnectionBtn.click();
        await this.continueBtn.click();
        // Wait for connection list or next screen, mimicking the ServiceNow end actions
        // (If there are additional buttons to close the modal or verify connection state)
        await this.page.getByRole('button').nth(3).click();
        await this.page.getByRole('button', { name: 'Connections' }).click();
        await this.page.getByRole('button', { name: 'Disconnect' }).click();
    }
}
