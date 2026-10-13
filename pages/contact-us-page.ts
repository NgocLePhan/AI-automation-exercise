import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { PAGE_HEADINGS, SUCCESS_MESSAGES } from '@constants/app-context';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  filePath?: string;
}

/**
 * ContactUsPage represents the Customer Support Contact Us page.
 * URL: https://automationexercise.com/contact_us
 */
export class ContactUsPage extends BasePage {
  // Locators
  readonly getInTouchHeading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly uploadFileInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly homeButton: Locator;

  constructor(page: Page) {
    super(page);

    // Header & Section Titles
    this.getInTouchHeading = page.getByRole('heading', { name: PAGE_HEADINGS.GET_IN_TOUCH });

    // Contact Form Inputs (Priority 1: data-qa attributes)
    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.subjectInput = page.locator('[data-qa="subject"]');
    this.messageInput = page.locator('[data-qa="message"]');
    this.uploadFileInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('[data-qa="submit-button"]');

    // Status Notification & Home Redirect Button
    this.successMessage = page.locator('#contact-page').getByText(SUCCESS_MESSAGES.CONTACT_US);
    this.homeButton = page.locator('#form-section a.btn.btn-success');
  }

  /**
   * Navigate directly to the Contact Us page
   */
  override async navigate(): Promise<void> {
    await super.navigate('/contact_us');
  }

  /**
   * Verify that 'GET IN TOUCH' header is visible
   */
  async verifyGetInTouchVisible(): Promise<void> {
    await expect(this.getInTouchHeading).toBeVisible();
    await this.page.waitForLoadState('load');
  }

  /**
   * Fill the contact form text fields (name, email, subject, message)
   * @param data Form input values
   */
  async fillContactForm(data: ContactFormData): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageInput.fill(data.message);
  }

  /**
   * Upload a file to the contact form attachment input
   * @param filePath Absolute path of the file to attach
   */
  async uploadFile(filePath: string): Promise<void> {
    await this.uploadFileInput.setInputFiles(filePath);
  }

  /**
   * Submit the contact form and handle the browser confirmation dialog (Press OK to proceed)
   */
  async submitForm(): Promise<void> {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.submitButton.click();
  }

  /**
   * Verify success message 'Success! Your details have been submitted successfully.' is visible
   */
  async verifySuccessMessageVisible(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  /**
   * Click 'Home' button from the contact form success section to return to homepage
   */
  async clickHome(): Promise<void> {
    await this.homeButton.click();
  }
}
