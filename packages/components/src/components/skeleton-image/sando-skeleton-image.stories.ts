/**
 * Storybook stories for sando-skeleton-image component
 */

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton-image.js';

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

/**
 * A skeleton placeholder for media/image content with aspect ratio support.
 * Useful for loading states of images, videos, and other media.
 *
 * ## Features
 * - Aspect ratio presets: 1/1, 4/3, 16/9, 21/9
 * - Custom height option (overrides ratio)
 * - Configurable width
 * - Inherited animation effects from base skeleton
 */
const meta: Meta = {
  title: 'Components/Skeleton/SkeletonImage',
  component: 'sando-skeleton-image',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <div style="max-width: 400px;">
      <sando-skeleton-image
        ratio="${args.ratio || '16/9'}"
        width="${args.width || '100%'}"
        height="${args.height || ''}"
        effect="${args.effect || 'shimmer'}"
      ></sando-skeleton-image>
    </div>
  `,
  argTypes: {
    ratio: {
      control: 'select',
      options: ['1/1', '4/3', '16/9', '21/9'],
      description: 'Aspect ratio of the skeleton image',
      table: {
        category: 'Dimensions',
        type: { summary: "'1/1' | '4/3' | '16/9' | '21/9'" },
        defaultValue: { summary: '16/9' }
      }
    },
    height: {
      control: 'text',
      description: 'Fixed height (overrides ratio when provided)',
      table: {
        category: 'Dimensions',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    width: {
      control: 'text',
      description: 'Width of the skeleton',
      table: {
        category: 'Dimensions',
        type: { summary: 'string' },
        defaultValue: { summary: '100%' }
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
    ratio: '16/9',
    width: '100%',
    height: undefined,
    effect: 'shimmer'
  }
};

export default meta;
type Story = StoryObj;

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default skeleton image with 16/9 aspect ratio and shimmer effect.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 */
export const Playground: Story = {
  args: {
    ratio: '4/3'
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * All available aspect ratio variants.
 */
export const AspectRatios: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; max-width: 600px;">
      <div>
        <sando-skeleton-image ratio="1/1"></sando-skeleton-image>
        <div style="margin-top: 8px; font-size: 12px; color: #666; text-align: center;">
          1/1 (Square)
        </div>
      </div>
      <div>
        <sando-skeleton-image ratio="4/3"></sando-skeleton-image>
        <div style="margin-top: 8px; font-size: 12px; color: #666; text-align: center;">
          4/3 (Standard Photo)
        </div>
      </div>
      <div>
        <sando-skeleton-image ratio="16/9"></sando-skeleton-image>
        <div style="margin-top: 8px; font-size: 12px; color: #666; text-align: center;">
          16/9 (Widescreen)
        </div>
      </div>
      <div>
        <sando-skeleton-image ratio="21/9"></sando-skeleton-image>
        <div style="margin-top: 8px; font-size: 12px; color: #666; text-align: center;">
          21/9 (Ultra-Wide)
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Media gallery example with grid layout.
 */
export const MediaGalleryExample: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 600px;">
      ${[1, 2, 3, 4, 5, 6].map(
        () => html` <sando-skeleton-image ratio="1/1"></sando-skeleton-image> `
      )}
    </div>
  `,
  parameters: { controls: { disable: true } }
};
