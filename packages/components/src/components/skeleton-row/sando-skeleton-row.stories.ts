import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton-row.js';
import '../skeleton/sando-skeleton.js';
import '../skeleton-avatar/sando-skeleton-avatar.js';
import '../skeleton/sando-skeleton-text.js';
import '../skeleton-paragraph/sando-skeleton-paragraph.js';

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
 * A horizontal layout helper for composing skeleton placeholders.
 * Use this to arrange skeleton elements side by side with configurable gap and vertical alignment.
 *
 * ## Features
 * - Flexible gap sizes: xs, sm, md, lg
 * - Vertical alignment: start, center, end, stretch
 * - Composable: Works with any skeleton component
 * - Flavor support: Inherits theme from FlavorableMixin
 */
const meta: Meta = {
  title: 'Components/Skeleton/SkeletonRow',
  component: 'sando-skeleton-row',
  tags: ['autodocs', 'beta'],
  render: (args) => html`
    <sando-skeleton-row gap="${args.gap || 'md'}" align="${args.align || 'center'}">
      <sando-skeleton shape="circular" width="40px" height="40px"></sando-skeleton>
      <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
        <sando-skeleton shape="text" width="80%" height="1.2em"></sando-skeleton>
        <sando-skeleton shape="text" width="60%" height="1em"></sando-skeleton>
      </div>
    </sando-skeleton-row>
  `,
  argTypes: {
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Gap between child skeleton elements',
      table: {
        category: 'Layout',
        type: { summary: "'xs' | 'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' }
      }
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Vertical alignment of child elements',
      table: {
        category: 'Layout',
        type: { summary: "'start' | 'center' | 'end' | 'stretch'" },
        defaultValue: { summary: 'center' }
      }
    }
  },
  args: {
    gap: 'md',
    align: 'center'
  }
};

export default meta;
type Story = StoryObj;

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default skeleton row with avatar and text.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 */
export const Playground: Story = {
  args: {
    gap: 'lg',
    align: 'start'
  },
  render: (args) => html`
    <sando-skeleton-row
      gap="${args.gap || 'md'}"
      align="${args.align || 'center'}"
      style="background: #f5f5f5; padding: 16px;"
    >
      <sando-skeleton shape="circular" width="48px" height="48px"></sando-skeleton>
      <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
        <sando-skeleton shape="text" width="80%" height="1.2em"></sando-skeleton>
        <sando-skeleton shape="text" width="60%" height="1em"></sando-skeleton>
      </div>
      <sando-skeleton shape="rounded" width="80px" height="36px"></sando-skeleton>
    </sando-skeleton-row>
  `
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * Different gap sizes between skeleton items.
 */
export const DifferentGaps: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        ${storyLabel('gap="xs"')}
        <sando-skeleton-row gap="xs">
          <sando-skeleton shape="circular" width="32px" height="32px"></sando-skeleton>
          <sando-skeleton shape="text" width="100px" height="1em"></sando-skeleton>
          <sando-skeleton shape="text" width="80px" height="1em"></sando-skeleton>
        </sando-skeleton-row>
      </div>
      <div>
        ${storyLabel('gap="md" (default)')}
        <sando-skeleton-row gap="md">
          <sando-skeleton shape="circular" width="32px" height="32px"></sando-skeleton>
          <sando-skeleton shape="text" width="100px" height="1em"></sando-skeleton>
          <sando-skeleton shape="text" width="80px" height="1em"></sando-skeleton>
        </sando-skeleton-row>
      </div>
      <div>
        ${storyLabel('gap="lg"')}
        <sando-skeleton-row gap="lg">
          <sando-skeleton shape="circular" width="32px" height="32px"></sando-skeleton>
          <sando-skeleton shape="text" width="100px" height="1em"></sando-skeleton>
          <sando-skeleton shape="text" width="80px" height="1em"></sando-skeleton>
        </sando-skeleton-row>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Different vertical alignments.
 */
export const DifferentAlignments: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      <div>
        ${storyLabel('align="start"')}
        <sando-skeleton-row align="start" style="background: #f5f5f5; padding: 8px;">
          <sando-skeleton shape="circular" width="48px" height="48px"></sando-skeleton>
          <sando-skeleton-paragraph lines="3" style="flex: 1;"></sando-skeleton-paragraph>
        </sando-skeleton-row>
      </div>
      <div>
        ${storyLabel('align="center" (default)')}
        <sando-skeleton-row align="center" style="background: #f5f5f5; padding: 8px;">
          <sando-skeleton shape="circular" width="48px" height="48px"></sando-skeleton>
          <sando-skeleton-paragraph lines="3" style="flex: 1;"></sando-skeleton-paragraph>
        </sando-skeleton-row>
      </div>
      <div>
        ${storyLabel('align="end"')}
        <sando-skeleton-row align="end" style="background: #f5f5f5; padding: 8px;">
          <sando-skeleton shape="circular" width="48px" height="48px"></sando-skeleton>
          <sando-skeleton-paragraph lines="3" style="flex: 1;"></sando-skeleton-paragraph>
        </sando-skeleton-row>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
