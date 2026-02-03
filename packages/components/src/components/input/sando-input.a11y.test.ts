/**
 * Accessibility Tests for sando-input
 * Uses axe-core for WCAG compliance testing
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-input.js';
import type { SandoInput } from './sando-input.js';

describe('sando-input Accessibility', () => {
  describe('default state', () => {
    it('should have no accessibility violations', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input label="Email" placeholder="you@example.com"></sando-input>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('variants', () => {
    it('should pass a11y with outlined variant', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input variant="outlined" label="Username"></sando-input>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with filled variant', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input variant="filled" label="Username"></sando-input>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('sizes', () => {
    it('should pass a11y with small size', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input size="small" label="Email"></sando-input>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with medium size', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input size="medium" label="Email"></sando-input>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with large size', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input size="large" label="Email"></sando-input>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('states', () => {
    it('should pass a11y when disabled', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input label="Email" disabled></sando-input>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y when readonly', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input label="Email" readonly value="readonly@example.com"></sando-input>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y when required', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input label="Email" required></sando-input>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with error state', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input label="Email" error error-text="Email is required"></sando-input>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with helper text', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input label="Email" helper-text="Enter your email address"></sando-input>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('with slots', () => {
    it('should pass a11y with prefix slot', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input label="Search">
          <span slot="prefix" aria-hidden="true">🔍</span>
        </sando-input>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with suffix slot', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input label="Search">
          <button slot="suffix" aria-label="Clear search">Clear</button>
        </sando-input>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with both prefix and suffix', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input label="Search">
          <span slot="prefix" aria-hidden="true">🔍</span>
          <button slot="suffix" aria-label="Clear search">✕</button>
        </sando-input>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('flavors', () => {
    const flavors = ['original', 'strawberry', 'tonkatsu', 'kiwi', 'egg-salad'];

    flavors.forEach((flavor) => {
      it(`should pass a11y with ${flavor} flavor`, async () => {
        const el = await fixture<SandoInput>(html`
          <div flavor="${flavor}">
            <sando-input label="Email" placeholder="you@example.com"></sando-input>
          </div>
        `);

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });

      it(`should pass a11y with ${flavor} flavor and error`, async () => {
        const el = await fixture<SandoInput>(html`
          <div flavor="${flavor}">
            <sando-input label="Email" error error-text="Email is required"></sando-input>
          </div>
        `);

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    });
  });

  describe('input types', () => {
    ['text', 'email', 'password', 'number', 'tel', 'url', 'search'].forEach((type) => {
      it(`should pass a11y with type="${type}"`, async () => {
        const el = await fixture<SandoInput>(html`
          <sando-input label="Input" type="${type}"></sando-input>
        `);

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    });
  });

  describe('ARIA attributes', () => {
    it('should have proper aria-invalid when error', async () => {
      const el = await fixture<SandoInput>(html` <sando-input label="Email" error></sando-input> `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-invalid')).toBe('true');
    });

    it('should have aria-describedby for helper text', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input label="Email" helper-text="Helper"></sando-input>
      `);

      const input = el.shadowRoot!.querySelector('input');
      const describedBy = input!.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const helperText = el.shadowRoot!.querySelector('.helper-text');
      expect(helperText!.id).toBe(describedBy);
    });

    it('should have aria-describedby for error text', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input label="Email" error error-text="Error"></sando-input>
      `);

      const input = el.shadowRoot!.querySelector('input');
      const describedBy = input!.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const errorText = el.shadowRoot!.querySelector('.error-text');
      expect(errorText!.id).toBe(describedBy);
      expect(errorText!.getAttribute('role')).toBe('alert');
    });

    it('should associate label with input', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input label="Email Address"></sando-input>
      `);

      const label = el.shadowRoot!.querySelector('label');
      const input = el.shadowRoot!.querySelector('input');
      const labelFor = label!.getAttribute('for');
      const inputId = input!.getAttribute('id');

      expect(labelFor).toBe(inputId);
      expect(inputId).toBeTruthy();
    });
  });

  describe('keyboard navigation', () => {
    it('should be keyboard accessible', async () => {
      const el = await fixture<SandoInput>(html` <sando-input label="Email"></sando-input> `);

      const input = el.shadowRoot!.querySelector('input')!;

      // Verify input is focusable
      expect(input.tabIndex).not.toBe(-1);

      // Verify not disabled
      expect(input.disabled).toBe(false);
    });

    it('should not be keyboard accessible when disabled', async () => {
      const el = await fixture<SandoInput>(html`
        <sando-input label="Email" disabled></sando-input>
      `);

      const input = el.shadowRoot!.querySelector('input')!;
      expect(input.disabled).toBe(true);
    });
  });
});
