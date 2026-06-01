// @ts-check
import { test, expect } from '@playwright/test';

test.describe('defacto infotech homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.defactoinfotech.com/');
  });

  test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === 'passed') {
      console.log(`Test passed: ${testInfo.title}`);
    }
  });

  test('homepage title', async ({ page }) => {
    await test.step('verify title of the page', async () => {
      await expect(page).toHaveTitle(/Dynamics 365 Consulting & Digital Transformation Services/);
    });
  });

  test('schedule free assessment button', async ({ page }) => {
    await test.step('verify click on schedule your free assessment button', async () => {
      const scheduleButton = page.getByRole('link', { name: 'Schedule your free assessment' });  
      await expect(scheduleButton).toBeVisible();
      await expect(scheduleButton).toBeEnabled();
      await scheduleButton.click();
      await expect(page).toHaveURL(/contact-us/);
    });
  });

  test('contact us button', async ({ page }) => {
    await test.step('verify click on contact us button', async () => {
    await expect(page.getByText('Contact us')).toBeVisible();
    await page.click('text=Contact us');
    await expect(page).toHaveURL(/contact-us/);
    });
  });

  test('read more button', async ({ page }) => {
    await test.step('verify click on read more button in ERP transformation with AI section', async () => {
      const erpSection = page.locator('section', { has: page.locator('text=ERP Transformation with AI') });
      await erpSection.scrollIntoViewIfNeeded();

      const readMoreButton = erpSection.locator('text=Read more').first();
      await readMoreButton.scrollIntoViewIfNeeded();
      await expect(readMoreButton).toBeVisible();
      await expect(readMoreButton).toBeEnabled();
      await readMoreButton.click();
    });
  });
});
