import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton.js';
import '../skeleton-paragraph/sando-skeleton-paragraph.js';

/**
 * Common loading layouts composed from the two skeleton primitives:
 * `<sando-skeleton>` and `<sando-skeleton-paragraph>`.
 *
 * Each story is the canonical replacement for one of the preset skeleton
 * components deprecated in #83 (removal tracked in #126). Copy the markup
 * from a story's source into your app and tune dimensions to your layout.
 */
const meta: Meta = {
  title: 'Components/Skeleton/Patterns',
  tags: ['autodocs'],
  argTypes: {
    flavor: {
      control: 'select',
      options: ['original', 'strawberry', 'tonkatsu', 'kiwi', 'egg-salad'],
      description: 'Active flavor — propagates to nested primitives.'
    },
    effect: {
      control: 'select',
      options: ['shimmer', 'pulse', 'none'],
      description: 'Animation effect applied to every primitive in the pattern.'
    }
  },
  args: {
    flavor: 'original',
    effect: 'shimmer'
  }
};

export default meta;
type Story = StoryObj;

const stack = (children: unknown) => html`
  <div style="display: flex; flex-direction: column; gap: var(--sando-space-12, 0.75rem); max-width: 480px;">
    ${children}
  </div>
`;

/**
 * Single-primitive patterns: button, image, stack. These don't need a custom
 * preset — just use the right shape and dimensions on `<sando-skeleton>` or
 * lean on `<sando-skeleton-paragraph>` directly.
 */
export const SimplePrimitives: Story = {
  render: ({ flavor, effect }) => html`
    <div style="display: grid; gap: var(--sando-space-24, 1.5rem); max-width: 480px;">
      <div>
        <strong>Button</strong>
        <sando-skeleton flavor=${flavor} effect=${effect} shape="rounded" width="120px" height="36px"></sando-skeleton>
      </div>
      <div>
        <strong>Image</strong>
        <sando-skeleton flavor=${flavor} effect=${effect} shape="rectangular" width="100%" height="200px"></sando-skeleton>
      </div>
      <div>
        <strong>Stack (paragraph block)</strong>
        <sando-skeleton-paragraph flavor=${flavor} effect=${effect} lines="6"></sando-skeleton-paragraph>
      </div>
    </div>
  `
};

/** Article layout: hero image + body paragraphs. Replaces `sando-skeleton-article`. */
export const Article: Story = {
  render: ({ flavor, effect }) =>
    stack(html`
      <sando-skeleton flavor=${flavor} effect=${effect} shape="rectangular" width="100%" height="200px"></sando-skeleton>
      <sando-skeleton-paragraph flavor=${flavor} effect=${effect} lines="3"></sando-skeleton-paragraph>
    `)
};

/** Avatar + name/subtitle. Replaces `sando-skeleton-avatar`. */
export const AvatarBlock: Story = {
  render: ({ flavor, effect }) => html`
    <div style="display: flex; gap: var(--sando-space-12, 0.75rem); align-items: center; max-width: 480px;">
      <sando-skeleton flavor=${flavor} effect=${effect} shape="circular" width="40px" height="40px"></sando-skeleton>
      <div style="flex: 1;">
        <sando-skeleton-paragraph flavor=${flavor} effect=${effect} lines="2"></sando-skeleton-paragraph>
      </div>
    </div>
  `
};

/** Card with media + body. Replaces `sando-skeleton-card`. */
export const Card: Story = {
  render: ({ flavor, effect }) =>
    stack(html`
      <sando-skeleton flavor=${flavor} effect=${effect} shape="rectangular" width="100%" height="200px"></sando-skeleton>
      <sando-skeleton-paragraph flavor=${flavor} effect=${effect} lines="2"></sando-skeleton-paragraph>
    `)
};

