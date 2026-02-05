/**
 * Sando Tag Component
 *
 * A versatile chip/badge component with mandatory icon and specialized click behavior.
 * Inspired by Strapi's Tag pattern where only the icon area is interactive.
 *
 * ## Structure
 *
 * All tags follow this structure:
 * ```
 * <span class="tag">
 *   <span class="tag__content">text</span>
 *   <span class="tag__divider"></span>
 *   <icon-area>  <!-- behavior varies by mode -->
 * </span>
 * ```
 *
 * ## Icon Behavior
 *
 * - Icon is ALWAYS rendered (mandatory)
 * - Default: circle-chevron-right icon
 * - Custom: provide `slot="icon"` to override default
 *
 * ## Interaction Modes (Mutually Exclusive)
 *
 * 1. **`removable` (highest priority)** - X button replaces icon
 *    - Only X button is clickable → emits `sando-remove`
 *    - `slot="icon"` is NOT rendered (X replaces it)
 *
 * 2. **`href`** - Icon wrapped in `<a>` anchor
 *    - ONLY the icon area navigates
 *    - Content area is NOT clickable
 *
 * 3. **`clickable`** - Icon wrapped in `<button>`
 *    - ONLY the icon area is clickable
 *    - Content area is NOT clickable
 *
 * 4. **Informative (default)** - Icon visible but NOT interactive
 *    - Display-only, no click behavior
 *
 * @element sando-tag
 *
 * @slot - Tag content/label
 * @slot icon - Custom icon (overrides default circle-chevron-right). NOT rendered when removable=true.
 *
 * @fires sando-remove - Fired when remove button is clicked (only when removable=true)
 * @fires sando-action - Fired when icon action is clicked (when clickable=true)
 *
 * @cssprop --sando-tag-fontFamily - Tag font family
 * @cssprop --sando-tag-fontWeight - Tag font weight
 * @cssprop --sando-tag-borderRadius - Tag border radius
 * @cssprop --sando-tag-transition-duration - Transition duration
 *
 * @example Informative tag (icon visible but not interactive)
 * <sando-tag variant="solid">New</sando-tag>
 *
 * @example Tag with custom icon
 * <sando-tag>
 *   Status
 *   <svg slot="icon">...</svg>
 * </sando-tag>
 *
 * @example Removable tag (X button replaces icon)
 * <sando-tag removable>JavaScript</sando-tag>
 *
 * @example Clickable tag (only icon area is interactive)
 * <sando-tag clickable>View Details</sando-tag>
 *
 * @example Tag as link (only icon area navigates)
 * <sando-tag href="/category/design" target="_blank">Design</sando-tag>
 *
 * @example Size variants
 * <sando-tag size="small">Small</sando-tag>
 * <sando-tag size="medium">Medium</sando-tag>
 * <sando-tag size="large">Large</sando-tag>
 *
 * @example Variant styles
 * <sando-tag variant="solid">Solid</sando-tag>
 * <sando-tag variant="outline">Outline</sando-tag>
 * <sando-tag variant="soft">Soft</sando-tag>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type {
  TagVariant,
  TagSize,
  TagRemoveEventDetail,
  TagActionEventDetail
} from './sando-tag.types.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, variantStyles, sizeStyles, stateStyles } from './styles/index.js';

// Import sando-icon for default and remove icons
import '../icon/sando-icon.js';

@customElement('sando-tag')
export class SandoTag extends FlavorableMixin(LitElement) {
  /**
   * Shadow DOM focus delegation for proper keyboard navigation
   * Required per KEYBOARD_NAVIGATION.toon (KN-CR-R5)
   */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };

  /**
   * Visual style variant of the tag
   * @default 'solid'
   */
  @property({ reflect: true })
  variant: TagVariant = 'solid';

  /**
   * Size of the tag
   * @default 'medium'
   */
  @property({ reflect: true })
  size: TagSize = 'medium';

  /**
   * Whether the tag is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Shows a remove (X) button, making only that button clickable.
   *
   * **EXCLUSIVE**: When `removable=true`:
   * - `clickable` and `href` props are IGNORED
   * - `slot="icon"` is NOT rendered (X button replaces custom icons)
   * - Only the X button is interactive, content area is not clickable
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  removable = false;

  /**
   * Makes the entire tag clickable (button behavior).
   *
   * **Note**: Has no effect when `removable=true` (removable is exclusive).
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  /**
   * URL to navigate to (renders as anchor, makes tag clickable).
   *
   * **Note**: Has no effect when `removable=true` (removable is exclusive).
   */
  @property({ reflect: true })
  href?: string;

  /**
   * Link target for href navigation
   */
  @property({ reflect: true })
  target?: string;

  /**
   * Component styles - modular CSS imports
   * Order matters for specificity
   */
  static styles = [
    tokenStyles, // Design tokens (Ingredients, Flavors, Recipes)
    baseStyles, // Reset, layout, typography, focus
    variantStyles, // Solid, outline, soft
    sizeStyles, // Small, medium, large
    stateStyles // Disabled state
  ];

  /**
   * Tracks if a custom icon is provided in the slot
   */
  @state()
  private _hasCustomIcon = false;

  /**
   * Handles remove button click
   */
  private _handleRemove(e: MouseEvent | KeyboardEvent): void {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    const detail: TagRemoveEventDetail = {
      originalEvent: e
    };

    this.dispatchEvent(
      new CustomEvent('sando-remove', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Handles action button/link click (for clickable mode)
   */
  private _handleAction(e: MouseEvent | KeyboardEvent): void {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    const detail: TagActionEventDetail = {
      originalEvent: e
    };

    this.dispatchEvent(
      new CustomEvent('sando-action', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Handles keyboard events on action button
   */
  private _handleActionKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleAction(e);
    }
  }

  /**
   * Gets the accessible label for the remove button
   */
  private _getRemoveLabel(): string {
    const textContent = this.textContent?.trim() || 'tag';
    return `Remove ${textContent}`;
  }

  /**
   * Gets the accessible label for the action button/link
   */
  private _getActionLabel(): string {
    const textContent = this.textContent?.trim() || 'tag';
    if (this.href) {
      return `Navigate to ${textContent}`;
    }
    return `Action for ${textContent}`;
  }

  /**
   * Handles slot change to detect custom icon presence
   */
  private _handleIconSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    this._hasCustomIcon = slot.assignedElements().length > 0;
  }

  /**
   * Renders the default circle-chevron-right icon
   */
  private _renderDefaultIcon() {
    return html`
      <sando-icon
        class="tag__default-icon"
        name="circle-chevron-right"
        decorative
        inherit-color
      ></sando-icon>
    `;
  }

  /**
   * Renders the X icon for removable tags
   */
  private _renderRemoveIcon() {
    return html`
      <sando-icon class="tag__remove-icon" name="x" decorative inherit-color></sando-icon>
    `;
  }

  /**
   * Renders the icon content (slot or default)
   * Hidden slot is always rendered to detect custom icons
   */
  private _renderIconContent() {
    return html`
      <slot
        name="icon"
        @slotchange=${this._handleIconSlotChange}
        style=${this._hasCustomIcon ? '' : 'display: none'}
      ></slot>
      ${!this._hasCustomIcon ? this._renderDefaultIcon() : nothing}
    `;
  }

  /**
   * Renders the divider element between content and icon area
   * Always shown since icon is mandatory
   */
  private _renderDivider() {
    return html`<span class="tag__divider" aria-hidden="true"></span>`;
  }

  /**
   * Renders the icon area based on interaction mode
   */
  private _renderIconArea() {
    // Case 1: Removable - X button
    if (this.removable) {
      return html`
        <button
          class="tag__action tag__action--remove"
          type="button"
          aria-label=${this._getRemoveLabel()}
          ?disabled=${this.disabled}
          @click=${this._handleRemove}
        >
          ${this._renderRemoveIcon()}
        </button>
      `;
    }

    // Case 2: Link - anchor wrapping icon
    if (this.href) {
      return html`
        <a
          class="tag__action tag__action--link"
          href=${this.href}
          target=${ifDefined(this.target)}
          rel=${this.target === '_blank' ? 'noopener noreferrer' : nothing}
          aria-label=${this._getActionLabel()}
          tabindex=${this.disabled ? -1 : 0}
          aria-disabled=${this.disabled ? 'true' : 'false'}
        >
          ${this._renderIconContent()}
        </a>
      `;
    }

    // Case 3: Clickable - button wrapping icon
    if (this.clickable) {
      return html`
        <button
          class="tag__action tag__action--button"
          type="button"
          aria-label=${this._getActionLabel()}
          ?disabled=${this.disabled}
          @click=${this._handleAction}
          @keydown=${this._handleActionKeydown}
        >
          ${this._renderIconContent()}
        </button>
      `;
    }

    // Case 4: Informative - span wrapping icon (not interactive)
    return html` <span class="tag__icon" aria-hidden="true"> ${this._renderIconContent()} </span> `;
  }

  render() {
    const classes = {
      tag: true,
      'tag--removable': this.removable,
      'tag--clickable': this.clickable && !this.removable,
      'tag--link': !!this.href && !this.removable,
      'tag--disabled': this.disabled
    };

    return html`
      <span class=${classMap(classes)} role="status" part="tag">
        <span class="tag__content">
          <slot></slot>
        </span>
        ${this._renderDivider()} ${this._renderIconArea()}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-tag': SandoTag;
  }
}
