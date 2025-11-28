import { test } from '@playwright/test';

test.describe('Stripe Documentation Analysis', () => {
  test('capture Stripe docs homepage', async ({ page }) => {
    await page.goto('https://docs.stripe.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000); // Wait for rendering

    // Full page screenshot
    await page.screenshot({
      path: 'stripe-screenshots/homepage-full.png',
      fullPage: true
    });

    // Above the fold
    await page.screenshot({
      path: 'stripe-screenshots/homepage-hero.png',
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    });
  });

  test('capture Stripe API reference', async ({ page }) => {
    await page.goto('https://docs.stripe.com/api', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    await page.screenshot({
      path: 'stripe-screenshots/api-reference-full.png',
      fullPage: true
    });

    // Navigation and sidebar
    await page.screenshot({
      path: 'stripe-screenshots/api-navigation.png',
      clip: { x: 0, y: 0, width: 400, height: 1000 }
    });
  });

  test('capture Stripe guides', async ({ page }) => {
    await page.goto('https://docs.stripe.com/payments/accept-a-payment', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    await page.screenshot({
      path: 'stripe-screenshots/guide-full.png',
      fullPage: true
    });

    // Content area
    await page.screenshot({
      path: 'stripe-screenshots/guide-content.png',
      clip: { x: 300, y: 0, width: 900, height: 1200 }
    });
  });

  test('capture Stripe code examples', async ({ page }) => {
    await page.goto('https://docs.stripe.com/checkout/quickstart', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000);

    await page.screenshot({
      path: 'stripe-screenshots/code-examples.png',
      fullPage: true
    });
  });

  test('capture Stripe search', async ({ page }) => {
    await page.goto('https://docs.stripe.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Click search if there's a search button
    const searchButton = page.locator('[data-test="search-button"]').or(
      page.locator('button[aria-label*="Search"]').or(
        page.locator('[placeholder*="Search"]')
      )
    );

    const hasSearch = await searchButton.count() > 0;
    if (hasSearch) {
      await searchButton.first().click();
      await page.waitForTimeout(1000);

      await page.screenshot({
        path: 'stripe-screenshots/search-modal.png'
      });
    }
  });

  test('capture Stripe mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('https://docs.stripe.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: 'stripe-screenshots/mobile-homepage.png',
      fullPage: true
    });

    // Try to open mobile menu
    const menuButton = page.locator('button[aria-label*="menu"]').or(
      page.locator('button.mobile-menu').or(
        page.locator('[data-test="mobile-menu"]')
      )
    );

    const hasMenu = await menuButton.count() > 0;
    if (hasMenu) {
      await menuButton.first().click();
      await page.waitForTimeout(500);

      await page.screenshot({
        path: 'stripe-screenshots/mobile-menu.png'
      });
    }
  });

  test('capture Stripe dark mode', async ({ page }) => {
    await page.goto('https://docs.stripe.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // Try to toggle dark mode
    const darkModeToggle = page.locator('[data-test="theme-toggle"]').or(
      page.locator('button[aria-label*="theme"]').or(
        page.locator('button[aria-label*="Dark"]')
      )
    );

    const hasToggle = await darkModeToggle.count() > 0;
    if (hasToggle) {
      await darkModeToggle.first().click();
      await page.waitForTimeout(500);

      await page.screenshot({
        path: 'stripe-screenshots/dark-mode.png',
        fullPage: true
      });
    }
  });
});
