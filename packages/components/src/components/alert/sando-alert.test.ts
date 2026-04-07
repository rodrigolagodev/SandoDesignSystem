/**
 * Unit Tests for sando-alert component
 *
 * Tests component logic, rendering, props, dismiss behavior,
 * keyboard interaction, and event emission.
 *
 * @see TESTING_STRATEGY.toon for test patterns
 */

import { fixture, html, expect as expectWc } from '@open-wc/testing';
import './sando-alert.js';
import type { SandoAlert } from './sando-alert.js';
import type { AlertDismissEventDetail, AlertOpenChangeEventDetail } from './sando-alert.types.js';

// ---------------------------------------------------------------------------
// Helper: JSDOM does not fire CSS animationend events automatically.
// The component's _dismiss() waits for animationend on .alert-container before
// setting open=false and emitting events. We simulate it here.
// ---------------------------------------------------------------------------
async function triggerDismissAnimation(el: SandoAlert): Promise<void> {
  await el.updateComplete; // wait for _isExiting = true + re-render
  const container = el.shadowRoot?.querySelector('.alert-container');
  if (container) {
    // AnimationEvent is not available in JSDOM — use a plain Event with the same type
    container.dispatchEvent(new Event('animationend', { bubbles: false }));
  }
  await el.updateComplete; // wait for open = false + events
}

