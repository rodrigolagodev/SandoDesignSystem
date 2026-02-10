/**
 * Type definitions for sando-skeleton-article component
 * Preset skeleton for blog post or article loading states
 */

/**
 * Props for the SandoSkeletonArticle component
 */
export interface SandoSkeletonArticleProps {
  /**
   * Show date/author meta line below title
   * @default true
   */
  showMeta?: boolean;

  /**
   * Number of paragraph blocks to display
   * @default 3
   */
  paragraphs?: number;

  /**
   * Width of the title skeleton (CSS value)
   * @default '70%'
   */
  titleWidth?: string;
}
