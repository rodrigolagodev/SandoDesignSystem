/**
 * Type definitions for sando-help-text component
 * Internal component used by form components to display helper/error/success/warning messages
 */

/**
 * Visual variant of the help text - determines color and icon
 * - default: Neutral helper text
 * - error: Error/validation message (uses role="alert")
 * - success: Success confirmation message
 * - warning: Warning/caution message
 */
export type HelpTextVariant = 'default' | 'error' | 'success' | 'warning';

/**
 * Size variants for the help text - should match parent form component size
 * - sm: Small size for compact form inputs
 * - md: Medium size (default)
 * - lg: Large size for larger form inputs
 */
export type HelpTextSize = 'sm' | 'md' | 'lg';

/**
 * Props for the SandoHelpText component
 */
export interface SandoHelpTextProps {
  /**
   * Visual variant determining color and icon style
   * @default 'default'
   */
  variant?: HelpTextVariant;

  /**
   * Size of the help text - should match parent form component
   * @default 'md'
   */
  size?: HelpTextSize;

  /**
   * Whether to show an icon based on variant
   * @default false
   */
  showIcon?: boolean;

  /**
   * Whether to reserve vertical space to prevent layout shift
   * CRITICAL: This is the primary purpose of this component
   * @default true
   */
  reserveSpace?: boolean;

  /**
   * Design system flavor/theme
   * Inherited from FlavorableMixin
   */
  flavor?: string;
}
