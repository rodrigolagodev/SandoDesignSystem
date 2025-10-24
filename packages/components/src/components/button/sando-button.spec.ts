/**
 * E2E Tests for sando-button
 * Example E2E test demonstrating Playwright patterns
 */

import { test, expect } from '@playwright/test';

test.describe('sando-button E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the button component story in Storybook
    // Format: /iframe.html?id={title-kebab-case}--{story-name-kebab-case}
    await page.goto('/iframe.html?id=components-button-overview--default&viewMode=story');

    // Wait for Storybook to load the component
    await page.waitForSelector('sando-button', { state: 'visible', timeout: 10000 });
  });

  test('should render button with default variant', async ({ page }) => {
    const button = page.locator('sando-button').first();
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('variant', 'solid');
  });

  test('should change variant when attribute changes', async ({ page }) => {
    const button = page.locator('sando-button').first();

    // Change variant via setAttribute
    await page.evaluate(() => {
      const btn = document.querySelector('sando-button');
      btn?.setAttribute('variant', 'outline');
    });

    await expect(button).toHaveAttribute('variant', 'outline');
  });

  test('should be clickable when not disabled', async ({ page }) => {
    const button = page.locator('sando-button').first();
    let clickCount = 0;

    // Listen for click events
    await page.exposeFunction('onButtonClick', () => {
      clickCount++;
    });

    await page.evaluate(() => {
      const btn = document.querySelector('sando-button');
      btn?.addEventListener('click', () => {
        (window as any).onButtonClick();
      });
    });

    await button.click();
    expect(clickCount).toBe(1);
  });

  test('should not be clickable when disabled', async ({ page }) => {
    const button = page.locator('sando-button').first();

    // Set disabled
    await page.evaluate(() => {
      const btn = document.querySelector('sando-button');
      btn?.setAttribute('disabled', '');
    });

    let clickCount = 0;
    await page.exposeFunction('onDisabledClick', () => {
      clickCount++;
    });

    await page.evaluate(() => {
      const btn = document.querySelector('sando-button');
      btn?.addEventListener('click', () => {
        (window as any).onDisabledClick();
      });
    });

    await button.click({ force: true });
    expect(clickCount).toBe(0);
  });

  test('should be keyboard accessible', async ({ page }) => {
    const button = page.locator('sando-button').first();

    // Focus the button
    await button.focus();
    await expect(button).toBeFocused();

    // Press Enter
    let clickCount = 0;
    await page.exposeFunction('onEnterPress', () => {
      clickCount++;
    });

    await page.evaluate(() => {
      const btn = document.querySelector('sando-button');
      btn?.addEventListener('click', () => {
        (window as any).onEnterPress();
      });
    });

    await page.keyboard.press('Enter');
    expect(clickCount).toBe(1);
  });

  test('should match visual snapshot', async ({ page }) => {
    const button = page.locator('sando-button').first();
    await expect(button).toHaveScreenshot('button-default.png');
  });

  test('should match visual snapshot for all variants', async ({ page }) => {
    await page.setContent(`
      <div style="display: flex; gap: 1rem; padding: 1rem;">
        <sando-button variant="solid">Solid</sando-button>
        <sando-button variant="outline">Outline</sando-button>
        <sando-button variant="ghost">Ghost</sando-button>
      </div>
    `);

    const container = page.locator('div').first();
    await expect(container).toHaveScreenshot('button-variants.png');
  });

  test('should handle rapid clicks gracefully', async ({ page }) => {
    const button = page.locator('sando-button').first();

    for (let i = 0; i < 10; i++) {
      await button.click();
    }

    // Button should still be functional
    await expect(button).toBeVisible();
  });

  test('should work across different viewport sizes', async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    let button = page.locator('sando-button').first();
    await expect(button).toBeVisible();

    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    button = page.locator('sando-button').first();
    await expect(button).toBeVisible();

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    button = page.locator('sando-button').first();
    await expect(button).toBeVisible();
  });
});
