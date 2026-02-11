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
}
