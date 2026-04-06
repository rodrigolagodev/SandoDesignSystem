import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton-comment.js';

const DOCS_ONLY = ['!dev', '!autodocs'];

const meta: Meta = {
  title: 'Components/Skeleton/SkeletonComment',
  component: 'sando-skeleton-comment',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <div style="max-width: ${args.width === 'auto' ? '500px' : 'none'};">
      <sando-skeleton-comment
        flavor="${args.flavor || 'original'}"
        size="${args.size || 'md'}"
        width="${args.width || 'auto'}"
        avatar-size="${args.avatarSize || 'sm'}"
        lines="${args.lines || 2}"
        ?show-timestamp="${args.showTimestamp}"
      ></sando-skeleton-comment>
    </div>
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
      description: 'Size of text skeletons (controls line height)',
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' }
      }
    },
    width: {
      control: 'text',
      description: 'Width of the comment: auto, full, or custom CSS value',
      table: {
        category: 'Dimensions',
        type: { summary: "'auto' | 'full' | string" },
        defaultValue: { summary: 'auto' }
      }
    },
    avatarSize: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
      description: 'Size of the avatar skeleton',
      table: {
        category: 'Appearance',
        type: { summary: "'xs' | 'sm' | 'md'" },
        defaultValue: { summary: 'sm' }
      }
    },
    lines: {
      control: { type: 'number', min: 1, max: 6 },
      description: 'Number of comment text lines to display',
      table: {
        category: 'Content',
        type: { summary: 'number' },
        defaultValue: { summary: '2' }
      }
    },
    showTimestamp: {
      control: 'boolean',
      description: 'Show timestamp next to author name',
      table: {
        category: 'Visibility',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    }
  },
  args: {
    flavor: 'original',
    size: 'md',
    width: 'auto',
    avatarSize: 'sm',
    lines: 2,
    showTimestamp: true
  },
  parameters: {
    docs: {
      description: {
        component: `
A preset skeleton for comment or review layouts with avatar on the side, 
author name, optional timestamp, and comment text lines.

## Structure

\`\`\`
+----------------------------------------------------+
| [Avatar]  ######## (author)  #### (timestamp)      |
|           ###################################### (100%) |
|           ########################## (70%)         |
+----------------------------------------------------+
\`\`\`

## Usage

\`\`\`html
<!-- Basic comment (avatar + author + 2 lines) -->
<sando-skeleton-comment></sando-skeleton-comment>

<!-- Without timestamp -->
<sando-skeleton-comment show-timestamp="false"></sando-skeleton-comment>

<!-- Custom line count -->
<sando-skeleton-comment lines="4"></sando-skeleton-comment>

<!-- Small avatar for compact comments -->
<sando-skeleton-comment avatar-size="xs"></sando-skeleton-comment>
\`\`\`
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

/**
 * Default comment skeleton with avatar, author, timestamp, and 2 text lines
 */
export const Default: Story = {};

/**
 * Interactive playground to experiment with all props
 */
export const Playground: Story = {
  args: {
    avatarSize: 'md',
    lines: 3,
    showTimestamp: true
  }
};

/**
 * Different avatar sizes comparison
 */
export const AvatarSizes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 500px;">
      <div>
        <p style="margin-bottom: 8px; font-size: 14px; font-weight: 600; color: #374151;">
          XS - Compact
        </p>
        <sando-skeleton-comment avatar-size="xs"></sando-skeleton-comment>
      </div>
      <div>
        <p style="margin-bottom: 8px; font-size: 14px; font-weight: 600; color: #374151;">
          SM - Default
        </p>
        <sando-skeleton-comment avatar-size="sm"></sando-skeleton-comment>
      </div>
      <div>
        <p style="margin-bottom: 8px; font-size: 14px; font-weight: 600; color: #374151;">
          MD - Large
        </p>
        <sando-skeleton-comment avatar-size="md"></sando-skeleton-comment>
      </div>
    </div>
  `,
  parameters: {
    controls: { disable: true }
  }
};

/**
 * Comment thread with nested replies example
 */
export const CommentThread: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="max-width: 600px; display: flex; flex-direction: column; gap: 16px;">
      <sando-skeleton-comment lines="3"></sando-skeleton-comment>

      <div
        style="margin-left: 48px; padding-left: 16px; border-left: 2px solid #e5e7eb; display: flex; flex-direction: column; gap: 12px;"
      >
        <sando-skeleton-comment avatar-size="xs" lines="2"></sando-skeleton-comment>
        <sando-skeleton-comment avatar-size="xs" lines="1"></sando-skeleton-comment>
      </div>

      <sando-skeleton-comment lines="2"></sando-skeleton-comment>
    </div>
  `,
  parameters: {
    controls: { disable: true }
  }
};
