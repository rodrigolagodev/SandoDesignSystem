/**
 * Type definitions for sando-option component
 * Individual option element for use within sando-select
 */

/**
 * Props for the SandoOption component
 */
export interface SandoOptionProps {
  /**
   * The value of this option (submitted with form)
   */
  value: string;

  /**
   * Whether the option is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the option is currently selected
   * Managed by parent sando-select
   * @default false
   */
  selected?: boolean;

  /**
   * Whether the parent select is in multiple selection mode
   * Set by parent sando-select
   * @default false
   */
  multiple?: boolean;

  /**
   * Prefix icon name from parent select (for single-select mode)
   * Set by parent sando-select when it has a prefixIcon
   */
  parentPrefixIcon?: string;
}

/**
 * Event detail for option select events
 */
export interface OptionSelectEventDetail {
  /**
   * The value of the selected option
   */
  value: string;

  /**
   * The text label of the selected option
   */
  label: string;
}

/**
 * Type-safe custom select event for the option
 */
export type OptionSelectEvent = CustomEvent<OptionSelectEventDetail>;
