/**
 * Accessibility Tests for sando-spinner
 * Uses axe-core for WCAG compliance testing and manual ARIA attribute verification.
 *
 * Note: sando-spinner.a11y.ts is a CONSTANTS file (exports SPINNER_ROLE) used by
 * the component implementation. This file contains the actual accessibility tests.
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-spinner.js';
import type { SandoSpinner } from './sando-spinner.js';

describe('sando-spinner Accessibility', () => {
  describe('axe-core validation', () => {
    it('should have no accessibility violations (default)', async () => {
      const el = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with custom label', async () => {
      const el = await fixture<SandoSpinner>(
        html`<sando-spinner label="Loading user data"></sando-spinner>`
      );
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with size xs', async () => {
      const el = await fixture<SandoSpinner>(html`<sando-spinner size="xs"></sando-spinner>`);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with size sm', async () => {
      const el = await fixture<SandoSpinner>(html`<sando-spinner size="sm"></sando-spinner>`);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with size md (default)', async () => {
      const el = await fixture<SandoSpinner>(html`<sando-spinner size="md"></sando-spinner>`);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with size lg', async () => {
      const el = await fixture<SandoSpinner>(html`<sando-spinner size="lg"></sando-spinner>`);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with size xl', async () => {
      const el = await fixture<SandoSpinner>(html`<sando-spinner size="xl"></sando-spinner>`);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with variant default', async () => {
      const el = await fixture<SandoSpinner>(
        html`<sando-spinner variant="default"></sando-spinner>`
      );
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with variant inverted on dark background', async () => {
      const el = await fixture<SandoSpinner>(
        html`<div style="background:#333;padding:1rem">
          <sando-spinner variant="inverted"></sando-spinner>
        </div>`
      );
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with arc=0.25 (default)', async () => {
      const el = await fixture<SandoSpinner>(html`<sando-spinner arc="0.25"></sando-spinner>`);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with arc=0.5', async () => {
      const el = await fixture<SandoSpinner>(html`<sando-spinner arc="0.5"></sando-spinner>`);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with arc=1 (full circle)', async () => {
      const el = await fixture<SandoSpinner>(html`<sando-spinner arc="1"></sando-spinner>`);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ARIA attributes', () => {
    it('should render inner span with role="status"', async () => {
      const el = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await el.updateComplete;
      const span = el.shadowRoot?.querySelector('.spinner');
      expect(span?.getAttribute('role')).toBe('status');
    });

    it('should have aria-label="Loading" by default', async () => {
      const el = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await el.updateComplete;
      const span = el.shadowRoot?.querySelector('.spinner');
      expect(span?.getAttribute('aria-label')).toBe('Loading');
    });

    it('should reflect custom label in aria-label', async () => {
      const el = await fixture<SandoSpinner>(
        html`<sando-spinner label="Processing payment"></sando-spinner>`
      );
      await el.updateComplete;
      const span = el.shadowRoot?.querySelector('.spinner');
      expect(span?.getAttribute('aria-label')).toBe('Processing payment');
    });

    it('should have aria-hidden="true" on the SVG element', async () => {
      const el = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await el.updateComplete;
      const svg = el.shadowRoot?.querySelector('svg');
      expect(svg?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Focus management', () => {
    it('should not be focusable (no interactive behavior)', async () => {
      const el = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await el.updateComplete;
      const span = el.shadowRoot?.querySelector('.spinner');
      // The spinner is not keyboard-navigable — it has no tabindex attribute
      expect(span?.hasAttribute('tabindex')).toBe(false);
    });

    it('inner SVG should not be focusable', async () => {
      const el = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await el.updateComplete;
      const svg = el.shadowRoot?.querySelector('svg');
      expect(svg?.getAttribute('tabindex')).not.toBe('0');
    });
  });

  describe('Screen reader support', () => {
    it('should announce via role="status" live region', async () => {
      const el = await fixture<SandoSpinner>(html`<sando-spinner></sando-spinner>`);
      await el.updateComplete;
      const span = el.shadowRoot?.querySelector('.spinner');
      // role="status" is an implicit aria-live="polite" region
      expect(span?.getAttribute('role')).toBe('status');
    });

    it('label change should update the live region announcement', async () => {
      const el = await fixture<SandoSpinner>(html`<sando-spinner label="Loading"></sando-spinner>`);
      el.label = 'Almost done';
      await el.updateComplete;
      const span = el.shadowRoot?.querySelector('.spinner');
      expect(span?.getAttribute('aria-label')).toBe('Almost done');
    });
  });

  describe('Flavor accessibility', () => {
    const flavors = ['original', 'strawberry', 'chocolate'];

    flavors.forEach((flavor) => {
      it(`should pass a11y with ${flavor} flavor`, async () => {
        const el = await fixture<SandoSpinner>(
          html`<div flavor="${flavor}"><sando-spinner></sando-spinner></div>`
        );
        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
