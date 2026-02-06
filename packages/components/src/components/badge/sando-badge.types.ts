/**
 * Type definitions for sando-badge component
 *
 * A purely informative label component for displaying states, categories,
 * and quick labels. Non-interactive (no click handlers, no hover states).
 */

/**
 * Semantic color variants for the badge.
 * Maps to semantic states and categories.
 */
export type BadgeColor = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

/**
 * Visual style variant of the badge.
 * Controls the appearance (filled, bordered, etc.)
 */
export type BadgeVariant = 'solid' | 'soft' | 'outline' | 'surface';

/**
 * Size variants for the badge.
 */
export type BadgeSize = 'small' | 'medium' | 'large';

/**
 * Colors that have a default semantic icon.
 * These colors automatically show an icon unless noIcon is set.
 */
export type BadgeSemanticColor = 'success' | 'warning' | 'danger' | 'info';

/**
 * Mapping of semantic colors to their default icon names.
 */
export const BADGE_SEMANTIC_ICONS: Record<BadgeSemanticColor, string> = {
  success: 'check',
  warning: 'triangle-alert',
  danger: 'circle-alert',
  info: 'info'
} as const;

/**
 * Props for the SandoBadge component
 */
export interface SandoBadgeProps {
  /**
   * Semantic color of the badge.
   * @default 'neutral'
   */
  color?: BadgeColor;

  /**
   * Visual style variant of the badge.
   * @default 'solid'
   */
  variant?: BadgeVariant;

  /**
   * Size of the badge.
   * @default 'medium'
   */
  size?: BadgeSize;

  /**
   * Reduces vertical padding for use in compact spaces.
   * Changes paddingBlock to a tighter value.
   * Works with all size variants.
   * @default false
   */
  compact?: boolean;

  /**
   * Custom icon name to override the default semantic icon.
   * When set, this icon is displayed instead of the automatic semantic icon.
   */
  icon?: string;

  /**
   * Hides the icon completely, even for semantic colors.
   * @default false
   */
  noIcon?: boolean;

  /**
   * Design system flavor/theme.
   * @default 'original'
   */
  flavor?: string;
}
