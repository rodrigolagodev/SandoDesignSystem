/**
 * Accessibility Tests for sando-radio
 * Uses axe-core for WCAG compliance testing and manual ARIA attribute verification
 *
 * @see WCAG_COMPLIANCE.toon - WCAG 2.1 AA requirements
 * @see KEYBOARD_NAVIGATION.toon - Keyboard interaction patterns
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-radio.js';
import type { SandoRadio } from './sando-radio.js';

describe('sando-radio Accessibility', () => {
  describe('axe-core validation', () => {
    it('should have no accessibility violations (default)', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="option" value="a" label="Option A"></sando-radio>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when checked', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="option" value="a" label="Option A" checked></sando-radio>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when disabled', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="option" value="a" label="Disabled option" disabled></sando-radio>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with error state', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio
          name="option"
          value="a"
          label="Required option"
          error
          error-text="Please select an option"
        ></sando-radio>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with helper text', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio
          name="option"
          value="a"
          label="Option with helper"
          helper-text="Additional information about this option"
        ></sando-radio>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with error text', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio
          name="option"
          value="a"
          label="Option with error"
          error
          error-text="This field is required"
        ></sando-radio>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('size accessibility', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`should have no violations with ${size} size`, async () => {
        const el = await fixture<SandoRadio>(html`
          <sando-radio
            size="${size}"
            name="size-test"
            value="${size}"
            label="${size} radio"
          ></sando-radio>
        `);

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    });
  });

  describe('variant accessibility', () => {
    it('should pass a11y with solid variant', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio
          variant="solid"
          name="variant-test"
          value="solid"
          label="Solid radio"
        ></sando-radio>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with outline variant', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio
          variant="outline"
          name="variant-test"
          value="outline"
          label="Outline radio"
        ></sando-radio>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ARIA attributes', () => {
    it('should have native input with implicit role="radio"', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test"></sando-radio>
      `);

      const input = el.shadowRoot!.querySelector('input');
      // Native radio input has implicit role="radio"
      expect(input!.type).toBe('radio');
    });

    it('should have aria-checked="false" when unchecked', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test"></sando-radio>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-checked')).toBe('false');
    });

    it('should have aria-checked="true" when checked', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test" checked></sando-radio>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-checked')).toBe('true');
    });

    it('should have aria-invalid="true" when error', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test" error></sando-radio>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-invalid')).toBe('true');
    });

    it('should have aria-invalid="false" when not error', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test"></sando-radio>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-invalid')).toBe('false');
    });

    it('should have aria-describedby linked to helper text', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test" helper-text="Helper text"></sando-radio>
      `);

      const input = el.shadowRoot!.querySelector('input');
      const describedBy = input!.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const helperTextElement = el.shadowRoot!.querySelector(`#${describedBy}`);
      expect(helperTextElement).toBeDefined();
      expect(helperTextElement!.textContent).toContain('Helper text');
    });

    it('should have aria-describedby linked to error text', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio
          name="test"
          value="a"
          label="Test"
          error
          error-text="Error message"
        ></sando-radio>
      `);

      const input = el.shadowRoot!.querySelector('input');
      const describedBy = input!.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const errorTextElement = el.shadowRoot!.querySelector(`#${describedBy}`);
      expect(errorTextElement).toBeDefined();
      expect(errorTextElement!.textContent).toContain('Error message');
    });

    it('should have required attribute on input when required', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test" required></sando-radio>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.required).toBe(true);
    });
  });

  describe('Focus management', () => {
    it('should be focusable', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test"></sando-radio>
      `);

      el.focus();
      await el.updateComplete;

      // With delegatesFocus: true, the custom element receives focus
      expect(document.activeElement).toBe(el);
    });

    it('should delegate focus to native input', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test"></sando-radio>
      `);

      el.focus();
      await el.updateComplete;

      // delegatesFocus: true should focus the inner input
      const input = el.shadowRoot!.querySelector('input');
      expect(el.shadowRoot!.activeElement).toBe(input);
    });

    it('should not be focusable when disabled', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test" disabled></sando-radio>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.disabled).toBe(true);
    });

    it('should have visible focus indicator', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test"></sando-radio>
      `);

      el.focus();
      await el.updateComplete;

      // Verify the component has proper focus management structure
      const input = el.shadowRoot!.querySelector('input');
      expect(input).toBeDefined();

      // Check that focus styles exist (outline should not be 'none')
      const styles = window.getComputedStyle(input!);
      expect(styles.outline).not.toBe('none');
    });
  });

  describe('Label association', () => {
    it('should have label associated with input via for/id', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Associated label"></sando-radio>
      `);

      const label = el.shadowRoot!.querySelector('label');
      const input = el.shadowRoot!.querySelector('input');

      // Verify label wraps input or is associated via for/id
      expect(label).toBeDefined();
      expect(input).toBeDefined();

      // Check for/id association
      const labelFor = label!.getAttribute('for');
      const inputId = input!.getAttribute('id');
      expect(labelFor).toBe(inputId);
    });

    it('should activate input when clicking label', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Clickable label"></sando-radio>
      `);

      let eventFired = false;
      el.addEventListener('sando-change', () => {
        eventFired = true;
      });

      // Click the label to activate the radio
      const label = el.shadowRoot!.querySelector('label');
      label!.click();
      await el.updateComplete;

      expect(eventFired).toBe(true);
      expect(el.checked).toBe(true);
    });

    it('should have label text announced via label association', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Screen reader label"></sando-radio>
      `);

      const label = el.shadowRoot!.querySelector('label');
      const input = el.shadowRoot!.querySelector('input');

      // The label contains the input and label text
      expect(label).toBeDefined();
      expect(input).toBeDefined();
      expect(label!.contains(input!)).toBe(true);
      expect(label!.textContent).toContain('Screen reader label');
    });
  });

  describe('Keyboard accessibility', () => {
    it('should support Space activation', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test"></sando-radio>
      `);

      let eventFired = false;
      el.addEventListener('sando-change', () => {
        eventFired = true;
      });

      const label = el.shadowRoot!.querySelector('label');
      const spaceEvent = new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
        bubbles: true,
        cancelable: true
      });
      label!.dispatchEvent(spaceEvent);
      await el.updateComplete;

      expect(eventFired).toBe(true);
      expect(el.checked).toBe(true);
    });

    it('should support Enter activation', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test"></sando-radio>
      `);

      let eventFired = false;
      el.addEventListener('sando-change', () => {
        eventFired = true;
      });

      const label = el.shadowRoot!.querySelector('label');
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        bubbles: true,
        cancelable: true
      });
      label!.dispatchEvent(enterEvent);
      await el.updateComplete;

      expect(eventFired).toBe(true);
      expect(el.checked).toBe(true);
    });

    it('should not activate when disabled', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test" disabled></sando-radio>
      `);

      let eventFired = false;
      el.addEventListener('sando-change', () => {
        eventFired = true;
      });

      const label = el.shadowRoot!.querySelector('label');
      const spaceEvent = new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
        bubbles: true,
        cancelable: true
      });
      label!.dispatchEvent(spaceEvent);
      await el.updateComplete;

      expect(eventFired).toBe(false);
      expect(el.checked).toBe(false);
    });
  });

  describe('Screen reader support', () => {
    it('should announce error text with role="alert"', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio
          name="test"
          value="a"
          label="Accept"
          error
          error-text="This field is required"
        ></sando-radio>
      `);

      const errorText = el.shadowRoot!.querySelector('.error-text');
      expect(errorText).toBeDefined();
      expect(errorText!.getAttribute('role')).toBe('alert');
    });

    it('should announce helper text via aria-describedby', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio
          name="test"
          value="a"
          label="Newsletter"
          helper-text="Receive updates weekly"
        ></sando-radio>
      `);

      const input = el.shadowRoot!.querySelector('input');
      const describedBy = input!.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const description = el.shadowRoot!.querySelector(`#${describedBy}`);
      expect(description!.textContent).toContain('Receive updates weekly');
    });

    it('should have visual radio box marked as presentation', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test"></sando-radio>
      `);

      const radioBox = el.shadowRoot!.querySelector('.radio-box');
      expect(radioBox!.getAttribute('role')).toBe('presentation');
    });

    it('should have radio dot hidden from screen readers', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test"></sando-radio>
      `);

      const radioDot = el.shadowRoot!.querySelector('.radio-dot');
      expect(radioDot!.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Color contrast', () => {
    it('should have sufficient color contrast in default state', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test radio"></sando-radio>
      `);

      const results = await axe(el, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    });

    it('should have sufficient color contrast when checked', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Test radio" checked></sando-radio>
      `);

      const results = await axe(el, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    });

    it('should have sufficient color contrast in error state', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio
          name="test"
          value="a"
          label="Test radio"
          error
          error-text="Error message"
        ></sando-radio>
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
        const el = await fixture<SandoRadio>(html`
          <div flavor="${flavor}">
            <sando-radio name="test" value="a" label="Test radio"></sando-radio>
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
        const el = await fixture<SandoRadio>(html`
          <div flavor="${flavor}">
            <sando-radio name="test" value="a" label="Test radio" checked></sando-radio>
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
        const el = await fixture<SandoRadio>(html`
          <div flavor="${flavor}">
            <sando-radio
              name="test"
              value="a"
              label="Test radio"
              error
              error-text="Error"
            ></sando-radio>
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
      const el = await fixture<SandoRadio>(html`
        <sando-radio
          name="complex"
          value="full"
          label="Complex option"
          checked
          required
          variant="outline"
          size="lg"
          helper-text="Please review before selecting"
        ></sando-radio>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with slotted label content', async () => {
      // Note: When using slot content with complex HTML, the label prop
      // ensures axe-core recognizes the accessible label.
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="terms" value="agree" label="I agree to the Terms">
          I agree to the <a href="/terms">Terms of Service</a>
        </sando-radio>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y in radio group context', async () => {
      const el = await fixture(html`
        <fieldset>
          <legend>Select your preference</legend>
          <sando-radio name="preference" value="a" label="Option A"></sando-radio>
          <sando-radio name="preference" value="b" label="Option B" checked></sando-radio>
          <sando-radio name="preference" value="c" label="Option C"></sando-radio>
        </fieldset>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('WCAG compliance', () => {
    it('should meet WCAG 2.1.1 - Keyboard accessible', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Keyboard test"></sando-radio>
      `);

      // Verify element is in tab order
      const input = el.shadowRoot!.querySelector('input');
      expect(input!.tabIndex).toBeGreaterThanOrEqual(0);

      // Verify keyboard activation works
      const label = el.shadowRoot!.querySelector('label');
      label!.dispatchEvent(
        new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
      );
      await el.updateComplete;

      expect(el.checked).toBe(true);
    });

    it('should meet WCAG 2.4.7 - Focus visible', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Focus test"></sando-radio>
      `);

      el.focus();
      await el.updateComplete;

      // Verify focus is received
      expect(document.activeElement).toBe(el);

      // The component should have focus-visible styles defined
      const input = el.shadowRoot!.querySelector('input');
      expect(input).toBeDefined();
    });

    it('should meet WCAG 4.1.2 - Name, Role, Value', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio name="test" value="a" label="Accessible name"></sando-radio>
      `);

      const input = el.shadowRoot!.querySelector('input');

      // Name: accessible name via label association
      const label = el.shadowRoot!.querySelector('label');
      expect(label!.textContent).toContain('Accessible name');

      // Role: implicit role="radio" from input type="radio"
      expect(input!.type).toBe('radio');

      // Value: aria-checked reflects state
      expect(input!.getAttribute('aria-checked')).toBe('false');
    });
  });
});
