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
   * Design system flavor/theme
   * @default 'original'
   */
  flavor?: string;
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
