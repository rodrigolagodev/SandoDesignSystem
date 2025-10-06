/**
 * Type definitions for sando-button component
 * All button-specific type definitions in one place
 */

/**
 * Visual style variant of the button
 */
export type ButtonVariant = 'solid' | 'outline' | 'ghost';

/**
 * Size variants for the button
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Status variants for success/error states
 */
export type ButtonStatus = 'default' | 'success' | 'destructive';

/**
 * Border radius variants
 */
export type ButtonRadius = 'none' | 'default' | 'full';

/**
 * Button type for form submission
 */
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Props for the SandoButton component
 */
export interface SandoButtonProps {
  /**
   * Visual style variant of the button
   * @default 'solid'
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   * @default 'medium'
   */
  size?: ButtonSize;

  /**
   * Status variant for success/error states
   * @default 'default'
   */
  status?: ButtonStatus;

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Button type (for form submission)
   * @default 'button'
   */
  type?: ButtonType;

  /**
   * Full width button
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Icon-only button (square shape, no padding for text)
   * @default false
   */
  iconOnly?: boolean;

  /**
   * Border radius variant
   * @default 'default'
   */
  radius?: ButtonRadius;

  /**
   * Design system flavor/theme
   * @default 'original'
   */
  flavor?: string;

  /**
   * URL to navigate to (renders as <a> instead of <button>)
   */
  href?: string;

  /**
   * Where to open the linked document
   * Only applies when href is set
   */
  target?: '_self' | '_blank' | '_parent' | '_top';

  /**
   * Relationship between current document and linked document
   * Only applies when href is set
   */
  rel?: string;

  /**
   * Whether to download the linked resource
   * Only applies when href is set
   */
  download?: string | boolean;

  /**
   * Accessible label for screen readers (overrides visible text)
   */
  ariaLabel?: string | null;

  /**
   * Whether the button is in an active/pressed state (toggle)
   * @default false
   */
  active?: boolean;
}

/**
 * Custom event detail for button click events
 */
export interface ButtonClickEventDetail {
  /**
   * Original DOM event
   */
  originalEvent: MouseEvent;
}

/**
 * Type-safe custom click event for the button
 */
export type ButtonClickEvent = CustomEvent<ButtonClickEventDetail>;
