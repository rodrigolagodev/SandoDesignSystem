/**
 * Unit Tests for sando-badge
 * Tests rendering, properties, slots, and edge cases
 *
 * NOTE: The badge component is a purely informative (non-interactive) label.
 * - No click handlers, no hover states, no removable feature
 * - Uses role="status" for accessibility
 * - Supports semantic colors: neutral, primary, success, warning, danger, info
 * - Supports visual variants: solid, soft, outline, surface
 * - Supports sizes: sm, md, lg
 * - Supports compact mode for tight spaces
 *
 * @see TESTING_STRATEGY.toon (TST-CR-R1, TST-CR-R2)
 * @see WCAG_COMPLIANCE.toon (WC-CR-R1)
 */

import { fixture, html, expect as expectWc } from '@open-wc/testing';
import './sando-badge.js';
import type { SandoBadge } from './sando-badge.js';

describe('sando-badge', () => {
  let element: SandoBadge;

  beforeEach(async () => {
    element = await fixture<SandoBadge>(html`<sando-badge>Test Badge</sando-badge>`);
  });

  describe('Rendering', () => {
    it('should render with default properties', () => {
      expect(element).toBeDefined();
      expect(element.color).toBe('neutral');
      expect(element.variant).toBe('solid');
      expect(element.size).toBe('md');
      expect(element.compact).toBe(false);
    });

    it('should render slot content', () => {
      expect(element.textContent?.trim()).toBe('Test Badge');
    });

    it('should render shadow DOM', () => {
      expect(element.shadowRoot).toBeDefined();
    });

    it('should be accessible', async () => {
      await expectWc(element).to.be.accessible();
    });

    it('should render as span element (non-interactive)', async () => {
      const inner = element.shadowRoot?.querySelector('.badge');
      expect(inner?.tagName.toLowerCase()).toBe('span');
    });

    it('should render with each color variant', async () => {
      const colors = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const;

      for (const color of colors) {
        element = await fixture<SandoBadge>(html`
          <sando-badge color=${color}>Badge</sando-badge>
        `);
        expect(element.color).toBe(color);
        expect(element.getAttribute('color')).toBe(color);
      }
    });

    it('should render with each visual variant', async () => {
      const variants = ['solid', 'soft', 'outline', 'surface'] as const;

      for (const variant of variants) {
        element = await fixture<SandoBadge>(html`
          <sando-badge variant=${variant}>Badge</sando-badge>
        `);
        expect(element.variant).toBe(variant);
        expect(element.getAttribute('variant')).toBe(variant);
      }
    });

    it('should render with each size', async () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      for (const size of sizes) {
        element = await fixture<SandoBadge>(html` <sando-badge size=${size}>Badge</sando-badge> `);
        expect(element.size).toBe(size);
        expect(element.getAttribute('size')).toBe(size);
      }
    });
  });

  describe('Properties - Color', () => {
    it('should apply neutral color by default', () => {
      expect(element.color).toBe('neutral');
      expect(element.getAttribute('color')).toBe('neutral');
    });

    it('should update color to primary', async () => {
      element.color = 'primary';
      await element.updateComplete;
      expect(element.color).toBe('primary');
      expect(element.getAttribute('color')).toBe('primary');
    });

    it('should update color to success', async () => {
      element.color = 'success';
      await element.updateComplete;
      expect(element.color).toBe('success');
      expect(element.getAttribute('color')).toBe('success');
    });

    it('should update color to warning', async () => {
      element.color = 'warning';
      await element.updateComplete;
      expect(element.color).toBe('warning');
      expect(element.getAttribute('color')).toBe('warning');
    });

    it('should update color to danger', async () => {
      element.color = 'danger';
      await element.updateComplete;
      expect(element.color).toBe('danger');
      expect(element.getAttribute('color')).toBe('danger');
    });

    it('should update color to info', async () => {
      element.color = 'info';
      await element.updateComplete;
      expect(element.color).toBe('info');
      expect(element.getAttribute('color')).toBe('info');
    });

    it('should reflect color attribute to property', async () => {
      element.setAttribute('color', 'success');
      await element.updateComplete;
      expect(element.color).toBe('success');
    });
  });

  describe('Properties - Variant', () => {
    it('should apply solid variant by default', () => {
      expect(element.variant).toBe('solid');
      expect(element.getAttribute('variant')).toBe('solid');
    });

    it('should update variant to soft', async () => {
      element.variant = 'soft';
      await element.updateComplete;
      expect(element.variant).toBe('soft');
      expect(element.getAttribute('variant')).toBe('soft');
    });

    it('should update variant to outline', async () => {
      element.variant = 'outline';
      await element.updateComplete;
      expect(element.variant).toBe('outline');
      expect(element.getAttribute('variant')).toBe('outline');
    });

    it('should update variant to surface', async () => {
      element.variant = 'surface';
      await element.updateComplete;
      expect(element.variant).toBe('surface');
      expect(element.getAttribute('variant')).toBe('surface');
    });

    it('should reflect variant attribute to property', async () => {
      element.setAttribute('variant', 'outline');
      await element.updateComplete;
      expect(element.variant).toBe('outline');
    });
  });

  describe('Properties - Size', () => {
    it('should apply md size by default', () => {
      expect(element.size).toBe('md');
      expect(element.getAttribute('size')).toBe('md');
    });

    it('should update size to sm', async () => {
      element.size = 'sm';
      await element.updateComplete;
      expect(element.size).toBe('sm');
      expect(element.getAttribute('size')).toBe('sm');
    });

    it('should update size to lg', async () => {
      element.size = 'lg';
      await element.updateComplete;
      expect(element.size).toBe('lg');
      expect(element.getAttribute('size')).toBe('lg');
    });

    it('should reflect size attribute to property', async () => {
      element.setAttribute('size', 'sm');
      await element.updateComplete;
      expect(element.size).toBe('sm');
    });
  });

  describe('Properties - Compact', () => {
    it('should not be compact by default', () => {
      expect(element.compact).toBe(false);
      expect(element.hasAttribute('compact')).toBe(false);
    });

    it('should update compact property', async () => {
      element.compact = true;
      await element.updateComplete;
      expect(element.compact).toBe(true);
      expect(element.hasAttribute('compact')).toBe(true);
    });

    it('should reflect compact attribute', async () => {
      element.setAttribute('compact', '');
      await element.updateComplete;
      expect(element.compact).toBe(true);
    });

    it('should work with all sizes when compact', async () => {
      const sizes = ['sm', 'md', 'lg'] as const;

      for (const size of sizes) {
        element = await fixture<SandoBadge>(html`
          <sando-badge size=${size} compact>Compact Badge</sando-badge>
        `);
        expect(element.size).toBe(size);
        expect(element.compact).toBe(true);
      }
    });
  });

  describe('Slots', () => {
    it('should render default slot content', async () => {
      element = await fixture<SandoBadge>(html`<sando-badge>Slot Content</sando-badge>`);
      expect(element.textContent?.trim()).toBe('Slot Content');
    });

    it('should render complex slot content', async () => {
      element = await fixture<SandoBadge>(html`
        <sando-badge> <span>Complex</span> Content </sando-badge>
      `);
      expect(element.textContent?.trim()).toContain('Complex');
      expect(element.textContent?.trim()).toContain('Content');
    });
  });

  describe('Accessibility Attributes', () => {
    it('should have role="status"', async () => {
      const inner = element.shadowRoot?.querySelector('.badge');
      expect(inner?.getAttribute('role')).toBe('status');
    });

    it('should have part="badge" for styling', async () => {
      const inner = element.shadowRoot?.querySelector('.badge');
      expect(inner?.getAttribute('part')).toBe('badge');
    });

    it('should maintain role="status" for all color variants', async () => {
      const colors = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const;

      for (const color of colors) {
        element = await fixture<SandoBadge>(html`
          <sando-badge color=${color}>Status Badge</sando-badge>
        `);
        const inner = element.shadowRoot?.querySelector('.badge');
        expect(inner?.getAttribute('role')).toBe('status');
      }
    });

    it('should maintain role="status" for all visual variants', async () => {
      const variants = ['solid', 'soft', 'outline', 'surface'] as const;

      for (const variant of variants) {
        element = await fixture<SandoBadge>(html`
          <sando-badge variant=${variant}>Status Badge</sando-badge>
        `);
        const inner = element.shadowRoot?.querySelector('.badge');
        expect(inner?.getAttribute('role')).toBe('status');
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty content gracefully', async () => {
      element = await fixture<SandoBadge>(html`<sando-badge></sando-badge>`);
      expect(element).toBeDefined();
      expect(element.shadowRoot).toBeDefined();
    });

    it('should handle long content', async () => {
      element = await fixture<SandoBadge>(html`
        <sando-badge>This is a very long badge content that might overflow</sando-badge>
      `);
      expect(element).toBeDefined();
      expect(element.textContent?.trim()).toContain('This is a very long badge');
    });

    it('should handle dynamic content updates', async () => {
      element = await fixture<SandoBadge>(html`<sando-badge>Initial</sando-badge>`);
      expect(element.textContent?.trim()).toBe('Initial');

      // Update content
      element.textContent = 'Updated';
      await element.updateComplete;
      expect(element.textContent?.trim()).toBe('Updated');
    });

    it('should handle dynamic property changes', async () => {
      // Start with defaults
      expect(element.color).toBe('neutral');
      expect(element.variant).toBe('solid');
      expect(element.size).toBe('md');

      // Update all properties
      element.color = 'success';
      element.variant = 'outline';
      element.size = 'sm';
      element.compact = true;
      await element.updateComplete;

      expect(element.color).toBe('success');
      expect(element.variant).toBe('outline');
      expect(element.size).toBe('sm');
      expect(element.compact).toBe(true);

      // Verify attribute reflection
      expect(element.getAttribute('color')).toBe('success');
      expect(element.getAttribute('variant')).toBe('outline');
      expect(element.getAttribute('size')).toBe('sm');
      expect(element.hasAttribute('compact')).toBe(true);
    });

    it('should handle all color × variant combinations', async () => {
      const colors = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const;
      const variants = ['solid', 'soft', 'outline', 'surface'] as const;

      for (const color of colors) {
        for (const variant of variants) {
          element = await fixture<SandoBadge>(html`
            <sando-badge color=${color} variant=${variant}>Badge</sando-badge>
          `);
          expect(element.color).toBe(color);
          expect(element.variant).toBe(variant);
          expect(element).toBeDefined();
        }
      }
    });
  });

  describe('Non-Interactive Behavior', () => {
    it('should not be focusable (no tabindex)', async () => {
      const inner = element.shadowRoot?.querySelector('.badge') as HTMLElement;
      // Span elements are not focusable by default
      expect(inner?.tagName.toLowerCase()).toBe('span');
      expect(inner?.getAttribute('tabindex')).toBeNull();
    });

    it('should not have button or link role', async () => {
      const inner = element.shadowRoot?.querySelector('.badge');
      const role = inner?.getAttribute('role');
      expect(role).not.toBe('button');
      expect(role).not.toBe('link');
      expect(role).toBe('status');
    });
  });

  describe('Icon Feature', () => {
    describe('Default Semantic Icons', () => {
      it('should render check icon for success color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="success">Success</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeDefined();
        expect(icon).not.toBeNull();
        expect(icon?.getAttribute('name')).toBe('check');
      });

      it('should render triangle-alert icon for warning color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="warning">Warning</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeDefined();
        expect(icon).not.toBeNull();
        expect(icon?.getAttribute('name')).toBe('triangle-alert');
      });

      it('should render circle-alert icon for danger color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="danger">Error</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeDefined();
        expect(icon).not.toBeNull();
        expect(icon?.getAttribute('name')).toBe('circle-alert');
      });

      it('should render info icon for info color', async () => {
        element = await fixture<SandoBadge>(html` <sando-badge color="info">Info</sando-badge> `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeDefined();
        expect(icon).not.toBeNull();
        expect(icon?.getAttribute('name')).toBe('info');
      });
    });

    describe('Non-Semantic Colors (no icon)', () => {
      it('should not render icon for neutral color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="neutral">Neutral</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeNull();
      });

      it('should not render icon for primary color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="primary">Primary</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeNull();
      });
    });

    describe('Custom Icon Override', () => {
      it('should use custom icon instead of default semantic icon', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="success" icon="thumb-up">Featured</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeDefined();
        expect(icon).not.toBeNull();
        expect(icon?.getAttribute('name')).toBe('thumb-up');
      });

      it('should allow custom icon on non-semantic colors', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="neutral" icon="star">Starred</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeDefined();
        expect(icon).not.toBeNull();
        expect(icon?.getAttribute('name')).toBe('star');
      });

      it('should allow custom icon on primary color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="primary" icon="zap">Pro</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeDefined();
        expect(icon).not.toBeNull();
        expect(icon?.getAttribute('name')).toBe('zap');
      });
    });

    describe('No Icon Prop', () => {
      it('should not render icon when no-icon is set on semantic color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="success" no-icon>Active</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeNull();
      });

      it('should not render icon when no-icon is set on warning color', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="warning" no-icon>Pending</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeNull();
      });

      it('should have no-icon take precedence over icon prop', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="success" icon="star" no-icon>Badge</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeNull();
      });

      it('should reflect noIcon property correctly', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="success">Active</sando-badge>
        `);
        expect(element.noIcon).toBe(false);

        element.noIcon = true;
        await element.updateComplete;
        expect(element.noIcon).toBe(true);
        expect(element.hasAttribute('no-icon')).toBe(true);

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeNull();
      });
    });

    describe('Icon Properties', () => {
      it('should have decorative attribute on icon', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="success">Active</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).not.toBeNull();
        expect(icon?.hasAttribute('decorative')).toBe(true);
      });

      it('should have inherit-color attribute on icon', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="success">Active</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).not.toBeNull();
        expect(icon?.hasAttribute('inherit-color')).toBe(true);
      });

      it('should have badge__icon class on icon', async () => {
        element = await fixture<SandoBadge>(html` <sando-badge color="info">Info</sando-badge> `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).not.toBeNull();
        expect(icon?.classList.contains('badge__icon')).toBe(true);
      });
    });

    describe('Icon with Variants', () => {
      it('should render icon for all semantic colors with solid variant', async () => {
        const semanticColors = ['success', 'warning', 'danger', 'info'] as const;
        const expectedIcons = {
          success: 'check',
          warning: 'triangle-alert',
          danger: 'circle-alert',
          info: 'info'
        };

        for (const color of semanticColors) {
          element = await fixture<SandoBadge>(html`
            <sando-badge color=${color} variant="solid">Badge</sando-badge>
          `);
          await element.updateComplete;

          const icon = element.shadowRoot?.querySelector('sando-icon');
          expect(icon).not.toBeNull();
          expect(icon?.getAttribute('name')).toBe(expectedIcons[color]);
        }
      });

      it('should render icon for all semantic colors with soft variant', async () => {
        const semanticColors = ['success', 'warning', 'danger', 'info'] as const;

        for (const color of semanticColors) {
          element = await fixture<SandoBadge>(html`
            <sando-badge color=${color} variant="soft">Badge</sando-badge>
          `);
          await element.updateComplete;

          const icon = element.shadowRoot?.querySelector('sando-icon');
          expect(icon).not.toBeNull();
        }
      });

      it('should render icon for all sizes', async () => {
        const sizes = ['sm', 'md', 'lg'] as const;

        for (const size of sizes) {
          element = await fixture<SandoBadge>(html`
            <sando-badge color="success" size=${size}>Badge</sando-badge>
          `);
          await element.updateComplete;

          const icon = element.shadowRoot?.querySelector('sando-icon');
          expect(icon).not.toBeNull();
          expect(icon?.getAttribute('name')).toBe('check');
        }
      });

      it('should render icon in compact mode', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="warning" compact>Compact</sando-badge>
        `);
        await element.updateComplete;

        const icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).not.toBeNull();
        expect(icon?.getAttribute('name')).toBe('triangle-alert');
      });
    });

    describe('Dynamic Icon Updates', () => {
      it('should update icon when color changes from neutral to semantic', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="neutral">Badge</sando-badge>
        `);
        await element.updateComplete;

        let icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeNull();

        element.color = 'success';
        await element.updateComplete;

        icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).not.toBeNull();
        expect(icon?.getAttribute('name')).toBe('check');
      });

      it('should remove icon when color changes from semantic to neutral', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="danger">Error</sando-badge>
        `);
        await element.updateComplete;

        let icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).not.toBeNull();

        element.color = 'neutral';
        await element.updateComplete;

        icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeNull();
      });

      it('should update icon when icon prop changes', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="success">Badge</sando-badge>
        `);
        await element.updateComplete;

        let icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon?.getAttribute('name')).toBe('check');

        element.icon = 'star';
        await element.updateComplete;

        icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon?.getAttribute('name')).toBe('star');
      });

      it('should hide icon when noIcon becomes true', async () => {
        element = await fixture<SandoBadge>(html` <sando-badge color="info">Info</sando-badge> `);
        await element.updateComplete;

        let icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).not.toBeNull();

        element.noIcon = true;
        await element.updateComplete;

        icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeNull();
      });

      it('should show icon when noIcon becomes false', async () => {
        element = await fixture<SandoBadge>(html`
          <sando-badge color="warning" no-icon>Warning</sando-badge>
        `);
        await element.updateComplete;

        let icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).toBeNull();

        element.noIcon = false;
        await element.updateComplete;

        icon = element.shadowRoot?.querySelector('sando-icon');
        expect(icon).not.toBeNull();
        expect(icon?.getAttribute('name')).toBe('triangle-alert');
      });
    });
  });
});
