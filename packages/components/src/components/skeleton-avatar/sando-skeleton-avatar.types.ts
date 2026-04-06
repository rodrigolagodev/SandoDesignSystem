/**
 * Type definitions for sando-skeleton-avatar component
 * Circular skeleton placeholder for avatar loading states
 */

/**
 * Size variants for the skeleton avatar
 * - xs: 24px (extra small avatars)
 * - sm: 32px (small avatars)
 * - md: 40px (default medium avatars)
 * - lg: 48px (large avatars)
 * - xl: 64px (extra large avatars)
 */
export type SkeletonAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Animation effect variants for the skeleton avatar
 * - shimmer: Gradient moves from left to right (default)
 * - pulse: Opacity oscillates between 0.4 and 1
 * - none: Static (for reduced motion or no animation)
 */
export type SkeletonAvatarEffect = 'shimmer' | 'pulse' | 'none';

/**
 * Shape variants for the skeleton avatar
 * - circle: Fully circular (default) — matches sando-avatar shape="circle"
 * - rounded: Rounded rectangle — matches sando-avatar shape="rounded"
 */
export type SkeletonAvatarShape = 'circle' | 'rounded';

/**
 * Props for the SandoSkeletonAvatar component
 */
export interface SandoSkeletonAvatarProps {
  /**
   * Size of the avatar skeleton
   * Maps to predefined token-based dimensions
   * @default 'md'
   */
  size?: SkeletonAvatarSize;

  /**
   * Animation effect applied to the skeleton
   * - shimmer: Moving gradient effect
   * - pulse: Opacity animation
   * - none: No animation (respects prefers-reduced-motion)
   * @default 'shimmer'
   */
  effect?: SkeletonAvatarEffect;

  /**
   * Shape of the avatar skeleton
   * - circle: Fully circular (default)
   * - rounded: Rounded rectangle
   * @default 'circle'
   */
  shape?: SkeletonAvatarShape;
}
