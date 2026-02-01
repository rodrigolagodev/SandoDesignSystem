/**
 * Accessibility Tests for sando-icon
 * Uses axe-core for WCAG compliance testing
 */

import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { axe, toHaveNoViolations } from 'jest-axe';
import './sando-icon.js';
import type { SandoIcon } from './sando-icon.js';

// Extend expect matchers
expect.extend(toHaveNoViolations);

describe('sando-icon Accessibility', () => {
  describe('semantic icons', () => {
    it('should have no accessibility violations with aria-label', async () => {
      const el = await fixture<SandoIcon>(html`
        <sando-icon name="star" aria-label="Favorite"></sando-icon>
      `);

      // Wait for icon to load
      await new Promise((resolve) => setTimeout(resolve, 100));

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('decorative icons', () => {
    it('should have no accessibility violations when decorative', async () => {
      const el = await fixture<SandoIcon>(html` <sando-icon name="star" decorative></sando-icon> `);

      // Wait for icon to load
      await new Promise((resolve) => setTimeout(resolve, 100));

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('size variants', () => {
    const sizes = ['xs', 'small', 'medium', 'large', 'xl'] as const;

    sizes.forEach((size) => {
      it(`should pass a11y with ${size} size`, async () => {
        const el = await fixture<SandoIcon>(html`
          <sando-icon name="star" size="${size}" aria-label="Star icon"></sando-icon>
        `);

        await new Promise((resolve) => setTimeout(resolve, 100));

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    });
  });

  describe('color variants', () => {
    const colors = ['default', 'muted', 'emphasis', 'brand'] as const;

    colors.forEach((color) => {
      it(`should pass a11y with ${color} color`, async () => {
        const el = await fixture<SandoIcon>(html`
          <sando-icon name="star" color="${color}" aria-label="Star icon"></sando-icon>
        `);

        await new Promise((resolve) => setTimeout(resolve, 100));

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    });
  });

  describe('ARIA attributes', () => {
    it('should have aria-hidden="true" when decorative', async () => {
      const el = await fixture<SandoIcon>(html` <sando-icon name="star" decorative></sando-icon> `);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const wrapper = el.shadowRoot?.querySelector('.icon-wrapper');
      expect(wrapper?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have aria-hidden="false" when not decorative', async () => {
      const el = await fixture<SandoIcon>(html`
        <sando-icon name="star" aria-label="Star"></sando-icon>
      `);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const wrapper = el.shadowRoot?.querySelector('.icon-wrapper');
      expect(wrapper?.getAttribute('aria-hidden')).toBe('false');
    });

    it('should have role="presentation" for decorative icons', async () => {
      const el = await fixture<SandoIcon>(html` <sando-icon name="star" decorative></sando-icon> `);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const wrapper = el.shadowRoot?.querySelector('.icon-wrapper');
      expect(wrapper?.getAttribute('role')).toBe('presentation');
    });

    it('should have role="img" for semantic icons', async () => {
      const el = await fixture<SandoIcon>(html`
        <sando-icon name="star" aria-label="Favorite"></sando-icon>
      `);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const wrapper = el.shadowRoot?.querySelector('.icon-wrapper');
      expect(wrapper?.getAttribute('role')).toBe('img');
    });
  });

  describe('flavors', () => {
    const flavors = ['original', 'strawberry', 'ocean'];

    flavors.forEach((flavor) => {
      it(`should pass a11y with ${flavor} flavor`, async () => {
        const el = await fixture(html`
          <div flavor="${flavor}">
            <sando-icon name="star" aria-label="Star"></sando-icon>
          </div>
        `);

        await new Promise((resolve) => setTimeout(resolve, 100));

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
