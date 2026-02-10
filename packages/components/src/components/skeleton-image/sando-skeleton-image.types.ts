/**
 * Type definitions for sando-skeleton-image component
 * Skeleton placeholder for media/image content with aspect ratio support
 */

/**
 * Aspect ratio variants for the skeleton image
 * - 1/1: Square (1:1)
 * - 4/3: Standard photo (4:3)
 * - 16/9: Widescreen video (16:9)
 * - 21/9: Ultra-wide cinematic (21:9)
 */
export type SkeletonImageRatio = '1/1' | '4/3' | '16/9' | '21/9';

/**
 * Animation effect variants for the skeleton
 * Re-exported from base skeleton for convenience
 */
export type SkeletonImageEffect = 'shimmer' | 'pulse' | 'none';

/**
 * Props for the SandoSkeletonImage component
 */
export interface SandoSkeletonImageProps {
  /**
   * Aspect ratio of the skeleton image
   * - 1/1: Square, for thumbnails
   * - 4/3: Standard photo ratio
   * - 16/9: Widescreen, for video thumbnails
   * - 21/9: Ultra-wide cinematic
   * @default '16/9'
   */
  ratio?: SkeletonImageRatio;

  /**
   * Fixed height (CSS value)
   * When provided, overrides the aspect ratio
   * @default undefined
   */
  height?: string;

  /**
   * Width of the skeleton (CSS value)
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
  effect?: SkeletonImageEffect;
}
