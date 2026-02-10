/**
 * Type definitions for sando-skeleton-paragraph component
 * Skeleton for multiple lines of text content
 */

import type { SkeletonEffect } from '../skeleton/sando-skeleton.types.js';

/**
 * Spacing variants for gap between skeleton lines
 * - xs: Tight spacing (tight stack)
 * - sm: Small spacing (muted stack)
 * - md: Medium spacing (default stack)
 * - lg: Large spacing (emphasis stack)
 */
export type SkeletonParagraphSpacing = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Props for the SandoSkeletonParagraph component
 */
export interface SandoSkeletonParagraphProps {
  /**
   * Number of text lines to render
   * @default 3
   */
  lines?: number;

  /**
   * Width of the last line (CSS value)
   * Creates a more natural paragraph appearance
   * @default '60%'
   */
  lastLineWidth?: string;

  /**
   * Gap between lines
   * - xs: Tight spacing
   * - sm: Small spacing (default)
   * - md: Medium spacing
   * - lg: Large spacing
   * @default 'sm'
   */
  spacing?: SkeletonParagraphSpacing;

  /**
   * Animation effect applied to all skeleton lines
   * - shimmer: Moving gradient effect
   * - pulse: Opacity animation
   * - none: No animation (respects prefers-reduced-motion)
   * @default 'shimmer'
   */
  effect?: SkeletonEffect;
}

// Re-export SkeletonEffect for convenience
export type { SkeletonEffect };
