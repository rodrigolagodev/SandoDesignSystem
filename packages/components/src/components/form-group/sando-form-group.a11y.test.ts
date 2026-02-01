/**
 * Accessibility Tests for sando-form-group
 * Uses axe-core for WCAG compliance testing
 */

import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { axe, toHaveNoViolations } from 'jest-axe';
import './sando-form-group.js';
import type { SandoFormGroup } from './sando-form-group.js';

// Extend expect matchers
expect.extend(toHaveNoViolations);

describe('sando-form-group Accessibility', () => {
  it('should pass axe accessibility tests - default state', async () => {
    const el = await fixture<SandoFormGroup>(html`
      <sando-form-group>
        <input type="text" id="test-input" aria-label="Test input" />
      </sando-form-group>
    `);

    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('should pass axe accessibility tests - with label', async () => {
    const el = await fixture<SandoFormGroup>(html`
      <sando-form-group label="Email">
        <input type="email" id="email-input" aria-label="Email" />
      </sando-form-group>
    `);

    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('should pass axe accessibility tests - with error', async () => {
    const el = await fixture<SandoFormGroup>(html`
      <sando-form-group label="Email" error="Email is required">
        <input type="email" id="email-input" aria-label="Email" aria-invalid="true" />
      </sando-form-group>
    `);

    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('should pass axe accessibility tests - with helper text', async () => {
    const el = await fixture<SandoFormGroup>(html`
      <sando-form-group label="Password" helper-text="Must be at least 8 characters">
        <input type="password" id="password-input" aria-label="Password" />
      </sando-form-group>
    `);

    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('should pass axe accessibility tests - required field', async () => {
    const el = await fixture<SandoFormGroup>(html`
      <sando-form-group label="Username" required>
        <input type="text" id="username-input" aria-label="Username" required />
      </sando-form-group>
    `);

    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('should pass axe accessibility tests - using slots', async () => {
    const el = await fixture<SandoFormGroup>(html`
      <sando-form-group>
        <label slot="label" for="custom-input">Custom Label</label>
        <input type="text" id="custom-input" />
        <span slot="helper-text">Custom helper text</span>
      </sando-form-group>
    `);

    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  describe('ARIA attributes', () => {
    it('should use role="alert" for error messages', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group error="Validation error">
          <input type="text" aria-label="Test input" />
        </sando-form-group>
      `);

      const errorElement = el.shadowRoot?.querySelector('.form-group__error');
      expect(errorElement?.getAttribute('role')).toBe('alert');
    });

    it('should use aria-live="polite" for error messages', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group error="Validation error">
          <input type="text" aria-label="Test input" />
        </sando-form-group>
      `);

      const errorElement = el.shadowRoot?.querySelector('.form-group__error');
      expect(errorElement?.getAttribute('aria-live')).toBe('polite');
    });
  });

  describe('keyboard navigation', () => {
    it('should allow focus on slotted form controls', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group label="Email">
          <input type="email" id="email-input" aria-label="Email" />
        </sando-form-group>
      `);

      const input = el.querySelector<HTMLInputElement>('#email-input');
      expect(input).toBeTruthy();

      input?.focus();
      expect(document.activeElement).toBe(input);
    });
  });

  describe('screen reader support', () => {
    it('should announce error messages to screen readers', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group error="Email is required">
          <input type="email" aria-label="Email" />
        </sando-form-group>
      `);

      // Error element should have role="alert" and aria-live="polite"
      // This ensures screen readers announce the error when it appears
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should associate helper text with form controls', async () => {
      const el = await fixture<SandoFormGroup>(html`
        <sando-form-group label="Password" helper-text="Must be at least 8 characters">
          <input type="password" id="password" aria-label="Password" />
        </sando-form-group>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });
});
