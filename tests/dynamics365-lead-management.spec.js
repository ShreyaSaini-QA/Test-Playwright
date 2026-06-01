import { test, expect } from '@playwright/test';

test.describe('Dynamics 365 CRM - Lead Management', () => {
  test('Create and Delete Lead with Assertions', async ({ page }) => {
    // Navigate to CRM URL
    await page.goto('https://gsgdev.crm6.dynamics.com/main.aspx?appid=57abd610-970f-ef11-9f8a-000d3a79831e&forceUCI=1&pagetype=entitylist&etn=lead');
    
    // Login process
    await page.getByRole('textbox', { name: /Enter your email, phone, or/ }).fill('IT@greensquaregroup.au');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.locator('#i0118').fill('M/199215298630aq');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    
    // Wait for page to load - use domcontentloaded instead of networkidle
    // Dynamics 365 has continuous background requests that prevent networkidle
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(15000); // Give CRM time to fully load
    
    // Navigate to Leads view
    await page.getByRole('menuitem', { name: 'Read Only Grid' }).click();
    await page.waitForTimeout(5000);
    
    // Assertion: Verify we're on the Leads page
    await expect(page.locator('[aria-label="Leads"]')).toBeVisible();
    
    // Create a new Lead
    await page.getByRole('menuitem', { name: 'Create a new Lead record.' }).click();
    await page.waitForTimeout(5000);
    
    // Fill in lead details
    await page.getByRole('textbox', { name: 'Topic' }).fill('Test Automation Lead');
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.getByRole('textbox', { name: 'Job Title' }).fill('QA Engineer');
    await page.getByRole('textbox', { name: 'Mobile Phone' }).fill('1234567890');
    await page.getByRole('textbox', { name: 'Email' }).fill('john.doe@test.com');
    await page.getByRole('textbox', { name: 'Company' }).fill('Test Company');
    
    // Save and close the lead - this will return to the grid view
    await page.getByRole('menuitem', { name: 'Save & Close Save and close' }).click();
    
    // Wait for save to complete and grid to reload
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(10000);
    
    // Assertion: Verify the lead was created by checking if it appears in the grid
    const leadRecord = page.locator('[role="gridcell"]').filter({ hasText: 'Test Automation Lead' });
    await expect(leadRecord.first()).toBeVisible({ timeout: 15000 });
    console.log('Lead created successfully: Test Automation Lead');
    
    // Delete the lead
    await leadRecord.first().click();
    await page.waitForTimeout(3000);
    
    // Open more commands and delete
    await page.getByRole('menuitem', { name: 'More commands for Lead' }).click();
    await page.locator('button[aria-label*="More commands"]').click();
    await page.getByRole('menuitem', { name: /Delete/i }).click();
    
    // Confirm deletion
    await page.getByRole('dialog').getByRole('button', { name: 'Delete' }).click();
    
    // Wait for deletion to complete
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(10000);
    
    // Assertion: Verify the lead was deleted
    const deletedLead = page.locator('[role="gridcell"]').filter({ hasText: 'Test Automation Lead' });
    await expect(deletedLead).not.toBeVisible({ timeout: 15000 });
    console.log('Lead deleted successfully: Test Automation Lead');
    
    // Final assertion: Verify we're still on the Leads page
    await expect(page.locator('[aria-label="Leads"]')).toBeVisible();
    
    await page.close();
  });
});