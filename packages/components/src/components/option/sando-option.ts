/**
 * Sando Option Component
 *
 * An individual option element for use within sando-select.
 * Similar to a native `<option>` element but with enhanced styling and accessibility.
 *
 * @element sando-option
 *
 * @slot - The option label/content
 * @slot prefix - Icon or content before the label
 * @slot suffix - Badge or content after the label
 *
 * @fires sando-option-select - Fired when the option is clicked/selected
 *
 * @cssprop --sando-select-option-backgroundColor-default - Background color (default state)
 * @cssprop --sando-select-option-backgroundColor-hover - Background color (hover state)
 * @cssprop --sando-select-option-backgroundColor-focus - Background color (keyboard focus)
 * @cssprop --sando-select-option-backgroundColor-selected - Background color (selected state)
 * @cssprop --sando-select-option-backgroundColor-selectedHover - Background color (selected + hover)
 * @cssprop --sando-select-option-backgroundColor-disabled - Background color (disabled state)
 * @cssprop --sando-select-option-textColor-default - Text color (default state)
 * @cssprop --sando-select-option-textColor-hover - Text color (hover state)
 * @cssprop --sando-select-option-textColor-focus - Text color (keyboard focus)
 * @cssprop --sando-select-option-textColor-selected - Text color (selected state)
 * @cssprop --sando-select-option-textColor-disabled - Text color (disabled state)
 * @cssprop --sando-select-option-checkmarkColor-default - Checkmark color (default)
 * @cssprop --sando-select-option-checkmarkColor-selected - Checkmark color (selected)
 * @cssprop --sando-select-option-checkmarkColor-disabled - Checkmark color (disabled)
 * @cssprop --sando-select-option-paddingInline - Horizontal padding
 * @cssprop --sando-select-option-paddingBlock - Vertical padding
 * @cssprop --sando-select-option-fontSize - Font size
 * @cssprop --sando-select-option-gap - Gap between elements
 * @cssprop --sando-select-option-minHeight - Minimum height
 *
 * @example Basic usage within sando-select
 * ```html
 * <sando-select>
 *   <sando-option value="apple">Apple</sando-option>
 *   <sando-option value="banana">Banana</sando-option>
 *   <sando-option value="cherry">Cherry</sando-option>
 * </sando-select>
 * ```
 *
 * @example With prefix icon
 * ```html
 * <sando-option value="home">
 *   <sando-icon slot="prefix" name="home"></sando-icon>
 *   Home
 * </sando-option>
 * ```
 *
 * @example Disabled option
 * ```html
 * <sando-option value="unavailable" disabled>
 *   Not Available
 * </sando-option>
 * ```
 *
 * @example With suffix badge
 * ```html
 * <sando-option value="pro">
 *   Pro Plan
 *   <sando-tag slot="suffix" size="small">Popular</sando-tag>
 * </sando-option>
 * ```
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type { OptionSelectEventDetail } from './sando-option.types.js';
import type { SandoSelect } from '../select/sando-select.js';

import { FlavorableMixin } from '../../mixins/index.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, stateStyles, checkboxStyles } from './styles/index.js';

// Import sando-icon for checkmark
import '../icon/sando-icon.js';

@customElement('sando-option')
export class SandoOption extends FlavorableMixin(LitElement) {
  /**
   * Component styles - modular CSS imports
   * Order matters for specificity
   */
  static styles = [
    tokenStyles, // Design tokens (Ingredients, Flavors, Recipes)
    baseStyles, // Reset, layout, typography
    stateStyles, // Hover, selected, disabled, highlighted
    checkboxStyles // Multi-select checkbox visual
  ];

  /**
   * The value of this option (required)
   * This is the value that will be submitted with the form
   */
  @property({ reflect: true })
  value = '';

  /**
   * Whether the option is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the option is currently selected
   * Managed by parent sando-select
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * Whether the parent select is in multiple selection mode
   * Set by parent sando-select
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  multiple = false;

  /**
   * Prefix icon name from parent select (for single-select mode)
   * Set by parent sando-select when it has a prefixIcon
   */
  @property({ type: String, attribute: 'parent-prefix-icon' })
  parentPrefixIcon?: string;

  /**
   * Internal: Whether the option is highlighted via keyboard navigation
   * Set by parent sando-select during arrow key navigation
   * @private
   */
  @state()
  private _highlighted = false;

  /**
   * Lifecycle: Called when component is added to DOM
   * Synchronously reads parent context before first render to prevent visual flash
   */
  connectedCallback(): void {
    super.connectedCallback();
    this._initializeParentContext();
  }

  /**
   * Synchronously read parent select context before first render
   * This prevents visual flash by ensuring props are set before paint
   * @private
   */
  private _initializeParentContext(): void {
    const parentSelect = this.closest('sando-select') as SandoSelect | null;
    if (parentSelect) {
      // Read values synchronously - these are already set on parent
      this.multiple = parentSelect.multiple;
      this.parentPrefixIcon = parentSelect.prefixIcon;
    }
  }

  /**
   * Get the highlighted state (for external reading)
   */
  get highlighted(): boolean {
    return this._highlighted;
  }

  /**
   * Set the highlighted state (for parent component control)
   */
  set highlighted(value: boolean) {
    const oldValue = this._highlighted;
    this._highlighted = value;

    // Update the reflected attribute for CSS styling
    if (value) {
      this.setAttribute('highlighted', '');
    } else {
      this.removeAttribute('highlighted');
    }

    this.requestUpdate('highlighted', oldValue);
  }

  /**
   * Handle click on the option
   * Emits sando-option-select event if not disabled
   * @private
   */
  private _handleClick(): void {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent<OptionSelectEventDetail>('sando-option-select', {
        detail: {
          value: this.getValue(),
          label: this.getLabel()
        },
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Render visual checkbox for multi-select mode
   * Only presentational - the checkbox visual is managed by CSS
   * @private
   */
  private _renderCheckbox() {
    return html`
      <span class="option-checkbox ${this.selected ? 'checked' : ''}" aria-hidden="true">
        ${this.selected
          ? html`<sando-icon name="check" size="small" decorative inherit-color></sando-icon>`
          : nothing}
      </span>
    `;
  }

  /**
   * Render prefix icon from parent select (single-select mode)
   * Guard is defense-in-depth since _renderPrefix already checks parentPrefixIcon
   * @private
   */
  private _renderParentPrefixIcon() {
    if (!this.parentPrefixIcon) return nothing;
    return html`
      <sando-icon
        name="${this.parentPrefixIcon}"
        size="small"
        class="option-parent-prefix-icon"
        decorative
        inherit-color
      ></sando-icon>
    `;
  }

  /**
   * Render the prefix area based on select mode
   * - Multi-select: visual checkbox
   * - Single-select with prefix-icon: parent's prefix icon
   * - Single-select without prefix: nothing (no reserved space)
   * @private
   */
  private _renderPrefix() {
    // Multi-select: always show checkbox
    if (this.multiple) {
      return this._renderCheckbox();
    }

    // Single-select with prefix-icon from parent
    if (this.parentPrefixIcon) {
      return this._renderParentPrefixIcon();
    }

    // Single-select without prefix: nothing
    return nothing;
  }

  render() {
    return html`
      <div
        class="option"
        part="option"
        role="option"
        aria-selected=${this.selected ? 'true' : 'false'}
        aria-disabled=${this.disabled ? 'true' : nothing}
        @click=${this._handleClick}
      >
        ${this._renderPrefix()}

        <span class="option-prefix" part="prefix">
          <slot name="prefix"></slot>
        </span>

        <span class="option-content" part="content">
          <slot></slot>
        </span>

        <span class="option-suffix" part="suffix">
          <slot name="suffix"></slot>
        </span>
      </div>
    `;
  }

  /**
   * Public API: Get the text content/label of this option
   * Extracts text from the default slot
   */
  getLabel(): string {
    // Get text content from slotted content
    const slot = this.shadowRoot?.querySelector('slot:not([name])');
    if (slot) {
      const nodes = (slot as HTMLSlotElement).assignedNodes({ flatten: true });
      const text = nodes
        .map((node) => (node.textContent || '').trim())
        .filter(Boolean)
        .join(' ');
      return text || this.value;
    }
    return this.textContent?.trim() || this.value;
  }

  /**
   * Public API: Get the value of this option
   */
  getValue(): string {
    return this.value;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-option': SandoOption;
  }
}
