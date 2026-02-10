/**
 * Type definitions for sando-spinner component
 * Loading indicator with accessible, animated SVG arc
 */

/**
 * Size variants for the spinner
 * Uses t-shirt sizing pattern
 */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Color variants for the spinner
 */
export type SpinnerVariant = 'default' | 'inverted';

/**
 * Props for the SandoSpinner component
 */
export interface SandoSpinnerProps {
  /**
   * Size of the spinner
   * xs=12px, sm=16px, md=24px, lg=32px, xl=48px
   * @default 'md'
   */
  size?: SpinnerSize;

  /**
   * Color variant of the spinner
   * - default: For light backgrounds
   * - inverted: For dark/solid backgrounds
   * @default 'default'
   */
  variant?: SpinnerVariant;

  /**
   * Accessible label for screen readers
   * Describes what is loading
   * @default 'Loading'
   */
  label?: string;

  /**
   * Arc percentage of the circle that is visible
   * Value from 0.1 (10%) to 1.0 (100% = full circle)
   * @default 0.75
   */
  arc?: number;
}
