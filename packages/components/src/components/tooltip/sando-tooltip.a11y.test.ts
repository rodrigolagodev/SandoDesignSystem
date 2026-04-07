/**
 * Accessibility Tests for sando-tooltip component
 *
 * Tests WCAG 2.1 AA compliance using axe-core and manual ARIA checks.
 * 100% a11y coverage required per TEST_COVERAGE.toon (TC-CR-R2).
 *
 * @see WCAG_COMPLIANCE.toon for accessibility requirements
 * @see KEYBOARD_NAVIGATION.toon for keyboard patterns
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';

import './sando-tooltip.js';
import type { SandoTooltip } from './sando-tooltip.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Mock Popover API on the bubble element when jsdom doesn't support it.
 */
function mockPopoverIfNeeded(el: SandoTooltip): void {
  if (!('showPopover' in HTMLElement.prototype)) {
    const bubble = el.shadowRoot?.querySelector('.tooltip-bubble') as HTMLElement | null;
    if (bubble) {
      (bubble as any).showPopover = vi.fn();
      (bubble as any).hidePopover = vi.fn();
    }
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('sando-tooltip accessibility', () => {
  // =========================================================================
  // 1. axe-core automated validation
  // =========================================================================

  describe('axe-core violations', () => {
    it('should have no a11y violations in default (closed) state', async () => {
      const el = await fixture(html`
        <sando-tooltip content="More information">
          <button>Hover for info</button>
        </sando-tooltip>
      `);
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no a11y violations when open (open attribute)', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Visible tooltip" open>
          <button>Trigger</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);
      await el.updateComplete;
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no a11y violations after show() is called', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Shown programmatically">
          <button>Trigger</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      el.show();
      await el.updateComplete;

      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });

    it('should have no a11y violations for all placement values', async () => {
      for (const placement of ['top', 'right', 'bottom', 'left'] as const) {
        const el = await fixture<SandoTooltip>(html`
          <sando-tooltip content="Placed tooltip" placement="${placement}">
            <button>Trigger ${placement}</button>
          </sando-tooltip>
        `);
        mockPopoverIfNeeded(el);

        const results = await axe(el);
        expect(results).toHaveNoViolations();
      }
    });

    it('should have no a11y violations with longer content', async () => {
      const el = await fixture(html`
        <sando-tooltip content="This is a longer description that provides additional context">
          <button>More info</button>
        </sando-tooltip>
      `);
      const results = await axe(el);
      expect(results).toHaveNoViolations();
    });
  });

  // =========================================================================
  // 2. Tooltip bubble role
  // =========================================================================

  describe('Tooltip bubble role', () => {
    it('tooltip bubble should have role="tooltip"', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Description">
          <button>T</button>
        </sando-tooltip>
      `);
      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble');
      expect(bubble).toBeDefined();
      expect(bubble?.getAttribute('role')).toBe('tooltip');
    });

    it('tooltip bubble id should start with "sando-tooltip-"', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Description">
          <button>T</button>
        </sando-tooltip>
      `);
      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble');
      const id = bubble?.getAttribute('id');
      expect(id).toBeTruthy();
      expect(id?.startsWith('sando-tooltip-')).toBe(true);
    });
  });

  // =========================================================================
  // 3. aria-describedby association
  // =========================================================================

  describe('aria-describedby association', () => {
    it('trigger element should have aria-describedby referencing tooltip id', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button id="described-trigger">Trigger</button>
        </sando-tooltip>
      `);
      await el.updateComplete;

      const trigger = el.querySelector('#described-trigger') as HTMLElement;
      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble');
      const tooltipId = bubble?.getAttribute('id');

      expect(trigger.getAttribute('aria-describedby')).toBeTruthy();
      expect(trigger.getAttribute('aria-describedby')).toBe(tooltipId);
    });

    it('aria-describedby should be applied after slotchange', async () => {
      // Start with a tooltip that has no slotted content
      const container = await fixture<HTMLDivElement>(html`<div></div>`);
      const el = document.createElement('sando-tooltip') as SandoTooltip;
      el.content = 'Dynamic tip';
      container.appendChild(el);

      // Now add a trigger
      const btn = document.createElement('button');
      btn.id = 'dynamic-trigger';
      btn.textContent = 'Dynamic trigger';
      el.appendChild(btn);

      // Wait for slotchange + updateComplete
      await el.updateComplete;

      // Force slotchange to fire by reading element
      const slot = el.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
      slot?.dispatchEvent(new Event('slotchange'));
      await el.updateComplete;

      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble');
      const tooltipId = bubble?.getAttribute('id');
      // The trigger should now have aria-describedby
      expect(btn.getAttribute('aria-describedby')).toBe(tooltipId);
    });
  });

  // =========================================================================
  // 4. Tooltip bubble is NOT focusable
  // =========================================================================

  describe('Tooltip bubble is not focusable', () => {
    it('tooltip bubble should not have a positive tabindex', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Not focusable">
          <button>T</button>
        </sando-tooltip>
      `);
      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble');
      const tabindex = bubble?.getAttribute('tabindex');
      // Either no tabindex or -1 — never 0 or positive
      if (tabindex !== null) {
        expect(Number(tabindex)).toBeLessThan(0);
      } else {
        expect(tabindex).toBeNull();
      }
    });

    it('tooltip bubble should not be included in the natural tab order', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Non-interactive tooltip">
          <button>T</button>
        </sando-tooltip>
      `);
      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble') as HTMLElement;
      // tabIndex -1 means NOT in tab order; default (no attribute) is also fine for non-interactive elements
      expect(bubble?.tabIndex).toBeLessThanOrEqual(0);
    });
  });

  // =========================================================================
  // 5. Content accessibility (not hidden while open)
  // =========================================================================

  describe('Content text accessibility', () => {
    it('tooltip content is present in the DOM when closed (aria-hidden guards SR)', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Hidden from SR when closed">
          <button>T</button>
        </sando-tooltip>
      `);
      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble');
      // Content exists in DOM
      expect(bubble?.textContent?.trim()).toBe('Hidden from SR when closed');
      // But aria-hidden on bubble means SR won't announce it
      expect(bubble?.getAttribute('aria-hidden')).toBe('true');
    });

    it('tooltip content is NOT aria-hidden when open', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Visible to screen readers">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      el.show();
      await el.updateComplete;

      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble');
      expect(bubble?.getAttribute('aria-hidden')).toBe('false');
    });

    it('tooltip content text is correctly reflected in the bubble', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Screen reader content">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      el.show();
      await el.updateComplete;

      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble');
      expect(bubble?.textContent?.trim()).toBe('Screen reader content');
    });
  });

  // =========================================================================
  // 6. Keyboard accessibility
  // =========================================================================

  describe('Keyboard accessibility', () => {
    it('Escape key should close an open tooltip', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Keyboard closeable">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      el.show();
      await el.updateComplete;
      expect(el.open).toBe(true);

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await el.updateComplete;

      expect(el.open).toBe(false);
    });

    it('tooltip should be shown on focus of slotted trigger', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Focus-triggered">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      const slot = el.shadowRoot?.querySelector('slot') as HTMLElement;
      slot.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      await el.updateComplete;

      expect(el.open).toBe(true);
    });

    it('tooltip should hide on blur of slotted trigger', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Blur-hidden">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      const slot = el.shadowRoot?.querySelector('slot') as HTMLElement;

      slot.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      await el.updateComplete;
      expect(el.open).toBe(true);

      slot.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
      await el.updateComplete;
      expect(el.open).toBe(false);
    });
  });
});
