/**
 * Storybook stories for sando-skeleton component
 */

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton.js';
import type { SkeletonShape, SkeletonEffect } from './sando-skeleton.types.js';

interface SkeletonArgs {
  shape: SkeletonShape;
  effect: SkeletonEffect;
  width: string;
  height: string;
}

const meta: Meta<SkeletonArgs> = {
  title: 'Components/Skeleton',
  component: 'sando-skeleton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A loading placeholder component that indicates content is being loaded.
Used for system-initiated content loading to reduce perceived wait time.

## Usage Guidelines
- Use for content loading (page load, data fetching)
- Match skeleton dimensions to actual content layout
- Respect prefers-reduced-motion automatically
- Skeleton is purely decorative (aria-hidden="true")

## When to Use Skeleton vs Spinner
- **Skeleton**: System-initiated content loading (known layout)
- **Spinner**: User-initiated actions (button clicks, form submits)
        `
      }
    }
  },
  argTypes: {
    shape: {
      control: { type: 'select' },
      options: ['text', 'circular', 'rectangular', 'rounded'],
      description: 'Shape variant of the skeleton',
      table: {
        defaultValue: { summary: 'text' }
      }
    },
    effect: {
      control: { type: 'select' },
      options: ['shimmer', 'pulse', 'none'],
      description: 'Animation effect applied to the skeleton',
      table: {
        defaultValue: { summary: 'shimmer' }
      }
    },
    width: {
      control: { type: 'text' },
      description: 'CSS width value',
      table: {
        defaultValue: { summary: '100%' }
      }
    },
    height: {
      control: { type: 'text' },
      description: 'CSS height value',
      table: {
        defaultValue: { summary: '1em' }
      }
    }
  },
  args: {
    shape: 'text',
    effect: 'shimmer',
    width: '100%',
    height: '1em'
  }
};

export default meta;
type Story = StoryObj<SkeletonArgs>;

// ============================================
// DEFAULT STORY
// ============================================

export const Default: Story = {
  render: (args) => html`
    <sando-skeleton
      shape=${args.shape}
      effect=${args.effect}
      width=${args.width}
      height=${args.height}
    ></sando-skeleton>
  `
};

// ============================================
// SHAPE VARIANTS
// ============================================

export const AllShapes: Story = {
  name: 'All Shapes',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <div>
        <p style="margin-bottom: 8px; font-weight: 500;">Text (default)</p>
        <sando-skeleton shape="text" width="80%" height="1em"></sando-skeleton>
        <div style="height: 8px;"></div>
        <sando-skeleton shape="text" width="60%" height="1em"></sando-skeleton>
      </div>

      <div>
        <p style="margin-bottom: 8px; font-weight: 500;">Circular</p>
        <div style="display: flex; gap: 12px; align-items: center;">
          <sando-skeleton shape="circular" width="32px" height="32px"></sando-skeleton>
          <sando-skeleton shape="circular" width="48px" height="48px"></sando-skeleton>
          <sando-skeleton shape="circular" width="64px" height="64px"></sando-skeleton>
        </div>
      </div>

      <div>
        <p style="margin-bottom: 8px; font-weight: 500;">Rectangular</p>
        <sando-skeleton shape="rectangular" width="100%" height="120px"></sando-skeleton>
      </div>

      <div>
        <p style="margin-bottom: 8px; font-weight: 500;">Rounded</p>
        <sando-skeleton shape="rounded" width="100%" height="80px"></sando-skeleton>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'The four shape variants: text, circular, rectangular, and rounded.'
      }
    }
  }
};

export const TextShape: Story = {
  name: 'Text Shape',
  render: () => html`
    <div style="max-width: 400px;">
      <sando-skeleton shape="text" width="90%" height="1em"></sando-skeleton>
      <div style="height: 8px;"></div>
      <sando-skeleton shape="text" width="100%" height="1em"></sando-skeleton>
      <div style="height: 8px;"></div>
      <sando-skeleton shape="text" width="75%" height="1em"></sando-skeleton>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Text shape with subtle border-radius for text line placeholders.'
      }
    }
  }
};

export const CircularShape: Story = {
  name: 'Circular Shape',
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <sando-skeleton shape="circular" width="24px" height="24px"></sando-skeleton>
      <sando-skeleton shape="circular" width="32px" height="32px"></sando-skeleton>
      <sando-skeleton shape="circular" width="40px" height="40px"></sando-skeleton>
      <sando-skeleton shape="circular" width="48px" height="48px"></sando-skeleton>
      <sando-skeleton shape="circular" width="64px" height="64px"></sando-skeleton>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Circular shape with 50% border-radius for avatar placeholders.'
      }
    }
  }
};

export const RectangularShape: Story = {
  name: 'Rectangular Shape',
  render: () => html`
    <div style="display: flex; gap: 16px;">
      <sando-skeleton shape="rectangular" width="150px" height="100px"></sando-skeleton>
      <sando-skeleton shape="rectangular" width="200px" height="150px"></sando-skeleton>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Rectangular shape with no border-radius for image placeholders.'
      }
    }
  }
};

export const RoundedShape: Story = {
  name: 'Rounded Shape',
  render: () => html`
    <sando-skeleton shape="rounded" width="300px" height="80px"></sando-skeleton>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Rounded shape with medium border-radius for card-like placeholders.'
      }
    }
  }
};

// ============================================
// EFFECT VARIANTS
// ============================================

