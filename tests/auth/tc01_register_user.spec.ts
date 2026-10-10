import { test, expect } from '@fixtures/base-fixture';
import { generateUserData } from '@data/userGenerator';

test.describe('Test Case 1: Register User', () => {
  test(
    'TC01 - Register User',
    { tag: ['@smoke', '@regression'] },
    async ({
      homePage,
      signupLoginPage,
      accountInformationPage,
      accountCreatedPage,
      accountDeletedPage,
    }) => {
    // Precondition
    const userData = generateUserData();

    // Actions: Navigate & initiate signup
    await homePage.navigate();
    await homePage.verifyPageLoaded();
    await homePage.clickSignupLogin();
    await signupLoginPage.verifySignupHeaderVisible();
    await signupLoginPage.signup(userData.name, userData.email);

    // Actions: Fill account information & register
    await accountInformationPage.verifyHeaderVisible();
    await accountInformationPage.fillAccountDetails(userData);
    await accountInformationPage.clickCreateAccount();

    // Verification: Account created
    await accountCreatedPage.verifyAccountCreatedVisible();
    await accountCreatedPage.clickContinue();

    // Verification: Logged in status
    await expect(homePage.loggedInUserText).toContainText(userData.name);

    // Cleanup: Delete Account via UI per TC specification
    await homePage.clickDeleteAccount();
    await accountDeletedPage.verifyAccountDeletedVisible();
    await accountDeletedPage.clickContinue();
    await homePage.verifyPageLoaded();
  });
});