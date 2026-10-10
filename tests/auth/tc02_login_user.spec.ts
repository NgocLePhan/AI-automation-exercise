import { test, expect } from '@fixtures/base-fixture';
import { generateUserData } from '@data/userGenerator';
import { ApiClient } from '@utils/apiClient';

test.describe('Test Case 2: Login User with correct email and password', () => {
  test(
    'TC02 - Login User with correct email and password',
    { tag: ['@smoke', '@regression'] },
    async ({
      homePage,
      signupLoginPage,
      accountDeletedPage,
      request,
    }) => {
    // Precondition
    const userData = generateUserData();
    const apiClient = new ApiClient(request);
    const createRes = await apiClient.createAccount(userData as unknown as Record<string, string>);
    expect(createRes.status()).toBe(200);

    // Actions
    await homePage.navigate();
    await homePage.verifyPageLoaded();
    await homePage.clickSignupLogin();
    await signupLoginPage.verifyLoginHeaderVisible();
    await signupLoginPage.login(userData.email, userData.password);

    // Verification
    await expect(homePage.loggedInUserText).toContainText(userData.name);

    // Cleanup: Delete Account via UI per TC specification
    await homePage.clickDeleteAccount();
    await accountDeletedPage.verifyAccountDeletedVisible();
    await accountDeletedPage.clickContinue();
    await homePage.verifyPageLoaded();
  });
});