export const AllEffects: Story = {
  name: 'All Effects',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <div>
        <p style="margin-bottom: 8px; font-weight: 500;">Shimmer (default)</p>
        <sando-skeleton effect="shimmer" width="100%" height="24px"></sando-skeleton>
      </div>

      <div>
        <p style="margin-bottom: 8px; font-weight: 500;">Pulse</p>
        <sando-skeleton effect="pulse" width="100%" height="24px"></sando-skeleton>
      </div>

      <div>
        <p style="margin-bottom: 8px; font-weight: 500;">None (static)</p>
        <sando-skeleton effect="none" width="100%" height="24px"></sando-skeleton>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'The three effect variants: shimmer, pulse, and none.'
      }
    }
  }
};

export const ShimmerEffect: Story = {
  name: 'Shimmer Effect',
  render: () => html`
    <sando-skeleton effect="shimmer" width="300px" height="40px"></sando-skeleton>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Shimmer effect with gradient moving from left to right.'
      }
    }
  }
};

export const PulseEffect: Story = {
  name: 'Pulse Effect',
  render: () => html`
    <sando-skeleton effect="pulse" width="300px" height="40px"></sando-skeleton>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Pulse effect with opacity oscillating between 0.4 and 1.'
      }
    }
  }
};

export const NoEffect: Story = {
  name: 'No Effect',
  render: () => html` <sando-skeleton effect="none" width="300px" height="40px"></sando-skeleton> `,
  parameters: {
    docs: {
      description: {
        story: 'Static skeleton with no animation (also used for reduced motion).'
      }
    }
  }
};

// ============================================
// CUSTOM DIMENSIONS
// ============================================

export const CustomDimensions: Story = {
  name: 'Custom Dimensions',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <sando-skeleton width="100px" height="16px"></sando-skeleton>
      <sando-skeleton width="200px" height="20px"></sando-skeleton>
      <sando-skeleton width="50%" height="1.5em"></sando-skeleton>
      <sando-skeleton width="75%" height="2rem"></sando-skeleton>
      <sando-skeleton width="100%" height="100px"></sando-skeleton>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Skeleton with various width and height values (px, %, em, rem).'
      }
    }
  }
};

// ============================================
// REAL-WORLD EXAMPLES
// ============================================

export const CardSkeleton: Story = {
  name: 'Card Skeleton',
  render: () => html`
    <div style="width: 300px; padding: 16px; border: 1px solid #e5e5e5; border-radius: 8px;">
      <!-- Image placeholder -->
      <sando-skeleton shape="rectangular" width="100%" height="150px"></sando-skeleton>

      <div style="padding-top: 16px;">
        <!-- Title -->
        <sando-skeleton shape="text" width="80%" height="1.25em"></sando-skeleton>

        <div style="height: 12px;"></div>

        <!-- Description lines -->
        <sando-skeleton shape="text" width="100%" height="1em"></sando-skeleton>
        <div style="height: 6px;"></div>
        <sando-skeleton shape="text" width="90%" height="1em"></sando-skeleton>
        <div style="height: 6px;"></div>
        <sando-skeleton shape="text" width="70%" height="1em"></sando-skeleton>

        <div style="height: 16px;"></div>

        <!-- Button placeholder -->
        <sando-skeleton shape="rounded" width="100px" height="36px"></sando-skeleton>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Example of a card loading state using multiple skeleton elements.'
      }
    }
  }
};

export const ListItemSkeleton: Story = {
  name: 'List Item Skeleton',
  render: () => html`
    <div style="width: 400px; display: flex; flex-direction: column; gap: 16px;">
      ${[1, 2, 3].map(
        () => html`
          <div style="display: flex; gap: 12px; align-items: center;">
            <!-- Avatar -->
            <sando-skeleton shape="circular" width="40px" height="40px"></sando-skeleton>

            <div style="flex: 1;">
              <!-- Name -->
              <sando-skeleton shape="text" width="60%" height="1em"></sando-skeleton>
              <div style="height: 6px;"></div>
              <!-- Description -->
              <sando-skeleton shape="text" width="80%" height="0.875em"></sando-skeleton>
            </div>
          </div>
        `
      )}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Example of list items loading state with avatar and text.'
      }
    }
  }
};

export const ArticleSkeleton: Story = {
  name: 'Article Skeleton',
  render: () => html`
    <div style="max-width: 600px;">
      <!-- Headline -->
      <sando-skeleton shape="text" width="70%" height="2em"></sando-skeleton>

      <div style="height: 16px;"></div>

      <!-- Author info -->
      <div style="display: flex; gap: 12px; align-items: center;">
        <sando-skeleton shape="circular" width="32px" height="32px"></sando-skeleton>
        <sando-skeleton shape="text" width="120px" height="1em"></sando-skeleton>
        <sando-skeleton shape="text" width="80px" height="1em"></sando-skeleton>
      </div>

      <div style="height: 24px;"></div>

      <!-- Featured image -->
      <sando-skeleton shape="rounded" width="100%" height="300px"></sando-skeleton>

      <div style="height: 24px;"></div>

      <!-- Paragraph -->
      <sando-skeleton shape="text" width="100%" height="1em"></sando-skeleton>
      <div style="height: 8px;"></div>
      <sando-skeleton shape="text" width="100%" height="1em"></sando-skeleton>
      <div style="height: 8px;"></div>
      <sando-skeleton shape="text" width="100%" height="1em"></sando-skeleton>
      <div style="height: 8px;"></div>
      <sando-skeleton shape="text" width="85%" height="1em"></sando-skeleton>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Example of an article page loading state.'
      }
    }
  }
};

// ============================================
// PLAYGROUND
// ============================================

export const Playground: Story = {
  name: 'Playground',
  render: (args) => html`
    <sando-skeleton
      shape=${args.shape}
      effect=${args.effect}
      width=${args.width}
      height=${args.height}
    ></sando-skeleton>
  `,
  args: {
    shape: 'text',
    effect: 'shimmer',
    width: '200px',
    height: '24px'
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test all skeleton props.'
      }
    }
  }
};
