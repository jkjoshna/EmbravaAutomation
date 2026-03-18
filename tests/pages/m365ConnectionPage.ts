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
    readonly activeDirectoryOption: Locator;
    readonly testConnectionBtn: Locator;

    // Standard Attributes
    readonly standardAttributesLabel: Locator;
    readonly badgeNumberFieldCombobox: Locator;
    readonly employeeIdOption: Locator;
    readonly employeeIdFieldCombobox: Locator;

    // Custom Attributes
    readonly customAttributesRadio: Locator;
    readonly customAttributeObjectIdInput: Locator;
    readonly badgeNumberFieldInput: Locator;
    readonly employeeIdFieldInput: Locator;

    readonly dataStateOpenLocator: Locator;
    readonly closeIconBtn: Locator;
    readonly connectionsBtn: Locator;
    readonly disconnectBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        // Updating manageConnectionBtn to use the locator from the test case for reliability
        this.manageConnectionBtn = page.getByRole('button', { name: 'Manage' }).nth(1);

        // We can use the image role or the div text filter to locate Microsoft 365
        this.m365IntegrationImg = page.locator('div').filter({ hasText: 'Microsoft' }).nth(4);

        // Using getByRole instead of nextBTN automation id as it is more robust
        this.continueBtn = page.getByRole('button', { name: 'Continue' });

        this.dataStateOpenLocator = page.locator('.data-\\[state\\=open\\]\\:animate-in').first();

        this.tenantIdInput = page.getByRole('textbox', { name: 'Tenant Id' });
        this.clientIdInput = page.getByRole('textbox', { name: 'Client Id' });
        this.clientSecretInput = page.getByRole('textbox', { name: 'Client Secret' });

        this.environmentCombobox = page.getByRole('combobox').first();
        this.environmentOption = page.getByLabel('Embrava Connect').getByText('Embrava Connect');
        this.activeDirectoryOption = page.getByLabel('Active Directory').getByText('Active Directory');

        this.testConnectionBtn = page.getByRole('button', { name: 'Test Connection' });

        // Standard Attributes Locators
        this.standardAttributesLabel = page.locator('label').filter({ hasText: 'Standard Attributes' });
        this.badgeNumberFieldCombobox = page.getByRole('combobox').filter({ hasText: 'Badge number field' });
        this.employeeIdOption = page.getByLabel('employeeId').getByText('employeeId');
        this.employeeIdFieldCombobox = page.getByRole('combobox').filter({ hasText: 'Employee Id field' });

        // Custom Attributes Locators
        this.customAttributesRadio = page.getByRole('radio', { name: 'Custom Attributes' });
        this.customAttributeObjectIdInput = page.getByRole('textbox', { name: 'Custom Attribute Object Id' });
        this.badgeNumberFieldInput = page.getByRole('textbox', { name: 'Badge number field' });
        this.employeeIdFieldInput = page.getByRole('textbox', { name: 'Employee Id field' });

        // Removed previousContinueBtn as it clicks the continue button too early
        this.closeIconBtn = page.getByRole('button').nth(3);
        this.connectionsBtn = page.getByRole('button', { name: 'Connections' });
        this.disconnectBtn = page.getByRole('button', { name: 'Disconnect' });

    }

    async selectM365Integration() {
        await this.manageConnectionBtn.click();
        await this.m365IntegrationImg.click();

        // 1st Continue: "Select App" -> "Prepare App"
        await this.continueBtn.click();

        // 2nd Continue: "Prepare App" -> "Connect to App"
        await this.continueBtn.click();
    }

    async fillCredentials(tenantId: string, clientId: string, clientSecret: string) {
        // In the original script, it clicks tenantIdInput then fills, but for tenantId it only filled.
        // I will do click and fill just like the client id/secret for consistency.
        await this.tenantIdInput.click();
        await this.tenantIdInput.fill(tenantId);

        await this.clientIdInput.click();
        await this.clientIdInput.fill(clientId);

        await this.clientSecretInput.click();
        await this.clientSecretInput.fill(clientSecret);
    }

    async selectEnvironment(env: 'Embrava Connect' | 'Active Directory') {
        await this.environmentCombobox.click();
        if (env === 'Embrava Connect') {
            await this.environmentOption.click();
        } else if (env === 'Active Directory') {
            await this.activeDirectoryOption.click();
        }
    }

    async configureStandardAttributes() {
        await this.standardAttributesLabel.click();
        await this.badgeNumberFieldCombobox.click();
        await this.employeeIdOption.click();
        await this.employeeIdFieldCombobox.click();
        await this.employeeIdOption.click();
    }

    async configureCustomAttributes(objectId: string, badgeNumberField: string, employeeIdField: string) {
        await this.customAttributesRadio.check();

        await this.customAttributeObjectIdInput.click();
        await this.customAttributeObjectIdInput.fill(objectId);

        await this.badgeNumberFieldInput.click();
        await this.badgeNumberFieldInput.fill(badgeNumberField);

        await this.employeeIdFieldInput.click();
        await this.employeeIdFieldInput.fill(employeeIdField);
    }

    async submitTestConnection() {
        await this.testConnectionBtn.click();
        await this.continueBtn.click();
    }

    async submitConnection() {
        await this.testConnectionBtn.click();
        await this.continueBtn.click();
    }

    async disconnect() {
        await this.closeIconBtn.click();
        await this.connectionsBtn.click();
        await this.disconnectBtn.click();
    }
}
