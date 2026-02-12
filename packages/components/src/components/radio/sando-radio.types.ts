/**
 * Type definitions for sando-radio component
 * All radio-specific type definitions in one place
 */

/**
 * Visual style variant of the radio button
 */
export type RadioVariant = 'solid' | 'outline';

/**
 * Size variants for the radio button
 * - `sm` - Small: Compact size for tight layouts
 * - `md` - Medium: Default size for most use cases
 * - `lg` - Large: Larger touch target for mobile
 */
export type RadioSize = 'sm' | 'md' | 'lg';

/**
 * Event detail for radio change events
 */
export interface RadioChangeEventDetail {
  /**
   * Whether the radio is checked
   */
  checked: boolean;

  /**
   * The value of the radio button
   */
  value: string;
}

/**
 * Props for the SandoRadio component
 */
export interface SandoRadioProps {
  /**
   * Whether the radio is checked
   * @default false
   */
  checked?: boolean;

  /**
   * Whether the radio is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the radio is required for form validation
   * @default false
   */
  required?: boolean;

  /**
   * Whether the radio is in error state
   * @default false
   */
  error?: boolean;

  /**
   * Form field name (CRITICAL: used for radio group behavior)
   */
  name?: string;

  /**
   * Value when selected
   * @default 'on'
   */
  value?: string;

  /**
   * Visual variant of the radio
   * @default 'solid'
   */
  variant?: RadioVariant;

  /**
   * Size variant of the radio
   * @default 'md'
   */
  size?: RadioSize;

  /**
   * Label text (alternative to slot)
   */
  label?: string;

  /**
   * Helper text displayed below the radio
   */
  helperText?: string;

  /**
   * Error message displayed when error=true
   */
  errorText?: string;

  /**
   * Whether to reserve space for error messages to prevent layout shift.
   * When true, a minimum height is maintained even when no message is shown.
   * @default true
   */
  reserveErrorSpace?: boolean;

  /**
   * Design system flavor/theme
   * @default 'original'
   */
  flavor?: string;
}

/**
 * Type-safe custom change event for the radio
 */
export type RadioChangeEvent = CustomEvent<RadioChangeEventDetail>;
