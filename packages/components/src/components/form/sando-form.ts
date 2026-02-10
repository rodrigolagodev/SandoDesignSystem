import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type {
  SandoFormProps,
  FormMethod,
  FormSubmitEventDetail,
  FormInvalidEventDetail,
  FormResetEventDetail,
  FormValidationError,
  FormChangeEventDetail,
  FormValidateEventDetail
} from './sando-form.types.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles } from './styles/index.js';

/**
 * Selectors for finding form controls
 * Includes both Sando components and native form elements
 */
const FORM_CONTROL_SELECTORS = [
  'sando-input[name]',
  'sando-select[name]',
  'sando-checkbox[name]',
  'sando-switch[name]',
  'sando-textarea[name]',
  'sando-radio-group[name]',
  'input[name]',
  'select[name]',
  'textarea[name]'
].join(', ');

/**
 * Sando Form Component
 *
 * A smart form wrapper that handles form submission, validation coordination,
 * and provides easy access to form data. Renders a native `<form>` element
 * for progressive enhancement and accessibility.
 *
 * @element sando-form
 *
 * @slot - Form content (sando-input, sando-select, sando-button, etc.)
 *
 * @fires sando-submit - Emitted on valid form submission with formData, json, and isValid
 * @fires sando-invalid - Emitted when validation fails with array of errors
 * @fires sando-reset - Emitted when form is reset
 *
 * @example Basic usage
 * ```html
 * <sando-form @sando-submit=${(e) => console.log(e.detail.json)}>
 *   <sando-input name="email" label="Email" type="email" required></sando-input>
 *   <sando-input name="password" label="Password" type="password" required></sando-input>
 *   <sando-checkbox name="remember">Remember me</sando-checkbox>
 *   <sando-button type="submit">Sign In</sando-button>
 * </sando-form>
 * ```
 *
 * @example With loading state
 * ```html
 * <sando-form loading @sando-submit=${handleSubmit}>
 *   <sando-input name="email" label="Email"></sando-input>
 *   <sando-button type="submit">Submit</sando-button>
 * </sando-form>
 * ```
 *
 * @example Progressive enhancement with action
 * ```html
 * <sando-form action="/api/login" method="post">
 *   <sando-input name="email" label="Email" required></sando-input>
 *   <sando-button type="submit">Login</sando-button>
 * </sando-form>
 * ```
 */
@customElement('sando-form')
export class SandoForm extends FlavorableMixin(LitElement) implements SandoFormProps {
  /**
   * Component styles - modular CSS from styles directory
   * resetStyles must be first to establish baseline
   */
  static styles = [resetStyles, tokenStyles, baseStyles];

  /**
   * When true, disables all child form controls
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /**
   * Skip native HTML validation
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  novalidate = false;

  /**
   * Form name attribute
   * @default undefined
   */
  @property({ type: String })
  name?: string;

  /**
   * Form action URL (for progressive enhancement)
   * @default undefined
   */
  @property({ type: String })
  action?: string;

  /**
   * Form method (get/post)
   * @default 'post'
   */
  @property({ type: String })
  method: FormMethod = 'post';

  /**
   * Form encoding type (for file uploads)
   * @default undefined
   */
  @property({ type: String })
  enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

  /**
   * Stores initial values for proper reset functionality
   * @private
   */
  private _initialValues: Map<string, unknown> = new Map();

  /**
   * Tracks if any form field has been modified
   * @private
   */
  @state()
  private _dirty = false;

  /**
   * Whether any form field has been modified from its initial value
   */
  get dirty(): boolean {
    return this._dirty;
  }

  /**
   * Whether the form is in its initial state (no modifications)
   */
  get pristine(): boolean {
    return !this._dirty;
  }

