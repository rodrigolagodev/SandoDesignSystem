/**
 * Storybook stories for sando-skeleton-stack component
 */

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton-stack.js';
import '../skeleton/sando-skeleton.js';
import '../skeleton/sando-skeleton-text.js';
import '../skeleton-avatar/sando-skeleton-avatar.js';

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

/**
 * A vertical layout helper for composing skeleton placeholders.
 * Use this to stack skeleton elements with configurable gap and horizontal alignment.
 *
 * ## Features
 * - Flexible gap sizes: xs, sm, md, lg
 * - Horizontal alignment: start, center, end, stretch
 * - Composable: Works with any skeleton component
 */
const meta: Meta = {
  title: 'Components/Skeleton/SkeletonStack',
  component: 'sando-skeleton-stack',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <div style="max-width: 300px;">
      <sando-skeleton-stack gap="${args.gap || 'md'}" align="${args.align || 'stretch'}">
        <sando-skeleton-text></sando-skeleton-text>
        <sando-skeleton-text width="80%"></sando-skeleton-text>
        <sando-skeleton-text width="60%"></sando-skeleton-text>
      </sando-skeleton-stack>
    </div>
  `,
  argTypes: {
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Gap between child elements',
      table: {
        category: 'Layout',
        type: { summary: "'xs' | 'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' }
      }
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Horizontal alignment of children',
      table: {
        category: 'Layout',
        type: { summary: "'start' | 'center' | 'end' | 'stretch'" },
        defaultValue: { summary: 'stretch' }
      }
    }
  },
  args: {
    gap: 'md',
    align: 'stretch'
  }
};

export default meta;
type Story = StoryObj;

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default skeleton stack with text lines.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 */
export const Playground: Story = {
  args: {
    gap: 'sm',
    align: 'center'
  },
  render: (args) => html`
    <div style="max-width: 400px; border: 1px dashed #ccc; padding: 16px;">
      <sando-skeleton-stack gap="${args.gap || 'md'}" align="${args.align || 'stretch'}">
        <sando-skeleton-avatar size="lg"></sando-skeleton-avatar>
        <sando-skeleton-text size="lg" width="60%"></sando-skeleton-text>
        <sando-skeleton-text width="80%"></sando-skeleton-text>
        <sando-skeleton-text width="70%"></sando-skeleton-text>
      </sando-skeleton-stack>
    </div>
  `
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * Different gap sizes.
 */
export const DifferentGaps: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 48px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 150px;">
        <p style="margin: 0 0 8px; font-size: 12px; color: #666;">gap="xs"</p>
        <sando-skeleton-stack gap="xs">
          <sando-skeleton-text></sando-skeleton-text>
          <sando-skeleton-text></sando-skeleton-text>
          <sando-skeleton-text></sando-skeleton-text>
        </sando-skeleton-stack>
      </div>
      <div style="flex: 1; min-width: 150px;">
        <p style="margin: 0 0 8px; font-size: 12px; color: #666;">gap="md"</p>
        <sando-skeleton-stack gap="md">
          <sando-skeleton-text></sando-skeleton-text>
          <sando-skeleton-text></sando-skeleton-text>
          <sando-skeleton-text></sando-skeleton-text>
        </sando-skeleton-stack>
      </div>
      <div style="flex: 1; min-width: 150px;">
        <p style="margin: 0 0 8px; font-size: 12px; color: #666;">gap="lg"</p>
        <sando-skeleton-stack gap="lg">
          <sando-skeleton-text></sando-skeleton-text>
          <sando-skeleton-text></sando-skeleton-text>
          <sando-skeleton-text></sando-skeleton-text>
        </sando-skeleton-stack>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Different alignment options.
 */
export const DifferentAlignments: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 48px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 200px;">
        <p style="margin: 0 0 8px; font-size: 12px; color: #666;">align="start"</p>
        <sando-skeleton-stack align="start" style="border: 1px dashed #ccc; padding: 16px;">
          <sando-skeleton-text width="80%"></sando-skeleton-text>
          <sando-skeleton-text width="60%"></sando-skeleton-text>
          <sando-skeleton-text width="40%"></sando-skeleton-text>
        </sando-skeleton-stack>
      </div>
      <div style="flex: 1; min-width: 200px;">
        <p style="margin: 0 0 8px; font-size: 12px; color: #666;">align="center"</p>
        <sando-skeleton-stack align="center" style="border: 1px dashed #ccc; padding: 16px;">
          <sando-skeleton-text width="80%"></sando-skeleton-text>
          <sando-skeleton-text width="60%"></sando-skeleton-text>
          <sando-skeleton-text width="40%"></sando-skeleton-text>
        </sando-skeleton-stack>
      </div>
      <div style="flex: 1; min-width: 200px;">
        <p style="margin: 0 0 8px; font-size: 12px; color: #666;">align="stretch" (default)</p>
        <sando-skeleton-stack align="stretch" style="border: 1px dashed #ccc; padding: 16px;">
          <sando-skeleton-text></sando-skeleton-text>
          <sando-skeleton-text></sando-skeleton-text>
          <sando-skeleton-text></sando-skeleton-text>
        </sando-skeleton-stack>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
