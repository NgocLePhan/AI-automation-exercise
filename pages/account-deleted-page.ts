import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

/**
 * AccountDeletedPage represents the confirmation screen after an account is deleted.
 * URL: https://automationexercise.com/delete_account
 */
export class AccountDeletedPage extends BasePage {
  // Locators (Priority 1: data-qa)
  readonly accountDeletedHeading: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);

    this.accountDeletedHeading = page.locator('[data-qa="account-deleted"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  /**
   * Verify that 'ACCOUNT DELETED!' heading is visible
   */
  async verifyAccountDeletedVisible(): Promise<void> {
    await expect(this.accountDeletedHeading).toBeVisible();
  }

  /**
   * Click 'Continue' button to return to home page
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}