/**
 * Accessibility Tests for sando-button
 * Example accessibility test using axe-core
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { axe, toHaveNoViolations } from 'jest-axe';
import './sando-button.js';
import type { SandoButton } from './sando-button.js';

// Extend expect matchers
expect.extend(toHaveNoViolations);

describe('sando-button Accessibility', () => {
  let element: SandoButton;

  beforeEach(async () => {
    element = await fixture<SandoButton>(html`<sando-button>Click me</sando-button>`);
    await element.updateComplete;
  });

  it('should have no accessibility violations', async () => {
    const results = await axe(element);
    expect(results).toHaveNoViolations();
  });

  it('should have no violations in disabled state', async () => {
    element.disabled = true;
    await element.updateComplete;

    const results = await axe(element);
    expect(results).toHaveNoViolations();
  });

  it('should have no violations in loading state', async () => {
    element.loading = true;
    await element.updateComplete;

    const results = await axe(element);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA labels', async () => {
    await element.updateComplete;
    const button = element.shadowRoot?.querySelector('button');
    expect(button).not.toBeNull();

    // Check for ARIA attributes
    const ariaDisabled = button?.getAttribute('aria-disabled');
    const ariaBusy = button?.getAttribute('aria-busy');

    expect(ariaDisabled).toBe('false');
    expect(ariaBusy).toBe('false');
  });

  it('should have correct role', async () => {
    await element.updateComplete;
    const button = element.shadowRoot?.querySelector('button');
    expect(button).not.toBeNull();
    expect(button?.tagName.toLowerCase()).toBe('button');
  });

  it('should be keyboard navigable', async () => {
    await element.updateComplete;
    const button = element.shadowRoot?.querySelector('button');
    expect(button).not.toBeNull();

    // Should not have tabindex="-1"
    expect(button?.getAttribute('tabindex')).not.toBe('-1');
  });

  it('should have visible focus indicator', async () => {
    await element.updateComplete;
    const button = element.shadowRoot?.querySelector('button');
    expect(button).not.toBeNull();
    button?.focus();

    // Check if focus-visible styles are applied
    const styles = window.getComputedStyle(button!);
    expect(styles.outline).not.toBe('none');
  });

  it('should have sufficient color contrast', async () => {
    // This test would use a color contrast checker
    // For now, we rely on axe-core's color contrast checks
    const results = await axe(element, {
      rules: {
        'color-contrast': { enabled: true }
      }
    });

    expect(results).toHaveNoViolations();
  });

  it('should have accessible name', async () => {
    await element.updateComplete;

    // The accessible name comes from the slotted content, not the shadow DOM button
    const accessibleName = element.textContent?.trim();
    expect(accessibleName).toBe('Click me');
  });

  it('should announce loading state to screen readers', async () => {
    element.loading = true;
    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('button');
    const spinner = element.shadowRoot?.querySelector('.spinner');
    expect(button).not.toBeNull();

    expect(button?.getAttribute('aria-busy')).toBe('true');
    expect(spinner?.getAttribute('aria-label')).toBe('Loading');
  });

  it('should work with different themes maintaining contrast', async () => {
    const flavors = ['original', 'strawberry', 'chocolate'];

    for (const flavor of flavors) {
      element.flavor = flavor;
      await element.updateComplete;

      const results = await axe(element, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    }
  });
});
