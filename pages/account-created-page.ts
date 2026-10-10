import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

/**
 * AccountCreatedPage represents the confirmation screen after successful user registration.
 * URL: https://automationexercise.com/account_created
 */
export class AccountCreatedPage extends BasePage {
  // Locators (Priority 1: data-qa)
  readonly accountCreatedHeading: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);

    this.accountCreatedHeading = page.locator('[data-qa="account-created"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  /**
   * Verify that 'ACCOUNT CREATED!' heading is visible
   */
  async verifyAccountCreatedVisible(): Promise<void> {
    await expect(this.accountCreatedHeading).toBeVisible();
  }

  /**
   * Click 'Continue' button to proceed to the main page
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}