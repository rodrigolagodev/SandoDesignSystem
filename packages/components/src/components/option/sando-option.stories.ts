import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-option.js';

/**
 * # Option Component
 *
 * An individual option element for use within sando-select.
 * Similar to a native `<option>` element but with enhanced styling and accessibility.
 *
 * ## Features
 * - **Selected state**: Visual checkmark indicator
 * - **Disabled state**: Grayed out, non-interactive
 * - **Keyboard highlighted state**: For navigation
 * - **Prefix/Suffix slots**: For icons or badges
 *
 * ## Accessibility
 * - Role="option" with aria-selected
 * - Disabled options use aria-disabled
 * - Works with parent sando-select keyboard navigation
 *
 * ## Usage
 * Options are always used inside a `<sando-select>` component:
 * ```html
 * <sando-select label="Country">
 *   <sando-option value="us">United States</sando-option>
 *   <sando-option value="ca">Canada</sando-option>
 * </sando-select>
 * ```
 */
const meta: Meta = {
  title: 'Components/Select/Option',
  component: 'sando-option',
  tags: ['autodocs'],
  argTypes: {
    // 1. Theming (ALWAYS first)
    flavor: {
      control: 'select',
      options: ['original', 'strawberry', 'tonkatsu', 'kiwi', 'egg-salad'],
      description: 'Design system flavor/theme',
      table: {
        category: 'Theming',
        type: { summary: 'string' },
        defaultValue: { summary: 'original' }
      }
    },
    // 2. Content
    value: {
      control: 'text',
      description: 'The value of this option (required)',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    // 3. State
    selected: {
      control: 'boolean',
      description: 'Whether the option is selected',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the option is disabled',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  },
  args: {
    value: 'option',
    selected: false,
    disabled: false,
    flavor: 'original'
  },
  // Wrap in a listbox for proper rendering context
  decorators: [
    (Story) => html`
      <div
        role="listbox"
        style="max-width: 300px; border: 1px solid var(--sando-color-border-default, #e2e8f0); border-radius: 8px; overflow: hidden; background: var(--sando-color-background-base, #fff);"
      >
        ${Story()}
      </div>
    `
  ]
};

export default meta;
type Story = StoryObj;

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default option appearance
 */
export const Default: Story = {
  render: () => html`
    <sando-option value="apple">Apple</sando-option>
    <sando-option value="banana">Banana</sando-option>
    <sando-option value="cherry">Cherry</sando-option>
  `
};

/**
 * Interactive playground - use controls to customize
 */
export const Playground: Story = {
  render: (args) => html`
    <sando-option
      value="${args.value}"
      ?selected="${args.selected}"
      ?disabled="${args.disabled}"
      flavor="${args.flavor || 'original'}"
    >
      Sample Option
    </sando-option>
  `
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * Selected state with checkmark indicator
 */
export const Selected: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-option value="apple">Apple</sando-option>
    <sando-option value="banana" selected>Banana (Selected)</sando-option>
    <sando-option value="cherry">Cherry</sando-option>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Selected options show a checkmark indicator.'
      }
    }
  }
};

/**
 * Disabled state - non-interactive
 */
export const Disabled: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-option value="apple">Apple</sando-option>
    <sando-option value="banana" disabled>Banana (Unavailable)</sando-option>
    <sando-option value="cherry">Cherry</sando-option>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Disabled options cannot be selected and are visually grayed out.'
      }
    }
  }
};

/**
 * Option with prefix icon
 */
export const WithPrefix: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-option value="home">
      <span slot="prefix">🏠</span>
      Home
    </sando-option>
    <sando-option value="settings">
      <span slot="prefix">⚙️</span>
      Settings
    </sando-option>
    <sando-option value="profile">
      <span slot="prefix">👤</span>
      Profile
    </sando-option>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Use the `prefix` slot to add icons or other content before the label.'
      }
    }
  }
};

/**
 * Option with suffix badge or content
 */
