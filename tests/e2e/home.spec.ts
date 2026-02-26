import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('region', { name: 'Hero section' })).toBeVisible();
    await expect(page.getByText('Mitchell')).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    const aboutLink = page.getByRole('link', { name: 'About' }).first();
    await expect(aboutLink).toBeVisible();
  });

  test('should display CTA buttons in hero', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Send Mitchell an email' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Visit Mitchell's LinkedIn profile/i })).toBeVisible();
  });

  test('should have proper page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Mitchell Martinez/);
  });
});
