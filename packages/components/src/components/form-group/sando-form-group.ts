import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
  SandoFormGroupProps,
  FormGroupValidationChangeDetail
} from './sando-form-group.types.js';

/**
 * Sando Form Group Component
 *
 * A form group component that provides consistent layout and labeling for form controls.
 * Supports labels, helper text, error messages, and required field indicators.
 *
 * @element sando-form-group
 *
 * @slot - Default slot for form control elements (input, select, textarea, etc.)
 * @slot label - Custom label content (alternative to label prop)
 * @slot helper-text - Custom helper text content (alternative to helperText prop)
 * @slot error - Custom error message content (alternative to error prop)
 *
 * @fires focus - Fired when a child form control receives focus
 * @fires blur - Fired when a child form control loses focus
 * @fires validation-change - Fired when validation state changes
 *
 * @cssprop --sando-form-group-spacing - Spacing between label, field, and helper text
 * @cssprop --sando-form-group-label-color - Label text color
 * @cssprop --sando-form-group-helperText-color - Helper text color
 * @cssprop --sando-form-group-error-color - Error message color
 * @cssprop --sando-form-group-required-color - Required asterisk color
 *
 * @example Basic usage with label
 * ```html
 * <sando-form-group label="Email">
 *   <input type="email" />
 * </sando-form-group>
 * ```
 *
 * @example With error message
 * ```html
 * <sando-form-group label="Password" error="Password must be at least 8 characters">
 *   <input type="password" />
 * </sando-form-group>
 * ```
 *
 * @example With helper text and required
 * ```html
 * <sando-form-group
 *   label="Username"
 *   helperText="Choose a unique username"
 *   required
 * >
 *   <input type="text" />
 * </sando-form-group>
 * ```
 *
 * @example Using slots for custom content
 * ```html
 * <sando-form-group>
 *   <span slot="label">Email <em>(required)</em></span>
 *   <input type="email" />
 *   <span slot="helper-text">We'll never share your email</span>
 * </sando-form-group>
 * ```
 */
@customElement('sando-form-group')
export class SandoFormGroup extends LitElement implements SandoFormGroupProps {
  // TODO: Add Recipe tokens when ready
  // Import token styles: import { tokenStyles } from '../../styles/tokens.css.js';
  // static styles = [
  //   tokenStyles,
  //   css`
  //     :host {
  //       display: block;
  //       /* Use Recipe tokens: var(--sando-form-group-*) */
  //     }
  //   `
  // ];

  /**
   * Label text for the form field
   * @default undefined
   */
  @property({ type: String })
  label?: string;

  /**
   * Error message to display below the field
   * When set, the form group displays in error state
   * @default undefined
   */
  @property({ type: String })
  error?: string;

  /**
   * Helper text to display below the field
   * @default undefined
   */
  @property({ type: String })
  helperText?: string;

  /**
   * Whether the field is required
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Lifecycle: Called when element is added to DOM
   * Sets up event listeners for child form controls
   */
  override connectedCallback() {
    super.connectedCallback();
    this._setupEventListeners();
  }

  /**
   * Lifecycle: Called when element is removed from DOM
   * Cleanup event listeners
   */
  override disconnectedCallback() {
    super.disconnectedCallback();
    this._removeEventListeners();
  }

  /**
   * Internal: Setup event listeners for child form controls
   * @private
   */
  private _setupEventListeners() {
    // TODO: Add event delegation for focus/blur on slotted form controls
    this.addEventListener('focus', this._handleFocus, true);
    this.addEventListener('blur', this._handleBlur, true);
  }

  /**
   * Internal: Remove event listeners
   * @private
   */
  private _removeEventListeners() {
    this.removeEventListener('focus', this._handleFocus, true);
    this.removeEventListener('blur', this._handleBlur, true);
  }

  /**
   * Internal: Handle focus event from child form controls
   * @private
   */
  private _handleFocus = (event: FocusEvent) => {
    // Emit focus event
    this.dispatchEvent(
      new CustomEvent('focus', {
        detail: { originalEvent: event },
        bubbles: true,
        composed: true
      })
    );
  };

  /**
   * Internal: Handle blur event from child form controls
   * @private
   */
  private _handleBlur = (event: FocusEvent) => {
    // Emit blur event
    this.dispatchEvent(
      new CustomEvent('blur', {
        detail: { originalEvent: event },
        bubbles: true,
        composed: true
      })
    );
  };

  /**
   * Emit validation-change event
   * @private
   */
  private _emitValidationChange() {
    const detail: FormGroupValidationChangeDetail = {
      isValid: !this.error,
      errorMessage: this.error || null
    };

    this.dispatchEvent(
      new CustomEvent('validation-change', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Lifecycle: Called when properties change
   * Emit validation-change event when error state changes
   */
  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('error')) {
      this._emitValidationChange();
    }
  }

  render() {
    return html`
      <!-- TODO: Add styles and proper structure -->
      <div class="form-group">
        ${this._renderLabel()} ${this._renderField()} ${this._renderHelperOrError()}
      </div>
    `;
  }

  /**
   * Render label section (slot or prop)
   * @private
   */
  private _renderLabel() {
    const hasLabelSlot = this.querySelector('[slot="label"]');
    const hasLabel = this.label || hasLabelSlot;

    if (!hasLabel) return '';

    return html`
      <div class="form-group__label">
        <slot name="label">
          ${this.label}${this.required ? html`<span class="required">*</span>` : ''}
        </slot>
      </div>
    `;
  }

  /**
   * Render field slot
   * @private
   */
  private _renderField() {
    return html` <div class="form-group__field"><slot></slot></div> `;
  }

  /**
   * Render helper text or error message
   * Priority: error > helper text
   * @private
   */
  private _renderHelperOrError() {
    const hasErrorSlot = this.querySelector('[slot="error"]');
    const hasHelperSlot = this.querySelector('[slot="helper-text"]');

    // Error takes precedence
    if (this.error || hasErrorSlot) {
      return html`
        <div class="form-group__error" role="alert" aria-live="polite">
          <slot name="error">${this.error}</slot>
        </div>
      `;
    }

    // Show helper text if no error
    if (this.helperText || hasHelperSlot) {
      return html`
        <div class="form-group__helper-text">
          <slot name="helper-text">${this.helperText}</slot>
        </div>
      `;
    }

    return '';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-form-group': SandoFormGroup;
  }
}
