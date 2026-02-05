/**
 * Accessibility tests for sando-option component
 *
 * Tests WCAG compliance using axe-core.
 *
 * @see sando-option.ts for implementation
 * @see KEYBOARD_NAVIGATION.toon for keyboard patterns
 */

import { fixture } from '@open-wc/testing';
import { html } from 'lit';
import { axe } from 'jest-axe';
import './sando-option.js';
import type { SandoOption } from './sando-option.js';

describe('sando-option accessibility', () => {
  describe('axe-core compliance', () => {
    it('should pass axe tests for default option', async () => {
      const el = await fixture(html`
        <div role="listbox" aria-label="Test options">
          <sando-option value="test">Test Option</sando-option>
        </div>
      `);
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass axe tests for selected option', async () => {
      const el = await fixture(html`
        <div role="listbox" aria-label="Test options">
          <sando-option value="test" selected>Selected Option</sando-option>
        </div>
      `);
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass axe tests for disabled option', async () => {
      const el = await fixture(html`
        <div role="listbox" aria-label="Test options">
          <sando-option value="test" disabled>Disabled Option</sando-option>
        </div>
      `);
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should pass axe tests with prefix slot', async () => {
      const el = await fixture(html`
        <div role="listbox" aria-label="Test options">
          <sando-option value="test">
            <span slot="prefix">🏠</span>
            Home
          </sando-option>
        </div>
      `);
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ARIA roles and attributes', () => {
    it('should have role="option"', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test">Option</sando-option>
      `);
      const option = el.shadowRoot?.querySelector('.option');
      expect(option?.getAttribute('role')).toBe('option');
    });

    it('should set aria-selected="false" by default', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test">Option</sando-option>
      `);
      const option = el.shadowRoot?.querySelector('.option');
      expect(option?.getAttribute('aria-selected')).toBe('false');
    });

    it('should set aria-selected="true" when selected', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test" selected>Selected</sando-option>
      `);
      const option = el.shadowRoot?.querySelector('.option');
      expect(option?.getAttribute('aria-selected')).toBe('true');
    });

    it('should set aria-disabled="true" when disabled', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test" disabled>Disabled</sando-option>
      `);
      const option = el.shadowRoot?.querySelector('.option');
      expect(option?.getAttribute('aria-disabled')).toBe('true');
    });

    it('should NOT have aria-disabled when enabled', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test">Enabled</sando-option>
      `);
      const option = el.shadowRoot?.querySelector('.option');
      expect(option?.hasAttribute('aria-disabled')).toBe(false);
    });
  });

  describe('Visual feedback', () => {
    it('should have checkmark element', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test" selected>Selected</sando-option>
      `);
      const checkmark = el.shadowRoot?.querySelector('.option-checkmark');
      expect(checkmark).not.toBeNull();
      // Checkmark should be visible (opacity: 1) when selected
      // This is handled via CSS :host([selected]) .option-checkmark { opacity: 1 }
    });

    it('should have aria-hidden on checkmark icon', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test">Option</sando-option>
      `);
      const checkmark = el.shadowRoot?.querySelector('.option-checkmark');
      expect(checkmark?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('WAI-ARIA Listbox Pattern', () => {
    it('should work within a listbox container', async () => {
      const container = await fixture(html`
        <div role="listbox" aria-label="Select an option">
          <sando-option value="a">Option A</sando-option>
          <sando-option value="b" selected>Option B</sando-option>
          <sando-option value="c" disabled>Option C</sando-option>
        </div>
      `);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
