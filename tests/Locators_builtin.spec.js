import {test, expect} from 'playwright/test';

test('locators test', async ({page})=>{

    await page.goto('https://www.demoblaze.com/index.html');
    await page.locator('id=login2').click();     //click on login button
    await page.locator('id=loginusername').fill('testuser');   //Enter user name
    await page.locator('id=loginpassword').fill('testpassword');   //Enter password
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('button', { name: 'Log out' }).click();
    
    await page.close();
});