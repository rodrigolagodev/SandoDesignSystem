/**
 * Unit Tests for sando-radio
 * Comprehensive tests covering rendering, properties, events, keyboard navigation, and form integration
 */

import { fixture, html, expect as expectWc } from '@open-wc/testing';
import './sando-radio.js';
import type { SandoRadio } from './sando-radio.js';

describe('sando-radio', () => {
  let element: SandoRadio;

  beforeEach(async () => {
    element = await fixture<SandoRadio>(html`<sando-radio label="Select option"></sando-radio>`);
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
      const el = await fixture<SandoRadio>(html` <sando-radio label="Test Label"></sando-radio> `);

      const labelSpan = el.shadowRoot!.querySelector('.radio-label');
      expect(labelSpan).toBeDefined();
      expect(labelSpan!.textContent).toContain('Test Label');
    });

    it('should render label from slot', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio>Slotted Label Content</sando-radio>
      `);

      const slot = el.shadowRoot!.querySelector('slot');
      expect(slot).toBeDefined();
      expect(el.textContent).toContain('Slotted Label Content');
    });

    it('should render helperText when provided', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio label="Test" helper-text="This is helper text"></sando-radio>
      `);

      const helperText = el.shadowRoot!.querySelector('.helper-text');
      expect(helperText).toBeDefined();
      expect(helperText!.textContent).toContain('This is helper text');
    });

    it('should render errorText when error=true', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio label="Test" error error-text="This field is required"></sando-radio>
      `);

      const errorText = el.shadowRoot!.querySelector('.error-text');
      expect(errorText).toBeDefined();
      expect(errorText!.textContent).toContain('This field is required');
    });

    it('should NOT render errorText when error=false', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio label="Test" error-text="This field is required"></sando-radio>
      `);

      const errorText = el.shadowRoot!.querySelector('.error-text');
      expect(errorText).toBeNull();
    });

    it('should prioritize errorText over helperText when error=true', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio
          label="Test"
          error
          helper-text="Helper"
          error-text="Error message"
        ></sando-radio>
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

    it('should set aria-checked="true" when checked', async () => {
      element.checked = true;
      await element.updateComplete;

      const input = element.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-checked')).toBe('true');
    });

    it('should set aria-checked="false" when not checked', async () => {
      element.checked = false;
      await element.updateComplete;

      const input = element.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-checked')).toBe('false');
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

    it('should show required indicator when required=true and label exists', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio label="Test" required></sando-radio>
      `);

      // Required indicator is now rendered via CSS ::after pseudo-element
      // We verify the data-required attribute is present on the label
      const label = el.shadowRoot!.querySelector('.radio-label');
      expect(label).toBeDefined();
      expect(label!.hasAttribute('data-required')).toBe(true);
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
      element.name = 'option-group';
      await element.updateComplete;

      const input = element.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('name')).toBe('option-group');
    });

    it('should pass value to internal input', async () => {
      element.value = 'option-a';
      await element.updateComplete;

      const input = element.shadowRoot!.querySelector('input');
      expect(input!.value).toBe('option-a');
    });

    it('should have default value of "on"', async () => {
      const input = element.shadowRoot!.querySelector('input');
      expect(input!.value).toBe('on');
    });

    it('should set aria-invalid when error=true', async () => {
      element.error = true;
      await element.updateComplete;

      const input = element.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('aria-invalid')).toBe('true');
    });
  });

  describe('Interaction', () => {
    it('should select radio on click', async () => {
      expect(element.checked).toBe(false);

      // Click the internal label container
      const label = element.shadowRoot!.querySelector('label.radio-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      expect(element.checked).toBe(true);
    });

    it('should select radio when clicking radio box', async () => {
      expect(element.checked).toBe(false);

      // Click the radio box
      const radioBox = element.shadowRoot!.querySelector('.radio-box') as HTMLElement;
      radioBox.click();
      await element.updateComplete;

      expect(element.checked).toBe(true);
    });

    it('should NOT uncheck by clicking (radio behavior)', async () => {
      // Pre-check the radio
      element.checked = true;
      await element.updateComplete;

      expect(element.checked).toBe(true);

      // Attempt to click again - should remain checked
      const label = element.shadowRoot!.querySelector('label.radio-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      // Radio buttons cannot be unchecked by clicking
      expect(element.checked).toBe(true);
    });

    it('should not change state when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      expect(element.checked).toBe(false);

      // Click the internal label container
      const label = element.shadowRoot!.querySelector('label.radio-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      expect(element.checked).toBe(false);
    });

    it('should select on Space key', async () => {
      const container = element.shadowRoot!.querySelector('.radio-container');
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

    it('should select on Enter key', async () => {
      const container = element.shadowRoot!.querySelector('.radio-container');
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

    it('should select radio when clicking label', async () => {
      const label = element.shadowRoot!.querySelector('label.radio-container') as HTMLElement;
      expect(label).toBeDefined();

      label.click();
      await element.updateComplete;

      expect(element.checked).toBe(true);
    });
  });

  describe('Events', () => {
    it('should fire sando-change event with correct detail', async () => {
      let eventDetail: { checked: boolean; value: string } | null = null;
      element.addEventListener('sando-change', ((e: CustomEvent) => {
        eventDetail = e.detail;
      }) as EventListener);

      // Click the internal label container
      const label = element.shadowRoot!.querySelector('label.radio-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      expect(eventDetail).toBeDefined();
      expect(eventDetail!.checked).toBe(true);
      expect(eventDetail!.value).toBe('on');
    });

    it('should include value in event detail', async () => {
      element.value = 'option-a';
      await element.updateComplete;

      let eventDetail: { checked: boolean; value: string } | null = null;
      element.addEventListener('sando-change', ((e: CustomEvent) => {
        eventDetail = e.detail;
      }) as EventListener);

      const label = element.shadowRoot!.querySelector('label.radio-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      expect(eventDetail!.value).toBe('option-a');
    });

    it('should have event that bubbles and composes', async () => {
      let eventBubbles = false;
      let eventComposed = false;

      element.addEventListener('sando-change', ((e: CustomEvent) => {
        eventBubbles = e.bubbles;
        eventComposed = e.composed;
      }) as EventListener);

      const label = element.shadowRoot!.querySelector('label.radio-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      expect(eventBubbles).toBe(true);
      expect(eventComposed).toBe(true);
    });

    it('should NOT fire events when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      let eventFired = false;
      element.addEventListener('sando-change', () => {
        eventFired = true;
      });

      // Click the internal label container
      const label = element.shadowRoot!.querySelector('label.radio-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      expect(eventFired).toBe(false);
      expect(element.checked).toBe(false);
    });

    it('should NOT fire event when already checked (clicking again)', async () => {
      // Pre-check the radio
      element.checked = true;
      await element.updateComplete;

      let eventCount = 0;
      element.addEventListener('sando-change', () => {
        eventCount++;
      });

      // Click the already-checked radio
      const label = element.shadowRoot!.querySelector('label.radio-container') as HTMLElement;
      label.click();
      await element.updateComplete;

      // Event should not fire since it was already checked
      expect(eventCount).toBe(0);
    });

    it('should fire event when selecting via select() method', async () => {
      let eventFired = false;
      element.addEventListener('sando-change', () => {
        eventFired = true;
      });

      element.select();
      await element.updateComplete;

      expect(eventFired).toBe(true);
    });

    it('should NOT fire event when select() called on already-checked radio', async () => {
      element.checked = true;
      await element.updateComplete;

      let eventFired = false;
      element.addEventListener('sando-change', () => {
        eventFired = true;
      });

      element.select();
      await element.updateComplete;

      expect(eventFired).toBe(false);
    });
  });

  describe('Form Integration', () => {
    it('should maintain checked state for programmatic form handling', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sando-radio name="option" value="yes" checked label="Option Yes"></sando-radio>
          <button type="submit">Submit</button>
        </form>
      `);

      const radio = form.querySelector('sando-radio') as SandoRadio;
      await radio.updateComplete;

      // The radio maintains its checked state
      expect(radio.checked).toBe(true);
      expect(radio.value).toBe('yes');
      expect(radio.name).toBe('option');

      // Can be used programmatically in form submission
      const formValues = {
        [radio.name!]: radio.checked ? radio.value : null
      };
      expect(formValues.option).toBe('yes');
    });

    it('should participate in form via native input', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sando-radio name="choice" value="a" label="Choice A"></sando-radio>
          <sando-radio name="choice" value="b" checked label="Choice B"></sando-radio>
        </form>
      `);

      const radioA = form.querySelectorAll('sando-radio')[0] as SandoRadio;
      const radioB = form.querySelectorAll('sando-radio')[1] as SandoRadio;

      expect(radioA.checked).toBe(false);
      expect(radioB.checked).toBe(true);

      // Both radios have the same name
      expect(radioA.name).toBe('choice');
      expect(radioB.name).toBe('choice');
    });

    it('should reset on form reset', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sando-radio name="option" checked label="Selected option"></sando-radio>
          <button type="reset">Reset</button>
        </form>
      `);

      const radio = form.querySelector('sando-radio') as SandoRadio;
      await radio.updateComplete;

      expect(radio.checked).toBe(true);

      form.reset();
      await radio.updateComplete;

      expect(radio.checked).toBe(false);
    });

    it('should clear error state on form reset', async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <sando-radio name="option" error error-text="Required" label="Option"></sando-radio>
          <button type="reset">Reset</button>
        </form>
      `);

      const radio = form.querySelector('sando-radio') as SandoRadio;
      await radio.updateComplete;

      expect(radio.error).toBe(true);

      form.reset();
      await radio.updateComplete;

      expect(radio.error).toBe(false);
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

    it('should select via select() method', async () => {
      expect(element.checked).toBe(false);

      element.select();
      await element.updateComplete;

      expect(element.checked).toBe(true);
    });

    it('should not change state when select() called on already-checked radio', async () => {
      element.checked = true;
      await element.updateComplete;

      element.select();
      await element.updateComplete;

      expect(element.checked).toBe(true);
    });

    it('should not select when disabled via select() method', async () => {
      element.disabled = true;
      element.checked = false;
      await element.updateComplete;

      element.select();
      await element.updateComplete;

      expect(element.checked).toBe(false);
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

    it('should clear custom validity with empty string', async () => {
      element.setCustomValidity('Custom error');
      await element.updateComplete;
      expect(element.checkValidity()).toBe(false);

      element.setCustomValidity('');
      await element.updateComplete;
      expect(element.checkValidity()).toBe(true);
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
          <sando-radio id="r1" name="group" label="First"></sando-radio>
          <sando-radio id="r2" name="group" label="Second"></sando-radio>
          <sando-radio id="r3" name="group" label="Third"></sando-radio>
        </div>
      `);

      const r1 = container.querySelector('#r1') as SandoRadio;
      const r2 = container.querySelector('#r2') as SandoRadio;

      const input1 = r1.shadowRoot!.querySelector('input');
      const input2 = r2.shadowRoot!.querySelector('input');

      expect(input1).toBeDefined();
      expect(input2).toBeDefined();
      expect(input1!.hasAttribute('disabled')).toBe(false);
      expect(input2!.hasAttribute('disabled')).toBe(false);
    });

    it('should skip disabled radios in tab order', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <sando-radio id="r1" name="group" label="First"></sando-radio>
          <sando-radio id="r2" name="group" label="Second" disabled></sando-radio>
          <sando-radio id="r3" name="group" label="Third"></sando-radio>
        </div>
      `);

      const r2 = container.querySelector('#r2') as SandoRadio;
      await r2.updateComplete;

      const input = r2.shadowRoot!.querySelector('input');
      expect(input!.hasAttribute('disabled')).toBe(true);
    });

    it('should not respond to keyboard when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      const container = element.shadowRoot!.querySelector('.radio-container');
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

    it('should not respond to Enter key when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;

      const container = element.shadowRoot!.querySelector('.radio-container');
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        bubbles: true,
        cancelable: true
      });
      container!.dispatchEvent(enterEvent);
      await element.updateComplete;

      expect(element.checked).toBe(false);
    });
  });

  describe('Variants', () => {
    it('should support solid variant', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio variant="solid" label="Solid"></sando-radio>
      `);

      expect(el.variant).toBe('solid');
      expect(el.getAttribute('variant')).toBe('solid');
    });

    it('should support outline variant', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio variant="outline" label="Outline"></sando-radio>
      `);

      expect(el.variant).toBe('outline');
      expect(el.getAttribute('variant')).toBe('outline');
    });

    it('should default to solid variant', async () => {
      const el = await fixture<SandoRadio>(html` <sando-radio label="Default"></sando-radio> `);

      expect(el.variant).toBe('solid');
    });
  });

  describe('Sizes', () => {
    ['sm', 'md', 'lg'].forEach((size) => {
      it(`should support ${size} size`, async () => {
        const el = await fixture<SandoRadio>(html`
          <sando-radio size="${size}" label="${size}"></sando-radio>
        `);

        expect(el.size).toBe(size);
        expect(el.getAttribute('size')).toBe(size);
      });
    });

    it('should default to md size', async () => {
      const el = await fixture<SandoRadio>(html` <sando-radio label="Default"></sando-radio> `);

      expect(el.size).toBe('md');
    });
  });

  describe('Radio Group Behavior', () => {
    it('should have same name for radio group', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <sando-radio name="color" value="red" label="Red"></sando-radio>
          <sando-radio name="color" value="blue" label="Blue"></sando-radio>
          <sando-radio name="color" value="green" label="Green"></sando-radio>
        </div>
      `);

      const radios = container.querySelectorAll('sando-radio');
      radios.forEach((radio) => {
        expect(radio.getAttribute('name')).toBe('color');
      });
    });

    it('should have unique values in radio group', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <sando-radio name="size" value="small" label="Small"></sando-radio>
          <sando-radio name="size" value="medium" label="Medium"></sando-radio>
          <sando-radio name="size" value="large" label="Large"></sando-radio>
        </div>
      `);

      const radios = Array.from(container.querySelectorAll('sando-radio'));
      const values = radios.map((r) => r.getAttribute('value'));

      expect(values).toEqual(['small', 'medium', 'large']);
    });

    it('should only have one checked radio at component level', async () => {
      const container = await fixture<HTMLDivElement>(html`
        <div>
          <sando-radio name="choice" value="a" checked label="A"></sando-radio>
          <sando-radio name="choice" value="b" label="B"></sando-radio>
          <sando-radio name="choice" value="c" label="C"></sando-radio>
        </div>
      `);

      const radios = Array.from(container.querySelectorAll('sando-radio')) as SandoRadio[];
      const checkedRadios = radios.filter((r) => r.checked);

      expect(checkedRadios.length).toBe(1);
      expect(checkedRadios[0].value).toBe('a');
    });
  });

  describe('Accessibility', () => {
    it('should have type="radio" on input', async () => {
      const input = element.shadowRoot!.querySelector('input');
      expect(input!.getAttribute('type')).toBe('radio');
    });

    it('should associate label with input via for attribute', async () => {
      const label = element.shadowRoot!.querySelector('label');
      const input = element.shadowRoot!.querySelector('input');

      expect(label!.getAttribute('for')).toBe(input!.id);
    });

    it('should have aria-describedby when helper text exists', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio label="Test" helper-text="Helper"></sando-radio>
      `);

      const input = el.shadowRoot!.querySelector('input');
      const description = el.shadowRoot!.querySelector('.radio-description');

      expect(input!.hasAttribute('aria-describedby')).toBe(true);
      expect(description).toBeDefined();
    });

    it('should have aria-describedby when error text exists', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio label="Test" error error-text="Error"></sando-radio>
      `);

      const input = el.shadowRoot!.querySelector('input');
      const description = el.shadowRoot!.querySelector('.error-text');

      expect(input!.hasAttribute('aria-describedby')).toBe(true);
      expect(description).toBeDefined();
    });

    it('should have role="alert" on error text', async () => {
      const el = await fixture<SandoRadio>(html`
        <sando-radio label="Test" error error-text="Error message"></sando-radio>
      `);

      const errorText = el.shadowRoot!.querySelector('.error-text');
      expect(errorText!.getAttribute('role')).toBe('alert');
    });

    it('should have role="presentation" on visual radio box', async () => {
      const radioBox = element.shadowRoot!.querySelector('.radio-box');
      expect(radioBox!.getAttribute('role')).toBe('presentation');
    });

    it('should have aria-hidden="true" on radio dot', async () => {
      const radioDot = element.shadowRoot!.querySelector('.radio-dot');
      expect(radioDot!.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
