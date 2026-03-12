import { test as base } from '@playwright/test';

export interface LoginData {
  email: string;
  password: string;
}

export interface BaseUrlData {
  baseURL: string;
}

// --- Fixture values ---
const loginData: LoginData = {
  email: "eccauto@yopmail.com",
  password: "Admin@123"
};

const joshLoginData: LoginData = {
  email: "joshdev@yopmail.com",
  password: "Admin@123"
};

const baseurlData: BaseUrlData = {
  baseURL: "https://eccportaltest.azurewebsites.net/"
};

// --- Extend Playwright test ---
const test = base.extend<{
  testLogin: LoginData;
  testJoshLogin: LoginData;
  testBaseurl: BaseUrlData;
}>({
  testLogin: async ({ }, use) => {
    await use(loginData);
  },

  testJoshLogin: async ({ }, use) => {
    await use(joshLoginData);
  },

  testBaseurl: async ({ }, use) => {
    await use(baseurlData);
  }
});

// Export extended test + also export fixtures if needed
export default test;
