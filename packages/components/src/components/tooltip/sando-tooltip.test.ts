/**
 * Unit Tests for sando-tooltip component
 *
 * Tests component logic, rendering, props, show/hide behavior,
 * WCAG 1.4.13 hoverable content, skip-delay, and ARIA wiring.
 *
 * @see TESTING_STRATEGY.toon for test patterns
 * @see KEYBOARD_NAVIGATION.toon for keyboard requirements
 */

import { fixture, html } from '@open-wc/testing';

import './sando-tooltip.js';
import type { SandoTooltip } from './sando-tooltip.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Mock Popover API on the bubble element if jsdom doesn't support it.
 * The component guards internally with try/catch, but we also need
 * showPopover / hidePopover to exist so property access doesn't throw.
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

describe('sando-tooltip', () => {
  // =========================================================================
  // 1. Rendering
  // =========================================================================

  describe('Rendering', () => {
    it('should render with default props', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Default tip">
          <button>Trigger</button>
        </sando-tooltip>
      `);
      expect(el).toBeDefined();
      expect(el.tagName.toLowerCase()).toBe('sando-tooltip');
      expect(el.shadowRoot).toBeDefined();
    });

    it('should render content text inside the tooltip bubble', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Hello world">
          <button>Trigger</button>
        </sando-tooltip>
      `);
      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble');
      expect(bubble?.textContent?.trim()).toBe('Hello world');
    });

    it('should render the slotted trigger element', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button id="my-trigger">Click me</button>
        </sando-tooltip>
      `);
      const trigger = el.querySelector('#my-trigger');
      expect(trigger).toBeDefined();
      expect(trigger?.textContent).toBe('Click me');
    });

    it('should render the tooltip bubble with role="tooltip"', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>Trigger</button>
        </sando-tooltip>
      `);
      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble');
      expect(bubble?.getAttribute('role')).toBe('tooltip');
    });
  });

  // =========================================================================
  // 2. Properties
  // =========================================================================

  describe('Properties', () => {
    it('should reflect "content" attribute', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="My tooltip">
          <button>T</button>
        </sando-tooltip>
      `);
      expect(el.content).toBe('My tooltip');
      expect(el.getAttribute('content')).toBe('My tooltip');
    });

    it('should update tooltip bubble text when content changes', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Old text">
          <button>T</button>
        </sando-tooltip>
      `);
      el.content = 'New text';
      await el.updateComplete;
      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble');
      expect(bubble?.textContent?.trim()).toBe('New text');
    });

    it('should default placement to "top"', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      expect(el.placement).toBe('top');
    });

    it('should reflect "placement" attribute', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip" placement="right">
          <button>T</button>
        </sando-tooltip>
      `);
      expect(el.placement).toBe('right');
      expect(el.getAttribute('placement')).toBe('right');
    });

    it('should accept all valid placement values', async () => {
      for (const placement of ['top', 'right', 'bottom', 'left'] as const) {
        const el = await fixture<SandoTooltip>(html`
          <sando-tooltip content="Tip" placement="${placement}">
            <button>T</button>
          </sando-tooltip>
        `);
        expect(el.placement).toBe(placement);
      }
    });

    it('should accept corner placement values', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="test" placement="top-start">
          <button>trigger</button>
        </sando-tooltip>
      `);
      expect(el.placement).toBe('top-start');

      el.placement = 'top-end';
      expect(el.placement).toBe('top-end');

      el.placement = 'bottom-start';
      expect(el.placement).toBe('bottom-start');

      el.placement = 'bottom-end';
      expect(el.placement).toBe('bottom-end');
    });

    it('should default "open" to false', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      expect(el.open).toBe(false);
      expect(el.hasAttribute('open')).toBe(false);
    });

    it('should reflect "open" attribute on host when tooltip is open', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip" open>
          <button>T</button>
        </sando-tooltip>
      `);
      expect(el.open).toBe(true);
      expect(el.hasAttribute('open')).toBe(true);
    });

    it('should default "distance" to 8', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      expect(el.distance).toBe(8);
    });

    it('should reflect "distance" attribute', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip" distance="16">
          <button>T</button>
        </sando-tooltip>
      `);
      expect(el.distance).toBe(16);
      expect(el.getAttribute('distance')).toBe('16');
    });

    it('should default "delay" to 500', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      expect(el.delay).toBe(500);
    });

    it('should reflect "delay" attribute', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip" delay="500">
          <button>T</button>
        </sando-tooltip>
      `);
      expect(el.delay).toBe(500);
    });

    it('should default "skip-delay-duration" to 300', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      expect(el.skipDelayDuration).toBe(300);
    });

    it('should reflect "skip-delay-duration" attribute', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip" skip-delay-duration="600">
          <button>T</button>
        </sando-tooltip>
      `);
      expect(el.skipDelayDuration).toBe(600);
      expect(el.getAttribute('skip-delay-duration')).toBe('600');
    });
  });

  // =========================================================================
  // 3. Show / Hide behavior
  // =========================================================================

  describe('Show / Hide behavior', () => {
    it('show() should set open = true', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);
      el.show();
      await el.updateComplete;
      expect(el.open).toBe(true);
    });

    it('show() should emit "sando-show" event', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      const showHandler = vi.fn();
      el.addEventListener('sando-show', showHandler);

      el.show();
      await el.updateComplete;

      expect(showHandler).toHaveBeenCalledTimes(1);
    });

    it('show() should not emit "sando-show" if already open', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip" open>
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      const showHandler = vi.fn();
      el.addEventListener('sando-show', showHandler);

      el.show(); // already open — should be a no-op
      await el.updateComplete;

      expect(showHandler).not.toHaveBeenCalled();
    });

    it('hide() should set open = false', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip" open>
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      el.hide();
      await el.updateComplete;
      expect(el.open).toBe(false);
    });

    it('hide() should emit "sando-hide" event', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      // Open first
      el.show();
      await el.updateComplete;

      const hideHandler = vi.fn();
      el.addEventListener('sando-hide', hideHandler);

      el.hide();
      await el.updateComplete;

      expect(hideHandler).toHaveBeenCalledTimes(1);
    });

    it('hide() should not emit "sando-hide" if already closed', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      const hideHandler = vi.fn();
      el.addEventListener('sando-hide', hideHandler);

      el.hide(); // already closed — should be a no-op
      await el.updateComplete;

      expect(hideHandler).not.toHaveBeenCalled();
    });

    it('mouseenter on trigger slot should call show() after delay', async () => {
      vi.useFakeTimers();
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip" delay="300">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      const slot = el.shadowRoot?.querySelector('slot') as HTMLElement;
      slot.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

      // Before delay — still closed
      expect(el.open).toBe(false);

      // Advance past the delay
      vi.runAllTimers();
      await el.updateComplete;

      expect(el.open).toBe(true);
      vi.useRealTimers();
    });

    it('mouseleave on trigger slot should call hide()', async () => {
      vi.useFakeTimers();
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      // Open the tooltip first
      el.show();
      await el.updateComplete;
      expect(el.open).toBe(true);

      const slot = el.shadowRoot?.querySelector('slot') as HTMLElement;
      slot.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));

      // Advance past the 50ms microtask delay in _handleTriggerMouseLeave
      vi.runAllTimers();
      await el.updateComplete;

      expect(el.open).toBe(false);
      vi.useRealTimers();
    });

    it('focus on trigger slot should call show() immediately', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      const slot = el.shadowRoot?.querySelector('slot') as HTMLElement;
      slot.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      await el.updateComplete;

      expect(el.open).toBe(true);
    });

    it('blur on trigger slot should call hide()', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      const slot = el.shadowRoot?.querySelector('slot') as HTMLElement;

      // Focus first to open
      slot.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
      await el.updateComplete;
      expect(el.open).toBe(true);

      // Then blur to close
      slot.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
      await el.updateComplete;
      expect(el.open).toBe(false);
    });

    it('Escape key while open should call hide()', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
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

    it('Escape key when closed should not trigger any event', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      const hideHandler = vi.fn();
      el.addEventListener('sando-hide', hideHandler);

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await el.updateComplete;

      expect(hideHandler).not.toHaveBeenCalled();
    });
  });

  // =========================================================================
  // 4. WCAG 1.4.13 — Hoverable content
  // =========================================================================

  describe('WCAG 1.4.13 — Hoverable content', () => {
    it('moving mouse to tooltip bubble keeps it open', async () => {
      vi.useFakeTimers();
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Hoverable tip">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      // Open the tooltip via trigger mouseenter
      el.show();
      await el.updateComplete;
      expect(el.open).toBe(true);

      // Simulate mouse moving onto the bubble (mouseenter bubble)
      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble') as HTMLElement;
      bubble.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

      // Simulate mouse leaving the trigger (normally this would hide)
      const slot = el.shadowRoot?.querySelector('slot') as HTMLElement;
      slot.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));

      // Advance the 50ms microtask delay — _maybeHide checks both flags
      vi.runAllTimers();
      await el.updateComplete;

      // Tooltip should STILL be open because pointer is over the bubble
      expect(el.open).toBe(true);
      vi.useRealTimers();
    });

    it('tooltip hides after leaving both trigger and bubble', async () => {
      vi.useFakeTimers();
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Hoverable tip">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      el.show();
      await el.updateComplete;

      // Pointer enters bubble
      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble') as HTMLElement;
      bubble.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

      // Pointer leaves trigger
      const slot = el.shadowRoot?.querySelector('slot') as HTMLElement;
      slot.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      vi.runAllTimers();
      await el.updateComplete;
      expect(el.open).toBe(true); // still over bubble

      // Now pointer leaves bubble too
      bubble.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      vi.runAllTimers();
      await el.updateComplete;

      expect(el.open).toBe(false);
      vi.useRealTimers();
    });
  });

  // =========================================================================
  // 5. Skip-delay behavior
  // =========================================================================

  describe('Skip-delay behavior', () => {
    it('after hiding, showing again within skip-delay-duration skips the delay', async () => {
      vi.useFakeTimers();
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip" delay="300" skip-delay-duration="300">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      // First: show then hide to record _lastHideTime
      el.show();
      await el.updateComplete;
      el.hide();
      await el.updateComplete;
      expect(el.open).toBe(false);

      // Immediately trigger mouseenter again (within skip-delay-duration window)
      const slot = el.shadowRoot?.querySelector('slot') as HTMLElement;
      slot.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

      // Advance only 0ms — the delay should be skipped (effectiveDelay = 0)
      vi.advanceTimersByTime(0);
      await el.updateComplete;

      expect(el.open).toBe(true);
      vi.useRealTimers();
    });

    it('delay is NOT skipped when re-showing after skip-delay-duration has passed', async () => {
      vi.useFakeTimers();
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip" delay="300" skip-delay-duration="100">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      // Show, hide, then advance time past skip-delay-duration
      el.show();
      await el.updateComplete;
      el.hide();
      await el.updateComplete;

      // Advance 200ms > skipDelayDuration (100ms)
      vi.advanceTimersByTime(200);

      // Trigger mouseenter — full delay applies
      const slot = el.shadowRoot?.querySelector('slot') as HTMLElement;
      slot.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));

      // Tooltip should NOT be open yet (still in the delay window)
      await el.updateComplete;
      expect(el.open).toBe(false);

      // Advance the full delay
      vi.advanceTimersByTime(300);
      await el.updateComplete;
      expect(el.open).toBe(true);

      vi.useRealTimers();
    });
  });

  // =========================================================================
  // 6. ARIA wiring
  // =========================================================================

  describe('ARIA wiring', () => {
    it('tooltip bubble should have role="tooltip"', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble');
      expect(bubble?.getAttribute('role')).toBe('tooltip');
    });

    it('tooltip bubble id should be a non-empty string', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble');
      const tooltipId = bubble?.getAttribute('id');
      expect(tooltipId).toBeTruthy();
      expect(tooltipId?.startsWith('sando-tooltip-')).toBe(true);
    });

    it('slotted trigger element should have aria-describedby pointing to the tooltip id', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button id="trigger-btn">T</button>
        </sando-tooltip>
      `);
      await el.updateComplete;

      const trigger = el.querySelector('#trigger-btn') as HTMLElement;
      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble');
      const tooltipId = bubble?.getAttribute('id');

      expect(trigger.getAttribute('aria-describedby')).toBe(tooltipId);
    });

    it('tooltip bubble should have aria-hidden="true" when closed', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble');
      expect(bubble?.getAttribute('aria-hidden')).toBe('true');
    });

    it('tooltip bubble should have aria-hidden="false" when open', async () => {
      const el = await fixture<SandoTooltip>(html`
        <sando-tooltip content="Tip">
          <button>T</button>
        </sando-tooltip>
      `);
      mockPopoverIfNeeded(el);

      el.show();
      await el.updateComplete;

      const bubble = el.shadowRoot?.querySelector('.tooltip-bubble');
      expect(bubble?.getAttribute('aria-hidden')).toBe('false');
    });
  });
});
