import { Page, Locator } from '@playwright/test';

export class Devicespage {

  readonly deviceslist: Locator;
  readonly adddeviceBtn: Locator;
  readonly deviceid: Locator;
  readonly building: Locator;
  readonly space: Locator;
  readonly desk: Locator;
  readonly saveBtn: Locator;
  readonly addroomBtn: Locator;
  readonly adddeskBtn: Locator;

  readonly roomMailboxInput: Locator;
  readonly actionsCombobox: Locator;
  readonly removeAction: Locator;
  readonly removeConfirmBtn: Locator;
  readonly closeDeletedModalBtn: Locator;

  constructor(public readonly page: Page) {
    this.deviceslist = page.locator('[data-automation="devices"]');
    this.adddeviceBtn = page.getByRole('button', { name: 'Add Device' })
    this.deviceid = page.getByRole('textbox', { name: 'e.g.,' })
    this.building = page.locator('select[name="building"]')
    this.space = page.locator('select[name="space"]');
    this.desk = page.locator('select[name="desk"]');
    //this.desk = page.getByRole('dialog', { name: 'Add desk Device Connect a' });
    this.saveBtn = page.getByRole('button', { name: 'Add desk' })
    this.addroomBtn = page.getByRole('button', { name: 'Add room' })
    this.adddeskBtn = page.getByRole('button', { name: 'Add desk' })

    // Locators for M365 Add and Remove device
    this.roomMailboxInput = page.getByRole('textbox', { name: 'Enter Room Mailbox Address' });
    this.actionsCombobox = page.getByRole('combobox').filter({ hasText: 'Actions' });
    this.removeAction = page.getByText('Remove');
    this.removeConfirmBtn = page.getByRole('button', { name: 'Remove' });
    this.closeDeletedModalBtn = page.getByRole('button', { name: 'Device deleted successfully.' });
  }

  getDeviceCheckbox(deviceId: string): Locator {
    return this.page.getByRole('row').filter({ hasText: deviceId }).getByRole('checkbox');
  }
}