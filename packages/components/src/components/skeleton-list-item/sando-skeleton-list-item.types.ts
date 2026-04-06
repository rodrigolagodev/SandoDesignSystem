/**
 * Type definitions for sando-skeleton-list-item component
 * A preset skeleton for list item layouts with avatar, text, and action areas
 */

/**
 * Avatar size variants
 * - xs: Extra small avatar (24px)
 * - sm: Small avatar (32px)
 * - md: Medium avatar (40px, default)
 * - lg: Large avatar (48px)
 * - xl: Extra large avatar (64px)
 */
export type SkeletonListItemAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Props for the SandoSkeletonListItem component
 */
export interface SandoSkeletonListItemProps {
  /**
   * Show avatar/icon placeholder on the left
   * @default true
   */
  showAvatar?: boolean;

  /**
   * Show action button placeholder on the right
   * @default false
   */
  showAction?: boolean;

  /**
   * Number of text lines to display (1-3)
   * @default 2
   */
  lines?: number;

  /**
   * Size of the avatar placeholder
   * @default 'md'
   */
  avatarSize?: SkeletonListItemAvatarSize;
}
