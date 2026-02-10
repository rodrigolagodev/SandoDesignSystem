/**
 * Sando Switch Component
 *
 * A fully accessible toggle switch component built with Lit following industry standards.
 * Supports on/off states with multiple variants and sizes.
 *
 * The switch uses role="switch" for proper ARIA semantics, distinguishing it from
 * a checkbox which uses role="checkbox".
 *
 * @element sando-switch
 *
 * @slot - Label content (alternative to label prop)
 *
 * @fires sando-change - Fired when switch state changes
 *
 * @cssprop --sando-switch-solid-track-backgroundColor-default - Track background color (solid variant, off)
 * @cssprop --sando-switch-solid-track-backgroundColor-checked - Track background color (solid variant, on)
 * @cssprop --sando-switch-solid-thumb-backgroundColor-default - Thumb color (solid variant, off)
 * @cssprop --sando-switch-solid-thumb-backgroundColor-checked - Thumb color (solid variant, on)
 * @cssprop --sando-switch-size-md-trackWidth - Track width (medium)
 * @cssprop --sando-switch-size-md-trackHeight - Track height (medium)
 * @cssprop --sando-switch-size-md-thumbSize - Thumb diameter (medium)
 * @cssprop --sando-switch-borderRadius - Track border radius (full pill shape)
 * @cssprop --sando-switch-focusOutlineColor - Focus outline color
 * @cssprop --sando-switch-transition-duration - Transition duration
 *
 * @example Basic usage
 * ```html
 * <sando-switch label="Enable notifications"></sando-switch>
 * ```
 *
 * @example With slot for label
 * ```html
 * <sando-switch>
 *   Enable <strong>dark mode</strong>
 * </sando-switch>
 * ```
 *
 * @example Controlled checked state
 * ```html
 * <sando-switch checked label="Feature enabled"></sando-switch>
 * ```
 *
 * @example With helper text
 * ```html
 * <sando-switch label="Auto-save" helperText="Save changes automatically"></sando-switch>
 * ```
 *
 * @example With error state
 * ```html
 * <sando-switch error errorText="This setting is required" label="Accept terms"></sando-switch>
 * ```
 *
 * @example Different sizes
 * ```html
 * <sando-switch size="sm" label="Small"></sando-switch>
 * <sando-switch size="md" label="Medium"></sando-switch>
 * <sando-switch size="lg" label="Large"></sando-switch>
 * ```
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import type { SwitchVariant, SwitchSize, SwitchChangeEventDetail } from './sando-switch.types.js';

import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, variantStyles, sizeStyles, stateStyles } from './styles/index.js';

@customElement('sando-switch')
export class SandoSwitch extends FlavorableMixin(LitElement) {
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

  @query('input')
  private _inputElement!: HTMLInputElement;

  @state()
  private _inputId = `sando-switch-${Math.random().toString(36).substring(2, 11)}`;

  @state()
  private _focused = false;

  /**
   * Whether the switch is checked (on)
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Whether the switch is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the switch is required for form validation
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether the switch is in error state
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
   * Visual variant of the switch
   * @default 'solid'
   */
  @property({ reflect: true })
  variant: SwitchVariant = 'solid';

  /**
   * Size variant of the switch
   * @default 'md'
   */
  @property({ reflect: true })
  size: SwitchSize = 'md';

  /**
   * Label text (alternative to slot)
   */
  @property({ reflect: true })
  label?: string;

  /**
   * Helper text displayed below the switch
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
    this.error = false;
  };

  private _handleInputChange = (e: Event): void => {
    if (this.disabled) return;

    const target = e.target as HTMLInputElement;
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
      new CustomEvent<SwitchChangeEventDetail>('sando-change', {
        detail: {
          checked: this.checked
        },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    const hasHelperText = this.helperText && !this.error;
    const hasErrorText = this.errorText && this.error;
    const describedBy = hasHelperText || hasErrorText ? `${this._inputId}-description` : undefined;

    const trackClasses = classMap({
      'switch-track': true,
      focused: this._focused
    });

    return html`
      <div class="switch-wrapper">
        <label class="switch-container" for=${this._inputId} @keydown=${this._handleKeyDown}>
          <input
            type="checkbox"
            role="switch"
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
            @focus=${this._handleFocus}
            @blur=${this._handleBlur}
          />

          <span class=${trackClasses} role="presentation">
            <span class="switch-thumb"></span>
          </span>

          <span class="switch-label" ?data-required=${this.required}>
            ${this.label || ''}<slot></slot>
          </span>
        </label>

        ${hasHelperText || hasErrorText
          ? html`
              <div id="${this._inputId}-description" class="switch-description">
                ${hasErrorText
                  ? html`<span class="error-text" role="alert">${this.errorText}</span>`
                  : html`<span class="helper-text">${this.helperText}</span>`}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  /**
   * Public API: Focus the switch
   */
  override focus(): void {
    this._inputElement?.focus();
  }

  /**
   * Public API: Blur the switch
   */
  blur(): void {
    this._inputElement?.blur();
  }

  /**
   * Public API: Toggle the switch state
   */
  toggle(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this._emitChangeEvent();
    }
  }

  /**
   * Public API: Check validity of switch
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
    'sando-switch': SandoSwitch;
  }
}