/** Comment thread item: avatar + multi-line body. Replaces `sando-skeleton-comment`. */
export const Comment: Story = {
  render: ({ flavor, effect }) => html`
    <div style="display: flex; gap: var(--sando-space-12, 0.75rem); max-width: 480px;">
      <sando-skeleton flavor=${flavor} effect=${effect} shape="circular" width="32px" height="32px"></sando-skeleton>
      <div style="flex: 1;">
        <sando-skeleton-paragraph flavor=${flavor} effect=${effect} lines="3"></sando-skeleton-paragraph>
      </div>
    </div>
  `
};

/** Composer (textarea + actions). Replaces `sando-skeleton-composer`. */
export const Composer: Story = {
  render: ({ flavor, effect }) =>
    stack(html`
      <sando-skeleton flavor=${flavor} effect=${effect} shape="rounded" width="100%" height="80px"></sando-skeleton>
      <div style="display: flex; gap: var(--sando-space-8, 0.5rem);">
        <sando-skeleton flavor=${flavor} effect=${effect} shape="rounded" width="80px" height="36px"></sando-skeleton>
        <sando-skeleton flavor=${flavor} effect=${effect} shape="rounded" width="80px" height="36px"></sando-skeleton>
      </div>
    `)
};

/** List item: three text rows. Replaces `sando-skeleton-list-item`. */
export const ListItem: Story = {
  render: ({ flavor, effect }) =>
    stack(html`
      <sando-skeleton flavor=${flavor} effect=${effect} shape="text" width="100%"></sando-skeleton>
      <sando-skeleton flavor=${flavor} effect=${effect} shape="text" width="100%"></sando-skeleton>
      <sando-skeleton flavor=${flavor} effect=${effect} shape="text" width="100%"></sando-skeleton>
    `)
};

/** Media card: side image + body. Replaces `sando-skeleton-media-card`. */
export const MediaCard: Story = {
  render: ({ flavor, effect }) => html`
    <div style="display: flex; gap: var(--sando-space-12, 0.75rem); max-width: 480px;">
      <sando-skeleton flavor=${flavor} effect=${effect} shape="rectangular" width="40%" height="150px"></sando-skeleton>
      <div style="flex: 1;">
        <sando-skeleton-paragraph flavor=${flavor} effect=${effect} lines="2"></sando-skeleton-paragraph>
      </div>
    </div>
  `
};

/** Profile header: banner + bio. Replaces `sando-skeleton-profile`. */
export const Profile: Story = {
  render: ({ flavor, effect }) =>
    stack(html`
      <sando-skeleton flavor=${flavor} effect=${effect} shape="rectangular" width="100%" height="120px"></sando-skeleton>
      <sando-skeleton-paragraph flavor=${flavor} effect=${effect} lines="4"></sando-skeleton-paragraph>
    `)
};

/** Toolbar row: three side-by-side blocks. Replaces `sando-skeleton-row`. */
export const Row: Story = {
  render: ({ flavor, effect }) => html`
    <div style="display: flex; gap: var(--sando-space-12, 0.75rem); max-width: 480px;">
      <sando-skeleton flavor=${flavor} effect=${effect} shape="rectangular" height="48px" style="flex: 1;"></sando-skeleton>
      <sando-skeleton flavor=${flavor} effect=${effect} shape="rectangular" height="48px" style="flex: 1;"></sando-skeleton>
      <sando-skeleton flavor=${flavor} effect=${effect} shape="rectangular" height="48px" style="flex: 1;"></sando-skeleton>
    </div>
  `
};

/** Table row: four text cells in a grid. Replaces `sando-skeleton-table-row`. */
export const TableRow: Story = {
  render: ({ flavor, effect }) => html`
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--sando-space-12, 0.75rem); max-width: 480px;">
      <sando-skeleton flavor=${flavor} effect=${effect} shape="text" width="20%"></sando-skeleton>
      <sando-skeleton flavor=${flavor} effect=${effect} shape="text" width="20%"></sando-skeleton>
      <sando-skeleton flavor=${flavor} effect=${effect} shape="text" width="20%"></sando-skeleton>
      <sando-skeleton flavor=${flavor} effect=${effect} shape="text" width="20%"></sando-skeleton>
    </div>
  `
};
