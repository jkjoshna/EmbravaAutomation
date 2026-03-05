import { Browser, BrowserContext, chromium } from '@playwright/test';

export async function launchCleanContext(): Promise<BrowserContext> {
  const browser: Browser = await chromium.launch();
  const context: BrowserContext = await browser.newContext({
    storageState: undefined,  // no cookies/localStorage
    bypassCSP: false,
  });

  return context;
}