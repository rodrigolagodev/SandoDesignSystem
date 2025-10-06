/**
 * Sando Button Component
 *
 * A fully accessible button component built with Lit.
 * Supports multiple variants, sizes, states, and can render as button or link.
 *
 * @element sando-button
 *
 * @slot - Button content (text, icons, etc.)
 * @slot icon-start - Icon before the button text
 * @slot icon-end - Icon after the button text
 *
 * @fires click - Fired when the button is clicked (unless disabled)
 *
 * @cssprop --sando-button-fontFamily - Button font family
 * @cssprop --sando-button-fontWeight - Button font weight
 * @cssprop --sando-button-borderRadius - Button border radius
 * @cssprop --sando-button-transition-duration - Transition duration
 *
 * @example Basic usage
 * <sando-button variant="solid" size="medium">
 *   Click me
 * </sando-button>
 *
 * @example With icons
 * <sando-button>
 *   <span slot="icon-start">⭐</span>
 *   Favorite
 * </sando-button>
 *
 * @example Icon-only button
 * <sando-button icon-only aria-label="Settings">
 *   <span slot="icon-start">⚙️</span>
 * </sando-button>
 *
 * @example As link
 * <sando-button href="https://example.com" target="_blank">
 *   Visit Site
 * </sando-button>
 *
 * @example Toggle button
 * <sando-button active>
 *   Active Filter
 * </sando-button>
 *
 * @example Rounded variants
 * <sando-button radius="full" icon-only>
 *   <span slot="icon-start">➕</span>
 * </sando-button>
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { ButtonVariant, ButtonSize, ButtonStatus, ButtonRadius } from './sando-button.types.js';

@customElement('sando-button')
export class SandoButton extends LitElement {
  /**
   * Visual style variant of the button
   * @default 'solid'
   */
  @property({ reflect: true })
  variant: ButtonVariant = 'solid';

  /**
   * Size of the button
   * @default 'medium'
   */
  @property({ reflect: true })
  size: ButtonSize = 'medium';

  /**
   * Status variant for success/error states
   * @default 'default'
   */
  @property({ reflect: true })
  status: ButtonStatus = 'default';

  /**
   * Whether the button is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Button type (for form submission)
   * @default 'button'
   */
  @property({ reflect: true })
  type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Full width button
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  fullWidth = false;

  /**
   * Icon-only button (square shape, no padding for text)
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'icon-only' })
  iconOnly = false;

  /**
   * Border radius variant
   * @default 'default'
   */
  @property({ reflect: true })
  radius: ButtonRadius = 'default';

  /**
   * Design system flavor/theme
   * @default 'original'
   */
  @property({ reflect: true })
  flavor = 'original';

  /**
   * URL to navigate to (renders as <a> instead of <button>)
   */
  @property({ reflect: true })
  href?: string;

  /**
   * Where to open the linked document
   */
  @property({ reflect: true })
  target?: '_self' | '_blank' | '_parent' | '_top';

  /**
   * Relationship between current document and linked document
   */
  @property({ reflect: true })
  rel?: string;

  /**
   * Whether to download the linked resource
   */
  @property({ reflect: true })
  download?: string | boolean;

  /**
   * Accessible label for screen readers (overrides visible text)
   */
  @property({ reflect: true, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  /**
   * Whether the button is in an active/pressed state (toggle)
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  static styles = css`
    :host {
      display: inline-block;
    }

    :host([full-width]) {
      display: block;
    }

    :host([disabled]) {
      pointer-events: none;
    }

    button,
    a {
      /* Reset */
      all: unset;
      box-sizing: border-box;

      /* Display */
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5em;
      width: 100%;

      /* Typography */
      font-family: var(--sando-button-fontFamily);
      font-weight: var(--sando-button-fontWeight);
      line-height: var(--sando-button-lineHeight);
      text-align: center;
      text-decoration: none;
      white-space: nowrap;

      /* Appearance */
      border-radius: var(--sando-button-borderRadius);
      cursor: pointer;
      user-select: none;

      /* Transition */
      transition-property: background-color, color, border-color, transform, box-shadow;
      transition-duration: var(--sando-button-transition-duration);
      transition-timing-function: var(--sando-button-transition-timing);
    }

    button:focus-visible,
    a:focus-visible {
      outline: var(--sando-button-focusOutlineWidth) solid var(--sando-button-focusOutlineColor);
      outline-offset: 2px;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
      button:focus-visible,
      a:focus-visible {
        outline-width: 4px;
        outline-offset: 3px;
      }
    }

    button:active,
    a:active {
      transform: scale(0.98);
    }

    /* Size Variants */
    :host([size="small"]) button,
    :host([size="small"]) a {
      padding: var(--sando-button-size-small-paddingBlock) var(--sando-button-size-small-paddingInline);
      font-size: var(--sando-button-size-small-fontSize);
    }

    :host([size="medium"]) button,
    :host([size="medium"]) a {
      padding: var(--sando-button-size-medium-paddingBlock) var(--sando-button-size-medium-paddingInline);
      font-size: var(--sando-button-size-medium-fontSize);
    }

    :host([size="large"]) button,
    :host([size="large"]) a {
      padding: var(--sando-button-size-large-paddingBlock) var(--sando-button-size-large-paddingInline);
      font-size: var(--sando-button-size-large-fontSize);
    }

    /* Icon-only variant (square buttons) */
    :host([icon-only][size="small"]) button,
    :host([icon-only][size="small"]) a {
      padding: var(--sando-button-size-small-paddingBlock);
      aspect-ratio: 1;
    }

    :host([icon-only][size="medium"]) button,
    :host([icon-only][size="medium"]) a {
      padding: var(--sando-button-size-medium-paddingBlock);
      aspect-ratio: 1;
    }

    :host([icon-only][size="large"]) button,
    :host([icon-only][size="large"]) a {
      padding: var(--sando-button-size-large-paddingBlock);
      aspect-ratio: 1;
    }

    /* Radius Variants */
    :host([radius="none"]) button,
    :host([radius="none"]) a {
      border-radius: 0;
    }

    :host([radius="full"]) button,
    :host([radius="full"]) a {
      border-radius: 9999px;
    }

    /* Solid Variant */
    :host([variant="solid"]) button,
    :host([variant="solid"]) a {
      background-color: var(--sando-button-solid-backgroundColor-default);
      color: var(--sando-button-solid-textColor-default);
      border: none;
    }

    :host([variant="solid"]) button:hover,
    :host([variant="solid"]) a:hover {
      background-color: var(--sando-button-solid-backgroundColor-hover);
    }

    :host([variant="solid"]) button:active,
    :host([variant="solid"]) a:active {
      background-color: var(--sando-button-solid-backgroundColor-active);
    }

    :host([variant="solid"][disabled]) button,
    :host([variant="solid"][disabled]) a {
      background-color: var(--sando-button-solid-backgroundColor-disabled);
      color: var(--sando-button-solid-textColor-disabled);
    }

    /* Outline Variant */
    :host([variant="outline"]) button,
    :host([variant="outline"]) a {
      background-color: transparent;
      color: var(--sando-button-outline-textColor-default);
      border: 1px solid var(--sando-button-outline-borderColor-default);
    }

    :host([variant="outline"]) button:hover,
    :host([variant="outline"]) a:hover {
      background-color: var(--sando-button-outline-backgroundColor-hover);
      border-color: var(--sando-button-outline-borderColor-hover);
    }

    :host([variant="outline"]) button:active,
    :host([variant="outline"]) a:active {
      background-color: var(--sando-button-outline-backgroundColor-active);
      border-color: var(--sando-button-outline-borderColor-active);
    }

    :host([variant="outline"][disabled]) button,
    :host([variant="outline"][disabled]) a {
      background-color: var(--sando-button-outline-backgroundColor-disabled);
      color: var(--sando-button-outline-textColor-disabled);
      border-color: var(--sando-button-outline-borderColor-disabled);
    }

    /* Ghost Variant */
    :host([variant="ghost"]) button,
    :host([variant="ghost"]) a {
      background-color: transparent;
      color: var(--sando-button-ghost-textColor-default);
      border: none;
    }

    :host([variant="ghost"]) button:hover,
    :host([variant="ghost"]) a:hover {
      background-color: var(--sando-button-ghost-backgroundColor-hover);
    }

    :host([variant="ghost"]) button:active,
    :host([variant="ghost"]) a:active {
      background-color: var(--sando-button-ghost-backgroundColor-active);
    }

    :host([variant="ghost"][disabled]) button,
    :host([variant="ghost"][disabled]) a {
      background-color: var(--sando-button-ghost-backgroundColor-disabled);
      color: var(--sando-button-ghost-textColor-disabled);
    }

    /* Status Variants - Solid */
    :host([variant="solid"][status="success"]) button,
    :host([variant="solid"][status="success"]) a {
      background-color: var(--sando-button-status-success-backgroundColor);
      color: var(--sando-button-status-success-textColor);
    }

    :host([variant="solid"][status="success"]) button:hover,
    :host([variant="solid"][status="success"]) a:hover {
      filter: brightness(0.9);
    }

    :host([variant="solid"][status="destructive"]) button,
    :host([variant="solid"][status="destructive"]) a {
      background-color: var(--sando-button-status-destructive-backgroundColor);
      color: var(--sando-button-status-destructive-textColor);
    }

    :host([variant="solid"][status="destructive"]) button:hover,
    :host([variant="solid"][status="destructive"]) a:hover {
      filter: brightness(0.9);
    }

    /* Status Variants - Outline */
    :host([variant="outline"][status="success"]) button,
    :host([variant="outline"][status="success"]) a {
      color: var(--sando-button-status-success-backgroundColor);
      border-color: var(--sando-button-status-success-borderColor);
    }

    :host([variant="outline"][status="success"]) button:hover,
    :host([variant="outline"][status="success"]) a:hover {
      background-color: var(--sando-button-status-success-backgroundColor);
      color: var(--sando-button-status-success-textColor);
    }

    :host([variant="outline"][status="destructive"]) button,
    :host([variant="outline"][status="destructive"]) a {
      color: var(--sando-button-status-destructive-backgroundColor);
      border-color: var(--sando-button-status-destructive-borderColor);
    }

    :host([variant="outline"][status="destructive"]) button:hover,
    :host([variant="outline"][status="destructive"]) a:hover {
      background-color: var(--sando-button-status-destructive-backgroundColor);
      color: var(--sando-button-status-destructive-textColor);
    }

    /* Status Variants - Ghost */
    :host([variant="ghost"][status="success"]) button,
    :host([variant="ghost"][status="success"]) a {
      color: var(--sando-button-status-success-backgroundColor);
    }

    :host([variant="ghost"][status="success"]) button:hover,
    :host([variant="ghost"][status="success"]) a:hover {
      background-color: var(--sando-button-status-success-backgroundColor);
      color: var(--sando-button-status-success-textColor);
    }

    :host([variant="ghost"][status="destructive"]) button,
    :host([variant="ghost"][status="destructive"]) a {
      color: var(--sando-button-status-destructive-backgroundColor);
    }

    :host([variant="ghost"][status="destructive"]) button:hover,
    :host([variant="ghost"][status="destructive"]) a:hover {
      background-color: var(--sando-button-status-destructive-backgroundColor);
      color: var(--sando-button-status-destructive-textColor);
    }

    /* Loading State */
    :host([loading]) button,
    :host([loading]) a {
      cursor: wait;
      position: relative;
    }

    :host([loading]) .content {
      visibility: hidden;
    }

    /* Disabled State */
    :host([disabled]) button,
    :host([disabled]) a {
      cursor: not-allowed;
    }

    /* Active/Pressed State */
    :host([active][variant="solid"]) button,
    :host([active][variant="solid"]) a {
      background-color: var(--sando-button-solid-backgroundColor-active);
    }

    :host([active][variant="outline"]) button,
    :host([active][variant="outline"]) a {
      background-color: var(--sando-button-outline-backgroundColor-active);
      border-color: var(--sando-button-outline-borderColor-active);
    }

    :host([active][variant="ghost"]) button,
    :host([active][variant="ghost"]) a {
      background-color: var(--sando-button-ghost-backgroundColor-active);
    }

    .spinner {
      display: inline-block;
      width: 1em;
      height: 1em;
      border: 2px solid var(--sando-button-loading-spinnerColor);
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    :host([loading]) .spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    @keyframes spin {
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    /* Slots */
    ::slotted([slot="icon-start"]) {
      margin-inline-end: 0.25em;
    }

    ::slotted([slot="icon-end"]) {
      margin-inline-start: 0.25em;
    }
  `;

  private handleClick(e: MouseEvent) {
    // Prevent click when disabled or loading
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Native click event will bubble naturally
    // No need to dispatch a custom event
  }

  render() {
    const classes = {
      button: true,
      loading: this.loading,
      disabled: this.disabled
    };

    const content = html`
      ${this.loading ? html`<span class="spinner" role="status" aria-label="Loading"></span>` : ''}
      <span class="content">
        <slot name="icon-start"></slot>
        <slot></slot>
        <slot name="icon-end"></slot>
      </span>
    `;

    // Render as anchor tag if href is provided
    if (this.href) {
      return html`
        <a
          class=${classMap(classes)}
          href=${this.href}
          target=${this.target || '_self'}
          rel=${this.rel || (this.target === '_blank' ? 'noopener noreferrer' : '')}
          ?download=${typeof this.download === 'boolean' ? this.download : this.download !== undefined}
          download=${typeof this.download === 'string' ? this.download : ''}
          aria-label=${this.ariaLabel || ''}
          aria-pressed=${this.active ? 'true' : 'false'}
          aria-disabled=${this.disabled || this.loading ? 'true' : 'false'}
          aria-busy=${this.loading ? 'true' : 'false'}
          aria-live=${this.loading ? 'polite' : 'off'}
          @click=${this.handleClick}
        >
          ${content}
        </a>
      `;
    }

    // Render as button tag
    return html`
      <button
        class=${classMap(classes)}
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-label=${this.ariaLabel || ''}
        aria-pressed=${this.active ? 'true' : 'false'}
        aria-disabled=${this.disabled || this.loading ? 'true' : 'false'}
        aria-busy=${this.loading ? 'true' : 'false'}
        aria-live=${this.loading ? 'polite' : 'off'}
        @click=${this.handleClick}
      >
        ${content}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-button': SandoButton;
  }
}
