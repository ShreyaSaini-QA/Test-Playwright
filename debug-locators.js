const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.defactoinfotech.com/', { waitUntil: 'load', timeout: 120000 });
  console.log('title:', await page.title());
  console.log('before submit count:', await page.locator('.onFormSubmittedFeedbackMessage').count());
  console.log('submit button count:', await page.locator('.submitButton').count());
  if (await page.locator('.submitButton').count() > 0) {
    await page.locator('.submitButton').click();
    await page.waitForTimeout(5000);
    console.log('after submit count:', await page.locator('.onFormSubmittedFeedbackMessage').count());
    console.log('visible after click:', await page.locator('.onFormSubmittedFeedbackMessage').isVisible().catch(() => false));
  }
  await browser.close();
})();
