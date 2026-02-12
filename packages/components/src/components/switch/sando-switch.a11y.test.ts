/**
 * Accessibility Tests for sando-switch
 * Uses axe-core for WCAG compliance testing and manual ARIA attribute verification
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-switch.js';
import type { SandoSwitch } from './sando-switch.js';

describe('sando-switch Accessibility', () => {
  describe('axe-core validation', () => {
    it('should have no accessibility violations (default)', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Enable notifications"></sando-switch>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when checked', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Enable notifications" checked></sando-switch>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when disabled', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Enable notifications" disabled></sando-switch>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when required', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Accept terms" required></sando-switch>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with error state', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch
          label="Enable feature"
          error
          error-text="This setting is required"
        ></sando-switch>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with helper text', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch
          label="Auto-save"
          helper-text="Automatically save your changes"
        ></sando-switch>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('variant accessibility', () => {
    it('should pass a11y with solid variant', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch variant="solid" label="Solid switch"></sando-switch>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with outline variant', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch variant="outline" label="Outline switch"></sando-switch>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('size accessibility', () => {
    ['sm', 'md', 'lg'].forEach((size) => {
      it(`should pass a11y with ${size} size`, async () => {
        const el = await fixture<SandoSwitch>(html`
          <sando-switch size="${size}" label="${size} switch"></sando-switch>
        `);

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      });
    });
  });

  describe('ARIA attributes', () => {
    it('should have role="switch"', async () => {
      const el = await fixture<SandoSwitch>(html` <sando-switch label="Test"></sando-switch> `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('role')).toBe('switch');
    });

    it('should have aria-checked="false" when unchecked', async () => {
      const el = await fixture<SandoSwitch>(html` <sando-switch label="Test"></sando-switch> `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-checked')).toBe('false');
    });

    it('should have aria-checked="true" when checked', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Test" checked></sando-switch>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-checked')).toBe('true');
    });

    it('should update aria-checked when toggled', async () => {
      const el = await fixture<SandoSwitch>(html` <sando-switch label="Test"></sando-switch> `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-checked')).toBe('false');

      el.toggle();
      await el.updateComplete;

      expect(input!.getAttribute('aria-checked')).toBe('true');
    });

    it('should have aria-invalid="true" when error', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Test" error></sando-switch>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-invalid')).toBe('true');
    });

    it('should have aria-invalid="false" when not error', async () => {
      const el = await fixture<SandoSwitch>(html` <sando-switch label="Test"></sando-switch> `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-invalid')).toBe('false');
    });

    it('should have aria-describedby linked to helper text', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Test" helper-text="Helper text"></sando-switch>
      `);

      const input = el.shadowRoot!.querySelector('input');
      const describedBy = input!.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const helperTextElement = el.shadowRoot!.querySelector(`#${describedBy}`);
      expect(helperTextElement).toBeDefined();
      expect(helperTextElement!.textContent).toContain('Helper text');
    });

    it('should have aria-describedby linked to error text', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Test" error error-text="Error message"></sando-switch>
      `);

      const input = el.shadowRoot!.querySelector('input');
      const describedBy = input!.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const errorTextElement = el.shadowRoot!.querySelector(`#${describedBy}`);
      expect(errorTextElement).toBeDefined();
      expect(errorTextElement!.textContent).toContain('Error message');
    });

    it('should have required attribute on input when required', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Test" required></sando-switch>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.required).toBe(true);
    });
  });

  describe('Focus management', () => {
    it('should be focusable', async () => {
      const el = await fixture<SandoSwitch>(html` <sando-switch label="Test"></sando-switch> `);

      el.focus();
      await el.updateComplete;

      // With delegatesFocus: true, the custom element receives focus
      expect(document.activeElement).toBe(el);
    });

    it('should not be focusable when disabled', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Test" disabled></sando-switch>
      `);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.disabled).toBe(true);
    });

    it('should have visible focus indicator', async () => {
      const el = await fixture<SandoSwitch>(html` <sando-switch label="Test"></sando-switch> `);

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
      const el = await fixture<SandoSwitch>(html` <sando-switch label="Test"></sando-switch> `);

      let eventFired = false;
      el.addEventListener('sando-change', () => {
        eventFired = true;
      });

      const container = el.shadowRoot!.querySelector('.switch-container');
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
      const el = await fixture<SandoSwitch>(html` <sando-switch label="Test"></sando-switch> `);

      let eventFired = false;
      el.addEventListener('sando-change', () => {
        eventFired = true;
      });

      const container = el.shadowRoot!.querySelector('.switch-container');
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
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Test" disabled></sando-switch>
      `);

      let eventFired = false;
      el.addEventListener('sando-change', () => {
        eventFired = true;
      });

      const container = el.shadowRoot!.querySelector('.switch-container');
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

    it('should toggle state with Space key multiple times', async () => {
      const el = await fixture<SandoSwitch>(html` <sando-switch label="Test"></sando-switch> `);

      const container = el.shadowRoot!.querySelector('.switch-container');

      // First press - toggle on
      const spaceEvent1 = new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
        bubbles: true,
        cancelable: true
      });
      container!.dispatchEvent(spaceEvent1);
      await el.updateComplete;
      expect(el.checked).toBe(true);

      // Second press - toggle off
      const spaceEvent2 = new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
        bubbles: true,
        cancelable: true
      });
      container!.dispatchEvent(spaceEvent2);
      await el.updateComplete;
      expect(el.checked).toBe(false);
    });
  });

  describe('Screen reader support', () => {
    it('should have label announced via label association', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Enable dark mode"></sando-switch>
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
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Enable" error error-text="This setting is required"></sando-switch>
      `);

      // sando-help-text handles the alert role internally
      const helpText = el.shadowRoot!.querySelector('sando-help-text');
      expect(helpText).toBeDefined();
      expect(helpText!.getAttribute('variant')).toBe('error');
    });

    it('should announce helper text via aria-describedby', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Auto-save" helper-text="Save your work automatically"></sando-switch>
      `);

      const input = el.shadowRoot!.querySelector('input');
      const describedBy = input!.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();

      const description = el.shadowRoot!.querySelector(`#${describedBy}`);
      expect(description!.textContent).toContain('Save your work automatically');
    });

    it('should have switch role for correct screen reader announcement', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Enable feature"></sando-switch>
      `);

      const input = el.shadowRoot!.querySelector('input');
      // role="switch" ensures screen readers announce "switch" instead of "checkbox"
      expect(input!.getAttribute('role')).toBe('switch');
    });
  });

  describe('Color contrast', () => {
    it('should have sufficient color contrast in default state', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Test switch"></sando-switch>
      `);

      const results = await axe(el, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    });

    it('should have sufficient color contrast when checked', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Test switch" checked></sando-switch>
      `);

      const results = await axe(el, {
        rules: {
          'color-contrast': { enabled: true }
        }
      });

      expect(results).toHaveNoViolations();
    });

    it('should have sufficient color contrast in error state', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Test switch" error error-text="Error message"></sando-switch>
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
        const el = await fixture<SandoSwitch>(html`
          <div flavor="${flavor}">
            <sando-switch label="Test switch"></sando-switch>
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
        const el = await fixture<SandoSwitch>(html`
          <div flavor="${flavor}">
            <sando-switch label="Test switch" checked></sando-switch>
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
        const el = await fixture<SandoSwitch>(html`
          <div flavor="${flavor}">
            <sando-switch label="Test switch" error error-text="Error"></sando-switch>
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
      const el = await fixture<SandoSwitch>(html`
        <sando-switch
          label="Enable feature"
          checked
          required
          variant="outline"
          size="lg"
          helper-text="This enables the feature"
        ></sando-switch>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y with slotted label content', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="I agree to the Terms of Service">
          I agree to the <a href="/terms">Terms of Service</a>
        </sando-switch>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y when disabled and checked', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Feature enabled" disabled checked></sando-switch>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass a11y when required and error', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch
          label="Required setting"
          required
          error
          error-text="This setting is required"
        ></sando-switch>
      `);

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Switch-specific semantics', () => {
    it('should differ from checkbox by having role="switch"', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Toggle setting"></sando-switch>
      `);

      const input = el.shadowRoot!.querySelector('input');
      // A switch uses role="switch", not role="checkbox"
      // This is important for screen reader users to understand the control type
      expect(input!.getAttribute('role')).toBe('switch');
      expect(input!.type).toBe('checkbox'); // Uses checkbox as base but with switch role
    });

    it('should have correct state announcement (on/off not checked/unchecked)', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Dark mode"></sando-switch>
      `);

      const input = el.shadowRoot!.querySelector('input');

      // When unchecked, aria-checked="false" should announce as "off"
      expect(input!.getAttribute('aria-checked')).toBe('false');

      el.toggle();
      await el.updateComplete;

      // When checked, aria-checked="true" should announce as "on"
      expect(input!.getAttribute('aria-checked')).toBe('true');
    });
  });
});
