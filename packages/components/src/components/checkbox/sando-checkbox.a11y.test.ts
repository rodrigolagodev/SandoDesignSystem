/**
 * Accessibility Tests for sando-checkbox
 * Uses axe-core for WCAG compliance testing and manual ARIA attribute verification
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-checkbox.js';
import type { SandoCheckbox } from './sando-checkbox.js';

describe('sando-checkbox Accessibility', () => {
  describe('axe-core validation', () => {
    it('should have no accessibility violations (default)', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Accept terms"></sando-checkbox>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when checked', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Accept terms" checked></sando-checkbox>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when indeterminate', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Select all" indeterminate></sando-checkbox>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when disabled', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Accept terms" disabled></sando-checkbox>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when required', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Accept terms" required></sando-checkbox>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with error state', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox
          label="Accept terms"
          error
          error-text="This field is required"
        ></sando-checkbox>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with helper text', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Newsletter" helper-text="Receive weekly updates"></sando-checkbox>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('variant accessibility', () => {
    it('should pass a11y with solid variant', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox variant="solid" label="Solid checkbox"></sando-checkbox>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with outline variant', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox variant="outline" label="Outline checkbox"></sando-checkbox>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('size accessibility', () => {
    ['small', 'medium', 'large'].forEach((size) => {
      it(`should pass a11y with ${size} size`, async () => {
        const el = await fixture<SandoCheckbox>(html`
          <sando-checkbox size="${size}" label="${size} checkbox"></sando-checkbox>
        `);

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    });
  });

  describe('ARIA attributes', () => {
    it('should have aria-checked="false" when unchecked', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test"></sando-checkbox>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-checked')).toBe('false');
    });

    it('should have aria-checked="true" when checked', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test" checked></sando-checkbox>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-checked')).toBe('true');
    });

    it('should have aria-checked="mixed" when indeterminate', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test" indeterminate></sando-checkbox>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-checked')).toBe('mixed');
    });

    it('should have aria-invalid="true" when error', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test" error></sando-checkbox>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-invalid')).toBe('true');
    });

    it('should have aria-invalid="false" when not error', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test"></sando-checkbox>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-invalid')).toBe('false');
    });

    it('should have aria-describedby linked to helper text', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test" helper-text="Helper text"></sando-checkbox>
      `);

      const input = el.shadowRoot!.querySelector('input');
      const describedBy = input!.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const helperTextElement = el.shadowRoot!.querySelector(`#${describedBy}`);
      expect(helperTextElement).toBeDefined();
      expect(helperTextElement!.textContent).toContain('Helper text');
    });

    it('should have aria-describedby linked to error text', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test" error error-text="Error message"></sando-checkbox>
      `);

      const input = el.shadowRoot!.querySelector('input');
      const describedBy = input!.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const errorTextElement = el.shadowRoot!.querySelector(`#${describedBy}`);
      expect(errorTextElement).toBeDefined();
      expect(errorTextElement!.textContent).toContain('Error message');
    });

    it('should have required attribute on input when required', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test" required></sando-checkbox>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.required).toBe(true);
    });
  });

  describe('Focus management', () => {
    it('should be focusable', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test"></sando-checkbox>
      `);

      el.focus();
      await el.updateComplete;

      // With delegatesFocus: true, the custom element receives focus
      expect(document.activeElement).toBe(el);
    });

    it('should not be focusable when disabled', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test" disabled></sando-checkbox>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.disabled).toBe(true);
    });

    it('should have visible focus indicator', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test"></sando-checkbox>
      `);

      el.focus();
      await el.updateComplete;

      // The focus indicator should be visible (checked via CSS)
      // We verify the component has proper focus management structure
      const input = el.shadowRoot!.querySelector('input');
      expect(input).toBeDefined();

      // Check that focus styles exist (outline should not be 'none')
      const styles = window.getComputedStyle(input!);
      expect(styles.outline).not.toBe('none');
    });
  });

  describe('Keyboard accessibility', () => {
    it('should support Space activation', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test"></sando-checkbox>
      `);

      let eventFired = false;
      el.addEventListener('sando-change', () => {
        eventFired = true;
      });

      const container = el.shadowRoot!.querySelector('.checkbox-container');
      const spaceEvent = new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
        bubbles: true,
        cancelable: true
      });
      container!.dispatchEvent(spaceEvent);
      await el.updateComplete;

      expect(eventFired).toBe(true);
      expect(el.checked).toBe(true);
    });

    it('should support Enter activation', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test"></sando-checkbox>
      `);

      let eventFired = false;
      el.addEventListener('sando-change', () => {
        eventFired = true;
      });

      const container = el.shadowRoot!.querySelector('.checkbox-container');
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        bubbles: true,
        cancelable: true
      });
      container!.dispatchEvent(enterEvent);
      await el.updateComplete;

      expect(eventFired).toBe(true);
      expect(el.checked).toBe(true);
    });

    it('should not activate when disabled', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test" disabled></sando-checkbox>
      `);

      let eventFired = false;
      el.addEventListener('sando-change', () => {
        eventFired = true;
      });

      const container = el.shadowRoot!.querySelector('.checkbox-container');
      const spaceEvent = new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
        bubbles: true,
        cancelable: true
      });
      container!.dispatchEvent(spaceEvent);
      await el.updateComplete;

      expect(eventFired).toBe(false);
      expect(el.checked).toBe(false);
    });
  });

  describe('Screen reader support', () => {
    it('should have label announced via label association', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Accept terms and conditions"></sando-checkbox>
      `);

      const label = el.shadowRoot!.querySelector('label');
      const input = el.shadowRoot!.querySelector('input');

      // Verify label wraps input or is associated via for/id
      expect(label).toBeDefined();
      expect(input).toBeDefined();

      // The label contains the input, so clicking label activates input
      expect(label!.contains(input!)).toBe(true);
    });

    it('should announce error text with role="alert"', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Accept" error error-text="This field is required"></sando-checkbox>
      `);

      const errorText = el.shadowRoot!.querySelector('.error-text');
      expect(errorText).toBeDefined();
      expect(errorText!.getAttribute('role')).toBe('alert');
    });

    it('should announce helper text via aria-describedby', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Newsletter" helper-text="Receive updates weekly"></sando-checkbox>
      `);

      const input = el.shadowRoot!.querySelector('input');
      const describedBy = input!.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const description = el.shadowRoot!.querySelector(`#${describedBy}`);
      expect(description!.textContent).toContain('Receive updates weekly');
    });
  });

  describe('Color contrast', () => {
    it('should have sufficient color contrast in default state', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test checkbox"></sando-checkbox>
      `);

      const results = await axe(el, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    });

    it('should have sufficient color contrast when checked', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test checkbox" checked></sando-checkbox>
      `);

      const results = await axe(el, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    });

    it('should have sufficient color contrast in error state', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test checkbox" error error-text="Error message"></sando-checkbox>
      `);

      const results = await axe(el, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    });
  });

  describe('Flavor accessibility', () => {
    const flavors = ['original', 'strawberry', 'chocolate'];

    flavors.forEach((flavor) => {
      it(`should pass a11y with ${flavor} flavor`, async () => {
        const el = await fixture<SandoCheckbox>(html`
          <div flavor="${flavor}">
            <sando-checkbox label="Test checkbox"></sando-checkbox>
          </div>
        `);

        const results = await axe(el, {
          rules: {
            'color-contrast': { enabled: true }
          }
        });

        expect(results).toHaveNoViolations();
      });

      it(`should pass a11y with ${flavor} flavor in checked state`, async () => {
        const el = await fixture<SandoCheckbox>(html`
          <div flavor="${flavor}">
            <sando-checkbox label="Test checkbox" checked></sando-checkbox>
          </div>
        `);

        const results = await axe(el, {
          rules: {
            'color-contrast': { enabled: true }
          }
        });

        expect(results).toHaveNoViolations();
      });

      it(`should pass a11y with ${flavor} flavor and error`, async () => {
        const el = await fixture<SandoCheckbox>(html`
          <div flavor="${flavor}">
            <sando-checkbox label="Test checkbox" error error-text="Error"></sando-checkbox>
          </div>
        `);

        const results = await axe(el, {
          rules: {
            'color-contrast': { enabled: true }
          }
        });

        expect(results).toHaveNoViolations();
      });
    });
  });

  describe('Complex states', () => {
    it('should pass a11y with all states combined', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox
          label="Accept terms"
          checked
          required
          variant="outline"
          size="large"
          helper-text="Please read before accepting"
        ></sando-checkbox>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with slotted label content', async () => {
      // Note: When using slot content with complex HTML, adding an aria-label
      // or label prop ensures axe-core recognizes the accessible label.
      // The slot content provides visual labeling but axe may not
      // traverse shadow DOM boundaries to recognize it as the input's label.
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="I agree to the Terms of Service">
          I agree to the <a href="/terms">Terms of Service</a>
        </sando-checkbox>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });
});
