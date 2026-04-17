import { LitElement, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import type {
  InputChangeEventDetail,
  InputSize,
  InputType,
  InputVariant,
  SandoInputProps
} from './sando-input.types.js';

import { FlavorableMixin } from '../../mixins/flavorable.js';
import { FormResetMixin } from '../../mixins/form-reset.js';
import { FocusTrackMixin } from '../../mixins/focus-track.js';
import { FormFieldMixin } from '../../mixins/form-field.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, variantStyles, sizeStyles, stateStyles } from './styles/index.js';

// Import sando-help-text for helper/error text rendering
import '../help-text/sando-help-text.js';

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
 * @cssprop --sando-input-size-sm-paddingInline - Horizontal padding (small size)
 * @cssprop --sando-input-size-sm-paddingBlock - Vertical padding (small size)
 * @cssprop --sando-input-size-sm-fontSize - Font size (small size)
 * @cssprop --sando-input-size-sm-minHeight - Minimum height (small size)
 * @cssprop --sando-input-size-md-paddingInline - Horizontal padding (medium size)
 * @cssprop --sando-input-size-md-paddingBlock - Vertical padding (medium size)
 * @cssprop --sando-input-size-md-fontSize - Font size (medium size)
 * @cssprop --sando-input-size-md-minHeight - Minimum height (medium size)
 * @cssprop --sando-input-size-lg-paddingInline - Horizontal padding (large size)
 * @cssprop --sando-input-size-lg-paddingBlock - Vertical padding (large size)
 * @cssprop --sando-input-size-lg-fontSize - Font size (large size)
 * @cssprop --sando-input-size-lg-minHeight - Minimum height (large size)
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
export class SandoInput
  extends FormFieldMixin(FormResetMixin(FocusTrackMixin(FlavorableMixin(LitElement))))
  implements SandoInputProps
{
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

  protected override get _componentPrefix(): string {
    return 'sando-input';
  }

  /**
   * Visual style variant of the input
   * @default 'filled'
   */
  @property({ reflect: true })
  variant: InputVariant = 'filled';

  /**
   * Size of the input
   * @default 'md'
   */
  @property({ reflect: true })
  size: InputSize = 'md';

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

  static styles = [resetStyles, tokenStyles, baseStyles, variantStyles, sizeStyles, stateStyles];

  /**
   * Lifecycle: Called when properties change
   * Syncs component value with native input
   */
  protected override updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('value') && this._inputElement) {
      // Sync value to native input only if different
      if (this._inputElement.value !== this.value) {
        this._inputElement.value = this.value;
      }
    }
  }

  /**
   * Handle form reset event — component-specific reset logic
   * @protected
   */
  protected override _handleFormReset = (): void => {
    this.value = '';
    this._touched = false;
    this.error = false;
  };

  /**
   * Handle input event
   * @private
   */
  private _handleInput = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const oldValue = this.value;
    this.value = target.value;

    if (oldValue !== this.value) {
      this.dispatchEvent(
        new Event('input', {
          bubbles: true,
          composed: true
        })
      );
    }
  };

  /**
   * Handle change event
   * @private
   */
  private _handleChange = (e: Event): void => {
    const target = e.target as HTMLInputElement;

    this.dispatchEvent(
      new CustomEvent<InputChangeEventDetail>('change', {
        detail: { value: target.value },
        bubbles: true,
        composed: true
      })
    );
  };

  /**
   * Handle focus event — extends mixin with _touched tracking and event dispatch
   * @protected
   */
  protected override _handleFocus = (): void => {
    this._touched = true;
    this._focused = true;

    this.dispatchEvent(
      new FocusEvent('focus', {
        bubbles: true,
        composed: true
      })
    );
  };

  /**
   * Handle blur event — extends mixin with event dispatch
   * @protected
   */
  protected override _handleBlur = (): void => {
    this._focused = false;

    this.dispatchEvent(
      new FocusEvent('blur', {
        bubbles: true,
        composed: true
      })
    );
  };

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

    if (this._focused) {
      classes.push('focused');
    }

    if (this._touched) {
      classes.push('touched');
    }

    return classes.join(' ');
  }

  render() {
    const { describedBy } = this._getHelpTextContext();

    return html`
      ${this.label
        ? html`
            <label class="label" for="${this._inputId}" ?data-required=${this.required}>
              ${this.label}
            </label>
          `
        : nothing}

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

      ${this._renderHelpText()}
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
   */
  checkValidity(): boolean {
    return this._inputElement?.checkValidity() ?? true;
  }

  /**
   * Public API: Report validity with browser UI
   */
  reportValidity(): boolean {
    return this._inputElement?.reportValidity() ?? true;
  }

  /**
   * Public API: Set custom validity message
   */
  setCustomValidity(message: string): void {
    this._inputElement?.setCustomValidity(message);
  }

  /**
   * Public API: Get validity state
   */
  get validity(): ValidityState | undefined {
    return this._inputElement?.validity;
  }

  /**
   * Public API: Get validation message
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
