/**
 * Storybook stories for sando-skeleton-profile component
 */

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton-profile.js';

const DOCS_ONLY = ['!dev', '!autodocs'];

const meta: Meta = {
  title: 'Components/Skeleton/SkeletonProfile',
  component: 'sando-skeleton-profile',
  tags: ['autodocs', 'beta'],
  render: (args) => html`
    <div style="max-width: 300px;">
      <sando-skeleton-profile
        avatar-size="${args.avatarSize || 'xl'}"
        ?show-bio="${args.showBio}"
        bio-lines="${args.bioLines || 2}"
      ></sando-skeleton-profile>
    </div>
  `,
  argTypes: {
    avatarSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar skeleton',
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: 'xl' }
      }
    },
    showBio: {
      control: 'boolean',
      description: 'Show bio lines below name',
      table: {
        category: 'Visibility',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    bioLines: {
      control: { type: 'number', min: 1, max: 5 },
      description: 'Number of bio lines to display',
      table: {
        category: 'Content',
        type: { summary: 'number' },
        defaultValue: { summary: '2' }
      }
    }
  },
  args: {
    avatarSize: 'xl',
    showBio: true,
    bioLines: 2
  },
  parameters: {
    docs: {
      description: {
        component: `
A preset skeleton for user profile card layouts with centered avatar, name, 
and optional bio lines. Perfect for profile cards, user previews, and account sections.

## Structure

\`\`\`
+--------------------------------+
|           [Avatar]             |  <- Centered avatar (xl default)
|                                |
|        ############ (60%)      |  <- Name
|                                |
|    #################### (90%)  |  <- Bio line 1
|    ############## (70%)        |  <- Bio line 2
+--------------------------------+
\`\`\`

## Usage

\`\`\`html
<!-- Basic profile (avatar + name + bio) -->
<sando-skeleton-profile></sando-skeleton-profile>

<!-- Without bio -->
<sando-skeleton-profile show-bio="false"></sando-skeleton-profile>

<!-- Custom avatar size -->
<sando-skeleton-profile avatar-size="lg"></sando-skeleton-profile>

<!-- Custom bio lines -->
<sando-skeleton-profile bio-lines="3"></sando-skeleton-profile>
\`\`\`
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

/**
 * Default profile skeleton with large avatar and 2 bio lines
 */
export const Default: Story = {};

/**
 * Interactive playground to experiment with all props
 */
export const Playground: Story = {
  args: {
    avatarSize: 'lg',
    showBio: true,
    bioLines: 3
  }
};

/**
 * Different avatar sizes comparison
 */
export const AvatarSizes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
      <div>
        <p
          style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #374151; text-align: center;"
        >
          Small
        </p>
        <sando-skeleton-profile avatar-size="sm"></sando-skeleton-profile>
      </div>
      <div>
        <p
          style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #374151; text-align: center;"
        >
          Medium
        </p>
        <sando-skeleton-profile avatar-size="md"></sando-skeleton-profile>
      </div>
      <div>
        <p
          style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #374151; text-align: center;"
        >
          Large
        </p>
        <sando-skeleton-profile avatar-size="lg"></sando-skeleton-profile>
      </div>
      <div>
        <p
          style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #374151; text-align: center;"
        >
          XL (default)
        </p>
        <sando-skeleton-profile avatar-size="xl"></sando-skeleton-profile>
      </div>
    </div>
  `,
  parameters: {
    controls: { disable: true }
  }
};

/**
 * Team members grid layout example
 */
export const TeamGrid: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
      ${[1, 2, 3, 4].map(
        () => html`
          <div
            style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; background: white;"
          >
            <sando-skeleton-profile avatar-size="lg" bio-lines="1"></sando-skeleton-profile>
          </div>
        `
      )}
    </div>
  `,
  parameters: {
    controls: { disable: true }
  }
};
