/**
 * Accessibility tests for sando-help-text component
 *
 * Tests cover:
 * - WCAG 2.1 Level AA automated compliance (axe-core)
 * - All variants (default, error, success, warning)
 * - All sizes (sm, md, lg)
 * - With and without icons
 * - Empty and filled states
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-help-text.js';
import type { SandoHelpText } from './sando-help-text.js';

describe('sando-help-text accessibility', () => {
  // ==================================================
  // Basic Accessibility
  // ==================================================

  it('should have no accessibility violations with default props', async () => {
    const el = await fixture<SandoHelpText>(
      html`<sando-help-text>Enter your email address</sando-help-text>`
    );
    await el.updateComplete;

    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('should have no accessibility violations when empty', async () => {
    const el = await fixture<SandoHelpText>(html`<sando-help-text></sando-help-text>`);
    await el.updateComplete;

    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  // ==================================================
  // Variant Accessibility
  // ==================================================

  describe('variants', () => {
    const variants = ['default', 'error', 'success', 'warning'] as const;

    variants.forEach((variant) => {
      it(`should have no violations for variant="${variant}"`, async () => {
        const el = await fixture<SandoHelpText>(
          html`<sando-help-text variant=${variant}>Message for ${variant}</sando-help-text>`
        );
        await el.updateComplete;

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });

      it(`should have no violations for variant="${variant}" with icon`, async () => {
        const el = await fixture<SandoHelpText>(
          html`<sando-help-text variant=${variant} show-icon>
            Message for ${variant}
          </sando-help-text>`
        );
        await el.updateComplete;

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    });
  });

  // ==================================================
  // Size Accessibility
  // ==================================================

  describe('sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`should have no violations for size="${size}"`, async () => {
        const el = await fixture<SandoHelpText>(
          html`<sando-help-text size=${size}>Help text at ${size} size</sando-help-text>`
        );
        await el.updateComplete;

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    });
  });

  // ==================================================
  // Combined Props Accessibility
  // ==================================================

  describe('combined props', () => {
    it('should have no violations with all props set', async () => {
      const el = await fixture<SandoHelpText>(
        html`<sando-help-text variant="error" size="lg" show-icon reserve-space="true">
          This field is required
        </sando-help-text>`
      );
      await el.updateComplete;

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with reserve-space="false"', async () => {
      const el = await fixture<SandoHelpText>(
        html`<sando-help-text reserve-space="false">Optional help text</sando-help-text>`
      );
      await el.updateComplete;

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  // ==================================================
  // ARIA Roles Verification
  // ==================================================

  describe('ARIA roles', () => {
    it('should use role="status" for non-error variants', async () => {
      const el = await fixture<SandoHelpText>(
        html`<sando-help-text variant="default">Helper text</sando-help-text>`
      );
      await el.updateComplete;

      const helpText = el.shadowRoot?.querySelector('[role="status"]');
      expect(helpText).not.toBeNull();
    });

    it('should use role="alert" for error variant', async () => {
      const el = await fixture<SandoHelpText>(
        html`<sando-help-text variant="error">Error message</sando-help-text>`
      );
      await el.updateComplete;

      const helpText = el.shadowRoot?.querySelector('[role="alert"]');
      expect(helpText).not.toBeNull();
    });

    it('should use aria-live="polite" for non-error variants', async () => {
      const el = await fixture<SandoHelpText>(
        html`<sando-help-text variant="success">Success!</sando-help-text>`
      );
      await el.updateComplete;

      const helpText = el.shadowRoot?.querySelector('[aria-live="polite"]');
      expect(helpText).not.toBeNull();
    });

    it('should use aria-live="assertive" for error variant', async () => {
      const el = await fixture<SandoHelpText>(
        html`<sando-help-text variant="error">Error!</sando-help-text>`
      );
      await el.updateComplete;

      const helpText = el.shadowRoot?.querySelector('[aria-live="assertive"]');
      expect(helpText).not.toBeNull();
    });
  });

  // ==================================================
  // Icon Accessibility
  // ==================================================

  describe('icon accessibility', () => {
    it('should have aria-hidden="true" on icons', async () => {
      const el = await fixture<SandoHelpText>(
        html`<sando-help-text show-icon>Help text with icon</sando-help-text>`
      );
      await el.updateComplete;

      // Now using sando-icon component with decorative attribute
      // The sando-icon component handles aria-hidden internally when decorative is set
      const sandoIcon = el.shadowRoot?.querySelector('sando-icon[decorative]');
      expect(sandoIcon).not.toBeNull();
    });

    it('icons should not interfere with screen reader announcement', async () => {
      const el = await fixture<SandoHelpText>(
        html`<sando-help-text variant="error" show-icon>Error message</sando-help-text>`
      );
      await el.updateComplete;

      // The text content should be accessible without the icon
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  // ==================================================
  // Form Context Accessibility
  // ==================================================

  describe('form context', () => {
    it('should work with aria-describedby on input', async () => {
      const container = await fixture(html`
        <div>
          <label for="email">Email</label>
          <input id="email" type="email" aria-describedby="email-help" />
          <sando-help-text id="email-help">Enter a valid email address</sando-help-text>
        </div>
      `);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should work as error message with aria-describedby', async () => {
      const container = await fixture(html`
        <div>
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            aria-invalid="true"
            aria-describedby="password-error"
          />
          <sando-help-text id="password-error" variant="error" show-icon>
            Password must be at least 8 characters
          </sando-help-text>
        </div>
      `);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ==================================================
  // Flavor/Theme Accessibility
  // ==================================================

  describe('flavor accessibility', () => {
    it('should maintain accessibility across flavors', async () => {
      const flavors = ['original', 'strawberry', 'chocolate'];

      for (const flavor of flavors) {
        const el = await fixture<SandoHelpText>(
          html`<sando-help-text flavor=${flavor} variant="error" show-icon>
            Error message
          </sando-help-text>`
        );
        await el.updateComplete;

        const results = await axe(el, {
          rules: {
            'color-contrast': { enabled: true }
          }
        });
        expect(results).toHaveNoViolations();
      }
    });
  });
});
