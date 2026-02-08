/**
 * Option Group Component Types
 *
 * Type definitions for the sando-option-group component.
 *
 * @module option-group-types
 */

/**
 * Available sizes for option group
 * Matches the parent sando-select size options
 */
export type OptionGroupSize = 'sm' | 'md' | 'lg';

/**
 * Props interface for the SandoOptionGroup component
 */
export interface SandoOptionGroupProps {
  /**
   * The group label text displayed above the options
   */
  label: string;

  /**
   * Whether the option group and all its child options are disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Size of the option group (inherited from parent select)
   * Affects label padding to align with options
   * @default 'md'
   */
  size?: OptionGroupSize;
}
