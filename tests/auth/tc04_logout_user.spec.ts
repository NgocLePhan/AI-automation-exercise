import { test, expect } from '@fixtures/base-fixture';
import { generateUserData } from '@data/userGenerator';
import { ApiClient } from '@utils/apiClient';

test.describe('Test Case 4: Logout User', () => {
  test(
    'TC04 - Logout User',
    { tag: ['@smoke', '@regression'] },
    async ({
      homePage,
      signupLoginPage,
      request,
    }) => {
      // Precondition
      const userData = generateUserData();
      const apiClient = new ApiClient(request);
      const createRes = await apiClient.createAccount(userData as unknown as Record<string, string>);
      expect(createRes.status()).toBe(200);

      try {
        // Actions
        await homePage.navigate();
        await homePage.verifyPageLoaded();
        await homePage.clickSignupLogin();
        await signupLoginPage.verifyLoginHeaderVisible();
        await signupLoginPage.login(userData.email, userData.password);

        // Verification
        await expect(homePage.loggedInUserText).toContainText(userData.name);

        // Actions: Logout
        await homePage.clickLogout();

        // Verification
        await signupLoginPage.verifyLoginHeaderVisible();
        await expect(signupLoginPage.page).toHaveURL(/.*login/);
      } finally {
        // Cleanup
        await apiClient.deleteAccount(userData.email, userData.password);
      }
    }
  );
});
