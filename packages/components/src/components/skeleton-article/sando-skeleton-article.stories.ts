/**
 * Storybook stories for sando-skeleton-article component
 */

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton-article.js';

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

/**
 * A preset skeleton for blog post or article layouts. Provides a ready-to-use
 * article loading placeholder with title, meta info, and multiple paragraphs.
 *
 * ## Structure
 * ```
 * +--------------------------------------+
 * | ########################### (title)   |
 * | #### ####### (date + author)          |
 * +--------------------------------------+
 * | #################################### |
 * | ##################################   |  <- Paragraph 1
 * | ##########################           |
 * +--------------------------------------+
 * | #################################### |
 * | ##################################   |  <- Paragraph 2
 * | ##########################           |
 * +--------------------------------------+
 * ```
 */
const meta: Meta = {
  title: 'Components/Skeleton/SkeletonArticle',
  component: 'sando-skeleton-article',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <div style="max-width: 700px;">
      <sando-skeleton-article
        ?show-meta="${args.showMeta}"
        paragraphs="${args.paragraphs || 3}"
        title-width="${args.titleWidth || '70%'}"
      ></sando-skeleton-article>
    </div>
  `,
  argTypes: {
    showMeta: {
      control: 'boolean',
      description: 'Show date/author meta line below title',
      table: {
        category: 'Visibility',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    paragraphs: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of paragraph blocks to display',
      table: {
        category: 'Content',
        type: { summary: 'number' },
        defaultValue: { summary: '3' }
      }
    },
    titleWidth: {
      control: 'text',
      description: 'Width of the title skeleton (CSS value)',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
        defaultValue: { summary: '70%' }
      }
    }
  },
  args: {
    showMeta: true,
    paragraphs: 3,
    titleWidth: '70%'
  }
};

export default meta;
type Story = StoryObj;

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default article skeleton with title, meta, and 3 paragraphs.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 */
export const Playground: Story = {
  args: {
    paragraphs: 5,
    titleWidth: '80%'
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * Different paragraph counts.
 */
export const DifferentParagraphCounts: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
      <div>
        <p style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #374151;">
          1 Paragraph
        </p>
        <sando-skeleton-article paragraphs="1"></sando-skeleton-article>
      </div>
      <div>
        <p style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #374151;">
          3 Paragraphs (default)
        </p>
        <sando-skeleton-article paragraphs="3"></sando-skeleton-article>
      </div>
      <div>
        <p style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #374151;">
          5 Paragraphs
        </p>
        <sando-skeleton-article paragraphs="5"></sando-skeleton-article>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * News feed layout example.
 */
export const NewsFeedExample: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="max-width: 600px; display: flex; flex-direction: column; gap: 24px;">
      ${[1, 2, 3].map(
        () => html`
          <div style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <sando-skeleton-article paragraphs="2"></sando-skeleton-article>
          </div>
        `
      )}
    </div>
  `,
  parameters: { controls: { disable: true } }
};
