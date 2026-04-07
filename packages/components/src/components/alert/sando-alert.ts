/**
 * Sando Alert Component
 *
 * Inline alert component for displaying informational, success, warning, or
 * destructive messages. Supports solid and outline appearances, optional title,
 * dismissible close button, icon slot override, and action slot.
 *
 * Implements WCAG 2.1 AA:
 * - role="status" with aria-live="polite" by default
 * - role="alert" with aria-live="assertive" for urgent messages
 * - Keyboard dismissal via Escape key
 * - Close button with descriptive aria-label
 *
 * @element sando-alert
 *
 * @slot - Main content / description (required)
 * @slot icon - Override the automatic status icon
 * @slot actions - Buttons or action links
 *
 * @fires sando-dismiss - When the alert is dismissed
 * @fires sando-open-change - When the open state changes
 *
 * @cssprop --sando-alert-paddingBlock - Block padding
 * @cssprop --sando-alert-paddingInline - Inline padding
 * @cssprop --sando-alert-borderRadius - Border radius
 * @cssprop --sando-alert-borderWidth - Border width
 * @cssprop --sando-alert-iconSize - Status icon size
 * @cssprop --sando-alert-gap - Gap between sections
 * @cssprop --sando-alert-titleFontSize - Title font size
 * @cssprop --sando-alert-titleFontWeight - Title font weight
 * @cssprop --sando-alert-textFontSize - Body text font size
 * @cssprop --sando-alert-textFontWeight - Body text font weight
 * @cssprop --sando-alert-lineHeight - Line height
 * @cssprop --sando-alert-transition-duration - Animation duration
 * @cssprop --sando-alert-transition-timing - Animation timing function
 *
 * @example Basic info alert
 * ```html
 * <sando-alert open>
 *   Your changes have been saved.
 * </sando-alert>
 * ```
 *
 * @example Success with title
 * ```html
 * <sando-alert status="success" title="Payment confirmed" open>
 *   Your transaction was processed successfully.
 * </sando-alert>
 * ```
 *
 * @example Dismissible destructive alert
 * ```html
 * <sando-alert status="destructive" dismissible open>
 *   Failed to delete the record. Please try again.
 * </sando-alert>
 * ```
 *
 * @example Solid appearance with actions
 * ```html
 * <sando-alert status="warning" appearance="solid" title="Session expiring" open>
 *   Your session will expire in 5 minutes.
 *   <sando-button slot="actions" size="sm">Extend session</sando-button>
 * </sando-alert>
 * ```
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import type {
  AlertStatus,
  AlertAppearance,
  AlertRole,
  SandoAlertProps,
  AlertDismissEventDetail,
  AlertOpenChangeEventDetail
} from './sando-alert.types.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, variantStyles } from './styles/index.js';
import '../icon/index.js';

// ============================================================================
// Component
// ============================================================================

@customElement('sando-alert')
export class SandoAlert extends FlavorableMixin(LitElement) implements SandoAlertProps {
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

  @query('.alert-container')
  private _containerElement!: HTMLElement;

  // ========================================
  // Internal state
  // ========================================

  /** Whether an exit animation is in progress */
  @state()
  private _isExiting = false;

  /** Tracks if the actions slot has any assigned content */
  @state()
  private _hasActions = false;

  // ========================================
  // Public API — Properties
  // ========================================

  /**
   * Semantic status variant — controls icon, colors, and ARIA meaning
   * @default 'info'
   */
  @property({ reflect: true })
  status: AlertStatus = 'info';

  /**
   * Visual appearance variant
   * @default 'outline'
   */
  @property({ reflect: true })
  appearance: AlertAppearance = 'outline';

  /**
   * Optional title displayed above the description
   * @default ''
   */
  @property({ type: String })
  title = '';

  /**
   * Whether the dismiss (close) button is visible
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  dismissible = false;

  /**
   * Whether the alert is visible
   * @default true
   */
  @property({ type: Boolean, reflect: true })
  open = true;

  /**
   * Hide the automatic status icon
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-icon' })
  hideIcon = false;

  /**
   * ARIA live region role
   * @default 'status'
   */
  @property({ reflect: true })
  role: AlertRole = 'status';

  // ========================================
  // Lifecycle
  // ========================================

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this._handleDocumentKeydown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleDocumentKeydown);
  }

  protected updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      const wasOpen = changedProperties.get('open') as boolean | undefined;
      // Only emit open-change when the value actually transitioned
      if (wasOpen !== undefined) {
        this._emitOpenChange();
      }
    }
  }

  // ========================================
  // Keyboard — document-level Escape
  // ========================================

  private _handleDocumentKeydown = (e: KeyboardEvent): void => {
    if (this.open && this.dismissible && e.key === 'Escape') {
      e.stopPropagation();
      this._dismiss('close-button');
    }
  };

  // ========================================
  // Actions slot detection
  // ========================================

  private _handleActionsSlotChange = (e: Event): void => {
    const slot = e.target as HTMLSlotElement;
    this._hasActions = slot.assignedNodes({ flatten: true }).length > 0;
  };

  // ========================================
  // Dismiss logic
  // ========================================

  /**
   * Dismiss the alert with an optional exit animation.
   * @param source - what triggered the dismissal
   */
  private _dismiss(source: AlertDismissEventDetail['source']): void {
    if (!this.open || this._isExiting) return;

    this._isExiting = true;

    // Let the exit animation complete before actually hiding
    const container = this._containerElement;
    if (container) {
      const onAnimationEnd = () => {
        container.removeEventListener('animationend', onAnimationEnd);
        this._isExiting = false;
        this.open = false;
        this._emitDismiss(source);
        // open change is emitted by updated() reaction
      };
      container.addEventListener('animationend', onAnimationEnd);
    } else {
      // No container yet (shouldn't happen, but guard)
      this._isExiting = false;
      this.open = false;
      this._emitDismiss(source);
    }
  }

  // ========================================
  // Events
  // ========================================

  private _emitDismiss(source: AlertDismissEventDetail['source']): void {
    this.dispatchEvent(
      new CustomEvent<AlertDismissEventDetail>('sando-dismiss', {
        bubbles: true,
        composed: true,
        detail: { source }
      })
    );
  }

  private _emitOpenChange(): void {
    this.dispatchEvent(
      new CustomEvent<AlertOpenChangeEventDetail>('sando-open-change', {
        bubbles: true,
        composed: true,
        detail: { open: this.open }
      })
    );
  }

  // ========================================
  // Public API
  // ========================================

  /**
   * Programmatically dismiss the alert
   */
  dismiss(): void {
    this._dismiss('programmatic');
  }

  /**
   * Show the alert (set open = true)
   */
  show(): void {
    if (this.open) return;
    this.open = true;
  }

  // ========================================
  // Render helpers
  // ========================================

  private _getStatusIconName(): string {
    const iconMap: Record<string, string> = {
      info: 'info',
      success: 'circle-check',
      warning: 'triangle-alert',
      destructive: 'circle-x'
    };
    return iconMap[this.status] ?? 'info';
  }

  private _renderIcon() {
    if (this.hideIcon) return nothing;

    return html`
      <div class="alert-icon-wrapper" aria-hidden="true">
        <slot name="icon">
          <sando-icon
            name=${this._getStatusIconName()}
            inherit-color
            decorative
            custom-size="var(--sando-alert-iconSize)"
          ></sando-icon>
        </slot>
      </div>
    `;
  }

  private _renderCloseButton() {
    if (!this.dismissible) return nothing;

    return html`
      <button
        type="button"
        class="alert-close"
        part="close-button"
        aria-label="Dismiss alert"
        @click=${() => this._dismiss('close-button')}
      >
        <sando-icon
          name="x"
          inherit-color
          decorative
          custom-size="var(--sando-alert-iconSize)"
        ></sando-icon>
      </button>
    `;
  }

  // ========================================
  // Render
  // ========================================

  render() {
    const ariaLive =
      this.role === 'alert' ? 'assertive' : this.role === 'status' ? 'polite' : nothing;

    const containerRole = this.role === 'none' ? nothing : this.role;

    return html`
      <div
        class="alert-container ${this._isExiting ? 'is-exiting' : ''}"
        part="container"
        role=${containerRole}
        aria-live=${ariaLive}
        aria-atomic="true"
      >
        ${this._renderIcon()}

        <div class="alert-content" part="content">
          ${this.title
            ? html`<strong class="alert-title" part="title">${this.title}</strong>`
            : nothing}
          <div class="alert-description" part="description">
            <slot></slot>
          </div>
          ${this._hasActions
            ? html`<div class="alert-actions" part="actions">
                <slot name="actions" @slotchange=${this._handleActionsSlotChange}></slot>
              </div>`
            : html`<slot
                name="actions"
                style="display:none"
                @slotchange=${this._handleActionsSlotChange}
              ></slot>`}
        </div>

        ${this._renderCloseButton()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-alert': SandoAlert;
  }
}
