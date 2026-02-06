/**
 * Type definitions for sando-input component
 * @see COMPONENT_ARCHITECTURE.md
 */

/**
 * Visual style variant of the input.
 *
 * - `filled`: Input with filled background (default)
 * - `outlined`: Input with visible border
 */
export type InputVariant = 'outlined' | 'filled';

/**
 * Size variants for the input.
 *
 * All sizes meet WCAG 2.1 Level AA minimum touch target size (44x44px).
 *
 * - `sm`: Compact size for tight spaces
 * - `md`: Default size for most use cases
 * - `lg`: Large size for emphasis
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Supported input types.
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

/**
 * Props for the SandoInput component
 */
export interface SandoInputProps {
  /**
   * Visual style variant
   * @default 'filled'
   */
  variant?: InputVariant;

  /**
   * Input size
   * @default 'md'
   */
  size?: InputSize;

  /**
   * Input type
   * @default 'text'
   */
  type?: InputType;

  /**
   * Input value
   */
  value?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Accessible label for the input
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Error message displayed when error is true
   */
  errorText?: string;

  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the input is readonly
   * @default false
   */
  readonly?: boolean;

  /**
   * Whether the input is required
   * @default false
   */
  required?: boolean;

  /**
   * Whether the input has an error
   * @default false
   */
  error?: boolean;

  /**
   * Name of the input (for form submission)
   */
  name?: string;

  /**
   * Autocomplete attribute for browser autofill
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
   */
  autocomplete?: string;
}

/**
 * Event detail for input change events
 */
export interface InputChangeEventDetail {
  /**
   * The new input value
   */
  value: string;
}
