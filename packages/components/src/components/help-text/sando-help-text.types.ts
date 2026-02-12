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
 * Props for the SandoHelpText component
 */
export interface SandoHelpTextProps {
  /**
   * Visual variant determining color and icon style
   * @default 'default'
   */
  variant?: HelpTextVariant;

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
