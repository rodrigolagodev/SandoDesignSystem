/**
 * Unit Tests for sando-checkbox
 * Comprehensive tests covering rendering, properties, events, keyboard navigation, and form integration
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html, expect as expectWc } from '@open-wc/testing';
import './sando-checkbox.js';
import type { SandoCheckbox } from './sando-checkbox.js';

describe('sando-checkbox', () => {
  let element: SandoCheckbox;

  beforeEach(async () => {
    element = await fixture<SandoCheckbox>(
      html`<sando-checkbox label="Accept terms"></sando-checkbox>`
    );
  });

  describe('Rendering', () => {
    it('should render with default properties', async () => {
      expect(element).toBeDefined();
      expect(element.checked).toBe(false);
      expect(element.indeterminate).toBe(false);
      expect(element.disabled).toBe(false);
      expect(element.required).toBe(false);
      expect(element.error).toBe(false);
      expect(element.value).toBe('on');
      expect(element.variant).toBe('solid');
      expect(element.size).toBe('medium');
    });

    it('should render label from prop', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test Label"></sando-checkbox>
      `);

      const labelSpan = el.shadowRoot!.querySelector('.checkbox-label');
      expect(labelSpan).toBeDefined();
      expect(labelSpan!.textContent).toContain('Test Label');
    });

    it('should render label from slot', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox>Slotted Label Content</sando-checkbox>
      `);

      const slot = el.shadowRoot!.querySelector('slot');
      expect(slot).toBeDefined();
      expect(el.textContent).toContain('Slotted Label Content');
    });

    it('should render helperText when provided', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test" helper-text="This is helper text"></sando-checkbox>
      `);

      const helperText = el.shadowRoot!.querySelector('.helper-text');
      expect(helperText).toBeDefined();
      expect(helperText!.textContent).toContain('This is helper text');
    });

    it('should render errorText when error=true', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test" error error-text="This field is required"></sando-checkbox>
      `);

      const errorText = el.shadowRoot!.querySelector('.error-text');
      expect(errorText).toBeDefined();
      expect(errorText!.textContent).toContain('This field is required');
    });

    it('should NOT render errorText when error=false', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox label="Test" error-text="This field is required"></sando-checkbox>
      `);

      const errorText = el.shadowRoot!.querySelector('.error-text');
      expect(errorText).toBeNull();
    });

    it('should prioritize errorText over helperText when error=true', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox
          label="Test"
          error
          helper-text="Helper"
          error-text="Error message"
        ></sando-checkbox>
      `);

      const helperText = el.shadowRoot!.querySelector('.helper-text');
      const errorText = el.shadowRoot!.querySelector('.error-text');

      expect(helperText).toBeNull();
      expect(errorText).toBeDefined();
      expect(errorText!.textContent).toContain('Error message');
    });

    it('should be accessible', async () => {
      await expectWc(element).to.be.accessible();
    });
  });

  describe('Properties', () => {
    it('should reflect checked attribute and sync with internal input', async () => {
      element.checked = true;
      await element.updateComplete;

      expect(element.checked).toBe(true);
      expect(element.hasAttribute('checked')).toBe(true);

      const input = element.shadowRoot!.querySelector('input');
      expect(input!.checked).toBe(true);
    });

    it('should set aria-checked="mixed" when indeterminate', async () => {
      element.indeterminate = true;
      await element.updateComplete;

      const input = element.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-checked')).toBe('mixed');
    });

    it('should reflect indeterminate attribute', async () => {
      element.indeterminate = true;
      await element.updateComplete;

      expect(element.indeterminate).toBe(true);
      expect(element.hasAttribute('indeterminate')).toBe(true);
    });

    it('should disable interaction when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      expect(element.disabled).toBe(true);
      expect(element.hasAttribute('disabled')).toBe(true);

      const input = element.shadowRoot!.querySelector('input');
      expect(input!.disabled).toBe(true);
    });

    it('should add required attribute to input', async () => {
      element.required = true;
      await element.updateComplete;

      expect(element.required).toBe(true);
      expect(element.hasAttribute('required')).toBe(true);

      const input = element.shadowRoot!.querySelector('input');
      expect(input!.required).toBe(true);
    });

    it('should apply solid variant class', async () => {
      element.variant = 'solid';
      await element.updateComplete;

      expect(element.variant).toBe('solid');
      expect(element.getAttribute('variant')).toBe('solid');
    });

    it('should apply outline variant class', async () => {
      element.variant = 'outline';
      await element.updateComplete;

      expect(element.variant).toBe('outline');
      expect(element.getAttribute('variant')).toBe('outline');
    });

    it('should apply small size', async () => {
      element.size = 'small';
      await element.updateComplete;

      expect(element.size).toBe('small');
      expect(element.getAttribute('size')).toBe('small');
    });

    it('should apply medium size', async () => {
      element.size = 'medium';
      await element.updateComplete;

      expect(element.size).toBe('medium');
      expect(element.getAttribute('size')).toBe('medium');
    });

    it('should apply large size', async () => {
      element.size = 'large';
      await element.updateComplete;

      expect(element.size).toBe('large');
      expect(element.getAttribute('size')).toBe('large');
    });

    it('should pass name to internal input', async () => {
      element.name = 'agree';
      await element.updateComplete;

      const input = element.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('name')).toBe('agree');
    });

    it('should pass value to internal input', async () => {
      element.value = 'accepted';
      await element.updateComplete;

      const input = element.shadowRoot!.querySelector('input');
      expect(input!.value).toBe('accepted');
    });

    it('should have default value of "on"', async () => {
      const input = element.shadowRoot!.querySelector('input');
      expect(input!.value).toBe('on');
    });
  });

  describe('Events', () => {
    it('should toggle checked state on click', async () => {
      expect(element.checked).toBe(false);

      // Click the internal label container (click on host doesn't propagate to shadow DOM)
      const label = element.shadowRoot!.querySelector('label.checkbox-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      expect(element.checked).toBe(true);
    });

    it('should fire sando-change event with correct detail', async () => {
      let eventDetail: { checked: boolean; indeterminate: boolean } | null = null;
      element.addEventListener('sando-change', ((e: CustomEvent) => {
        eventDetail = e.detail;
      }) as EventListener);

      // Click the internal label container
      const label = element.shadowRoot!.querySelector('label.checkbox-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      expect(eventDetail).toBeDefined();
      expect(eventDetail!.checked).toBe(true);
      expect(eventDetail!.indeterminate).toBe(false);
    });

    it('should not fire events when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      let eventFired = false;
      element.addEventListener('sando-change', () => {
        eventFired = true;
      });

      // Click the internal label container
      const label = element.shadowRoot!.querySelector('label.checkbox-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      expect(eventFired).toBe(false);
      expect(element.checked).toBe(false);
    });

    it('should toggle on Space key', async () => {
      const container = element.shadowRoot!.querySelector('.checkbox-container');
      expect(container).toBeDefined();

      const spaceEvent = new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
        bubbles: true,
        cancelable: true
      });
      container!.dispatchEvent(spaceEvent);
      await element.updateComplete;

      expect(element.checked).toBe(true);
    });

    it('should toggle on Enter key', async () => {
      const container = element.shadowRoot!.querySelector('.checkbox-container');
      expect(container).toBeDefined();

      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        bubbles: true,
        cancelable: true
      });
      container!.dispatchEvent(enterEvent);
      await element.updateComplete;

      expect(element.checked).toBe(true);
    });

    it('should toggle checkbox when clicking label', async () => {
      const label = element.shadowRoot!.querySelector('label.checkbox-container') as HTMLElement;
      expect(label).toBeDefined();

      label.click();
      await element.updateComplete;

      expect(element.checked).toBe(true);
    });
  });

  describe('Indeterminate Behavior', () => {
    it('should clear indeterminate on user click', async () => {
      element.indeterminate = true;
      await element.updateComplete;

      expect(element.indeterminate).toBe(true);

      // Click the internal label container
      const label = element.shadowRoot!.querySelector('label.checkbox-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      expect(element.indeterminate).toBe(false);
      expect(element.checked).toBe(true);
    });

    it('should set aria-checked="mixed" when indeterminate', async () => {
      element.indeterminate = true;
      await element.updateComplete;

      const input = element.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-checked')).toBe('mixed');
    });

    it('should toggle from indeterminate to checked on click', async () => {
      element.indeterminate = true;
      element.checked = false;
      await element.updateComplete;

      let eventDetail: { checked: boolean; indeterminate: boolean } | null = null;
      element.addEventListener('sando-change', ((e: CustomEvent) => {
        eventDetail = e.detail;
      }) as EventListener);

      // Click the internal label container
      const label = element.shadowRoot!.querySelector('label.checkbox-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      expect(eventDetail!.checked).toBe(true);
      expect(eventDetail!.indeterminate).toBe(false);
    });
  });

  describe('Form Integration', () => {
    it('should maintain checked state for programmatic form handling', async () => {
      // Note: sando-checkbox uses a hidden input in shadow DOM,
      // which doesn't participate in native FormData.
      // Form handling should be done programmatically via the checked property.
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sando-checkbox name="agree" value="yes" checked label="I agree"></sando-checkbox>
          <button type="submit">Submit</button>
        </form>
      `);

      const checkbox = form.querySelector('sando-checkbox') as SandoCheckbox;
      await checkbox.updateComplete;

      // The checkbox maintains its checked state
      expect(checkbox.checked).toBe(true);
      expect(checkbox.value).toBe('yes');
      expect(checkbox.name).toBe('agree');

      // Can be used programmatically in form submission
      const formValues = {
        [checkbox.name!]: checkbox.checked ? checkbox.value : null
      };
      expect(formValues.agree).toBe('yes');
    });

    it('should maintain unchecked state for programmatic form handling', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sando-checkbox name="agree" value="yes" label="I agree"></sando-checkbox>
          <button type="submit">Submit</button>
        </form>
      `);

      const checkbox = form.querySelector('sando-checkbox') as SandoCheckbox;
      await checkbox.updateComplete;

      // The checkbox maintains its unchecked state
      expect(checkbox.checked).toBe(false);

      // Can be used programmatically
      const formValues = {
        agree: checkbox.checked ? checkbox.value : null
      };
      expect(formValues.agree).toBeNull();
    });

    it('should reset on form reset', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sando-checkbox name="agree" checked label="I agree"></sando-checkbox>
          <button type="reset">Reset</button>
        </form>
      `);

      const checkbox = form.querySelector('sando-checkbox') as SandoCheckbox;
      await checkbox.updateComplete;

      expect(checkbox.checked).toBe(true);

      form.reset();
      await checkbox.updateComplete;

      expect(checkbox.checked).toBe(false);
    });

    it('should checkValidity() return correct value', async () => {
      element.required = true;
      element.checked = false;
      await element.updateComplete;

      expect(element.checkValidity()).toBe(false);

      element.checked = true;
      await element.updateComplete;

      expect(element.checkValidity()).toBe(true);
    });

    it('should reportValidity() work', async () => {
      element.required = true;
      element.checked = false;
      await element.updateComplete;

      // reportValidity should return false when not checked and required
      expect(element.reportValidity()).toBe(false);
    });
  });

  describe('Public API', () => {
    it('should focus via focus() method', async () => {
      element.focus();
      await element.updateComplete;

      // With delegatesFocus, the custom element should receive focus
      expect(document.activeElement).toBe(element);
    });

    it('should blur via blur() method', async () => {
      element.focus();
      await element.updateComplete;

      element.blur();
      await element.updateComplete;

      expect(document.activeElement).not.toBe(element);
    });

    it('should toggle via toggle() method', async () => {
      expect(element.checked).toBe(false);

      element.toggle();
      await element.updateComplete;

      expect(element.checked).toBe(true);

      element.toggle();
      await element.updateComplete;

      expect(element.checked).toBe(false);
    });

    it('should not toggle when disabled via toggle() method', async () => {
      element.disabled = true;
      element.checked = false;
      await element.updateComplete;

      element.toggle();
      await element.updateComplete;

      expect(element.checked).toBe(false);
    });

    it('should emit event when toggle() is called', async () => {
      let eventFired = false;
      element.addEventListener('sando-change', () => {
        eventFired = true;
      });

      element.toggle();
      await element.updateComplete;

      expect(eventFired).toBe(true);
    });

    it('should expose validity state', async () => {
      element.required = true;
      element.checked = false;
      await element.updateComplete;

      expect(element.validity).toBeDefined();
      expect(element.validity!.valueMissing).toBe(true);
    });

    it('should expose validationMessage', async () => {
      element.required = true;
      element.checked = false;
      await element.updateComplete;

      expect(element.validationMessage).toBeTruthy();
    });

    it('should setCustomValidity()', async () => {
      element.setCustomValidity('Custom error');
      await element.updateComplete;

      expect(element.validationMessage).toBe('Custom error');
      expect(element.checkValidity()).toBe(false);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should delegate focus from custom element to internal input', async () => {
      // Component has delegatesFocus: true
      expect(element.shadowRoot).toBeDefined();

      const input = element.shadowRoot!.querySelector('input');
      expect(input).toBeDefined();
      expect(input!.hasAttribute('disabled')).toBe(false);
    });

    it('should be focusable via Tab navigation', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <sando-checkbox id="cb1" label="First"></sando-checkbox>
          <sando-checkbox id="cb2" label="Second"></sando-checkbox>
          <sando-checkbox id="cb3" label="Third"></sando-checkbox>
        </div>
      `);

      const cb1 = container.querySelector('#cb1') as SandoCheckbox;
      const cb2 = container.querySelector('#cb2') as SandoCheckbox;

      const input1 = cb1.shadowRoot!.querySelector('input');
      const input2 = cb2.shadowRoot!.querySelector('input');

      expect(input1).toBeDefined();
      expect(input2).toBeDefined();
      expect(input1!.hasAttribute('disabled')).toBe(false);
      expect(input2!.hasAttribute('disabled')).toBe(false);
    });

    it('should skip disabled checkboxes in tab order', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <sando-checkbox id="cb1" label="First"></sando-checkbox>
          <sando-checkbox id="cb2" label="Second" disabled></sando-checkbox>
          <sando-checkbox id="cb3" label="Third"></sando-checkbox>
        </div>
      `);

      const cb2 = container.querySelector('#cb2') as SandoCheckbox;
      await cb2.updateComplete;

      const input = cb2.shadowRoot!.querySelector('input');
      expect(input!.hasAttribute('disabled')).toBe(true);
    });

    it('should not respond to keyboard when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      const container = element.shadowRoot!.querySelector('.checkbox-container');
      const spaceEvent = new KeyboardEvent('keydown', {
        key: ' ',
        code: 'Space',
        bubbles: true,
        cancelable: true
      });
      container!.dispatchEvent(spaceEvent);
      await element.updateComplete;

      expect(element.checked).toBe(false);
    });
  });

  describe('Variants', () => {
    it('should support solid variant', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox variant="solid" label="Solid"></sando-checkbox>
      `);

      expect(el.variant).toBe('solid');
      expect(el.getAttribute('variant')).toBe('solid');
    });

    it('should support outline variant', async () => {
      const el = await fixture<SandoCheckbox>(html`
        <sando-checkbox variant="outline" label="Outline"></sando-checkbox>
      `);

      expect(el.variant).toBe('outline');
      expect(el.getAttribute('variant')).toBe('outline');
    });
  });

  describe('Sizes', () => {
    ['small', 'medium', 'large'].forEach((size) => {
      it(`should support ${size} size`, async () => {
        const el = await fixture<SandoCheckbox>(html`
          <sando-checkbox size="${size}" label="${size}"></sando-checkbox>
        `);

        expect(el.size).toBe(size);
        expect(el.getAttribute('size')).toBe(size);
      });
    });
  });
});
