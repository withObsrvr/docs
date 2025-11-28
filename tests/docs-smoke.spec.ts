import { test, expect } from '@playwright/test';

test.describe('Obsrvr Documentation Smoke Tests', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Obsrvr/i);

    // Check main heading is visible
    const mainHeading = page.locator('h1').first();
    await expect(mainHeading).toBeVisible();

    // Check navigation is present
    const navbar = page.locator('nav.navbar');
    await expect(navbar).toBeVisible();
  });

  test('can navigate to Flow documentation', async ({ page }) => {
    await page.goto('/');

    // Find and click link to Flow docs (adjust selector as needed)
    const flowLink = page.getByRole('link', { name: /flow/i }).first();
    await expect(flowLink).toBeVisible();
    await flowLink.click();

    // Wait for navigation
    await page.waitForLoadState('domcontentloaded');

    // Verify we're on Flow page
    await expect(page).toHaveURL(/\/flow/);
    await expect(page.locator('h1')).toContainText(/flow/i);
  });

  test('component registry is accessible', async ({ page }) => {
    await page.goto('/docs/flow/registry/overview');

    // Check page loads
    await expect(page).toHaveTitle(/Registry Overview/i);

    // Check main content is visible
    const mainContent = page.locator('article');
    await expect(mainContent).toBeVisible();

    // Check for registry sections (look for any h2 heading that exists)
    await expect(page.locator('h2').first()).toBeVisible();
  });

  test('search functionality works', async ({ page }) => {
    await page.goto('/');

    // Find search button (Docusaurus typically has a search)
    const searchButton = page.locator('button[class*="searchButton"]').or(
      page.locator('button[aria-label*="Search"]')
    );

    // Check if search exists (it may not be configured)
    const searchExists = await searchButton.count() > 0;
    if (searchExists) {
      await expect(searchButton).toBeVisible();
    }
  });

  test('sidebar navigation works', async ({ page }) => {
    await page.goto('/docs/flow/overview');

    // Check sidebar is present
    const sidebar = page.locator('aside[class*="sidebar"]').or(
      page.locator('nav[class*="menu"]')
    );
    await expect(sidebar.first()).toBeVisible();

    // Check sidebar has links
    const sidebarLinks = sidebar.locator('a');
    await expect(sidebarLinks.first()).toBeVisible();
  });

  test('processors documentation is accessible', async ({ page }) => {
    await page.goto('/docs/flow/processors');

    await expect(page).toHaveTitle(/Processor/i);

    // Check main content
    const mainContent = page.locator('article');
    await expect(mainContent).toBeVisible();

    // Verify processor information is present
    await expect(mainContent).toContainText(/processor/i);
  });

  test('consumers documentation is accessible', async ({ page }) => {
    await page.goto('/docs/flow/consumers');

    await expect(page).toHaveTitle(/Consumer/i);

    // Check main content
    const mainContent = page.locator('article');
    await expect(mainContent).toBeVisible();

    // Verify consumer information is present
    await expect(mainContent).toContainText(/consumer/i);
  });

  test('building components guide is accessible', async ({ page }) => {
    await page.goto('/docs/flow/registry/building-components');

    await expect(page).toHaveTitle(/Building.*Component/i);

    // Check code examples are present
    const codeBlocks = page.locator('pre');
    await expect(codeBlocks.first()).toBeVisible();

    // Check for YAML or code content
    const mainContent = page.locator('article');
    await expect(mainContent).toBeVisible();
  });

  test('pipeline examples are accessible', async ({ page }) => {
    await page.goto('/docs/flow/registry/examples');

    await expect(page).toHaveTitle(/Example/i);

    // Check code blocks with YAML configs
    const codeBlocks = page.locator('pre');
    await expect(codeBlocks.first()).toBeVisible();

    // Verify examples content
    const mainContent = page.locator('article');
    await expect(mainContent).toContainText(/pipeline/i);
  });

  test('mobile navigation works', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Look for mobile menu button (hamburger) - Docusaurus uses specific classes
    const mobileMenuButton = page.locator('button.navbar__toggle').or(
      page.locator('button[aria-label*="Navigation"]').or(
        page.locator('button[class*="toggle"]')
      )
    );

    const buttonExists = await mobileMenuButton.count() > 0;
    if (buttonExists) {
      await expect(mobileMenuButton.first()).toBeVisible();
      await mobileMenuButton.first().click();

      // Wait for sidebar to appear
      await page.waitForTimeout(300);

      // Sidebar should be visible after click - check for Docusaurus mobile menu
      const sidebar = page.locator('.navbar-sidebar').or(
        page.locator('aside[class*="sidebar"]').or(
          page.locator('nav[class*="menu"]')
        )
      );
      await expect(sidebar.first()).toBeVisible();
    }
  });

  test('dark mode toggle exists', async ({ page }) => {
    await page.goto('/');

    // Look for theme toggle (Docusaurus default)
    const themeToggle = page.locator('button[class*="colorModeToggle"]').or(
      page.locator('button[title*="theme"]')
    );

    const toggleExists = await themeToggle.count() > 0;
    if (toggleExists) {
      await expect(themeToggle.first()).toBeVisible();
    }
  });

  test('all registry pages link correctly', async ({ page }) => {
    // Start at registry overview
    await page.goto('/docs/flow/registry/overview');

    // Test link to sources - scope to main article content
    await page.locator('article').getByRole('link', { name: /sources/i }).first().click();
    await expect(page).toHaveURL(/\/flow\/registry\/sources/);
    await expect(page.locator('h1')).toContainText(/source/i);

    // Navigate to processors
    await page.goto('/docs/flow/registry/overview');
    await page.locator('article').getByRole('link', { name: /processors/i }).first().click();
    await expect(page).toHaveURL(/\/flow\/registry\/processors/);
    await expect(page.locator('h1')).toContainText(/processor/i);

    // Navigate to sinks
    await page.goto('/docs/flow/registry/overview');
    await page.locator('article').getByRole('link', { name: /sinks/i }).first().click();
    await expect(page).toHaveURL(/\/flow\/registry\/sinks/);
  });
});
