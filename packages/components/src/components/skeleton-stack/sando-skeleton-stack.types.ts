/**
 * Type definitions for sando-skeleton-stack component
 * Vertical layout helper for composing skeleton placeholders
 */

/**
 * Gap variants for spacing between skeleton items
 * - xs: Extra small spacing (tight stack)
 * - sm: Small spacing (muted stack)
 * - md: Medium spacing (default stack)
 * - lg: Large spacing (emphasis stack)
 */
export type SkeletonStackGap = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Alignment variants for horizontal positioning of skeleton items
 * - start: Align items to flex-start
 * - center: Align items to center
 * - end: Align items to flex-end
 * - stretch: Stretch items to fill container width (default)
 */
export type SkeletonStackAlign = 'start' | 'center' | 'end' | 'stretch';

/**
 * Props for the SandoSkeletonStack component
 */
export interface SandoSkeletonStackProps {
  /**
   * Gap between child skeleton elements
   * - xs: Extra small spacing
   * - sm: Small spacing
   * - md: Medium spacing (default)
   * - lg: Large spacing
   * @default 'md'
   */
  gap?: SkeletonStackGap;

  /**
   * Horizontal alignment of child elements
   * - start: Align to left
   * - center: Align to center
   * - end: Align to right
   * - stretch: Stretch to fill (default)
   * @default 'stretch'
   */
  align?: SkeletonStackAlign;
}
