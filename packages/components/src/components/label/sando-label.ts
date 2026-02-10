/**
 * Sando Label Component
 *
 * A reusable form label component that provides consistent styling
 * and accessibility features for form controls. Works with Input,
 * Select, Textarea, Radio, Checkbox, and other form elements.
 *
 * ## Features
 *
 * - Native `<label>` element for proper accessibility
 * - Required/optional indicators
 * - Helper text support
 * - Tooltip integration (shows info icon)
 * - Screen-reader only mode (visually hidden)
 * - Size variants matching form components
 * - Font weight variants
 *
 * ## Accessibility
 *
 * - Uses native `<label>` with `for` attribute for form association
 * - Required indicator is `aria-hidden` (decorative)
 * - Helper text provides additional context
 * - sr-only mode uses standard visually-hidden pattern
 *
 * @element sando-label
 *
 * @slot - Label text content
 * @slot helper-text - Custom helper text content
 * @slot tooltip - Custom tooltip content
 * @slot required-indicator - Custom required indicator (default: *)
 * @slot optional-indicator - Custom optional indicator (default: "(optional)")
 *
 * @csspart label - The native label element
 * @csspart text - The text content wrapper
 * @csspart required - The required indicator
 * @csspart optional - The optional text
 * @csspart helper-text - The helper text container
 * @csspart tooltip - The tooltip icon/wrapper
 *
 * @cssprop --sando-label-fontFamily - Label font family
 * @cssprop --sando-label-fontWeight-normal - Normal font weight
 * @cssprop --sando-label-fontWeight-medium - Medium font weight
 * @cssprop --sando-label-fontWeight-semibold - Semibold font weight
 * @cssprop --sando-label-textColor-default - Default text color
 * @cssprop --sando-label-textColor-disabled - Disabled text color
 * @cssprop --sando-label-size-sm-fontSize - Small size font
 * @cssprop --sando-label-size-md-fontSize - Medium size font
 * @cssprop --sando-label-size-lg-fontSize - Large size font
 * @cssprop --sando-label-required-textColor - Required indicator color
 * @cssprop --sando-label-optional-textColor - Optional text color
 * @cssprop --sando-label-helperText-fontSize - Helper text font size
 * @cssprop --sando-label-helperText-textColor - Helper text color
 * @cssprop --sando-label-tooltip-iconColor - Tooltip icon color
 * @cssprop --sando-label-gap - Gap between elements
 *
 * @example Basic usage
 * ```html
 * <sando-label for="email">Email Address</sando-label>
 * <input id="email" type="email" />
 * ```
 *
 * @example Required field
 * ```html
 * <sando-label for="name" required>Full Name</sando-label>
 * ```
 *
 * @example Optional field
 * ```html
 * <sando-label for="nickname" optional>Nickname</sando-label>
 * ```
 *
 * @example With helper text
 * ```html
 * <sando-label for="password" helper-text="Must be at least 8 characters">
 *   Password
 * </sando-label>
 * ```
 *
 * @example With tooltip
 * ```html
 * <sando-label for="ssn" tooltip="We need this for verification">
 *   Social Security Number
 * </sando-label>
 * ```
 *
 * @example Screen reader only
 * ```html
 * <sando-label for="search" sr-only>Search</sando-label>
 * ```
 *
 * @example Size variants
 * ```html
 * <sando-label size="sm">Small Label</sando-label>
 * <sando-label size="md">Medium Label</sando-label>
 * <sando-label size="lg">Large Label</sando-label>
 * ```
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { LabelSize, LabelWeight } from './sando-label.types.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, sizeStyles, variantStyles } from './styles/index.js';

// Import sando-icon for tooltip icon
import '../icon/sando-icon.js';

@customElement('sando-label')
export class SandoLabel extends FlavorableMixin(LitElement) {
  /**
   * Component styles - modular CSS imports
   * Order matters for specificity
   */
  static styles = [
    resetStyles, // Global resets (box-sizing, margins, etc.)
    tokenStyles, // Design tokens (Ingredients, Flavors, Recipes)
    baseStyles, // Layout, typography
    sizeStyles, // Size variants
    variantStyles // Weight variants, disabled state
  ];

  /**
   * ID of the associated form element.
   * Used in the `for` attribute of the native label.
   */
  @property({ type: String })
  for?: string;

  /**
   * Shows the required indicator (*) after the label text.
   * Mutually exclusive with `optional`.
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Shows "(optional)" text after the label.
   * Mutually exclusive with `required`.
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  optional = false;

  /**
   * Disabled visual state.
   * Reduces visual prominence of the label.
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Size of the label.
   * Should match the size of the associated form component.
   * @default 'md'
   */
  @property({ reflect: true })
  size: LabelSize = 'md';

  /**
   * Font weight variant.
   * @default 'medium'
   */
  @property({ reflect: true })
  weight: LabelWeight = 'medium';

  /**
   * Helper text displayed below the label.
   */
  @property({ type: String, attribute: 'helper-text' })
  helperText?: string;

  /**
   * Tooltip text for additional information.
   * When provided, shows a help icon (?) next to the label.
   */
  @property({ type: String })
  tooltip?: string;

  /**
   * Visually hides the label but keeps it accessible to screen readers.
   * Uses the standard visually-hidden pattern.
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'sr-only' })
  srOnly = false;

  /**
   * Renders the required indicator.
   * Only shown if `required` is true and `optional` is false.
   * @private
   */
  private _renderRequired() {
    // Required takes precedence, but don't show if optional is also set
    if (!this.required || this.optional) {
      return nothing;
    }

    return html`
      <span class="label__required" part="required" aria-hidden="true">
        <slot name="required-indicator">*</slot>
      </span>
    `;
  }

  /**
   * Renders the optional indicator.
   * Only shown if `optional` is true and `required` is false.
   * @private
   */
  private _renderOptional() {
    // Don't show if required is set
    if (this.required || !this.optional) {
      return nothing;
    }

    return html`
      <span class="label__optional" part="optional">
        <slot name="optional-indicator">(optional)</slot>
      </span>
    `;
  }

  /**
   * Renders the tooltip icon.
   * Only shown if `tooltip` prop is provided.
   * @private
   */
  private _renderTooltip() {
    if (!this.tooltip) {
      return nothing;
    }

    return html`
      <span class="label__tooltip" part="tooltip" title=${this.tooltip}>
        <slot name="tooltip">
          <sando-icon name="circle-help" size="xs" decorative inherit-color></sando-icon>
        </slot>
      </span>
    `;
  }

  /**
   * Renders the helper text.
   * Shows custom slot content or the helperText prop.
   * @private
   */
  private _renderHelperText() {
    const hasHelperSlot = this.querySelector('[slot="helper-text"]');

    if (!this.helperText && !hasHelperSlot) {
      return nothing;
    }

    return html`
      <span class="label__helper-text" part="helper-text">
        <slot name="helper-text">${this.helperText}</slot>
      </span>
    `;
  }

  render() {
    return html`
      <label class="label" part="label" for=${this.for || nothing}>
        <span class="label__text" part="text">
          <slot></slot>
          ${this._renderRequired()} ${this._renderOptional()} ${this._renderTooltip()}
        </span>
      </label>
      ${this._renderHelperText()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-label': SandoLabel;
  }
}
