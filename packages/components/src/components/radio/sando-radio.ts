/**
 * Sando Radio Component
 *
 * A fully accessible radio button component built with Lit following industry standards.
 * Supports checked and disabled states with multiple variants and sizes.
 * Radio buttons with the same `name` attribute form a mutually exclusive group.
 *
 * @element sando-radio
 *
 * @slot - Label content (alternative to label prop)
 *
 * @fires sando-change - Fired when radio is selected (only fires on selection, not deselection)
 *
 * @cssprop --sando-radio-solid-backgroundColor-default - Background color (solid variant, unchecked)
 * @cssprop --sando-radio-solid-backgroundColor-checked - Background color (solid variant, checked)
 * @cssprop --sando-radio-solid-borderColor-default - Border color (solid variant, default state)
 * @cssprop --sando-radio-solid-dotColor-default - Dot color (solid variant)
 * @cssprop --sando-radio-size-md-boxSize - Radio box size (medium)
 * @cssprop --sando-radio-size-md-dotSize - Dot size (medium)
 * @cssprop --sando-radio-focusOutlineColor - Focus outline color
 * @cssprop --sando-radio-transition-duration - Transition duration
 *
 * @example Basic usage
 * ```html
 * <sando-radio name="option" value="a" label="Option A"></sando-radio>
 * <sando-radio name="option" value="b" label="Option B"></sando-radio>
 * ```
 *
 * @example With slot for label
 * ```html
 * <sando-radio name="terms" value="agree">
 *   I agree to the <a href="/terms">Terms of Service</a>
 * </sando-radio>
 * ```
 *
 * @example Controlled checked state
 * ```html
 * <sando-radio checked name="default" value="selected" label="Pre-selected option"></sando-radio>
 * ```
 *
 * @example With error state
 * ```html
 * <sando-radio error errorText="Please select an option" name="required" value="a" label="Required option"></sando-radio>
 * ```
 *
 * @example Different sizes
 * ```html
 * <sando-radio size="sm" name="size" value="sm" label="Small"></sando-radio>
 * <sando-radio size="md" name="size" value="md" label="Medium"></sando-radio>
 * <sando-radio size="lg" name="size" value="lg" label="Large"></sando-radio>
 * ```
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import type { RadioVariant, RadioSize, RadioChangeEventDetail } from './sando-radio.types.js';

import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, variantStyles, sizeStyles, stateStyles } from './styles/index.js';

@customElement('sando-radio')
export class SandoRadio extends FlavorableMixin(LitElement) {
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
    stateStyles // Checked, disabled, error
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
  private _inputId = `sando-radio-${Math.random().toString(36).substring(2, 11)}`;

  /**
   * Whether the radio is checked
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Whether the radio is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the radio is required for form validation
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether the radio is in error state
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Form field name (CRITICAL: used for radio group behavior)
   * Radio buttons with the same name form a mutually exclusive group
   */
  @property({ reflect: true })
  name?: string;

  /**
   * Value when selected
   * @default 'on'
   */
  @property({ reflect: true })
  value = 'on';

  /**
   * Visual variant of the radio
   * @default 'solid'
   */
  @property({ reflect: true })
  variant: RadioVariant = 'solid';

  /**
   * Size variant of the radio
   * @default 'md'
   */
  @property({ reflect: true })
  size: RadioSize = 'md';

  /**
   * Label text (alternative to slot)
   */
  @property({ reflect: true })
  label?: string;

  /**
   * Helper text displayed below the radio
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
    this.error = false;
  };

  /**
   * Handle native input change event
   * This is the ONLY handler for state changes - triggered by label click or direct input click
   * Radio buttons only fire on selection (when being checked), not on deselection
   * @private
   */
  private _handleInputChange = (e: Event): void => {
    if (this.disabled) return;

    const target = e.target as HTMLInputElement;

    // Only update if becoming checked (radio buttons only fire change when selected)
    if (target.checked) {
      this.checked = true;
      this._emitChangeEvent();
    }
  };

  /**
   * Handle keyboard events for accessibility
   * Supports Space and Enter key activation
   * Note: Arrow key navigation is handled by the browser for native radio groups
   * @private
   */
  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled) return;

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.select();
    }
  };

  /**
   * Emit custom change event
   * @private
   */
  private _emitChangeEvent(): void {
    this.dispatchEvent(
      new CustomEvent<RadioChangeEventDetail>('sando-change', {
        detail: {
          checked: this.checked,
          value: this.value
        },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    const hasLabel = this.label || this.querySelector('[slot=""]') !== null;
    const hasHelperText = this.helperText && !this.error;
    const hasErrorText = this.errorText && this.error;
    const describedBy = hasHelperText || hasErrorText ? `${this._inputId}-description` : undefined;

    return html`
      <div class="radio-wrapper">
        <label class="radio-container" for=${this._inputId} @keydown=${this._handleKeyDown}>
          <!-- Hidden native input for form participation and accessibility -->
          <input
            type="radio"
            class="native-input"
            id=${this._inputId}
            name=${this.name || nothing}
            .value=${this.value}
            .checked=${this.checked}
            ?disabled=${this.disabled}
            ?required=${this.required}
            aria-checked=${this.checked ? 'true' : 'false'}
            aria-invalid=${this.error ? 'true' : 'false'}
            aria-describedby=${describedBy || nothing}
            @change=${this._handleInputChange}
          />

          <!-- Custom visual radio -->
          <span class="radio-box" role="presentation">
            <span class="radio-dot" aria-hidden="true"></span>
          </span>

          <!-- Label text -->
          ${hasLabel
            ? html`
                <span class="radio-label">
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
              <div id="${this._inputId}-description" class="radio-description">
                <span class="helper-text">${this.helperText}</span>
              </div>
            `
          : nothing}
        ${hasErrorText
          ? html`
              <div id="${this._inputId}-description" class="radio-description">
                <span class="error-text" role="alert">${this.errorText}</span>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  /**
   * Public API: Focus the radio
   */
  override focus(): void {
    this._inputElement?.focus();
  }

  /**
   * Public API: Blur the radio
   */
  blur(): void {
    this._inputElement?.blur();
  }

  /**
   * Public API: Select the radio (set checked to true)
   * Unlike checkbox toggle(), radio can only be selected, not deselected
   */
  select(): void {
    if (!this.disabled && !this.checked) {
      this.checked = true;
      this._emitChangeEvent();
    }
  }

  /**
   * Public API: Check validity of radio
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
    'sando-radio': SandoRadio;
  }
}
