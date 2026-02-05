/**
 * Unit tests for sando-option component
 *
 * Tests component rendering, props, methods, and events.
 *
 * @see sando-option.ts for implementation
 */

import { fixture, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import './sando-option.js';
import type { SandoOption } from './sando-option.js';

describe('sando-option', () => {
  describe('Rendering', () => {
    it('should render with default props', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test">Test Option</sando-option>
      `);
      expect(el).toBeDefined();
      expect(el.value).toBe('test');
      expect(el.disabled).toBe(false);
      expect(el.selected).toBe(false);
    });

    it('should render slotted content', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test">Option Label</sando-option>
      `);
      const label = el.getLabel();
      expect(label).toBe('Option Label');
    });

    it('should render prefix slot', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test">
          <span slot="prefix">🏠</span>
          Home
        </sando-option>
      `);
      const prefixSlot = el.shadowRoot?.querySelector('slot[name="prefix"]');
      expect(prefixSlot).not.toBeNull();
    });

    it('should render suffix slot', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test">
          Label
          <span slot="suffix">Badge</span>
        </sando-option>
      `);
      const suffixSlot = el.shadowRoot?.querySelector('slot[name="suffix"]');
      expect(suffixSlot).not.toBeNull();
    });
  });

  describe('Props', () => {
    it('should reflect value attribute', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="apple">Apple</sando-option>
      `);
      expect(el.getAttribute('value')).toBe('apple');
    });

    it('should reflect disabled attribute', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test" disabled>Disabled</sando-option>
      `);
      expect(el.disabled).toBe(true);
      expect(el.hasAttribute('disabled')).toBe(true);
    });

    it('should reflect selected attribute', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test" selected>Selected</sando-option>
      `);
      expect(el.selected).toBe(true);
      expect(el.hasAttribute('selected')).toBe(true);
    });

    it('should update highlighted state', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test">Option</sando-option>
      `);
      el.highlighted = true;
      await el.updateComplete;
      expect(el.highlighted).toBe(true);
      expect(el.hasAttribute('highlighted')).toBe(true);
    });

    it('should remove highlighted attribute when set to false', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test">Option</sando-option>
      `);
      el.highlighted = true;
      await el.updateComplete;
      expect(el.hasAttribute('highlighted')).toBe(true);

      el.highlighted = false;
      await el.updateComplete;
      expect(el.hasAttribute('highlighted')).toBe(false);
    });
  });

  describe('ARIA', () => {
    it('should have role="option"', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test">Option</sando-option>
      `);
      const option = el.shadowRoot?.querySelector('[role="option"]');
      expect(option).not.toBeNull();
    });

    it('should set aria-selected based on selected prop', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test" selected>Selected</sando-option>
      `);
      const option = el.shadowRoot?.querySelector('[role="option"]');
      expect(option?.getAttribute('aria-selected')).toBe('true');
    });

    it('should set aria-disabled when disabled', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test" disabled>Disabled</sando-option>
      `);
      const option = el.shadowRoot?.querySelector('[role="option"]');
      expect(option?.getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('Events', () => {
    it('should fire sando-option-select on click', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test">Option</sando-option>
      `);

      const listener = oneEvent(el, 'sando-option-select');
      const option = el.shadowRoot?.querySelector('.option') as HTMLElement;
      option.click();

      const event = await listener;
      expect(event.detail.value).toBe('test');
    });

    it('should include label in event detail', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test">My Label</sando-option>
      `);

      const listener = oneEvent(el, 'sando-option-select');
      const option = el.shadowRoot?.querySelector('.option') as HTMLElement;
      option.click();

      const event = await listener;
      expect(event.detail.label).toBe('My Label');
    });

    it('should NOT fire event when disabled', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test" disabled>Disabled</sando-option>
      `);

      let eventFired = false;
      el.addEventListener('sando-option-select', () => {
        eventFired = true;
      });

      const option = el.shadowRoot?.querySelector('.option') as HTMLElement;
      option.click();

      // Wait a tick to ensure event would have fired
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(eventFired).toBe(false);
    });
  });

  describe('Public API', () => {
    it('getLabel() should return text content', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="test">Hello World</sando-option>
      `);
      expect(el.getLabel()).toBe('Hello World');
    });

    it('getLabel() should fallback to value if no text', async () => {
      const el = await fixture<SandoOption>(html` <sando-option value="fallback"></sando-option> `);
      expect(el.getLabel()).toBe('fallback');
    });

    it('getValue() should return value', async () => {
      const el = await fixture<SandoOption>(html`
        <sando-option value="myvalue">Label</sando-option>
      `);
      expect(el.getValue()).toBe('myvalue');
    });
  });
});
