/**
 * Type definitions for sando-form-group component
 *
 * @see COMPONENT_ARCHITECTURE.md
 */

/**
 * Props interface for the SandoFormGroup component
 *
 * Form group component that provides consistent layout and labeling
 * for form controls with support for labels, helper text, and error messages.
 */
export interface SandoFormGroupProps {
  /**
   * Label text for the form field
   * Alternative: Use the label slot for custom content
   */
  label?: string;

  /**
   * Error message to display below the field
   * When set, the form group displays in error state
   * Alternative: Use the error slot for custom content
   */
  error?: string;

  /**
   * Helper text to display below the field
   * Provides additional guidance to the user
   * Alternative: Use the helper-text slot for custom content
   */
  helperText?: string;

  /**
   * Whether the field is required
   * When true, displays an asterisk (*) next to the label
   * @default false
   */
  required?: boolean;

  /**
   * Whether the form group is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Event detail for validation-change event
 */
export interface FormGroupValidationChangeDetail {
  /**
   * Whether the form group is in a valid state
   */
  isValid: boolean;

  /**
   * Error message if invalid, null if valid
   */
  errorMessage: string | null;
}
