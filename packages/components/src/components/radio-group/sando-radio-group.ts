/**
 * Sando Radio Group Component
 *
 * A container that groups sando-radio elements with proper ARIA radiogroup semantics,
 * roving tabindex for keyboard navigation, and shared label/helper/error support.
 *
 * @element sando-radio-group
 *
 * @slot - sando-radio elements to be grouped
 *
 * @fires sando-change - Fired when selection changes
 *
 * @cssprop --sando-radio-group-gap - Gap between label and radio options
 * @cssprop --sando-radio-group-optionsGap - Gap between individual radio buttons
 * @cssprop --sando-radio-group-label-fontSize - Label font size
 * @cssprop --sando-radio-group-label-fontWeight - Label font weight
 * @cssprop --sando-radio-group-label-textColor-default - Label text color
 * @cssprop --sando-radio-group-label-textColor-disabled - Label text color when disabled
 * @cssprop --sando-radio-group-label-textColor-error - Label text color in error state
 * @cssprop --sando-radio-group-helperText-fontSize - Helper text font size
 * @cssprop --sando-radio-group-helperText-textColor-default - Helper text color
 * @cssprop --sando-radio-group-helperText-textColor-error - Error message color
 * @cssprop --sando-radio-group-required-textColor - Required asterisk color
 * @cssprop --sando-radio-group-orientation-horizontal-gap - Gap in horizontal orientation
 *
 * @example Basic usage
 * ```html
 * <sando-radio-group name="color" label="Choose a color">
 *   <sando-radio value="red" label="Red"></sando-radio>
 *   <sando-radio value="green" label="Green"></sando-radio>
 *   <sando-radio value="blue" label="Blue"></sando-radio>
 * </sando-radio-group>
 * ```
 *
 * @example With helper text and default value
 * ```html
 * <sando-radio-group
 *   name="size"
 *   label="Select size"
 *   value="medium"
 *   helper-text="Choose the size that fits your needs"
 * >
 *   <sando-radio value="small" label="Small"></sando-radio>
 *   <sando-radio value="medium" label="Medium"></sando-radio>
 *   <sando-radio value="large" label="Large"></sando-radio>
 * </sando-radio-group>
 * ```
 *
 * @example With error state
 * ```html
 * <sando-radio-group
 *   name="required-field"
 *   label="Required selection"
 *   required
 *   error
 *   error-text="Please select an option"
 * >
 *   <sando-radio value="a" label="Option A"></sando-radio>
 *   <sando-radio value="b" label="Option B"></sando-radio>
 * </sando-radio-group>
 * ```
 *
 * @example Horizontal orientation
 * ```html
 * <sando-radio-group name="answer" label="Yes or No?" orientation="horizontal">
 *   <sando-radio value="yes" label="Yes"></sando-radio>
 *   <sando-radio value="no" label="No"></sando-radio>
 * </sando-radio-group>
 * ```
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type {
  SandoRadioGroupProps,
  RadioGroupOrientation,
  RadioGroupSize,
  RadioGroupChangeEventDetail
} from './sando-radio-group.types.js';
import type { SandoRadio } from '../radio/sando-radio.js';

import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, stateStyles } from './styles/index.js';

@customElement('sando-radio-group')
export class SandoRadioGroup extends FlavorableMixin(LitElement) implements SandoRadioGroupProps {
  /**
   * Component styles - modular CSS imports
   * resetStyles must be first to establish baseline
   */
  static styles = [
    resetStyles, // Universal CSS reset
    tokenStyles, // Design tokens
    baseStyles, // Layout, typography
    stateStyles // Disabled, error states
  ];

  /**
   * Unique ID for label association
   * @private
   */
  @state()
  private _labelId = `sando-radio-group-label-${Math.random().toString(36).substring(2, 11)}`;

  /**
   * Unique ID for description (helper/error text)
   * @private
   */
  @state()
  private _descriptionId = `sando-radio-group-desc-${Math.random().toString(36).substring(2, 11)}`;

  /**
   * Group label text
   */
  @property({ type: String })
  label?: string;

  /**
   * Name attribute for all child radios (auto-propagated)
   * REQUIRED for proper radio group behavior
   */
  @property({ type: String, reflect: true })
  name = '';

  /**
   * Currently selected value
   */
  @property({ type: String })
  value?: string;

  /**
   * Helper text displayed below the group
   */
  @property({ type: String, attribute: 'helper-text' })
  helperText?: string;

  /**
   * Error message (shows error state)
   */
  @property({ type: String, attribute: 'error-text' })
  errorText?: string;

  /**
   * Error state
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Required state
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Disabled state (propagates to children)
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Layout orientation
   * @default 'vertical'
   */
  @property({ type: String, reflect: true })
  orientation: RadioGroupOrientation = 'vertical';

  /**
   * Size variant (propagates to children)
   * @default 'md'
   */
  @property({ type: String, reflect: true })
  size: RadioGroupSize = 'md';

  /**
   * Lifecycle: Called when component is added to DOM
   */
  connectedCallback(): void {
    super.connectedCallback();
    this._setupGroupBehavior();
  }

  /**
   * Lifecycle: Called when component is removed from DOM
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._cleanupGroupBehavior();
  }

  /**
   * Lifecycle: Called after first render
   * Uses requestAnimationFrame to ensure child radios have completed their initial render
   */
  protected firstUpdated(): void {
    // Wait for next frame to ensure child radios are fully initialized
    requestAnimationFrame(() => {
      this._initializeRadios();
    });
  }

  /**
   * Lifecycle: Called when properties change
   */
  protected updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('value')) {
      this._syncValueToRadios();
    }

    if (changedProperties.has('disabled')) {
      this._syncDisabledToRadios();
    }

    if (changedProperties.has('error')) {
      this._syncErrorToRadios();
    }

    if (changedProperties.has('name')) {
      this._syncNameToRadios();
    }

    if (changedProperties.has('size')) {
      this._syncSizeToRadios();
    }
  }

  /**
   * Setup event listeners for group behavior
   * @private
   */
  private _setupGroupBehavior(): void {
    // Listen for change events from child radios during capture phase
    // This ensures we intercept child events before they reach external bubble listeners
    this.addEventListener('sando-change', this._handleRadioChange as EventListener, true);
    // Listen for keyboard navigation
    this.addEventListener('keydown', this._handleKeyDown);
  }

  /**
   * Cleanup event listeners
   * @private
   */
  private _cleanupGroupBehavior(): void {
    this.removeEventListener('sando-change', this._handleRadioChange as EventListener, true);
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  /**
   * Initialize child radios on first render
   * @private
   */
  private _initializeRadios(): void {
    const radios = this._getRadios();

    radios.forEach((radio) => {
      // Set name on all radios
      radio.name = this.name;

      // Propagate disabled state
      if (this.disabled) {
        radio.disabled = true;
      }

      // Propagate error state
      if (this.error) {
        radio.error = true;
      }

      // Propagate size
      radio.setAttribute('size', this.size);

      // Set checked state based on value
      if (this.value && radio.value === this.value) {
        radio.checked = true;
      }
    });

    // Initialize roving tabindex
    this._updateRovingTabindex();
  }

  /**
   * Get all child sando-radio elements
   * @private
   */
  private _getRadios(): SandoRadio[] {
    return Array.from(this.querySelectorAll('sando-radio')) as SandoRadio[];
  }

  /**
   * Get enabled radios only
   * @private
   */
  private _getEnabledRadios(): SandoRadio[] {
    return this._getRadios().filter((radio) => !radio.disabled);
  }

  /**
   * Handle radio change event from child
   * @private
   */
  private _handleRadioChange = (e: CustomEvent): void => {
    const target = e.target as Element;

    // Ignore events that originated from this element (our own events)
    // Only handle events from child sando-radio elements
    if (target === this || !target.matches('sando-radio')) {
      return;
    }

    // Prevent event from propagating - we'll emit our own
    e.stopPropagation();

    const targetRadio = target as SandoRadio;
    const newValue = targetRadio.value;

    // Only proceed if value actually changed
    if (newValue === this.value) {
      return;
    }

    // Update internal value
    this.value = newValue;

    // Uncheck other radios
    const radios = this._getRadios();
    radios.forEach((radio) => {
      if (radio !== targetRadio && radio.checked) {
        radio.checked = false;
      }
    });

    // Update roving tabindex
    this._updateRovingTabindex();

    // Emit group change event
    this._emitChangeEvent();
  };

  /**
   * Handle keyboard navigation (roving tabindex pattern)
   * Per W3C APG: Arrow keys move AND select
   * @private
   */
  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled) return;

    const enabledRadios = this._getEnabledRadios();
    if (enabledRadios.length === 0) return;

    // Find currently focused radio
    const activeElement = this.querySelector('sando-radio:focus-within') as SandoRadio | null;
    const currentIndex = activeElement ? enabledRadios.indexOf(activeElement) : -1;

    let nextIndex = -1;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        // Move to next, wrap to first
        nextIndex = currentIndex < enabledRadios.length - 1 ? currentIndex + 1 : 0;
        break;

      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        // Move to previous, wrap to last
        nextIndex = currentIndex > 0 ? currentIndex - 1 : enabledRadios.length - 1;
        break;

      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;

      case 'End':
        e.preventDefault();
        nextIndex = enabledRadios.length - 1;
        break;

      case ' ':
        // Space activates but arrow keys already select, so this is handled by sando-radio
        return;

      default:
        return;
    }

    if (nextIndex >= 0) {
      const nextRadio = enabledRadios[nextIndex];
      // Focus and select (per WAI-ARIA radio group pattern)
      nextRadio.focus();
      nextRadio.select();

      // Update value
      this.value = nextRadio.value;

      // Update roving tabindex
      this._updateRovingTabindex();
    }
  };

  /**
   * Update roving tabindex: only focused/checked radio has tabindex=0
   * Per WAI-ARIA Radio Group Pattern:
   * - Tab into group focuses checked radio (or first if none checked)
   * - Tab out of group moves to next focusable element
   * - Only ONE radio has tabindex="0" at any time
   * - Arrow keys navigate within the group
   * @private
   */
  private _updateRovingTabindex(): void {
    const radios = this._getRadios();
    const checkedRadio = radios.find((r) => r.checked);
    const enabledRadios = this._getEnabledRadios();

    // Determine which radio should be focusable (tabindex=0)
    // Priority: checked radio > first enabled radio
    const focusableRadio = checkedRadio ?? enabledRadios[0];

    radios.forEach((radio) => {
      if (radio === focusableRadio) {
        // This radio is the Tab entry point
        radio.tabIndex = 0;
      } else {
        // All others are only reachable via arrow keys
        radio.tabIndex = -1;
      }
    });
  }

  /**
   * Sync value to child radios
   * @private
   */
  private _syncValueToRadios(): void {
    const radios = this._getRadios();
    radios.forEach((radio) => {
      radio.checked = radio.value === this.value;
    });
    this._updateRovingTabindex();
  }

  /**
   * Sync disabled state to child radios
   * @private
   */
  private _syncDisabledToRadios(): void {
    const radios = this._getRadios();
    radios.forEach((radio) => {
      if (this.disabled) {
        radio.disabled = true;
      }
      // Note: We don't unset disabled when group is enabled,
      // as individual radios may have their own disabled state
    });
  }

  /**
   * Sync error state to child radios
   * @private
   */
  private _syncErrorToRadios(): void {
    const radios = this._getRadios();
    radios.forEach((radio) => {
      radio.error = this.error;
    });
  }

  /**
   * Sync name to child radios
   * @private
   */
  private _syncNameToRadios(): void {
    const radios = this._getRadios();
    radios.forEach((radio) => {
      radio.name = this.name;
    });
  }

  /**
   * Sync size to child radios
   * @private
   */
  private _syncSizeToRadios(): void {
    const radios = this._getRadios();
    radios.forEach((radio) => {
      radio.setAttribute('size', this.size);
    });
  }

  /**
   * Emit custom change event
   * @private
   */
  private _emitChangeEvent(): void {
    this.dispatchEvent(
      new CustomEvent<RadioGroupChangeEventDetail>('sando-change', {
        detail: {
          value: this.value || '',
          name: this.name
        },
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Handle slot change - initialize newly added radios
   * @private
   */
  private _handleSlotChange(): void {
    this._initializeRadios();
  }

  render() {
    const hasLabel = !!this.label;
    const hasHelperText = this.helperText && !this.error;
    const hasErrorText = this.errorText && this.error;
    const hasDescription = hasHelperText || hasErrorText;

    return html`
      <div
        class="radio-group"
        role="radiogroup"
        aria-labelledby=${hasLabel ? this._labelId : nothing}
        aria-describedby=${hasDescription ? this._descriptionId : nothing}
        aria-required=${this.required ? 'true' : nothing}
        aria-disabled=${this.disabled ? 'true' : nothing}
        aria-invalid=${this.error ? 'true' : nothing}
      >
        ${hasLabel ? this._renderLabel() : nothing}

        <div class="radio-group-options" role="presentation">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>

        ${hasDescription ? this._renderDescription(!!hasHelperText, !!hasErrorText) : nothing}
      </div>
    `;
  }

  /**
   * Render the label
   * @private
   */
  private _renderLabel() {
    return html`
      <span id=${this._labelId} class="radio-group-label">
        ${this.label}${this.required
          ? html`<span class="required-indicator" aria-hidden="true">*</span>`
          : nothing}
      </span>
    `;
  }

  /**
   * Render helper or error text
   * @private
   */
  private _renderDescription(hasHelperText: boolean, hasErrorText: boolean) {
    if (hasErrorText) {
      return html`
        <div
          id=${this._descriptionId}
          class="radio-group-description"
          role="alert"
          aria-live="polite"
        >
          <span class="error-text">${this.errorText}</span>
        </div>
      `;
    }

    if (hasHelperText) {
      return html`
        <div id=${this._descriptionId} class="radio-group-description">
          <span class="helper-text">${this.helperText}</span>
        </div>
      `;
    }

    return nothing;
  }

  /**
   * Public API: Get the currently selected radio
   */
  getSelectedRadio(): SandoRadio | null {
    return this._getRadios().find((r) => r.checked) || null;
  }

  /**
   * Public API: Select a radio by value
   */
  selectByValue(value: string): void {
    const radio = this._getRadios().find((r) => r.value === value);
    if (radio && !radio.disabled) {
      this.value = value;
      this._syncValueToRadios();
      this._emitChangeEvent();
    }
  }

  /**
   * Public API: Clear selection
   */
  clearSelection(): void {
    this.value = undefined;
    const radios = this._getRadios();
    radios.forEach((radio) => {
      radio.checked = false;
    });
    this._updateRovingTabindex();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-radio-group': SandoRadioGroup;
  }
}
