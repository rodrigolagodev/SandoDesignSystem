import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import type {
  InputChangeEventDetail,
  InputSize,
  InputType,
  InputVariant,
  SandoInputProps
} from './sando-input.types.js';

import { FlavorableMixin } from '../../mixins/index.js';

/**
 * Sando Input Component
 *
 * A fully accessible input component with multiple variants, sizes, and states.
 * Supports prefix/suffix slots, error handling, and comprehensive validation states.
 *
 * @element sando-input
 *
 * @slot prefix - Content before the input (icons, text)
 * @slot suffix - Content after the input (icons, actions)
 *
 * @fires input - Fired when input value changes
 * @fires change - Fired when input loses focus with changed value
 * @fires focus - Fired when input gains focus
 * @fires blur - Fired when input loses focus
 *
 * @cssprop --sando-input-outlined-borderColor-default - Border color (outlined variant)
 * @cssprop --sando-input-outlined-borderColor-hover - Border color on hover
 * @cssprop --sando-input-outlined-borderColor-focus - Border color on focus
 * @cssprop --sando-input-outlined-borderColor-error - Border color when error
 * @cssprop --sando-input-outlined-backgroundColor-default - Background color
 * @cssprop --sando-input-filled-backgroundColor-default - Background color (filled variant)
 * @cssprop --sando-input-textColor-default - Text color
 * @cssprop --sando-input-textColor-placeholder - Placeholder text color
 * @cssprop --sando-input-size-small-height - Height for small size
 * @cssprop --sando-input-size-medium-height - Height for medium size
 * @cssprop --sando-input-size-large-height - Height for large size
 *
 * @example Basic usage
 * ```html
 * <sando-input label="Email" type="email" placeholder="you@example.com"></sando-input>
 * ```
 *
 * @example With error
 * ```html
 * <sando-input label="Username" error errorText="Username is required"></sando-input>
 * ```
 *
 * @example With slots
 * ```html
 * <sando-input label="Search">
 *   <span slot="prefix">🔍</span>
 *   <button slot="suffix">Clear</button>
 * </sando-input>
 * ```
 */
@customElement('sando-input')
export class SandoInput extends FlavorableMixin(LitElement) implements SandoInputProps {
  /**
   * Reference to the native input element
   * @private
   */
  @query('input')
  private _inputElement!: HTMLInputElement;

  /**
   * Internal: tracks whether component has been interacted with
   * @private
   */
  @state()
  private _touched = false;

  /**
   * Visual style variant of the input
   * @default 'outlined'
   */
  @property({ reflect: true })
  variant: InputVariant = 'outlined';

  /**
   * Size of the input
   * @default 'medium'
   */
  @property({ reflect: true })
  size: InputSize = 'medium';

  /**
   * Input type
   * @default 'text'
   */
  @property({ reflect: true })
  type: InputType = 'text';

  /**
   * Input value
   * @default ''
   */
  @property({ reflect: true })
  value = '';

  /**
   * Placeholder text
   */
  @property({ reflect: true })
  placeholder?: string;

  /**
   * Accessible label for the input
   */
  @property({ reflect: true })
  label?: string;

  /**
   * Helper text displayed below the input
   */
  @property({ reflect: true, attribute: 'helper-text' })
  helperText?: string;

  /**
   * Error message displayed when error is true
   */
  @property({ reflect: true, attribute: 'error-text' })
  errorText?: string;

