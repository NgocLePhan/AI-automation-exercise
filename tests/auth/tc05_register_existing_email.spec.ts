import { test, expect } from '@fixtures/base-fixture';
import { AUTH_MESSAGES } from '@constants/app-context';
import { generateUserData } from '@data/userGenerator';
import { ApiClient } from '@utils/apiClient';

test.describe('Test Case 5: Register User with existing email', () => {
  test(
    'TC05 - Register User with existing email',
    { tag: ['@regression'] },
    async ({
      homePage,
      signupLoginPage,
      request,
    }) => {
      // Precondition: Existing registered user created via API
      const existingUser = generateUserData();
      const apiClient = new ApiClient(request);
      const createRes = await apiClient.createAccount(existingUser as unknown as Record<string, string>);
      expect(createRes.status()).toBe(200);

      try {
        // Actions
        await homePage.navigate();
        await homePage.verifyPageLoaded();
        await homePage.clickSignupLogin();
        await signupLoginPage.verifySignupHeaderVisible();
        await signupLoginPage.signup(existingUser.name, existingUser.email);

        // Verification
        await signupLoginPage.verifySignupErrorVisible(AUTH_MESSAGES.SIGNUP_EMAIL_EXISTS);
      } finally {
        // Cleanup
        await apiClient.deleteAccount(existingUser.email, existingUser.password);
      }
    }
  );
});
