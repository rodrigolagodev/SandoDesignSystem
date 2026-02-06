/**
 * Sando Badge Component
 *
 * A purely informative label component for displaying states, categories,
 * and quick labels. Unlike sando-tag, Badge is completely non-interactive
 * (no click handlers, no hover states, no removable feature).
 *
 * ## Semantic Icons
 *
 * Badge automatically displays semantic icons for status colors to improve
 * accessibility and visual clarity. Icons appear on the LEFT side of the text.
 *
 * | Color     | Icon          | Meaning                    |
 * |-----------|---------------|----------------------------|
 * | `success` | check         | Completed, valid, active   |
 * | `warning` | alert-triangle| Attention, caution         |
 * | `danger`  | x-circle      | Error, critical            |
 * | `info`    | info          | Information, note          |
 * | `neutral` | (none)        | No semantic icon           |
 * | `primary` | (none)        | No semantic icon           |
 *
 * ## Icon Customization
 *
 * - **Custom icon**: Use `icon="icon-name"` to override the default
 * - **No icon**: Use `no-icon` attribute to hide icons completely
 *
 * ## Use Cases
 *
 * - Status indicators (New, Active, Pending)
 * - Category labels (Design, Development)
 * - Quick visual tags (Pro, Beta, Featured)
 *
 * ## Semantic Colors
 *
 * - `neutral` - Default, general purpose
 * - `primary` - Brand/action emphasis
 * - `success` - Positive states (Active, Complete)
 * - `warning` - Caution states (Pending, Review)
 * - `danger` - Error/negative states (Error, Expired)
 * - `info` - Informational (New, Updated)
 *
 * ## Visual Variants
 *
 * - `solid` - Filled background (high emphasis)
 * - `soft` - Muted background (medium emphasis)
 * - `outline` - Border only (low emphasis)
 * - `surface` - Raised surface background
 *
 * @element sando-badge
 *
 * @slot - Badge content/label (text, icons, etc.)
 *
 * @cssprop --sando-badge-fontFamily - Badge font family
 * @cssprop --sando-badge-fontWeight - Badge font weight
 * @cssprop --sando-badge-lineHeight - Badge line height
 * @cssprop --sando-badge-borderRadius - Badge border radius
 * @cssprop --sando-badge-borderWidth - Badge border width
 * @cssprop --sando-badge-gap - Gap between icon and content
 * @cssprop --sando-badge-{color}-{variant}-backgroundColor - Background color for color/variant combo
 * @cssprop --sando-badge-{color}-{variant}-textColor - Text color for color/variant combo
 * @cssprop --sando-badge-{color}-{variant}-borderColor - Border color for color/variant combo
 * @cssprop --sando-badge-size-{size}-paddingInline - Horizontal padding for size
 * @cssprop --sando-badge-size-{size}-paddingBlock - Vertical padding for size
 * @cssprop --sando-badge-size-{size}-fontSize - Font size for size
 * @cssprop --sando-badge-size-{size}-minHeight - Minimum height for size
 * @cssprop --sando-badge-compact-paddingBlock - Reduced vertical padding for compact mode
 *
 * @example Basic badge
 * ```html
 * <sando-badge>New</sando-badge>
 * ```
 *
 * @example Status badges with automatic icons
 * ```html
 * <sando-badge color="success">Active</sando-badge>
 * <sando-badge color="warning">Pending</sando-badge>
 * <sando-badge color="danger">Error</sando-badge>
 * <sando-badge color="info">Beta</sando-badge>
 * ```
 *
 * @example Custom icon override
 * ```html
 * <sando-badge color="success" icon="star">Featured</sando-badge>
 * ```
 *
 * @example Hide icon completely
 * ```html
 * <sando-badge color="success" no-icon>Active</sando-badge>
 * ```
 *
 * @example Visual variants
 * ```html
 * <sando-badge variant="solid">Solid</sando-badge>
 * <sando-badge variant="soft">Soft</sando-badge>
 * <sando-badge variant="outline">Outline</sando-badge>
 * <sando-badge variant="surface">Surface</sando-badge>
 * ```
 *
 * @example Size variants
 * ```html
 * <sando-badge size="small">Small</sando-badge>
 * <sando-badge size="medium">Medium</sando-badge>
 * <sando-badge size="large">Large</sando-badge>
 * ```
 *
 * @example Compact mode for tight spaces
 * ```html
 * <sando-badge compact>Compact</sando-badge>
 * ```
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
  BadgeColor,
  BadgeVariant,
  BadgeSize,
  BadgeSemanticColor
} from './sando-badge.types.js';
import { BADGE_SEMANTIC_ICONS } from './sando-badge.types.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, colorStyles, sizeStyles } from './styles/index.js';

// Import sando-icon for semantic icons
import '../icon/sando-icon.js';

@customElement('sando-badge')
export class SandoBadge extends FlavorableMixin(LitElement) {
  /**
   * Component styles - modular CSS imports
   * Order matters for specificity
   */
  static styles = [
    resetStyles, // Global resets (box-sizing, margins, etc.)
    tokenStyles, // Design tokens (Ingredients, Flavors, Recipes)
    baseStyles, // Layout, typography
    colorStyles, // Color × variant combinations
    sizeStyles // Size variants + compact mode
  ];

  /**
   * Semantic color of the badge.
   * Controls the meaning/context of the badge.
   * @default 'neutral'
   */
  @property({ reflect: true })
  color: BadgeColor = 'neutral';

  /**
   * Visual style variant of the badge.
   * Controls the appearance (filled, bordered, etc.)
   * @default 'solid'
   */
  @property({ reflect: true })
  variant: BadgeVariant = 'solid';

  /**
   * Size of the badge.
   * @default 'medium'
   */
  @property({ reflect: true })
  size: BadgeSize = 'medium';

  /**
   * Reduces vertical padding for use in compact spaces.
   * Works with all size variants.
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  compact = false;

  /**
   * Custom icon name to override the default semantic icon.
   * When set, this icon is displayed instead of the automatic semantic icon.
   * Use Lucide icon names (e.g., 'star', 'heart', 'zap').
   */
  @property({ type: String })
  icon?: string;

  /**
   * Hides the icon completely, even for semantic colors that have default icons.
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-icon' })
  noIcon = false;

  /**
   * Gets the icon name to render based on props and color.
   * Returns undefined if no icon should be shown.
   *
   * Logic:
   * 1. If noIcon is true → no icon
   * 2. If icon prop is set → use custom icon
   * 3. If color is semantic (success/warning/danger/info) → use default icon
   * 4. Otherwise → no icon
   */
  private _getIconName(): string | undefined {
    if (this.noIcon) {
      return undefined;
    }

    if (this.icon) {
      return this.icon;
    }

    // Check if color is a semantic color with a default icon
    if (this.color in BADGE_SEMANTIC_ICONS) {
      return BADGE_SEMANTIC_ICONS[this.color as BadgeSemanticColor];
    }

    return undefined;
  }

  /**
   * Renders the icon element if needed.
   * Icon is positioned LEFT of the content (before the slot).
   */
  private _renderIcon() {
    const iconName = this._getIconName();

    if (!iconName) {
      return nothing;
    }

    return html`
      <sando-icon class="badge__icon" name=${iconName} decorative inherit-color></sando-icon>
    `;
  }

  render() {
    return html`
      <span class="badge" role="status" part="badge">
        ${this._renderIcon()}
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-badge': SandoBadge;
  }
}
