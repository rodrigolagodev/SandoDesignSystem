/**
 * Type definitions for sando-skeleton-article component
 * Preset skeleton for blog post or article loading states
 */

/**
 * Size variants for skeleton article text
 * Controls line height and spacing between lines
 * - sm: Caption-sized text (compact articles, sidebars)
 * - md: Body-sized text (standard articles)
 * - lg: Heading-sized text (large feature articles)
 */
export type SkeletonArticleSize = 'sm' | 'md' | 'lg';

/**
 * Props for the SandoSkeletonArticle component
 */
export interface SandoSkeletonArticleProps {
  /**
   * Size of the paragraph text lines
   * Controls line height and spacing between lines
   * - sm: Caption-sized (compact)
   * - md: Body-sized (default)
   * - lg: Heading-sized (large)
   * @default 'md'
   */
  size?: SkeletonArticleSize;

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
