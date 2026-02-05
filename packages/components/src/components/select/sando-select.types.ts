/**
 * Type definitions for sando-select component
 * @see COMPONENT_ARCHITECTURE.toon
 */

/**
 * Visual style variant of the select.
 *
 * - `filled`: Select with filled background (default)
 * - `outlined`: Select with visible border
 */
export type SelectVariant = 'filled' | 'outlined';

/**
 * Size variants for the select.
 *
 * All sizes meet WCAG 2.1 Level AA minimum touch target size (44x44px).
 *
 * - `small`: Compact size for tight spaces
 * - `medium`: Default size for most use cases
 * - `large`: Large size for emphasis
 */
export type SelectSize = 'small' | 'medium' | 'large';

/**
 * Placement of the dropdown relative to the trigger.
 *
 * - `bottom`: Dropdown opens below the trigger (default)
 * - `top`: Dropdown opens above the trigger
 */
export type SelectPlacement = 'top' | 'bottom';

/**
 * Props for the SandoSelect component
 */
export interface SandoSelectProps {
  /**
   * Selected value (for single select mode)
   */
  value?: string;

  /**
   * Selected values (for multiple select mode)
   */
  values?: string[];

  /**
   * Form field name
   */
  name?: string;

  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string;

  /**
   * Whether the select is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the select is required for form validation
   * @default false
   */
  required?: boolean;

  /**
   * Whether the select is in error state
   * @default false
   */
  error?: boolean;

  /**
   * Error message displayed when error is true
   */
  errorText?: string;

  /**
   * Helper text displayed below the select
   */
  helperText?: string;

  /**
   * Accessible label for the select
   */
  label?: string;

  /**
   * Visual style variant
   * @default 'filled'
   */
  variant?: SelectVariant;

  /**
   * Select size
   * @default 'medium'
   */
  size?: SelectSize;

  /**
   * Whether multiple options can be selected
   * @default false
   */
  multiple?: boolean;

  /**
   * Whether to show a clear button
   * @default false
   */
  clearable?: boolean;

  /**
   * Whether the dropdown is open
   * @default false
   */
  open?: boolean;

  /**
   * Placement of the dropdown
   * @default 'bottom'
   */
  placement?: SelectPlacement;

  /**
   * Maximum number of tags visible in multi-select mode
   * @default 3
   */
  maxTagsVisible?: number;
}

/**
 * Event detail for select change events
 */
export interface SelectChangeEventDetail {
  /**
   * The new selected value (single select) or values (multiple select)
   */
  value: string | string[];
}

/**
 * Custom event type for select change
 */
export type SelectChangeEvent = CustomEvent<SelectChangeEventDetail>;

/**
 * Event detail for select show/hide events
 */
export interface SelectVisibilityEventDetail {
  /**
   * Whether the dropdown is now open
   */
  open: boolean;
}

/**
 * Custom event type for select visibility changes
 */
export type SelectVisibilityEvent = CustomEvent<SelectVisibilityEventDetail>;
