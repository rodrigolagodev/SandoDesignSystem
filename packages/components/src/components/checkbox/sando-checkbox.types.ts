/**
 * Type definitions for sando-checkbox component
 * All checkbox-specific type definitions in one place
 */

/**
 * Visual style variant of the checkbox
 */
export type CheckboxVariant = 'solid' | 'outline';

/**
 * Size variants for the checkbox
 */
export type CheckboxSize = 'small' | 'medium' | 'large';

/**
 * Event detail for checkbox change events
 */
export interface CheckboxChangeEventDetail {
  /**
   * Whether the checkbox is checked
   */
  checked: boolean;

  /**
   * Whether the checkbox is in indeterminate state
   */
  indeterminate: boolean;
}

/**
 * Props for the SandoCheckbox component
 */
export interface SandoCheckboxProps {
  /**
   * Whether the checkbox is checked
   * @default false
   */
  checked?: boolean;

  /**
   * Whether the checkbox is in indeterminate state (partial selection)
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Whether the checkbox is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the checkbox is required for form validation
   * @default false
   */
  required?: boolean;

  /**
   * Whether the checkbox is in error state
   * @default false
   */
  error?: boolean;

  /**
   * Form field name
   */
  name?: string;

  /**
   * Value when checked
   * @default 'on'
   */
  value?: string;

  /**
   * Visual variant of the checkbox
   * @default 'solid'
   */
  variant?: CheckboxVariant;

  /**
   * Size variant of the checkbox
   * @default 'medium'
   */
  size?: CheckboxSize;

  /**
   * Label text (alternative to slot)
   */
  label?: string;

  /**
   * Helper text displayed below the checkbox
   */
  helperText?: string;

  /**
   * Error message displayed when error=true
   */
  errorText?: string;

  /**
   * Design system flavor/theme
   * @default 'original'
   */
  flavor?: string;
}

/**
 * Type-safe custom change event for the checkbox
 */
export type CheckboxChangeEvent = CustomEvent<CheckboxChangeEventDetail>;
