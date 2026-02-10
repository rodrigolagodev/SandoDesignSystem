/**
 * Type definitions for sando-skeleton-row component
 * Horizontal layout helper for composing skeleton placeholders
 */

/**
 * Gap variants for spacing between skeleton items
 * - xs: Extra small spacing (tight stack)
 * - sm: Small spacing (muted stack)
 * - md: Medium spacing (default stack)
 * - lg: Large spacing (emphasis stack)
 */
export type SkeletonRowGap = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Alignment variants for vertical positioning of skeleton items
 * - start: Align items to flex-start
 * - center: Align items to center (default)
 * - end: Align items to flex-end
 * - stretch: Stretch items to fill container height
 */
export type SkeletonRowAlign = 'start' | 'center' | 'end' | 'stretch';

/**
 * Props for the SandoSkeletonRow component
 */
export interface SandoSkeletonRowProps {
  /**
   * Gap between child skeleton elements
   * - xs: Extra small spacing
   * - sm: Small spacing
   * - md: Medium spacing (default)
   * - lg: Large spacing
   * @default 'md'
   */
  gap?: SkeletonRowGap;

  /**
   * Vertical alignment of child elements
   * - start: Align to top
   * - center: Align to center (default)
   * - end: Align to bottom
   * - stretch: Stretch to fill
   * @default 'center'
   */
  align?: SkeletonRowAlign;
}
