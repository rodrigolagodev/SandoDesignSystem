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
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';

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
 * @cssprop --sando-input-outlined-borderColor-default - Border color (outlined variant, default state)
 * @cssprop --sando-input-outlined-borderColor-hover - Border color (outlined variant, hover state)
 * @cssprop --sando-input-outlined-borderColor-focus - Border color (outlined variant, focus state)
 * @cssprop --sando-input-outlined-borderColor-error - Border color (outlined variant, error state)
 * @cssprop --sando-input-outlined-borderColor-disabled - Border color (outlined variant, disabled state)
 * @cssprop --sando-input-outlined-backgroundColor-default - Background color (outlined variant, default state)
 * @cssprop --sando-input-outlined-backgroundColor-disabled - Background color (outlined variant, disabled state)
 * @cssprop --sando-input-outlined-textColor-default - Text color (outlined variant, default state)
 * @cssprop --sando-input-outlined-textColor-placeholder - Placeholder text color (outlined variant)
 * @cssprop --sando-input-outlined-textColor-disabled - Text color (outlined variant, disabled state)
 * @cssprop --sando-input-filled-backgroundColor-default - Background color (filled variant, default state)
 * @cssprop --sando-input-filled-backgroundColor-hover - Background color (filled variant, hover state)
 * @cssprop --sando-input-filled-backgroundColor-disabled - Background color (filled variant, disabled state)
 * @cssprop --sando-input-filled-borderColor-default - Border color (filled variant, default state)
 * @cssprop --sando-input-filled-borderColor-hover - Border color (filled variant, hover state)
 * @cssprop --sando-input-filled-borderColor-focus - Border color (filled variant, focus state)
 * @cssprop --sando-input-filled-borderColor-error - Border color (filled variant, error state)
 * @cssprop --sando-input-filled-borderColor-disabled - Border color (filled variant, disabled state)
 * @cssprop --sando-input-filled-textColor-default - Text color (filled variant, default state)
 * @cssprop --sando-input-filled-textColor-placeholder - Placeholder text color (filled variant)
 * @cssprop --sando-input-filled-textColor-disabled - Text color (filled variant, disabled state)
 * @cssprop --sando-input-size-small-paddingInline - Horizontal padding (small size)
 * @cssprop --sando-input-size-small-paddingBlock - Vertical padding (small size)
 * @cssprop --sando-input-size-small-fontSize - Font size (small size)
 * @cssprop --sando-input-size-small-minHeight - Minimum height (small size)
 * @cssprop --sando-input-size-medium-paddingInline - Horizontal padding (medium size)
 * @cssprop --sando-input-size-medium-paddingBlock - Vertical padding (medium size)
 * @cssprop --sando-input-size-medium-fontSize - Font size (medium size)
 * @cssprop --sando-input-size-medium-minHeight - Minimum height (medium size)
 * @cssprop --sando-input-size-large-paddingInline - Horizontal padding (large size)
 * @cssprop --sando-input-size-large-paddingBlock - Vertical padding (large size)
 * @cssprop --sando-input-size-large-fontSize - Font size (large size)
 * @cssprop --sando-input-size-large-minHeight - Minimum height (large size)
 * @cssprop --sando-input-label-textColor-default - Label text color (default state)
 * @cssprop --sando-input-label-textColor-disabled - Label text color (disabled state)
 * @cssprop --sando-input-label-fontSize - Label font size
 * @cssprop --sando-input-label-fontWeight - Label font weight
 * @cssprop --sando-input-label-marginBottom - Label bottom margin
 * @cssprop --sando-input-helperText-textColor-default - Helper text color
 * @cssprop --sando-input-helperText-fontSize - Helper text font size
 * @cssprop --sando-input-helperText-marginTop - Helper text top margin
 * @cssprop --sando-input-errorText-textColor - Error text color
 * @cssprop --sando-input-errorText-fontSize - Error text font size
 * @cssprop --sando-input-errorText-marginTop - Error text top margin
 * @cssprop --sando-input-required-textColor - Required indicator color
 * @cssprop --sando-input-fontFamily - Input font family
 * @cssprop --sando-input-lineHeight - Input line height
 * @cssprop --sando-input-borderRadius - Border radius
 * @cssprop --sando-input-borderWidth - Border width
 * @cssprop --sando-input-focusOutlineColor - Focus outline color
 * @cssprop --sando-input-focusOutlineWidth - Focus outline width
 * @cssprop --sando-input-focusOutlineOffset - Focus outline offset
 * @cssprop --sando-input-transition-duration - Transition duration
 * @cssprop --sando-input-transition-timing - Transition timing function
 * @cssprop --sando-input-gap - Gap between prefix/suffix and input
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
   * Shadow DOM focus delegation for proper keyboard navigation
   * Required per KEYBOARD_NAVIGATION.toon (KN-CR-R5)
   */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };

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
   * Internal: tracks whether input is currently focused
   * @private
   */
  @state()
  private _focused = false;

  /**
   * Internal: unique ID for label/input association (generated once)
   * @private
   */
  @state()
  private _inputId = `sando-input-${Math.random().toString(36).substring(2, 11)}`;

  /**
   * Visual style variant of the input
   * @default 'filled'
   */
  @property({ reflect: true })
  variant: InputVariant = 'filled';

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

  /**
   * Name of the input (for form submission)
   */
  @property({ reflect: true })
  name?: string;

  /**
   * Autocomplete attribute for browser autofill
   */
  @property({ reflect: true })
  autocomplete?: string;

  static styles = [
    resetStyles,
    tokenStyles,
    css`
      :host {
        display: inline-block;
        width: 100%;
        font-family: var(--sando-input-fontFamily);
        line-height: var(--sando-input-lineHeight);
      }

      /* Label styles */
      .label {
        display: block;
        margin-bottom: var(--sando-input-label-marginBottom);
        color: var(--sando-input-label-textColor-default);
        font-size: var(--sando-input-label-fontSize);
        font-weight: var(--sando-input-label-fontWeight);
      }

      :host([disabled]) .label {
        color: var(--sando-input-label-textColor-disabled);
      }

      .required-indicator {
        color: var(--sando-input-required-textColor);
      }

      /* Input wrapper styles - outlined variant (default) */
      .input-wrapper {
        display: flex;
        align-items: center;
        gap: var(--sando-input-gap);
        border: var(--sando-input-borderWidth) solid var(--sando-input-outlined-borderColor-default);
        border-radius: var(--sando-input-borderRadius);
        background: var(--sando-input-outlined-backgroundColor-default);
        transition-property: border-color, background-color, box-shadow;
        transition-duration: var(--sando-input-transition-duration);
        transition-timing-function: var(--sando-input-transition-timing);
      }

      /* Size variants */
      :host([size='small']) .input-wrapper {
        padding-inline: var(--sando-input-size-small-paddingInline);
        padding-block: var(--sando-input-size-small-paddingBlock);
        min-height: var(--sando-input-size-small-minHeight);
      }

      :host([size='small']) input {
        font-size: var(--sando-input-size-small-fontSize);
      }

      :host([size='medium']) .input-wrapper,
      .input-wrapper {
        padding-inline: var(--sando-input-size-medium-paddingInline);
        padding-block: var(--sando-input-size-medium-paddingBlock);
        min-height: var(--sando-input-size-medium-minHeight);
      }

      :host([size='medium']) input,
      input {
        font-size: var(--sando-input-size-medium-fontSize);
      }

      :host([size='large']) .input-wrapper {
        padding-inline: var(--sando-input-size-large-paddingInline);
        padding-block: var(--sando-input-size-large-paddingBlock);
        min-height: var(--sando-input-size-large-minHeight);
      }

      :host([size='large']) input {
        font-size: var(--sando-input-size-large-fontSize);
      }

      /* Filled variant */
      :host([variant='filled']) .input-wrapper {
        background: var(--sando-input-filled-backgroundColor-default);
        border-color: var(--sando-input-filled-borderColor-default);
      }

      :host([variant='filled']) .input-wrapper:hover:not(.disabled) {
        background: var(--sando-input-filled-backgroundColor-hover);
        border-color: var(--sando-input-filled-borderColor-hover);
      }

      /* Hover state - outlined */
      :host([variant='outlined']) .input-wrapper:hover:not(.disabled):not(.error),
      .input-wrapper:hover:not(.disabled):not(.error) {
        border-color: var(--sando-input-outlined-borderColor-hover);
      }

      /* Focus state - outlined */
      :host([variant='outlined']) .input-wrapper.focused,
      .input-wrapper.focused {
        border-color: var(--sando-input-outlined-borderColor-focus);
        outline: var(--sando-input-focusOutlineWidth) solid var(--sando-input-focusOutlineColor);
        outline-offset: var(--sando-input-focusOutlineOffset);
      }

      /* Focus state - filled */
      :host([variant='filled']) .input-wrapper.focused {
        border-color: var(--sando-input-filled-borderColor-focus);
        outline: var(--sando-input-focusOutlineWidth) solid var(--sando-input-focusOutlineColor);
        outline-offset: var(--sando-input-focusOutlineOffset);
      }

      /* Error state - outlined */
      :host([variant='outlined']) .input-wrapper.error,
      .input-wrapper.error {
        border-color: var(--sando-input-outlined-borderColor-error);
      }

      /* Error state - filled */
      :host([variant='filled']) .input-wrapper.error {
        border-color: var(--sando-input-filled-borderColor-error);
      }

      /* Disabled state - outlined */
      :host([variant='outlined']) .input-wrapper.disabled,
      .input-wrapper.disabled {
        background: var(--sando-input-outlined-backgroundColor-disabled);
        border-color: var(--sando-input-outlined-borderColor-disabled);
        cursor: not-allowed;
      }

      /* Disabled state - filled */
      :host([variant='filled']) .input-wrapper.disabled {
        background: var(--sando-input-filled-backgroundColor-disabled);
        border-color: var(--sando-input-filled-borderColor-disabled);
        cursor: not-allowed;
      }

      /* Native input element */
      input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        min-width: 0;
        color: var(--sando-input-outlined-textColor-default);
      }

      input::placeholder {
        color: var(--sando-input-outlined-textColor-placeholder);
      }

      :host([variant='filled']) input {
        color: var(--sando-input-filled-textColor-default);
      }

      :host([variant='filled']) input::placeholder {
        color: var(--sando-input-filled-textColor-placeholder);
      }

      input:disabled {
        cursor: not-allowed;
        color: var(--sando-input-outlined-textColor-disabled);
      }

      :host([variant='filled']) input:disabled {
        color: var(--sando-input-filled-textColor-disabled);
      }

      /* Helper text */
      .helper-text {
        margin-top: var(--sando-input-helperText-marginTop);
        color: var(--sando-input-helperText-textColor-default);
        font-size: var(--sando-input-helperText-fontSize);
      }

      /* Error text */
      .error-text {
        margin-top: var(--sando-input-errorText-marginTop);
        color: var(--sando-input-errorText-textColor);
        font-size: var(--sando-input-errorText-fontSize);
      }
    `
  ];

  /**
   * Lifecycle: Called when component is added to DOM
   */
  connectedCallback(): void {
    super.connectedCallback();

    // Find parent form and listen for reset events
    this._attachFormListeners();
  }

  /**
   * Lifecycle: Called when component is removed from DOM
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();

    // Cleanup form listeners
    this._detachFormListeners();
  }

  /**
   * Lifecycle: Called when properties change
   * Syncs component value with native input
   */
  protected updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('value') && this._inputElement) {
      // Sync value to native input only if different
      if (this._inputElement.value !== this.value) {
        this._inputElement.value = this.value;
      }
    }
  }

  /**
   * Attach form reset listener
   * @private
   */
  private _attachFormListeners(): void {
    const form = this.closest('form');
    if (form) {
      form.addEventListener('reset', this._handleFormReset);
    }
  }

  /**
   * Detach form reset listener
   * @private
   */
  private _detachFormListeners(): void {
    const form = this.closest('form');
    if (form) {
      form.removeEventListener('reset', this._handleFormReset);
    }
  }

  /**
   * Handle form reset event
   * @private
   */
  private _handleFormReset = (): void => {
    // Reset to empty string (native input behavior)
    this.value = '';
    this._touched = false;
    this.error = false;
  };

  /**
   * Handle input event
   * Updates value property and re-dispatches event for composition
   * @private
   */
  private _handleInput = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const oldValue = this.value;
    this.value = target.value;

    // Only dispatch if value actually changed (optimization)
    if (oldValue !== this.value) {
      // Event already bubbles from native input, just ensure it crosses shadow boundary
      this.dispatchEvent(
        new Event('input', {
          bubbles: true,
          composed: true
        })
      );
    }
  };

  /**
   * Handle change event (fired on blur with changed value)
   * Re-dispatches with custom event detail
   * @private
   */
  private _handleChange = (e: Event): void => {
    const target = e.target as HTMLInputElement;

    // Dispatch custom event with detail
    this.dispatchEvent(
      new CustomEvent<InputChangeEventDetail>('change', {
        detail: { value: target.value },
        bubbles: true,
        composed: true
      })
    );
  };

  /**
   * Handle focus event
   * Tracks focus state and interaction state
   * @private
   */
  private _handleFocus = (): void => {
    this._touched = true;
    this._focused = true;

    // Re-dispatch to cross shadow boundary
    this.dispatchEvent(
      new FocusEvent('focus', {
        bubbles: true,
        composed: true
      })
    );
  };

  /**
   * Handle blur event
   * Clears focus state
   * @private
   */
  private _handleBlur = (): void => {
    this._focused = false;

    // Re-dispatch to cross shadow boundary
    this.dispatchEvent(
      new FocusEvent('blur', {
        bubbles: true,
        composed: true
      })
    );
  };

  /**
   * Get CSS classes for input wrapper
   * Uses computed state flags for dynamic styling
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

    if (this._focused) {
      classes.push('focused');
    }

    if (this._touched) {
      classes.push('touched');
    }

    return classes.join(' ');
  }

  render() {
    const hasHelperText = this.helperText && !this.error;
    const hasErrorText = this.errorText && this.error;
    const describedBy = hasHelperText || hasErrorText ? `${this._inputId}-description` : undefined;

    return html`
      ${this.label
        ? html`
            <label class="label" for="${this._inputId}">
              ${this.label} ${this.required ? html`<span class="required-indicator">*</span>` : ''}
            </label>
          `
        : ''}

      <div class="${this._getWrapperClasses()}">
        <slot name="prefix"></slot>

        <input
          id="${this._inputId}"
          name="${this.name || ''}"
          type="${this.type}"
          .value="${this.value}"
          placeholder="${this.placeholder || ''}"
          autocomplete="${this.autocomplete || ''}"
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
        ? html`<div id="${this._inputId}-description" class="helper-text">${this.helperText}</div>`
        : ''}
      ${hasErrorText
        ? html`<div id="${this._inputId}-description" class="error-text" role="alert">
            ${this.errorText}
          </div>`
        : ''}
    `;
  }

  /**
   * Public API: Focus the input
   */
  override focus(): void {
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

  /**
   * Public API: Check validity of input
   * Delegates to native input validation API
   */
  checkValidity(): boolean {
    return this._inputElement?.checkValidity() ?? true;
  }

  /**
   * Public API: Report validity with browser UI
   * Delegates to native input validation API
   */
  reportValidity(): boolean {
    return this._inputElement?.reportValidity() ?? true;
  }

  /**
   * Public API: Set custom validity message
   * Delegates to native input validation API
   */
  setCustomValidity(message: string): void {
    this._inputElement?.setCustomValidity(message);
  }

  /**
   * Public API: Get validity state
   * Delegates to native input validation API
   */
  get validity(): ValidityState | undefined {
    return this._inputElement?.validity;
  }

  /**
   * Public API: Get validation message
   * Delegates to native input validation API
   */
  get validationMessage(): string {
    return this._inputElement?.validationMessage ?? '';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-input': SandoInput;
  }
}
