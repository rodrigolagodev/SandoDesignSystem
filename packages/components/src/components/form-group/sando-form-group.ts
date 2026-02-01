import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
  SandoFormGroupProps,
  FormGroupValidationChangeDetail
} from './sando-form-group.types.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, labelStyles, helperStyles } from './styles/index.js';

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
 * @fires sando-focus - Fired when a child form control receives focus
 * @fires sando-blur - Fired when a child form control loses focus
 * @fires validation-change - Fired when validation state changes
 *
 * @cssprop --sando-form-group-gap - Spacing between label, field, and helper text
 * @cssprop --sando-form-group-label-fontSize - Label font size
 * @cssprop --sando-form-group-label-fontWeight - Label font weight
 * @cssprop --sando-form-group-label-textColor-default - Label text color
 * @cssprop --sando-form-group-label-textColor-disabled - Label text color when disabled
 * @cssprop --sando-form-group-helperText-fontSize - Helper text font size
 * @cssprop --sando-form-group-helperText-textColor - Helper text color
 * @cssprop --sando-form-group-error-textColor - Error message color
 * @cssprop --sando-form-group-required-textColor - Required asterisk color
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
 *   helper-text="Choose a unique username"
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
export class SandoFormGroup extends FlavorableMixin(LitElement) implements SandoFormGroupProps {
  /**
   * Component styles - modular CSS from styles directory
   */
  static styles = [tokenStyles, baseStyles, labelStyles, helperStyles];

  /**
   * Unique ID for label-input association
   * Generated once per component instance
   * @private
   */
  private _inputId = `sando-form-group-${Math.random().toString(36).substring(2, 11)}`;

  /**
   * ID for the helper text/error element for aria-describedby
   * @private
   */
  private _descriptionId = `sando-form-group-desc-${Math.random().toString(36).substring(2, 11)}`;

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
  @property({ type: String, attribute: 'helper-text' })
  helperText?: string;

