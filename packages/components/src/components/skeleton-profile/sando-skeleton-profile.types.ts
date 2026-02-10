/**
 * Type definitions for sando-skeleton-profile component
 * Preset skeleton for user profile card loading states
 */

/**
 * Size variants for the profile avatar
 * - sm: 32px
 * - md: 40px
 * - lg: 48px
 * - xl: 64px (default for profile)
 */
export type SkeletonProfileAvatarSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Props for the SandoSkeletonProfile component
 */
export interface SandoSkeletonProfileProps {
  /**
   * Size of the avatar skeleton
   * @default 'xl'
   */
  avatarSize?: SkeletonProfileAvatarSize;

  /**
   * Show bio lines below name
   * @default true
   */
  showBio?: boolean;

  /**
   * Number of bio lines to display
   * @default 2
   */
  bioLines?: number;
}
