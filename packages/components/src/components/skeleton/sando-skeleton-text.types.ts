/**
 * Type definitions for sando-skeleton-text component
 * Semantic skeleton for single lines of text
 */

import type { SkeletonEffect } from './sando-skeleton.types.js';

/**
 * Size variants for skeleton text
 * Maps to different line heights for text placeholders
 * - sm: 0.875em (14px equivalent)
 * - md: 1em (16px equivalent)
 * - lg: 1.25em (20px equivalent)
 */
export type SkeletonTextSize = 'sm' | 'md' | 'lg';

/**
 * Props for the SandoSkeletonText component
 */
export interface SandoSkeletonTextProps {
  /**
   * Size of the text skeleton (maps to height)
   * - sm: 0.875em
   * - md: 1em
   * - lg: 1.25em
   * @default 'md'
   */
  size?: SkeletonTextSize;

  /**
   * CSS width value (e.g., '80%', '200px')
   * @default '100%'
   */
  width?: string;

  /**
   * Animation effect applied to the skeleton
   * - shimmer: Moving gradient effect
   * - pulse: Opacity animation
   * - none: No animation (respects prefers-reduced-motion)
   * @default 'shimmer'
   */
  effect?: SkeletonEffect;
}

// Re-export SkeletonEffect for convenience
export type { SkeletonEffect };
