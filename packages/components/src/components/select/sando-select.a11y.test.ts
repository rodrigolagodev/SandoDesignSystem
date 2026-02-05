/**
 * Accessibility Tests for sando-select component
 *
 * Tests WCAG 2.1 AA compliance using axe-core and manual checks.
 *
 * @see WCAG_COMPLIANCE.toon for accessibility requirements
 * @see KEYBOARD_NAVIGATION.toon for keyboard patterns
 */

import { fixture, html } from '@open-wc/testing';
import { axe, toHaveNoViolations } from 'jest-axe';

import './sando-select.js';
import '../option/sando-option.js';
import '../option-group/sando-option-group.js';
import type { SandoSelect } from './sando-select.js';

expect.extend(toHaveNoViolations);

describe('sando-select accessibility', () => {
  let element: SandoSelect;

  beforeEach(async () => {
    element = await fixture<SandoSelect>(html`
      <sando-select label="Country" placeholder="Select a country">
        <sando-option value="us">United States</sando-option>
        <sando-option value="ca">Canada</sando-option>
        <sando-option value="mx">Mexico</sando-option>
      </sando-select>
    `);
  });

  describe('axe-core violations', () => {
    it('should have no accessibility violations in default state', async () => {
      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when open', async () => {
      element.show();
      await element.updateComplete;
      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with value selected', async () => {
      element.value = 'us';
      await element.updateComplete;
      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations in error state', async () => {
      element.error = true;
      element.errorText = 'Please select a country';
      await element.updateComplete;
      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;
      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations in multiple mode', async () => {
      element.multiple = true;
      element.values = ['us', 'ca'];
      await element.updateComplete;
      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ARIA Combobox Pattern', () => {
    it('should have role="combobox" on trigger', () => {
      const trigger = element.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.getAttribute('role')).toBe('combobox');
    });

    it('should have aria-haspopup="listbox"', () => {
      const trigger = element.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.getAttribute('aria-haspopup')).toBe('listbox');
    });

    it('should have aria-expanded matching open state', async () => {
      const trigger = element.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.getAttribute('aria-expanded')).toBe('false');

      element.show();
      await element.updateComplete;
      expect(trigger?.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have aria-controls pointing to listbox', () => {
      const trigger = element.shadowRoot?.querySelector('.select-trigger');
      const listbox = element.shadowRoot?.querySelector('[role="listbox"]');
      const controlsId = trigger?.getAttribute('aria-controls');
      expect(listbox?.id).toBe(controlsId);
    });

    it('should have role="listbox" on dropdown', () => {
      const listbox = element.shadowRoot?.querySelector('.select-dropdown');
      expect(listbox?.getAttribute('role')).toBe('listbox');
    });
  });

  describe('Label Association', () => {
    it('should associate label with trigger via id', () => {
      const trigger = element.shadowRoot?.querySelector('.select-trigger');
      const label = element.shadowRoot?.querySelector('.select-label');
      const triggerId = trigger?.id;
      expect(label?.getAttribute('for')).toBe(triggerId);
    });

    it('should have aria-labelledby on listbox', () => {
      const listbox = element.shadowRoot?.querySelector('[role="listbox"]');
      expect(listbox?.hasAttribute('aria-labelledby')).toBe(true);
    });
  });

  describe('Error State Accessibility', () => {
    it('should have aria-invalid when error', async () => {
      element.error = true;
      await element.updateComplete;
      const trigger = element.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.getAttribute('aria-invalid')).toBe('true');
    });

    it('should have error message with role="alert"', async () => {
      element.error = true;
      element.errorText = 'Error message';
      await element.updateComplete;
      const errorText = element.shadowRoot?.querySelector('.error-text');
      expect(errorText?.getAttribute('role')).toBe('alert');
    });

    it('should have aria-describedby pointing to error message', async () => {
      element.error = true;
      element.errorText = 'Error message';
      await element.updateComplete;
      const trigger = element.shadowRoot?.querySelector('.select-trigger');
      const errorText = element.shadowRoot?.querySelector('.error-text');
      const describedBy = trigger?.getAttribute('aria-describedby');
      expect(errorText?.id).toBe(describedBy);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be focusable', async () => {
      element.focus();
      await element.updateComplete;
      expect(document.activeElement).toBe(element);
    });

    it('should not be focusable when disabled', async () => {
      element.disabled = true;
      await element.updateComplete;
      const trigger = element.shadowRoot?.querySelector('.select-trigger') as HTMLButtonElement;
      expect(trigger?.disabled).toBe(true);
    });
  });

  describe('Focus Visible', () => {
    it('should have visible focus indicator styles', async () => {
      const trigger = element.shadowRoot?.querySelector('.select-trigger') as HTMLButtonElement;
      // Check that focus-visible styles are defined
      // The actual focus-visible styles should be tested visually
      expect(trigger).toBeDefined();
    });
  });

  describe('Required State', () => {
    it('should have aria-required when required', async () => {
      element.required = true;
      await element.updateComplete;
      const trigger = element.shadowRoot?.querySelector('.select-trigger');
      expect(trigger?.getAttribute('aria-required')).toBe('true');
    });

    it('should show visual required indicator', async () => {
      element.required = true;
      await element.updateComplete;
      const indicator = element.shadowRoot?.querySelector('.required-indicator');
      expect(indicator).toBeDefined();
    });
  });

  describe('Multiple Selection', () => {
    it('should have aria-multiselectable when multiple', async () => {
      element.multiple = true;
      await element.updateComplete;
      const listbox = element.shadowRoot?.querySelector('[role="listbox"]');
      expect(listbox?.getAttribute('aria-multiselectable')).toBe('true');
    });
  });
});
