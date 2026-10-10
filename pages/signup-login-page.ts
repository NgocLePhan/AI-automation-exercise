import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';
import { AUTH_MESSAGES, PAGE_HEADINGS } from '@constants/app-context';

/**
 * SignupLoginPage represents the /login page where users can either log in
 * or initiate the signup process with Name and Email.
 * URL: https://automationexercise.com/login
 */
export class SignupLoginPage extends BasePage {
  // Signup Locators
  readonly newUserSignupHeading: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly signupErrorMessage: Locator;

  // Login Locators
  readonly loginToAccountHeading: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Signup section
    this.newUserSignupHeading = page.getByRole('heading', { name: PAGE_HEADINGS.NEW_USER_SIGNUP });
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.signupErrorMessage = page
      .locator('[data-qa="signup-error"]')
      .or(page.getByText(AUTH_MESSAGES.SIGNUP_EMAIL_EXISTS));

    // Login section (Priority 1: data-qa attributes with fallback to text matching)
    this.loginToAccountHeading = page.getByRole('heading', { name: PAGE_HEADINGS.LOGIN_TO_ACCOUNT });
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginButton = page.locator('[data-qa="login-button"]');
    this.loginErrorMessage = page
      .locator('[data-qa="login-error"]')
      .or(page.getByText(AUTH_MESSAGES.LOGIN_ERROR));
  }

  /**
   * Verify that 'New User Signup!' header is visible
   */
  async verifySignupHeaderVisible(): Promise<void> {
    await expect(this.newUserSignupHeading).toBeVisible();
  }

  /**
   * Enter name and email into the signup form and click Signup
   * @param name User's full name
   * @param email User's email address
   */
  async signup(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  /**
   * Verify error message is visible when signup fails (e.g. existing email)
   * @param expectedMessage Error message expected to be displayed (default: 'Email Address already exist!')
   */
  async verifySignupErrorVisible(expectedMessage: string = AUTH_MESSAGES.SIGNUP_EMAIL_EXISTS): Promise<void> {
    await expect(this.signupErrorMessage).toBeVisible();
    await expect(this.signupErrorMessage).toContainText(expectedMessage);
  }

  /**
   * Verify that 'Login to your account' header is visible
   */
  async verifyLoginHeaderVisible(): Promise<void> {
    await expect(this.loginToAccountHeading).toBeVisible();
  }

  /**
   * Enter email and password, then click the login button
   * @param email User's email address
   * @param password User's password
   */
  async login(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Verify error message is visible when login fails
   * @param expectedMessage Error message expected to be displayed (default: 'Your email or password is incorrect!')
   */
  async verifyLoginErrorVisible(expectedMessage: string): Promise<void> {
    await expect(this.loginErrorMessage).toBeVisible();
    await expect(this.loginErrorMessage).toContainText(expectedMessage);
  }
}

