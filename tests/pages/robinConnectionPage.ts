import { Page, Locator } from '@playwright/test';

export class RobinConnectionPage {
    readonly robinCard: Locator;
    readonly robinIntegrationImg: Locator;
    readonly nextBtn: Locator;
    readonly platformUrlInput: Locator;
    readonly accountIdInput: Locator;
    readonly apiTokenInput: Locator;
    readonly testConnectionBtn: Locator;
    readonly continueBtn: Locator;

    constructor(page: Page) {
        this.robinCard = page.locator('div').filter({ hasText: 'Robin' }).nth(4);
        this.robinIntegrationImg = page.getByRole('img', { name: /robin/i });

        // Handling the "Next" button click dynamically since the original label was unclear or reliant on Tailwind
        this.nextBtn = page.getByRole('button', { name: 'Next' }).or(page.locator('#nextBtn')).first();

        this.platformUrlInput = page.getByRole('textbox', { name: 'Platform Service URL' });
        this.accountIdInput = page.getByRole('textbox', { name: 'Account Id' });
        this.apiTokenInput = page.getByRole('textbox', { name: 'API Token' });

        this.testConnectionBtn = page.getByRole('button', { name: 'Test Connection' });
        //this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.continueBtn = page.locator('#nextBtn');
    }

    async selectRobinIntegration() {
        await this.robinCard.click();
        await this.robinIntegrationImg.click();
        await this.nextBtn.click();
        // Click the 'Continue' button on the popup that appears
        await this.continueBtn.click();
    }

    async fillCredentials(platformUrl: string, accountId: string, apiToken: string) {
        await this.platformUrlInput.fill(platformUrl);
        await this.accountIdInput.fill(accountId);
        await this.apiTokenInput.fill(apiToken);
    }

    async submitConnection() {
        await this.testConnectionBtn.click();

        // Wait for the button to become ready after API test
        //await this.continueBtn.waitFor({ state: 'visible', timeout: 30000 });
        //await this.continueBtn.click();
        //await page.getByRole('button', { name: 'Connections' }).click();
        //await page.getByRole('button', { name: 'Disconnect' }).click();

    }
}
