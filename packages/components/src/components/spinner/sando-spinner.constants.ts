/**
 * Constants for sando-spinner component
 * Default values and configuration
 */

import type { SpinnerSize, SpinnerVariant } from './sando-spinner.types.js';

/**
 * Default size for the spinner
 */
export const DEFAULT_SIZE: SpinnerSize = 'md';

/**
 * Default variant for the spinner
 */
export const DEFAULT_VARIANT: SpinnerVariant = 'default';

/**
 * Default accessible label
 */
export const DEFAULT_LABEL = 'Loading';

/**
 * Default arc percentage (0.1 to 1.0)
 * 0.75 = 75% of the circle is visible
 */
export const DEFAULT_ARC = 0.75;

/**
 * Minimum arc percentage (10% visible)
 */
export const MIN_ARC = 0.1;

/**
 * Maximum arc percentage (100% = full circle)
 */
export const MAX_ARC = 1.0;

/**
 * SVG viewBox attribute value
 */
export const SVG_VIEWBOX = '0 0 24 24';

/**
 * Circle center coordinates (x and y)
 */
export const CIRCLE_CENTER = 12;

/**
 * Circle radius
 */
export const CIRCLE_RADIUS = 9;

/**
 * Circle circumference = 2 * PI * radius
 * Used for stroke-dasharray calculations
 */
export const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS; // ≈ 56.55
