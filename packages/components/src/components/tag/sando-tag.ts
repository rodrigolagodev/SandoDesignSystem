/**
 * Sando Tag Component
 *
 * A versatile chip/badge component supporting three mutually exclusive use cases:
 *
 * ## Priority/Exclusivity Rules
 *
 * 1. **`removable` is EXCLUSIVE** - When `removable=true`:
 *    - Always shows the X (dismiss) button
 *    - Only the X button is clickable → emits `sando-remove`
 *    - IGNORES `clickable` and `href` props (they have no effect)
 *    - The `slot="icon"` is NOT rendered (X replaces any custom icon)
 *
 * 2. **`href` takes precedence over `clickable`** - When `href` is set:
 *    - Renders as `<a>`, entire tag is clickable
 *    - `slot="icon"` renders if provided
 *
 * 3. **`clickable` for button behavior** - When `clickable=true`:
 *    - Renders as `<button>`, entire tag is clickable
 *    - `slot="icon"` renders if provided
 *
 * 4. **Informative (default)** - No special props:
 *    - Display-only, no interaction
 *    - `slot="icon"` renders if provided
 *
 * @element sando-tag
 *
 * @slot - Tag content/label
 * @slot icon - Optional custom icon (NOT rendered when removable=true)
 *
 * @fires sando-remove - Fired when remove button is clicked (only when removable=true)
 *
 * @cssprop --sando-tag-fontFamily - Tag font family
 * @cssprop --sando-tag-fontWeight - Tag font weight
 * @cssprop --sando-tag-borderRadius - Tag border radius
 * @cssprop --sando-tag-transition-duration - Transition duration
 *
 * @example Informative tag (display only)
 * <sando-tag variant="solid">New</sando-tag>
 *
 * @example Informative tag with custom icon
 * <sando-tag>
 *   Status
 *   <svg slot="icon">...</svg>
 * </sando-tag>
 *
 * @example Removable tag (icon slot is IGNORED, X button shown instead)
 * <sando-tag removable>JavaScript</sando-tag>
 *
 * @example Clickable tag with icon
 * <sando-tag clickable>
 *   View Details
 *   <svg slot="icon">...</svg>
 * </sando-tag>
 *
 * @example Tag as link
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
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { TagVariant, TagSize, TagRemoveEventDetail } from './sando-tag.types.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, variantStyles, sizeStyles, stateStyles } from './styles/index.js';

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
   * Determines if the tag is interactive (clickable or link)
   */
  private get _isInteractive(): boolean {
    return (this.clickable || !!this.href) && !this.removable;
  }

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
   * Handles keyboard events on remove button
   */
  private _handleRemoveKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleRemove(e);
    }
  }

  /**
   * Handles keyboard events on clickable tag
   */
  private _handleTagKeydown(e: KeyboardEvent): void {
    if (!this._isInteractive || this.disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      // Links handle Enter natively, but we need Space for button-like behavior
      if (e.key === ' ' && this.clickable && !this.href) {
        e.preventDefault();
        this.click();
      }
    }
  }

  /**
   * Gets the accessible label for the remove button
   */
  private _getRemoveLabel(): string {
    // Try to get text content from the default slot
    const textContent = this.textContent?.trim() || 'tag';
    return `Remove ${textContent}`;
  }

  /**
   * Renders the remove button (X)
   */
  private _renderRemoveButton() {
    if (!this.removable) return nothing;

    return html`
      <button
        class="tag__remove"
        type="button"
        aria-label=${this._getRemoveLabel()}
        ?disabled=${this.disabled}
        @click=${this._handleRemove}
        @keydown=${this._handleRemoveKeydown}
      >
        <svg
          class="tag__remove-icon"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M12 4L4 12M4 4L12 12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    `;
  }

  /**
   * Checks if an icon is present in the icon slot
   */
  private _hasIcon = false;

  /**
   * Handles slot change to detect icon presence
   */
  private _handleIconSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    this._hasIcon = slot.assignedElements().length > 0;
    this.requestUpdate();
  }

  /**
   * Renders the divider element between content and icon/remove button
   */
  private _renderDivider() {
    // Show divider when removable OR when icon slot has content
    const showDivider = this.removable || this._hasIcon;
    if (!showDivider) return nothing;

    return html`<span class="tag__divider" aria-hidden="true"></span>`;
  }

  /**
   * Renders tag content (shared between all tag types)
   * Note: icon slot is NOT rendered when removable=true
   */
  private _renderContent() {
    return html`
      <span class="tag__content">
        <slot></slot>
      </span>
      ${this._renderDivider()}
      ${this.removable
        ? this._renderRemoveButton()
        : html`<slot name="icon" @slotchange=${this._handleIconSlotChange}></slot>`}
    `;
  }

  render() {
    const classes = {
      tag: true,
      'tag--clickable': this._isInteractive,
      'tag--removable': this.removable,
      'tag--disabled': this.disabled
    };

    // Case 1: Removable tag - span wrapper (only X is interactive)
    if (this.removable) {
      return html`
        <span class=${classMap(classes)} role="status" part="tag"> ${this._renderContent()} </span>
      `;
    }

    // Case 2: Link tag - anchor element
    if (this.href) {
      return html`
        <a
          class=${classMap(classes)}
          href=${this.href}
          target=${ifDefined(this.target)}
          rel=${this.target === '_blank' ? 'noopener noreferrer' : nothing}
          aria-disabled=${this.disabled ? 'true' : 'false'}
          tabindex=${this.disabled ? -1 : 0}
          part="tag"
          @keydown=${this._handleTagKeydown}
        >
          ${this._renderContent()}
        </a>
      `;
    }

    // Case 3: Clickable tag - button element
    if (this.clickable) {
      return html`
        <button
          class=${classMap(classes)}
          type="button"
          ?disabled=${this.disabled}
          part="tag"
          @keydown=${this._handleTagKeydown}
        >
          ${this._renderContent()}
        </button>
      `;
    }

    // Case 4: Informative tag - span with status role
    return html`
      <span class=${classMap(classes)} role="status" part="tag"> ${this._renderContent()} </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-tag': SandoTag;
  }
}
