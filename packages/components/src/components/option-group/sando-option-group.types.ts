/**
 * Option Group Component Types
 *
 * Type definitions for the sando-option-group component.
 *
 * @module option-group-types
 */

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
}