  /**
   * Lifecycle: Called when component is added to the DOM
   * Sets up click event listener for sando-button submit/reset delegation
   */
  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this._handleButtonClick);
    this.addEventListener('input', this._handleFormChange);
    this.addEventListener('change', this._handleFormChange);
  }

  /**
   * Lifecycle: Called when component is removed from the DOM
   * Cleans up click event listener
   */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleButtonClick);
    this.removeEventListener('input', this._handleFormChange);
    this.removeEventListener('change', this._handleFormChange);
  }

  /**
   * Lifecycle: Called after first render
   * Captures initial values for reset functionality
   */
  override firstUpdated(): void {
    this._captureInitialValues();
  }

  /**
   * Lifecycle: Called when properties change
   * Propagates loading state to all child controls
   */
  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('loading')) {
      this._propagateLoadingState();
    }
  }

  /**
   * Programmatically trigger form submission
   * Validates and emits sando-submit or sando-invalid
   */
  submit(): void {
    const isValid = this.validate();

    // Emit sando-validate event for custom validation
    const validateDetail: FormValidateEventDetail = {
      json: this.getJson(),
      isValid,
      errors: isValid ? [] : this._collectValidationErrors(),
      addError: (name: string, message: string) => {
        this._addCustomError(name, message);
      }
    };

    const validateEvent = new CustomEvent('sando-validate', {
      detail: validateDetail,
      bubbles: true,
      composed: true,
      cancelable: true
    });

    this.dispatchEvent(validateEvent);

    // If event was prevented or custom errors were added, treat as invalid
    if (validateEvent.defaultPrevented) {
      const errors = this._collectValidationErrors();
      const detail: FormInvalidEventDetail = { errors };

      this.dispatchEvent(
        new CustomEvent('sando-invalid', {
          detail,
          bubbles: true,
          composed: true
        })
      );
      return;
    }

    if (isValid) {
      const detail: FormSubmitEventDetail = {
        formData: this.getFormData(),
        json: this.getJson(),
        isValid: true
      };

      this.dispatchEvent(
        new CustomEvent('sando-submit', {
          detail,
          bubbles: true,
          composed: true
        })
      );
    } else {
      const errors = this._collectValidationErrors();
      const detail: FormInvalidEventDetail = { errors };

      this.dispatchEvent(
        new CustomEvent('sando-invalid', {
          detail,
          bubbles: true,
          composed: true
        })
      );
    }
  }

  /**
   * Reset all form fields to initial values
   */
  reset(): void {
    // Clear error states first
    this._clearControlErrors();

    const controls = this._getFormControls();

    controls.forEach((control) => {
      const name = control.getAttribute('name');
      const tagName = control.tagName.toLowerCase();

      // Restore to initial value if captured, otherwise default behavior
      if (name && this._initialValues.has(name)) {
        const initialValue = this._initialValues.get(name);

        if (tagName === 'sando-checkbox' || tagName === 'sando-switch') {
          (control as unknown as { checked: boolean }).checked = initialValue as boolean;
        } else if ('value' in control) {
          (control as unknown as { value: unknown }).value = initialValue;
        }
      } else {
        // Fallback for controls not captured
        if (tagName.startsWith('sando-')) {
          if ('value' in control) {
            (control as HTMLInputElement).value = '';
          }
          if ('checked' in control) {
            (control as HTMLInputElement).checked = false;
          }
        } else {
          // Native controls
          if (control instanceof HTMLInputElement) {
            if (control.type === 'checkbox' || control.type === 'radio') {
              control.checked = control.defaultChecked;
            } else {
              control.value = control.defaultValue;
            }
          } else if (control instanceof HTMLSelectElement) {
            control.selectedIndex = 0;
          } else if (control instanceof HTMLTextAreaElement) {
            control.value = control.defaultValue;
          }
        }
      }
    });

    // Reset dirty state
    this._dirty = false;

    const detail: FormResetEventDetail = {};
    this.dispatchEvent(
      new CustomEvent('sando-reset', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Validate all fields without submitting
   * @returns true if all fields are valid
   */
  validate(): boolean {
    if (this.novalidate) {
      return true;
    }

    // First, clear previous error states
    this._clearControlErrors();

    const controls = this._getFormControls();
    let isValid = true;

    controls.forEach((control) => {
      let controlIsValid = true;

      // Check Sando component validation
      if (control.tagName.toLowerCase().startsWith('sando-')) {
        // Sando components expose validity via checkValidity or invalid property
        if ('checkValidity' in control && typeof control.checkValidity === 'function') {
          controlIsValid = control.checkValidity();
        } else if ('invalid' in control && (control as unknown as { invalid: boolean }).invalid) {
          controlIsValid = false;
        }

        // Set error state on Sando components that support it
        if (!controlIsValid && 'error' in control) {
          (control as unknown as { error: boolean }).error = true;
        }
      } else {
        // Native form controls
        if ('checkValidity' in control && typeof control.checkValidity === 'function') {
          controlIsValid = control.checkValidity();
        }
      }

      if (!controlIsValid) {
        isValid = false;
      }
    });

    // Focus first invalid control for better UX
    if (!isValid) {
      const firstInvalid = controls.find((control) => {
        if (control.tagName.toLowerCase().startsWith('sando-')) {
          return 'error' in control && (control as unknown as { error: boolean }).error === true;
        }
        return false;
      });

      if (firstInvalid && 'focus' in firstInvalid) {
        (firstInvalid as HTMLElement).focus();
      }
    }

    return isValid;
  }

  /**
   * Clear all error states on form controls
   * Useful for resetting visual validation feedback
   */
  clearErrors(): void {
    this._clearControlErrors();
  }

  /**
   * Get FormData object with all named fields
   * @returns FormData with all form values
   */
  getFormData(): FormData {
    const formData = new FormData();
    const controls = this._getFormControls();

    controls.forEach((control) => {
      const name = control.getAttribute('name');
      if (!name) return;

      const value = this._getControlValue(control);
      if (value !== null) {
        formData.append(name, value as string);
      }
    });

    return formData;
  }

  /**
   * Get plain object with field name/value pairs
   * @returns Object with all form values
   */
  getJson(): Record<string, unknown> {
    const json: Record<string, unknown> = {};
    const controls = this._getFormControls();

    controls.forEach((control) => {
      const name = control.getAttribute('name');
      if (!name) return;

      const value = this._getControlValue(control);
      if (value !== null) {
        // Handle array values for same-named controls
        if (name in json) {
          const existing = json[name];
          if (Array.isArray(existing)) {
            existing.push(value);
          } else {
            json[name] = [existing, value];
          }
        } else {
          json[name] = value;
        }
      }
    });

    return json;
  }

  /**
   * Set loading state
   * @param loading - Whether form is in loading state
   */
  setLoading(loading: boolean): void {
    this.loading = loading;
  }

  /**
   * Get all form controls (both Sando and native)
   * @private
   */
  private _getFormControls(): HTMLElement[] {
    return Array.from(this.querySelectorAll(FORM_CONTROL_SELECTORS));
  }

  /**
   * Clear error state on all Sando form controls
   * @private
   */
  private _clearControlErrors(): void {
    const controls = this._getFormControls();

    controls.forEach((control) => {
      if (control.tagName.toLowerCase().startsWith('sando-') && 'error' in control) {
        (control as unknown as { error: boolean }).error = false;
      }
    });
  }

  /**
   * Get the value of a form control
   * @private
   */
  private _getControlValue(control: HTMLElement): unknown {
    const tagName = control.tagName.toLowerCase();

    // Handle Sando checkbox/switch - only include if checked
    if (tagName === 'sando-checkbox' || tagName === 'sando-switch') {
      const checked = (control as unknown as { checked: boolean }).checked;
      if (!checked) return null;
      return (control as unknown as { value?: string }).value ?? 'on';
    }

    // Handle Sando components with value property
    if (tagName.startsWith('sando-')) {
      return (control as unknown as { value?: unknown }).value ?? '';
    }

    // Handle native checkbox/radio
    if (control instanceof HTMLInputElement) {
      if (control.type === 'checkbox' || control.type === 'radio') {
        if (!control.checked) return null;
        return control.value || 'on';
      }
      return control.value;
    }

    // Handle native select
    if (control instanceof HTMLSelectElement) {
      return control.value;
    }

    // Handle native textarea
    if (control instanceof HTMLTextAreaElement) {
      return control.value;
    }

    // Fallback: try to get value property
    return (control as unknown as { value?: unknown }).value ?? '';
  }

  /**
   * Collect validation errors from all invalid controls
   * @private
   */
  private _collectValidationErrors(): FormValidationError[] {
    const errors: FormValidationError[] = [];
    const controls = this._getFormControls();

    controls.forEach((control) => {
      const name = control.getAttribute('name');
      if (!name) return;

      let isInvalid = false;
      let message = '';

      // Check Sando component validation
      if (control.tagName.toLowerCase().startsWith('sando-')) {
        if ('checkValidity' in control && typeof control.checkValidity === 'function') {
          if (!control.checkValidity()) {
            isInvalid = true;
            message =
              (control as unknown as { validationMessage?: string }).validationMessage ||
              'Invalid value';
          }
        } else if ('invalid' in control && (control as unknown as { invalid: boolean }).invalid) {
          isInvalid = true;
          message =
            (control as unknown as { error?: string }).error ||
            (control as unknown as { validationMessage?: string }).validationMessage ||
            'Invalid value';
        }
      } else {
        // Native form controls
        if ('validity' in control) {
          const input = control as HTMLInputElement;
          if (!input.validity.valid) {
            isInvalid = true;
            message = input.validationMessage || 'Invalid value';
          }
        }
      }

      if (isInvalid) {
        errors.push({
          name,
          message,
          element: control
        });
      }
    });

    return errors;
  }

  /**
   * Propagate loading state to all child form controls
   * @private
   */
  private _propagateLoadingState(): void {
    const controls = this._getFormControls();

    controls.forEach((control) => {
      if ('disabled' in control) {
        (control as HTMLInputElement).disabled = this.loading;
      }
    });

    // Also disable submit/reset buttons
    const buttons = this.querySelectorAll(
      'sando-button[type="submit"], sando-button[type="reset"], button[type="submit"], button[type="reset"]'
    );
    buttons.forEach((button) => {
      if ('disabled' in button) {
        (button as HTMLButtonElement).disabled = this.loading;
      }
    });
  }

  /**
   * Handle native form submit event
   * @private
   */
  private _handleSubmit = (event: Event): void => {
    event.preventDefault();
    this.submit();
  };

  /**
   * Handle native form reset event
   * @private
   */
  private _handleReset = (event: Event): void => {
    event.preventDefault();
    this.reset();
  };

  /**
   * Handle click events on sando-button[type="submit"] and sando-button[type="reset"]
   * This enables form submission/reset when buttons are in Light DOM (slotted)
   * and their internal <button> is in a separate Shadow DOM tree
   * @private
   */
  private _handleButtonClick = (event: Event): void => {
    const target = event.target as HTMLElement;

    // Check if the clicked element is a sando-button with submit/reset type
    if (target.matches('sando-button[type="submit"]')) {
      event.preventDefault();
      this.submit();
    } else if (target.matches('sando-button[type="reset"]')) {
      event.preventDefault();
      this.reset();
    }

    // Note: Native buttons inside the shadow form already work via _handleSubmit/_handleReset
  };

  /**
   * Capture initial values of all form controls
   * @private
   */
  private _captureInitialValues(): void {
    const controls = this._getFormControls();

    controls.forEach((control) => {
      const name = control.getAttribute('name');
      if (!name) return;

      const tagName = control.tagName.toLowerCase();

      // Store checked state for checkboxes/switches
      if (tagName === 'sando-checkbox' || tagName === 'sando-switch') {
        this._initialValues.set(
          name,
          (control as unknown as { checked?: boolean }).checked ?? false
        );
      } else if ('value' in control) {
        this._initialValues.set(name, (control as unknown as { value?: unknown }).value ?? '');
      }
    });
  }

  /**
   * Handle input/change events to track dirty state and emit sando-change
   * @private
   */
  private _handleFormChange = (event: Event): void => {
    const target = event.target as HTMLElement;

    // Only handle form controls
    if (!target.matches(FORM_CONTROL_SELECTORS)) return;

    // Mark as dirty
    if (!this._dirty) {
      this._dirty = true;
    }

    // Emit sando-change event
    const detail: FormChangeEventDetail = {
      field: target.getAttribute('name'),
      value: this._getControlValue(target),
      json: this.getJson()
    };

    this.dispatchEvent(
      new CustomEvent('sando-change', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  };

  /**
   * Add a custom validation error to a field
   * @private
   */
  private _addCustomError(name: string, message: string): void {
    const control = this.querySelector(`[name="${name}"]`) as HTMLElement;
    if (control && 'error' in control) {
      (control as unknown as { error: boolean }).error = true;
      if ('errorText' in control) {
        (control as unknown as { errorText: string }).errorText = message;
      }
    }
  }

  render() {
    return html`
      <form
        class="form"
        name=${this.name || ''}
        action=${this.action || ''}
        method=${this.method}
        enctype=${this.enctype || ''}
        ?novalidate=${this.novalidate}
        @submit=${this._handleSubmit}
        @reset=${this._handleReset}
      >
        <slot></slot>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-form': SandoForm;
  }
}
