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
}
