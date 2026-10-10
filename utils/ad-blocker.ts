import { Page } from '@playwright/test';

/**
 * List of known ad and tracking domains targeting Automation Exercise
 */
export const AD_URL_PATTERNS: string[] = [
  '*google-analytics.com*',
  '*googlesyndication.com*',
  '*googleadservices.com*',
  '*doubleclick.net*',
  '*adservice.google.com*',
  '*pagead2.googlesyndication.com*',
];

const AD_DOMAINS_REGEX = /(google-analytics\.com|googlesyndication\.com|googleadservices\.com|doubleclick\.net|adservice\.google\.com|pagead2\.googlesyndication\.com)/i;

/**
 * Intercepts and aborts third-party ad, tracking, and Google Vignette requests.
 * Drastically reduces page load latency and prevents popups from obstructing DOM interactions.
 * 
 * @param page Playwright Page instance
 */
export async function blockAds(page: Page): Promise<void> {
  await page.route(AD_DOMAINS_REGEX, (route) => route.abort());
}
