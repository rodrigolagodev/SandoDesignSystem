/**
 * Accessibility Tests for sando-badge
 * Validates WCAG 2.1 Level AA compliance using axe-core
 *
 * The badge component is a purely informative (non-interactive) label.
 * - Uses role="status" for screen reader announcements
 * - No keyboard interaction required (non-interactive)
 * - Contrast handled via design tokens
 *
 * @see WCAG_COMPLIANCE.toon (WC-CR-R1, WC-CR-R2)
 * @see TEST_COVERAGE.toon (TC-CR-R2)
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-badge.js';
import type { SandoBadge } from './sando-badge.js';

describe('sando-badge Accessibility', () => {
  let element: SandoBadge;

  beforeEach(async () => {
    element = await fixture<SandoBadge>(html`<sando-badge>Test Badge</sando-badge>`);
    await element.updateComplete;
  });

  describe('axe-core Validation', () => {
    describe('Default State', () => {
      it('should have no accessibility violations', async () => {
        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });

    describe('Color Variants', () => {
      it('should have no violations with neutral color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="neutral">Neutral Badge</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with primary color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="primary">Primary Badge</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with success color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="success">Success Badge</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with warning color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="warning">Warning Badge</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with danger color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="danger">Danger Badge</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with info color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="info">Info Badge</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations for all colors (batch)', async () => {
        const colors = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const;

        for (const color of colors) {
          element = await fixture<SandoBadge>(html`
            <sando-badge color=${color}>${color} Badge</sando-badge>
          `);
          await element.updateComplete;

          const results = await axe(element);
          expect(results).toHaveNoViolations();
        }
      });
    });

    describe('Visual Variants', () => {
      it('should have no violations with solid variant', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge variant="solid">Solid Badge</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with soft variant', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge variant="soft">Soft Badge</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with outline variant', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge variant="outline">Outline Badge</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with surface variant', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge variant="surface">Surface Badge</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations for all variants (batch)', async () => {
        const variants = ['solid', 'soft', 'outline', 'surface'] as const;

        for (const variant of variants) {
          element = await fixture<SandoBadge>(html`
            <sando-badge variant=${variant}>${variant} Badge</sando-badge>
          `);
          await element.updateComplete;

          const results = await axe(element);
          expect(results).toHaveNoViolations();
        }
      });
    });

    describe('Size Variants', () => {
      it('should have no violations with small size', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge size="small">Small Badge</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with medium size', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge size="medium">Medium Badge</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with large size', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge size="large">Large Badge</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations for all sizes (batch)', async () => {
        const sizes = ['small', 'medium', 'large'] as const;

        for (const size of sizes) {
          element = await fixture<SandoBadge>(html`
            <sando-badge size=${size}>${size} Badge</sando-badge>
          `);
          await element.updateComplete;

          const results = await axe(element);
          expect(results).toHaveNoViolations();
        }
      });
    });

    describe('Compact Mode', () => {
      it('should have no violations with compact mode', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge compact>Compact Badge</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations with compact mode and all sizes', async () => {
        const sizes = ['small', 'medium', 'large'] as const;

        for (const size of sizes) {
          element = await fixture<SandoBadge>(html`
            <sando-badge size=${size} compact>Compact ${size}</sando-badge>
          `);
          await element.updateComplete;

          const results = await axe(element);
          expect(results).toHaveNoViolations();
        }
      });
    });

    describe('Color × Variant Combinations', () => {
      it('should have no violations for color × variant combinations', async () => {
        // Test a representative subset to keep test time reasonable
        const combinations = [
          { color: 'neutral', variant: 'solid' },
          { color: 'primary', variant: 'soft' },
          { color: 'success', variant: 'outline' },
          { color: 'danger', variant: 'surface' },
          { color: 'info', variant: 'solid' },
          { color: 'warning', variant: 'soft' }
        ] as const;

        for (const { color, variant } of combinations) {
          element = await fixture<SandoBadge>(html`
            <sando-badge color=${color} variant=${variant}>${color} ${variant}</sando-badge>
          `);
          await element.updateComplete;

          const results = await axe(element);
          expect(results).toHaveNoViolations();
        }
      });
    });

    describe('Color Contrast', () => {
      it('should meet color contrast requirements', async () => {
        const results = await axe(element, {
          rules: {
            'color-contrast': { enabled: true }
          }
        });

        expect(results).toHaveNoViolations();
      });

      it('should meet contrast for all colors with solid variant', async () => {
        const colors = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const;

        for (const color of colors) {
          element = await fixture<SandoBadge>(html`
            <sando-badge color=${color} variant="solid">${color}</sando-badge>
          `);
          await element.updateComplete;

          const results = await axe(element, {
            rules: {
              'color-contrast': { enabled: true }
            }
          });

          expect(results).toHaveNoViolations();
        }
      });

      it('should meet contrast for all colors with soft variant', async () => {
        const colors = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const;

        for (const color of colors) {
          element = await fixture<SandoBadge>(html`
            <sando-badge color=${color} variant="soft">${color}</sando-badge>
          `);
          await element.updateComplete;

          const results = await axe(element, {
            rules: {
              'color-contrast': { enabled: true }
            }
          });

          expect(results).toHaveNoViolations();
        }
      });

      it('should meet contrast for all colors with outline variant', async () => {
        const colors = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const;

        for (const color of colors) {
          element = await fixture<SandoBadge>(html`
            <sando-badge color=${color} variant="outline">${color}</sando-badge>
          `);
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
  });

  describe('ARIA Attributes', () => {
    it('should have role="status"', async () => {
      const inner = element.shadowRoot?.querySelector('.badge');
      expect(inner?.getAttribute('role')).toBe('status');
    });

    it('should have role="status" for all color variants', async () => {
      const colors = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const;

      for (const color of colors) {
        element = await fixture<SandoBadge>(html`
          <sando-badge color=${color}>Status</sando-badge>
        `);
        await element.updateComplete;

        const inner = element.shadowRoot?.querySelector('.badge');
        expect(inner?.getAttribute('role')).toBe('status');
      }
    });

    it('should have role="status" for all visual variants', async () => {
      const variants = ['solid', 'soft', 'outline', 'surface'] as const;

      for (const variant of variants) {
        element = await fixture<SandoBadge>(html`
          <sando-badge variant=${variant}>Status</sando-badge>
        `);
        await element.updateComplete;

        const inner = element.shadowRoot?.querySelector('.badge');
        expect(inner?.getAttribute('role')).toBe('status');
      }
    });

    it('should have part="badge" for external styling', async () => {
      const inner = element.shadowRoot?.querySelector('.badge');
      expect(inner?.getAttribute('part')).toBe('badge');
    });
  });

  describe('Non-Interactive Accessibility', () => {
    it('should not be in tab order (non-focusable)', async () => {
      const inner = element.shadowRoot?.querySelector('.badge') as HTMLElement;
      // Span elements are not focusable by default
      expect(inner?.tagName.toLowerCase()).toBe('span');
      expect(inner?.getAttribute('tabindex')).toBeNull();
    });

    it('should use semantic span element', async () => {
      const inner = element.shadowRoot?.querySelector('.badge');
      expect(inner?.tagName.toLowerCase()).toBe('span');
    });

    it('should not have interactive roles', async () => {
      const inner = element.shadowRoot?.querySelector('.badge');
      const role = inner?.getAttribute('role');

      // Should be status, not button/link/etc
      expect(role).toBe('status');
      expect(role).not.toBe('button');
      expect(role).not.toBe('link');
      expect(role).not.toBe('checkbox');
    });
  });

  describe('Screen Reader Support', () => {
    it('should have accessible name from content', async () => {
      element = await fixture<SandoBadge>(html`<sando-badge>Screen Reader Test</sando-badge>`);
      await element.updateComplete;

      const accessibleName = element.textContent?.trim();
      expect(accessibleName).toBe('Screen Reader Test');
    });

    it('should announce as status element', async () => {
      const inner = element.shadowRoot?.querySelector('.badge');
      // role="status" has implicit aria-live="polite"
      expect(inner?.getAttribute('role')).toBe('status');
    });

    it('should preserve content accessibility for complex content', async () => {
      element = await fixture<SandoBadge>(html`
        <sando-badge> <span>Status:</span> Active </sando-badge>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Theme/Flavor Support', () => {
    it('should work with different flavors maintaining accessibility', async () => {
      const flavors = ['original', 'strawberry', 'chocolate'];

      for (const flavor of flavors) {
        element.setAttribute('flavor', flavor);
        await element.updateComplete;

        const results = await axe(element, {
          rules: {
            'color-contrast': { enabled: true }
          }
        });

        expect(results).toHaveNoViolations();
      }
    });

    it('should maintain role when flavor changes', async () => {
      element.setAttribute('flavor', 'strawberry');
      await element.updateComplete;

      const inner = element.shadowRoot?.querySelector('.badge');
      expect(inner?.getAttribute('role')).toBe('status');
    });
  });

  describe('Edge Cases', () => {
    it('should have no violations with empty content', async () => {
      element = await fixture<SandoBadge>(html`<sando-badge></sando-badge>`);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with long content', async () => {
      element = await fixture<SandoBadge>(html`
        <sando-badge>This is a very long badge content that might wrap or overflow</sando-badge>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with special characters', async () => {
      element = await fixture<SandoBadge>(html` <sando-badge>Status: $100+</sando-badge> `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with numeric content', async () => {
      element = await fixture<SandoBadge>(html` <sando-badge>99+</sando-badge> `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  /**
   * Icon Accessibility Tests
   *
   * Semantic icons are automatically displayed for status colors (success, warning, danger, info).
   * Icons are purely decorative and should NOT be announced by screen readers.
   *
   * @see WCAG_COMPLIANCE.toon (WC-AP) - aria-hidden for decorative elements
   */
  describe('Icon Accessibility', () => {
    describe('Decorative Icons', () => {
      it('should render icon with decorative attribute for semantic colors', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="success">Active</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).not.toBeNull();
        expect(icon?.hasAttribute('decorative')).toBe(true);
      });

      it('should have decorative attribute which sets aria-hidden="true" on icon', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="warning">Pending</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).not.toBeNull();

        // The decorative attribute is what makes the icon set aria-hidden="true"
        // We verify the attribute is present - the icon component handles the rest
        expect(icon?.hasAttribute('decorative')).toBe(true);

        // Also verify role="presentation" behavior by checking the decorative property
        expect((icon as any)?.decorative).toBe(true);
      });

      it('should not announce icon to screen readers (text content is sufficient)', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="danger">Error</sando-badge>
        `);
        await element.updateComplete;

        // The badge text "Error" provides all necessary information
        // The icon is visual reinforcement only
        const accessibleName = element.textContent?.trim();
        expect(accessibleName).toBe('Error');

        // Icon should be decorative
        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon?.hasAttribute('decorative')).toBe(true);
      });

      it('should have no violations for all semantic colors with icons', async () => {
        const semanticColors = ['success', 'warning', 'danger', 'info'] as const;

        for (const color of semanticColors) {
          element = await fixture<SandoBadge>(html`
            <sando-badge color=${color}>${color} status</sando-badge>
          `);
          await element.updateComplete;

          // Verify icon is present and decorative
          const icon = element.shadowRoot?.querySelector('sando-icon');
          expect(icon).not.toBeNull();
          expect(icon?.hasAttribute('decorative')).toBe(true);

          // Run axe validation
          const results = await axe(element);
          expect(results).toHaveNoViolations();
        }
      });
    });

    describe('Custom Icons', () => {
      it('should have no violations with custom icon', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge icon="star">Featured</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should render custom icon as decorative', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge icon="heart">Favorite</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).not.toBeNull();
        expect(icon?.hasAttribute('decorative')).toBe(true);
      });

      it('should have no violations with custom icon overriding semantic color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="success" icon="crown">Premium</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon?.getAttribute('name')).toBe('crown');
        expect(icon?.hasAttribute('decorative')).toBe(true);

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should have no violations for custom icons with all variants', async () => {
        const variants = ['solid', 'soft', 'outline', 'surface'] as const;

        for (const variant of variants) {
          element = await fixture<SandoBadge>(html`
            <sando-badge icon="zap" variant=${variant}>Quick</sando-badge>
          `);
          await element.updateComplete;

          const results = await axe(element);
          expect(results).toHaveNoViolations();
        }
      });
    });

    describe('No-Icon Mode', () => {
      it('should have no violations with no-icon attribute', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="success" no-icon>Active</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should not render icon when no-icon is set', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="warning" no-icon>Pending</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeNull();
      });

      it('should have no violations for no-icon with all semantic colors', async () => {
        const semanticColors = ['success', 'warning', 'danger', 'info'] as const;

        for (const color of semanticColors) {
          element = await fixture<SandoBadge>(html`
            <sando-badge color=${color} no-icon>${color} status</sando-badge>
          `);
          await element.updateComplete;

          // Verify no icon present
          const icon = element.shadowRoot?.querySelector('sando-icon');
          expect(icon).toBeNull();

          // Run axe validation
          const results = await axe(element);
          expect(results).toHaveNoViolations();
        }
      });

      it('should maintain accessible name without icon', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="danger" no-icon>Critical Error</sando-badge>
        `);
        await element.updateComplete;

        // Text content still provides accessible name
        const accessibleName = element.textContent?.trim();
        expect(accessibleName).toBe('Critical Error');

        // role="status" should still be present
        const inner = element.shadowRoot?.querySelector('.badge');
        expect(inner?.getAttribute('role')).toBe('status');
      });
    });

    describe('Non-Semantic Colors (No Default Icon)', () => {
      it('should not render icon for neutral color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="neutral">Default</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeNull();

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });

      it('should not render icon for primary color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="primary">Primary</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeNull();

        const results = await axe(element);
        expect(results).toHaveNoViolations();
      });
    });

    describe('Icon with Color Contrast', () => {
      it('should meet contrast requirements with icon for all semantic colors', async () => {
        const semanticColors = ['success', 'warning', 'danger', 'info'] as const;

        for (const color of semanticColors) {
          element = await fixture<SandoBadge>(html`
            <sando-badge color=${color}>${color}</sando-badge>
          `);
          await element.updateComplete;

          const results = await axe(element, {
            rules: {
              'color-contrast': { enabled: true }
            }
          });

          expect(results).toHaveNoViolations();
        }
      });

      it('should meet contrast with custom icon', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge icon="badge" color="primary">Premium</sando-badge>
        `);
        await element.updateComplete;

        const results = await axe(element, {
          rules: {
            'color-contrast': { enabled: true }
          }
        });

        expect(results).toHaveNoViolations();
      });
    });

    describe('Icon × Variant × Color Combinations', () => {
      it('should have no violations for icon with all color × variant combinations', async () => {
        // Test representative subset
        const combinations = [
          { color: 'success', variant: 'solid' },
          { color: 'warning', variant: 'soft' },
          { color: 'danger', variant: 'outline' },
          { color: 'info', variant: 'surface' }
        ] as const;

        for (const { color, variant } of combinations) {
          element = await fixture<SandoBadge>(html`
            <sando-badge color=${color} variant=${variant}>${color} ${variant}</sando-badge>
          `);
          await element.updateComplete;

          // Verify icon is present and decorative
          const icon = element.shadowRoot?.querySelector('sando-icon');
          expect(icon).not.toBeNull();
          expect(icon?.hasAttribute('decorative')).toBe(true);

          // Run axe validation
          const results = await axe(element);
          expect(results).toHaveNoViolations();
        }
      });

      it('should have no violations for custom icon with all variants', async () => {
        const variants = ['solid', 'soft', 'outline', 'surface'] as const;

        for (const variant of variants) {
          element = await fixture<SandoBadge>(html`
            <sando-badge icon="sparkles" variant=${variant}>Special</sando-badge>
          `);
          await element.updateComplete;

          const results = await axe(element);
          expect(results).toHaveNoViolations();
        }
      });
    });
  });
});
