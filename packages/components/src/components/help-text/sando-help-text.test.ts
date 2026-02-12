/**
 * Unit tests for sando-help-text component
 *
 * Tests cover:
 * - Basic rendering
 * - Prop behavior (variant, showIcon, reserveSpace)
 * - Slot content handling
 * - ARIA attributes
 */

import { fixture, expect, html } from '@open-wc/testing';
import { SandoHelpText } from './sando-help-text.js';
import './sando-help-text.js';

describe('sando-help-text', () => {
  // ==================================================
  // Basic Rendering
  // ==================================================

  it('should render with default props', async () => {
    const el = await fixture<SandoHelpText>(html`<sando-help-text></sando-help-text>`);

    expect(el).to.exist;
    expect(el).to.be.instanceOf(SandoHelpText);
    expect(el.variant).to.equal('default');
    expect(el.showIcon).to.equal(false);
    expect(el.reserveSpace).to.equal('true');
  });

  it('should render slot content', async () => {
    const el = await fixture<SandoHelpText>(
      html`<sando-help-text>This is helper text</sando-help-text>`
    );

    expect(el.textContent).to.include('This is helper text');
  });

  // ==================================================
  // Variant Prop
  // ==================================================

  describe('variant', () => {
    const variants = ['default', 'error', 'success', 'warning'] as const;

    variants.forEach((variant) => {
      it(`should reflect variant="${variant}" attribute`, async () => {
        const el = await fixture<SandoHelpText>(
          html`<sando-help-text variant=${variant}>Message</sando-help-text>`
        );

        expect(el.variant).to.equal(variant);
        expect(el.getAttribute('variant')).to.equal(variant);
      });
    });

    it('should update variant dynamically', async () => {
      const el = await fixture<SandoHelpText>(html`<sando-help-text>Message</sando-help-text>`);

      expect(el.variant).to.equal('default');

      el.variant = 'error';
      await el.updateComplete;

      expect(el.variant).to.equal('error');
      expect(el.getAttribute('variant')).to.equal('error');
    });
  });

  // ==================================================
  // Show Icon Prop
  // ==================================================

  describe('showIcon', () => {
    it('should not render icon by default', async () => {
      const el = await fixture<SandoHelpText>(html`<sando-help-text>Message</sando-help-text>`);

      const icon = el.shadowRoot?.querySelector('.icon');
      expect(icon).to.be.null;
    });

    it('should render icon when show-icon is true', async () => {
      const el = await fixture<SandoHelpText>(
        html`<sando-help-text show-icon>Message</sando-help-text>`
      );

      const icon = el.shadowRoot?.querySelector('.icon');
      expect(icon).to.exist;
    });

    it('should render different icons for each variant', async () => {
      const variants = ['default', 'error', 'success', 'warning'] as const;

      for (const variant of variants) {
        const el = await fixture<SandoHelpText>(
          html`<sando-help-text variant=${variant} show-icon>Message</sando-help-text>`
        );

        // Now using sando-icon component instead of inline SVG
        const sandoIcon = el.shadowRoot?.querySelector('.icon sando-icon');
        expect(sandoIcon).to.exist;
        // sando-icon handles aria-hidden via decorative prop
        expect(sandoIcon?.getAttribute('decorative')).to.equal('');
      }
    });
  });

  // ==================================================
  // Reserve Space Prop
  // ==================================================

  describe('reserveSpace', () => {
    it('should have reserve-space="true" by default', async () => {
      const el = await fixture<SandoHelpText>(html`<sando-help-text>Message</sando-help-text>`);

      expect(el.reserveSpace).to.equal('true');
      expect(el.getAttribute('reserve-space')).to.equal('true');
    });

    it('should support reserve-space="false"', async () => {
      const el = await fixture<SandoHelpText>(
        html`<sando-help-text reserve-space="false">Message</sando-help-text>`
      );

      expect(el.reserveSpace).to.equal('false');
      expect(el.getAttribute('reserve-space')).to.equal('false');
    });
  });

  // ==================================================
  // ARIA / Accessibility
  // ==================================================

  describe('accessibility', () => {
    it('should have role="status" for default variant', async () => {
      const el = await fixture<SandoHelpText>(html`<sando-help-text>Helper text</sando-help-text>`);

      const helpText = el.shadowRoot?.querySelector('.help-text');
      expect(helpText?.getAttribute('role')).to.equal('status');
      expect(helpText?.getAttribute('aria-live')).to.equal('polite');
    });

    it('should have role="alert" for error variant', async () => {
      const el = await fixture<SandoHelpText>(
        html`<sando-help-text variant="error">Error message</sando-help-text>`
      );

      const helpText = el.shadowRoot?.querySelector('.help-text');
      expect(helpText?.getAttribute('role')).to.equal('alert');
      expect(helpText?.getAttribute('aria-live')).to.equal('assertive');
    });

    it('should have role="status" for success variant', async () => {
      const el = await fixture<SandoHelpText>(
        html`<sando-help-text variant="success">Success!</sando-help-text>`
      );

      const helpText = el.shadowRoot?.querySelector('.help-text');
      expect(helpText?.getAttribute('role')).to.equal('status');
    });

    it('should have role="status" for warning variant', async () => {
      const el = await fixture<SandoHelpText>(
        html`<sando-help-text variant="warning">Warning!</sando-help-text>`
      );

      const helpText = el.shadowRoot?.querySelector('.help-text');
      expect(helpText?.getAttribute('role')).to.equal('status');
    });

    it('should have aria-hidden on icons', async () => {
      const el = await fixture<SandoHelpText>(
        html`<sando-help-text show-icon>Message</sando-help-text>`
      );

      // Now using sando-icon component with decorative attribute
      const sandoIcon = el.shadowRoot?.querySelector('.icon sando-icon');
      expect(sandoIcon?.hasAttribute('decorative')).to.equal(true);
    });
  });

  // ==================================================
  // Empty State / Content Detection
  // ==================================================

  describe('content detection', () => {
    it('should detect when slot has content', async () => {
      const el = await fixture<SandoHelpText>(
        html`<sando-help-text>Some content</sando-help-text>`
      );

      // Wait for slotchange event to be processed
      await el.updateComplete;

      const content = el.shadowRoot?.querySelector('.content');
      expect(content?.classList.contains('empty')).to.be.false;
    });

    it('should detect when slot is empty', async () => {
      const el = await fixture<SandoHelpText>(html`<sando-help-text></sando-help-text>`);

      // Wait for slotchange event to be processed
      await el.updateComplete;

      const content = el.shadowRoot?.querySelector('.content');
      expect(content?.classList.contains('empty')).to.be.true;
    });

    it('should handle whitespace-only content as empty', async () => {
      const el = await fixture<SandoHelpText>(html`<sando-help-text> </sando-help-text>`);

      await el.updateComplete;

      const content = el.shadowRoot?.querySelector('.content');
      expect(content?.classList.contains('empty')).to.be.true;
    });
  });

  // ==================================================
  // FlavorableMixin Integration
  // ==================================================

  describe('FlavorableMixin', () => {
    it('should accept flavor prop', async () => {
      const el = await fixture<SandoHelpText>(
        html`<sando-help-text flavor="strawberry">Message</sando-help-text>`
      );

      expect(el.flavor).to.equal('strawberry');
    });
  });
});
