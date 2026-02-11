/**
 * Type definitions for sando-skeleton-text component
 * Semantic skeleton for single lines of text
 */

import type { SkeletonEffect } from './sando-skeleton.types.js';

/**
 * Size variants for skeleton text
 * Height is determined by design tokens:
 * - sm: var(--sando-skeleton-size-text-height-sm) → font.size.caption
 * - md: var(--sando-skeleton-size-text-height-md) → font.size.body
 * - lg: var(--sando-skeleton-size-text-height-lg) → font.size.heading-200
 */
export type SkeletonTextSize = 'sm' | 'md' | 'lg';

/**
 * Width options for skeleton text
 * - 'auto': Fills container width (100%)
 * - 'full': Block-level, full width with display: block
 * - string: Custom CSS value (e.g., '80%', '200px')
 */
export type SkeletonTextWidth = 'auto' | 'full' | string;

/**
 * Props for the SandoSkeletonText component
 */
export interface SandoSkeletonTextProps {
  /**
   * Size of the text skeleton (maps to height via tokens)
   * Uses design tokens: --sando-skeleton-size-text-height-{size}
   * @default 'md'
   */
  size?: SkeletonTextSize;

  /**
   * Width of the skeleton
   * - 'auto': Fills container width (100%), inline-block display
   * - 'full': Full width, block display
   * - string: Custom CSS value (e.g., '80%', '200px')
   * @default 'auto'
   */
  width?: SkeletonTextWidth;

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
