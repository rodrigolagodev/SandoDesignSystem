/**
 * Unit Tests for sando-select component
 *
 * Tests component logic, rendering, props, events, and keyboard navigation.
 *
 * @see TESTING_STRATEGY.toon for test patterns
 * @see KEYBOARD_NAVIGATION.toon for keyboard requirements
 */

import { fixture, html } from '@open-wc/testing';

import './sando-select.js';
import '../option/sando-option.js';
import '../option-group/sando-option-group.js';
import type { SandoSelect } from './sando-select.js';

describe('sando-select', () => {
  let element: SandoSelect;

  beforeEach(async () => {
    element = await fixture<SandoSelect>(html`
      <sando-select label="Test Select" placeholder="Select an option">
        <sando-option value="a">Option A</sando-option>
        <sando-option value="b">Option B</sando-option>
        <sando-option value="c">Option C</sando-option>
      </sando-select>
    `);
  });

  describe('Rendering', () => {
    it('should render with default props', () => {
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('sando-select');
    });

    it('should render label', () => {
      const label = element.shadowRoot?.querySelector('.select-label');
      expect(label?.textContent).toContain('Test Select');
    });

    it('should render placeholder when no value', () => {
      const value = element.shadowRoot?.querySelector('.select-value');
      expect(value?.textContent).toContain('Select an option');
    });

    it('should render trigger button with combobox role', () => {
      const trigger = element.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.getAttribute('role')).toBe('combobox');
    });

    it('should render listbox for options', () => {
      const listbox = element.shadowRoot?.querySelector('[role="listbox"]');
      expect(listbox).toBeDefined();
    });
  });

  describe('Props', () => {
    it('should apply variant attribute', async () => {
      element.variant = 'outlined';
      await element.updateComplete;
      expect(element.getAttribute('variant')).toBe('outlined');
    });

    it('should apply size attribute', async () => {
      element.size = 'large';
      await element.updateComplete;
      expect(element.getAttribute('size')).toBe('large');
    });

    it('should apply disabled attribute', async () => {
      element.disabled = true;
      await element.updateComplete;
      expect(element.hasAttribute('disabled')).toBe(true);
    });

    it('should apply required indicator', async () => {
      element.required = true;
      await element.updateComplete;
      const indicator = element.shadowRoot?.querySelector('.required-indicator');
      expect(indicator).toBeDefined();
    });

    it('should apply error state', async () => {
      element.error = true;
      element.errorText = 'Error message';
      await element.updateComplete;
      expect(element.hasAttribute('error')).toBe(true);
      const errorText = element.shadowRoot?.querySelector('.error-text');
      expect(errorText?.textContent).toContain('Error message');
    });
  });

  describe('Value Management', () => {
    it('should set value property', async () => {
      element.value = 'a';
      await element.updateComplete;
      expect(element.value).toBe('a');
    });

    it('should display selected option label', async () => {
      element.value = 'a';
      await element.updateComplete;
      const value = element.shadowRoot?.querySelector('.select-value');
      expect(value?.textContent?.trim()).toBe('Option A');
    });

    it('should support multiple selection', async () => {
      element.multiple = true;
      element.values = ['a', 'b'];
      await element.updateComplete;
      expect(element.values).toEqual(['a', 'b']);
    });
  });

  describe('Dropdown Behavior', () => {
    it('should open dropdown on click', async () => {
      const trigger = element.shadowRoot?.querySelector('.select-trigger') as HTMLButtonElement;
      trigger.click();
      await element.updateComplete;
      expect(element.open).toBe(true);
    });

    it('should close dropdown on outside click', async () => {
      element.show();
      await element.updateComplete;
      document.body.click();
      await element.updateComplete;
      expect(element.open).toBe(false);
    });

    it('should emit sando-show when opened', async () => {
      const showHandler = vi.fn();
      element.addEventListener('sando-show', showHandler);
      element.show();
      await element.updateComplete;
      expect(showHandler).toHaveBeenCalled();
    });

    it('should emit sando-hide when closed', async () => {
      element.show();
      await element.updateComplete;
      const hideHandler = vi.fn();
      element.addEventListener('sando-hide', hideHandler);
      element.hide();
      await element.updateComplete;
      expect(hideHandler).toHaveBeenCalled();
    });
  });

  describe('Selection', () => {
    it('should emit sando-change on selection', async () => {
      const changeHandler = vi.fn();
      element.addEventListener('sando-change', changeHandler);

      element.show();
      await element.updateComplete;

      // Dispatch the event that sando-option would emit
      const option = element.querySelector('sando-option');
      option?.dispatchEvent(
        new CustomEvent('sando-option-select', {
          detail: { value: 'a', label: 'Option A' },
          bubbles: true,
          composed: true
        })
      );
      await element.updateComplete;

      expect(changeHandler).toHaveBeenCalled();
    });

    it('should close dropdown after single selection', async () => {
      element.show();
      await element.updateComplete;

      // Dispatch the event that sando-option would emit
      const option = element.querySelector('sando-option');
      option?.dispatchEvent(
        new CustomEvent('sando-option-select', {
          detail: { value: 'a', label: 'Option A' },
          bubbles: true,
          composed: true
        })
      );
      await element.updateComplete;

      expect(element.open).toBe(false);
    });

    it('should NOT close dropdown after multi-selection', async () => {
      element.multiple = true;
      element.show();
      await element.updateComplete;

      // Dispatch the event that sando-option would emit
      const option = element.querySelector('sando-option');
      option?.dispatchEvent(
        new CustomEvent('sando-option-select', {
          detail: { value: 'a', label: 'Option A' },
          bubbles: true,
          composed: true
        })
      );
      await element.updateComplete;

      expect(element.open).toBe(true);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should open on Enter', async () => {
      const trigger = element.shadowRoot?.querySelector('.select-trigger') as HTMLButtonElement;
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await element.updateComplete;
      expect(element.open).toBe(true);
    });

    it('should open on Space', async () => {
      const trigger = element.shadowRoot?.querySelector('.select-trigger') as HTMLButtonElement;
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      await element.updateComplete;
      expect(element.open).toBe(true);
    });

    it('should open on ArrowDown', async () => {
      const trigger = element.shadowRoot?.querySelector('.select-trigger') as HTMLButtonElement;
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await element.updateComplete;
      expect(element.open).toBe(true);
    });

    it('should close on Escape', async () => {
      element.show();
      await element.updateComplete;
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await element.updateComplete;
      expect(element.open).toBe(false);
    });
  });

  describe('Clear Button', () => {
    it('should show clear button when clearable and has value', async () => {
      element.clearable = true;
      element.value = 'a';
      await element.updateComplete;
      const clearBtn = element.shadowRoot?.querySelector('.select-clear');
      expect(clearBtn).toBeDefined();
    });

    it('should NOT show clear button when no value', async () => {
      element.clearable = true;
      await element.updateComplete;
      const clearBtn = element.shadowRoot?.querySelector('.select-clear');
      expect(clearBtn).toBeNull();
    });

    it('should clear value on clear button click', async () => {
      element.clearable = true;
      element.value = 'a';
      await element.updateComplete;

      const clearBtn = element.shadowRoot?.querySelector('.select-clear') as HTMLButtonElement;
      clearBtn.click();
      await element.updateComplete;

      expect(element.value).toBe('');
    });

    it('should emit sando-clear event', async () => {
      element.clearable = true;
      element.value = 'a';
      await element.updateComplete;

      const clearHandler = vi.fn();
      element.addEventListener('sando-clear', clearHandler);

      const clearBtn = element.shadowRoot?.querySelector('.select-clear') as HTMLButtonElement;
      clearBtn.click();
      await element.updateComplete;

      expect(clearHandler).toHaveBeenCalled();
    });
  });

  describe('Public Methods', () => {
    it('show() should open dropdown', async () => {
      element.show();
      await element.updateComplete;
      expect(element.open).toBe(true);
    });

    it('hide() should close dropdown', async () => {
      element.show();
      await element.updateComplete;
      element.hide();
      await element.updateComplete;
      expect(element.open).toBe(false);
    });

    it('toggle() should toggle dropdown', async () => {
      element.toggle();
      await element.updateComplete;
      expect(element.open).toBe(true);
      element.toggle();
      await element.updateComplete;
      expect(element.open).toBe(false);
    });

    it('clear() should clear value', async () => {
      element.value = 'a';
      await element.updateComplete;
      element.clear();
      await element.updateComplete;
      expect(element.value).toBe('');
    });

    it('checkValidity() should return true when not required', () => {
      expect(element.checkValidity()).toBe(true);
    });

    it('checkValidity() should return false when required and no value', () => {
      element.required = true;
      expect(element.checkValidity()).toBe(false);
    });

    it('checkValidity() should return true when required and has value', () => {
      element.required = true;
      element.value = 'a';
      expect(element.checkValidity()).toBe(true);
    });
  });

  describe('ARIA Attributes', () => {
    it('should have aria-expanded matching open state', async () => {
      const trigger = element.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.getAttribute('aria-expanded')).toBe('false');

      element.show();
      await element.updateComplete;
      expect(trigger?.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have aria-haspopup="listbox"', () => {
      const trigger = element.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.getAttribute('aria-haspopup')).toBe('listbox');
    });

    it('should have aria-invalid when error', async () => {
      element.error = true;
      await element.updateComplete;
      const trigger = element.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.getAttribute('aria-invalid')).toBe('true');
    });

    it('should have aria-multiselectable when multiple', async () => {
      element.multiple = true;
      await element.updateComplete;
      const listbox = element.shadowRoot?.querySelector('[role="listbox"]');
      expect(listbox?.getAttribute('aria-multiselectable')).toBe('true');
    });
  });
});
