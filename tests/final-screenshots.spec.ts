import { test } from '@playwright/test';

test.describe('Final Design Screenshots - Day 2', () => {
  test('capture updated homepage with navigation', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('domcontentloaded');
    await page.screenshot({ path: 'obsrvr-screenshots/day2-homepage-with-nav.png', fullPage: true });
  });

  test('capture dropdown menu', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('domcontentloaded');

    // Hover over Products dropdown to show menu
    await page.locator('text=Products').hover();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'obsrvr-screenshots/day2-dropdown-menu.png' });
  });

  test('capture Flow docs with new navigation', async ({ page }) => {
    await page.goto('http://localhost:3000/docs/flow/overview');
    await page.waitForLoadState('domcontentloaded');
    await page.screenshot({ path: 'obsrvr-screenshots/day2-flow-docs.png', fullPage: true });
  });

  test('capture mobile navigation', async ({ page, viewport }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('domcontentloaded');

    // Click hamburger menu
    await page.locator('.navbar__toggle').click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'obsrvr-screenshots/day2-mobile-menu.png' });
  });
});
