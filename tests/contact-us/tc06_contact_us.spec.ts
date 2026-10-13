import { test, expect } from '@fixtures/base-fixture';
import { TEST_DATA_FILES } from '@constants/app-context';

test.describe('Test Case 6: Contact Us Form', () => {
  test(
    'TC06 - Contact Us Form',
    { tag: ['@regression'] },
    async ({ homePage, contactUsPage }) => {
      // Test Data
      const contactFormData = {
        name: 'Automation Tester',
        email: 'tester.contact@example.qa.com',
        subject: 'Product & Service Inquiry',
        message: 'This is an automated test message to verify the Contact Us form submission.',
        filePath: TEST_DATA_FILES.SAMPLE_UPLOAD,
      };

      // Actions: Navigate to Contact Us page
      await homePage.navigate();
      await homePage.verifyPageLoaded();
      await homePage.clickContactUs();

      // Verification: Contact Us page is displayed
      await contactUsPage.verifyGetInTouchVisible();

      // Actions: Fill contact details, upload file, and submit form
      await contactUsPage.fillContactForm(contactFormData);
      await contactUsPage.uploadFile(contactFormData.filePath);
      await contactUsPage.submitForm();

      // Verification: Success message displayed after submission
      await contactUsPage.verifySuccessMessageVisible();

      // Actions & Verification: Return to Home page successfully
      await contactUsPage.clickHome();
      await homePage.verifyPageLoaded();
    }
  );
});
