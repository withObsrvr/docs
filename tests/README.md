# Playwright Tests for Obsrvr Documentation

This directory contains end-to-end tests for the Obsrvr documentation site using Playwright.

## Setup

### Prerequisites

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Install Playwright browsers (if not using Nix):**
   ```bash
   yarn playwright install
   ```

### Using Nix Development Shell

If you're using the Nix development environment (recommended), Playwright runtime dependencies are automatically configured:

```bash
# Enter the Nix shell
nix develop

# Dependencies are automatically available
yarn test
```

## Running Tests

### Run all tests (headless)
```bash
yarn test
```

### Run tests with browser UI visible
```bash
yarn test:headed
```

### Run tests in interactive UI mode
```bash
yarn test:ui
```

### Run specific test file
```bash
yarn playwright test tests/docs-smoke.spec.ts
```

### Run specific browser
```bash
yarn playwright test --project=chromium
yarn playwright test --project=firefox
yarn playwright test --project=webkit
```

### Run tests against production build
```bash
# Build the site first
yarn build

# The test suite will automatically start the server
yarn test
```

### Run tests against live site
```bash
DOCS_URL=https://docs.withobsrvr.com yarn test
```

## Test Reports

After running tests, view the HTML report:

```bash
yarn playwright show-report
```

Test results and artifacts are stored in:
- `test-results/` - Screenshots, videos, traces
- `playwright-report/` - HTML test report

## Writing Tests

### Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/path');

    // Assertions
    await expect(page).toHaveTitle(/Expected Title/);
    await expect(page.locator('selector')).toBeVisible();
  });
});
```

### Best Practices

1. **Use semantic selectors:**
   ```typescript
   // Good
   page.getByRole('button', { name: 'Submit' })
   page.getByText('Welcome')

   // Avoid
   page.locator('.btn-primary')
   ```

2. **Wait for elements properly:**
   ```typescript
   // Wait for visibility
   await expect(page.locator('h1')).toBeVisible();

   // Wait for network
   await page.waitForLoadState('domcontentloaded');
   ```

3. **Keep tests independent:**
   - Each test should be able to run in isolation
   - Don't rely on execution order
   - Clean up after tests if needed

4. **Use descriptive test names:**
   ```typescript
   test('user can navigate to Flow documentation from homepage')
   ```

## Configuration

Edit `playwright.config.ts` to customize:

- Test timeout
- Retry strategy
- Browsers to test
- Viewport sizes
- Video/screenshot capture settings
- Web server configuration

## Environment Variables

- `DOCS_URL` - Base URL for testing (default: `http://localhost:3000`)
- `CI` - Set to enable CI mode (more retries, no server reuse)

## Debugging Tests

### Debug mode
```bash
yarn playwright test --debug
```

### Show trace viewer
```bash
yarn playwright show-trace test-results/path-to-trace.zip
```

### Pause tests
```typescript
test('my test', async ({ page }) => {
  await page.pause(); // Pauses test execution
});
```

## CI/CD Integration

The Playwright configuration automatically:
- Starts the web server before tests
- Retries failed tests in CI mode
- Captures videos and traces on failure
- Generates HTML reports

Add to your CI workflow:
```yaml
- name: Install dependencies
  run: yarn install

- name: Build site
  run: yarn build

- name: Run Playwright tests
  run: yarn test
  env:
    CI: true

- name: Upload test artifacts
  if: failure()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Troubleshooting

### "Browser not found" error
```bash
# Install browsers
yarn playwright install
```

### "Cannot connect to server" error
```bash
# Make sure the site is built
yarn build

# Or start dev server manually
yarn start
```

### Tests fail with library errors (Linux)
Make sure you're using the Nix development shell which provides all runtime dependencies:
```bash
nix develop
yarn test
```

## Test Coverage

Current test suites:
- **docs-smoke.spec.ts** - Smoke tests covering core documentation pages and navigation

Add more test files as needed:
- `tests/flow-*.spec.ts` - Flow-specific tests
- `tests/registry-*.spec.ts` - Component registry tests
- `tests/accessibility.spec.ts` - Accessibility tests
- `tests/mobile.spec.ts` - Mobile-specific tests

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Debugging Guide](https://playwright.dev/docs/debug)
