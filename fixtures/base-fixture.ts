import { test as baseTest, expect } from '@playwright/test';
import { HomePage } from '@pages/home-page';
import { SignupLoginPage } from '@pages/signup-login-page';
import { AccountInformationPage } from '@pages/account-information-page';
import { AccountCreatedPage } from '@pages/account-created-page';
import { AccountDeletedPage } from '@pages/account-deleted-page';
import { blockAds } from '@utils/ad-blocker';

/**
 * Fixture type declarations for Page Objects and test utilities
 */
export interface PageFixtures {
  homePage: HomePage;
  signupLoginPage: SignupLoginPage;
  accountInformationPage: AccountInformationPage;
  accountCreatedPage: AccountCreatedPage;
  accountDeletedPage: AccountDeletedPage;
}

/**
 * Custom base test extending Playwright's test runner:
 * - Automatically registers ad and tracking request blocking for every test via direct page fixture override.
 * - Provides lazy-loaded, isolated instances of all Page Objects.
 */
export const test = baseTest.extend<PageFixtures>({
  // Direct page fixture override to block ads on every test
  page: async ({ page }, use) => {
    await blockAds(page);
    await use(page);
  },

  // Lazy-loaded Page Object fixtures
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  signupLoginPage: async ({ page }, use) => {
    await use(new SignupLoginPage(page));
  },

  accountInformationPage: async ({ page }, use) => {
    await use(new AccountInformationPage(page));
  },

  accountCreatedPage: async ({ page }, use) => {
    await use(new AccountCreatedPage(page));
  },

  accountDeletedPage: async ({ page }, use) => {
    await use(new AccountDeletedPage(page));
  },
});

export { expect };
