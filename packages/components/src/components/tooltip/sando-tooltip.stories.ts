import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-tooltip.js';
import '../button/sando-button.js';
import '../icon/sando-icon.js';

/**
 * # Tooltip Component
 *
 * A simple, non-interactive tooltip that shows descriptive text on hover and focus.
 * Implements **WCAG 1.4.13 (Content on Hover or Focus)** — the tooltip stays visible
 * when the user moves the pointer from the trigger into the tooltip bubble.
 *
 * ## Features
 * - **8 Placements**: top, top-start, top-end, right, bottom, bottom-start, bottom-end, left (with auto-flip when near viewport edges)
 * - **Hover + Focus**: Shows on mouseenter and keyboard focus
 * - **Delay support**: Configurable show delay with skip-delay for quick interactions
 * - **WCAG 1.4.13**: Tooltip remains reachable while hovering over the bubble
 * - **Popover API**: Uses native `popover="manual"` to escape overflow containers
 * - **Accessible**: Injects `aria-describedby` on the slotted trigger automatically
 *
 * ## Usage
 *
 * Wrap any interactive element with `<sando-tooltip>` and provide the `content` attribute:
 *
 * ```html
 * <sando-tooltip content="More information">
 *   <sando-button>Hover me</sando-button>
 * </sando-tooltip>
 * ```
 *
 * ## Accessibility
 * - The trigger automatically receives `aria-describedby` pointing to the tooltip bubble
 * - Screen readers announce tooltip content when the trigger is focused
 * - `Escape` closes an open tooltip
 * - Tooltip bubble has `role="tooltip"` and `aria-hidden` toggled automatically
 */
const meta: Meta = {
  title: 'Components/Tooltip',
  component: 'sando-tooltip',
  tags: ['autodocs', 'stable'],

  render: (args) => html`
    <div style="display: flex; align-items: center; justify-content: center; padding: 80px;">
      <sando-tooltip
        content="${args.content}"
        placement="${args.placement}"
        ?open="${args.open}"
        distance="${args.distance}"
        delay="${args.delay}"
        skip-delay-duration="${args.skipDelayDuration}"
        flavor="${args.flavor || 'original'}"
      >
        <sando-button flavor="${args.flavor || 'original'}">Hover me</sando-button>
      </sando-tooltip>
    </div>
  `,

  argTypes: {
    // 1. Flavor (always first per convention)
    flavor: {
      control: 'select',
      options: ['original', 'strawberry', 'tonkatsu', 'kiwi', 'egg-salad'],
      description: 'Active flavor — changes the color palette and visual identity of the component',
      table: {
        category: 'Flavor',
        type: { summary: 'string' },
        defaultValue: { summary: 'original' }
      }
    },

    // 2. Content
    content: {
      control: 'text',
      description: 'Text content displayed inside the tooltip bubble',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },

    // 3. Appearance
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left'
      ],
      description:
        'Preferred placement of the tooltip relative to the trigger. Auto-flips when near viewport edges.',
      table: {
        category: 'Appearance',
        type: {
          summary:
            "'top' | 'top-start' | 'top-end' | 'right' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left'"
        },
        defaultValue: { summary: 'top' }
      }
    },

    // 4. State
    open: {
      control: 'boolean',
      description:
        'Forces the tooltip to be visible without user interaction. Useful for design review.',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },

    // 5. Behavior
    distance: {
      control: { type: 'number', min: 0, max: 32, step: 1 },
      description: 'Gap in pixels between the trigger element and the tooltip bubble',
      table: {
        category: 'Behavior',
        type: { summary: 'number' },
        defaultValue: { summary: '8' }
      }
    },
    delay: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description: 'Delay in milliseconds before the tooltip appears on hover',
      table: {
        category: 'Behavior',
        type: { summary: 'number' },
        defaultValue: { summary: '500' }
      }
    },
    skipDelayDuration: {
      control: { type: 'number', min: 0, max: 1000, step: 50 },
      description:
        'If another tooltip opens within this many ms after one closes, skip the show delay. Maps to the `skip-delay-duration` attribute.',
      table: {
        category: 'Behavior',
        type: { summary: 'number' },
        defaultValue: { summary: '300' }
      }
    }
  },

  args: {
    content: 'This is a tooltip',
    placement: 'top',
    open: false,
    distance: 8,
    delay: 500,
    skipDelayDuration: 300,
    flavor: 'original'
  }
};

