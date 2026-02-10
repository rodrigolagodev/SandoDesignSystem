/**
 * Storybook stories for sando-skeleton-card component
 */

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton-card.js';

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

/**
 * A preset skeleton for card layouts that composes skeleton primitives
 * and layout helpers. Provides a ready-to-use card loading placeholder
 * with configurable sections including header (with optional avatar),
 * image, paragraph content, and action buttons.
 *
 * ## Structure
 * ```
 * +--------------------------------------+
 * | [Avatar]  ################ (60%)     |  <- Header (optional avatar)
 * |           ########## (40%, smaller)  |
 * +--------------------------------------+
 * | +----------------------------------+ |  <- Image (optional, 16/9 default)
 * | |                                  | |
 * | +----------------------------------+ |
 * +--------------------------------------+
 * | #################################### |  <- Paragraph lines
 * | ##################################   |
 * | ##########################           |
 * +--------------------------------------+
 * | [Button] [Button]                    |  <- Actions (optional)
 * +--------------------------------------+
 * ```
 */
const meta: Meta = {
  title: 'Components/Skeleton/SkeletonCard',
  component: 'sando-skeleton-card',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <div style="max-width: ${args.width === 'auto' ? '400px' : 'none'};">
      <sando-skeleton-card
        flavor="${args.flavor || 'original'}"
        width="${args.width || 'auto'}"
        ?show-avatar="${args.showAvatar}"
        ?show-image="${args.showImage}"
        ?show-actions="${args.showActions}"
        lines="${args.lines || 3}"
        image-ratio="${args.imageRatio || '16/9'}"
      ></sando-skeleton-card>
    </div>
  `,
  argTypes: {
    flavor: {
      control: 'select',
      options: ['original', 'strawberry', 'tonkatsu', 'kiwi', 'egg-salad'],
      description: 'Visual flavor/theme of the component',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
        defaultValue: { summary: 'original' }
      }
    },
    width: {
      control: 'text',
      description: 'Width of the card: auto, full, or custom CSS value',
      table: {
        category: 'Dimensions',
        type: { summary: "'auto' | 'full' | string" },
        defaultValue: { summary: 'auto' }
      }
    },
    showAvatar: {
      control: 'boolean',
      description: 'Show avatar in header section',
      table: {
        category: 'Visibility',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showImage: {
      control: 'boolean',
      description: 'Show image area',
      table: {
        category: 'Visibility',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    showActions: {
      control: 'boolean',
      description: 'Show action buttons at the bottom',
      table: {
        category: 'Visibility',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    lines: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of paragraph lines',
      table: {
        category: 'Content',
        type: { summary: 'number' },
        defaultValue: { summary: '3' }
      }
    },
    imageRatio: {
      control: 'select',
      options: ['1/1', '4/3', '16/9', '21/9'],
      description: 'Image aspect ratio when showImage is true',
      table: {
        category: 'Content',
        type: { summary: "'1/1' | '4/3' | '16/9' | '21/9'" },
        defaultValue: { summary: '16/9' }
      }
    }
  },
  args: {
    flavor: 'original',
    width: 'auto',
    showAvatar: true,
    showImage: false,
    showActions: false,
    lines: 3,
    imageRatio: '16/9'
  }
};

export default meta;
type Story = StoryObj;

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default skeleton card with header and paragraph.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 */
export const Playground: Story = {
  args: {
    showImage: true,
    showActions: true
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * Full card with all sections enabled.
 */
export const FullCard: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="max-width: 400px;">
      <sando-skeleton-card show-avatar show-image show-actions></sando-skeleton-card>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Grid of skeleton cards.
 */
export const CardGrid: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      <sando-skeleton-card show-image></sando-skeleton-card>
      <sando-skeleton-card show-image></sando-skeleton-card>
      <sando-skeleton-card show-image></sando-skeleton-card>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Different image ratios.
 */
export const DifferentImageRatios: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
      <div>
        <p style="margin-bottom: 8px; font-size: 14px; color: #666;">1/1 (Square)</p>
        <sando-skeleton-card show-image image-ratio="1/1"></sando-skeleton-card>
      </div>
      <div>
        <p style="margin-bottom: 8px; font-size: 14px; color: #666;">16/9 (Widescreen)</p>
        <sando-skeleton-card show-image image-ratio="16/9"></sando-skeleton-card>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
