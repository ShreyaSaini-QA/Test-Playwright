import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://login.microsoftonline.com/3dd10068-6f03-4270-b905-8d543685d8fc/oauth2/authorize?client_id=00000007-0000-0000-c000-000000000000&response_type=code%20id_token&scope=openid%20profile&state=OpenIdConnect.AuthenticationProperties%3DMAAAAAjCYc1GSBHxsx8AIkjjZSedHsAnSsRsBJi---e-7948G36Nt1xWIxKdGO1skbILDgEAAAABAAAACS5yZWRpcmVjdCFodHRwczovL2dzZ2Rldi5jcm02LmR5bmFtaWNzLmNvbS8%26ReplyUrl%3DMAAAAAjCYc1GSBHxsx8AIkjjZSe1vMesoYGDtplg87tb5Q%252bT6BwjoO9hK66occkmG0GwXGh0dHBzOi8vbWVsLS1vY2Vjcm1saXZlc2c2MDguY3JtNi5keW5hbWljcy5jb20v%26RedirectTo%3DMAAAAAjCYc1GSBHxsx8AIkjjZSebVdU5OUNEzW85fqSJaf265di5cAVcxqRaLTZs96Rjsmh0dHBzOi8vZ3NnZGV2LmNybTYuZHluYW1pY3MuY29tLw%253d%253d%26RedirectToForMcas%3Dhttps%253a%252f%252fgsgdev.crm6.dynamics.com%252f&response_mode=form_post&nonce=639153668365367905.ZTIyZGEyZWYtM2Q1Zi00ZjBlLWJkNTctOTA1NDJmMWM4Njk4YmEwZDNhMjgtYWQwZC00YmRmLWFhMTAtZGIwMjAyMzg4NWFk&redirect_uri=https%3A%2F%2Fmel--ocecrmlivesg608.crm6.dynamics.com%2F&max_age=86400&claims=%7B%22id_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&x-client-SKU=ID_NET472&x-client-ver=8.14.0.0&sso_reload=true');
  await page.getByRole('textbox', { name: 'Enter your email, phone, or' }).click();
  await page.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill('IT@greensquaregroup.au');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('#i0118').fill('M/199215298630aq');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('checkbox', { name: 'Don\'t show this again' }).check();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.goto(
  'https://gsgdev.crm6.dynamics.com/main.aspx?appid=4c62a223-a10f-ef11-9f8a-000d3a79831e&pagetype=entitylist&etn=lead'
);

  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('menuitem', { name: 'New Create a new Lead record.' }).click();

  await page.getByRole('textbox', { name: 'Topic' }).click();
  await page.getByRole('textbox', { name: 'Topic' }).fill('Test Automation');
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('Shreya');
  await page.getByRole('textbox', { name: 'Last Name' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Saini');
  await page.getByRole('textbox', { name: 'Job Title' }).click();
  await page.getByRole('textbox', { name: 'Job Title' }).fill('Tester');
  await page.getByRole('textbox', { name: 'Company' }).click();
  await page.getByRole('textbox', { name: 'Company' }).fill('Defacto');
  await page.getByRole('menuitem', { name: 'Save (CTRL+S) Save this Lead.' }).click();
  await page.getByRole('button', { name: 'Press Enter to go back.' }).click();
  await page.getByText('Test Automation', { exact: true }).click();
  await page.getByTestId('AcceleratedSales.PCFContainer.AcceleratedSales.ModelFormComponentContainer_Key').getByRole('menuitem', { name: 'More commands for Lead' }).click();
  await page.getByRole('menuitem', { name: 'Delete Delete this Lead. This' }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
});