  /**
   * Whether the input is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the input is readonly
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Whether the input is required
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether the input has an error
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  // TODO: Add static styles when Recipe tokens are created
  // See TOKEN_ARCHITECTURE.md for token creation
  static styles = css`
    :host {
      display: inline-block;
      width: 100%;
    }

    /* TODO: Replace with Recipe tokens */
    .input-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 8px 12px;
      background: white;
      transition: border-color 0.2s;
    }

    .input-wrapper:hover:not(.disabled) {
      border-color: #999;
    }

    .input-wrapper.focused {
      border-color: #007bff;
      outline: 2px solid rgba(0, 123, 255, 0.25);
    }

    .input-wrapper.error {
      border-color: #dc3545;
    }

    .input-wrapper.disabled {
      background: #f5f5f5;
      cursor: not-allowed;
      opacity: 0.6;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      font: inherit;
      background: transparent;
      min-width: 0;
    }

    input:disabled {
      cursor: not-allowed;
    }

    .helper-text,
    .error-text {
      font-size: 0.875rem;
      margin-top: 4px;
    }

    .error-text {
      color: #dc3545;
    }

    .label {
      display: block;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .required-indicator {
      color: #dc3545;
    }
  `;

  /**
   * Lifecycle: Called when properties change
   * Syncs component value with native input
   */
  protected updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('value') && this._inputElement) {
      // Sync value to native input
      if (this._inputElement.value !== this.value) {
        this._inputElement.value = this.value;
      }
    }
  }

  /**
   * Handle input event
   * @private
   */
  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;

    // Dispatch native-like input event
    this.dispatchEvent(
      new Event('input', {
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Handle change event (fired on blur with changed value)
   * @private
   */
  private _handleChange(e: Event) {
    const target = e.target as HTMLInputElement;

    // Dispatch custom event with detail
    this.dispatchEvent(
      new CustomEvent<InputChangeEventDetail>('change', {
        detail: { value: target.value },
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Handle focus event
   * @private
   */
  private _handleFocus(_e: FocusEvent) {
    this._touched = true;
    this.dispatchEvent(
      new FocusEvent('focus', {
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Handle blur event
   * @private
   */
  private _handleBlur(_e: FocusEvent) {
    this.dispatchEvent(
      new FocusEvent('blur', {
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Get CSS classes for input wrapper
   * @private
   */
  private _getWrapperClasses(): string {
    const classes = ['input-wrapper'];

    if (this.disabled) {
      classes.push('disabled');
    }

    if (this.error) {
      classes.push('error');
    }

    if (this._touched) {
      classes.push('touched');
    }

    return classes.join(' ');
  }

  /**
   * Generate unique ID for input (for label association)
   * @private
   */
  private _getInputId(): string {
    return `sando-input-${Math.random().toString(36).substr(2, 9)}`;
  }

  render() {
    const inputId = this._getInputId();
    const hasHelperText = this.helperText && !this.error;
    const hasErrorText = this.errorText && this.error;
    const describedBy = hasHelperText || hasErrorText ? `${inputId}-description` : undefined;

    return html`
      ${this.label
        ? html`
            <label class="label" for="${inputId}">
              ${this.label} ${this.required ? html`<span class="required-indicator">*</span>` : ''}
            </label>
          `
        : ''}

      <div class="${this._getWrapperClasses()}">
        <slot name="prefix"></slot>

        <input
          id="${inputId}"
          type="${this.type}"
          .value="${this.value}"
          placeholder="${this.placeholder || ''}"
          ?disabled="${this.disabled}"
          ?readonly="${this.readonly}"
          ?required="${this.required}"
          aria-invalid="${this.error}"
          aria-describedby="${describedBy || ''}"
          @input="${this._handleInput}"
          @change="${this._handleChange}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
        />

        <slot name="suffix"></slot>
      </div>

      ${hasHelperText
        ? html`<div id="${inputId}-description" class="helper-text">${this.helperText}</div>`
        : ''}
      ${hasErrorText
        ? html`<div id="${inputId}-description" class="error-text" role="alert">
            ${this.errorText}
          </div>`
        : ''}
    `;
  }

  /**
   * Public API: Focus the input
   */
  focus(): void {
    this._inputElement?.focus();
  }

  /**
   * Public API: Blur the input
   */
  blur(): void {
    this._inputElement?.blur();
  }

  /**
   * Public API: Select all text in the input
   */
  select(): void {
    this._inputElement?.select();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-input': SandoInput;
  }
}
