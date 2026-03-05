import { Page, Locator } from '@playwright/test';
export class ProfileEditPage {
    readonly editBtn: Locator;
    readonly phone: Locator;
    readonly saveBtn: Locator;
    readonly timezoneDropdown: Locator;
    readonly uploadButton: Locator;

constructor(page: Page) {
    this.editBtn = page.locator('[data-automation="BTNEdit"]');
    this.phone = page.locator('#phone');
    this.saveBtn = page.locator('[data-automation="BTNSave"]'); 
    this.timezoneDropdown = page.locator('[data-slot="select-trigger"]');
    this.uploadButton = page.getByRole('button', { name: 'Upload' });
    
    
  }

}