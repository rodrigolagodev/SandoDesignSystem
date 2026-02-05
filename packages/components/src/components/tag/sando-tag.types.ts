/**
 * Type definitions for sando-tag component
 *
 * A chip/badge component with mandatory icon and specialized click behavior.
 * The icon is always rendered (default: chevron-right) and only the icon area
 * is interactive for clickable/link tags.
 */

/**
 * Visual style variant of the tag
 */
export type TagVariant = 'solid' | 'outline' | 'soft';

/**
 * Size variants for the tag
 */
export type TagSize = 'small' | 'medium' | 'large';

/**
 * Props for the SandoTag component
 */
export interface SandoTagProps {
  /**
   * Visual style variant of the tag
   * @default 'solid'
   */
  variant?: TagVariant;

  /**
   * Size of the tag
   * @default 'medium'
   */
  size?: TagSize;

  /**
   * Whether the tag is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Shows a remove (X) button replacing the icon.
   * Only the X button is clickable.
   *
   * **EXCLUSIVE**: When `removable=true`:
   * - `clickable` and `href` props are IGNORED
   * - `slot="icon"` is NOT rendered (X button replaces it)
   *
   * @default false
   */
  removable?: boolean;

  /**
   * Makes only the icon area clickable (button behavior).
   * The main content is NOT clickable - only the icon button.
   *
   * **Note**: Has no effect when `removable=true` (removable is exclusive).
   *
   * @default false
   */
  clickable?: boolean;

  /**
   * URL to navigate to. Only the icon area becomes a link.
   * The main content is NOT clickable - only the icon anchor.
   *
   * **Note**: Has no effect when `removable=true` (removable is exclusive).
   */
  href?: string;

  /**
   * Link target for href navigation
   */
  target?: string;

  /**
   * Design system flavor/theme
   * @default 'original'
   */
  flavor?: string;
}

/**
 * Custom event detail for tag remove events
 */
export interface TagRemoveEventDetail {
  /**
   * Original DOM event that triggered the removal
   */
  originalEvent: MouseEvent | KeyboardEvent;
}

/**
 * Custom event detail for tag action events (clickable mode)
 */
export interface TagActionEventDetail {
  /**
   * Original DOM event that triggered the action
   */
  originalEvent: MouseEvent | KeyboardEvent;
}

/**
 * Type-safe custom remove event for the tag
 */
export type TagRemoveEvent = CustomEvent<TagRemoveEventDetail>;

/**
 * Type-safe custom action event for the tag
 */
export type TagActionEvent = CustomEvent<TagActionEventDetail>;
