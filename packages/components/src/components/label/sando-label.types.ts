/**
 * Type definitions for sando-label component
 *
 * A reusable form label component that provides consistent styling
 * and accessibility features for form controls. Works with Input,
 * Select, Textarea, Radio, Checkbox, and other form elements.
 */

/**
 * Size variants for the label.
 * Should match the size variants of form components.
 */
export type LabelSize = 'sm' | 'md' | 'lg';

/**
 * Font weight variants for the label.
 */
export type LabelWeight = 'normal' | 'medium' | 'semibold';

/**
 * Props for the SandoLabel component
 */
export interface SandoLabelProps {
  /**
   * ID of the associated form element.
   * Used in the `for` attribute of the native label.
   */
  for?: string;

  /**
   * Shows the required indicator (*) after the label text.
   * Mutually exclusive with `optional`.
   * @default false
   */
  required?: boolean;

  /**
   * Shows "(optional)" text after the label.
   * Mutually exclusive with `required`.
   * @default false
   */
  optional?: boolean;

  /**
   * Disabled visual state.
   * Reduces visual prominence of the label.
   * @default false
   */
  disabled?: boolean;

  /**
   * Size of the label.
   * Should match the size of the associated form component.
   * @default 'md'
   */
  size?: LabelSize;

  /**
   * Font weight variant.
   * @default 'medium'
   */
  weight?: LabelWeight;

  /**
   * Helper text displayed below the label.
   */
  helperText?: string;

  /**
   * Tooltip text for additional information.
   * When provided, shows a help icon (?) next to the label.
   */
  tooltip?: string;

  /**
   * Visually hides the label but keeps it accessible to screen readers.
   * Uses the standard visually-hidden pattern.
   * @default false
   */
  srOnly?: boolean;

  /**
   * Design system flavor/theme.
   * @default 'original'
   */
  flavor?: string;
}
