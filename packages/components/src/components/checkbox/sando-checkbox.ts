/**
 * Sando Checkbox Component
 *
 * A fully accessible checkbox component built with Lit following industry standards.
 * Supports checked, indeterminate, and disabled states with multiple variants and sizes.
 *
 * @element sando-checkbox
 *
 * @slot - Label content (alternative to label prop)
 *
 * @fires sando-change - Fired when checkbox state changes
 *
 * @cssprop --sando-checkbox-solid-backgroundColor-default - Background color (solid variant, unchecked)
 * @cssprop --sando-checkbox-solid-backgroundColor-checked - Background color (solid variant, checked)
 * @cssprop --sando-checkbox-solid-borderColor-default - Border color (solid variant, default state)
 * @cssprop --sando-checkbox-solid-checkmarkColor-default - Checkmark color (solid variant)
 * @cssprop --sando-checkbox-size-medium-boxSize - Checkbox box size (medium)
 * @cssprop --sando-checkbox-size-medium-labelFontSize - Label font size (medium)
 * @cssprop --sando-checkbox-size-medium-gap - Gap between box and label (medium)
 * @cssprop --sando-checkbox-focusOutlineColor - Focus outline color
 * @cssprop --sando-checkbox-transition-duration - Transition duration
 *
 * @example Basic usage
 * ```html
 * <sando-checkbox label="Accept terms and conditions"></sando-checkbox>
 * ```
 *
 * @example With slot for label
 * ```html
 * <sando-checkbox>
 *   I agree to the <a href="/terms">Terms of Service</a>
 * </sando-checkbox>
 * ```
 *
 * @example Controlled checked state
 * ```html
 * <sando-checkbox checked label="Selected option"></sando-checkbox>
 * ```
 *
 * @example Indeterminate state (partial selection)
 * ```html
 * <sando-checkbox indeterminate label="Select all"></sando-checkbox>
 * ```
 *
 * @example With error state
 * ```html
 * <sando-checkbox error errorText="This field is required" label="Required field"></sando-checkbox>
 * ```
 *
 * @example Different sizes
 * ```html
 * <sando-checkbox size="sm" label="Small"></sando-checkbox>
 * <sando-checkbox size="md" label="Medium"></sando-checkbox>
 * <sando-checkbox size="lg" label="Large"></sando-checkbox>
 * ```
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import type {
  CheckboxVariant,
  CheckboxSize,
  CheckboxChangeEventDetail
} from './sando-checkbox.types.js';

import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, variantStyles, sizeStyles, stateStyles } from './styles/index.js';

// Import sando-icon for checkmark and indeterminate icons
import '../icon/sando-icon.js';

// Import sando-help-text for helper/error text rendering
import '../help-text/sando-help-text.js';

@customElement('sando-checkbox')
export class SandoCheckbox extends FlavorableMixin(LitElement) {
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
    variantStyles, // Solid, outline
    sizeStyles, // Small, medium, large
    stateStyles // Checked, indeterminate, disabled, error
  ];

  @query('input')
  private _inputElement!: HTMLInputElement;

  @state()
  private _inputId = `sando-checkbox-${Math.random().toString(36).substring(2, 11)}`;

  @state()
  private _focused = false;

  /**
   * Whether the checkbox is checked
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Whether the checkbox is in indeterminate state (partial selection)
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * Whether the checkbox is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the checkbox is required for form validation
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether the checkbox is in error state
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Form field name
   */
  @property({ reflect: true })
  name?: string;

  /**
   * Value when checked
   * @default 'on'
   */
  @property({ reflect: true })
  value = 'on';

  /**
   * Visual variant of the checkbox
   * @default 'solid'
   */
  @property({ reflect: true })
  variant: CheckboxVariant = 'solid';

  /**
   * Size variant of the checkbox
   * @default 'md'
   */
  @property({ reflect: true })
  size: CheckboxSize = 'md';

  /**
   * Label text (alternative to slot)
   */
  @property({ reflect: true })
  label?: string;

  /**
   * Helper text displayed below the checkbox
   */
  @property({ reflect: true, attribute: 'helper-text' })
  helperText?: string;

  /**
   * Error message displayed when error=true
   */
  @property({ reflect: true, attribute: 'error-text' })
  errorText?: string;

  /**
   * Whether to reserve space for error messages to prevent layout shift.
   * When true, a minimum height is maintained even when no message is shown.
   * @default true
   */
  @property({ type: Boolean, attribute: 'reserve-error-space' })
  reserveErrorSpace = true;

  /**
   * Lifecycle: Called when component is added to DOM
   */
  connectedCallback(): void {
    super.connectedCallback();
    this._attachFormListeners();
  }

  /**
   * Lifecycle: Called when component is removed from DOM
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._detachFormListeners();
  }

  /**
   * Lifecycle: Called when properties change
   * Syncs indeterminate state with native input
   */
  protected updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    // Sync indeterminate state to native input (can't be set via attribute)
    if (changedProperties.has('indeterminate') && this._inputElement) {
      this._inputElement.indeterminate = this.indeterminate;
    }
  }

  private _attachFormListeners(): void {
    const form = this.closest('form');
    if (form) {
      form.addEventListener('reset', this._handleFormReset);
    }
  }

  private _detachFormListeners(): void {
    const form = this.closest('form');
    if (form) {
      form.removeEventListener('reset', this._handleFormReset);
    }
  }

  private _handleFormReset = (): void => {
    this.checked = false;
    this.indeterminate = false;
    this.error = false;
  };

  private _handleInputChange = (e: Event): void => {
    if (this.disabled) return;

    const target = e.target as HTMLInputElement;

    // Clear indeterminate on user interaction
    this.indeterminate = false;
    this.checked = target.checked;

    this._emitChangeEvent();
  };

  /** Handle Space and Enter keys for toggle activation. */
  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (!this.disabled && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      this.toggle();
    }
  };

  private _handleFocus = (): void => {
    this._focused = true;
  };

  private _handleBlur = (): void => {
    this._focused = false;
  };

  private _emitChangeEvent(): void {
    this.dispatchEvent(
      new CustomEvent<CheckboxChangeEventDetail>('sando-change', {
        detail: {
          checked: this.checked,
          indeterminate: this.indeterminate
        },
        bubbles: true,
        composed: true
      })
    );
  }

  private _renderCheckmark() {
    return html`
      <span class="checkbox-icon checkmark" aria-hidden="true">
        <sando-icon name="check" decorative inherit-color></sando-icon>
      </span>
    `;
  }

  private _renderIndeterminate() {
    return html`
      <span class="checkbox-icon indeterminate" aria-hidden="true">
        <sando-icon name="minus" decorative inherit-color></sando-icon>
      </span>
    `;
  }

  render() {
    // Determine text content and whether we have any message to show
    const hasHelperText = Boolean(this.helperText && !this.error);
    const hasErrorText = Boolean(this.errorText && this.error);
    const hasMessage = hasHelperText || hasErrorText;
    const messageText = hasErrorText ? this.errorText : this.helperText;
    const describedBy = hasMessage ? `${this._inputId}-description` : undefined;
    const ariaChecked = this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false';

    const boxClasses = classMap({
      'checkbox-box': true,
      focused: this._focused
    });

    return html`
      <div class="checkbox-wrapper">
        <label class="checkbox-container" for=${this._inputId} @keydown=${this._handleKeyDown}>
          <input
            type="checkbox"
            class="native-input"
            id=${this._inputId}
            name=${this.name || nothing}
            .value=${this.value}
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-checked=${ariaChecked}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-describedby=${describedBy || nothing}
            @change=${this._handleInputChange}
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
          />

          <span class=${boxClasses} role="presentation">
            ${this._renderCheckmark()} ${this._renderIndeterminate()}
          </span>

          <span class="checkbox-label" ?data-required=${this.required}>
            ${this.label || ''}<slot></slot>
          </span>
        </label>

        <sando-help-text
          id="${this._inputId}-description"
          variant=${this.error ? 'error' : 'default'}
          ?show-icon=${this.error}
          reserve-space=${this.reserveErrorSpace ? 'true' : 'false'}
        >
          ${messageText || nothing}
        </sando-help-text>
      </div>
    `;
  }

  /**
   * Public API: Focus the checkbox
   */
  override focus(): void {
    this._inputElement?.focus();
  }

  /**
   * Public API: Blur the checkbox
   */
  blur(): void {
    this._inputElement?.blur();
  }

  /**
   * Public API: Toggle the checkbox state
   */
  toggle(): void {
    if (!this.disabled) {
      this.indeterminate = false;
      this.checked = !this.checked;
      this._emitChangeEvent();
    }
  }

  /**
   * Public API: Check validity of checkbox
   * Validates required constraint and delegates to native input
   */
  checkValidity(): boolean {
    // Check required constraint manually (native input is not in a form context)
    if (this.required && !this.checked) {
      return false;
    }
    return this._inputElement?.checkValidity() ?? true;
  }

  /**
   * Public API: Report validity with visual feedback
   * Sets error state if invalid
   */
  reportValidity(): boolean {
    const isValid = this.checkValidity();
    if (!isValid) {
      this.error = true;
    }
    return isValid;
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
    'sando-checkbox': SandoCheckbox;
  }
}
