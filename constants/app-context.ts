/**
 * Centralized Application Context Constants:
 * UI messages, page headings, error alerts, success notices, and page titles.
 * Single source of truth for UI verification across Playwright tests and Page Objects.
 */

export const PAGE_TITLES = {
  HOME: /Automation Exercise/i,
} as const;

export const AUTH_MESSAGES = {
  LOGIN_ERROR: 'Your email or password is incorrect!',
  SIGNUP_EMAIL_EXISTS: 'Email Address already exist!',
} as const;

export const PAGE_HEADINGS = {
  LOGIN_TO_ACCOUNT: 'Login to your account',
  NEW_USER_SIGNUP: 'New User Signup!',
  ENTER_ACCOUNT_INFORMATION: 'Enter Account Information',
  ACCOUNT_CREATED: 'Account Created!',
  ACCOUNT_DELETED: 'Account Deleted!',
  FEATURES_ITEMS: 'Features Items',
  SUBSCRIPTION: 'Subscription',
} as const;

export const SUCCESS_MESSAGES = {
  SUBSCRIPTION: 'You have been successfully subscribed!',
  CONTACT_US: 'Success! Your details have been submitted successfully.',
  ORDER_PLACED: 'Congratulations! Your order has been confirmed!',
  REVIEW_SUBMITTED: 'Thank you for your review.',
} as const;
