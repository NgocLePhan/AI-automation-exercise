import { test } from '@fixtures/base-fixture';
import { AUTH_MESSAGES } from '@constants/app-context';
import { generateUserData } from '@data/userGenerator';

test.describe('Test Case 3: Login User with incorrect email and password', () => {
  test(
    'TC03 - Login User with incorrect email and password',
    { tag: ['@regression'] },
    async ({
      homePage,
      signupLoginPage,
    }) => {
    // Precondition: Generate realistic un-registered credentials
    const invalidCredentials = generateUserData();

    // Actions
    await homePage.navigate();
    await homePage.verifyPageLoaded();
    await homePage.clickSignupLogin();
    await signupLoginPage.verifyLoginHeaderVisible();
    await signupLoginPage.login(invalidCredentials.email, invalidCredentials.password);

    // Verification
    await signupLoginPage.verifyLoginErrorVisible(AUTH_MESSAGES.LOGIN_ERROR);
  });
});
