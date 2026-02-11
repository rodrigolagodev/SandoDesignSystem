/**
 * Type definitions for sando-skeleton-composer component
 * Container that can apply staggered animation delays to child skeletons
 */

/**
 * Props for the SandoSkeletonComposer component
 */
export interface SandoSkeletonComposerProps {
  /**
   * Delay between each skeleton's animation start time
   * Creates a wave effect where each skeleton starts after the previous
   * Accepts CSS time values like '50ms', '100ms', '0.1s'
   * @example '50ms' - Each skeleton starts 50ms after the previous
   */
  stagger?: string;
}
