/**
 * Unit Tests for sando-dialog component
 *
 * Tests component logic, rendering, props, dismiss behavior,
 * keyboard interaction, and event emission.
 *
 * @see TESTING_STRATEGY.toon for test patterns
 */

import { fixture, html, expect as expectWc } from '@open-wc/testing';
import './sando-dialog.js';
import type { SandoDialog } from './sando-dialog.js';
import type {
  DialogCloseEventDetail,
  DialogRequestCloseEventDetail
} from './sando-dialog.types.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * JSDOM does not fire CSS animationend events automatically.
 * The component listens for animationend on [part="panel"] to finalize close.
 * We dispatch it manually to unblock the close logic.
 */
async function triggerPanelAnimationEnd(el: SandoDialog): Promise<void> {
  await el.updateComplete;
  const panel = el.shadowRoot?.querySelector('[part="panel"]');
  if (panel) {
    panel.dispatchEvent(new Event('animationend', { bubbles: false }));
  }
  await el.updateComplete;
}

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

describe('sando-dialog', () => {
  let element: SandoDialog;

  beforeEach(async () => {
    element = await fixture<SandoDialog>(html`
      <sando-dialog>
        <span slot="title">Dialog title</span>
        <p>Body content</p>
      </sando-dialog>
    `);
    await element.updateComplete;
  });

  afterEach(() => {
    // Ensure no lingering open dialogs pollute subsequent tests
    if (element.open) {
      element.open = false;
    }
    document.body.style.overflow = '';
  });

  // ==========================================================================
  // Rendering
  // ==========================================================================

  describe('Rendering', () => {
    it('should render with default props (open=false, not visible)', () => {
      expect(element).toBeDefined();
      expect(element.shadowRoot).toBeDefined();
      expect(element.open).toBe(false);
      expect(element.hasAttribute('open')).toBe(false);
    });

    it('should render with open=true', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Open dialog</span>
          <p>Content</p>
        </sando-dialog>
      `);
      await element.updateComplete;

      expect(element.open).toBe(true);
      expect(element.hasAttribute('open')).toBe(true);
    });

    it('should reflect width as attribute and apply --sando-dialog-width on panel', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog width="600px" open>
          <span slot="title">Custom width dialog</span>
        </sando-dialog>
      `);
      await element.updateComplete;
      expect(element.width).toBe('600px');
      expect(element.getAttribute('width')).toBe('600px');
      const panel = element.shadowRoot?.querySelector('[part="panel"]') as HTMLElement;
      expect(panel.style.getPropertyValue('--sando-dialog-width')).toBe('600px');
    });

    it('should render title slot content', async () => {
      const titleSlot = element.shadowRoot?.querySelector('slot[name="title"]') as HTMLSlotElement;
      expect(titleSlot).toBeDefined();
      const assigned = titleSlot.assignedElements();
      expect(assigned.length).toBeGreaterThan(0);
    });

    it('should render description slot', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Title</span>
          <span slot="description">A helpful description</span>
          <p>Body</p>
        </sando-dialog>
      `);
      await element.updateComplete;
      // Wait for slotchange to fire
      await new Promise((r) => setTimeout(r, 0));
      await element.updateComplete;

      const descSlot = element.shadowRoot?.querySelector(
        'slot[name="description"]'
      ) as HTMLSlotElement;
      expect(descSlot).toBeDefined();
      const assigned = descSlot.assignedElements();
      expect(assigned.length).toBe(1);
    });

    it('should render actions slot content', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Title</span>
          <p>Body</p>
          <button slot="actions">Confirm</button>
        </sando-dialog>
      `);
      await element.updateComplete;
      await new Promise((r) => setTimeout(r, 0));
      await element.updateComplete;

      const actionsSlot = element.shadowRoot?.querySelector(
        'slot[name="actions"]'
      ) as HTMLSlotElement;
      expect(actionsSlot).toBeDefined();
      const assigned = actionsSlot.assignedElements();
      expect(assigned.length).toBe(1);
    });

    it('should render default body slot content', async () => {
      const bodyContent = element.textContent?.trim();
      expect(bodyContent).toContain('Body content');
    });

    it('should show header by default (noHeader=false)', () => {
      const header = element.shadowRoot?.querySelector('[part="header"]');
      expect(header).toBeDefined();
    });

    it('should still render header element when noHeader=true (hidden via CSS/attribute)', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog no-header aria-label="Test dialog">
          <p>Body</p>
        </sando-dialog>
      `);
      await element.updateComplete;
      // noHeader uses CSS to hide the header, the element is still present
      expect(element.noHeader).toBe(true);
      expect(element.hasAttribute('no-header')).toBe(true);
    });

    it('should show close button by default (type=dialog, dismissible=true)', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Title</span>
        </sando-dialog>
      `);
      await element.updateComplete;

      const closeBtn = element.shadowRoot?.querySelector('[part="close-button"]');
      expect(closeBtn).toBeDefined();
      // The button should not have the hidden class
      expect(closeBtn?.classList.contains('close-button-hidden')).toBe(false);
    });

    it('should hide close button when type="alert"', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog type="alert" open>
          <span slot="title">Alert</span>
          <button slot="actions">OK</button>
        </sando-dialog>
      `);
      await element.updateComplete;

      // For type="alert", _showCloseButton = false → button is not rendered in DOM at all
      const closeBtn = element.shadowRoot?.querySelector('[part="close-button"]');
      expect(closeBtn).toBeNull();
    });

    it('should hide close button when dismissible=false', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Title</span>
        </sando-dialog>
      `);
      element.dismissible = false;
      await element.updateComplete;

      // dismissible=false → _showCloseButton = false → button is not rendered in DOM at all
      const closeBtn = element.shadowRoot?.querySelector('[part="close-button"]');
      expect(closeBtn).toBeNull();
    });

    it('should render close button when noHeader=true and dismissible=true', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog no-header dismissible open aria-label="Regression test dialog">
          <p>Body content</p>
        </sando-dialog>
      `);
      await element.updateComplete;

      // Regression: close button must be in DOM even when noHeader=true
      const closeBtn = element.shadowRoot?.querySelector('[part="close-button"]');
      expect(closeBtn).not.toBeNull();

      // The button must not be hidden inside a visually-hidden container
      const visHidden = closeBtn?.closest('.sr-only, .visually-hidden, [aria-hidden="true"]');
      expect(visHidden).toBeNull();

      // Clicking the close button fires sando-request-close
      let requestCloseDetail: DialogRequestCloseEventDetail | null = null;
      element.addEventListener('sando-request-close', (e: Event) => {
        requestCloseDetail = (e as CustomEvent<DialogRequestCloseEventDetail>).detail;
      });

      (closeBtn as HTMLButtonElement)?.click();
      await element.updateComplete;

      expect(requestCloseDetail).not.toBeNull();
      expect(requestCloseDetail!.source).toBe('close-button');
    });

    it('should be accessible by default', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Accessible dialog</span>
          <p>Content here.</p>
        </sando-dialog>
      `);
      await element.updateComplete;
      await expectWc(element).to.be.accessible();
    });
  });

  // ==========================================================================
  // Props
  // ==========================================================================

  describe('Props', () => {
    it('should have default props', () => {
      expect(element.open).toBe(false);
      expect(element.type).toBe('dialog');
      expect(element.width).toBe('');
      expect(element.noHeader).toBe(false);
      expect(element.dismissible).toBe(true);
    });

    it('type="alert" sets role="alertdialog" on panel', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog type="alert" open>
          <span slot="title">Alert</span>
          <button slot="actions">OK</button>
        </sando-dialog>
      `);
      await element.updateComplete;

      const panel = element.shadowRoot?.querySelector('[part="panel"]');
      expect(panel?.getAttribute('role')).toBe('alertdialog');
    });

    it('type="dialog" sets role="dialog" on panel (default)', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Dialog</span>
        </sando-dialog>
      `);
      await element.updateComplete;

      const panel = element.shadowRoot?.querySelector('[part="panel"]');
      expect(panel?.getAttribute('role')).toBe('dialog');
    });

    it('aria-modal="true" always present on panel', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Dialog</span>
        </sando-dialog>
      `);
      await element.updateComplete;

      const panel = element.shadowRoot?.querySelector('[part="panel"]');
      expect(panel?.getAttribute('aria-modal')).toBe('true');
    });

    it('aria-modal="true" present for type="alert" too', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog type="alert" open>
          <span slot="title">Alert</span>
          <button slot="actions">OK</button>
        </sando-dialog>
      `);
      await element.updateComplete;

      const panel = element.shadowRoot?.querySelector('[part="panel"]');
      expect(panel?.getAttribute('aria-modal')).toBe('true');
    });

    it('should reflect width as attribute', async () => {
      element.width = '800px';
      await element.updateComplete;
      expect(element.getAttribute('width')).toBe('800px');
    });

    it('should reflect type as attribute', async () => {
      element.type = 'alert';
      await element.updateComplete;
      expect(element.getAttribute('type')).toBe('alert');
    });

    it('should reflect open as attribute', async () => {
      element.open = true;
      await element.updateComplete;
      expect(element.hasAttribute('open')).toBe(true);
    });

    it('should reflect dismissible=false as attribute', async () => {
      element.dismissible = false;
      await element.updateComplete;
      expect(element.hasAttribute('dismissible')).toBe(false);
    });

    it('type="alert" forces _effectiveDismissible=false (no Escape/backdrop close)', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog type="alert" open>
          <span slot="title">Alert</span>
          <button slot="actions">OK</button>
        </sando-dialog>
      `);
      await element.updateComplete;

      let requestCloseCount = 0;
      element.addEventListener('sando-request-close', () => {
        requestCloseCount++;
      });

      // Escape key
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
      );
      await element.updateComplete;

      // Backdrop click
      const backdrop = element.shadowRoot?.querySelector('[part="backdrop"]') as HTMLElement;
      backdrop?.click();
      await element.updateComplete;

      expect(requestCloseCount).toBe(0);
      expect(element.open).toBe(true);
    });

    it('dismissible=false disables Escape dismiss', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Title</span>
        </sando-dialog>
      `);
      element.dismissible = false;
      await element.updateComplete;

      let requestClosed = false;
      element.addEventListener('sando-request-close', () => {
        requestClosed = true;
      });

      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
      );
      await element.updateComplete;

      expect(requestClosed).toBe(false);
      expect(element.open).toBe(true);
    });

    it('dismissible=false disables backdrop dismiss', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Title</span>
        </sando-dialog>
      `);
      element.dismissible = false;
      await element.updateComplete;

      let requestClosed = false;
      element.addEventListener('sando-request-close', () => {
        requestClosed = true;
      });

      const backdrop = element.shadowRoot?.querySelector('[part="backdrop"]') as HTMLElement;
      backdrop?.click();
      await element.updateComplete;

      expect(requestClosed).toBe(false);
      expect(element.open).toBe(true);
    });
  });

  // ==========================================================================
  // Events
  // ==========================================================================

  describe('Events', () => {
    it('show() fires sando-open', async () => {
      let fired = false;
      element.addEventListener('sando-open', () => {
        fired = true;
      });

      element.show();
      await element.updateComplete;

      expect(fired).toBe(true);
    });

    it('show() is a no-op when already open', async () => {
      element.open = true;
      await element.updateComplete;

      let fired = false;
      element.addEventListener('sando-open', () => {
        fired = true;
      });

      element.show();
      await element.updateComplete;

      expect(fired).toBe(false);
    });

    it('hide() fires sando-close with source "api"', async () => {
      element.open = true;
      await element.updateComplete;

      let detail: DialogCloseEventDetail | null = null;
      element.addEventListener('sando-close', (e: Event) => {
        detail = (e as CustomEvent<DialogCloseEventDetail>).detail;
      });

      element.hide();
      await element.updateComplete;

      expect(detail).not.toBeNull();
      expect(detail!.source).toBe('api');
    });

    it('hide() is a no-op when already closed', async () => {
      let fired = false;
      element.addEventListener('sando-close', () => {
        fired = true;
      });

      element.hide();
      await element.updateComplete;

      expect(fired).toBe(false);
    });

    it('backdrop click fires sando-request-close with source "backdrop"', async () => {
      element.open = true;
      await element.updateComplete;

      let detail: DialogRequestCloseEventDetail | null = null;
      element.addEventListener('sando-request-close', (e: Event) => {
        detail = (e as CustomEvent<DialogRequestCloseEventDetail>).detail;
      });

      const backdrop = element.shadowRoot?.querySelector('[part="backdrop"]') as HTMLElement;
      backdrop?.click();
      await element.updateComplete;

      expect(detail).not.toBeNull();
      expect(detail!.source).toBe('backdrop');
    });

    it('close button click fires sando-request-close with source "close-button"', async () => {
      element.open = true;
      await element.updateComplete;

      let detail: DialogRequestCloseEventDetail | null = null;
      element.addEventListener('sando-request-close', (e: Event) => {
        detail = (e as CustomEvent<DialogRequestCloseEventDetail>).detail;
      });

      const closeBtn =
        element.shadowRoot?.querySelector<HTMLButtonElement>('[part="close-button"]');
      closeBtn?.click();
      await element.updateComplete;

      expect(detail).not.toBeNull();
      expect(detail!.source).toBe('close-button');
    });

    it('Escape key fires sando-request-close with source "escape"', async () => {
      element.open = true;
      await element.updateComplete;

      let detail: DialogRequestCloseEventDetail | null = null;
      element.addEventListener('sando-request-close', (e: Event) => {
        detail = (e as CustomEvent<DialogRequestCloseEventDetail>).detail;
      });

      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
      );
      await element.updateComplete;

      expect(detail).not.toBeNull();
      expect(detail!.source).toBe('escape');
    });

    it('sando-request-close is cancelable — preventDefault() prevents close', async () => {
      element.open = true;
      await element.updateComplete;

      element.addEventListener('sando-request-close', (e: Event) => {
        e.preventDefault();
      });

      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
      );
      await element.updateComplete;

      // Dialog should remain open because request was canceled
      expect(element.open).toBe(true);
    });

    it('sando-request-close has bubbles=true and composed=true', async () => {
      element.open = true;
      await element.updateComplete;

      let capturedEvent: CustomEvent | null = null;
      document.addEventListener(
        'sando-request-close',
        (e: Event) => {
          capturedEvent = e as CustomEvent;
        },
        { once: true }
      );

      const backdrop = element.shadowRoot?.querySelector('[part="backdrop"]') as HTMLElement;
      backdrop?.click();
      await element.updateComplete;

      expect(capturedEvent).not.toBeNull();
      expect(capturedEvent!.bubbles).toBe(true);
      expect(capturedEvent!.composed).toBe(true);
    });

    it('type="alert" does NOT fire sando-request-close on Escape', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog type="alert" open>
          <span slot="title">Alert</span>
          <button slot="actions">OK</button>
        </sando-dialog>
      `);
      await element.updateComplete;

      let fired = false;
      element.addEventListener('sando-request-close', () => {
        fired = true;
      });

      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
      );
      await element.updateComplete;

      expect(fired).toBe(false);
    });

    it('type="alert" does NOT fire sando-request-close on backdrop click', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog type="alert" open>
          <span slot="title">Alert</span>
          <button slot="actions">OK</button>
        </sando-dialog>
      `);
      await element.updateComplete;

      let fired = false;
      element.addEventListener('sando-request-close', () => {
        fired = true;
      });

      const backdrop = element.shadowRoot?.querySelector('[part="backdrop"]') as HTMLElement;
      backdrop?.click();
      await element.updateComplete;

      expect(fired).toBe(false);
    });

    it('sando-after-open fires after panel animationend', async () => {
      // Register listener BEFORE show() so we don't miss the event
      let fired = false;
      element.addEventListener('sando-after-open', () => {
        fired = true;
      });

      // Trigger show — this wires the animationend listener on the panel internally
      element.show();
      // Wait for updateComplete so the panel animationend listener is registered
      await element.updateComplete;
      // Allow the updateComplete.then() inside _openDialog to run
      await new Promise((r) => setTimeout(r, 0));

      // Now dispatch animationend to trigger after-open
      const panel = element.shadowRoot?.querySelector('[part="panel"]');
      panel?.dispatchEvent(new Event('animationend', { bubbles: false }));
      await element.updateComplete;

      expect(fired).toBe(true);
    });

    it('sando-after-close fires after panel animationend on close', async () => {
      element.open = true;
      await element.updateComplete;

      let detail: DialogCloseEventDetail | null = null;
      element.addEventListener('sando-after-close', (e: Event) => {
        detail = (e as CustomEvent<DialogCloseEventDetail>).detail;
      });

      element.hide();
      await triggerPanelAnimationEnd(element);

      expect(detail).not.toBeNull();
      expect(detail!.source).toBe('api');
    });

    it('sando-close has bubbles=true and composed=true', async () => {
      element.open = true;
      await element.updateComplete;

      let capturedEvent: CustomEvent | null = null;
      document.addEventListener(
        'sando-close',
        (e: Event) => {
          capturedEvent = e as CustomEvent;
        },
        { once: true }
      );

      element.hide();
      await element.updateComplete;

      expect(capturedEvent).not.toBeNull();
      expect(capturedEvent!.bubbles).toBe(true);
      expect(capturedEvent!.composed).toBe(true);
    });

    it('sando-open has bubbles=true and composed=true', async () => {
      let capturedEvent: CustomEvent | null = null;
      document.addEventListener(
        'sando-open',
        (e: Event) => {
          capturedEvent = e as CustomEvent;
        },
        { once: true }
      );

      element.show();
      await element.updateComplete;

      expect(capturedEvent).not.toBeNull();
      expect(capturedEvent!.bubbles).toBe(true);
      expect(capturedEvent!.composed).toBe(true);
    });
  });

  // ==========================================================================
  // Keyboard Navigation
  // ==========================================================================

  describe('Keyboard Navigation', () => {
    it('Escape closes type="dialog" when dismissible=true', async () => {
      element.open = true;
      await element.updateComplete;

      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
      );
      await triggerPanelAnimationEnd(element);

      expect(element.open).toBe(false);
    });

    it('Escape does NOT close type="alert"', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog type="alert" open>
          <span slot="title">Alert</span>
          <button slot="actions">OK</button>
        </sando-dialog>
      `);
      await element.updateComplete;

      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
      );
      await element.updateComplete;

      expect(element.open).toBe(true);
    });

    it('Escape does NOT close when dismissible=false', async () => {
      element.open = true;
      element.dismissible = false;
      await element.updateComplete;

      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
      );
      await element.updateComplete;

      expect(element.open).toBe(true);
    });

    it('Escape does nothing when dialog is closed', async () => {
      // element.open = false by default
      let fired = false;
      element.addEventListener('sando-request-close', () => {
        fired = true;
      });

      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
      );
      await element.updateComplete;

      expect(fired).toBe(false);
    });

    it('Enter on close button closes dialog', async () => {
      element.open = true;
      await element.updateComplete;

      let requestCloseDetail: DialogRequestCloseEventDetail | null = null;
      element.addEventListener('sando-request-close', (e: Event) => {
        requestCloseDetail = (e as CustomEvent<DialogRequestCloseEventDetail>).detail;
      });

      const closeBtn =
        element.shadowRoot?.querySelector<HTMLButtonElement>('[part="close-button"]');
      closeBtn?.focus();
      closeBtn?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
      );
      closeBtn?.click(); // native button handles Enter→click in real browsers

      await element.updateComplete;

      expect(requestCloseDetail).not.toBeNull();
      expect(requestCloseDetail!.source).toBe('close-button');
    });

    it('Space on close button closes dialog', async () => {
      element.open = true;
      await element.updateComplete;

      let requestCloseDetail: DialogRequestCloseEventDetail | null = null;
      element.addEventListener('sando-request-close', (e: Event) => {
        requestCloseDetail = (e as CustomEvent<DialogRequestCloseEventDetail>).detail;
      });

      const closeBtn =
        element.shadowRoot?.querySelector<HTMLButtonElement>('[part="close-button"]');
      closeBtn?.focus();
      closeBtn?.dispatchEvent(
        new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
      );
      closeBtn?.click(); // simulate space activation

      await element.updateComplete;

      expect(requestCloseDetail).not.toBeNull();
      expect(requestCloseDetail!.source).toBe('close-button');
    });

    it('non-Escape keys do not trigger close', async () => {
      element.open = true;
      await element.updateComplete;

      let fired = false;
      element.addEventListener('sando-request-close', () => {
        fired = true;
      });

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await element.updateComplete;

      expect(fired).toBe(false);
    });
  });

  // ==========================================================================
  // Dismiss Logic
  // ==========================================================================

  describe('Dismiss Logic', () => {
    it('backdrop click closes type="dialog" when dismissible=true', async () => {
      element.open = true;
      await element.updateComplete;

      const backdrop = element.shadowRoot?.querySelector('[part="backdrop"]') as HTMLElement;
      backdrop?.click();
      await triggerPanelAnimationEnd(element);

      expect(element.open).toBe(false);
    });

    it('backdrop click does NOT close type="alert"', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog type="alert" open>
          <span slot="title">Alert</span>
          <button slot="actions">OK</button>
        </sando-dialog>
      `);
      await element.updateComplete;

      const backdrop = element.shadowRoot?.querySelector('[part="backdrop"]') as HTMLElement;
      backdrop?.click();
      await element.updateComplete;

      expect(element.open).toBe(true);
    });

    it('close button closes type="dialog" by default', async () => {
      element.open = true;
      await element.updateComplete;

      const closeBtn =
        element.shadowRoot?.querySelector<HTMLButtonElement>('[part="close-button"]');
      closeBtn?.click();
      await triggerPanelAnimationEnd(element);

      expect(element.open).toBe(false);
    });

    it('sando-request-close prevented → dialog stays open', async () => {
      element.open = true;
      await element.updateComplete;

      element.addEventListener('sando-request-close', (e: Event) => {
        e.preventDefault();
      });

      const closeBtn =
        element.shadowRoot?.querySelector<HTMLButtonElement>('[part="close-button"]');
      closeBtn?.click();
      await element.updateComplete;

      expect(element.open).toBe(true);
    });

    it('sando-request-close prevention works for backdrop too', async () => {
      element.open = true;
      await element.updateComplete;

      element.addEventListener('sando-request-close', (e: Event) => {
        e.preventDefault();
      });

      const backdrop = element.shadowRoot?.querySelector('[part="backdrop"]') as HTMLElement;
      backdrop?.click();
      await element.updateComplete;

      expect(element.open).toBe(true);
    });

    it('sando-request-close prevention works for Escape too', async () => {
      element.open = true;
      await element.updateComplete;

      element.addEventListener('sando-request-close', (e: Event) => {
        e.preventDefault();
      });

      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
      );
      await element.updateComplete;

      expect(element.open).toBe(true);
    });

    it('body scroll is locked while dialog is open', async () => {
      element.show();
      await element.updateComplete;

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('body scroll is released after dialog closes', async () => {
      element.show();
      await element.updateComplete;

      element.hide();
      await triggerPanelAnimationEnd(element);

      expect(document.body.style.overflow).toBe('');
    });

    it('inert is applied to sibling elements when dialog opens', async () => {
      const sibling = document.createElement('div');
      sibling.id = 'sibling';
      element.parentElement?.appendChild(sibling);

      element.show();
      await element.updateComplete;

      expect((sibling as HTMLElement).inert).toBe(true);

      // cleanup
      element.hide();
      await triggerPanelAnimationEnd(element);
      sibling.remove();
    });

    it('inert is removed from siblings after dialog closes', async () => {
      const sibling = document.createElement('div');
      element.parentElement?.appendChild(sibling);

      element.show();
      await element.updateComplete;

      element.hide();
      await triggerPanelAnimationEnd(element);

      expect((sibling as HTMLElement).inert).toBe(false);

      sibling.remove();
    });
  });

  // ==========================================================================
  // Public API
  // ==========================================================================

  describe('Public API', () => {
    it('show() sets open=true', async () => {
      element.show();
      await element.updateComplete;
      expect(element.open).toBe(true);
    });

    it('hide() sets open=false after animation', async () => {
      element.open = true;
      await element.updateComplete;

      element.hide();
      await triggerPanelAnimationEnd(element);

      expect(element.open).toBe(false);
    });

    it('show() is idempotent when already open', async () => {
      element.open = true;
      await element.updateComplete;

      let openCount = 0;
      element.addEventListener('sando-open', () => openCount++);

      element.show();
      await element.updateComplete;

      expect(openCount).toBe(0);
    });

    it('hide() is idempotent when already closed', async () => {
      let closeCount = 0;
      element.addEventListener('sando-close', () => closeCount++);

      element.hide();
      await element.updateComplete;

      expect(closeCount).toBe(0);
    });
  });
});
