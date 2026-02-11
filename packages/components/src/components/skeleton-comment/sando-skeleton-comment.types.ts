/**
 * Type definitions for sando-skeleton-comment component
 * Preset skeleton for comment or review loading states
 */

/**
 * Size variants for the comment avatar
 * - xs: 24px (compact comment)
 * - sm: 32px (default)
 * - md: 40px (larger comment)
 */
export type SkeletonCommentAvatarSize = 'xs' | 'sm' | 'md';

/**
 * Size variants for comment text
 * Controls line height of text skeletons
 * - sm: Caption-sized text (compact)
 * - md: Body-sized text (default)
 * - lg: Larger text
 */
export type SkeletonCommentSize = 'sm' | 'md' | 'lg';

/**
 * Width options for skeleton comment
 * - 'auto': Natural width based on container
 * - 'full': 100% of container width
 * - string: Custom CSS width value
 */
export type SkeletonCommentWidth = 'auto' | 'full' | string;

/**
 * Props for the SandoSkeletonComment component
 */
export interface SandoSkeletonCommentProps {
  /**
   * Size of the avatar skeleton
   * @default 'sm'
   */
  avatarSize?: SkeletonCommentAvatarSize;

  /**
   * Number of comment text lines to display
   * @default 2
   */
  lines?: number;

  /**
   * Show timestamp next to author name
   * @default true
   */
  showTimestamp?: boolean;

  /**
   * Size of the text skeletons (controls line height)
   * @default 'md'
   */
  size?: SkeletonCommentSize;

  /**
   * Width of the comment container
   * - 'auto': Natural width based on container
   * - 'full': 100% of container width
   * - Custom string: Any valid CSS width
   * @default 'auto'
   */
  width?: SkeletonCommentWidth;
}
