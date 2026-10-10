import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import {PAGE_TITLES} from '@constants/messages'

/**
 * HomePage represents the landing/home page of Automation Exercise.
 * URL: https://automationexercise.com/
 */
export class HomePage extends BasePage {
  // Locators
  readonly featuresItemsHeading: Locator;

  constructor(page: Page) {
    super(page);

    // Priority 2: Semantic role for features items section
    this.featuresItemsHeading = page.getByRole('heading', {
      name: 'Features Items',
    });
  }

  /**
   * Navigate to the home page
   */
  override async navigate(): Promise<void> {
    await super.navigate('/');
  }

  /**
   * Minimal verification that the home page is loaded:
   * 1. Page title matches Automation Exercise
   * 2. 'Features Items' section heading is visible
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.featuresItemsHeading).toBeVisible();
    await expect(this.page).toHaveTitle(PAGE_TITLES.HOME);
  }
}
