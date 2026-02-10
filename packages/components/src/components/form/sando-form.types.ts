/**
 * Type definitions for sando-form component
 *
 * @see COMPONENT_ARCHITECTURE.md
 */

/**
 * Form method type for progressive enhancement
 */
export type FormMethod = 'get' | 'post';

/**
 * Individual validation error for a form control
 */
export interface FormValidationError {
  /** Name attribute of the invalid control */
  name: string;
  /** Validation error message */
  message: string;
  /** Reference to the invalid element */
  element: HTMLElement;
}

/**
 * Event detail for sando-submit event
 */
export interface FormSubmitEventDetail {
  /** FormData object with all named fields */
  formData: FormData;
  /** Plain object with field name/value pairs */
  json: Record<string, unknown>;
  /** Whether all form controls are valid */
  isValid: boolean;
}

/**
 * Event detail for sando-invalid event
 */
export interface FormInvalidEventDetail {
  /** Array of validation errors */
  errors: FormValidationError[];
}

/**
 * Event detail for sando-reset event
 */
export interface FormResetEventDetail {
  /** Empty object - event is informational */
}

/**
 * Custom event type for sando-submit
 */
export type FormSubmitEvent = CustomEvent<FormSubmitEventDetail>;

/**
 * Custom event type for sando-invalid
 */
export type FormInvalidEvent = CustomEvent<FormInvalidEventDetail>;

/**
 * Custom event type for sando-reset
 */
export type FormResetEvent = CustomEvent<FormResetEventDetail>;

/**
 * Event detail for sando-change event
 */
export interface FormChangeEventDetail {
  /** Name of the field that changed */
  field: string | null;
  /** Current value of the field */
  value: unknown;
  /** Current form data as JSON */
  json: Record<string, unknown>;
}

/**
 * Event detail for sando-validate event
 */
export interface FormValidateEventDetail {
  /** Current form data as JSON */
  json: Record<string, unknown>;
  /** Whether built-in validation passed */
  isValid: boolean;
  /** Current validation errors */
  errors: FormValidationError[];
  /** Function to add a custom error */
  addError: (name: string, message: string) => void;
}

/**
 * Custom event type for sando-change
 */
export type FormChangeEvent = CustomEvent<FormChangeEventDetail>;

/**
 * Custom event type for sando-validate
 */
export type FormValidateEvent = CustomEvent<FormValidateEventDetail>;

/**
 * Props interface for the SandoForm component
 *
 * A smart form wrapper that handles form submission, validation coordination,
 * and provides easy access to form data.
 */
export interface SandoFormProps {
  /**
   * When true, disables all child form controls and shows a loading overlay
   * @default false
   */
  loading?: boolean;

  /**
   * Custom label for the loading spinner (accessibility)
   * @default 'Submitting form'
   */
  loadingLabel?: string;

  /**
   * Skip native HTML validation
   * @default false
   */
  novalidate?: boolean;

  /**
   * Form name attribute
   * @default undefined
   */
  name?: string;

  /**
   * Form action URL (for progressive enhancement)
   * @default undefined
   */
  action?: string;

  /**
   * Form method (get/post)
   * @default 'post'
   */
  method?: FormMethod;

  /**
   * Form encoding type (for file uploads)
   * @default undefined
   */
  enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
}
