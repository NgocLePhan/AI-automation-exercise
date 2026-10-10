import { Page, Locator } from '@playwright/test';
import { blockAds } from '@utils/ad-blocker';

/**
 * BasePage serves as the foundational class for all Page Objects.
 * Encapsulates common elements such as the navigation header and shared utility actions.
 */
export abstract class BasePage {
  readonly page: Page;

  // Global Navigation Locators
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly signupLoginLink: Locator;
  readonly testCasesLink: Locator;
  readonly apiTestingLink: Locator;
  readonly contactUsLink: Locator;
  readonly loggedInUserText: Locator;
  readonly deleteAccountLink: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header Menu Links scoped to header navigation
    const headerNav = page.locator('header .shop-menu');
    this.homeLink = headerNav.getByRole('link', { name: 'Home' });
    this.productsLink = headerNav.getByRole('link', { name: 'Products' });
    this.cartLink = headerNav.getByRole('link', { name: 'Cart' });
    this.signupLoginLink = headerNav.getByRole('link', { name: 'Signup / Login' });
    this.testCasesLink = headerNav.getByRole('link', { name: 'Test Cases' });
    this.apiTestingLink = headerNav.getByRole('link', { name: 'API Testing' });
    this.contactUsLink = headerNav.getByRole('link', { name: 'Contact us' });
    this.loggedInUserText = page.locator('header').getByText(/Logged in as/i);
    this.deleteAccountLink = headerNav.getByRole('link', { name: 'Delete Account' });
    this.logoutLink = headerNav.getByRole('link', { name: 'Logout' });
  }

  /**
   * Intercept and abort third-party ad and tracking scripts
   */
  async setupAdBlocker(): Promise<void> {
    await blockAds(this.page);
  }

  /**
   * Navigate to a path relative to the baseURL with automatic ad blocking
   */
  async navigate(path: string = '/'): Promise<void> {
    await this.setupAdBlocker();
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Click on 'Signup / Login' button in the navigation header
   */
  async clickSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }

  /**
   * Click on 'Logout' button in the navigation header
   */
  async clickLogout(): Promise<void> {
    await this.logoutLink.click();
  }

  /**
   * Click on 'Delete Account' button in the navigation header
   */
  async clickDeleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
  }

  /**
   * Handle unexpected dialogs/alerts automatically
   */
  acceptAlerts(): void {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
  }
}
