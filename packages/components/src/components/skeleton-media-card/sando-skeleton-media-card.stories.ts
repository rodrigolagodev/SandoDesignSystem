/**
 * Storybook stories for sando-skeleton-media-card component
 */

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton-media-card.js';

const DOCS_ONLY = ['!dev', '!autodocs'];

const meta: Meta = {
  title: 'Components/Skeleton/SkeletonMediaCard',
  component: 'sando-skeleton-media-card',
  tags: ['autodocs', 'beta'],
  render: (args) => html`
    <div style="max-width: 400px;">
      <sando-skeleton-media-card
        image-ratio="${args.imageRatio || '16/9'}"
        ?show-description="${args.showDescription}"
        description-lines="${args.descriptionLines || 2}"
        ?show-actions="${args.showActions}"
      ></sando-skeleton-media-card>
    </div>
  `,
  argTypes: {
    imageRatio: {
      control: 'select',
      options: ['1/1', '4/3', '16/9', '21/9'],
      description: 'Aspect ratio of the image/thumbnail skeleton',
      table: {
        category: 'Appearance',
        type: { summary: "'1/1' | '4/3' | '16/9' | '21/9'" },
        defaultValue: { summary: '16/9' }
      }
    },
    showDescription: {
      control: 'boolean',
      description: 'Show description lines below title',
      table: {
        category: 'Visibility',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    descriptionLines: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Number of description lines to display',
      table: {
        category: 'Content',
        type: { summary: 'number' },
        defaultValue: { summary: '2' }
      }
    },
    showActions: {
      control: 'boolean',
      description: 'Show action buttons at the bottom',
      table: {
        category: 'Visibility',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    }
  },
  args: {
    imageRatio: '16/9',
    showDescription: true,
    descriptionLines: 2,
    showActions: true
  },
  parameters: {
    docs: {
      description: {
        component: `
A preset skeleton for media content cards (video, podcast, etc.) with
large image/thumbnail, title, description, and action buttons.

## Structure

\`\`\`
+--------------------------------------+
| +----------------------------------+ |  <- Image (configurable ratio)
| |                                  | |
| |                                  | |
| +----------------------------------+ |
+--------------------------------------+
| #################################### |  <- Title (85% width)
+--------------------------------------+
| #################################### |  <- Description lines (optional)
| ############################         |
+--------------------------------------+
| [Button] [Button]                    |  <- Actions (optional)
+--------------------------------------+
\`\`\`

## Usage

\`\`\`html
<!-- Basic media card skeleton -->
<sando-skeleton-media-card></sando-skeleton-media-card>

<!-- Square image for podcasts/albums -->
<sando-skeleton-media-card image-ratio="1/1"></sando-skeleton-media-card>

<!-- Without description -->
<sando-skeleton-media-card show-description="false"></sando-skeleton-media-card>

<!-- Without actions -->
<sando-skeleton-media-card show-actions="false"></sando-skeleton-media-card>
\`\`\`
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

/**
 * Default skeleton media card with all sections visible
 */
export const Default: Story = {};

/**
 * Interactive playground with all controls
 */
export const Playground: Story = {
  args: {
    imageRatio: '4/3',
    showDescription: true,
    descriptionLines: 3,
    showActions: true
  }
};

/**
 * Different image aspect ratios comparison
 */
export const ImageRatios: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
      <div>
        <p style="margin-bottom: 8px; font-size: 14px; color: #666;">1/1 (Square)</p>
        <sando-skeleton-media-card image-ratio="1/1"></sando-skeleton-media-card>
      </div>
      <div>
        <p style="margin-bottom: 8px; font-size: 14px; color: #666;">4/3 (Standard)</p>
        <sando-skeleton-media-card image-ratio="4/3"></sando-skeleton-media-card>
      </div>
      <div>
        <p style="margin-bottom: 8px; font-size: 14px; color: #666;">16/9 (Widescreen - Default)</p>
        <sando-skeleton-media-card image-ratio="16/9"></sando-skeleton-media-card>
      </div>
      <div>
        <p style="margin-bottom: 8px; font-size: 14px; color: #666;">21/9 (Ultra-wide)</p>
        <sando-skeleton-media-card image-ratio="21/9"></sando-skeleton-media-card>
      </div>
    </div>
  `,
  parameters: {
    controls: { disable: true }
  }
};

/**
 * Video cards grid layout example (YouTube-style)
 */
export const VideoCardsGrid: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
      <sando-skeleton-media-card
        image-ratio="16/9"
        description-lines="2"
        show-actions="false"
      ></sando-skeleton-media-card>
      <sando-skeleton-media-card
        image-ratio="16/9"
        description-lines="2"
        show-actions="false"
      ></sando-skeleton-media-card>
      <sando-skeleton-media-card
        image-ratio="16/9"
        description-lines="2"
        show-actions="false"
      ></sando-skeleton-media-card>
    </div>
  `,
  parameters: {
    controls: { disable: true }
  }
};
