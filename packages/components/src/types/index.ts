/**
 * Common types shared across Sando components
 */

/**
 * Supported theme flavors
 */
export type Flavor = 'original' | 'strawberry' | 'matcha' | 'custom';

/**
 * Standard component sizes
 */
export type ComponentSize = 'small' | 'medium' | 'large';

/**
 * Common component variants
 */
export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'tertiary';

/**
 * Component status/states
 */
export type ComponentStatus = 'default' | 'success' | 'warning' | 'error' | 'info';

/**
 * Base props that all components should support
 */
export interface BaseComponentProps {
  /**
   * Theme flavor to apply
   */
  flavor?: Flavor;

  /**
   * Custom CSS class names
   */
  className?: string;

  /**
   * Custom inline styles
   */
  style?: string;
}

/**
 * Props for interactive components (buttons, inputs, etc.)
 */
export interface InteractiveComponentProps extends BaseComponentProps {
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;

  /**
   * Whether the component is in a loading state
   */
  loading?: boolean;
}

/**
 * Base type for custom event details
 */
export interface CustomEventDetail {
  [key: string]: any;
}

/**
 * Type for custom component events
 */
export type CustomComponentEvent<T extends CustomEventDetail = CustomEventDetail> = CustomEvent<T>;
