const { test, expect } = require('@playwright/test');

test.describe('DemoBlaze Login Functionality', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    // Launch the browser and open the URL before each test
    page = await browser.newPage();
    await page.goto('https://www.demoblaze.com/index.html');
  });

  test.afterEach(async () => {
    // Close the browser page after each test
    if (page) {
      await page.close();
    }
  });

  test('User should be able to login successfully with valid credentials', async () => {
    // Step 1: Click on the Login button on the homepage
    await page.click('#login2');
    
    // Step 2: Wait for the login modal to appear
    await page.waitForSelector('#loginModal', { state: 'visible' });

    // Step 3: Enter username
    await page.fill('#loginusername', 'pavanol');

    // Step 4: Enter password
    await page.fill('#loginpassword', 'test@123');

    // Step 5: Click on the Login button inside the popup
    await page.click('#logInBtn');

    // Step 6: Wait for the modal to close (indicating successful login)
    await page.waitForSelector('#logInBtn', { state: 'hidden' });

    // Step 7: Verify that the welcome message contains "Welcome pavanol"
    const welcomeMessage = await page.locator('//a[contains(text(), "Welcome")]').textContent();
    expect(welcomeMessage).toContain('Welcome pavanol');

    // Step 8: Print the page title in the console
    const pageTitle = await page.title();
    console.log(`Page Title: ${pageTitle}`);

    // Additional Assertions to verify successful login
    expect(pageTitle).toBe('STORE');
c
    // Verify that the Logout button is visible (indicating user is logged in)
    const logoutButton = page.locator('#logout2');
    await expect(logoutButton).toBeVisible();
  });
});
