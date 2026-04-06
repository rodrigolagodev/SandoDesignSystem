import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton-text.js';

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

const storyLabel = (text: string) => html`
  <span
    style="
    display: block;
    font-size: var(--sando-typography-size-xs, 0.75rem);
    font-weight: var(--sando-typography-weight-medium, 500);
    color: var(--sando-color-text-subtle, #6b7280);
    margin-bottom: var(--sando-space-2, 0.5rem);
    letter-spacing: 0.02em;
    text-transform: uppercase;
  "
    >${text}</span
  >
`;

/**
 * A semantic skeleton component for single lines of text.
 * This is a thin wrapper around `sando-skeleton` with text-specific sizing presets.
 *
 * ## Usage Guidelines
 * - Use for text line placeholders
 * - Size prop maps to typical text line heights
 * - Combine multiple instances for multi-line text blocks
 *
 * ## Size Reference
 * | Size | Token | Use Case |
 * |------|-------|----------|
 * | sm | --sando-skeleton-size-text-height-sm | Small text, captions |
 * | md | --sando-skeleton-size-text-height-md | Body text (default) |
 * | lg | --sando-skeleton-size-text-height-lg | Headings, titles |
 */
const meta: Meta = {
  title: 'Components/Skeleton/SkeletonText',
  component: 'sando-skeleton-text',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-skeleton-text
      flavor="${args.flavor || 'original'}"
      size="${args.size || 'md'}"
      width="${args.width || 'auto'}"
      effect="${args.effect || 'shimmer'}"
    ></sando-skeleton-text>
  `,
  argTypes: {
    flavor: {
      control: 'select',
      options: ['original', 'strawberry', 'tonkatsu', 'kiwi', 'egg-salad'],
      description: 'Active flavor — changes the color palette and visual identity of the component',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
        defaultValue: { summary: 'original' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the text skeleton (maps to height)',
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' }
      }
    },
    width: {
      control: 'select',
      options: ['auto', 'full', '50%', '80%', '200px'],
      description: 'Width of the skeleton: auto, full, or custom CSS value',
      table: {
        category: 'Dimensions',
        type: { summary: "'auto' | 'full' | string" },
        defaultValue: { summary: 'auto' }
      }
    },
    effect: {
      control: 'select',
      options: ['shimmer', 'pulse', 'none'],
      description: 'Animation effect applied to the skeleton',
      table: {
        category: 'Appearance',
        type: { summary: "'shimmer' | 'pulse' | 'none'" },
        defaultValue: { summary: 'shimmer' }
      }
    }
  },
  args: {
    flavor: 'original',
    size: 'md',
    width: 'auto',
    effect: 'shimmer'
  }
};

export default meta;
type Story = StoryObj;

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default skeleton text with medium size and shimmer effect.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 */
export const Playground: Story = {
  args: {
    width: '80%'
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * All size variants: sm, md, and lg.
 */
export const AllSizes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <div>
        ${storyLabel('sm (0.875em) — Captions, small text')}
        <sando-skeleton-text size="sm" width="70%"></sando-skeleton-text>
      </div>

      <div>
        ${storyLabel('md (1em) — Body text (default)')}
        <sando-skeleton-text size="md" width="85%"></sando-skeleton-text>
      </div>

      <div>
        ${storyLabel('lg (1.25em) — Headings, titles')}
        <sando-skeleton-text size="lg" width="60%"></sando-skeleton-text>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All effect variants: shimmer, pulse, and none.
 */
export const AllEffects: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <div>
        ${storyLabel('Shimmer (default)')}
        <sando-skeleton-text effect="shimmer" width="90%"></sando-skeleton-text>
      </div>

      <div>
        ${storyLabel('Pulse')}
        <sando-skeleton-text effect="pulse" width="90%"></sando-skeleton-text>
      </div>

      <div>
        ${storyLabel('None (static)')}
        <sando-skeleton-text effect="none" width="90%"></sando-skeleton-text>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Example of title and description composition.
 */
export const TitleAndDescription: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="max-width: 400px;">
      <!-- Title -->
      <sando-skeleton-text size="lg" width="60%"></sando-skeleton-text>

      <div style="height: 12px;"></div>

      <!-- Description -->
      <sando-skeleton-text size="md" width="100%"></sando-skeleton-text>
      <div style="height: 6px;"></div>
      <sando-skeleton-text size="md" width="90%"></sando-skeleton-text>
      <div style="height: 6px;"></div>
      <sando-skeleton-text size="md" width="75%"></sando-skeleton-text>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
