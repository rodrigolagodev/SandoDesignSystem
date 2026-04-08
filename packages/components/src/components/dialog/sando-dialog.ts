/**
 * Sando Dialog Component
 *
 * Modal dialog (and alertdialog) with focus management, scroll locking,
 * backdrop, close button, and CSS animations. Implements WCAG 2.1 AA:
 * - role="dialog" / role="alertdialog" with aria-modal="true"
 * - aria-labelledby pointing to title element
 * - aria-describedby pointing to description element (when present)
 * - Focus trap using `inert` on sibling elements
 * - Focus restoration on close
 * - Keyboard dismissal (Escape)
 *
 * @element sando-dialog
 *
 * @slot - Main body content
 * @slot title - Dialog title text
 * @slot description - Subtitle/description below title
 * @slot actions - Footer action buttons
 *
 * @fires sando-open - When dialog starts opening
 * @fires sando-after-open - After entry animation completes
 * @fires sando-close - When dialog starts closing, detail: { source }
 * @fires sando-after-close - After exit animation completes, detail: { source }
 * @fires sando-request-close - Cancelable event before closing (user-initiated only), detail: { source }
 * @fires sando-confirm - When the built-in confirm button is clicked
 *
 * @csspart backdrop - The overlay behind the dialog
 * @csspart panel - The dialog surface container
 * @csspart header - Header zone
 * @csspart title - Title element
 * @csspart description - Description element
 * @csspart close-button - The × close button
 * @csspart body - Scrollable content area
 * @csspart footer - Footer/actions zone
 * @csspart cancel-button - The built-in cancel button
 * @csspart confirm-button - The built-in confirm button
 *
 * @example Basic dialog
 * ```html
 * <sando-dialog open>
 *   <span slot="title">Confirm action</span>
 *   <p>Are you sure you want to delete this item?</p>
 *   <sando-button slot="actions" variant="outline">Cancel</sando-button>
 *   <sando-button slot="actions">Delete</sando-button>
 * </sando-dialog>
 * ```
 *
 * @example Alert dialog (not dismissible)
 * ```html
 * <sando-dialog open type="alert">
 *   <span slot="title">Session expired</span>
 *   <p>Your session has expired. Please log in again.</p>
 *   <sando-button slot="actions">Log in</sando-button>
 * </sando-dialog>
 * ```
 *
 * @example Programmatic control
 * ```js
 * const dialog = document.querySelector('sando-dialog');
 * dialog.show();
 * dialog.hide();
 * ```
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import type {
  DialogType,
  DialogVariant,
  DialogSize,
  DialogButtonVariant,
  DialogButtonStatus,
  DialogCloseSource,
  DialogRequestCloseSource,
  SandoDialogProps,
  DialogCloseEventDetail,
  DialogAfterCloseEventDetail,
  DialogRequestCloseEventDetail
} from './sando-dialog.types.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, variantStyles } from './styles/index.js';
import '../icon/sando-icon.js';
import '../button/sando-button.js';

// ============================================================================
// Component
// ============================================================================

@customElement('sando-dialog')
export class SandoDialog extends FlavorableMixin(LitElement) implements SandoDialogProps {
  // ========================================
  // Static configuration
  // ========================================

  static styles = [
    resetStyles,
    tokenStyles,
    variantStyles, // variant vars must be declared BEFORE base uses them
    baseStyles
  ];

  // ========================================
  // Internal refs
  // ========================================

  @query('[part="panel"]')
  private _panelElement!: HTMLElement;

  @query('.dialog-popover')
  private _popoverElement?: HTMLElement;

  // ========================================
  // Internal state
  // ========================================

  /** Whether an exit animation is in progress */
  @state()
  private _isExiting = false;

  /** Tracks if the actions slot has any assigned content */
  @state()
  private _hasActions = false;

  /** Tracks if the description slot has any assigned content */
  @state()
  private _hasDescription = false;

  /** Element focused before dialog opened — restored on close */
  private _previouslyFocusedElement: HTMLElement | null = null;

  /** Sibling elements that received inert during open */
  private _inertedElements: Element[] = [];

  /** Close source stored during exit animation */
  private _pendingCloseSource: DialogCloseSource = 'api';

  // ========================================
  // Public API — Properties
  // ========================================

  /**
   * Controls dialog visibility
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * ARIA role: 'dialog' (dismissible) vs 'alert' (alertdialog, not dismissible)
   * @default 'dialog'
   */
  @property({ reflect: true })
  type: DialogType = 'dialog';

  /**
   * Width size variant
   * @default 'md'
   */
  @property({ reflect: true })
  size: DialogSize = 'md';

  /**
   * Surface variant: elevated (shadow) or outlined (border)
   * @default 'elevated'
   */
  @property({ reflect: true })
  variant: DialogVariant = 'elevated';

  /**
   * Hides header visually. Requires aria-label on the element for a11y.
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-header' })
  noHeader = false;

  /**
   * Whether Escape / backdrop click close the dialog.
   * Forced false when type="alert".
   * @default true
   */
  @property({ type: Boolean, reflect: true })
  dismissible = true;

  // ----------------------------------------
  // Action button props
  // ----------------------------------------

  /**
   * Label for the built-in confirm button
   * @default 'Confirm'
   */
  @property({ attribute: 'confirm-label' })
  confirmLabel = 'Confirm';

  /**
   * Variant for the built-in confirm button
   * @default 'solid'
   */
  @property({ attribute: 'confirm-variant' })
  confirmVariant: DialogButtonVariant = 'solid';

  /**
   * Status for the built-in confirm button
   * @default 'default'
   */
  @property({ attribute: 'confirm-status' })
  confirmStatus: DialogButtonStatus = 'default';

  /**
   * Whether to show the built-in confirm button
   * @default true
   */
  @property({ type: Boolean, attribute: 'show-confirm' })
  showConfirm = true;

  /**
   * Label for the built-in cancel button
   * @default 'Cancel'
   */
  @property({ attribute: 'cancel-label' })
  cancelLabel = 'Cancel';

  /**
   * Variant for the built-in cancel button
   * @default 'outline'
   */
  @property({ attribute: 'cancel-variant' })
  cancelVariant: DialogButtonVariant = 'outline';

  /**
   * Status for the built-in cancel button
   * @default 'default'
   */
  @property({ attribute: 'cancel-status' })
  cancelStatus: DialogButtonStatus = 'default';

  /**
   * Whether to show the built-in cancel button
   * @default true
   */
  @property({ type: Boolean, attribute: 'show-cancel' })
  showCancel = true;

  // ========================================
  // Computed helpers
  // ========================================

  /** Effective dismissible: false when type="alert" unless explicitly set */
  private get _effectiveDismissible(): boolean {
    return this.type !== 'alert' && this.dismissible;
  }

  /** Whether the close button should be rendered */
  private get _showCloseButton(): boolean {
    return this._effectiveDismissible;
  }

  /** Whether the browser supports the Popover API */
  private get _supportsPopover(): boolean {
    return 'popover' in HTMLElement.prototype;
  }

  // ========================================
  // Lifecycle
  // ========================================

  connectedCallback(): void {
    super.connectedCallback();
    // If rendered with open=true from the start
    if (this.open) {
      this.updateComplete.then(() => this._handleOpenChange(true));
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleDocumentKeydown);
    this._releaseBodyScroll();
    this._removeInert();
  }

  protected updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      const wasOpen = changedProperties.get('open') as boolean | undefined;
      if (wasOpen !== undefined) {
        this._handleOpenChange(this.open);
      }
    }

    // Validate a11y: noHeader without aria-label
    if (changedProperties.has('noHeader') && this.noHeader) {
      if (!this.getAttribute('aria-label')) {
        console.warn(
          '[sando-dialog] `no-header` is set but no `aria-label` was found on the element. ' +
            'Screen readers will have no accessible name for this dialog. ' +
            'Add aria-label="Dialog purpose" to the <sando-dialog> element.'
        );
      }
    }
  }

  // ========================================
  // Open/close state management
  // ========================================

  private _handleOpenChange(isOpen: boolean): void {
    if (isOpen) {
      this._openDialog();
    } else if (!this._isExiting) {
      // open=false set externally (API), no animation cleanup needed as
      // _closeWithAnimation already handles the exiting case.
      // But if closed without going through _closeWithAnimation (e.g., direct prop set),
      // we still need to clean up.
      this._cleanupAfterClose(this._pendingCloseSource);
    }
  }

  private _openDialog(): void {
    // Capture previously focused element
    this._previouslyFocusedElement = document.activeElement as HTMLElement;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Register keydown
    document.addEventListener('keydown', this._handleDocumentKeydown);

    // Apply inert to siblings
    this._applyInert();

    // Emit open event
    this._emit('sando-open', {});

    // Wait for render, then manage focus and emit after-open
    this.updateComplete.then(() => {
      // Show via Popover API if supported (enters top layer)
      if (this._supportsPopover && this._popoverElement) {
        try {
          this._popoverElement.showPopover();
        } catch {
          // Fallback: already visible via :host([open]) CSS
        }
      }

      this._manageFocusOnOpen();

      // Listen for panel animation end to emit after-open
      const panel = this._panelElement;
      if (panel) {
        const onAnimEnd = () => {
          panel.removeEventListener('animationend', onAnimEnd);
          this._emit('sando-after-open', {});
        };
        panel.addEventListener('animationend', onAnimEnd);
      } else {
        this._emit('sando-after-open', {});
      }
    });
  }

  private _closeWithAnimation(source: DialogCloseSource): void {
    if (!this.open || this._isExiting) return;

    this._isExiting = true;
    this._pendingCloseSource = source;

    // Emit sando-close immediately (before animation)
    this._emit<DialogCloseEventDetail>('sando-close', { source });

    // Trigger exit animations via attribute
    this.setAttribute('data-exiting', '');

    // Listen for animation end on panel
    this.updateComplete.then(() => {
      const panel = this._panelElement;
      if (panel) {
        const onAnimEnd = () => {
          panel.removeEventListener('animationend', onAnimEnd);
          this._finishClose(source);
        };
        panel.addEventListener('animationend', onAnimEnd);
      } else {
        this._finishClose(source);
      }
    });
  }

  private _finishClose(source: DialogCloseSource): void {
    this.removeAttribute('data-exiting');
    this._isExiting = false;
    this.open = false; // triggers updated() → _handleOpenChange(false)

    // Hide via Popover API if supported — called AFTER animation finishes
    if (this._supportsPopover && this._popoverElement) {
      try {
        this._popoverElement.hidePopover();
      } catch {
        // Already hidden or not supported
      }
    }

    this._cleanupAfterClose(source);
  }

  private _cleanupAfterClose(source: DialogCloseSource): void {
    // Release body scroll
    this._releaseBodyScroll();

    // Remove keydown listener
    document.removeEventListener('keydown', this._handleDocumentKeydown);

    // Remove inert from siblings
    this._removeInert();

    // Restore focus
    if (
      this._previouslyFocusedElement &&
      typeof this._previouslyFocusedElement.focus === 'function'
    ) {
      try {
        this._previouslyFocusedElement.focus();
      } catch {
        // Element may no longer be in DOM
      }
    }
    this._previouslyFocusedElement = null;

    // Emit after-close
    this._emit<DialogAfterCloseEventDetail>('sando-after-close', { source });
  }

  // ========================================
  // Body scroll lock
  // ========================================

  private _releaseBodyScroll(): void {
    document.body.style.overflow = '';
  }

  // ========================================
  // Focus management
  // ========================================

  private _manageFocusOnOpen(): void {
    const panel = this._panelElement;
    if (!panel) return;

    // Look for [autofocus] element inside the shadow root or slotted content
    const autofocusEl =
      (this.shadowRoot?.querySelector('[autofocus]') as HTMLElement | null) ??
      (this.querySelector('[autofocus]') as HTMLElement | null);

    if (autofocusEl) {
      autofocusEl.focus();
    } else {
      panel.focus();
    }
  }

  // ========================================
  // Inert siblings (focus trap)
  // ========================================

  private _applyInert(): void {
    const parent = this.parentElement;
    if (!parent) return;

    this._inertedElements = [];

    Array.from(parent.children).forEach((sibling) => {
      if (sibling === this) return;
      if (!(sibling as HTMLElement).inert) {
        (sibling as HTMLElement).inert = true;
        this._inertedElements.push(sibling);
      }
    });
  }

  private _removeInert(): void {
    this._inertedElements.forEach((el) => {
      (el as HTMLElement).inert = false;
    });
    this._inertedElements = [];
  }

  // ========================================
  // Keyboard handling
  // ========================================

  private _handleDocumentKeydown = (e: KeyboardEvent): void => {
    if (!this.open || this._isExiting) return;

    if (e.key === 'Escape') {
      if (this._effectiveDismissible) {
        e.preventDefault();
        e.stopPropagation();
        this._requestClose('escape');
      }
    }
  };

  // ========================================
  // Dismiss logic
  // ========================================

  /**
   * Fire cancelable sando-request-close and close if not prevented.
   * Only called for user-initiated closes (escape, backdrop, close-button).
   */
  private _requestClose(source: DialogRequestCloseSource): void {
    const event = new CustomEvent<DialogRequestCloseEventDetail>('sando-request-close', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: { source }
    });

    const notCanceled = this.dispatchEvent(event);
    if (notCanceled) {
      this._closeWithAnimation(source);
    }
  }

  // ========================================
  // Event handlers
  // ========================================

  private _handleBackdropClick = (): void => {
    if (!this._effectiveDismissible) return;
    this._requestClose('backdrop');
  };

  private _handleCloseButtonClick = (): void => {
    this._requestClose('close-button');
  };

  private _handleCancelButtonClick = (): void => {
    this._requestClose('cancel-button');
  };

  private _handleConfirmButtonClick = (): void => {
    this._emit('sando-confirm', {});
  };

  // ========================================
  // Slot change handlers
  // ========================================

  private _handleActionsSlotChange = (e: Event): void => {
    const slot = e.target as HTMLSlotElement;
    this._hasActions = slot.assignedNodes({ flatten: true }).length > 0;
  };

  private _handleDescriptionSlotChange = (e: Event): void => {
    const slot = e.target as HTMLSlotElement;
    this._hasDescription = slot.assignedNodes({ flatten: true }).length > 0;
  };

  // ========================================
  // Events
  // ========================================

  private _emit<T extends object>(name: string, detail: T): void {
    this.dispatchEvent(
      new CustomEvent<T>(name, {
        bubbles: true,
        composed: true,
        detail
      })
    );
  }

  // ========================================
  // Public API
  // ========================================

  /**
   * Opens the dialog
   */
  show(): void {
    if (this.open) return;
    this.open = true;
  }

  /**
   * Closes the dialog programmatically (source: 'api')
   */
  hide(): void {
    if (!this.open) return;
    this._closeWithAnimation('api');
  }

  // ========================================
  // Render helpers
  // ========================================

  private _renderHeader() {
    return html`
      <div part="header">
        <div class="dialog-title-group">
          <div part="title" id="dialog-title">
            <slot name="title"></slot>
          </div>
          <div part="description" id="dialog-desc">
            <slot name="description" @slotchange=${this._handleDescriptionSlotChange}></slot>
          </div>
        </div>
      </div>
    `;
  }

  private _renderFooter() {
    const hasBuiltInButtons = this.showConfirm || this.showCancel;
    const isVisible = hasBuiltInButtons || this._hasActions;
    const footerClass = isVisible
      ? hasBuiltInButtons
        ? ''
        : 'footer--slot-only'
      : 'footer-hidden';
    const visibleButtonCount = (this.showCancel ? 1 : 0) + (this.showConfirm ? 1 : 0);
    const singleButton = visibleButtonCount === 1;
    const builtInClass = hasBuiltInButtons && singleButton ? 'footer--single' : '';
    return html`
      <div part="footer" class=${[footerClass, builtInClass].filter(Boolean).join(' ') || nothing}>
        ${hasBuiltInButtons
          ? html`
              ${this.showCancel
                ? html`
                    <sando-button
                      part="cancel-button"
                      variant=${this.cancelVariant}
                      status=${this.cancelStatus}
                      size="md"
                      @click=${this._handleCancelButtonClick}
                      >${this.cancelLabel}</sando-button
                    >
                  `
                : nothing}
              ${this.showConfirm
                ? html`
                    <sando-button
                      part="confirm-button"
                      variant=${this.confirmVariant}
                      status=${this.confirmStatus}
                      size="md"
                      @click=${this._handleConfirmButtonClick}
                      >${this.confirmLabel}</sando-button
                    >
                  `
                : nothing}
            `
          : nothing}
        <slot name="actions" @slotchange=${this._handleActionsSlotChange}></slot>
      </div>
    `;
  }

  // ========================================
  // Render
  // ========================================

  render() {
    const role = this.type === 'alert' ? 'alertdialog' : 'dialog';
    const ariaDescribedBy = this._hasDescription ? 'dialog-desc' : nothing;

    return html`
      <div class="dialog-popover" popover=${this._supportsPopover ? 'manual' : nothing}>
        <div part="backdrop" @click=${this._handleBackdropClick}></div>

        <div
          part="panel"
          role=${role}
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby=${ariaDescribedBy}
          tabindex="-1"
        >
          ${this._renderHeader()}
          ${this._showCloseButton
            ? html`
                <button
                  type="button"
                  part="close-button"
                  aria-label="Close dialog"
                  @click=${this._handleCloseButtonClick}
                >
                  <sando-icon
                    name="x"
                    decorative
                    inherit-color
                    custom-size="var(--sando-dialog-closeButton-iconSize)"
                  ></sando-icon>
                </button>
              `
            : nothing}

          <div part="body">
            <slot></slot>
          </div>

          ${this._renderFooter()}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-dialog': SandoDialog;
  }
}
