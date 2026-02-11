/**
 * Type definitions for sando-skeleton component
 * Loading placeholder with configurable shape and animation effect
 */

/**
 * Shape variants for the skeleton
 * - text: Small border-radius, for text placeholders
 * - circular: 50% border-radius, for avatars
 * - rectangular: No border-radius, for sharp-edge containers
 * - rounded: Medium border-radius, for card-like placeholders
 */
export type SkeletonShape = 'text' | 'circular' | 'rectangular' | 'rounded';

/**
 * Animation effect variants for the skeleton
 * - shimmer: Gradient moves from left to right (default)
 * - pulse: Opacity oscillates between 0.4 and 1
 * - none: Static (for reduced motion or no animation)
 */
export type SkeletonEffect = 'shimmer' | 'pulse' | 'none';

/**
 * Props for the SandoSkeleton component
 */
export interface SandoSkeletonProps {
  /**
   * Shape variant of the skeleton
   * - text: For text line placeholders
   * - circular: For avatar/icon placeholders
   * - rectangular: For image/container placeholders
   * - rounded: For card-like placeholders
   * @default 'text'
   */
  shape?: SkeletonShape;

  /**
   * Animation effect applied to the skeleton
   * - shimmer: Moving gradient effect
   * - pulse: Opacity animation
   * - none: No animation (respects prefers-reduced-motion)
   * @default 'shimmer'
   */
  effect?: SkeletonEffect;

  /**
   * CSS width value
   * @default '100%'
   */
  width?: string;

  /**
   * CSS height value
   * @default '1em'
   */
  height?: string;
}
