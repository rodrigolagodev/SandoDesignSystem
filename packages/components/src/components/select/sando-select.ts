/**
 * Sando Select Component
 *
 * A fully accessible select/dropdown component that supports single and multiple selection.
 * Implements the WAI-ARIA combobox pattern with listbox popup.
 *
 * @element sando-select
 *
 * @slot - sando-option and sando-option-group elements
 * @slot prefix - Icon before the value display
 * @slot suffix - Icon after value, before caret
 * @slot clear-icon - Custom clear icon
 * @slot expand-icon - Custom expand/caret icon
 *
 * @fires sando-change - When value changes, detail: { value: string | string[] }
 * @fires sando-clear - When clear button clicked
 * @fires sando-show - When dropdown opens
 * @fires sando-hide - When dropdown closes
 * @fires sando-scroll-end - When scrolled to bottom (for infinite scroll)
 *
 * @cssprop --sando-select-outlined-borderColor-default - Border color (outlined variant, default state)
 * @cssprop --sando-select-outlined-borderColor-hover - Border color (outlined variant, hover state)
 * @cssprop --sando-select-outlined-borderColor-focus - Border color (outlined variant, focus state)
 * @cssprop --sando-select-outlined-borderColor-error - Border color (outlined variant, error state)
 * @cssprop --sando-select-outlined-borderColor-disabled - Border color (outlined variant, disabled state)
 * @cssprop --sando-select-outlined-backgroundColor-default - Background color (outlined variant, default state)
 * @cssprop --sando-select-outlined-backgroundColor-disabled - Background color (outlined variant, disabled state)
 * @cssprop --sando-select-outlined-textColor-default - Text color (outlined variant, default state)
 * @cssprop --sando-select-outlined-textColor-placeholder - Placeholder text color (outlined variant)
 * @cssprop --sando-select-outlined-textColor-disabled - Text color (outlined variant, disabled state)
 * @cssprop --sando-select-filled-backgroundColor-default - Background color (filled variant, default state)
 * @cssprop --sando-select-filled-backgroundColor-hover - Background color (filled variant, hover state)
 * @cssprop --sando-select-filled-backgroundColor-disabled - Background color (filled variant, disabled state)
 * @cssprop --sando-select-filled-borderColor-default - Border color (filled variant, default state)
 * @cssprop --sando-select-filled-borderColor-hover - Border color (filled variant, hover state)
 * @cssprop --sando-select-filled-borderColor-focus - Border color (filled variant, focus state)
 * @cssprop --sando-select-filled-borderColor-error - Border color (filled variant, error state)
 * @cssprop --sando-select-filled-borderColor-disabled - Border color (filled variant, disabled state)
 * @cssprop --sando-select-dropdown-backgroundColor - Dropdown background color
 * @cssprop --sando-select-dropdown-borderColor - Dropdown border color
 * @cssprop --sando-select-dropdown-borderRadius - Dropdown border radius
 * @cssprop --sando-select-dropdown-boxShadow - Dropdown shadow
 * @cssprop --sando-select-dropdown-maxHeight - Dropdown maximum height
 *
 * @example Basic usage
 * ```html
 * <sando-select label="Country" placeholder="Select a country">
 *   <sando-option value="us">United States</sando-option>
 *   <sando-option value="ca">Canada</sando-option>
 *   <sando-option value="mx">Mexico</sando-option>
 * </sando-select>
 * ```
 *
 * @example Multiple selection
 * ```html
 * <sando-select label="Tags" multiple clearable>
 *   <sando-option value="react">React</sando-option>
 *   <sando-option value="vue">Vue</sando-option>
 *   <sando-option value="angular">Angular</sando-option>
 * </sando-select>
 * ```
 *
 * @example With option groups
 * ```html
 * <sando-select label="Food">
 *   <sando-option-group label="Fruits">
 *     <sando-option value="apple">Apple</sando-option>
 *     <sando-option value="banana">Banana</sando-option>
 *   </sando-option-group>
 *   <sando-option-group label="Vegetables">
 *     <sando-option value="carrot">Carrot</sando-option>
 *     <sando-option value="broccoli">Broccoli</sando-option>
 *   </sando-option-group>
 * </sando-select>
 * ```
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

import type {
  SelectVariant,
  SelectSize,
  SelectPlacement,
  SelectChangeEventDetail,
  SandoSelectProps
} from './sando-select.types.js';

import type { SandoOption } from '../option/sando-option.js';
import type { OptionSelectEventDetail } from '../option/sando-option.types.js';
import type { TagSize } from '../tag/sando-tag.types.js';

// Import sando-tag for multi-select tags
import '../tag/sando-tag.js';

// Import sando-icon for caret and clear icons
import '../icon/sando-icon.js';

import { FlavorableMixin } from '../../mixins/index.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import {
  baseStyles,
  variantStyles,
  sizeStyles,
  stateStyles,
  dropdownStyles,
  multiselectStyles
} from './styles/index.js';

@customElement('sando-select')
export class SandoSelect extends FlavorableMixin(LitElement) implements SandoSelectProps {
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
    variantStyles, // Outlined, filled
    sizeStyles, // Small, medium, large
    stateStyles, // Error, disabled
    dropdownStyles, // Dropdown positioning and animation
    multiselectStyles // Tags for multi-select
  ];

  /**
   * Reference to the trigger button
   * @private
   */
  @query('.select-trigger')
  private _triggerElement!: HTMLButtonElement;

  /**
   * Reference to the dropdown container
   * @private
   */
  @query('.select-dropdown')
  private _dropdownElement!: HTMLElement;

  /**
   * Reference to the scroll sentinel for infinite scroll
   * @private
   */
  @query('.scroll-sentinel')
  private _scrollSentinel!: HTMLElement;

  /**
   * Internal: unique ID for ARIA associations (generated once)
   * @private
   */
  @state()
  private _inputId = `sando-select-${Math.random().toString(36).substring(2, 11)}`;

  /**
   * Internal: currently highlighted option index for keyboard navigation
   * @private
   */
  @state()
  private _highlightedIndex = -1;

  /**
   * Internal: collected options from slot
   * @private
   */
  @state()
  private _options: SandoOption[] = [];

  /**
   * Internal: map of value to label for display
   * @private
   */
  @state()
  private _valueLabels: Map<string, string> = new Map();

  /**
   * Internal: IntersectionObserver for infinite scroll
   * @private
   */
  private _scrollObserver: IntersectionObserver | null = null;

  /**
   * Internal: type-ahead buffer for quick selection
   * @private
   */
  private _typeaheadBuffer = '';

  /**
   * Internal: timeout for clearing type-ahead buffer
   * @private
   */
  private _typeaheadTimeout: ReturnType<typeof setTimeout> | null = null;

  /**
   * Selected value (for single select mode)
   * @default ''
   */
  @property({ reflect: true })
  value = '';

  /**
   * Selected values (for multiple select mode)
   * @default []
   */
  @property({ type: Array })
  values: string[] = [];

  /**
   * Form field name
   */
  @property({ reflect: true })
  name?: string;

  /**
   * Placeholder text when no value is selected
   */
  @property({ reflect: true })
  placeholder?: string;

  /**
   * Whether the select is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the select is required for form validation
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether the select is in error state
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Error message displayed when error is true
   */
  @property({ reflect: true, attribute: 'error-text' })
  errorText?: string;

  /**
   * Helper text displayed below the select
   */
  @property({ reflect: true, attribute: 'helper-text' })
  helperText?: string;

  /**
   * Accessible label for the select
   */
  @property({ reflect: true })
  label?: string;

  /**
   * Visual style variant
   * @default 'filled'
   */
  @property({ reflect: true })
  variant: SelectVariant = 'filled';

  /**
   * Select size
   * @default 'medium'
   */
  @property({ reflect: true })
  size: SelectSize = 'medium';

  /**
   * Whether multiple options can be selected
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /**
   * Whether to show a clear button
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  clearable = false;

  /**
   * Whether the dropdown is open
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Placement of the dropdown
   * @default 'bottom'
   */
  @property({ reflect: true })
  placement: SelectPlacement = 'bottom';

  /**
   * Maximum number of tags visible in multi-select mode
   * @default 3
   */
  @property({ type: Number, attribute: 'max-tags-visible' })
  maxTagsVisible = 3;

  /**
   * Lifecycle: Called when component is added to DOM
   */
  connectedCallback(): void {
    super.connectedCallback();
    this._attachEventListeners();
    this._attachFormListeners();
  }

  /**
   * Lifecycle: Called when component is removed from DOM
   */
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._removeEventListeners();
    this._detachFormListeners();
    this._destroyScrollObserver();
  }

  /**
   * Lifecycle: Called after first render
   */
  protected firstUpdated(): void {
    this._setupScrollObserver();
  }

  /**
   * Lifecycle: Called when properties change
   */
  protected updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    // Update option selected states when value changes
    if (changedProperties.has('value') || changedProperties.has('values')) {
      this._syncOptionSelectedStates();
    }

    // Update highlighted option when index changes
    if (changedProperties.has('_highlightedIndex')) {
      this._updateHighlightedOption();
    }

    // Handle open state change
    if (changedProperties.has('open')) {
      if (this.open) {
        this._onDropdownOpen();
      } else {
        this._onDropdownClose();
      }
    }
  }

  // ========================================
  // Event Listeners
  // ========================================

  /**
   * Attach global event listeners
   * @private
   */
  private _attachEventListeners(): void {
    document.addEventListener('click', this._handleDocumentClick);
    document.addEventListener('keydown', this._handleDocumentKeydown);
  }

  /**
   * Remove global event listeners
   * @private
   */
  private _removeEventListeners(): void {
    document.removeEventListener('click', this._handleDocumentClick);
    document.removeEventListener('keydown', this._handleDocumentKeydown);
  }

  /**
   * Handle clicks outside the select to close dropdown
   * @private
   */
  private _handleDocumentClick = (e: MouseEvent): void => {
    if (!this.open) return;

    const path = e.composedPath();
    if (!path.includes(this)) {
      this.hide();
    }
  };

  /**
   * Handle document keydown for global keyboard shortcuts
   * @private
   */
  private _handleDocumentKeydown = (e: KeyboardEvent): void => {
    // Close on Escape if open
    if (this.open && e.key === 'Escape') {
      e.preventDefault();
      this.hide();
      this._triggerElement?.focus();
    }
  };

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
    this.values = [];
    this.error = false;
    this.hide();
  };

  // ========================================
  // Dropdown Management
  // ========================================

  /**
   * Called when dropdown opens
   * @private
   */
  private _onDropdownOpen(): void {
    // Find and highlight the currently selected option, or nothing if none selected
    const selectedIndex = this._options.findIndex((opt) =>
      this.multiple ? this.values.includes(opt.value) : opt.value === this.value
    );
    this._highlightedIndex = selectedIndex; // -1 if nothing selected

    // Emit show event
    this.dispatchEvent(
      new CustomEvent('sando-show', {
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Called when dropdown closes
   * @private
   */
  private _onDropdownClose(): void {
    this._highlightedIndex = -1;
    this._clearTypeahead();

    // Emit hide event
    this.dispatchEvent(
      new CustomEvent('sando-hide', {
        bubbles: true,
        composed: true
      })
    );
  }

  // ========================================
  // Option Collection & Management
  // ========================================

  /**
   * Handle slot changes to collect options
   * @private
   */
  private _handleSlotChange = (): void => {
    // Query all sando-option elements (including nested in groups)
    const options = this.querySelectorAll('sando-option') as NodeListOf<SandoOption>;
    this._options = Array.from(options);

    // Build value-to-label map
    this._valueLabels.clear();
    this._options.forEach((opt) => {
      this._valueLabels.set(opt.getValue(), opt.getLabel());
    });

    // Sync selected states
    this._syncOptionSelectedStates();
  };

  /**
   * Sync selected attribute on options based on current value(s)
   * @private
   */
  private _syncOptionSelectedStates(): void {
    const selectedValues = this.multiple ? this.values : this.value ? [this.value] : [];

    this._options.forEach((option) => {
      option.selected = selectedValues.includes(option.getValue());
    });
  }

  /**
   * Update highlighted option based on current index
   * @private
   */
  private _updateHighlightedOption(): void {
    this._options.forEach((option, index) => {
      option.highlighted = index === this._highlightedIndex;
    });

    // Scroll highlighted option into view
    if (this._highlightedIndex >= 0 && this._options[this._highlightedIndex]) {
      const option = this._options[this._highlightedIndex];
      // Guard for environments without scrollIntoView (e.g., jsdom in tests)
      if (typeof option.scrollIntoView === 'function') {
        option.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }

  /**
   * Handle option selection from child sando-option
   * @private
   */
  private _handleOptionSelect = (e: CustomEvent<OptionSelectEventDetail>): void => {
    const { value } = e.detail;

    if (this.multiple) {
      // Toggle selection in multiple mode
      const newValues = this.values.includes(value)
        ? this.values.filter((v) => v !== value)
        : [...this.values, value];
      this.values = newValues;
    } else {
      // Single selection
      this.value = value;
      this.hide();
    }

    this._emitChangeEvent();
  };

  // ========================================
  // Keyboard Navigation
  // ========================================

  /**
   * Handle keyboard events on trigger
   * @private
   */
  private _handleTriggerKeydown = (e: KeyboardEvent): void => {
    if (this.disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this.open) {
          // Select highlighted option
          this._selectHighlightedOption();
        } else {
          this.show();
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (!this.open) {
          this.show();
        } else {
          this._highlightNextOption();
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (!this.open) {
          this.show();
        } else {
          this._highlightPreviousOption();
        }
        break;

      case 'Home':
        e.preventDefault();
        if (this.open) {
          this._highlightFirstOption();
        }
        break;

      case 'End':
        e.preventDefault();
        if (this.open) {
          this._highlightLastOption();
        }
        break;

      case 'Tab':
        if (this.open) {
          this.hide();
        }
        break;

      default:
        // Type-ahead: letter/number keys
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          this._handleTypeahead(e.key);
        }
        break;
    }
  };

  /**
   * Highlight the next option
   * @private
   */
  private _highlightNextOption(): void {
    const enabledOptions = this._getEnabledOptionIndices();
    if (enabledOptions.length === 0) return;

    const currentIndex = enabledOptions.indexOf(this._highlightedIndex);
    const nextIndex = currentIndex < enabledOptions.length - 1 ? currentIndex + 1 : 0;
    this._highlightedIndex = enabledOptions[nextIndex];
  }

  /**
   * Highlight the previous option
   * @private
   */
  private _highlightPreviousOption(): void {
    const enabledOptions = this._getEnabledOptionIndices();
    if (enabledOptions.length === 0) return;

    const currentIndex = enabledOptions.indexOf(this._highlightedIndex);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : enabledOptions.length - 1;
    this._highlightedIndex = enabledOptions[prevIndex];
  }

  /**
   * Highlight the first option
   * @private
   */
  private _highlightFirstOption(): void {
    const enabledOptions = this._getEnabledOptionIndices();
    if (enabledOptions.length > 0) {
      this._highlightedIndex = enabledOptions[0];
    }
  }

  /**
   * Highlight the last option
   * @private
   */
  private _highlightLastOption(): void {
    const enabledOptions = this._getEnabledOptionIndices();
    if (enabledOptions.length > 0) {
      this._highlightedIndex = enabledOptions[enabledOptions.length - 1];
    }
  }

  /**
   * Get indices of enabled (non-disabled) options
   * @private
   */
  private _getEnabledOptionIndices(): number[] {
    return this._options
      .map((opt, i) => ({ opt, i }))
      .filter(({ opt }) => !opt.disabled)
      .map(({ i }) => i);
  }

  /**
   * Select the currently highlighted option
   * @private
   */
  private _selectHighlightedOption(): void {
    if (this._highlightedIndex >= 0 && this._options[this._highlightedIndex]) {
      const option = this._options[this._highlightedIndex];
      if (!option.disabled) {
        const value = option.getValue();

        if (this.multiple) {
          const newValues = this.values.includes(value)
            ? this.values.filter((v) => v !== value)
            : [...this.values, value];
          this.values = newValues;
        } else {
          this.value = value;
          this.hide();
        }

        this._emitChangeEvent();
      }
    }
  }

  /**
   * Handle type-ahead for quick selection
   * @private
   */
  private _handleTypeahead(char: string): void {
    this._typeaheadBuffer += char.toLowerCase();

    // Clear previous timeout
    if (this._typeaheadTimeout) {
      clearTimeout(this._typeaheadTimeout);
    }

    // Set timeout to clear buffer
    this._typeaheadTimeout = setTimeout(() => {
      this._clearTypeahead();
    }, 500);

    // Find matching option
    const enabledOptions = this._getEnabledOptionIndices();
    const matchIndex = enabledOptions.find((i) => {
      const label = this._options[i].getLabel().toLowerCase();
      return label.startsWith(this._typeaheadBuffer);
    });

    if (matchIndex !== undefined) {
      this._highlightedIndex = matchIndex;
      if (!this.open) {
        this.show();
      }
    }
  }

  /**
   * Clear type-ahead buffer
   * @private
   */
  private _clearTypeahead(): void {
    this._typeaheadBuffer = '';
    if (this._typeaheadTimeout) {
      clearTimeout(this._typeaheadTimeout);
      this._typeaheadTimeout = null;
    }
  }

  // ========================================
  // Infinite Scroll
  // ========================================

  /**
   * Setup IntersectionObserver for infinite scroll
   * @private
   */
  private _setupScrollObserver(): void {
    // Guard for environments without IntersectionObserver (e.g., jsdom in tests)
    if (!this._scrollSentinel || typeof IntersectionObserver === 'undefined') return;

    this._scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && this.open) {
            this.dispatchEvent(
              new CustomEvent('sando-scroll-end', {
                bubbles: true,
                composed: true
              })
            );
          }
        });
      },
      {
        root: this._dropdownElement,
        rootMargin: '100px',
        threshold: 0
      }
    );

    this._scrollObserver.observe(this._scrollSentinel);
  }

  /**
   * Destroy IntersectionObserver
   * @private
   */
  private _destroyScrollObserver(): void {
    if (this._scrollObserver) {
      this._scrollObserver.disconnect();
      this._scrollObserver = null;
    }
  }

  // ========================================
  // Event Emitters
  // ========================================

  /**
   * Emit change event
   * @private
   */
  private _emitChangeEvent(): void {
    this.dispatchEvent(
      new CustomEvent<SelectChangeEventDetail>('sando-change', {
        detail: {
          value: this.multiple ? this.values : this.value
        },
        bubbles: true,
        composed: true
      })
    );
  }

  // ========================================
  // Click Handlers
  // ========================================

  /**
   * Handle trigger click
   * @private
   */
  private _handleTriggerClick = (): void => {
    if (this.disabled) return;
    this.toggle();
  };

  /**
   * Handle clear button click
   * @private
   */
  private _handleClear = (e: MouseEvent): void => {
    e.stopPropagation();
    if (this.disabled) return;

    this.clear();

    this.dispatchEvent(
      new CustomEvent('sando-clear', {
        bubbles: true,
        composed: true
      })
    );
  };

  /**
   * Handle tag removal in multi-select (from sando-tag sando-remove event)
   * @private
   */
  private _handleTagRemove = (value: string, e: CustomEvent): void => {
    e.stopPropagation(); // Don't open dropdown when clicking tag X
    if (this.disabled) return;

    this.values = this.values.filter((v) => v !== value);
    this._emitChangeEvent();
  };

  // ========================================
  // Render Helpers
  // ========================================

  /**
   * Get the display label for current value
   * @private
   */
  private _getDisplayLabel(): string {
    if (!this.value) return '';
    return this._valueLabels.get(this.value) || this.value;
  }

  /**
   * Check if select has a value
   * @private
   */
  private _hasValue(): boolean {
    return this.multiple ? this.values.length > 0 : Boolean(this.value);
  }

  /**
   * Get the appropriate tag size based on select size
   * Tags are slightly smaller than the select to fit well
   * @private
   */
  private _getTagSize(): TagSize {
    const sizeMap: Record<SelectSize, TagSize> = {
      small: 'small',
      medium: 'small',
      large: 'medium'
    };
    return sizeMap[this.size];
  }

  /**
   * Render caret icon
   * @private
   */
  private _renderCaretIcon() {
    return html`
      <sando-icon name="chevron-down" size="small" decorative inherit-color></sando-icon>
    `;
  }

  /**
   * Render clear icon
   * @private
   */
  private _renderClearIcon() {
    return html` <sando-icon name="x" size="small" decorative inherit-color></sando-icon> `;
  }

  /**
   * Render value display for single select
   * @private
   */
  private _renderSingleValue() {
    const displayLabel = this._getDisplayLabel();
    const showPlaceholder = !displayLabel;

    return html`
      <span class="select-value ${showPlaceholder ? 'placeholder' : ''}">
        ${displayLabel || this.placeholder || ''}
      </span>
    `;
  }

  /**
   * Render tags for multi-select using sando-tag component
   * @private
   */
  private _renderMultiValue() {
    if (this.values.length === 0) {
      return html` <span class="select-value placeholder"> ${this.placeholder || ''} </span> `;
    }

    const visibleValues = this.values.slice(0, this.maxTagsVisible);
    const overflowCount = this.values.length - this.maxTagsVisible;

    return html`
      <div class="select-tags">
        ${visibleValues.map((value) => {
          const label = this._valueLabels.get(value) || value;
          return html`
            <sando-tag
              removable
              size=${this._getTagSize()}
              variant="solid"
              ?disabled=${this.disabled}
              @sando-remove=${(e: CustomEvent) => this._handleTagRemove(value, e)}
            >
              ${label}
            </sando-tag>
          `;
        })}
        ${overflowCount > 0
          ? html`<span class="select-overflow">+${overflowCount}</span>`
          : nothing}
      </div>
    `;
  }

  render() {
    const hasHelperText = this.helperText && !this.error;
    const hasErrorText = this.errorText && this.error;
    const describedBy = hasHelperText || hasErrorText ? `${this._inputId}-description` : undefined;

    // Get aria-activedescendant for highlighted option
    const highlightedOption =
      this._highlightedIndex >= 0 ? this._options[this._highlightedIndex] : null;
    const activeDescendant = highlightedOption ? highlightedOption.id : undefined;

    return html`
      <div class="select-wrapper">
        ${this.label
          ? html`
              <label class="select-label" id="${this._inputId}-label" for="${this._inputId}">
                ${this.label}
                ${this.required
                  ? html`<span class="required-indicator" aria-hidden="true">*</span>`
                  : nothing}
              </label>
            `
          : nothing}

        <button
          type="button"
          class="select-trigger"
          id="${this._inputId}"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-controls=${this.open ? `${this._inputId}-listbox` : nothing}
          aria-activedescendant=${activeDescendant || nothing}
          aria-required=${this.required ? 'true' : nothing}
          aria-invalid=${this.error ? 'true' : 'false'}
          aria-disabled=${this.disabled ? 'true' : nothing}
          aria-describedby=${describedBy || nothing}
          ?disabled=${this.disabled}
          @click=${this._handleTriggerClick}
          @keydown=${this._handleTriggerKeydown}
        >
          <span class="select-prefix">
            <slot name="prefix"></slot>
          </span>

          ${this.multiple ? this._renderMultiValue() : this._renderSingleValue()}

          <span class="select-suffix">
            <slot name="suffix"></slot>
          </span>

          ${this.clearable && this._hasValue() && !this.disabled
            ? html`
                <button
                  type="button"
                  class="select-clear"
                  aria-label="Clear selection"
                  @click=${this._handleClear}
                >
                  <slot name="clear-icon"> ${this._renderClearIcon()} </slot>
                </button>
              `
            : nothing}

          <span class="select-caret" aria-hidden="true">
            <slot name="expand-icon"> ${this._renderCaretIcon()} </slot>
          </span>
        </button>

        <div
          class="select-dropdown"
          id="${this._inputId}-listbox"
          role="listbox"
          aria-labelledby="${this._inputId}-label"
          aria-multiselectable=${this.multiple ? 'true' : nothing}
          ?hidden=${!this.open}
          @sando-option-select=${this._handleOptionSelect}
        >
          <slot @slotchange=${this._handleSlotChange}></slot>
          <div class="scroll-sentinel" aria-hidden="true"></div>
        </div>

        ${hasHelperText
          ? html`
              <div id="${this._inputId}-description" class="helper-text">${this.helperText}</div>
            `
          : nothing}
        ${hasErrorText
          ? html`
              <div id="${this._inputId}-description" class="error-text" role="alert">
                ${this.errorText}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  // ========================================
  // Public API
  // ========================================

  /**
   * Open the dropdown
   */
  show(): void {
    if (!this.disabled && !this.open) {
      this.open = true;
    }
  }

  /**
   * Close the dropdown
   */
  hide(): void {
    if (this.open) {
      this.open = false;
    }
  }

  /**
   * Toggle the dropdown
   */
  toggle(): void {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Clear all selections
   */
  clear(): void {
    if (this.multiple) {
      this.values = [];
    } else {
      this.value = '';
    }
    this._emitChangeEvent();
  }

  /**
   * Focus the trigger element
   */
  override focus(): void {
    this._triggerElement?.focus();
  }

  /**
   * Blur the trigger element
   */
  blur(): void {
    this._triggerElement?.blur();
  }

  /**
   * Check validity of select
   * For required selects, checks if a value is selected
   */
  checkValidity(): boolean {
    if (this.required) {
      return this.multiple ? this.values.length > 0 : Boolean(this.value);
    }
    return true;
  }

  /**
   * Report validity with error state
   */
  reportValidity(): boolean {
    const isValid = this.checkValidity();
    if (!isValid) {
      this.error = true;
    }
    return isValid;
  }

  /**
   * Set custom validity message
   * Sets error state and errorText
   */
  setCustomValidity(message: string): void {
    if (message) {
      this.error = true;
      this.errorText = message;
    } else {
      this.error = false;
      this.errorText = undefined;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-select': SandoSelect;
  }
}
