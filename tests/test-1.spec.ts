import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://gsgdev.crm6.dynamics.com/main.aspx?appid=57abd610-970f-ef11-9f8a-000d3a79831e&forceUCI=1&pagetype=entitylist&etn=lead');
  const emailField = page.getByRole('textbox', {name: /Enter your email, phone, or/ });
  await emailField.fill('IT@greensquaregroup.au');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#i0118').fill('M/199215298630aq');
  await page.getByRole('button', { name: 'Sign in' }).click();
  const yesBtn = page.getByRole('button', { name: 'Yes' });
  await yesBtn.click();
  const changeGrid = page.getByRole('menuitem', { name: 'Read Only Grid' });
  await changeGrid.click();
  const createNewAccount = page.getByRole('menuitem', { name: 'Create a new Lead record.'});
  await createNewAccount.click();
  await page.getByRole('textbox', { name: 'Topic' }).click();
  await page.getByRole('textbox', { name: 'Topic' }).fill('Test Automation');
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('Shreya');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Saini');
  await page.getByRole('textbox', { name: 'Job Title' }).click();
  await page.getByRole('textbox', { name: 'Job Title' }).fill('QA');
  await page.getByRole('textbox', { name: 'Mobile Phone' }).click();
  await page.getByRole('textbox', { name: 'Mobile Phone' }).fill('78069078690');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('Testqa@gmail.com');
  await page.getByRole('textbox', { name: 'Company' }).click();
  await page.getByRole('textbox', { name: 'Company' }).fill('Defacto');
  await page.getByRole('menuitem', { name: 'Save & Close Save and close' }).click();
  const leadRecord = page.locator('[role="gridcell"]').filter({
  hasText: 'Test Automation'
});
  await leadRecord.first().click();  await page.getByRole('menuitem', { name: 'More commands for Lead' }).click();
  await page.locator('button[aria-label*="More commands"]').click();
  await page.getByRole('menuitem', { name: /Delete/i }).click();
  await page .getByRole('dialog').getByRole('button', { name: 'Delete' }).click();

  await page.close();
});