import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton-button.js';

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

/**
 * A skeleton placeholder for button loading states.
 * Uses the base `sando-skeleton` component with a rounded shape to match button appearance.
 *
 * ## Features
 * - Three size variants matching button sizes (sm, md, lg)
 * - Auto width uses token-defined defaults per size
 * - Full width mode for block-level buttons
 * - Custom width support for specific dimensions
 * - Inherited animation effects from base skeleton
 */
const meta: Meta = {
  title: 'Components/Skeleton/SkeletonButton',
  component: 'sando-skeleton-button',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-skeleton-button
      flavor="${args.flavor || 'original'}"
      size="${args.size || 'md'}"
      width="${args.width || 'auto'}"
      effect="${args.effect || 'shimmer'}"
    ></sando-skeleton-button>
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
      description: 'Size of the skeleton button',
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' }
      }
    },
    width: {
      control: 'text',
      description: 'Width behavior: auto, full, or custom CSS value',
      table: {
        category: 'Dimensions',
        type: { summary: "'auto' | 'full' | string" },
        defaultValue: { summary: 'auto' }
      }
    },
    effect: {
      control: 'select',
      options: ['shimmer', 'pulse', 'none'],
      description: 'Animation effect',
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
 * Default skeleton button with medium size.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 */
export const Playground: Story = {
  args: {
    size: 'lg',
    width: '150px'
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * All size variants side by side.
 */
export const AllSizes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <span style="width: 40px; font-size: 12px; color: #666;">sm</span>
        <sando-skeleton-button size="sm"></sando-skeleton-button>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <span style="width: 40px; font-size: 12px; color: #666;">md</span>
        <sando-skeleton-button size="md"></sando-skeleton-button>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <span style="width: 40px; font-size: 12px; color: #666;">lg</span>
        <sando-skeleton-button size="lg"></sando-skeleton-button>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Button group loading state example.
 */
export const ButtonGroup: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 8px;">
      <sando-skeleton-button size="md"></sando-skeleton-button>
      <sando-skeleton-button size="md"></sando-skeleton-button>
      <sando-skeleton-button size="md"></sando-skeleton-button>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Full width skeleton button for block-level buttons.
 */
export const FullWidth: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="max-width: 400px;">
      <sando-skeleton-button width="full"></sando-skeleton-button>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
