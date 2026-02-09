/**
 * Type definitions for sando-textarea component
 * All textarea-specific type definitions in one place
 */

/**
 * Visual style variant of the textarea
 */
export type TextareaVariant = 'outlined' | 'filled';

/**
 * Size variants for the textarea
 * - `sm` - Small: Compact size for tight layouts
 * - `md` - Medium: Default size for most use cases
 * - `lg` - Large: Larger for more prominent inputs
 */
export type TextareaSize = 'sm' | 'md' | 'lg';

/**
 * Resize behavior for the textarea
 * - `none` - No resizing allowed
 * - `vertical` - Only vertical resizing (default)
 * - `horizontal` - Only horizontal resizing
 * - `both` - Both directions allowed
 */
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/**
 * Text wrapping mode for the textarea
 * - `soft` - Text wraps visually, no line breaks inserted on submit
 * - `hard` - Text wraps and line breaks are inserted on submit
 * - `off` - No text wrapping
 */
export type TextareaWrap = 'soft' | 'hard' | 'off';

/**
 * Event detail for textarea input events
 */
export interface TextareaInputEventDetail {
  /**
   * Current value of the textarea
   */
  value: string;
}

/**
 * Event detail for textarea change events
 */
export interface TextareaChangeEventDetail {
  /**
   * Current value of the textarea
   */
  value: string;
}

/**
 * Props for the SandoTextarea component
 */
export interface SandoTextareaProps {
  /**
   * Current text value
   * @default ''
   */
  value?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Label text (alternative to slot)
   */
  label?: string;

  /**
   * Helper text displayed below the textarea
   */
  helperText?: string;

  /**
   * Error message displayed when error=true
   */
  errorText?: string;

  /**
   * Form field name
   */
  name?: string;

  /**
   * Whether the textarea is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the textarea is required for form validation
   * @default false
   */
  required?: boolean;

  /**
   * Whether the textarea is read-only
   * @default false
   */
  readonly?: boolean;

  /**
   * Whether the textarea is in error state
   * @default false
   */
  error?: boolean;

  /**
   * Initial number of visible text rows
   * @default 3
   */
  rows?: number;

  /**
   * Minimum text length
   */
  minlength?: number;

  /**
   * Maximum text length
   */
  maxlength?: number;

  /**
   * Resize behavior
   * @default 'vertical'
   */
  resize?: TextareaResize;

  /**
   * Autocomplete attribute
   */
  autocomplete?: string;

  /**
   * Spellcheck attribute
   * @default true
   */
  spellcheck?: boolean;

  /**
   * Text wrapping mode
   * @default 'soft'
   */
  wrap?: TextareaWrap;

  /**
   * Visual variant of the textarea
   * @default 'outlined'
   */
  variant?: TextareaVariant;

  /**
   * Size variant of the textarea
   * @default 'md'
   */
  size?: TextareaSize;

  /**
   * Design system flavor/theme
   * @default 'original'
   */
  flavor?: string;
}

/**
 * Type-safe custom input event for the textarea
 */
export type TextareaInputEvent = CustomEvent<TextareaInputEventDetail>;

/**
 * Type-safe custom change event for the textarea
 */
export type TextareaChangeEvent = CustomEvent<TextareaChangeEventDetail>;
