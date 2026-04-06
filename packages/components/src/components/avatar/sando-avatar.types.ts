/**
 * Type definitions for sando-avatar component
 *
 * An avatar component that displays a user's profile image, initials,
 * or a fallback icon. Supports presence indicators and link behavior.
 */

/**
 * Size variants for the avatar.
 * Maps to token-based dimensions.
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Shape variants for the avatar.
 * - circle: Fully circular (50% radius)
 * - rounded: Moderately rounded corners
 */
export type AvatarShape = 'circle' | 'rounded';

/**
 * Presence status variants.
 * - online: Green — user is available
 * - offline: Gray — user is offline
 * - busy: Red — do not disturb
 * - away: Amber — user is away
 * - none: No presence indicator
 */
export type AvatarPresence = 'online' | 'offline' | 'busy' | 'away' | 'none';

/**
 * Position of the presence indicator dot relative to the avatar.
 */
export type AvatarPresencePosition = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

/**
 * Link target variants (mirrors native <a> target attribute).
 */
export type AvatarTarget = '_self' | '_blank' | '_parent' | '_top';

/**
 * Props for the SandoAvatar component
 */
export interface SandoAvatarProps {
  /**
   * URL of the avatar image.
   */
  src?: string;

  /**
   * Full name of the person.
   * Used to generate initials and as aria-label fallback.
   */
  name?: string;

  /**
   * Size of the avatar.
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * Shape of the avatar.
   * @default 'circle'
   */
  shape?: AvatarShape;

  /**
   * Presence status indicator.
   * Shows a colored dot when not 'none'.
   * @default 'none'
   */
  presence?: AvatarPresence;

  /**
   * Position of the presence indicator dot.
   * @default 'bottom-end'
   */
  presencePosition?: AvatarPresencePosition;

  /**
   * URL to navigate to. When provided, renders the avatar as an <a> element.
   */
  href?: string;

  /**
   * Where to open the linked document.
   * Only used when href is provided.
   */
  target?: AvatarTarget;

  /**
   * Alt text for the image.
   * Falls back to `name` if not provided.
   */
  alt?: string;

  /**
   * Design system flavor/theme.
   * @default 'original'
   */
  flavor?: string;
}
