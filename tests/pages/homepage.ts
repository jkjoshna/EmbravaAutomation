import { Page, Locator } from '@playwright/test';

export class Homepage {
 
  readonly trialBtn : Locator;
  readonly deskmanageBtn: Locator;
  readonly roommanageBtn: Locator;
  readonly notifications: Locator;
  readonly help: Locator;
  readonly profileMenu: Locator;
  readonly logoutBtn: Locator;
  readonly settingsMenu: Locator;
  readonly usersettingsBtn: Locator;
  readonly switchorganizationBtn: Locator;
  readonly accountMenu: Locator;
  readonly connectionsMenu: Locator;
  readonly billingMenu: Locator;
  readonly support: Locator;
  readonly readhelparticle: Locator;
  readonly submitaticket: Locator;
  readonly givefeedback: Locator;
  readonly digitalsignagemanageBtn: Locator;
 // readonly administration: Locator;

  constructor(page: Page) {
    this.deskmanageBtn = page.locator('[data-automation="DeskBooking"] > [data-automation="BTNManage"]');
    this.roommanageBtn = page.locator('[data-automation="roomBooking"] > [data-automation="BTNManage"]');
    this.trialBtn = page.locator('data-automation="BTNTryFree"');
    this.notifications = page.locator('[data-automation="BTNToggleNotification"]');
    this.help = page.locator('[data-automation="BTNToggleHelp"]');
    this.profileMenu = page.locator('[data-automation="BTNToggleProfile"]');
    //this.profileMenu = page.locator('img[alt="avatar_logo"]');
   this.logoutBtn = page.locator('[data-automation="logOut"]');
   this.usersettingsBtn = page.locator('[data-automation="userSettings"]');
   this.switchorganizationBtn = page.locator('[data-automation="switchOrganization"]');
    this.settingsMenu = page.locator('[data-automation="BTNToggleSettings"]');
    this.accountMenu = page.locator('[data-automation="account"]');
    this.connectionsMenu = page.locator('[data-automation="connections"]');
   this.billingMenu = page.locator('[data-automation="billing"]');
  this.support = page.locator('[data-automation="supportTicket"]');
 this.readhelparticle = page.getByRole('button', { name: 'Read help articles' })
  //this.readhelparticle = page.locator('[data-automation="readArticles"]');
    this.submitaticket = page.locator('[data-automation="submitTicket"]');
    this.givefeedback= page.locator('[data-automation="giveFeedback"]');
    this.digitalsignagemanageBtn = page.locator('[data-automation="DigitalSignage"] > [data-automation="BTNManage"]');

    //this.administration = page.locator('data-automation="BTNToggleSettings');
    

}
}