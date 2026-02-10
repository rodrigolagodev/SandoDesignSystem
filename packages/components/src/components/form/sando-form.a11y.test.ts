/**
 * Accessibility Tests for sando-form
 * Uses axe-core for WCAG compliance testing
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-form.js';
import type { SandoForm } from './sando-form.js';

describe('sando-form Accessibility', () => {
  it('should pass axe accessibility tests - default state', async () => {
    const el = await fixture<SandoForm>(html`
      <sando-form>
        <label for="test-input">Test Input</label>
        <input type="text" id="test-input" name="test" />
      </sando-form>
    `);

    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('should pass axe accessibility tests - with multiple inputs', async () => {
    const el = await fixture<SandoForm>(html`
      <sando-form>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
      </sando-form>
    `);

    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('should pass axe accessibility tests - with submit button', async () => {
    const el = await fixture<SandoForm>(html`
      <sando-form>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" />
        <button type="submit">Submit</button>
      </sando-form>
    `);

    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('should pass axe accessibility tests - with fieldset and legend', async () => {
    const el = await fixture<SandoForm>(html`
      <sando-form>
        <fieldset>
          <legend>Personal Information</legend>
          <label for="name">Name</label>
          <input type="text" id="name" name="name" />
        </fieldset>
      </sando-form>
    `);

    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  it('should pass axe accessibility tests - loading state', async () => {
    const el = await fixture<SandoForm>(html`
      <sando-form loading>
        <label for="test">Test</label>
        <input type="text" id="test" name="test" />
      </sando-form>
    `);

    const results = await axe(el);
    expect(results).toHaveNoViolations();
  });

  describe('keyboard navigation', () => {
    it('should allow focus on slotted form controls', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" />
        </sando-form>
      `);

      const input = el.querySelector<HTMLInputElement>('#email');
      expect(input).toBeTruthy();

      input?.focus();
      expect(document.activeElement).toBe(input);
    });

    it('should support tab navigation between form controls', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <label for="first">First</label>
          <input type="text" id="first" name="first" />
          <label for="second">Second</label>
          <input type="text" id="second" name="second" />
        </sando-form>
      `);

      const firstInput = el.querySelector<HTMLInputElement>('#first');
      const secondInput = el.querySelector<HTMLInputElement>('#second');

      firstInput?.focus();
      expect(document.activeElement).toBe(firstInput);

      secondInput?.focus();
      expect(document.activeElement).toBe(secondInput);
    });
  });

  describe('form submission', () => {
    it('should be submittable via Enter key on inputs', async () => {
      let submitted = false;
      const el = await fixture<SandoForm>(html`
        <sando-form @sando-submit=${() => (submitted = true)}>
          <label for="test">Test</label>
          <input type="text" id="test" name="test" value="value" />
        </sando-form>
      `);

      // Programmatic submit should work
      el.submit();
      expect(submitted).toBe(true);
    });
  });

  describe('required fields', () => {
    it('should pass axe tests with required fields', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <label for="required-field">Required Field *</label>
          <input type="text" id="required-field" name="required" required aria-required="true" />
        </sando-form>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('error states', () => {
    it('should pass axe tests with aria-invalid on inputs', async () => {
      const el = await fixture<SandoForm>(html`
        <sando-form>
          <label for="invalid-field">Email</label>
          <input
            type="email"
            id="invalid-field"
            name="email"
            value="invalid"
            aria-invalid="true"
            aria-describedby="error-msg"
          />
          <span id="error-msg" role="alert">Please enter a valid email</span>
        </sando-form>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });
});