export const WithSuffix: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-option value="free">
      Free Plan
      <span slot="suffix" style="font-size: 12px; color: var(--sando-color-text-muted, #64748b);"
        >$0/mo</span
      >
    </sando-option>
    <sando-option value="pro" selected>
      Pro Plan
      <span slot="suffix" style="font-size: 12px; color: var(--sando-color-text-muted, #64748b);"
        >$10/mo</span
      >
    </sando-option>
    <sando-option value="enterprise">
      Enterprise
      <span slot="suffix" style="font-size: 12px; color: var(--sando-color-text-muted, #64748b);"
        >Contact us</span
      >
    </sando-option>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Use the `suffix` slot to add badges, prices, or other trailing content.'
      }
    }
  }
};

/**
 * Option with both prefix and suffix
 */
export const WithPrefixAndSuffix: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-option value="starred" selected>
      <span slot="prefix">⭐</span>
      Featured Item
      <span
        slot="suffix"
        style="font-size: 11px; background: var(--sando-color-brand-100, #ffedd5); color: var(--sando-color-brand-700, #c2410c); padding: 2px 6px; border-radius: 4px;"
        >NEW</span
      >
    </sando-option>
    <sando-option value="popular">
      <span slot="prefix">🔥</span>
      Popular Choice
      <span
        slot="suffix"
        style="font-size: 11px; background: var(--sando-color-neutral-100, #f1f5f9); color: var(--sando-color-neutral-700, #334155); padding: 2px 6px; border-radius: 4px;"
        >HOT</span
      >
    </sando-option>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Prefix and suffix slots can be used together for rich option content.'
      }
    }
  }
};

/**
 * All states comparison
 */
export const AllStates: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-option value="default">Default State</sando-option>
    <sando-option value="selected" selected>Selected State</sando-option>
    <sando-option value="disabled" disabled>Disabled State</sando-option>
    <sando-option value="selectedDisabled" selected disabled>Selected + Disabled</sando-option>
  `,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Overview of all option states: default, selected, disabled, and combined.'
      }
    }
  }
};

/**
 * Long text content
 */
export const LongContent: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-option value="long1">
      This is a very long option label that might need to wrap or truncate
    </sando-option>
    <sando-option value="long2" selected>
      Another long option with selected state to show how it handles overflow
    </sando-option>
    <sando-option value="short">Short</sando-option>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Options handle long text content gracefully.'
      }
    }
  }
};

/**
 * Complete showcase of all option features
 */
export const AllExamples: Story = {
  tags: DOCS_ONLY,
  decorators: [], // Remove the default decorator for this story
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Basic States -->
      <section>
        <h3
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          States
        </h3>
        <div
          role="listbox"
          style="max-width: 300px; border: 1px solid var(--sando-color-border-default); border-radius: 8px; overflow: hidden;"
        >
          <sando-option value="default">Default</sando-option>
          <sando-option value="selected" selected>Selected</sando-option>
          <sando-option value="disabled" disabled>Disabled</sando-option>
        </div>
      </section>

      <!-- With Icons -->
      <section>
        <h3
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          With Icons
        </h3>
        <div
          role="listbox"
          style="max-width: 300px; border: 1px solid var(--sando-color-border-default); border-radius: 8px; overflow: hidden;"
        >
          <sando-option value="edit">
            <span slot="prefix">✏️</span>
            Edit
          </sando-option>
          <sando-option value="copy" selected>
            <span slot="prefix">📋</span>
            Copy
          </sando-option>
          <sando-option value="delete">
            <span slot="prefix">🗑️</span>
            Delete
          </sando-option>
        </div>
      </section>

      <!-- With Suffix -->
      <section>
        <h3
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          With Suffix
        </h3>
        <div
          role="listbox"
          style="max-width: 300px; border: 1px solid var(--sando-color-border-default); border-radius: 8px; overflow: hidden;"
        >
          <sando-option value="free">
            Free
            <span slot="suffix" style="font-size: 12px; color: var(--sando-color-text-muted);"
              >$0</span
            >
          </sando-option>
          <sando-option value="pro" selected>
            Pro
            <span slot="suffix" style="font-size: 12px; color: var(--sando-color-text-muted);"
              >$10</span
            >
          </sando-option>
          <sando-option value="team" disabled>
            Team
            <span slot="suffix" style="font-size: 12px; color: var(--sando-color-text-muted);"
              >$50</span
            >
          </sando-option>
        </div>
      </section>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
