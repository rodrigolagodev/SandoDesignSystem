/**
 * Unit Tests for sando-radio-group
 * Comprehensive tests covering rendering, properties, events, keyboard navigation,
 * state management, and disabled state behavior.
 */

import { fixture, html, expect as expectWc } from '@open-wc/testing';
import './sando-radio-group.js';
import '../radio/sando-radio.js';
import type { SandoRadioGroup } from './sando-radio-group.js';
import type { SandoRadio } from '../radio/sando-radio.js';

describe('sando-radio-group', () => {
  /**
   * Helper function to create a standard radio group fixture
   */
  async function createRadioGroup(
    options: {
      name?: string;
      value?: string;
      label?: string;
      helperText?: string;
      errorText?: string;
      error?: boolean;
      required?: boolean;
      disabled?: boolean;
      orientation?: 'vertical' | 'horizontal';
      radioValues?: string[];
    } = {}
  ) {
    const {
      name = 'test-group',
      value,
      label,
      helperText,
      errorText,
      error = false,
      required = false,
      disabled = false,
      orientation = 'vertical',
      radioValues = ['option1', 'option2', 'option3']
    } = options;

    return await fixture<SandoRadioGroup>(html`
      <sando-radio-group
        name=${name}
        .value=${value}
        .label=${label}
        .helperText=${helperText}
        .errorText=${errorText}
        ?error=${error}
        ?required=${required}
        ?disabled=${disabled}
        orientation=${orientation}
      >
        ${radioValues.map(
          (val, i) => html` <sando-radio value=${val} label="Option ${i + 1}"></sando-radio> `
        )}
      </sando-radio-group>
    `);
  }

  describe('Rendering', () => {
    it('should render with default properties', async () => {
      const el = await createRadioGroup();

      expect(el).toBeDefined();
      expect(el.tagName.toLowerCase()).toBe('sando-radio-group');
      expect(el.disabled).toBe(false);
      expect(el.error).toBe(false);
      expect(el.required).toBe(false);
      expect(el.orientation).toBe('vertical');
    });

    it('should render with role="radiogroup"', async () => {
      const el = await createRadioGroup();

      const radioGroup = el.shadowRoot!.querySelector('[role="radiogroup"]');
      expect(radioGroup).toBeDefined();
    });

    it('should render label when provided', async () => {
      const el = await createRadioGroup({ label: 'Choose an option' });
      await el.updateComplete;

      const label = el.shadowRoot!.querySelector('.radio-group-label');
      expect(label).toBeDefined();
      expect(label!.textContent).toContain('Choose an option');
    });

    it('should NOT render label when not provided', async () => {
      const el = await createRadioGroup();

      const label = el.shadowRoot!.querySelector('.radio-group-label');
      expect(label).toBeNull();
    });

    it('should render helper text when provided', async () => {
      const el = await createRadioGroup({ helperText: 'Select one of the options below' });
      await el.updateComplete;

      const helperText = el.shadowRoot!.querySelector('.helper-text');
      expect(helperText).toBeDefined();
      expect(helperText!.textContent).toContain('Select one of the options below');
    });

    it('should render error text when error=true and errorText is provided', async () => {
      const el = await createRadioGroup({
        error: true,
        errorText: 'Please select an option'
      });
      await el.updateComplete;

      const errorText = el.shadowRoot!.querySelector('.error-text');
      expect(errorText).toBeDefined();
      expect(errorText!.textContent).toContain('Please select an option');
    });

    it('should NOT render error text when error=false', async () => {
      const el = await createRadioGroup({
        error: false,
        errorText: 'Please select an option'
      });
      await el.updateComplete;

      const errorText = el.shadowRoot!.querySelector('.error-text');
      expect(errorText).toBeNull();
    });

    it('should prioritize errorText over helperText when error=true', async () => {
      const el = await createRadioGroup({
        helperText: 'Helper text',
        errorText: 'Error text',
        error: true
      });
      await el.updateComplete;

      const helperText = el.shadowRoot!.querySelector('.helper-text');
      const errorText = el.shadowRoot!.querySelector('.error-text');

      expect(helperText).toBeNull();
      expect(errorText).toBeDefined();
      expect(errorText!.textContent).toContain('Error text');
    });

    it('should render required indicator when required=true and label exists', async () => {
      const el = await createRadioGroup({ label: 'Required field', required: true });
      await el.updateComplete;

      const indicator = el.shadowRoot!.querySelector('.required-indicator');
      expect(indicator).toBeDefined();
      expect(indicator!.textContent).toBe('*');
    });

    it('should NOT render required indicator when no label', async () => {
      const el = await createRadioGroup({ required: true });
      await el.updateComplete;

      const indicator = el.shadowRoot!.querySelector('.required-indicator');
      expect(indicator).toBeNull();
    });

    it('should render in vertical orientation by default', async () => {
      const el = await createRadioGroup();

      expect(el.orientation).toBe('vertical');
      expect(el.getAttribute('orientation')).toBe('vertical');
    });

    it('should render in horizontal orientation when specified', async () => {
      const el = await createRadioGroup({ orientation: 'horizontal' });

      expect(el.orientation).toBe('horizontal');
      expect(el.getAttribute('orientation')).toBe('horizontal');
    });

    it('should render slotted radio buttons', async () => {
      const el = await createRadioGroup();

      const radios = el.querySelectorAll('sando-radio');
      expect(radios.length).toBe(3);
    });

    it('should have role="presentation" on options container', async () => {
      const el = await createRadioGroup();

      const optionsContainer = el.shadowRoot!.querySelector('.radio-group-options');
      expect(optionsContainer!.getAttribute('role')).toBe('presentation');
    });
  });

  describe('Props', () => {
    it('should propagate name to child radios', async () => {
      const el = await createRadioGroup({ name: 'color-choice' });
      await el.updateComplete;

      // Wait for initialization
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      radios.forEach((radio) => {
        expect(radio.name).toBe('color-choice');
      });
    });

    it('should select matching radio when value is set', async () => {
      const el = await createRadioGroup({ value: 'option2' });
      await el.updateComplete;

      // Wait for initialization
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      expect(radios[0].checked).toBe(false);
      expect(radios[1].checked).toBe(true);
      expect(radios[2].checked).toBe(false);
    });

    it('should propagate disabled to child radios', async () => {
      const el = await createRadioGroup({ disabled: true });
      await el.updateComplete;

      // Wait for initialization
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      radios.forEach((radio) => {
        expect(radio.disabled).toBe(true);
      });
    });

    it('should propagate error to child radios', async () => {
      const el = await createRadioGroup({ error: true });
      await el.updateComplete;

      // Wait for initialization
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      radios.forEach((radio) => {
        expect(radio.error).toBe(true);
      });
    });

    it('should update name on child radios when name changes', async () => {
      const el = await createRadioGroup({ name: 'initial-name' });
      await el.updateComplete;

      el.name = 'new-name';
      await el.updateComplete;

      // Wait for sync
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      radios.forEach((radio) => {
        expect(radio.name).toBe('new-name');
      });
    });

    it('should reflect orientation attribute', async () => {
      const el = await createRadioGroup({ orientation: 'horizontal' });

      expect(el.getAttribute('orientation')).toBe('horizontal');

      el.orientation = 'vertical';
      await el.updateComplete;

      expect(el.getAttribute('orientation')).toBe('vertical');
    });

    it('should reflect disabled attribute', async () => {
      const el = await createRadioGroup({ disabled: true });

      expect(el.hasAttribute('disabled')).toBe(true);

      el.disabled = false;
      await el.updateComplete;

      expect(el.hasAttribute('disabled')).toBe(false);
    });

    it('should reflect error attribute', async () => {
      const el = await createRadioGroup({ error: true });

      expect(el.hasAttribute('error')).toBe(true);

      el.error = false;
      await el.updateComplete;

      expect(el.hasAttribute('error')).toBe(false);
    });

    it('should reflect required attribute', async () => {
      const el = await createRadioGroup({ required: true });

      expect(el.hasAttribute('required')).toBe(true);

      el.required = false;
      await el.updateComplete;

      expect(el.hasAttribute('required')).toBe(false);
    });
  });

  describe('Interaction', () => {
    it('should select radio on click', async () => {
      const el = await createRadioGroup();
      await el.updateComplete;

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      const radioContainer = radios[1].shadowRoot!.querySelector(
        'label.radio-container'
      ) as HTMLElement;
      radioContainer.click();
      await el.updateComplete;

      expect(radios[1].checked).toBe(true);
      expect(el.value).toBe('option2');
    });

    it('should change selection when clicking different radio', async () => {
      const el = await createRadioGroup({ value: 'option1' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      expect(radios[0].checked).toBe(true);

      // Click on second radio
      const radioContainer = radios[1].shadowRoot!.querySelector(
        'label.radio-container'
      ) as HTMLElement;
      radioContainer.click();
      await el.updateComplete;

      expect(radios[0].checked).toBe(false);
      expect(radios[1].checked).toBe(true);
      expect(el.value).toBe('option2');
    });

    it('should fire sando-change event with value and name', async () => {
      const el = await createRadioGroup({ name: 'test-name' });
      await el.updateComplete;

      let eventDetail: { value: string; name: string } | null = null;
      el.addEventListener('sando-change', ((e: CustomEvent) => {
        eventDetail = e.detail;
      }) as EventListener);

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      const radioContainer = radios[1].shadowRoot!.querySelector(
        'label.radio-container'
      ) as HTMLElement;
      radioContainer.click();
      await el.updateComplete;

      expect(eventDetail).toBeDefined();
      expect(eventDetail!.value).toBe('option2');
      expect(eventDetail!.name).toBe('test-name');
    });

    it('should have event that bubbles and composes', async () => {
      const el = await createRadioGroup();
      await el.updateComplete;

      let eventBubbles = false;
      let eventComposed = false;

      el.addEventListener('sando-change', ((e: CustomEvent) => {
        eventBubbles = e.bubbles;
        eventComposed = e.composed;
      }) as EventListener);

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      const radioContainer = radios[0].shadowRoot!.querySelector(
        'label.radio-container'
      ) as HTMLElement;
      radioContainer.click();
      await el.updateComplete;

      expect(eventBubbles).toBe(true);
      expect(eventComposed).toBe(true);
    });

    it('should not fire events when disabled', async () => {
      const el = await createRadioGroup({ disabled: true });
      await el.updateComplete;

      let eventFired = false;
      el.addEventListener('sando-change', () => {
        eventFired = true;
      });

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      const radioContainer = radios[0].shadowRoot!.querySelector(
        'label.radio-container'
      ) as HTMLElement;
      radioContainer.click();
      await el.updateComplete;

      expect(eventFired).toBe(false);
    });

    it('should only allow one radio to be checked at a time', async () => {
      const el = await createRadioGroup();
      await el.updateComplete;

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;

      // Click first
      (radios[0].shadowRoot!.querySelector('label.radio-container') as HTMLElement).click();
      await el.updateComplete;

      // Click second
      (radios[1].shadowRoot!.querySelector('label.radio-container') as HTMLElement).click();
      await el.updateComplete;

      const checkedRadios = Array.from(radios).filter((r) => r.checked);
      expect(checkedRadios.length).toBe(1);
      expect(checkedRadios[0].value).toBe('option2');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should move to next radio on ArrowDown', async () => {
      const el = await createRadioGroup({ value: 'option1' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      radios[0].focus();

      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);
      await el.updateComplete;

      expect(el.value).toBe('option2');
      expect(radios[1].checked).toBe(true);
    });

    it('should move to previous radio on ArrowUp', async () => {
      const el = await createRadioGroup({ value: 'option2' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      radios[1].focus();

      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);
      await el.updateComplete;

      expect(el.value).toBe('option1');
      expect(radios[0].checked).toBe(true);
    });

    it('should move to next radio on ArrowRight', async () => {
      const el = await createRadioGroup({ value: 'option1', orientation: 'horizontal' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      radios[0].focus();

      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);
      await el.updateComplete;

      expect(el.value).toBe('option2');
      expect(radios[1].checked).toBe(true);
    });

    it('should move to previous radio on ArrowLeft', async () => {
      const el = await createRadioGroup({ value: 'option2', orientation: 'horizontal' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      radios[1].focus();

      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowLeft',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);
      await el.updateComplete;

      expect(el.value).toBe('option1');
      expect(radios[0].checked).toBe(true);
    });

    it('should wrap from last to first on ArrowDown', async () => {
      const el = await createRadioGroup({ value: 'option3' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      radios[2].focus();

      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);
      await el.updateComplete;

      expect(el.value).toBe('option1');
      expect(radios[0].checked).toBe(true);
    });

    it('should wrap from first to last on ArrowUp', async () => {
      const el = await createRadioGroup({ value: 'option1' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      radios[0].focus();

      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);
      await el.updateComplete;

      expect(el.value).toBe('option3');
      expect(radios[2].checked).toBe(true);
    });

    it('should move to first radio on Home key', async () => {
      const el = await createRadioGroup({ value: 'option3' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      radios[2].focus();

      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'Home',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);
      await el.updateComplete;

      expect(el.value).toBe('option1');
      expect(radios[0].checked).toBe(true);
    });

    it('should move to last radio on End key', async () => {
      const el = await createRadioGroup({ value: 'option1' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      radios[0].focus();

      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'End',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);
      await el.updateComplete;

      expect(el.value).toBe('option3');
      expect(radios[2].checked).toBe(true);
    });

    it('should prevent default on arrow keys', async () => {
      const el = await createRadioGroup({ value: 'option1' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      radios[0].focus();

      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);

      expect(keydownEvent.defaultPrevented).toBe(true);
    });

    it('should not respond to keyboard when disabled', async () => {
      const el = await createRadioGroup({ value: 'option1', disabled: true });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);
      await el.updateComplete;

      expect(el.value).toBe('option1');
    });

    it('should ignore unrelated keys', async () => {
      const el = await createRadioGroup({ value: 'option1' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      radios[0].focus();

      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);
      await el.updateComplete;

      // Value should not change
      expect(el.value).toBe('option1');
      // Tab should not be prevented
      expect(keydownEvent.defaultPrevented).toBe(false);
    });

    it('should fire sando-change event on keyboard navigation', async () => {
      const el = await createRadioGroup({ value: 'option1', name: 'keyboard-test' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      let eventDetail: { value: string; name: string } | null = null;
      el.addEventListener('sando-change', ((e: CustomEvent) => {
        eventDetail = e.detail;
      }) as EventListener);

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      radios[0].focus();

      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);
      await el.updateComplete;

      expect(eventDetail).toBeDefined();
      expect(eventDetail!.value).toBe('option2');
      expect(eventDetail!.name).toBe('keyboard-test');
    });
  });

  describe('State Management', () => {
    it('should sync value prop with internal state', async () => {
      const el = await createRadioGroup();
      await el.updateComplete;

      expect(el.value).toBeUndefined();

      el.value = 'option2';
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      expect(radios[1].checked).toBe(true);
    });

    it('should update checked radio when value prop changes', async () => {
      const el = await createRadioGroup({ value: 'option1' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      expect(radios[0].checked).toBe(true);

      el.value = 'option3';
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      expect(radios[0].checked).toBe(false);
      expect(radios[2].checked).toBe(true);
    });

    it('should return correct radio from getSelectedRadio()', async () => {
      const el = await createRadioGroup({ value: 'option2' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const selectedRadio = el.getSelectedRadio();
      expect(selectedRadio).toBeDefined();
      expect(selectedRadio!.value).toBe('option2');
    });

    it('should return null from getSelectedRadio() when none selected', async () => {
      const el = await createRadioGroup();
      await el.updateComplete;

      const selectedRadio = el.getSelectedRadio();
      expect(selectedRadio).toBeNull();
    });

    it('should select correct radio via selectByValue()', async () => {
      const el = await createRadioGroup();
      await el.updateComplete;

      el.selectByValue('option2');
      await el.updateComplete;

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      expect(radios[1].checked).toBe(true);
      expect(el.value).toBe('option2');
    });

    it('should fire event when selectByValue() is called', async () => {
      const el = await createRadioGroup();
      await el.updateComplete;

      let eventFired = false;
      el.addEventListener('sando-change', () => {
        eventFired = true;
      });

      el.selectByValue('option2');
      await el.updateComplete;

      expect(eventFired).toBe(true);
    });

    it('should not select disabled radio via selectByValue()', async () => {
      const el = await fixture<SandoRadioGroup>(html`
        <sando-radio-group name="test">
          <sando-radio value="option1" label="Option 1"></sando-radio>
          <sando-radio value="option2" label="Option 2" disabled></sando-radio>
          <sando-radio value="option3" label="Option 3"></sando-radio>
        </sando-radio-group>
      `);
      await el.updateComplete;

      el.selectByValue('option2');
      await el.updateComplete;

      expect(el.value).toBeUndefined();
    });

    it('should deselect all via clearSelection()', async () => {
      const el = await createRadioGroup({ value: 'option2' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      el.clearSelection();
      await el.updateComplete;

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      const checkedRadios = Array.from(radios).filter((r) => r.checked);

      expect(checkedRadios.length).toBe(0);
      expect(el.value).toBeUndefined();
    });

    it('should handle slot change and reinitialize radios', async () => {
      const el = await createRadioGroup({ name: 'dynamic-group' });
      await el.updateComplete;

      // Add a new radio
      const newRadio = document.createElement('sando-radio');
      newRadio.value = 'option4';
      newRadio.label = 'Option 4';
      el.appendChild(newRadio);

      await el.updateComplete;
      // Wait for slotchange to trigger
      await new Promise((r) => setTimeout(r, 50));

      expect((newRadio as SandoRadio).name).toBe('dynamic-group');
    });
  });

  describe('Disabled State', () => {
    it('should prevent interaction when group is disabled', async () => {
      const el = await createRadioGroup({ disabled: true });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      const radioContainer = radios[0].shadowRoot!.querySelector(
        'label.radio-container'
      ) as HTMLElement;
      radioContainer.click();
      await el.updateComplete;

      expect(el.value).toBeUndefined();
      expect(radios[0].checked).toBe(false);
    });

    it('should set aria-disabled on radiogroup container', async () => {
      const el = await createRadioGroup({ disabled: true });
      await el.updateComplete;

      const radioGroup = el.shadowRoot!.querySelector('[role="radiogroup"]');
      expect(radioGroup!.getAttribute('aria-disabled')).toBe('true');
    });

    it('should skip disabled radios in keyboard navigation', async () => {
      const el = await fixture<SandoRadioGroup>(html`
        <sando-radio-group name="test" value="option1">
          <sando-radio value="option1" label="Option 1"></sando-radio>
          <sando-radio value="option2" label="Option 2" disabled></sando-radio>
          <sando-radio value="option3" label="Option 3"></sando-radio>
        </sando-radio-group>
      `);
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      radios[0].focus();

      // Arrow down should skip option2 and go to option3
      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);
      await el.updateComplete;

      expect(el.value).toBe('option3');
      expect(radios[2].checked).toBe(true);
    });

    it('should work with individually disabled radios within enabled group', async () => {
      const el = await fixture<SandoRadioGroup>(html`
        <sando-radio-group name="test">
          <sando-radio value="option1" label="Option 1"></sando-radio>
          <sando-radio value="option2" label="Option 2" disabled></sando-radio>
          <sando-radio value="option3" label="Option 3"></sando-radio>
        </sando-radio-group>
      `);
      await el.updateComplete;

      // First radio should be clickable
      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      const radioContainer1 = radios[0].shadowRoot!.querySelector(
        'label.radio-container'
      ) as HTMLElement;
      radioContainer1.click();
      await el.updateComplete;

      expect(radios[0].checked).toBe(true);

      // Second radio should NOT be clickable
      const radioContainer2 = radios[1].shadowRoot!.querySelector(
        'label.radio-container'
      ) as HTMLElement;
      radioContainer2.click();
      await el.updateComplete;

      // Should still be option1
      expect(el.value).toBe('option1');
    });

    it('should not change selection on disabled group via arrow keys', async () => {
      const el = await createRadioGroup({ value: 'option1', disabled: true });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);
      await el.updateComplete;

      expect(el.value).toBe('option1');
    });

    it('should not prevent default on keys when disabled', async () => {
      const el = await createRadioGroup({ disabled: true });
      await el.updateComplete;

      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);

      // When disabled, keys should not be handled
      expect(keydownEvent.defaultPrevented).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should have aria-labelledby when label exists', async () => {
      const el = await createRadioGroup({ label: 'Choose option' });
      await el.updateComplete;

      const radioGroup = el.shadowRoot!.querySelector('[role="radiogroup"]');
      const labelId = radioGroup!.getAttribute('aria-labelledby');
      expect(labelId).toBeDefined();

      const label = el.shadowRoot!.getElementById(labelId!);
      expect(label).toBeDefined();
    });

    it('should have aria-describedby when helper text exists', async () => {
      const el = await createRadioGroup({ helperText: 'Helper text' });
      await el.updateComplete;

      const radioGroup = el.shadowRoot!.querySelector('[role="radiogroup"]');
      const descId = radioGroup!.getAttribute('aria-describedby');
      expect(descId).toBeDefined();
    });

    it('should have aria-describedby when error text exists', async () => {
      const el = await createRadioGroup({ error: true, errorText: 'Error text' });
      await el.updateComplete;

      const radioGroup = el.shadowRoot!.querySelector('[role="radiogroup"]');
      const descId = radioGroup!.getAttribute('aria-describedby');
      expect(descId).toBeDefined();
    });

    it('should have aria-required when required', async () => {
      const el = await createRadioGroup({ required: true });
      await el.updateComplete;

      const radioGroup = el.shadowRoot!.querySelector('[role="radiogroup"]');
      expect(radioGroup!.getAttribute('aria-required')).toBe('true');
    });

    it('should have aria-invalid when error', async () => {
      const el = await createRadioGroup({ error: true });
      await el.updateComplete;

      const radioGroup = el.shadowRoot!.querySelector('[role="radiogroup"]');
      expect(radioGroup!.getAttribute('aria-invalid')).toBe('true');
    });

    it('should have role="alert" on error message', async () => {
      const el = await createRadioGroup({ error: true, errorText: 'Error message' });
      await el.updateComplete;

      const description = el.shadowRoot!.querySelector('.radio-group-description');
      expect(description!.getAttribute('role')).toBe('alert');
    });

    it('should have aria-live="polite" on error message', async () => {
      const el = await createRadioGroup({ error: true, errorText: 'Error message' });
      await el.updateComplete;

      const description = el.shadowRoot!.querySelector('.radio-group-description');
      expect(description!.getAttribute('aria-live')).toBe('polite');
    });

    it('should NOT have role="alert" on helper text', async () => {
      const el = await createRadioGroup({ helperText: 'Helper text' });
      await el.updateComplete;

      const description = el.shadowRoot!.querySelector('.radio-group-description');
      expect(description!.getAttribute('role')).toBeNull();
    });

    it('should have aria-hidden on required indicator', async () => {
      const el = await createRadioGroup({ label: 'Label', required: true });
      await el.updateComplete;

      const indicator = el.shadowRoot!.querySelector('.required-indicator');
      expect(indicator!.getAttribute('aria-hidden')).toBe('true');
    });

    it('should be accessible (axe check)', async () => {
      const el = await createRadioGroup({ label: 'Choose an option' });
      await el.updateComplete;

      await expectWc(el).to.be.accessible();
    });
  });

  describe('Roving Tabindex', () => {
    it('should set tabindex=0 on checked radio HOST element', async () => {
      const el = await createRadioGroup({ value: 'option2' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 50));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;

      // The HOST element controls tab order (not the internal input)
      expect(radios[1].tabIndex).toBe(0);

      // Internal input always has tabIndex=-1 (focus delegated via focus() override)
      const input2 = radios[1].shadowRoot!.querySelector('input');
      expect(input2!.tabIndex).toBe(-1);
    });

    it('should set tabindex=-1 on unchecked radios HOST elements', async () => {
      const el = await createRadioGroup({ value: 'option2' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 50));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;

      // Host elements of unchecked radios should not be in tab order
      expect(radios[0].tabIndex).toBe(-1);
      expect(radios[2].tabIndex).toBe(-1);
    });

    it('should set tabindex=0 on first enabled radio HOST when none checked', async () => {
      const el = await createRadioGroup();
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 50));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;

      // First radio HOST should be tabbable
      expect(radios[0].tabIndex).toBe(0);
      // Other radio HOSTs should not be in tab order
      expect(radios[1].tabIndex).toBe(-1);
      expect(radios[2].tabIndex).toBe(-1);
    });

    it('should update HOST tabindex when selection changes', async () => {
      const el = await createRadioGroup({ value: 'option1' });
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 50));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;

      // Initially, first radio HOST has tabindex=0
      expect(radios[0].tabIndex).toBe(0);
      expect(radios[1].tabIndex).toBe(-1);

      // Select second radio
      el.selectByValue('option2');
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 50));

      // Now second radio HOST should have tabindex=0
      expect(radios[0].tabIndex).toBe(-1);
      expect(radios[1].tabIndex).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty radio group', async () => {
      const el = await fixture<SandoRadioGroup>(html`
        <sando-radio-group name="empty"></sando-radio-group>
      `);
      await el.updateComplete;

      expect(el.getSelectedRadio()).toBeNull();

      // Keyboard nav should not throw
      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);
      await el.updateComplete;

      expect(el.value).toBeUndefined();
    });

    it('should handle single radio', async () => {
      const el = await fixture<SandoRadioGroup>(html`
        <sando-radio-group name="single">
          <sando-radio value="only" label="Only Option"></sando-radio>
        </sando-radio-group>
      `);
      await el.updateComplete;

      const radio = el.querySelector('sando-radio') as SandoRadio;
      const radioContainer = radio.shadowRoot!.querySelector(
        'label.radio-container'
      ) as HTMLElement;
      radioContainer.click();
      await el.updateComplete;

      expect(el.value).toBe('only');
    });

    it('should handle non-existent value in selectByValue()', async () => {
      const el = await createRadioGroup();
      await el.updateComplete;

      el.selectByValue('non-existent');
      await el.updateComplete;

      expect(el.value).toBeUndefined();
    });

    it('should cleanup event listeners on disconnect', async () => {
      const el = await createRadioGroup();
      await el.updateComplete;

      // Remove from DOM
      el.remove();

      // Should not throw
      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });
      expect(() => el.dispatchEvent(keydownEvent)).not.toThrow();
    });

    it('should handle all radios disabled', async () => {
      const el = await fixture<SandoRadioGroup>(html`
        <sando-radio-group name="all-disabled">
          <sando-radio value="a" label="A" disabled></sando-radio>
          <sando-radio value="b" label="B" disabled></sando-radio>
          <sando-radio value="c" label="C" disabled></sando-radio>
        </sando-radio-group>
      `);
      await el.updateComplete;

      // Keyboard nav should not throw and should not change value
      const keydownEvent = new KeyboardEvent('keydown', {
        key: 'ArrowDown',
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(keydownEvent);
      await el.updateComplete;

      expect(el.value).toBeUndefined();
    });

    it('should work with dynamically set value', async () => {
      const el = await createRadioGroup();
      await el.updateComplete;

      // Set value dynamically
      el.value = 'option3';
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 10));

      const radios = el.querySelectorAll('sando-radio') as NodeListOf<SandoRadio>;
      expect(radios[2].checked).toBe(true);
    });
  });
});
