/**
 * Type definitions for sando-divider component
 *
 * A visual separator that divides content sections. Renders semantic
 * HTML: `<hr>` for horizontal orientation, `<div role="separator"
 * aria-orientation="vertical">` for vertical.
 */

/**
 * Orientation of the divider line.
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Visual weight (thickness) of the divider line.
 * Maps to `--sando-divider-weight-*` tokens.
 */
export type DividerWeight = 'thin' | 'medium' | 'thick';

/**
 * Visual style of the divider line.
 */
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

/**
 * Spacing applied around the divider.
 * For horizontal: `margin-block`. For vertical: `margin-inline`.
 * Maps to `--sando-divider-spacing-*` tokens.
 */
export type DividerSpacing = 'sm' | 'md' | 'lg';

/**
 * Props interface for the SandoDivider component.
 */
export interface SandoDividerProps {
  /**
   * Orientation of the divider.
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;

  /**
   * Visual weight (thickness) of the divider line.
   * @default 'medium'
   */
  weight?: DividerWeight;

  /**
   * Visual style of the divider line.
   * @default 'solid'
   */
  variant?: DividerVariant;

  /**
   * Spacing applied around the divider.
   * @default 'md'
   */
  spacing?: DividerSpacing;

  /**
   * Optional text label rendered in the center of the divider.
   * When provided, the component renders as `role="separator"` with
   * `aria-label` instead of a bare `<hr>`.
   */
  label?: string;

  /**
   * Design system flavor/theme.
   * @default 'original'
   */
  flavor?: string;
}
