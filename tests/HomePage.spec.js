import { test, expect } from '@playwright/test';

// test('homepage test', async ({page})=>{
//     await page.goto('https://www.demoblaze.com/index.html');
//     const pageTitle=await page.title();
//     console.log('Page Title is:', pageTitle);     //print the page title
//     await expect(page).toHaveTitle('STORE');
//     await page.close();
// });

test('login positive', async ({page}) => {
    await page.goto('https://www.demoblaze.com/index.html');
    await page.click('#login2');

    await page.locator('id=loginusername').fill('pavanol');   //Enter user name
    await page.locator('id=loginpassword').fill('test@123'); // Replace with actual valid password
    await page.click('button[onclick="logIn()"]');
    await page.waitForTimeout(3000);
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
});

 test('login negative', async ({page}) => {
    await page.goto('https://www.demoblaze.com/index.html');
    await page.click('#login2');
    await page.fill('#loginusername', '#$%^^#@@');
    await page.fill('#loginpassword', '      ');
    await page.click('button[onclick="logIn()"]');
    await page.waitForTimeout(3000);
    await expect(page.locator('.sweet-alert')).toContainText('User does not exist.');
 });

// test('logout', async ({page}) => {
//     await page.goto('https://www.demoblaze.com/index.html');
//     await page.click('#login2');
//     await page.fill('#loginusername', 'John'); // Replace with actual valid username
//     await page.fill('#loginpassword', '123456789'); // Replace with actual valid password
//     await page.click('button[onclick="logIn()"]');
//     await expect(page.locator('#nameofuser')).toContainText('Welcome John');
//     await page.click('#logout2');
//     await page.waitForTimeout(3000);
//     await expect(page.locator('#nameofuser')).not.toBeHidden();
//});