export default meta;
type Story = StoryObj;

// Stories hidden from sidebar — visible in docs only
const DOCS_ONLY = ['!dev', '!autodocs'];

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * The default tooltip with a button trigger and top placement.
 * Hover or focus the button to see the tooltip.
 */
export const Default: Story = {};

/**
 * Interactive playground — use the Controls panel to adjust all props in real time.
 */
export const Playground: Story = {
  args: {
    content: 'Customize me with the Controls panel!',
    placement: 'top'
  }
};

/**
 * All 8 placements shown side by side.
 * Hover or focus each button to see the tooltip. Use the `open` toggle in the
 * Controls panel to force all tooltips open simultaneously.
 */
export const Placements: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <div
      style="
        display: grid;
        grid-template-columns: repeat(4, auto);
        gap: 2rem;
        align-items: center;
        justify-content: center;
        padding: 100px 80px;
      "
    >
      <!-- Row 1: original 4 -->
      <sando-tooltip
        content="Top"
        placement="top"
        ?open="${args.open}"
        flavor="${args.flavor || 'original'}"
      >
        <sando-button flavor="${args.flavor || 'original'}">Top</sando-button>
      </sando-tooltip>

      <sando-tooltip
        content="Right"
        placement="right"
        ?open="${args.open}"
        flavor="${args.flavor || 'original'}"
      >
        <sando-button flavor="${args.flavor || 'original'}">Right</sando-button>
      </sando-tooltip>

      <sando-tooltip
        content="Bottom"
        placement="bottom"
        ?open="${args.open}"
        flavor="${args.flavor || 'original'}"
      >
        <sando-button flavor="${args.flavor || 'original'}">Bottom</sando-button>
      </sando-tooltip>

      <sando-tooltip
        content="Left"
        placement="left"
        ?open="${args.open}"
        flavor="${args.flavor || 'original'}"
      >
        <sando-button flavor="${args.flavor || 'original'}">Left</sando-button>
      </sando-tooltip>

      <!-- Row 2: corner placements -->
      <sando-tooltip
        content="Top start"
        placement="top-start"
        ?open="${args.open}"
        flavor="${args.flavor || 'original'}"
      >
        <sando-button flavor="${args.flavor || 'original'}">Top start</sando-button>
      </sando-tooltip>

      <sando-tooltip
        content="Top end"
        placement="top-end"
        ?open="${args.open}"
        flavor="${args.flavor || 'original'}"
      >
        <sando-button flavor="${args.flavor || 'original'}">Top end</sando-button>
      </sando-tooltip>

      <sando-tooltip
        content="Bottom start"
        placement="bottom-start"
        ?open="${args.open}"
        flavor="${args.flavor || 'original'}"
      >
        <sando-button flavor="${args.flavor || 'original'}">Bottom start</sando-button>
      </sando-tooltip>

      <sando-tooltip
        content="Bottom end"
        placement="bottom-end"
        ?open="${args.open}"
        flavor="${args.flavor || 'original'}"
      >
        <sando-button flavor="${args.flavor || 'original'}">Bottom end</sando-button>
      </sando-tooltip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story:
          "All 8 placements. Hover or focus each button to see the tooltip. Use the `open` toggle in Controls to force all visible simultaneously. Corner placements (top-start, top-end, bottom-start, bottom-end) anchor the bubble at the trigger's horizontal midpoint."
      }
    }
  }
};

/**
 * Common use case: tooltip on an icon-only button.
 * Icon-only buttons must have an accessible label — the tooltip provides the
 * visible label while `aria-label` covers screen readers.
 */
