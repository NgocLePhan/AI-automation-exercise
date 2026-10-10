import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { UserAccountData } from '@data/userGenerator';

/**
 * AccountInformationPage represents the /signup form page where users enter
 * account details (title, password, DOB, newsletter) and address information.
 * URL: https://automationexercise.com/signup
 */
export class AccountInformationPage extends BasePage {
  // Headings
  readonly enterAccountInformationHeading: Locator;

  // Account Details Locators (Priority 1: data-qa where available)
  readonly titleMrRadio: Locator;
  readonly titleMrsRadio: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;

  // Address Details Locators (Priority 1: data-qa)
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page);

    // Section Headings
    this.enterAccountInformationHeading = page.getByRole('heading', {
      name: 'Enter Account Information',
    });

    // Account details
    this.titleMrRadio = page.locator('#id_gender1');
    this.titleMrsRadio = page.locator('#id_gender2');
    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.passwordInput = page.locator('[data-qa="password"]');
    this.daysSelect = page.locator('[data-qa="days"]');
    this.monthsSelect = page.locator('[data-qa="months"]');
    this.yearsSelect = page.locator('[data-qa="years"]');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.specialOffersCheckbox = page.locator('#optin');

    // Address information (Note: live site uses data-qa="address" for address1)
    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.companyInput = page.locator('[data-qa="company"]');
    this.address1Input = page.locator('[data-qa="address"]');
    this.address2Input = page.locator('[data-qa="address2"]');
    this.countrySelect = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');
  }

  /**
   * Verify that 'ENTER ACCOUNT INFORMATION' header is visible
   */
  async verifyHeaderVisible(): Promise<void> {
    await expect(this.enterAccountInformationHeading).toBeVisible();
  }

  /**
   * Fill account credentials and date of birth details
   */
  async fillAccountDetails(
    data: UserAccountData & { newsletter?: boolean; specialOffers?: boolean }
  ): Promise<void> {
    if (data.title === 'Mrs') {
      await this.titleMrsRadio.check();
    } else {
      await this.titleMrRadio.check();
    }

    await this.passwordInput.fill(data.password);
    await this.daysSelect.selectOption(String(parseInt(data.birth_date, 10)));
    await this.monthsSelect.selectOption(String(parseInt(data.birth_month, 10)));
    await this.yearsSelect.selectOption(data.birth_year);

    if (data.newsletter ?? true) await this.newsletterCheckbox.check();
    if (data.specialOffers ?? true) await this.specialOffersCheckbox.check();

    await this.fillAddressDetails(data);
  }

  /**
   * Fill postal and delivery address information
   */
  async fillAddressDetails(data: UserAccountData): Promise<void> {
    await this.firstNameInput.fill(data.firstname);
    await this.lastNameInput.fill(data.lastname);
    await this.companyInput.fill(data.company);
    await this.address1Input.fill(data.address1);
    await this.address2Input.fill(data.address2);
    await this.countrySelect.selectOption(data.country);
    await this.stateInput.fill(data.state);
    await this.cityInput.fill(data.city);
    await this.zipcodeInput.fill(data.zipcode);
    await this.mobileNumberInput.fill(data.mobile_number);
  }

  /**
   * Submit the account registration form
   */
  async clickCreateAccount(): Promise<void> {
    await this.createAccountButton.click();
  }
}