/**
 * Unit Tests for sando-switch
 * Comprehensive tests covering rendering, properties, events, keyboard navigation, and form integration
 */

import { fixture, html, expect as expectWc } from '@open-wc/testing';
import './sando-switch.js';
import type { SandoSwitch } from './sando-switch.js';

describe('sando-switch', () => {
  let element: SandoSwitch;

  beforeEach(async () => {
    element = await fixture<SandoSwitch>(
      html`<sando-switch label="Enable notifications"></sando-switch>`
    );
  });

  describe('Rendering', () => {
    it('should render with default properties', async () => {
      expect(element).toBeDefined();
      expect(element.checked).toBe(false);
      expect(element.disabled).toBe(false);
      expect(element.required).toBe(false);
      expect(element.error).toBe(false);
      expect(element.value).toBe('on');
      expect(element.variant).toBe('solid');
      expect(element.size).toBe('md');
    });

    it('should render label from prop', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Test Label"></sando-switch>
      `);

      const labelSpan = el.shadowRoot!.querySelector('.switch-label');
      expect(labelSpan).toBeDefined();
      expect(labelSpan!.textContent).toContain('Test Label');
    });

    it('should render label from slot', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch>Slotted Label Content</sando-switch>
      `);

      const slot = el.shadowRoot!.querySelector('slot');
      expect(slot).toBeDefined();
      expect(el.textContent).toContain('Slotted Label Content');
    });

    it('should render helperText when provided', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Test" helper-text="This is helper text"></sando-switch>
      `);

      const helpText = el.shadowRoot!.querySelector('sando-help-text');
      expect(helpText).toBeDefined();
      expect(helpText!.textContent).toContain('This is helper text');
    });

    it('should render errorText when error=true', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Test" error error-text="This field is required"></sando-switch>
      `);

      const helpText = el.shadowRoot!.querySelector('sando-help-text');
      expect(helpText).toBeDefined();
      expect(helpText!.getAttribute('variant')).toBe('error');
      expect(helpText!.textContent).toContain('This field is required');
    });

    it('should NOT render errorText when error=false', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch label="Test" error-text="This field is required"></sando-switch>
      `);

      const helpText = el.shadowRoot!.querySelector('sando-help-text');
      // Help text component exists but should not have error variant
      expect(helpText!.getAttribute('variant')).toBe('default');
    });

    it('should prioritize errorText over helperText when error=true', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch
          label="Test"
          error
          helper-text="Helper"
          error-text="Error message"
        ></sando-switch>
      `);

      const helpText = el.shadowRoot!.querySelector('sando-help-text');
      expect(helpText).toBeDefined();
      expect(helpText!.getAttribute('variant')).toBe('error');
      expect(helpText!.textContent).toContain('Error message');
      expect(helpText!.textContent).not.toContain('Helper');
    });

    it('should render with role="switch"', async () => {
      const input = element.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('role')).toBe('switch');
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

    it('should apply solid variant', async () => {
      element.variant = 'solid';
      await element.updateComplete;

      expect(element.variant).toBe('solid');
      expect(element.getAttribute('variant')).toBe('solid');
    });

    it('should apply outline variant', async () => {
      element.variant = 'outline';
      await element.updateComplete;

      expect(element.variant).toBe('outline');
      expect(element.getAttribute('variant')).toBe('outline');
    });

    it('should apply small size', async () => {
      element.size = 'sm';
      await element.updateComplete;

      expect(element.size).toBe('sm');
      expect(element.getAttribute('size')).toBe('sm');
    });

    it('should apply medium size', async () => {
      element.size = 'md';
      await element.updateComplete;

      expect(element.size).toBe('md');
      expect(element.getAttribute('size')).toBe('md');
    });

    it('should apply large size', async () => {
      element.size = 'lg';
      await element.updateComplete;

      expect(element.size).toBe('lg');
      expect(element.getAttribute('size')).toBe('lg');
    });

    it('should pass name to internal input', async () => {
      element.name = 'notifications';
      await element.updateComplete;

      const input = element.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('name')).toBe('notifications');
    });

    it('should pass value to internal input', async () => {
      element.value = 'enabled';
      await element.updateComplete;

      const input = element.shadowRoot!.querySelector('input');
      expect(input!.value).toBe('enabled');
    });

    it('should have default value of "on"', async () => {
      const input = element.shadowRoot!.querySelector('input');
      expect(input!.value).toBe('on');
    });

    it('should show required indicator when required', async () => {
      element.required = true;
      await element.updateComplete;

      // Required indicator is now rendered via CSS ::after pseudo-element
      // We verify the data-required attribute is present on the label
      const label = element.shadowRoot!.querySelector('.switch-label');
      expect(label).toBeDefined();
      expect(label!.hasAttribute('data-required')).toBe(true);
    });
  });

  describe('Events', () => {
    it('should toggle checked state on click', async () => {
      expect(element.checked).toBe(false);

      // Click the internal label container
      const label = element.shadowRoot!.querySelector('label.switch-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      expect(element.checked).toBe(true);
    });

    it('should fire sando-change event with correct detail', async () => {
      let eventDetail: { checked: boolean } | null = null;
      element.addEventListener('sando-change', ((e: CustomEvent) => {
        eventDetail = e.detail;
      }) as EventListener);

      // Click the internal label container
      const label = element.shadowRoot!.querySelector('label.switch-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      expect(eventDetail).toBeDefined();
      expect(eventDetail!.checked).toBe(true);
    });

    it('should not fire events when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      let eventFired = false;
      element.addEventListener('sando-change', () => {
        eventFired = true;
      });

      // Click the internal label container
      const label = element.shadowRoot!.querySelector('label.switch-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      expect(eventFired).toBe(false);
      expect(element.checked).toBe(false);
    });

    it('should toggle on Space key', async () => {
      const container = element.shadowRoot!.querySelector('.switch-container');
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
      const container = element.shadowRoot!.querySelector('.switch-container');
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

    it('should toggle switch when clicking label', async () => {
      const label = element.shadowRoot!.querySelector('label.switch-container') as HTMLElement;
      expect(label).toBeDefined();

      label.click();
      await element.updateComplete;

      expect(element.checked).toBe(true);
    });

    it('should toggle from checked to unchecked on click', async () => {
      element.checked = true;
      await element.updateComplete;

      const label = element.shadowRoot!.querySelector('label.switch-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      expect(element.checked).toBe(false);
    });
  });

  describe('Form Integration', () => {
    it('should maintain checked state for programmatic form handling', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sando-switch name="notifications" value="yes" checked label="Enable"></sando-switch>
          <button type="submit">Submit</button>
        </form>
      `);

      const switchEl = form.querySelector('sando-switch') as SandoSwitch;
      await switchEl.updateComplete;

      // The switch maintains its checked state
      expect(switchEl.checked).toBe(true);
      expect(switchEl.value).toBe('yes');
      expect(switchEl.name).toBe('notifications');

      // Can be used programmatically in form submission
      const formValues = {
        [switchEl.name!]: switchEl.checked ? switchEl.value : null
      };
      expect(formValues.notifications).toBe('yes');
    });

    it('should maintain unchecked state for programmatic form handling', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sando-switch name="notifications" value="yes" label="Enable"></sando-switch>
          <button type="submit">Submit</button>
        </form>
      `);

      const switchEl = form.querySelector('sando-switch') as SandoSwitch;
      await switchEl.updateComplete;

      // The switch maintains its unchecked state
      expect(switchEl.checked).toBe(false);

      // Can be used programmatically
      const formValues = {
        notifications: switchEl.checked ? switchEl.value : null
      };
      expect(formValues.notifications).toBeNull();
    });

    it('should reset on form reset', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sando-switch name="notifications" checked label="Enable"></sando-switch>
          <button type="reset">Reset</button>
        </form>
      `);

      const switchEl = form.querySelector('sando-switch') as SandoSwitch;
      await switchEl.updateComplete;

      expect(switchEl.checked).toBe(true);

      form.reset();
      await switchEl.updateComplete;

      expect(switchEl.checked).toBe(false);
    });

    it('should reset error state on form reset', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sando-switch name="notifications" error label="Enable"></sando-switch>
          <button type="reset">Reset</button>
        </form>
      `);

      const switchEl = form.querySelector('sando-switch') as SandoSwitch;
      await switchEl.updateComplete;

      expect(switchEl.error).toBe(true);

      form.reset();
      await switchEl.updateComplete;

      expect(switchEl.error).toBe(false);
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
          <sando-switch id="sw1" label="First"></sando-switch>
          <sando-switch id="sw2" label="Second"></sando-switch>
          <sando-switch id="sw3" label="Third"></sando-switch>
        </div>
      `);

      const sw1 = container.querySelector('#sw1') as SandoSwitch;
      const sw2 = container.querySelector('#sw2') as SandoSwitch;

      const input1 = sw1.shadowRoot!.querySelector('input');
      const input2 = sw2.shadowRoot!.querySelector('input');

      expect(input1).toBeDefined();
      expect(input2).toBeDefined();
      expect(input1!.hasAttribute('disabled')).toBe(false);
      expect(input2!.hasAttribute('disabled')).toBe(false);
    });

    it('should skip disabled switches in tab order', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <sando-switch id="sw1" label="First"></sando-switch>
          <sando-switch id="sw2" label="Second" disabled></sando-switch>
          <sando-switch id="sw3" label="Third"></sando-switch>
        </div>
      `);

      const sw2 = container.querySelector('#sw2') as SandoSwitch;
      await sw2.updateComplete;

      const input = sw2.shadowRoot!.querySelector('input');
      expect(input!.hasAttribute('disabled')).toBe(true);
    });

    it('should not respond to keyboard when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      const container = element.shadowRoot!.querySelector('.switch-container');
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
      const el = await fixture<SandoSwitch>(html`
        <sando-switch variant="solid" label="Solid"></sando-switch>
      `);

      expect(el.variant).toBe('solid');
      expect(el.getAttribute('variant')).toBe('solid');
    });

    it('should support outline variant', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch variant="outline" label="Outline"></sando-switch>
      `);

      expect(el.variant).toBe('outline');
      expect(el.getAttribute('variant')).toBe('outline');
    });
  });

  describe('Sizes', () => {
    ['sm', 'md', 'lg'].forEach((size) => {
      it(`should support ${size} size`, async () => {
        const el = await fixture<SandoSwitch>(html`
          <sando-switch size="${size}" label="${size}"></sando-switch>
        `);

        expect(el.size).toBe(size);
        expect(el.getAttribute('size')).toBe(size);
      });
    });
  });

  describe('Edge Cases', () => {
    it('should render without label', async () => {
      const el = await fixture<SandoSwitch>(html` <sando-switch></sando-switch> `);

      expect(el).toBeDefined();
      const labelSpan = el.shadowRoot!.querySelector('.switch-label');
      // Label container always renders to allow slot projection
      // The container exists but has no text content when no label prop or slot is provided
      expect(labelSpan).not.toBeNull();
      expect(labelSpan!.textContent?.trim()).toBe('');
    });

    it('should handle empty label string', async () => {
      const el = await fixture<SandoSwitch>(html` <sando-switch label=""></sando-switch> `);

      expect(el).toBeDefined();
      expect(el.label).toBe('');
    });

    it('should handle rapid toggle clicks', async () => {
      const label = element.shadowRoot!.querySelector('label.switch-container') as HTMLElement;

      label.click();
      label.click();
      label.click();
      await element.updateComplete;

      // After 3 clicks, should be checked (false -> true -> false -> true)
      expect(element.checked).toBe(true);
    });

    it('should work with custom value', async () => {
      const el = await fixture<SandoSwitch>(html`
        <sando-switch value="custom-value" checked label="Custom"></sando-switch>
      `);

      expect(el.value).toBe('custom-value');
      expect(el.checked).toBe(true);

      const input = el.shadowRoot!.querySelector('input');
      expect(input!.value).toBe('custom-value');
    });
  });
});
