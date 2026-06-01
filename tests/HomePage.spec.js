import { test, expect } from '@playwright/test';

// Runs before each test
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
});

// Runs after each test
test.afterEach(async ({ page }) => {
    await page.close();
});

// Homepage Test
test('homepage test', async ({ page }) => {
    const pageTitle = await page.title();

    console.log('Page Title is:', pageTitle);

    await expect(page).toHaveTitle('STORE');
});

// Positive Login Test
test('login positive', async ({ page }) => {
    await page.click('#login2');

    await page.waitForSelector('#loginusername');

    await page.fill('#loginusername', 'pavanol');
    await page.fill('#loginpassword', 'test@123');

    await page.click('button[onclick="logIn()"]');

    await expect(page.locator('#nameofuser'))
        .toContainText('Welcome pavanol');
});

// Negative Login Test
test('login negative', async ({ page }) => {
    await page.click('#login2');

    await page.waitForSelector('#loginusername');

    await page.fill('#loginusername', '#$%^^#@@');
    await page.fill('#loginpassword', '      ');

    page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('User does not exist.');
        await dialog.accept();
    });

    await page.click('button[onclick="logIn()"]');
});

// Logout Test
test('logout', async ({ page }) => {
    await page.click('#login2');

    await page.waitForSelector('#loginusername');

    await page.fill('#loginusername', 'John');
    await page.fill('#loginpassword', '123456789');

    await page.click('button[onclick="logIn()"]');

    await expect(page.locator('#nameofuser'))
        .toContainText('Welcome John');

    await page.click('#logout2');

    await expect(page.locator('#login2')).toBeVisible();
});
