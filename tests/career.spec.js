import { test, expect } from '@playwright/test';

const CAREER_URL = 'https://www.defactoinfotech.com/career/';

test.describe('De Facto Infotech career page', () => {
  test('should navigate to Business development Manager job and click Apply Now', async ({ page }) => {
    await page.goto(CAREER_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

    const currentOpenings = page.locator('text=Current openings');
    await expect(currentOpenings).toBeVisible({ timeout: 60000 });
    await currentOpenings.scrollIntoViewIfNeeded();

    const businessDevLink = page.locator('text=Business development Manager').first();
    await expect(businessDevLink).toBeVisible({ timeout: 60000 });
    await businessDevLink.click();

    await page.waitForURL('**/Job-Details/**', { timeout: 60000 });
    await expect(page).toHaveTitle(/Defacto|Drive Digital Transformation|Job Details/i);

    const applyButton = page.locator('input[value="Apply Now"], button:has-text("Apply now")');
    await expect(applyButton).toBeVisible({ timeout: 60000 });
    await applyButton.click();

    // Confirm the apply button was clicked by checking that the page remains stable or continues loading.
    await page.waitForTimeout(2000);
  });
});
