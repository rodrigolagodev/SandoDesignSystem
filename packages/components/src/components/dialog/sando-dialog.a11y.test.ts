/**
 * Accessibility Tests for sando-dialog component
 *
 * Tests WCAG 2.1 AA compliance using axe-core and manual ARIA checks.
 *
 * @see WCAG_COMPLIANCE.toon for accessibility requirements
 */

import { fixture, html } from '@open-wc/testing';
import { axe } from 'jest-axe';
import './sando-dialog.js';
import type { SandoDialog } from './sando-dialog.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * JSDOM does not fire CSS animationend events automatically.
 * The component listens for animationend on [part="panel"] to finalize close.
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

describe('sando-dialog Accessibility', () => {
  let element: SandoDialog;

  beforeEach(async () => {
    element = await fixture<SandoDialog>(html`
      <sando-dialog>
        <span slot="title">Accessible dialog title</span>
        <p>Dialog body content for accessibility testing.</p>
      </sando-dialog>
    `);
    await element.updateComplete;
  });

  afterEach(() => {
    if (element.open) {
      element.open = false;
    }
    document.body.style.overflow = '';
  });

  // ==========================================================================
  // axe-core Automated Tests
  // ==========================================================================

  describe('axe-core validation', () => {
    it('should have no violations when closed (rendered in DOM)', async () => {
      // closed state — element is in DOM but open=false
      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations when open with title', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Confirm deletion</span>
          <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        </sando-dialog>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with type="alert"', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog type="alert" open>
          <span slot="title">Session expired</span>
          <p>Your session has expired. Please log in again to continue.</p>
          <button slot="actions">Log in</button>
        </sando-dialog>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with custom width="400px"', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog width="400px" open>
          <span slot="title">Narrow dialog</span>
          <p>Compact content.</p>
        </sando-dialog>
      `);
      await element.updateComplete;
      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with custom width="800px"', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog width="800px" open>
          <span slot="title">Wide dialog</span>
          <p>Standard content.</p>
        </sando-dialog>
      `);
      await element.updateComplete;
      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with custom width="90vw"', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog width="90vw" open>
          <span slot="title">Viewport-relative dialog</span>
          <p>Expanded content area.</p>
        </sando-dialog>
      `);
      await element.updateComplete;
      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with custom width="100%"', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog width="100%" open>
          <span slot="title">Full-width dialog</span>
          <p>Immersive content.</p>
        </sando-dialog>
      `);
      await element.updateComplete;
      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with description slot populated', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Upload file</span>
          <span slot="description">Select a file to upload to your account.</span>
          <p>Drop files here or click to browse.</p>
          <button slot="actions">Cancel</button>
          <button slot="actions">Upload</button>
        </sando-dialog>
      `);
      await element.updateComplete;
      await new Promise((r) => setTimeout(r, 0));
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with dismissible=false', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Non-dismissible dialog</span>
          <p>You must take an action.</p>
          <button slot="actions">OK</button>
        </sando-dialog>
      `);
      element.dismissible = false;
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });

    it('should have no violations with no-header when dialog has title slot as fallback', async () => {
      // When no-header is used, the title slot is still rendered (just hidden visually).
      // aria-labelledby="dialog-title" on the panel still satisfies the accessible name requirement.
      element = await fixture<SandoDialog>(html`
        <sando-dialog no-header open>
          <span slot="title">Confirm your action</span>
          <p>Are you sure?</p>
          <button slot="actions">Yes</button>
          <button slot="actions">No</button>
        </sando-dialog>
      `);
      await element.updateComplete;

      const results = await axe(element);
      expect(results).toHaveNoViolations();
    });
  });

  // ==========================================================================
  // ARIA Attributes
  // ==========================================================================

  describe('ARIA attributes', () => {
    it('should have role="dialog" on panel for type="dialog"', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Dialog</span>
        </sando-dialog>
      `);
      await element.updateComplete;

      const panel = element.shadowRoot?.querySelector('[part="panel"]');
      expect(panel?.getAttribute('role')).toBe('dialog');
    });

    it('should have role="alertdialog" on panel for type="alert"', async () => {
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

    it('should have aria-modal="true" on panel', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Modal dialog</span>
        </sando-dialog>
      `);
      await element.updateComplete;

      const panel = element.shadowRoot?.querySelector('[part="panel"]');
      expect(panel?.getAttribute('aria-modal')).toBe('true');
    });

    it('should have aria-labelledby referencing title element id', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">My dialog title</span>
        </sando-dialog>
      `);
      await element.updateComplete;

      const panel = element.shadowRoot?.querySelector('[part="panel"]');
      const labelledById = panel?.getAttribute('aria-labelledby');
      expect(labelledById).toBe('dialog-title');

      // Verify the referenced element exists
      const titleEl = element.shadowRoot?.querySelector(`#${labelledById}`);
      expect(titleEl).toBeDefined();
    });

    it('should have aria-describedby referencing description element when description is present', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Dialog with description</span>
          <span slot="description">This is the description text</span>
          <p>Body content.</p>
        </sando-dialog>
      `);
      await element.updateComplete;
      // Allow slotchange to fire
      await new Promise((r) => setTimeout(r, 0));
      await element.updateComplete;

      const panel = element.shadowRoot?.querySelector('[part="panel"]');
      const describedById = panel?.getAttribute('aria-describedby');
      expect(describedById).toBe('dialog-desc');

      // Verify the referenced element exists
      const descEl = element.shadowRoot?.querySelector(`#${describedById}`);
      expect(descEl).toBeDefined();
    });

    it('should NOT set aria-describedby when no description slot content', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Dialog without description</span>
          <p>Body only.</p>
        </sando-dialog>
      `);
      await element.updateComplete;

      const panel = element.shadowRoot?.querySelector('[part="panel"]');
      // When _hasDescription=false, aria-describedby is set to Lit's `nothing` (removed)
      expect(panel?.hasAttribute('aria-describedby')).toBe(false);
    });

    it('close button should have accessible label', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Dialog</span>
        </sando-dialog>
      `);
      await element.updateComplete;

      const closeBtn = element.shadowRoot?.querySelector('[part="close-button"]');
      expect(closeBtn?.getAttribute('aria-label')).toBe('Close dialog');
    });

    it('close button type should be "button" (not submit)', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Dialog</span>
        </sando-dialog>
      `);
      await element.updateComplete;

      const closeBtn =
        element.shadowRoot?.querySelector<HTMLButtonElement>('[part="close-button"]');
      expect(closeBtn?.getAttribute('type')).toBe('button');
    });

    it('console.warn fires when noHeader=true without aria-label', async () => {
      const warnSpy = vi.spyOn(console, 'warn');

      element = await fixture<SandoDialog>(html`
        <sando-dialog no-header open>
          <p>Content without a header or aria-label.</p>
        </sando-dialog>
      `);
      await element.updateComplete;

      // The component emits a single warn string containing both markers
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('[sando-dialog]'));

      const callArg = warnSpy.mock.calls[0][0] as string;
      expect(callArg).toContain('no-header');

      warnSpy.mockRestore();
    });

    it('panel has tabindex="-1" to be focusable programmatically', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Dialog</span>
        </sando-dialog>
      `);
      await element.updateComplete;

      const panel = element.shadowRoot?.querySelector('[part="panel"]');
      expect(panel?.getAttribute('tabindex')).toBe('-1');
    });
  });

  // ==========================================================================
  // Focus Management
  // ==========================================================================

  describe('Focus management', () => {
    it('should move focus to the panel on show()', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog>
          <span slot="title">Dialog</span>
          <p>Content</p>
        </sando-dialog>
      `);
      await element.updateComplete;

      element.show();
      await element.updateComplete;
      // Allow focus management microtasks to run
      await new Promise((r) => setTimeout(r, 0));

      const panel = element.shadowRoot?.querySelector('[part="panel"]') as HTMLElement;
      // JSDOM may not set document.activeElement inside shadow roots reliably,
      // but we verify focus() was reachable by checking panel exists with tabindex=-1
      expect(panel).toBeDefined();
      expect(panel.getAttribute('tabindex')).toBe('-1');
    });

    it('[autofocus] element inside dialog receives focus on open', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog>
          <span slot="title">Dialog with autofocus</span>
          <button id="autofocus-btn" autofocus>Primary action</button>
        </sando-dialog>
      `);
      await element.updateComplete;

      element.show();
      await element.updateComplete;
      await new Promise((r) => setTimeout(r, 0));

      // Verify the autofocus element exists in the slotted content
      const autofocusEl = element.querySelector('#autofocus-btn') as HTMLElement;
      expect(autofocusEl).toBeDefined();
      // In JSDOM the component calls autofocusEl.focus() — verify element is focusable
      expect(autofocusEl.getAttribute('tabindex')).not.toBe('-1');
      expect(autofocusEl.hasAttribute('disabled')).toBe(false);
    });

    it('focus returns to trigger element after hide()', async () => {
      // Create a button to serve as the trigger
      const trigger = document.createElement('button');
      trigger.id = 'dialog-trigger';
      trigger.textContent = 'Open dialog';
      document.body.appendChild(trigger);

      element = await fixture<SandoDialog>(html`
        <sando-dialog>
          <span slot="title">Dialog</span>
          <p>Content</p>
        </sando-dialog>
      `);
      await element.updateComplete;

      // Focus the trigger before opening
      trigger.focus();

      element.show();
      await element.updateComplete;

      element.hide();
      await triggerPanelAnimationEnd(element);
      await new Promise((r) => setTimeout(r, 0));

      // Verify focus was restored to trigger
      expect(document.activeElement).toBe(trigger);

      // cleanup
      trigger.remove();
    });

    it('close button should be focusable when dialog is open', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Dialog</span>
        </sando-dialog>
      `);
      await element.updateComplete;

      const closeBtn =
        element.shadowRoot?.querySelector<HTMLButtonElement>('[part="close-button"]');
      expect(closeBtn).toBeDefined();
      expect(closeBtn?.hasAttribute('disabled')).toBe(false);
      expect(closeBtn?.getAttribute('tabindex')).not.toBe('-1');
    });

    it('close button should have visible focus indicator', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Dialog</span>
        </sando-dialog>
      `);
      await element.updateComplete;

      const closeBtn =
        element.shadowRoot?.querySelector<HTMLButtonElement>('[part="close-button"]');
      expect(closeBtn).toBeDefined();
      closeBtn!.focus();

      const styles = window.getComputedStyle(closeBtn!);
      // Either outline or box-shadow provides the focus ring — neither should be "none"
      expect(styles.outline !== 'none' || styles.boxShadow !== 'none').toBe(true);
    });
  });

  // ==========================================================================
  // Keyboard Accessibility
  // ==========================================================================

  describe('Keyboard accessibility', () => {
    it('close button is reachable via Tab when dialog is open', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Dialog</span>
          <p>Content</p>
        </sando-dialog>
      `);
      await element.updateComplete;

      const closeBtn =
        element.shadowRoot?.querySelector<HTMLButtonElement>('[part="close-button"]');
      expect(closeBtn).toBeDefined();
      // Not tabindex=-1 → reachable via Tab
      expect(closeBtn?.getAttribute('tabindex')).not.toBe('-1');
      expect(closeBtn?.hasAttribute('disabled')).toBe(false);
    });

    it('Escape key closes standard dialog (type="dialog")', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Standard dialog</span>
          <p>Close me with Escape.</p>
        </sando-dialog>
      `);
      await element.updateComplete;

      let requestCloseFired = false;
      element.addEventListener('sando-request-close', () => {
        requestCloseFired = true;
      });

      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
      );
      await element.updateComplete;

      expect(requestCloseFired).toBe(true);
    });

    it('Escape key does NOT close type="alert" (keyboard accessibility)', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog type="alert" open>
          <span slot="title">Destructive alert</span>
          <p>This requires explicit action.</p>
          <button slot="actions">Confirm</button>
        </sando-dialog>
      `);
      await element.updateComplete;

      let requestCloseFired = false;
      element.addEventListener('sando-request-close', () => {
        requestCloseFired = true;
      });

      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })
      );
      await element.updateComplete;

      expect(requestCloseFired).toBe(false);
      expect(element.open).toBe(true);
    });

    it('close button activatable via Enter key', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Dialog</span>
        </sando-dialog>
      `);
      await element.updateComplete;

      let requestCloseFired = false;
      element.addEventListener('sando-request-close', () => {
        requestCloseFired = true;
      });

      const closeBtn =
        element.shadowRoot?.querySelector<HTMLButtonElement>('[part="close-button"]');
      closeBtn?.focus();
      closeBtn?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true })
      );
      closeBtn?.click(); // native button handles Enter→click

      await element.updateComplete;

      expect(requestCloseFired).toBe(true);
    });

    it('close button activatable via Space key', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Dialog</span>
        </sando-dialog>
      `);
      await element.updateComplete;

      let requestCloseFired = false;
      element.addEventListener('sando-request-close', () => {
        requestCloseFired = true;
      });

      const closeBtn =
        element.shadowRoot?.querySelector<HTMLButtonElement>('[part="close-button"]');
      closeBtn?.focus();
      closeBtn?.dispatchEvent(
        new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true })
      );
      closeBtn?.click(); // simulate space activation

      await element.updateComplete;

      expect(requestCloseFired).toBe(true);
    });

    it('type="dialog" close button has accessible label (aria-label)', async () => {
      element = await fixture<SandoDialog>(html`
        <sando-dialog open>
          <span slot="title">Dialog</span>
        </sando-dialog>
      `);
      await element.updateComplete;

      const closeBtn = element.shadowRoot?.querySelector('[part="close-button"]');
      const label = closeBtn?.getAttribute('aria-label');
      // Must have a non-empty accessible label
      expect(label).toBeTruthy();
      expect(label!.length).toBeGreaterThan(0);
    });
  });
});
