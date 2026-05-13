import { test, expect } from '@playwright/test';

test('Homepage test', async ({page})=>{
    await page.goto('https://www.demoblaze.com/index.html');
    const pageTitle=await page.title();
    console.log('Page Title is:', pageTitle);     //print the page title
    await expect(page).toHaveTitle('STORE');
    await page.close();
});