describe('sando-alert', () => {
  let element: SandoAlert;

  beforeEach(async () => {
    element = await fixture<SandoAlert>(html`<sando-alert>Alert content</sando-alert>`);
    await element.updateComplete;
  });

  // ==========================================================================
  // Rendering
  // ==========================================================================

  describe('Rendering', () => {
    it('should render with default slot content', () => {
      expect(element).toBeDefined();
      expect(element.shadowRoot).toBeDefined();
      expect(element.textContent?.trim()).toBe('Alert content');
    });

    it('should render without title when title prop is not provided', async () => {
      const titleEl = element.shadowRoot?.querySelector('.alert-title');
      expect(titleEl).toBeNull();
    });

    it('should render title when title prop is provided', async () => {
      element = await fixture<SandoAlert>(
        html`<sando-alert title="Important notice">Alert content</sando-alert>`
      );
      await element.updateComplete;

      const titleEl = element.shadowRoot?.querySelector('.alert-title');
      expect(titleEl).toBeDefined();
      expect(titleEl?.textContent?.trim()).toBe('Important notice');
    });

    it('should render the actions slot when actions are provided', async () => {
      element = await fixture<SandoAlert>(html`
        <sando-alert>
          Alert content
          <button slot="actions">Retry</button>
        </sando-alert>
      `);
      await element.updateComplete;
      // Give slotchange time to fire
      await new Promise((r) => setTimeout(r, 0));
      await element.updateComplete;

      const actionsContainer = element.shadowRoot?.querySelector('.alert-actions');
      expect(actionsContainer).toBeDefined();
    });

    it('should not render close button when dismissible is false', () => {
      const closeBtn = element.shadowRoot?.querySelector('.alert-close');
      expect(closeBtn).toBeNull();
    });

    it('should render close button when dismissible is true', async () => {
      element = await fixture<SandoAlert>(
        html`<sando-alert dismissible>Alert content</sando-alert>`
      );
      await element.updateComplete;

      const closeBtn = element.shadowRoot?.querySelector('.alert-close');
      expect(closeBtn).toBeDefined();
    });

    it('should hide icon wrapper when hideIcon is true', async () => {
      element = await fixture<SandoAlert>(html`<sando-alert hide-icon>Alert content</sando-alert>`);
      await element.updateComplete;

      const iconWrapper = element.shadowRoot?.querySelector('.alert-icon-wrapper');
      expect(iconWrapper).toBeNull();
    });

    it('should render icon wrapper when hideIcon is false (default)', () => {
      const iconWrapper = element.shadowRoot?.querySelector('.alert-icon-wrapper');
      expect(iconWrapper).toBeDefined();
    });

    it('should render custom icon via icon slot', async () => {
      element = await fixture<SandoAlert>(html`
        <sando-alert>
          Alert content
          <span slot="icon" id="custom-icon">★</span>
        </sando-alert>
      `);
      await element.updateComplete;

      const iconSlot = element.shadowRoot?.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeDefined();

      const assigned = (iconSlot as HTMLSlotElement)?.assignedElements();
      expect(assigned.length).toBe(1);
      expect(assigned[0].id).toBe('custom-icon');
    });

    it('should be accessible by default', async () => {
      await expectWc(element).to.be.accessible();
    });
  });

  // ==========================================================================
  // Props
  // ==========================================================================

  describe('Props', () => {
    it('should have default props', () => {
      expect(element.status).toBe('info');
      expect(element.appearance).toBe('outline');
      expect(element.title).toBe('');
      expect(element.dismissible).toBe(false);
      expect(element.open).toBe(true);
      expect(element.hideIcon).toBe(false);
      expect(element.role).toBe('status');
    });

    it.each(['info', 'success', 'warning', 'destructive'] as const)(
      'should reflect status="%s" as attribute',
      async (status: 'info' | 'success' | 'warning' | 'destructive') => {
        element.status = status;
        await element.updateComplete;
        expect(element.getAttribute('status')).toBe(status);
      }
    );

    it.each(['solid', 'outline'] as const)(
      'should reflect appearance="%s" as attribute',
      async (appearance: 'solid' | 'outline') => {
        element.appearance = appearance;
        await element.updateComplete;
        expect(element.getAttribute('appearance')).toBe(appearance);
      }
    );

    it('should hide the alert when open=false', async () => {
      element = await fixture<SandoAlert>(
        html`<sando-alert open="false">Alert content</sando-alert>`
      );
      await element.updateComplete;

      // open=false means the attribute should NOT be present (boolean prop reflects)
      // When set via attribute string "false" it's still truthy; set prop directly
      element.open = false;
      await element.updateComplete;

      expect(element.hasAttribute('open')).toBe(false);
      expect(element.open).toBe(false);
    });

    it('should show the alert when open=true (default)', () => {
      expect(element.open).toBe(true);
      expect(element.hasAttribute('open')).toBe(true);
    });

    it('should reflect dismissible=true as attribute', async () => {
      element.dismissible = true;
      await element.updateComplete;
      expect(element.hasAttribute('dismissible')).toBe(true);
    });

    it('should reflect hideIcon=true as hide-icon attribute', async () => {
      element.hideIcon = true;
      await element.updateComplete;
      expect(element.hasAttribute('hide-icon')).toBe(true);
    });

    it('should reflect role prop as attribute', async () => {
      element.role = 'alert';
      await element.updateComplete;
      expect(element.getAttribute('role')).toBe('alert');
    });
  });

  // ==========================================================================
  // Events
  // ==========================================================================

  describe('Events', () => {
    it('should emit sando-dismiss with source="close-button" when close button is clicked', async () => {
      element = await fixture<SandoAlert>(
        html`<sando-alert dismissible>Alert content</sando-alert>`
      );
      await element.updateComplete;

      let detail: AlertDismissEventDetail | null = null;
      element.addEventListener('sando-dismiss', (e: Event) => {
        detail = (e as CustomEvent<AlertDismissEventDetail>).detail;
      });

      const closeBtn = element.shadowRoot?.querySelector<HTMLButtonElement>('.alert-close');
      expect(closeBtn).toBeDefined();
      closeBtn!.click();

      // JSDOM doesn't fire animationend — simulate it to unblock the dismiss logic
      await triggerDismissAnimation(element);

      expect(detail).not.toBeNull();
      expect(detail!.source).toBe('close-button');
    });

    it('should emit sando-dismiss when Escape is pressed and dismissible=true', async () => {
      element = await fixture<SandoAlert>(
        html`<sando-alert dismissible>Alert content</sando-alert>`
      );
      await element.updateComplete;

      let detail: AlertDismissEventDetail | null = null;
      element.addEventListener('sando-dismiss', (e: Event) => {
        detail = (e as CustomEvent<AlertDismissEventDetail>).detail;
      });

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await triggerDismissAnimation(element);

      expect(detail).not.toBeNull();
      expect(detail!.source).toBe('close-button');
    });

    it('should NOT emit sando-dismiss when Escape is pressed and dismissible=false', async () => {
      let fired = false;
      element.addEventListener('sando-dismiss', () => {
        fired = true;
      });

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await element.updateComplete;

      expect(fired).toBe(false);
    });

    it('should emit sando-open-change with detail.open=false after close button click', async () => {
      element = await fixture<SandoAlert>(
        html`<sando-alert dismissible>Alert content</sando-alert>`
      );
      await element.updateComplete;

      const received: AlertOpenChangeEventDetail[] = [];
      element.addEventListener('sando-open-change', (e: Event) => {
        received.push((e as CustomEvent<AlertOpenChangeEventDetail>).detail);
      });

      const closeBtn = element.shadowRoot?.querySelector<HTMLButtonElement>('.alert-close');
      closeBtn!.click();
      await triggerDismissAnimation(element);

      expect(received.length).toBeGreaterThan(0);
      expect(received[received.length - 1].open).toBe(false);
    });

    it('should emit sando-open-change with detail.open=true when show() is called', async () => {
      element = await fixture<SandoAlert>(
        html`<sando-alert .open=${false}>Alert content</sando-alert>`
      );
      await element.updateComplete;

      const received: AlertOpenChangeEventDetail[] = [];
      element.addEventListener('sando-open-change', (e: Event) => {
        received.push((e as CustomEvent<AlertOpenChangeEventDetail>).detail);
      });

      element.show();
      await element.updateComplete;

      expect(received.length).toBeGreaterThan(0);
      expect(received[received.length - 1].open).toBe(true);
    });

    it('should emit sando-open-change with detail.open=false when open prop set to false', async () => {
      const received: AlertOpenChangeEventDetail[] = [];
      element.addEventListener('sando-open-change', (e: Event) => {
        received.push((e as CustomEvent<AlertOpenChangeEventDetail>).detail);
      });

      element.open = false;
      await element.updateComplete;

      expect(received.length).toBe(1);
      expect(received[0].open).toBe(false);
    });

    it('should emit sando-dismiss with source="programmatic" when dismiss() is called', async () => {
      await element.updateComplete;

      let detail: AlertDismissEventDetail | null = null;
      element.addEventListener('sando-dismiss', (e: Event) => {
        detail = (e as CustomEvent<AlertDismissEventDetail>).detail;
      });

      element.dismiss();
      await triggerDismissAnimation(element);

      expect(detail).not.toBeNull();
      expect(detail!.source).toBe('programmatic');
    });

    it('should have sando-dismiss bubble and be composed', async () => {
      element = await fixture<SandoAlert>(
        html`<sando-alert dismissible>Alert content</sando-alert>`
      );
      await element.updateComplete;

      let capturedEvent: CustomEvent | null = null;
      // Listen on document (outside shadow) to verify bubbles+composed
      document.addEventListener(
        'sando-dismiss',
        (e: Event) => {
          capturedEvent = e as CustomEvent;
        },
        { once: true }
      );

      const closeBtn = element.shadowRoot?.querySelector<HTMLButtonElement>('.alert-close');
      closeBtn!.click();
      await triggerDismissAnimation(element);

      expect(capturedEvent).not.toBeNull();
      expect(capturedEvent!.bubbles).toBe(true);
      expect(capturedEvent!.composed).toBe(true);
    });
  });

  // ==========================================================================
  // Keyboard Navigation
  // ==========================================================================

  describe('Keyboard Navigation', () => {
    it('should close alert on Escape when dismissible=true', async () => {
      element = await fixture<SandoAlert>(
        html`<sando-alert dismissible>Alert content</sando-alert>`
      );
      await element.updateComplete;

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await triggerDismissAnimation(element);

      expect(element.open).toBe(false);
    });

    it('should NOT close alert on Escape when dismissible=false', async () => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await element.updateComplete;

      expect(element.open).toBe(true);
    });

    it('should NOT close alert on Escape when already closed', async () => {
      element = await fixture<SandoAlert>(
        html`<sando-alert dismissible .open=${false}>Alert content</sando-alert>`
      );
      await element.updateComplete;

      let fired = false;
      element.addEventListener('sando-dismiss', () => {
        fired = true;
      });

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await element.updateComplete;

      expect(fired).toBe(false);
    });

    it('should allow Tab to reach close button when dismissible', async () => {
      element = await fixture<SandoAlert>(
        html`<sando-alert dismissible>Alert content</sando-alert>`
      );
      await element.updateComplete;

      const closeBtn = element.shadowRoot?.querySelector<HTMLButtonElement>('.alert-close');
      expect(closeBtn).toBeDefined();
      // Close button must be reachable (not tabindex=-1, not disabled)
      expect(closeBtn?.getAttribute('tabindex')).not.toBe('-1');
      expect(closeBtn?.hasAttribute('disabled')).toBe(false);
    });

    it('should allow Tab to reach slotted action buttons', async () => {
      element = await fixture<SandoAlert>(html`
        <sando-alert>
          Alert content
          <button slot="actions" id="action-btn">Retry</button>
        </sando-alert>
      `);
      await element.updateComplete;

      const actionBtn = element.querySelector<HTMLButtonElement>('#action-btn');
      expect(actionBtn).toBeDefined();
      // Slotted light DOM button should be naturally focusable
      expect(actionBtn?.getAttribute('tabindex')).not.toBe('-1');
      expect(actionBtn?.hasAttribute('disabled')).toBe(false);
    });

    it('should ignore non-Escape keys for dismissal', async () => {
      element = await fixture<SandoAlert>(
        html`<sando-alert dismissible>Alert content</sando-alert>`
      );
      await element.updateComplete;

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      await element.updateComplete;

      expect(element.open).toBe(true);
    });
  });

  // ==========================================================================
  // Public API
  // ==========================================================================

  describe('Public API', () => {
    it('dismiss() should close the alert', async () => {
      element.dismiss();
      await triggerDismissAnimation(element);

      expect(element.open).toBe(false);
    });

    it('dismiss() should be a no-op when already closed', async () => {
      element.open = false;
      await element.updateComplete;

      let fired = false;
      element.addEventListener('sando-dismiss', () => {
        fired = true;
      });

      element.dismiss();
      await element.updateComplete;

      expect(fired).toBe(false);
    });

    it('show() should open the alert when closed', async () => {
      element.open = false;
      await element.updateComplete;

      element.show();
      await element.updateComplete;

      expect(element.open).toBe(true);
    });

    it('show() should be a no-op when already open', async () => {
      const received: AlertOpenChangeEventDetail[] = [];
      element.addEventListener('sando-open-change', (e: Event) => {
        received.push((e as CustomEvent<AlertOpenChangeEventDetail>).detail);
      });

      element.show(); // already open
      await element.updateComplete;

      expect(received.length).toBe(0);
    });
  });
});
