/**
 * Type definitions for sando-skeleton-card component
 * Preset skeleton for card layouts composing skeleton primitives
 */

/**
 * Aspect ratio variants for the card image
 * - 1/1: Square
 * - 4/3: Standard photo
 * - 16/9: Widescreen (default)
 * - 21/9: Ultra-wide cinematic
 */
export type SkeletonCardImageRatio = '1/1' | '4/3' | '16/9' | '21/9';

/**
 * Width variants for the skeleton card
 * - 'auto': Natural width based on content/container
 * - 'full': 100% of container width
 * - string: Any valid CSS width value (e.g., '300px', '20rem')
 */
export type SkeletonCardWidth = 'auto' | 'full' | string;

/**
 * Orientation variants for the skeleton card
 * - 'vertical': Stacked layout — image on top, content below (default)
 * - 'horizontal': Side-by-side layout — image left, content right
 */
export type SkeletonCardOrientation = 'vertical' | 'horizontal';

/**
 * Props for the SandoSkeletonCard component
 */
export interface SandoSkeletonCardProps {
  /**
   * Show avatar in header section
   * @default false
   */
  showAvatar?: boolean;

  /**
   * Show image area
   * @default false
   */
  showImage?: boolean;

  /**
   * Show action buttons at the bottom
   * @default false
   */
  showActions?: boolean;

  /**
   * Number of paragraph lines
   * @default 3
   */
  lines?: number;

  /**
   * Image aspect ratio when showImage is true
   * @default '16/9'
   */
  imageRatio?: SkeletonCardImageRatio;

  /**
   * Width of the card
   * - 'auto': Natural width based on content/container
   * - 'full': 100% of container width
   * - Custom string: Any valid CSS width (e.g., '300px', '20rem')
   * @default 'auto'
   */
  width?: SkeletonCardWidth;

  /**
   * Layout orientation of the skeleton card
   * - 'vertical': Stacked — image on top (default)
   * - 'horizontal': Side-by-side — image left, content right
   * @default 'vertical'
   */
  orientation?: SkeletonCardOrientation;

  /**
   * Animation effect applied to all inner skeleton elements
   * @default 'shimmer'
   */
  effect?: 'shimmer' | 'pulse' | 'none';
}
