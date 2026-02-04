/**
 * Type definitions for sando-tag component
 * A chip/badge component with multiple use cases (informative, removable, clickable)
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
   * Shows a remove (X) button, making only that button clickable
   * @default false
   */
  removable?: boolean;

  /**
   * Makes the entire tag clickable (button behavior)
   * Cannot be used with removable
   * @default false
   */
  clickable?: boolean;

  /**
   * URL to navigate to (renders as anchor, makes tag clickable)
   * Cannot be used with removable
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
 * Type-safe custom remove event for the tag
 */
export type TagRemoveEvent = CustomEvent<TagRemoveEventDetail>;