export const WithIconButton: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <div
      style="display: flex; align-items: center; justify-content: center; gap: 1rem; padding: 80px;"
    >
      <sando-tooltip content="Save document" placement="top" flavor="${args.flavor || 'original'}">
        <sando-button
          variant="ghost"
          icon-only
          aria-label="Save document"
          flavor="${args.flavor || 'original'}"
        >
          <sando-icon slot="icon-start" name="save" size="sm" inherit-color></sando-icon>
        </sando-button>
      </sando-tooltip>

      <sando-tooltip content="Edit record" placement="top" flavor="${args.flavor || 'original'}">
        <sando-button
          variant="ghost"
          icon-only
          aria-label="Edit record"
          flavor="${args.flavor || 'original'}"
        >
          <sando-icon slot="icon-start" name="pencil" size="sm" inherit-color></sando-icon>
        </sando-button>
      </sando-tooltip>

      <sando-tooltip content="Delete item" placement="top" flavor="${args.flavor || 'original'}">
        <sando-button
          variant="ghost"
          status="destructive"
          icon-only
          aria-label="Delete item"
          flavor="${args.flavor || 'original'}"
        >
          <sando-icon slot="icon-start" name="trash" size="sm" inherit-color></sando-icon>
        </sando-button>
      </sando-tooltip>
    </div>
  `,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Tooltips are especially important for icon-only buttons — they provide the visible label. Always also include an `aria-label` on the button for screen reader users who may never trigger the tooltip.'
      }
    }
  }
};

/**
 * Tooltip with longer content that wraps across multiple lines.
 * Demonstrates the `--sando-tooltip-maxWidth` behavior.
 */
export const LongContent: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <div style="display: flex; align-items: center; justify-content: center; padding: 100px 80px;">
      <sando-tooltip
        content="This is a longer tooltip message that wraps across multiple lines to demonstrate how the tooltip bubble handles extended text content gracefully."
        placement="${args.placement}"
        flavor="${args.flavor || 'original'}"
      >
        <sando-button flavor="${args.flavor || 'original'}">Long tooltip</sando-button>
      </sando-tooltip>
    </div>
  `,
  args: {
    placement: 'top'
  },
  parameters: {
    docs: {
      description: {
        story:
          'When tooltip content is long, the bubble wraps at `--sando-tooltip-maxWidth` (default: 240px). Hover the button to see wrapping in action.'
      }
    }
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX / docs)
// ============================================================================

/**
 * Demonstrates the delay and skip-delay-duration behavior.
 * Quick navigation between tooltips skips the delay window.
 */
export const WithDelay: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <div
      style="display: flex; align-items: center; justify-content: center; gap: 2rem; padding: 80px;"
    >
      <sando-tooltip
        content="300ms delay (default)"
        placement="top"
        delay="300"
        flavor="${args.flavor || 'original'}"
      >
        <sando-button flavor="${args.flavor || 'original'}">Default delay</sando-button>
      </sando-tooltip>

      <sando-tooltip
        content="0ms — instant"
        placement="top"
        delay="0"
        flavor="${args.flavor || 'original'}"
      >
        <sando-button flavor="${args.flavor || 'original'}">No delay</sando-button>
      </sando-tooltip>

      <sando-tooltip
        content="800ms delay"
        placement="top"
        delay="800"
        flavor="${args.flavor || 'original'}"
      >
        <sando-button flavor="${args.flavor || 'original'}">Slow delay</sando-button>
      </sando-tooltip>
    </div>
  `,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Use `delay` to control how long (in ms) the user must hover before the tooltip appears. Use `skip-delay-duration` to skip the delay when quickly moving between multiple tooltips.'
      }
    }
  }
};

/**
 * Custom distance between trigger and tooltip bubble.
 */
export const CustomDistance: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <div
      style="display: flex; align-items: center; justify-content: center; gap: 2rem; padding: 80px;"
    >
      <sando-tooltip
        content="4px distance"
        placement="top"
        distance="4"
        open
        flavor="${args.flavor || 'original'}"
      >
        <sando-button flavor="${args.flavor || 'original'}">Close (4px)</sando-button>
      </sando-tooltip>

      <sando-tooltip
        content="8px distance (default)"
        placement="top"
        distance="8"
        open
        flavor="${args.flavor || 'original'}"
      >
        <sando-button flavor="${args.flavor || 'original'}">Default (8px)</sando-button>
      </sando-tooltip>

      <sando-tooltip
        content="16px distance"
        placement="top"
        distance="16"
        open
        flavor="${args.flavor || 'original'}"
      >
        <sando-button flavor="${args.flavor || 'original'}">Far (16px)</sando-button>
      </sando-tooltip>
    </div>
  `,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Use `distance` to control the gap (in px) between the trigger and the tooltip bubble.'
      }
    }
  }
};
