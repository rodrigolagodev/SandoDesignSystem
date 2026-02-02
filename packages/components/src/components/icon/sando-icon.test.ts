/**
 * Unit Tests for sando-icon
 * Tests icon rendering, variants, and accessibility
 */

import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './sando-icon.js';
import type { SandoIcon } from './sando-icon.js';

describe('sando-icon', () => {
  let element: SandoIcon;

  describe('Rendering', () => {
    it('should render with required name prop', async () => {
      element = await fixture<SandoIcon>(html`<sando-icon name="star"></sando-icon>`);
      await element.updateComplete;

      expect(element).toBeDefined();
      expect(element.name).toBe('star');
    });

    it('should render with default properties', async () => {
      element = await fixture<SandoIcon>(html`<sando-icon name="star"></sando-icon>`);
      await element.updateComplete;

      expect(element.size).toBe('medium');
      expect(element.color).toBe('default');
      expect(element.decorative).toBe(false);
      expect(element.flipHorizontal).toBe(false);
      expect(element.flipVertical).toBe(false);
      expect(element.rotate).toBe(0);
      expect(element.strokeWidth).toBe(2);
    });

    it('should show error for invalid icon name', async () => {
      element = await fixture<SandoIcon>(
        html`<sando-icon name="invalid-icon-name-xyz"></sando-icon>`
      );
      await element.updateComplete;

      const errorSpan = element.shadowRoot?.querySelector('.error');
      expect(errorSpan).toBeTruthy();
    });
  });

  describe('Size Variants', () => {
    const sizes = ['xs', 'small', 'medium', 'large', 'xl'] as const;

    sizes.forEach((size) => {
      it(`should apply ${size} size`, async () => {
        element = await fixture<SandoIcon>(
          html`<sando-icon name="star" size="${size}"></sando-icon>`
        );
        await element.updateComplete;

        expect(element.size).toBe(size);
        expect(element.getAttribute('size')).toBe(size);
      });
    });
  });

  describe('Color Variants', () => {
    const colors = ['default', 'muted', 'emphasis', 'brand', 'onSolid'] as const;

    colors.forEach((color) => {
      it(`should apply ${color} color`, async () => {
        element = await fixture<SandoIcon>(
          html`<sando-icon name="star" color="${color}"></sando-icon>`
        );
        await element.updateComplete;

        expect(element.color).toBe(color);
        expect(element.getAttribute('color')).toBe(color);
      });
    });
  });

  describe('Custom Overrides', () => {
    it('should apply custom color', async () => {
      element = await fixture<SandoIcon>(
        html`<sando-icon name="star" custom-color="#ff0000"></sando-icon>`
      );
      await element.updateComplete;

      expect(element.customColor).toBe('#ff0000');
    });

    it('should apply custom size', async () => {
      element = await fixture<SandoIcon>(
        html`<sando-icon name="star" custom-size="3rem"></sando-icon>`
      );
      await element.updateComplete;

      expect(element.customSize).toBe('3rem');
    });
  });

  describe('Transformations', () => {
    it('should apply horizontal flip', async () => {
      element = await fixture<SandoIcon>(
        html`<sando-icon name="arrow-right" flip-horizontal></sando-icon>`
      );
      await element.updateComplete;

      expect(element.flipHorizontal).toBe(true);
      expect(element.hasAttribute('flip-horizontal')).toBe(true);
    });

    it('should apply vertical flip', async () => {
      element = await fixture<SandoIcon>(
        html`<sando-icon name="arrow-down" flip-vertical></sando-icon>`
      );
      await element.updateComplete;

      expect(element.flipVertical).toBe(true);
      expect(element.hasAttribute('flip-vertical')).toBe(true);
    });

    it('should apply rotation', async () => {
      element = await fixture<SandoIcon>(
        html`<sando-icon name="arrow-right" rotate="90"></sando-icon>`
      );
      await element.updateComplete;

      expect(element.rotate).toBe(90);
      expect(element.getAttribute('rotate')).toBe('90');
    });
  });

  describe('Stroke Width', () => {
    it('should apply custom stroke width', async () => {
      element = await fixture<SandoIcon>(
        html`<sando-icon name="star" stroke-width="3"></sando-icon>`
      );
      await element.updateComplete;

      expect(element.strokeWidth).toBe(3);
    });
  });

  describe('Color Inheritance', () => {
    it('should inherit color from parent when inherit-color is set', async () => {
      element = await fixture<SandoIcon>(html`<sando-icon name="star" inherit-color></sando-icon>`);
      await element.updateComplete;

      expect(element.inheritColor).toBe(true);
      expect(element.hasAttribute('inherit-color')).toBe(true);
    });
  });

  describe('Events', () => {
    it('should fire icon-load event on successful load', async () => {
      let loadEvent: CustomEvent | null = null;

      element = await fixture<SandoIcon>(html`
        <sando-icon
          name="star"
          @icon-load=${(e: CustomEvent) => {
            loadEvent = e;
          }}
        ></sando-icon>
      `);

      // Wait for icon to load
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(loadEvent).toBeTruthy();
      expect(loadEvent!.detail.iconName).toBe('star');
      expect(loadEvent!.detail.success).toBe(true);
    });

    it('should fire icon-error event on failed load', async () => {
      let errorEvent: CustomEvent | null = null;

      element = await fixture<SandoIcon>(html`
        <sando-icon
          name="invalid-icon-xyz"
          @icon-error=${(e: CustomEvent) => {
            errorEvent = e;
          }}
        ></sando-icon>
      `);

      // Wait for error
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(errorEvent).toBeTruthy();
      expect(errorEvent!.detail.iconName).toBe('invalid-icon-xyz');
      expect(errorEvent!.detail.error).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have role="img" for semantic icons', async () => {
      element = await fixture<SandoIcon>(
        html`<sando-icon name="star" aria-label="Favorite"></sando-icon>`
      );
      await element.updateComplete;

      // Wait for icon to load
      await new Promise((resolve) => setTimeout(resolve, 100));

      const wrapper = element.shadowRoot?.querySelector('.icon-wrapper');
      expect(wrapper?.getAttribute('role')).toBe('img');
      expect(wrapper?.getAttribute('aria-hidden')).toBe('false');
    });

    it('should have role="presentation" for decorative icons', async () => {
      element = await fixture<SandoIcon>(html`<sando-icon name="star" decorative></sando-icon>`);
      await element.updateComplete;

      // Wait for icon to load
      await new Promise((resolve) => setTimeout(resolve, 100));

      const wrapper = element.shadowRoot?.querySelector('.icon-wrapper');
      expect(wrapper?.getAttribute('role')).toBe('presentation');
      expect(wrapper?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should use aria-label when provided', async () => {
      element = await fixture<SandoIcon>(
        html`<sando-icon name="star" aria-label="Add to favorites"></sando-icon>`
      );
      await element.updateComplete;

      // Wait for icon to load
      await new Promise((resolve) => setTimeout(resolve, 100));

      const wrapper = element.shadowRoot?.querySelector('.icon-wrapper');
      expect(wrapper?.getAttribute('aria-label')).toBe('Add to favorites');
    });

    it('should use icon name as fallback aria-label for non-decorative icons', async () => {
      element = await fixture<SandoIcon>(html`<sando-icon name="star"></sando-icon>`);
      await element.updateComplete;

      // Wait for icon to load
      await new Promise((resolve) => setTimeout(resolve, 100));

      const wrapper = element.shadowRoot?.querySelector('.icon-wrapper');
      expect(wrapper?.getAttribute('aria-label')).toBe('star');
    });
  });

  describe('Flavor System', () => {
    it('should inherit flavor from ancestor', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div flavor="strawberry">
          <sando-icon name="star"></sando-icon>
        </div>
      `);

      element = container.querySelector('sando-icon') as SandoIcon;
      await element.updateComplete;

      expect(element.effectiveFlavor).toBe('strawberry');
    });

    it('should allow explicit flavor override', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div flavor="strawberry">
          <sando-icon name="star" flavor="tonkatsu"></sando-icon>
        </div>
      `);

      element = container.querySelector('sando-icon') as SandoIcon;
      await element.updateComplete;

      expect(element.flavor).toBe('tonkatsu');
    });
  });
});
