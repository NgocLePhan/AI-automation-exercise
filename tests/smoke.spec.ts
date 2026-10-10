import { test, expect } from '@playwright/test';

test.describe('Automation Exercise - Environment Smoke Tests', () => {
  test('Verify Homepage Title and Navigation Header', { tag: ['@smoke'] }, async ({ page }) => {
    await page.goto('/');

    // Verify title matches official site
    await expect(page).toHaveTitle(/Automation Exercise/i);

    // Verify navigation links are visible in header
    const headerNav = page.locator('header .shop-menu');
    await expect(headerNav.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(headerNav.getByRole('link', { name: 'Products' })).toBeVisible();
    await expect(headerNav.getByRole('link', { name: 'Cart' })).toBeVisible();
    await expect(headerNav.getByRole('link', { name: 'Signup / Login' })).toBeVisible();
    await expect(headerNav.getByRole('link', { name: 'Test Cases' })).toBeVisible();
    await expect(headerNav.getByRole('link', { name: 'API Testing' })).toBeVisible();
  });
});
