/**
 * Sando Textarea Component
 *
 * A fully accessible multi-line text input component built with Lit following
 * industry standards. Supports multiple variants, sizes, and states with
 * native form participation.
 *
 * @element sando-textarea
 *
 * @slot - Label content (alternative to label prop)
 *
 * @fires sando-input - Fired on each input (detail: { value: string })
 * @fires sando-change - Fired on blur with changed value (detail: { value: string })
 * @fires sando-focus - Fired when textarea receives focus
 * @fires sando-blur - Fired when textarea loses focus
 *
 * @cssprop --sando-textarea-outlined-backgroundColor-default - Background color (outlined variant, default)
 * @cssprop --sando-textarea-outlined-borderColor-default - Border color (outlined variant, default)
 * @cssprop --sando-textarea-outlined-borderColor-focus - Border color (outlined variant, focus)
 * @cssprop --sando-textarea-filled-backgroundColor-default - Background color (filled variant, default)
 * @cssprop --sando-textarea-size-md-paddingBlock - Padding block (medium size)
 * @cssprop --sando-textarea-size-md-paddingInline - Padding inline (medium size)
 * @cssprop --sando-textarea-borderRadius - Border radius
 * @cssprop --sando-textarea-focusOutlineColor - Focus outline color
 * @cssprop --sando-textarea-transition-duration - Transition duration
 *
 * @example Basic usage
 * ```html
 * <sando-textarea label="Description" placeholder="Enter description..."></sando-textarea>
 * ```
 *
 * @example With helper text
 * ```html
 * <sando-textarea
 *   label="Bio"
 *   helper-text="Maximum 500 characters"
 *   maxlength="500"
 * ></sando-textarea>
 * ```
 *
 * @example With error state
 * ```html
 * <sando-textarea
 *   error
 *   error-text="This field is required"
 *   label="Required field"
 * ></sando-textarea>
 * ```
 *
 * @example Different variants
 * ```html
 * <sando-textarea variant="outlined" label="Outlined"></sando-textarea>
 * <sando-textarea variant="filled" label="Filled"></sando-textarea>
 * ```
 *
 * @example Different sizes
 * ```html
 * <sando-textarea size="sm" label="Small"></sando-textarea>
 * <sando-textarea size="md" label="Medium"></sando-textarea>
 * <sando-textarea size="lg" label="Large"></sando-textarea>
 * ```
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import type {
  TextareaVariant,
  TextareaSize,
  TextareaResize,
  TextareaWrap,
  TextareaInputEventDetail,
  TextareaChangeEventDetail
} from './sando-textarea.types.js';

import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, variantStyles, sizeStyles, stateStyles } from './styles/index.js';

@customElement('sando-textarea')
export class SandoTextarea extends FlavorableMixin(LitElement) {
  /**
   * Shadow DOM focus delegation for proper keyboard navigation
   * Required per KEYBOARD_NAVIGATION.toon (KN-CR-R5)
   */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };

  /**
   * Component styles - modular CSS imports
   * Order matters for specificity
   */
  static styles = [
    resetStyles, // Universal CSS reset (box-sizing, reduced-motion, etc.)
    tokenStyles, // Design tokens (Ingredients, Flavors, Recipes)
    baseStyles, // Layout, typography, focus
    variantStyles, // Outlined, filled
    sizeStyles, // Small, medium, large
    stateStyles // Disabled, readonly, error, resize
  ];

  /**
   * Reference to the native textarea element
   * @private
   */
  @query('textarea')
  private _textareaElement!: HTMLTextAreaElement;

  /**
   * Internal: unique ID for label/textarea association (generated once)
   * @private
   */
  @state()
  private _textareaId = `sando-textarea-${Math.random().toString(36).substring(2, 11)}`;

  /**
   * Internal: tracks the last emitted value for change detection
   * @private
   */
  @state()
  private _lastEmittedValue = '';

  /**
   * Current text value
   * @default ''
   */
  @property({ type: String })
  value = '';

  /**
   * Placeholder text
   */
  @property()
  placeholder?: string;

  /**
   * Label text (alternative to slot)
   */
  @property({ reflect: true })
  label?: string;

  /**
   * Helper text displayed below the textarea
   */
  @property({ reflect: true, attribute: 'helper-text' })
  helperText?: string;

  /**
   * Error message displayed when error=true
   */
  @property({ reflect: true, attribute: 'error-text' })
  errorText?: string;

  /**
   * Form field name
   */
  @property({ reflect: true })
  name?: string;

  /**
   * Whether the textarea is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the textarea is required for form validation
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether the textarea is read-only
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Whether the textarea is in error state
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Initial number of visible text rows
   * @default 3
   */
  @property({ type: Number, reflect: true })
  rows = 3;

  /**
   * Minimum text length
   */
  @property({ type: Number, reflect: true })
  minlength?: number;

  /**
   * Maximum text length
   */
  @property({ type: Number, reflect: true })
  maxlength?: number;

  /**
   * Resize behavior
   * @default 'vertical'
   */
  @property({ reflect: true })
  resize: TextareaResize = 'vertical';

  /**
   * Autocomplete attribute
   */
  @property({ reflect: true })
  autocomplete?: string;

  /**
   * Spellcheck attribute
   * @default true
   */
  @property({ type: Boolean, reflect: true })
  spellcheck = true;

  /**
   * Text wrapping mode
   * @default 'soft'
   */
  @property({ reflect: true })
  wrap: TextareaWrap = 'soft';

  /**
   * Visual variant of the textarea
   * @default 'outlined'
   */
  @property({ reflect: true })
  variant: TextareaVariant = 'outlined';

  /**
   * Size variant of the textarea
   * @default 'md'
   */
  @property({ reflect: true })
  size: TextareaSize = 'md';

  /**
   * Lifecycle: Called when component is added to DOM
   */
  connectedCallback(): void {
    super.connectedCallback();
    this._attachFormListeners();
    this._lastEmittedValue = this.value;
  }

  /**
   * Lifecycle: Called when component is removed from DOM
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._detachFormListeners();
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
    this.value = '';
    this.error = false;
    this._lastEmittedValue = '';
  };

  /**
   * Handle native input event
   * @private
   */
  private _handleInput = (e: Event): void => {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;

    this.dispatchEvent(
      new CustomEvent<TextareaInputEventDetail>('sando-input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    );
  };

  /**
   * Handle native change event (blur with changed value)
   * @private
   */
  private _handleChange = (): void => {
    // Only emit change if value actually changed since last emit
    if (this.value !== this._lastEmittedValue) {
      this._lastEmittedValue = this.value;

      this.dispatchEvent(
        new CustomEvent<TextareaChangeEventDetail>('sando-change', {
          detail: { value: this.value },
          bubbles: true,
          composed: true
        })
      );
    }
  };

  /**
   * Handle focus event
   * @private
   */
  private _handleFocus = (): void => {
    this.dispatchEvent(
      new CustomEvent('sando-focus', {
        bubbles: true,
        composed: true
      })
    );
  };

  /**
   * Handle blur event
   * @private
   */
  private _handleBlur = (): void => {
    this._handleChange();

    this.dispatchEvent(
      new CustomEvent('sando-blur', {
        bubbles: true,
        composed: true
      })
    );
  };

  render() {
    const hasLabel = this.label || this.querySelector('[slot=""]') !== null;
    const hasHelperText = this.helperText && !this.error;
    const hasErrorText = this.errorText && this.error;
    const describedBy =
      hasHelperText || hasErrorText ? `${this._textareaId}-description` : undefined;

    return html`
      <div class="textarea-wrapper">
        <!-- Label -->
        ${hasLabel
          ? html`
              <label class="textarea-label" for=${this._textareaId}>
                ${this.label || ''}<slot></slot>${this.required
                  ? html`<span class="required-indicator" aria-hidden="true">*</span>`
                  : nothing}
              </label>
            `
          : nothing}

        <!-- Native textarea element -->
        <textarea
          class="textarea-field"
          id=${this._textareaId}
          name=${this.name || nothing}
          placeholder=${this.placeholder || nothing}
          .value=${this.value}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          rows=${this.rows}
          minlength=${this.minlength || nothing}
          maxlength=${this.maxlength || nothing}
          autocomplete=${this.autocomplete || nothing}
          .spellcheck=${this.spellcheck}
          wrap=${this.wrap}
          aria-invalid=${this.error ? 'true' : 'false'}
          aria-required=${this.required ? 'true' : 'false'}
          aria-describedby=${describedBy || nothing}
          @input=${this._handleInput}
          @focus=${this._handleFocus}
          @blur=${this._handleBlur}
        ></textarea>

        <!-- Helper/Error text -->
        ${hasHelperText
          ? html`
              <div id="${this._textareaId}-description" class="textarea-description">
                <span class="helper-text">${this.helperText}</span>
              </div>
            `
          : nothing}
        ${hasErrorText
          ? html`
              <div id="${this._textareaId}-description" class="textarea-description">
                <span class="error-text" role="alert">${this.errorText}</span>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  /**
   * Public API: Focus the textarea
   */
  override focus(): void {
    this._textareaElement?.focus();
  }

  /**
   * Public API: Blur the textarea
   */
  blur(): void {
    this._textareaElement?.blur();
  }

  /**
   * Public API: Select all text in the textarea
   */
  select(): void {
    this._textareaElement?.select();
  }

  /**
   * Public API: Set selection range in the textarea
   * @param start - Start position
   * @param end - End position
   * @param direction - Selection direction ('forward', 'backward', 'none')
   */
  setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none'): void {
    this._textareaElement?.setSelectionRange(start, end, direction);
  }

  /**
   * Public API: Check validity of textarea
   * Delegates to native textarea validation API
   */
  checkValidity(): boolean {
    return this._textareaElement?.checkValidity() ?? true;
  }

  /**
   * Public API: Report validity with browser UI
   * Delegates to native textarea validation API
   */
  reportValidity(): boolean {
    return this._textareaElement?.reportValidity() ?? true;
  }

  /**
   * Public API: Set custom validity message
   * Delegates to native textarea validation API
   */
  setCustomValidity(message: string): void {
    this._textareaElement?.setCustomValidity(message);
  }

  /**
   * Public API: Get validity state
   * Delegates to native textarea validation API
   */
  get validity(): ValidityState | undefined {
    return this._textareaElement?.validity;
  }

  /**
   * Public API: Get validation message
   * Delegates to native textarea validation API
   */
  get validationMessage(): string {
    return this._textareaElement?.validationMessage ?? '';
  }

  /**
   * Public API: Get selection start position
   */
  get selectionStart(): number | null {
    return this._textareaElement?.selectionStart ?? null;
  }

  /**
   * Public API: Get selection end position
   */
  get selectionEnd(): number | null {
    return this._textareaElement?.selectionEnd ?? null;
  }

  /**
   * Public API: Get selection direction
   */
  get selectionDirection(): 'forward' | 'backward' | 'none' | null {
    return this._textareaElement?.selectionDirection ?? null;
  }

  /**
   * Public API: Get text length
   */
  get textLength(): number {
    return this._textareaElement?.textLength ?? this.value.length;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-textarea': SandoTextarea;
  }
}
