/**
 * Sando Card Component
 *
 * A versatile surface container that groups related content and actions.
 * Supports elevated, outlined, and filled visual variants, configurable
 * padding/radius/orientation, clickable and link (href) interaction modes,
 * skeleton loading state, and full WCAG 2.1 AA accessibility.
 *
 * ## Architecture: Pseudo-Interactive Surface Pattern (CA-LP-PIS)
 * The card host is ALWAYS a `<div>` — never `<button>` or `<a>`.
 * When `clickable` or `href` is set, an internal `.card__surface-action`
 * element (button or anchor) is positioned absolutely over the card,
 * enabling interaction without wrapping slotted content in an interactive
 * container (which would violate HTML validity rules).
 *
 * @element sando-card
 *
 * @slot - Free-form card body content
 * @slot media - Image/video rendered flush to card edges (no padding). Always
 *   at top in vertical mode, left in horizontal mode.
 * @slot header - Full header section override. Takes precedence over the
 *   `heading` prop when used.
 * @slot header-action - Top-right area (badge, icon button). Only rendered
 *   when the `header` slot is NOT used.
 * @slot footer - Actions/CTA area at the bottom of the card.
 *
 * @fires sando-card-click - Fired when a `clickable` card is activated
 *   (mouse click, Enter, Space). Detail: `{ originalEvent: Event }`.
 *   Does NOT fire for `href` cards — those navigate natively.
 *
 * @cssprop --sando-card-backgroundColor - Base surface background
 * @cssprop --sando-card-elevated-boxShadow-default - Resting shadow (elevated)
 * @cssprop --sando-card-elevated-boxShadow-hover - Lifted shadow (elevated hover)
 * @cssprop --sando-card-elevated-boxShadow-active - Pressed shadow (elevated active)
 * @cssprop --sando-card-outlined-borderColor-default - Border (outlined)
 * @cssprop --sando-card-outlined-borderColor-hover - Border on hover (outlined)
 * @cssprop --sando-card-outlined-borderWidth - Border width (outlined)
 * @cssprop --sando-card-filled-backgroundColor - Background (filled)
 * @cssprop --sando-card-padding-sm - Small internal padding
 * @cssprop --sando-card-padding-md - Medium internal padding (default)
 * @cssprop --sando-card-padding-lg - Large internal padding
 * @cssprop --sando-card-borderRadius-none - No border radius
 * @cssprop --sando-card-borderRadius-default - Default border radius
 * @cssprop --sando-card-borderRadius-full - Fully rounded
 * @cssprop --sando-card-focusOutlineColor - Focus ring color
 * @cssprop --sando-card-focusOutlineWidth - Focus ring width
 * @cssprop --sando-card-focusOutlineOffset - Focus ring offset
 * @cssprop --sando-card-disabled-opacity - Opacity when disabled
 * @cssprop --sando-card-transition-duration - Animation duration
 * @cssprop --sando-card-transition-timing - Animation easing
 * @cssprop --sando-card-hover-transform - Transform on hover
 * @cssprop --sando-card-active-transform - Transform on press
 * @cssprop --sando-card-heading-fontSize - Heading font size
 * @cssprop --sando-card-heading-fontWeight - Heading font weight
 * @cssprop --sando-card-heading-color - Heading text color
 * @cssprop --sando-card-section-gap - Gap between card sections
 * @cssprop --sando-card-footer-gap - Gap between footer items
 * @cssprop --sando-card-footer-paddingTop - Spacing above footer
 * @cssprop --sando-card-media-aspectRatio - Default media aspect ratio
 *
 * @example Static card (no interaction)
 * ```html
 * <sando-card heading="My Card">
 *   <p>Card body content</p>
 *   <sando-button slot="footer" variant="solid">Action</sando-button>
 * </sando-card>
 * ```
 *
 * @example Clickable card
 * ```html
 * <sando-card heading="Click me" clickable @sando-card-click="${handler}">
 *   <p>This whole card is interactive</p>
 * </sando-card>
 * ```
 *
 * @example Link card
 * ```html
 * <sando-card heading="Visit us" href="https://example.com" target="_blank">
 *   <p>Navigates on click</p>
 * </sando-card>
 * ```
 *
 * @example With media
 * ```html
 * <sando-card heading="Media Card">
 *   <img slot="media" src="/hero.jpg" alt="Hero image" />
 *   <p>Body content</p>
 * </sando-card>
 * ```
 *
 * @example Loading state
 * ```html
 * <sando-card heading="Loading" loading></sando-card>
 * ```
 *
 * @example Outlined horizontal card
 * ```html
 * <sando-card variant="outlined" orientation="horizontal" heading="Side by side">
 *   <img slot="media" src="/thumb.jpg" alt="" />
 *   <p>Content alongside media</p>
 * </sando-card>
 * ```
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import type {
  CardVariant,
  CardPadding,
  CardRadius,
  CardOrientation,
  HeadingLevel,
  CardClickEventDetail
} from './sando-card.types.js';

import { FlavorableMixin } from '../../mixins/index.js';
import { uniqueId } from '../../utils/index.js';

// Import skeleton loading component
import '../skeleton-card/sando-skeleton-card.js';

import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import {
  baseStyles,
  variantStyles,
  paddingStyles,
  radiusStyles,
  stateStyles,
  orientationStyles
} from './styles/index.js';

@customElement('sando-card')
export class SandoCard extends FlavorableMixin(LitElement) {
  /**
   * Shadow DOM focus delegation — required per KEYBOARD_NAVIGATION.toon (KN-CR-R5)
   */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };

  /**
   * Component styles in specificity order.
   */
  static styles = [
    resetStyles, // Universal CSS reset (box-sizing, font inheritance, reduced-motion)
    tokenStyles, // Design tokens (Ingredients, Flavors, Recipes)
    baseStyles, // Host, .card container, sections, surface-action overlay
    variantStyles, // elevated, outlined, filled
    paddingStyles, // none, sm, md, lg
    radiusStyles, // none, default, full
    stateStyles, // hover, active, disabled, loading
    orientationStyles // vertical, horizontal
  ];

  // ----------------------------------------
  // Public properties (@property with reflect)
  // ----------------------------------------

  /**
   * Visual style variant of the card.
   * @default 'elevated'
   */
  @property({ reflect: true })
  variant: CardVariant = 'elevated';

  /**
   * Internal padding applied to header, body, and footer sections.
   * Media slot is always flush to card edges.
   * @default 'md'
   */
  @property({ reflect: true })
  padding: CardPadding = 'md';

  /**
   * Border radius of the card container.
   * @default 'default'
   */
  @property({ reflect: true })
  radius: CardRadius = 'default';

  /**
   * Layout direction — vertical stacks media on top, horizontal places it left.
   * @default 'vertical'
   */
  @property({ reflect: true })
  orientation: CardOrientation = 'vertical';

  /**
   * Auto-generated heading text, rendered as `<hN>` inside the card header.
   * When a `header` slot is used, this prop is ignored.
   */
  @property({ type: String })
  heading?: string;

  /**
   * Semantic level for the auto-generated heading element.
   * @default 3
   */
  @property({ type: Number, attribute: 'heading-level' })
  headingLevel: HeadingLevel = 3;

  /**
   * Accessible label for the surface-action overlay element.
   * Overrides `aria-labelledby` when set.
   */
  @property({ type: String, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  /**
   * URL to navigate to. When set, the surface-action renders as `<a>`.
   * Takes precedence over `clickable` when both are set.
   */
  @property({ type: String, reflect: true })
  href?: string;

  /**
   * Where to open the linked document. Only relevant when `href` is set.
   */
  @property({ reflect: true })
  target?: '_self' | '_blank' | '_parent' | '_top';

  /**
   * Relationship between the current document and the linked document.
   * Auto-set to `noopener noreferrer` when `target="_blank"`.
   */
  @property({ reflect: true })
  rel?: string;

  // ----------------------------------------
  // Public boolean properties
  // ----------------------------------------

  /**
   * Stretch card to 100% width of its container.
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  /**
   * Makes the card clickable — fires `sando-card-click` on activation.
   * Silently ignored if `href` is also set (href wins).
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  /**
   * Applies hover styles without making the card interactive.
   * Automatically redundant (and ignored) when `clickable` or `href` is set.
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  hoverable = false;

  /**
   * Disables card interaction. Only affects the surface-action overlay.
   * Does NOT cascade to slotted content — CTA buttons in `footer` remain usable.
   * Uses `aria-disabled` (not native `disabled`) so screen readers can still find the element.
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * When true, all card content is replaced with `<sando-skeleton-card>`.
   * Sets `aria-busy="true"` on the host and removes the card from the tab order.
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  // ----------------------------------------
  // Private/protected properties
  // ----------------------------------------

  /**
   * Stable unique id for the heading element, used by `aria-labelledby`.
   * Generated once per component instance.
   */
  private readonly _headingId = uniqueId('card-heading');

  /**
   * Tracks whether the `header` slot has projected content.
   * When true, the heading prop and header-action slot are suppressed.
   */
  @state()
  private _hasHeaderSlot = false;

  /**
   * Tracks whether the `header-action` slot has content.
   */
  @state()
  private _hasHeaderActionSlot = false;

  /**
   * Tracks whether the `media` slot has content.
   */
  @state()
  private _hasMediaSlot = false;

  /**
   * Tracks whether the `footer` slot has content.
   */
  @state()
  private _hasFooterSlot = false;

  // ----------------------------------------
  // Lifecycle methods
  // ----------------------------------------

  override connectedCallback() {
    super.connectedCallback();
    // Warn developers when both href and clickable are set (href wins)
    if (this.href && this.clickable) {
      console.warn(
        '[sando-card] Both `href` and `clickable` are set. `href` takes precedence; `clickable` is ignored.'
      );
    }
  }

  override updated(changedProperties: Map<string, unknown>) {
    // Re-warn if props change after initial render
    if (
      (changedProperties.has('href') || changedProperties.has('clickable')) &&
      this.href &&
      this.clickable
    ) {
      console.warn(
        '[sando-card] Both `href` and `clickable` are set. `href` takes precedence; `clickable` is ignored.'
      );
    }
  }

  // ----------------------------------------
  // Private methods
  // ----------------------------------------

  /**
   * Handles slot change events to track which named slots have content.
   * Empty slot wrappers are hidden via [hidden] attribute to prevent layout gaps.
   */
  private _handleSlotChange(slotName: 'header' | 'header-action' | 'media' | 'footer', e: Event) {
    const slot = e.target as HTMLSlotElement;
    const hasContent = slot.assignedNodes({ flatten: true }).length > 0;

    switch (slotName) {
      case 'header':
        this._hasHeaderSlot = hasContent;
        break;
      case 'header-action':
        this._hasHeaderActionSlot = hasContent;
        break;
      case 'media':
        this._hasMediaSlot = hasContent;
        break;
      case 'footer':
        this._hasFooterSlot = hasContent;
        break;
    }
  }

  /**
   * Computes the `rel` attribute for the anchor surface-action.
   * Adds `noopener noreferrer` automatically when `target="_blank"`.
   */
  private _computeRel(): string | undefined {
    if (this.rel) return this.rel;
    if (this.target === '_blank') return 'noopener noreferrer';
    return undefined;
  }

  /**
   * Handles click events on the surface-action button.
   * Blocks activation when disabled or loading.
   */
  private _handleClick(e: MouseEvent) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this._emitCardClick(e);
  }

  /**
   * Handles keydown events on the surface-action button.
   * Enter and Space activate the card, consistent with native button behaviour.
   */
  private _handleKeydown(e: KeyboardEvent) {
    if (this.disabled || this.loading) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._emitCardClick(e);
    }
  }

  /**
   * Dispatches `sando-card-click` with the original event as detail.
   */
  private _emitCardClick(originalEvent: Event) {
    const detail: CardClickEventDetail = { originalEvent };
    this.dispatchEvent(
      new CustomEvent('sando-card-click', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Determines whether the card is in interactive mode (href or clickable).
   * This drives the surface-action rendering and interactive CSS classes.
   */
  private _isInteractive(): boolean {
    return Boolean(this.href) || this.clickable;
  }

  /**
   * Renders the heading element using the dynamic heading level (h2–h6).
   * Returns `nothing` when the heading prop is not set.
   *
   * Note: Lit html tagged templates do not support dynamic tag names natively.
   * We use unsafeHTML only with a controlled value (always one of h2–h6).
   */
  private _renderHeading() {
    if (!this.heading) return nothing;

    const level = this.headingLevel;
    const tag = `h${level}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    // Map to concrete template to keep full Lit type safety
    const headingTemplates = {
      h2: html`<h2 id=${this._headingId} class="card__heading" part="heading">${this.heading}</h2>`,
      h3: html`<h3 id=${this._headingId} class="card__heading" part="heading">${this.heading}</h3>`,
      h4: html`<h4 id=${this._headingId} class="card__heading" part="heading">${this.heading}</h4>`,
      h5: html`<h5 id=${this._headingId} class="card__heading" part="heading">${this.heading}</h5>`,
      h6: html`<h6 id=${this._headingId} class="card__heading" part="heading">${this.heading}</h6>`
    };

    return headingTemplates[tag];
  }

  /**
   * Renders the interactive surface-action overlay.
   * When `href` is set, renders as `<a>`. When `clickable`, renders as `<button>`.
   */
  private _renderSurfaceAction() {
    if (!this._isInteractive()) return nothing;

    const tabIndex = this.disabled || this.loading ? -1 : 0;
    const ariaDisabled = this.disabled ? 'true' : 'false';

    // Determine accessible name: explicit ariaLabel > aria-labelledby heading id
    const labelledBy = !this.ariaLabel && this.heading ? this._headingId : undefined;

    if (this.href) {
      return html`
        <a
          class="card__surface-action"
          part="surface-action"
          href=${this.href}
          target=${ifDefined(this.target)}
          rel=${ifDefined(this._computeRel())}
          tabindex=${tabIndex}
          aria-disabled=${ariaDisabled}
          aria-label=${ifDefined(this.ariaLabel || undefined)}
          aria-labelledby=${ifDefined(labelledBy)}
        ></a>
      `;
    }

    return html`
      <button
        class="card__surface-action"
        part="surface-action"
        type="button"
        tabindex=${tabIndex}
        aria-disabled=${ariaDisabled}
        aria-label=${ifDefined(this.ariaLabel || undefined)}
        aria-labelledby=${ifDefined(labelledBy)}
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
      ></button>
    `;
  }

  /**
   * Renders the skeleton loading state, replacing all card content.
   */
  private _renderSkeleton() {
    return html`<sando-skeleton-card></sando-skeleton-card>`;
  }

  render() {
    const isInteractive = this._isInteractive();

    const cardClasses = classMap({
      card: true,
      [`card--${this.variant}`]: true,
      [`card--padding-${this.padding}`]: true,
      [`card--radius-${this.radius}`]: true,
      [`card--${this.orientation}`]: true,
      'card--interactive': isInteractive,
      'card--hoverable': this.hoverable && !isInteractive,
      'card--disabled': this.disabled
    });

    // Loading state: replace all content with skeleton
    if (this.loading) {
      return html`
        <div class=${cardClasses} part="card" aria-busy="true">${this._renderSkeleton()}</div>
      `;
    }

    return html`
      <div class=${cardClasses} part="card" aria-busy="false">
        <!-- Media slot (flush to edges, no padding) -->
        <div class="card__media" part="media" ?hidden=${!this._hasMediaSlot}>
          <slot name="media" @slotchange=${(e: Event) => this._handleSlotChange('media', e)}></slot>
        </div>

        <!-- Content wrapper: groups header + body + footer as a flex-column column -->
        <!-- In horizontal mode this wrapper becomes the right-hand flex column -->
        <div class="card__content">
          <!-- Header: either from slot or from heading prop + header-action -->
          <div class="card__header" part="header" ?hidden=${!this._hasHeaderSlot && !this.heading}>
            ${this._hasHeaderSlot
              ? html`
                  <slot
                    name="header"
                    @slotchange=${(e: Event) => this._handleSlotChange('header', e)}
                  ></slot>
                `
              : html`
                  <div class="card__header-content">${this._renderHeading()}</div>
                  <div
                    class="card__header-action"
                    part="header-action"
                    ?hidden=${!this._hasHeaderActionSlot}
                  >
                    <slot
                      name="header-action"
                      @slotchange=${(e: Event) => this._handleSlotChange('header-action', e)}
                    ></slot>
                  </div>
                  <!-- Keep header slot listening even when not displayed (detects future projection) -->
                  <slot
                    name="header"
                    style="display:none"
                    @slotchange=${(e: Event) => this._handleSlotChange('header', e)}
                  ></slot>
                `}
          </div>

          <!-- Body (default slot) -->
          <div class="card__body" part="body">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div class="card__footer" part="footer" ?hidden=${!this._hasFooterSlot}>
            <slot
              name="footer"
              @slotchange=${(e: Event) => this._handleSlotChange('footer', e)}
            ></slot>
          </div>
        </div>

        <!-- Interactive surface overlay (CA-LP-PIS) -->
        ${this._renderSurfaceAction()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-card': SandoCard;
  }
}
