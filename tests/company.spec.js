import { test, expect } from '@playwright/test';

test('Verify all Company submenu options are visible on hover', async ({ page }) => {

    // Open website
    await page.goto('https://www.defactoinfotech.com/');

    // Hover on Company menu
    const companyMenu = page.getByRole('link', { name: 'Company' });

    await companyMenu.hover();

    // Scope submenu inside navbar
    const navbar = page.locator('#mainNavbar');

    // Assertions for submenu visibility
    await expect(
        navbar.getByRole('link', { name: 'Overview', exact: true })
    ).toBeVisible();

    await expect(
        navbar.getByRole('link', { name: 'Our approach ', exact: true })
    ).toBeVisible();

    await expect(
        navbar.getByRole('link', { name: 'Our people', exact: true })
    ).toBeVisible();

    await expect(
        navbar.getByRole('link', { name: 'Life at defacto', exact: true })
    ).toBeVisible();

    await expect(
        navbar.getByRole('link', { name: 'Careers', exact: true })
    ).toBeVisible();
    
    console.log('All submenus are visible');
    page.close();
});

const changeGrid = page.getByRole('menuitem', { name: 'Read Only Grid' });
await expect(changeGrid).toBeVisible({ timeout: 120000 });
await changeGrid.click();