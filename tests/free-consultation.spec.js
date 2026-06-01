import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.defactoinfotech.com/');
});

test('Verify user can fill all fields and submit the form', async ({ page }) => {

    await page.locator('#firstname-1669975306869').fill('Test Shreya');
    await page.locator('#lastname-1669976849422').fill('Saini Automation');
    await page.locator('#emailaddress1-1669977007902') .fill('shreya.saini@defactoinfotech.com');
    await page.locator('#mobilephone-1670339972245').fill('+919876543210');
    await page.locator('#description-1764648010159').fill('This is the test record');
    await page.locator('.submitButton').click();
    await expect(page.locator('.onFormSubmittedFeedbackMessage')).toContainText('Thank you for submitting.');
    
});

test('Verify user cannot fill all fields and submit the form', async ({ page }) => {
  await page.locator('#firstname-1669975306869').fill('');
  await page.locator('#lastname-1669976849422').fill('');
  await page.locator('#emailaddress1-1669977007902').fill('');
  await page.locator('#mobilephone-1670339972245').fill('');
  await page.locator('#description-1764648010159').fill('');
  await page.locator('.submitButton').click();

  await expect(page.locator('.onFormSubmittedFeedbackMessage')).toBeHidden({ timeout: 5000 });
  page.close();
});

