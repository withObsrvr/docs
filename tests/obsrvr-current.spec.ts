import { test } from '@playwright/test';

test.describe('Obsrvr Docs Current State', () => {
  test('capture Obsrvr homepage', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'obsrvr-screenshots/homepage-full.png',
      fullPage: true
    });

    await page.screenshot({
      path: 'obsrvr-screenshots/homepage-hero.png',
      clip: { x: 0, y: 0, width: 1280, height: 800 }
    });
  });

  test('capture Flow docs', async ({ page }) => {
    await page.goto('/docs/flow/overview');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'obsrvr-screenshots/flow-overview.png',
      fullPage: true
    });

    // Navigation
    await page.screenshot({
      path: 'obsrvr-screenshots/sidebar-navigation.png',
      clip: { x: 0, y: 0, width: 300, height: 1000 }
    });
  });

  test('capture registry page', async ({ page }) => {
    await page.goto('/docs/flow/registry/overview');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'obsrvr-screenshots/registry-overview.png',
      fullPage: true
    });
  });

  test('capture code examples', async ({ page }) => {
    await page.goto('/docs/flow/registry/building-components');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'obsrvr-screenshots/code-examples.png',
      fullPage: true
    });
  });

  test('capture mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'obsrvr-screenshots/mobile-homepage.png',
      fullPage: true
    });
  });
});
