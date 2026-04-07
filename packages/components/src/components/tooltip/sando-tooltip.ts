/**
 * Sando Tooltip Component
 *
 * A simple, non-interactive tooltip that shows descriptive text on hover and focus.
 * Implements WCAG 1.4.13 (Content on Hover or Focus) — tooltip remains visible
 * when the user moves the pointer from the trigger into the tooltip bubble.
 *
 * @element sando-tooltip
 *
 * @slot - The trigger element — any interactive element
 *
 * @fires sando-show - When tooltip becomes visible
 * @fires sando-hide - When tooltip hides
 *
 * @cssprop --sando-tooltip-backgroundColor - Tooltip background color
 * @cssprop --sando-tooltip-textColor - Tooltip text color
 * @cssprop --sando-tooltip-borderRadius - Tooltip border radius
 * @cssprop --sando-tooltip-paddingBlock - Tooltip block padding
 * @cssprop --sando-tooltip-paddingInline - Tooltip inline padding
 * @cssprop --sando-tooltip-maxWidth - Tooltip maximum width
 * @cssprop --sando-tooltip-boxShadow - Tooltip box shadow
 * @cssprop --sando-tooltip-fontSize - Tooltip font size
 * @cssprop --sando-tooltip-fontWeight - Tooltip font weight
 * @cssprop --sando-tooltip-lineHeight - Tooltip line height
 * @cssprop --sando-tooltip-arrow-size - Arrow triangle size
 * @cssprop --sando-tooltip-transition-duration - Transition duration
 * @cssprop --sando-tooltip-transition-timing - Transition timing function
 * @cssprop --sando-tooltip-zIndex - Tooltip z-index
 *
 * @example Basic usage
 * ```html
 * <sando-tooltip content="More information">
 *   <sando-button>Hover me</sando-button>
 * </sando-tooltip>
 * ```
 *
 * @example Custom placement
 * ```html
 * <sando-tooltip content="Opens to the right" placement="right">
 *   <sando-button>Right</sando-button>
 * </sando-tooltip>
 * ```
 *
 * @example Controlled (open by default)
 * ```html
 * <sando-tooltip content="Always visible" open>
 *   <sando-button>Trigger</sando-button>
 * </sando-tooltip>
 * ```
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import type { TooltipPlacement, SandoTooltipProps } from './sando-tooltip.types.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, placementStyles } from './styles/index.js';

@customElement('sando-tooltip')
export class SandoTooltip extends FlavorableMixin(LitElement) implements SandoTooltipProps {
  // ========================================
  // Static configuration
  // ========================================

  /**
   * Shadow DOM focus delegation — required per KEYBOARD_NAVIGATION.toon (KN-CR-R5)
   */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };

  /**
   * Component styles — modular CSS imports, order matters for specificity
   */
  static styles = [
    resetStyles, // Universal CSS reset (box-sizing, font inheritance, reduced motion)
    tokenStyles, // Design tokens (Ingredients, Flavors, Recipes)
    baseStyles, // Host, bubble, transitions, arrow base
    placementStyles // Per-placement animation offsets and arrow directions
  ];

  // ========================================
  // Internal references
  // ========================================

  @query('.tooltip-bubble')
  private _bubbleElement!: HTMLElement;

  /**
   * Reference to the currently wired trigger element (slotted light DOM)
   * @private
   */
  private _triggerElement: HTMLElement | null = null;

  // ========================================
  // Internal state
  // ========================================

  /**
   * Unique id for aria-describedby association
   * @private
   */
  @state()
  private _tooltipId = `sando-tooltip-${Math.random().toString(36).substring(2, 11)}`;

  /**
   * Tracks whether the pointer is over the trigger element
   * @private
   */
  @state()
  private _isOverTrigger = false;

  /**
   * Tracks whether the pointer is over the tooltip bubble
   * @private
   */
  @state()
  private _isOverTooltip = false;

  /**
   * Whether Popover API is available in this browser
   * @private
   */
  private get _supportsPopover(): boolean {
    return 'popover' in HTMLElement.prototype;
  }

  /**
   * Show delay timer handle
   * @private
   */
  private _showTimer: ReturnType<typeof setTimeout> | null = null;

  /**
   * Timestamp of last hide — used for skip-delay logic
   * @private
   */
  private _lastHideTime = 0;

  /**
   * Bound handler for scroll/resize repositioning
   * @private
   */
  private _handleScrollOrResize = (): void => {
    if (this.open) {
      this._positionTooltip();
    }
  };

  /**
   * Bound handler for Escape key (global while tooltip is open)
   * @private
   */
  private _handleDocumentKeydown = (e: KeyboardEvent): void => {
    if (this.open && e.key === 'Escape') {
      e.stopPropagation();
      this.hide();
    }
  };

  // ========================================
  // Public API — Properties
  // ========================================

  /**
   * Tooltip text content
   * @default ''
   */
  @property({ reflect: true })
  content = '';

  /**
   * Preferred placement relative to the trigger
   * @default 'top'
   */
  @property({ reflect: true })
  placement: TooltipPlacement = 'top';

  /**
   * Whether the tooltip is visible (also supports controlled mode)
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Gap in px between the trigger and the tooltip bubble
   * @default 8
   */
  @property({ type: Number, reflect: true })
  distance = 8;

  /**
   * Delay in ms before showing on hover
   * @default 500
   */
  @property({ type: Number, reflect: true })
  delay = 500;

  /**
   * After a tooltip closes, if another opens within this ms, skip the delay.
   * @default 300
   */
  @property({ type: Number, reflect: true, attribute: 'skip-delay-duration' })
  skipDelayDuration = 300;

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
    this._clearShowTimer();
    this._removePositionListeners();
    // Clean up aria-describedby from slotted element
    this._removeAriaDescribedBy();
    // Remove event listeners from slotted trigger
    this._removeTriggerListeners();
  }

  protected firstUpdated(): void {
    // slotchange may fire before or after firstUpdated — manually wire to be safe
    this._handleSlotChange();
  }

  protected updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      if (this.open) {
        this._onTooltipOpen();
        // Handle popover + positioning for externally-set open state
        if (this._bubbleElement) {
          if (this._supportsPopover) {
            try {
              // showPopover() throws if already open — safe to ignore
              this._bubbleElement.showPopover();
            } catch {
              // already open or not supported — ignore
            }
          } else {
            this._bubbleElement.classList.add('is-open');
          }
          requestAnimationFrame(() => {
            this._positionTooltip();
          });
        }
      } else {
        this._onTooltipClose();
        // Handle popover + class cleanup for externally-set close state
        if (this._bubbleElement) {
          if (this._supportsPopover) {
            try {
              this._bubbleElement.hidePopover();
            } catch {
              // already closed — ignore
            }
          }
          this._bubbleElement.classList.remove('is-open');
        }
      }
    }
  }

  // ========================================
  // Slot change — wire listeners + aria-describedby
  // ========================================

  /**
   * Called on slotchange. Wires mouse/focus listeners directly on the slotted
   * trigger element (light DOM). Listening on a shadow DOM wrapper does NOT work
   * because `mouseenter` / `focus` don't bubble across shadow boundaries.
   * @private
   */
  private _handleSlotChange = (): void => {
    // Unwire previous trigger first
    this._removeTriggerListeners();

    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
    const assigned = slot?.assignedElements({ flatten: true }) ?? [];
    const trigger = assigned[0] as HTMLElement | undefined;

    if (trigger) {
      this._triggerElement = trigger;
      trigger.addEventListener('mouseenter', this._handleTriggerMouseEnter);
      trigger.addEventListener('mouseleave', this._handleTriggerMouseLeave);
      // `focus` / `blur` without capture — sando-button retargets its internal
      // focus event onto itself, so listening directly on it (no capture needed).
      trigger.addEventListener('focus', this._handleTriggerFocus);
      trigger.addEventListener('blur', this._handleTriggerBlur);
    }

    this._applyAriaDescribedBy();
  };

  /**
   * Remove all event listeners from the current trigger element and clear the ref.
   * @private
   */
  private _removeTriggerListeners(): void {
    if (!this._triggerElement) return;
    this._triggerElement.removeEventListener('mouseenter', this._handleTriggerMouseEnter);
    this._triggerElement.removeEventListener('mouseleave', this._handleTriggerMouseLeave);
    this._triggerElement.removeEventListener('focus', this._handleTriggerFocus);
    this._triggerElement.removeEventListener('blur', this._handleTriggerBlur);
    this._triggerElement = null;
  }

  /**
   * Apply aria-describedby to the first slotted element
   * @private
   */
  private _applyAriaDescribedBy(): void {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
    if (!slot) return;

    const assigned = slot.assignedElements({ flatten: true });
    assigned.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.setAttribute('aria-describedby', this._tooltipId);
      }
    });
  }

  /**
   * Remove aria-describedby from slotted elements on disconnect
   * @private
   */
  private _removeAriaDescribedBy(): void {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
    if (!slot) return;

    const assigned = slot.assignedElements({ flatten: true });
    assigned.forEach((el) => {
      if (el instanceof HTMLElement) {
        const existing = el.getAttribute('aria-describedby');
        if (existing === this._tooltipId) {
          el.removeAttribute('aria-describedby');
        }
      }
    });
  }

  // ========================================
  // Open / Close lifecycle hooks
  // ========================================

  /**
   * Called when tooltip opens — setup position listeners, emit event
   * @private
   */
  private _onTooltipOpen(): void {
    this._setupPositionListeners();

    this.dispatchEvent(
      new CustomEvent('sando-show', {
        bubbles: true,
        composed: true,
        detail: {}
      })
    );
  }

  /**
   * Called when tooltip closes — cleanup, record hide time, emit event
   * @private
   */
  private _onTooltipClose(): void {
    this._removePositionListeners();
    this._lastHideTime = Date.now();

    this.dispatchEvent(
      new CustomEvent('sando-hide', {
        bubbles: true,
        composed: true,
        detail: {}
      })
    );
  }

  // ========================================
  // Delay logic
  // ========================================

  /**
   * Show the tooltip after the configured delay (or immediately if skip-delay applies)
   * @private
   */
  private _showWithDelay(): void {
    this._clearShowTimer();
    const timeSinceLastHide = Date.now() - this._lastHideTime;
    const shouldSkipDelay = timeSinceLastHide < this.skipDelayDuration;
    const effectiveDelay = shouldSkipDelay ? 0 : this.delay;

    this._showTimer = setTimeout(() => {
      this.show();
    }, effectiveDelay);
  }

  /**
   * Conditionally hide — only hides when pointer is over neither trigger nor bubble
   * @private
   */
  private _maybeHide(): void {
    if (!this._isOverTrigger && !this._isOverTooltip) {
      this._clearShowTimer();
      this.hide();
    }
  }

  /**
   * Clear pending show timer
   * @private
   */
  private _clearShowTimer(): void {
    if (this._showTimer !== null) {
      clearTimeout(this._showTimer);
      this._showTimer = null;
    }
  }

  // ========================================
  // Trigger event handlers
  // ========================================

  private _handleTriggerMouseEnter = (): void => {
    this._isOverTrigger = true;
    this._showWithDelay();
  };

  private _handleTriggerMouseLeave = (): void => {
    this._isOverTrigger = false;
    // Use a microtask delay to allow mouseenter on bubble to fire first
    setTimeout(() => this._maybeHide(), 50);
  };

  private _handleTriggerFocus = (): void => {
    this.show();
  };

  private _handleTriggerBlur = (): void => {
    this._clearShowTimer();
    this.hide();
  };

  // ========================================
  // Bubble event handlers (WCAG 1.4.13)
  // ========================================

  private _handleBubbleMouseEnter = (): void => {
    this._isOverTooltip = true;
  };

  private _handleBubbleMouseLeave = (): void => {
    this._isOverTooltip = false;
    setTimeout(() => this._maybeHide(), 50);
  };

  // ========================================
  // Positioning (Popover API)
  // ========================================

  /**
   * Calculate and apply fixed coordinates for the tooltip bubble.
   * Uses getBoundingClientRect() — same approach as sando-select _positionDropdown().
   * @private
   */
  private _positionTooltip(): void {
    const bubble = this._bubbleElement;
    if (!bubble) return;

    // Get the slotted trigger element from light DOM
    const slotEl = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
    const triggerEl = slotEl?.assignedElements({ flatten: true })[0] as HTMLElement | undefined;

    if (!triggerEl) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    const bubbleRect = bubble.getBoundingClientRect();
    const distance = this.distance;
    const vp = { w: window.innerWidth, h: window.innerHeight };
    const viewportPadding = 8;

    let effectivePlacement = this.placement;

    // Auto-flip logic
    const fits = {
      top: triggerRect.top - bubbleRect.height - distance >= viewportPadding,
      bottom: triggerRect.bottom + bubbleRect.height + distance <= vp.h - viewportPadding,
      left: triggerRect.left - bubbleRect.width - distance >= viewportPadding,
      right: triggerRect.right + bubbleRect.width + distance <= vp.w - viewportPadding
    };

    const opposite: Record<TooltipPlacement, TooltipPlacement> = {
      top: 'bottom',
      'top-start': 'bottom-start',
      'top-end': 'bottom-end',
      bottom: 'top',
      'bottom-start': 'top-start',
      'bottom-end': 'top-end',
      left: 'right',
      right: 'left'
    };

    // For corner placements, check the base direction (top/bottom)
    const baseDir = (p: TooltipPlacement): keyof typeof fits => {
      if (p.startsWith('top')) return 'top';
      if (p.startsWith('bottom')) return 'bottom';
      return p as keyof typeof fits;
    };

    if (!fits[baseDir(effectivePlacement)]) {
      const flipped = opposite[effectivePlacement];
      if (fits[baseDir(flipped)]) {
        effectivePlacement = flipped;
      }
    }

    let top: number;
    let left: number;

    switch (effectivePlacement) {
      case 'top':
        top = triggerRect.top - bubbleRect.height - distance;
        left = triggerRect.left + triggerRect.width / 2 - bubbleRect.width / 2;
        break;
      case 'top-start': {
        const center = triggerRect.left + triggerRect.width / 2;
        top = triggerRect.top - bubbleRect.height - distance;
        left = center - bubbleRect.width; // bubble ends at trigger center
        break;
      }
      case 'top-end': {
        const center = triggerRect.left + triggerRect.width / 2;
        top = triggerRect.top - bubbleRect.height - distance;
        left = center; // bubble starts at trigger center
        break;
      }
      case 'bottom':
        top = triggerRect.bottom + distance;
        left = triggerRect.left + triggerRect.width / 2 - bubbleRect.width / 2;
        break;
      case 'bottom-start': {
        const center = triggerRect.left + triggerRect.width / 2;
        top = triggerRect.bottom + distance;
        left = center - bubbleRect.width; // bubble ends at trigger center
        break;
      }
      case 'bottom-end': {
        const center = triggerRect.left + triggerRect.width / 2;
        top = triggerRect.bottom + distance;
        left = center; // bubble starts at trigger center
        break;
      }
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - bubbleRect.height / 2;
        left = triggerRect.right + distance;
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - bubbleRect.height / 2;
        left = triggerRect.left - bubbleRect.width - distance;
        break;
      default:
        top = triggerRect.top - bubbleRect.height - distance;
        left = triggerRect.left + triggerRect.width / 2 - bubbleRect.width / 2;
    }

    // Clamp to viewport
    left = Math.max(viewportPadding, Math.min(left, vp.w - bubbleRect.width - viewportPadding));
    top = Math.max(viewportPadding, Math.min(top, vp.h - bubbleRect.height - viewportPadding));

    Object.assign(bubble.style, {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`
    });

    // Reflect effective placement so CSS arrows render correctly
    if (effectivePlacement !== this.placement) {
      this.placement = effectivePlacement;
    }
  }

  /**
   * Setup scroll/resize listeners for re-positioning
   * @private
   */
  private _setupPositionListeners(): void {
    window.addEventListener('scroll', this._handleScrollOrResize, { passive: true, capture: true });
    window.addEventListener('resize', this._handleScrollOrResize, { passive: true });
  }

  /**
   * Remove scroll/resize listeners
   * @private
   */
  private _removePositionListeners(): void {
    window.removeEventListener('scroll', this._handleScrollOrResize, { capture: true });
    window.removeEventListener('resize', this._handleScrollOrResize);
  }

  // ========================================
  // Public API
  // ========================================

  /**
   * Show the tooltip immediately (no delay)
   */
  show(): void {
    if (this.open) return;
    this.open = true;
    // updated() handles showPopover() + positioning
  }

  /**
   * Hide the tooltip
   */
  hide(): void {
    if (!this.open) return;
    this.open = false;
    // updated() handles hidePopover() + class cleanup
  }

  // ========================================
  // Render
  // ========================================

  render() {
    return html`
      <div
        class="tooltip-trigger-wrapper"
        @mouseenter=${this._handleTriggerMouseEnter}
        @mouseleave=${this._handleTriggerMouseLeave}
        @focus=${this._handleTriggerFocus}
        @blur=${this._handleTriggerBlur}
      >
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>

      <div
        class="tooltip-bubble"
        id=${this._tooltipId}
        role="tooltip"
        aria-hidden=${this.open ? 'false' : 'true'}
        popover=${this._supportsPopover ? 'manual' : nothing}
        @mouseenter=${this._handleBubbleMouseEnter}
        @mouseleave=${this._handleBubbleMouseLeave}
      >
        ${this.content}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-tooltip': SandoTooltip;
  }
}
