/**
 * Type definitions for sando-skeleton-button component
 * Skeleton placeholder for button loading states
 */

import type { SkeletonEffect } from '../skeleton/sando-skeleton.types.js';

/**
 * Size variants for the skeleton button
 * Matches button component sizing for consistent layouts
 */
export type SkeletonButtonSize = 'sm' | 'md' | 'lg';

/**
 * Width behavior for the skeleton button
 * - auto: Uses token-defined default widths per size
 * - full: Stretches to container width
 * - string: Custom CSS width value
 */
export type SkeletonButtonWidth = 'auto' | 'full' | string;

/**
 * Props for the SandoSkeletonButton component
 */
export interface SandoSkeletonButtonProps {
  /**
   * Size of the skeleton button
   * Controls height and default width
   * @default 'md'
   */
  size?: SkeletonButtonSize;

  /**
   * Width behavior of the skeleton button
   * - 'auto': Token-defined widths (64px/96px/128px for sm/md/lg)
   * - 'full': Full container width
   * - Custom string: Any valid CSS width
   * @default 'auto'
   */
  width?: SkeletonButtonWidth;

  /**
   * Animation effect applied to the skeleton
   * @default 'shimmer'
   */
  effect?: SkeletonEffect;
}
