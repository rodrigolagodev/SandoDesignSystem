/**
 * Type definitions for sando-skeleton-media-card component
 * Preset skeleton for media content card loading states (video, podcast, etc.)
 */

/**
 * Aspect ratio variants for the media card image
 * - 1/1: Square (album art, podcasts)
 * - 4/3: Standard photo
 * - 16/9: Widescreen video (default)
 * - 21/9: Ultra-wide cinematic
 */
export type SkeletonMediaCardImageRatio = '1/1' | '4/3' | '16/9' | '21/9';

/**
 * Width variants for the skeleton media card
 * - 'auto': Natural width based on content/container
 * - 'full': 100% of container width
 * - string: Any valid CSS width value (e.g., '300px', '20rem')
 */
export type SkeletonMediaCardWidth = 'auto' | 'full' | string;

/**
 * Props for the SandoSkeletonMediaCard component
 */
export interface SandoSkeletonMediaCardProps {
  /**
   * Aspect ratio of the image/thumbnail skeleton
   * @default '16/9'
   */
  imageRatio?: SkeletonMediaCardImageRatio;

  /**
   * Show description lines below title
   * @default true
   */
  showDescription?: boolean;

  /**
   * Number of description lines to display
   * @default 2
   */
  descriptionLines?: number;

  /**
   * Show action buttons at the bottom
   * @default true
   */
  showActions?: boolean;

  /**
   * Animation effect applied to all inner skeleton elements
   * @default 'shimmer'
   */
  effect?: 'shimmer' | 'pulse' | 'none';

  /**
   * Width of the media card
   * - 'auto': Natural width based on content/container
   * - 'full': 100% of container width
   * - Custom string: Any valid CSS width (e.g., '300px', '20rem')
   * @default 'auto'
   */
  width?: SkeletonMediaCardWidth;
}
