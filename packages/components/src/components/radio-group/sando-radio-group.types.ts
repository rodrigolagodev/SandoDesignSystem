/**
 * Type definitions for sando-radio-group component
 *
 * @see COMPONENT_ARCHITECTURE.toon
 */

/**
 * Orientation options for radio group layout
 */
export type RadioGroupOrientation = 'vertical' | 'horizontal';

/**
 * Event detail for radio group change events
 */
export interface RadioGroupChangeEventDetail {
  /**
   * The value of the selected radio
   */
  value: string;

  /**
   * The name of the radio group
   */
  name: string;
}

/**
 * Props interface for the SandoRadioGroup component
 */
export interface SandoRadioGroupProps {
  /**
   * Group label text
   */
  label?: string;

  /**
   * Name attribute for all child radios (auto-propagated)
   * REQUIRED for proper radio group behavior
   */
  name: string;

  /**
   * Currently selected value
   */
  value?: string;

  /**
   * Helper text displayed below the group
   */
  helperText?: string;

  /**
   * Error message (shows error state)
   * Takes precedence over helperText
   */
  errorText?: string;

  /**
   * Error state
   * @default false
   */
  error?: boolean;

  /**
   * Required state - displays asterisk on label
   * @default false
   */
  required?: boolean;

  /**
   * Disabled state (propagates to children)
   * @default false
   */
  disabled?: boolean;

  /**
   * Layout orientation
   * @default 'vertical'
   */
  orientation?: RadioGroupOrientation;

  /**
   * Design system flavor/theme
   * @default 'original'
   */
  flavor?: string;
}

/**
 * Type-safe custom change event for the radio group
 */
export type RadioGroupChangeEvent = CustomEvent<RadioGroupChangeEventDetail>;
