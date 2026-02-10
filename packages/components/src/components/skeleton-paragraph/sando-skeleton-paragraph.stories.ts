/**
 * Storybook stories for sando-skeleton-paragraph component
 */

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton-paragraph.js';

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

/**
 * A skeleton placeholder for multiple lines of text content.
 * Renders configurable number of skeleton lines with the last line
 * having a different width for a more natural paragraph appearance.
 *
 * ## Features
 * - Configurable line count
 * - Custom last line width for natural look
 * - Spacing variants: xs, sm, md, lg
 * - Inherits animation effects from base skeleton
 */
const meta: Meta = {
  title: 'Components/Skeleton/SkeletonParagraph',
  component: 'sando-skeleton-paragraph',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <div style="max-width: 400px;">
      <sando-skeleton-paragraph
        lines="${args.lines || 3}"
        last-line-width="${args.lastLineWidth || '60%'}"
        spacing="${args.spacing || 'sm'}"
        effect="${args.effect || 'shimmer'}"
      ></sando-skeleton-paragraph>
    </div>
  `,
  argTypes: {
    lines: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of text lines to render',
      table: {
        category: 'Content',
        type: { summary: 'number' },
        defaultValue: { summary: '3' }
      }
    },
    lastLineWidth: {
      control: 'text',
      description: 'Width of the last line (CSS value)',
      table: {
        category: 'Dimensions',
        type: { summary: 'string' },
        defaultValue: { summary: '60%' }
      }
    },
    spacing: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Gap between lines',
      table: {
        category: 'Appearance',
        type: { summary: "'xs' | 'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'sm' }
      }
    },
    effect: {
      control: 'select',
      options: ['shimmer', 'pulse', 'none'],
      description: 'Animation effect applied to all skeleton lines',
      table: {
        category: 'Appearance',
        type: { summary: "'shimmer' | 'pulse' | 'none'" },
        defaultValue: { summary: 'shimmer' }
      }
    }
  },
  args: {
    lines: 3,
    lastLineWidth: '60%',
    spacing: 'sm',
    effect: 'shimmer'
  }
};

export default meta;
type Story = StoryObj;

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default skeleton paragraph with 3 lines and shimmer effect.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 */
export const Playground: Story = {
  args: {
    lines: 4,
    lastLineWidth: '70%'
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * Different line counts for various content types.
 */
export const DifferentLineCounts: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; max-width: 400px;">
      <div>
        <p style="margin-bottom: 8px; font-weight: 500;">1 Line</p>
        <sando-skeleton-paragraph lines="1"></sando-skeleton-paragraph>
      </div>

      <div>
        <p style="margin-bottom: 8px; font-weight: 500;">3 Lines (default)</p>
        <sando-skeleton-paragraph lines="3"></sando-skeleton-paragraph>
      </div>

      <div>
        <p style="margin-bottom: 8px; font-weight: 500;">5 Lines</p>
        <sando-skeleton-paragraph lines="5"></sando-skeleton-paragraph>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Different spacing variants for gap between lines.
 */
export const SpacingVariants: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 32px; max-width: 800px;">
      <div style="flex: 1;">
        <p style="margin-bottom: 8px; font-weight: 500;">xs</p>
        <sando-skeleton-paragraph spacing="xs"></sando-skeleton-paragraph>
      </div>
      <div style="flex: 1;">
        <p style="margin-bottom: 8px; font-weight: 500;">sm (default)</p>
        <sando-skeleton-paragraph spacing="sm"></sando-skeleton-paragraph>
      </div>
      <div style="flex: 1;">
        <p style="margin-bottom: 8px; font-weight: 500;">md</p>
        <sando-skeleton-paragraph spacing="md"></sando-skeleton-paragraph>
      </div>
      <div style="flex: 1;">
        <p style="margin-bottom: 8px; font-weight: 500;">lg</p>
        <sando-skeleton-paragraph spacing="lg"></sando-skeleton-paragraph>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Article content example with multiple paragraphs.
 */
export const ArticleContent: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="max-width: 600px; display: flex; flex-direction: column; gap: 24px;">
      <sando-skeleton-paragraph lines="4" last-line-width="80%"></sando-skeleton-paragraph>
      <sando-skeleton-paragraph lines="3" last-line-width="50%"></sando-skeleton-paragraph>
      <sando-skeleton-paragraph lines="5" last-line-width="65%"></sando-skeleton-paragraph>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
