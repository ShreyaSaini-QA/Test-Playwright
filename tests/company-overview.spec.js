import { test, expect } from '@playwright/test';

const COMPANY_OVERVIEW_URL = 'https://www.defactoinfotech.com/company-overview/';

test.describe('Company Overview page UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(COMPANY_OVERVIEW_URL);
  });

  test('should load the company overview page', async ({ page }) => {
    await expect(page).toHaveTitle('De Facto Infotech Company Overview - Microsoft Digital Growth');
    await expect( page.getByText('Empowering growth through Microsoft')).toBeVisible();
  });

  test('should display the key content sections', async ({ page }) => {
    await expect(page.getByText('Our history')).toBeVisible() ;
    await expect(page.getByText('Our core values')).toBeVisible();
    await expect(page.getByText('What our clients say about us')).toBeVisible();
    await expect(page.getByText('Get a free assessment of your current systems and processes')).toBeVisible();
  });

  test('should show the company values cards', async ({ page }) => {
    await expect(page.getByText('Be passionate & determined')).toBeVisible();
    await expect(page.getByText('Work hard' )).toBeVisible();
    await expect(page.getByText('Be kind & understanding' )).toBeVisible();
    await expect(page.getByText('What We Do – We are fully committed.' )).toBeVisible();
  });

  test('should display client testimonial content', async ({ page }) => {
    await expect(page.getByText('Defacto infotech didn\'t just implement Dynamics 365; they re-engineered our entire sales workflow.')).toBeVisible();
    await expect(page.getByText('Our implementation was smooth, and their ongoing support has been exceptional.')).toBeVisible();
    await expect(page.getByText('Ready to transform?')).toBeVisible();
    
  });

  test('should include the free assessment CTA and contact links', async ({ page }) => {
    await expect(page.locator('text=Schedule your free consultation')).toBeVisible();
    await expect(page.locator('a:has-text("Customer Self-Service")')).toHaveAttribute('href', 'https://support-defactoinfotech.powerappsportals.com/');
    await expect(page.locator('a:has-text("tel:415-825-2240")')).toHaveAttribute('href', 'tel:415-825-2240');
  });

  test('should render the footer contact offices and company nav links', async ({ page }) => {
    await expect(page.locator('text=India (HQ)')).toBeVisible();
    await expect(page.locator('text=Singapore')).toBeVisible();
    await expect(page.locator('a:has-text("Our approach")')).toHaveAttribute('href', 'https://www.defactoinfotech.com/company-approach');
    await expect(page.locator('a:has-text("Our people")')).toHaveAttribute('href', 'https://www.defactoinfotech.com/our-people');
    await expect(page.locator('a:has-text("Careers")')).toHaveAttribute('href', 'https://www.defactoinfotech.com/career');
  });

  test('should have a working Book a meeting CTA', async ({ page }) => {
    const meetingHref = await page.locator('a:has-text("Book a meeting")').first().getAttribute('href');
    await expect(meetingHref).toContain('outlook.office365.com');
  });
});
