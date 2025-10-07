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

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { ButtonVariant, ButtonSize, ButtonStatus, ButtonRadius } from './sando-button.types.js';
import {
  baseStyles,
  variantStyles,
  sizeStyles,
  radiusStyles,
  statusStyles,
  stateStyles,
} from './styles/index.js';

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

  /**
   * Component styles - modular CSS imports
   * Order matters for specificity
   */
  static styles = [
    baseStyles,      // Reset, layout, typography, focus
    variantStyles,   // Solid, outline, ghost
    sizeStyles,      // Small, medium, large, icon-only
    radiusStyles,    // None, default, full
    statusStyles,    // Success, destructive
    stateStyles,     // Loading, disabled, active
  ];

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
