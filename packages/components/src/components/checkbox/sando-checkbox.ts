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
 * <sando-checkbox size="small" label="Small"></sando-checkbox>
 * <sando-checkbox size="medium" label="Medium"></sando-checkbox>
 * <sando-checkbox size="large" label="Large"></sando-checkbox>
 * ```
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import type {
  CheckboxVariant,
  CheckboxSize,
  CheckboxChangeEventDetail
} from './sando-checkbox.types.js';

import { FlavorableMixin } from '../../mixins/index.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, variantStyles, sizeStyles, stateStyles } from './styles/index.js';

// Import sando-icon for checkmark and indeterminate icons
import '../icon/sando-icon.js';

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
    tokenStyles, // Design tokens (Ingredients, Flavors, Recipes)
    baseStyles, // Reset, layout, typography, focus
    variantStyles, // Solid, outline
    sizeStyles, // Small, medium, large
    stateStyles // Checked, indeterminate, disabled, error
  ];

  /**
   * Reference to the native input element
   * @private
   */
  @query('input')
  private _inputElement!: HTMLInputElement;

  /**
   * Internal: unique ID for label/input association (generated once)
   * @private
   */
  @state()
  private _inputId = `sando-checkbox-${Math.random().toString(36).substring(2, 11)}`;

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
   * @default 'medium'
   */
  @property({ reflect: true })
  size: CheckboxSize = 'medium';

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
    this.checked = false;
    this.indeterminate = false;
    this.error = false;
  };

  /**
   * Handle native input change event
   * This is the ONLY handler for state changes - triggered by label click or direct input click
   * @private
   */
  private _handleInputChange = (e: Event): void => {
    if (this.disabled) return;

    const target = e.target as HTMLInputElement;

    // Clear indeterminate on user interaction
    this.indeterminate = false;
    this.checked = target.checked;

    this._emitChangeEvent();
  };

  /**
   * Handle keyboard events for accessibility
   * Supports Space and Enter key activation
   * @private
   */
  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled) return;

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.toggle();
    }
  };

  /**
   * Emit custom change event
   * @private
   */
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

  /**
   * Render checkmark SVG icon
   * @private
   */
  private _renderCheckmark() {
    return html`
      <span class="checkbox-icon checkmark" aria-hidden="true">
        <sando-icon name="check" decorative inherit-color></sando-icon>
      </span>
    `;
  }

  /**
   * Render indeterminate SVG icon (horizontal line)
   * @private
   */
  private _renderIndeterminate() {
    return html`
      <span class="checkbox-icon indeterminate" aria-hidden="true">
        <sando-icon name="minus" decorative inherit-color></sando-icon>
      </span>
    `;
  }

  render() {
    const hasLabel = this.label || this.querySelector('[slot=""]') !== null;
    const hasHelperText = this.helperText && !this.error;
    const hasErrorText = this.errorText && this.error;
    const describedBy = hasHelperText || hasErrorText ? `${this._inputId}-description` : undefined;

    // Determine aria-checked value
    const ariaChecked = this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false';

    return html`
      <div class="checkbox-wrapper">
        <label class="checkbox-container" for=${this._inputId} @keydown=${this._handleKeyDown}>
          <!-- Hidden native input for form participation and accessibility -->
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
          />

          <!-- Custom visual checkbox -->
          <span class="checkbox-box" role="presentation">
            ${this._renderCheckmark()} ${this._renderIndeterminate()}
          </span>

          <!-- Label text -->
          ${hasLabel
            ? html`
                <span class="checkbox-label">
                  ${this.label || ''}<slot></slot>${this.required
                    ? html`<span class="required-indicator" aria-hidden="true">*</span>`
                    : nothing}
                </span>
              `
            : nothing}
        </label>

        <!-- Helper/Error text -->
        ${hasHelperText
          ? html`
              <div id="${this._inputId}-description" class="checkbox-description">
                <span class="helper-text">${this.helperText}</span>
              </div>
            `
          : nothing}
        ${hasErrorText
          ? html`
              <div id="${this._inputId}-description" class="checkbox-description">
                <span class="error-text" role="alert">${this.errorText}</span>
              </div>
            `
          : nothing}
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
    'sando-checkbox': SandoCheckbox;
  }
}
