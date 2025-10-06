/**
 * Sando Button Component
 *
 * A fully accessible button component built with Lit.
 * Supports multiple variants, sizes, and states with design token integration.
 *
 * @element sando-button
 *
 * @slot - Button content (text, icons, etc.)
 * @slot icon-start - Icon before the button text
 * @slot icon-end - Icon after the button text
 *
 * @fires click - Fired when the button is clicked (unless disabled)
 *
 * @example
 * <sando-button variant="solid" size="medium">
 *   Click me
 * </sando-button>
 *
 * @example
 * <sando-button variant="outline" size="small" disabled>
 *   Disabled
 * </sando-button>
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { ButtonVariant, ButtonSize, ButtonStatus } from './sando-button.types.js';

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
   * Design system flavor/theme
   * @default 'original'
   */
  @property({ reflect: true })
  flavor = 'original';

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

    button {
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

    button:focus-visible {
      outline: var(--sando-button-focusOutlineWidth) solid var(--sando-button-focusOutlineColor);
      outline-offset: 2px;
    }

    button:active {
      transform: scale(0.98);
    }

    /* Size Variants */
    :host([size="small"]) button {
      padding: var(--sando-button-size-small-paddingBlock) var(--sando-button-size-small-paddingInline);
      font-size: var(--sando-button-size-small-fontSize);
    }

    :host([size="medium"]) button {
      padding: var(--sando-button-size-medium-paddingBlock) var(--sando-button-size-medium-paddingInline);
      font-size: var(--sando-button-size-medium-fontSize);
    }

    :host([size="large"]) button {
      padding: var(--sando-button-size-large-paddingBlock) var(--sando-button-size-large-paddingInline);
      font-size: var(--sando-button-size-large-fontSize);
    }

    /* Solid Variant */
    :host([variant="solid"]) button {
      background-color: var(--sando-button-solid-backgroundColor-default);
      color: var(--sando-button-solid-textColor-default);
      border: none;
    }

    :host([variant="solid"]) button:hover {
      background-color: var(--sando-button-solid-backgroundColor-hover);
    }

    :host([variant="solid"]) button:active {
      background-color: var(--sando-button-solid-backgroundColor-active);
    }

    :host([variant="solid"][disabled]) button {
      background-color: var(--sando-button-solid-backgroundColor-disabled);
      color: var(--sando-button-solid-textColor-disabled);
    }

    /* Outline Variant */
    :host([variant="outline"]) button {
      background-color: transparent;
      color: var(--sando-button-outline-textColor-default);
      border: 1px solid var(--sando-button-outline-borderColor-default);
    }

    :host([variant="outline"]) button:hover {
      background-color: var(--sando-button-outline-backgroundColor-hover);
      border-color: var(--sando-button-outline-borderColor-hover);
    }

    :host([variant="outline"]) button:active {
      background-color: var(--sando-button-outline-backgroundColor-active);
      border-color: var(--sando-button-outline-borderColor-active);
    }

    :host([variant="outline"][disabled]) button {
      background-color: var(--sando-button-outline-backgroundColor-disabled);
      color: var(--sando-button-outline-textColor-disabled);
      border-color: var(--sando-button-outline-borderColor-disabled);
    }

    /* Ghost Variant */
    :host([variant="ghost"]) button {
      background-color: transparent;
      color: var(--sando-button-ghost-textColor-default);
      border: none;
    }

    :host([variant="ghost"]) button:hover {
      background-color: var(--sando-button-ghost-backgroundColor-hover);
    }

    :host([variant="ghost"]) button:active {
      background-color: var(--sando-button-ghost-backgroundColor-active);
    }

    :host([variant="ghost"][disabled]) button {
      background-color: var(--sando-button-ghost-backgroundColor-disabled);
      color: var(--sando-button-ghost-textColor-disabled);
    }

    /* Status Variants */
    :host([status="success"]) button {
      background-color: var(--sando-button-status-success-backgroundColor);
      color: var(--sando-button-status-success-textColor);
      border-color: var(--sando-button-status-success-borderColor);
    }

    :host([status="destructive"]) button {
      background-color: var(--sando-button-status-destructive-backgroundColor);
      color: var(--sando-button-status-destructive-textColor);
      border-color: var(--sando-button-status-destructive-borderColor);
    }

    /* Loading State */
    :host([loading]) button {
      opacity: var(--sando-button-loading-opacity);
      cursor: wait;
    }

    /* Disabled State */
    :host([disabled]) button {
      cursor: not-allowed;
    }

    .spinner {
      display: inline-block;
      width: 1em;
      height: 1em;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
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
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Dispatch click event
    this.dispatchEvent(
      new CustomEvent('click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e }
      })
    );
  }

  render() {
    const classes = {
      button: true,
      loading: this.loading,
      disabled: this.disabled
    };

    return html`
      <button
        class=${classMap(classes)}
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-disabled=${this.disabled || this.loading ? 'true' : 'false'}
        aria-busy=${this.loading ? 'true' : 'false'}
        @click=${this.handleClick}
      >
        <slot name="icon-start"></slot>
        ${this.loading ? html`<span class="spinner" aria-label="Loading"></span>` : ''}
        <slot></slot>
        <slot name="icon-end"></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-button': SandoButton;
  }
}
