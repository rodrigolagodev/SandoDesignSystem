/**
 * Type definitions for sando-switch component
 * All switch-specific type definitions in one place
 */

/**
 * Visual style variant of the switch
 */
export type SwitchVariant = 'solid' | 'outline';

/**
 * Size variants for the switch
 * - `sm` - Small: Compact size for tight layouts
 * - `md` - Medium: Default size for most use cases
 * - `lg` - Large: Larger touch target for mobile
 */
export type SwitchSize = 'sm' | 'md' | 'lg';

/**
 * Event detail for switch change events
 */
export interface SwitchChangeEventDetail {
  /**
   * Whether the switch is checked (on)
   */
  checked: boolean;
}

/**
 * Props for the SandoSwitch component
 */
export interface SandoSwitchProps {
  /**
   * Whether the switch is checked (on)
   * @default false
   */
  checked?: boolean;

  /**
   * Whether the switch is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the switch is required for form validation
   * @default false
   */
  required?: boolean;

  /**
   * Whether the switch is in error state
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
   * Visual variant of the switch
   * @default 'solid'
   */
  variant?: SwitchVariant;

  /**
   * Size variant of the switch
   * @default 'md'
   */
  size?: SwitchSize;

  /**
   * Label text (alternative to slot)
   */
  label?: string;

  /**
   * Helper text displayed below the switch
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
 * Type-safe custom change event for the switch
 */
export type SwitchChangeEvent = CustomEvent<SwitchChangeEventDetail>;
