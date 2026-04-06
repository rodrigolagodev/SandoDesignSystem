import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton-list-item.js';

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

/**
 * A preset skeleton for list item layouts. Provides a common pattern for loading
 * states in list views with optional avatar, text lines, and action button placeholders.
 *
 * ## Structure
 * ```
 * +------------------------------------------------------------------+
 * | [Avatar]  ###################### (70%)                   [Action] |
 * |           ############## (50%, smaller)                           |
 * |           ########## (40%, smaller - if 3 lines)                  |
 * +------------------------------------------------------------------+
 * ```
 */
const meta: Meta = {
  title: 'Components/Skeleton/SkeletonListItem',
  component: 'sando-skeleton-list-item',
  tags: ['autodocs', 'beta'],
  render: (args) => html`
    <div style="max-width: 400px;">
      <sando-skeleton-list-item
        ?show-avatar="${args.showAvatar}"
        ?show-action="${args.showAction}"
        lines="${args.lines || 2}"
        avatar-size="${args.avatarSize || 'md'}"
      ></sando-skeleton-list-item>
    </div>
  `,
  argTypes: {
    showAvatar: {
      control: 'boolean',
      description: 'Show avatar/icon placeholder on the left',
      table: {
        category: 'Visibility',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showAction: {
      control: 'boolean',
      description: 'Show action button placeholder on the right',
      table: {
        category: 'Visibility',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    lines: {
      control: { type: 'number', min: 1, max: 3 },
      description: 'Number of text lines to display (1-3)',
      table: {
        category: 'Content',
        type: { summary: 'number' },
        defaultValue: { summary: '2' }
      }
    },
    avatarSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the avatar placeholder',
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' }
      }
    }
  },
  args: {
    showAvatar: true,
    showAction: false,
    lines: 2,
    avatarSize: 'md'
  }
};

export default meta;
type Story = StoryObj;

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default skeleton list item with avatar and 2 text lines.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 */
export const Playground: Story = {
  args: {
    showAction: true,
    lines: 3,
    avatarSize: 'lg'
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * Different line counts (1, 2, 3).
 */
export const DifferentLineCounts: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <div>
        <p style="margin-bottom: 8px; font-size: 14px; color: #666;">1 line</p>
        <sando-skeleton-list-item lines="1"></sando-skeleton-list-item>
      </div>
      <div>
        <p style="margin-bottom: 8px; font-size: 14px; color: #666;">2 lines (default)</p>
        <sando-skeleton-list-item lines="2"></sando-skeleton-list-item>
      </div>
      <div>
        <p style="margin-bottom: 8px; font-size: 14px; color: #666;">3 lines</p>
        <sando-skeleton-list-item lines="3"></sando-skeleton-list-item>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Inbox list example.
 */
export const InboxListExample: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="max-width: 500px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      ${[1, 2, 3, 4, 5].map(
        () => html`
          <div style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
            <sando-skeleton-list-item lines="2" avatar-size="md"></sando-skeleton-list-item>
          </div>
        `
      )}
    </div>
  `,
  parameters: { controls: { disable: true } }
};
