/**
 * Type definitions for sando-skeleton-composer component
 * Orchestrator that synchronizes animations across child skeletons
 */

/**
 * Props for the SandoSkeletonComposer component
 */
export interface SandoSkeletonComposerProps {
  /**
   * Synchronize all child skeleton animations to start at the same time
   * When true, all skeletons animate in unison
   * When false with no stagger, each skeleton animates independently
   * @default true
   */
  sync?: boolean;

  /**
   * Delay between each skeleton's animation start time
   * Creates a wave effect where each skeleton starts after the previous
   * Accepts CSS time values like '50ms', '100ms', '0.1s'
   * @example '50ms' - Each skeleton starts 50ms after the previous
   */
  stagger?: string;
}
