/**
 * Sando Option Group Component
 *
 * A container that groups related options with a label, similar to native `<optgroup>`.
 * Used within sando-select to organize options into labeled categories.
 *
 * @element sando-option-group
 *
 * @slot - sando-option elements to be grouped
 *
 * @cssprop --sando-select-optionGroup-labelColor - Label text color
 * @cssprop --sando-select-optionGroup-labelFontSize - Label font size
 * @cssprop --sando-select-optionGroup-labelFontWeight - Label font weight
 * @cssprop --sando-select-optionGroup-labelPaddingInline - Label horizontal padding
 * @cssprop --sando-select-optionGroup-labelPaddingBlock - Label vertical padding
 * @cssprop --sando-select-optionGroup-dividerColor - Divider line color
 * @cssprop --sando-select-optionGroup-dividerWidth - Divider line width
 * @cssprop --sando-select-optionGroup-marginTop - Top margin (includes divider spacing)
 *
 * @example Basic usage
 * ```html
 * <sando-option-group label="Fruits">
 *   <sando-option value="apple">Apple</sando-option>
 *   <sando-option value="banana">Banana</sando-option>
 *   <sando-option value="orange">Orange</sando-option>
 * </sando-option-group>
 * ```
 *
 * @example Disabled group
 * ```html
 * <sando-option-group label="Unavailable" disabled>
 *   <sando-option value="mango">Mango</sando-option>
 *   <sando-option value="papaya">Papaya</sando-option>
 * </sando-option-group>
 * ```
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { SandoOptionGroupProps } from './sando-option-group.types.js';

import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles } from './styles/index.js';

@customElement('sando-option-group')
export class SandoOptionGroup extends FlavorableMixin(LitElement) implements SandoOptionGroupProps {
  /**
   * Component styles - modular CSS imports
   */
  static styles = [
    resetStyles, // CSS reset for Shadow DOM
    tokenStyles, // Design tokens (Ingredients, Flavors, Recipes)
    baseStyles // Layout, typography, divider
  ];

  /**
   * The group label text displayed above the options
   */
  @property({ reflect: true })
  label = '';

  /**
   * Whether the option group and all its child options are disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Lifecycle: Called when properties change
   * Propagates disabled state to child options
   */
  protected updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('disabled')) {
      this._updateChildOptionsDisabled();
    }
  }

  /**
   * Update all child sando-option elements with group-disabled attribute
   * @private
   */
  private _updateChildOptionsDisabled(): void {
    const options = this.querySelectorAll('sando-option');
    options.forEach((option) => {
      if (this.disabled) {
        option.setAttribute('group-disabled', '');
      } else {
        option.removeAttribute('group-disabled');
      }
    });
  }

  render() {
    return html`
      <div
        class="option-group"
        role="group"
        aria-label=${this.label}
        aria-disabled=${this.disabled ? 'true' : 'false'}
      >
        <div class="option-group-label" id="group-label">${this.label}</div>
        <div class="option-group-options" role="presentation">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;
  }

  /**
   * Handle slot changes to apply disabled state to dynamically added options
   * @private
   */
  private _handleSlotChange(): void {
    if (this.disabled) {
      this._updateChildOptionsDisabled();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-option-group': SandoOptionGroup;
  }
}
