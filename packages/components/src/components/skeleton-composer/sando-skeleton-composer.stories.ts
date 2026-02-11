/**
 * Storybook stories for sando-skeleton-composer component
 */

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton-composer.js';
import '../skeleton/sando-skeleton-text.js';
import '../skeleton-avatar/sando-skeleton-avatar.js';
import '../skeleton-paragraph/sando-skeleton-paragraph.js';
import '../skeleton-stack/sando-skeleton-stack.js';
import '../skeleton-row/sando-skeleton-row.js';

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

/**
 * An orchestrator component that synchronizes animations across all child skeleton
 * elements. Controls timing coordination for cohesive loading states.
 *
 * ## Animation Modes
 * | Mode | Description |
 * |------|-------------|
 * | **Synchronized** (default) | All skeletons animate together in perfect sync |
 * | **Staggered** | Each skeleton starts with a delay, creating a wave effect |
 * | **Independent** | `sync="false"` - each skeleton animates on its own timing |
 */
const meta: Meta = {
  title: 'Components/Skeleton/SkeletonComposer',
  component: 'sando-skeleton-composer',
  tags: ['autodocs', 'beta'],
  render: (args) => html`
    <sando-skeleton-composer ?sync="${args.sync}" stagger="${args.stagger || ''}">
      <sando-skeleton-stack gap="sm">
        <sando-skeleton-text width="100%"></sando-skeleton-text>
        <sando-skeleton-text width="90%"></sando-skeleton-text>
        <sando-skeleton-text width="80%"></sando-skeleton-text>
        <sando-skeleton-text width="70%"></sando-skeleton-text>
      </sando-skeleton-stack>
    </sando-skeleton-composer>
  `,
  argTypes: {
    sync: {
      control: 'boolean',
      description: 'Synchronize all child skeleton animations',
      table: {
        category: 'Animation',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    stagger: {
      control: 'text',
      description: 'Delay between each skeleton\'s animation start (e.g., "50ms", "100ms")',
      table: {
        category: 'Animation',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    }
  },
  args: {
    sync: true,
    stagger: ''
  }
};

export default meta;
type Story = StoryObj;

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default synchronized animation - all skeletons animate together.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 */
export const Playground: Story = {
  args: {
    sync: true,
    stagger: '50ms'
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * Comparison of all animation modes side by side.
 */
export const AnimationComparison: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;">
      <div>
        <p style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #374151;">
          Synchronized
        </p>
        <sando-skeleton-composer>
          <sando-skeleton-stack gap="sm">
            <sando-skeleton-text width="100%"></sando-skeleton-text>
            <sando-skeleton-text width="80%"></sando-skeleton-text>
            <sando-skeleton-text width="60%"></sando-skeleton-text>
          </sando-skeleton-stack>
        </sando-skeleton-composer>
      </div>
      <div>
        <p style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #374151;">
          Staggered (50ms)
        </p>
        <sando-skeleton-composer stagger="50ms">
          <sando-skeleton-stack gap="sm">
            <sando-skeleton-text width="100%"></sando-skeleton-text>
            <sando-skeleton-text width="80%"></sando-skeleton-text>
            <sando-skeleton-text width="60%"></sando-skeleton-text>
          </sando-skeleton-stack>
        </sando-skeleton-composer>
      </div>
      <div>
        <p style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #374151;">
          Independent
        </p>
        <sando-skeleton-composer ?sync="${false}">
          <sando-skeleton-stack gap="sm">
            <sando-skeleton-text width="100%"></sando-skeleton-text>
            <sando-skeleton-text width="80%"></sando-skeleton-text>
            <sando-skeleton-text width="60%"></sando-skeleton-text>
          </sando-skeleton-stack>
        </sando-skeleton-composer>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Complex composition with multiple skeleton types.
 */
export const ComplexComposition: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-skeleton-composer stagger="30ms">
      <sando-skeleton-stack gap="md">
        <sando-skeleton-row gap="md" align="center">
          <sando-skeleton-avatar size="lg"></sando-skeleton-avatar>
          <sando-skeleton-stack gap="xs" style="flex: 1;">
            <sando-skeleton-text width="60%"></sando-skeleton-text>
            <sando-skeleton-text width="40%" size="sm"></sando-skeleton-text>
          </sando-skeleton-stack>
        </sando-skeleton-row>
        <sando-skeleton-paragraph lines="3"></sando-skeleton-paragraph>
      </sando-skeleton-stack>
    </sando-skeleton-composer>
  `,
  parameters: { controls: { disable: true } }
};
