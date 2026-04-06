import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton-avatar.js';

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

/**
 * A circular skeleton placeholder for avatar loading states.
 * Uses predefined size tokens for consistent avatar dimensions.
 *
 * ## Size Reference
 * | Size | Dimensions | Use Case |
 * |------|------------|----------|
 * | xs | 24px | Compact lists |
 * | sm | 32px | Comments |
 * | md | 40px | User lists (default) |
 * | lg | 48px | Profile headers |
 * | xl | 64px | Profile pages |
 */
const meta: Meta = {
  title: 'Components/Skeleton/SkeletonAvatar',
  component: 'sando-skeleton-avatar',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-skeleton-avatar
      flavor="${args.flavor || 'original'}"
      size="${args.size || 'md'}"
      effect="${args.effect || 'shimmer'}"
    ></sando-skeleton-avatar>
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
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar skeleton',
      table: {
        category: 'Appearance',
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: 'md' }
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
    effect: 'shimmer'
  }
};

export default meta;
type Story = StoryObj;

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default skeleton avatar with medium size and shimmer effect.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 */
export const Playground: Story = {
  args: {
    size: 'lg'
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * All available size variants displayed side by side.
 */
export const AllSizes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="text-align: center;">
        <sando-skeleton-avatar size="xs"></sando-skeleton-avatar>
        <div style="margin-top: 8px; font-size: 12px; color: #666;">xs (24px)</div>
      </div>
      <div style="text-align: center;">
        <sando-skeleton-avatar size="sm"></sando-skeleton-avatar>
        <div style="margin-top: 8px; font-size: 12px; color: #666;">sm (32px)</div>
      </div>
      <div style="text-align: center;">
        <sando-skeleton-avatar size="md"></sando-skeleton-avatar>
        <div style="margin-top: 8px; font-size: 12px; color: #666;">md (40px)</div>
      </div>
      <div style="text-align: center;">
        <sando-skeleton-avatar size="lg"></sando-skeleton-avatar>
        <div style="margin-top: 8px; font-size: 12px; color: #666;">lg (48px)</div>
      </div>
      <div style="text-align: center;">
        <sando-skeleton-avatar size="xl"></sando-skeleton-avatar>
        <div style="margin-top: 8px; font-size: 12px; color: #666;">xl (64px)</div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * User list example with avatars and text.
 */
export const UserListExample: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;">
      ${[1, 2, 3].map(
        () => html`
          <div style="display: flex; align-items: center; gap: 12px;">
            <sando-skeleton-avatar size="md"></sando-skeleton-avatar>
            <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
              <sando-skeleton width="120px" height="14px"></sando-skeleton>
              <sando-skeleton width="80px" height="12px"></sando-skeleton>
            </div>
          </div>
        `
      )}
    </div>
  `,
  parameters: { controls: { disable: true } }
};
