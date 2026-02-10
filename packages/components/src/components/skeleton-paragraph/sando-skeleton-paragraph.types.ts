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
 * Size variants for paragraph text lines
 * Controls the height of each skeleton line
 * - sm: Caption-sized text
 * - md: Body-sized text (default)
 * - lg: Heading-sized text
 */
export type SkeletonParagraphSize = 'sm' | 'md' | 'lg';

/**
 * Width options for skeleton paragraph
 * - 'auto': Natural width based on parent
 * - 'full': 100% of container width
 * - string: Custom CSS width value
 */
export type SkeletonParagraphWidth = 'auto' | 'full' | string;

/**
 * Props for the SandoSkeletonParagraph component
 */
export interface SandoSkeletonParagraphProps {
  /**
   * Size of text lines (controls line height)
   * - sm: Caption-sized
   * - md: Body-sized (default)
   * - lg: Heading-sized
   * @default 'md'
   */
  size?: SkeletonParagraphSize;

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

  /**
   * Width of the paragraph container
   * - 'auto': Natural width (100% of parent by default)
   * - 'full': Explicit 100% width
   * - Custom string: Any valid CSS width (e.g., '300px', '20rem')
   * @default 'auto'
   */
  width?: SkeletonParagraphWidth;
}

// Re-export SkeletonEffect for convenience
export type { SkeletonEffect };