  /**
   * Whether the field is required
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether the form group is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Lifecycle: Called when element is added to DOM
   * Sets up event listeners for child form controls
   * Also detects existing input ID before first render
   */
  override connectedCallback() {
    super.connectedCallback();
    this._setupEventListeners();
    // Detect existing input ID before first render to avoid update-during-update
    this._detectExistingInputId();
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
   * Lifecycle: Called after first render
   * Associate slotted inputs with label (set attributes)
   */
  override firstUpdated() {
    this._associateInputWithLabel();
  }

  /**
   * Detect existing input ID before first render
   * This prevents the need for requestUpdate during firstUpdated
   * @private
   */
  private _detectExistingInputId() {
    const formControlSelectors =
      'input, select, textarea, [role="textbox"], [role="combobox"], [role="listbox"]';
    const slottedInput = this.querySelector(formControlSelectors) as HTMLElement | null;

    if (slottedInput?.id) {
      this._inputId = slottedInput.id;
    }
  }

  /**
   * Internal: Setup event listeners for child form controls
   * @private
   */
  private _setupEventListeners() {
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
    // Only handle native focus events, not our custom ones
    if (event.target === this) return;

    this.dispatchEvent(
      new CustomEvent('sando-focus', {
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
    // Only handle native blur events, not our custom ones
    if (event.target === this) return;

    this.dispatchEvent(
      new CustomEvent('sando-blur', {
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
   * Associate slotted input with label for accessibility
   * Sets id and aria-describedby on the slotted form control
   * @private
   */
  private _associateInputWithLabel() {
    // Find form control elements in the default slot
    const formControlSelectors =
      'input, select, textarea, [role="textbox"], [role="combobox"], [role="listbox"]';
    const slottedInput = this.querySelector(formControlSelectors) as HTMLElement | null;

    if (slottedInput) {
      // Set id on input if it doesn't have one (use our generated ID)
      // Note: If input already has ID, we detected it in connectedCallback
      if (!slottedInput.id) {
        slottedInput.id = this._inputId;
      }

      // Add aria-describedby for helper text / error message
      const hasDescription =
        this.helperText ||
        this.error ||
        this.querySelector('[slot="helper-text"]') ||
        this.querySelector('[slot="error"]');

      if (hasDescription) {
        const existingDescribedBy = slottedInput.getAttribute('aria-describedby');
        if (existingDescribedBy) {
          // Append our description id if not already present
          if (!existingDescribedBy.includes(this._descriptionId)) {
            slottedInput.setAttribute(
              'aria-describedby',
              `${existingDescribedBy} ${this._descriptionId}`
            );
          }
        } else {
          slottedInput.setAttribute('aria-describedby', this._descriptionId);
        }
      }

      // Set required attribute on input if form group is required
      if (this.required && 'required' in slottedInput) {
        (slottedInput as HTMLInputElement).required = true;
      }

      // Set disabled attribute on input if form group is disabled
      if (this.disabled && 'disabled' in slottedInput) {
        (slottedInput as HTMLInputElement).disabled = true;
      }

      // Set aria-invalid when there's an error
      if (this.error) {
        slottedInput.setAttribute('aria-invalid', 'true');
      }
    }
  }

  /**
   * Handle slot change - re-associate when content changes
   * @private
   */
  private _handleSlotChange() {
    this._associateInputWithLabel();
  }

  /**
   * Lifecycle: Called when properties change
   * Emit validation-change event when error state changes
   */
  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('error')) {
      this._emitValidationChange();
      this._updateAriaInvalid();
    }

    if (changedProperties.has('disabled')) {
      this._updateDisabledState();
    }

    if (changedProperties.has('required')) {
      this._updateRequiredState();
    }
  }

  /**
   * Update aria-invalid on slotted input when error changes
   * @private
   */
  private _updateAriaInvalid() {
    const formControlSelectors =
      'input, select, textarea, [role="textbox"], [role="combobox"], [role="listbox"]';
    const slottedInput = this.querySelector(formControlSelectors) as HTMLElement | null;

    if (slottedInput) {
      if (this.error) {
        slottedInput.setAttribute('aria-invalid', 'true');
      } else {
        slottedInput.removeAttribute('aria-invalid');
      }
    }
  }

  /**
   * Update disabled state on slotted input
   * @private
   */
  private _updateDisabledState() {
    const formControlSelectors =
      'input, select, textarea, [role="textbox"], [role="combobox"], [role="listbox"]';
    const slottedInput = this.querySelector(formControlSelectors) as HTMLInputElement | null;

    if (slottedInput && 'disabled' in slottedInput) {
      slottedInput.disabled = this.disabled;
    }
  }

  /**
   * Update required state on slotted input
   * @private
   */
  private _updateRequiredState() {
    const formControlSelectors =
      'input, select, textarea, [role="textbox"], [role="combobox"], [role="listbox"]';
    const slottedInput = this.querySelector(formControlSelectors) as HTMLInputElement | null;

    if (slottedInput && 'required' in slottedInput) {
      slottedInput.required = this.required;
    }
  }

  render() {
    return html`
      <div class="form-group">
        ${this._renderLabel()} ${this._renderField()} ${this._renderHelperOrError()}
      </div>
    `;
  }

  /**
   * Render label section (slot or prop)
   * Uses <label> element with for attribute for proper association
   * @private
   */
  private _renderLabel() {
    const hasLabelSlot = this.querySelector('[slot="label"]');
    const hasLabel = this.label || hasLabelSlot;

    if (!hasLabel) return '';

    return html`
      <label class="form-group__label" for=${this._inputId}>
        <slot name="label">
          ${this.label}${this.required
            ? html`<span class="required" aria-hidden="true">*</span>`
            : ''}
        </slot>
      </label>
    `;
  }

  /**
   * Render field slot
   * @private
   */
  private _renderField() {
    return html`
      <div class="form-group__field">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
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
        <div class="form-group__error" id=${this._descriptionId} role="alert" aria-live="polite">
          <slot name="error">${this.error}</slot>
        </div>
      `;
    }

    // Show helper text if no error
    if (this.helperText || hasHelperSlot) {
      return html`
        <div class="form-group__helper-text" id=${this._descriptionId}>
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
