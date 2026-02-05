import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-option-group.js';
import '../option/sando-option.js';

/**
 * # Option Group Component
 *
 * A container that groups related options with a label, similar to native `<optgroup>`.
 * Used within sando-select to organize options into labeled categories.
 *
 * ## Features
 * - **Group label**: Displayed above the options
 * - **Disabled state**: Disables all child options
 * - **Visual separator**: Automatic divider between groups
 *
 * ## Accessibility
 * - Role="group" with aria-label
 * - Disabled state propagates to child options
 *
 * ## Usage
 * Option groups are used inside a `<sando-select>` component:
 * ```html
 * <sando-select label="Food">
 *   <sando-option-group label="Fruits">
 *     <sando-option value="apple">Apple</sando-option>
 *     <sando-option value="banana">Banana</sando-option>
 *   </sando-option-group>
 *   <sando-option-group label="Vegetables">
 *     <sando-option value="carrot">Carrot</sando-option>
 *   </sando-option-group>
 * </sando-select>
 * ```
 */
const meta: Meta = {
  title: 'Components/Select/OptionGroup',
  component: 'sando-option-group',
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
    label: {
      control: 'text',
      description: 'The group label text displayed above the options',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    // 3. State
    disabled: {
      control: 'boolean',
      description: 'Whether the group and all its child options are disabled',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  },
  args: {
    label: 'Option Group',
    disabled: false,
    flavor: 'original'
  },
  // Wrap in a container for proper rendering context
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
 * Default option group with child options
 */
export const Default: Story = {
  render: (args) => html`
    <sando-option-group label="${args.label}" ?disabled="${args.disabled}">
      <sando-option value="apple">Apple</sando-option>
      <sando-option value="banana">Banana</sando-option>
      <sando-option value="orange">Orange</sando-option>
    </sando-option-group>
  `
};

/**
 * Interactive playground - use controls to customize
 */
export const Playground: Story = {
  render: (args) => html`
    <sando-option-group
      label="${args.label}"
      ?disabled="${args.disabled}"
      flavor="${args.flavor || 'original'}"
    >
      <sando-option value="option1">Option 1</sando-option>
      <sando-option value="option2">Option 2</sando-option>
      <sando-option value="option3">Option 3</sando-option>
    </sando-option-group>
  `
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * Disabled group - all child options become disabled
 */
export const Disabled: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-option-group label="Unavailable Options" disabled>
      <sando-option value="mango">Mango</sando-option>
      <sando-option value="papaya">Papaya</sando-option>
      <sando-option value="guava">Guava</sando-option>
    </sando-option-group>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'When a group is disabled, all child options inherit the disabled state and cannot be selected.'
      }
    }
  }
};

/**
 * Multiple groups together
 */
export const MultipleGroups: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-option-group label="Fruits">
      <sando-option value="apple">Apple</sando-option>
      <sando-option value="banana">Banana</sando-option>
      <sando-option value="orange">Orange</sando-option>
    </sando-option-group>
    <sando-option-group label="Vegetables">
      <sando-option value="carrot">Carrot</sando-option>
      <sando-option value="broccoli">Broccoli</sando-option>
      <sando-option value="spinach">Spinach</sando-option>
    </sando-option-group>
    <sando-option-group label="Dairy" disabled>
      <sando-option value="milk">Milk</sando-option>
      <sando-option value="cheese">Cheese</sando-option>
    </sando-option-group>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Multiple groups can be used together to organize options into categories.'
      }
    }
  }
};

/**
 * Group with selected option
 */
export const WithSelectedOption: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-option-group label="Frontend Frameworks">
      <sando-option value="react">React</sando-option>
      <sando-option value="vue" selected>Vue</sando-option>
      <sando-option value="angular">Angular</sando-option>
    </sando-option-group>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Options within a group can be individually selected.'
      }
    }
  }
};

/**
 * Group with mixed disabled options
 */
export const MixedDisabledOptions: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-option-group label="Subscription Plans">
      <sando-option value="free">Free</sando-option>
      <sando-option value="starter">Starter</sando-option>
      <sando-option value="pro" selected>Pro</sando-option>
      <sando-option value="enterprise" disabled>Enterprise (Contact Sales)</sando-option>
    </sando-option-group>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Individual options can be disabled within an enabled group.'
      }
    }
  }
};

/**
 * Groups with icons in options
 */
export const WithIconOptions: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-option-group label="File Actions">
      <sando-option value="new">
        <span slot="prefix">📄</span>
        New File
      </sando-option>
      <sando-option value="open">
        <span slot="prefix">📂</span>
        Open
      </sando-option>
      <sando-option value="save">
        <span slot="prefix">💾</span>
        Save
      </sando-option>
    </sando-option-group>
    <sando-option-group label="Edit Actions">
      <sando-option value="cut">
        <span slot="prefix">✂️</span>
        Cut
      </sando-option>
      <sando-option value="copy">
        <span slot="prefix">📋</span>
        Copy
      </sando-option>
      <sando-option value="paste">
        <span slot="prefix">📌</span>
        Paste
      </sando-option>
    </sando-option-group>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Options within groups can use prefix slots for icons.'
      }
    }
  }
};

/**
 * Real-world example: Country selector with regions
 */
export const RealWorldExample: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-option-group label="North America">
      <sando-option value="us">
        <span slot="prefix">🇺🇸</span>
        United States
      </sando-option>
      <sando-option value="ca">
        <span slot="prefix">🇨🇦</span>
        Canada
      </sando-option>
      <sando-option value="mx">
        <span slot="prefix">🇲🇽</span>
        Mexico
      </sando-option>
    </sando-option-group>
    <sando-option-group label="Europe">
      <sando-option value="uk">
        <span slot="prefix">🇬🇧</span>
        United Kingdom
      </sando-option>
      <sando-option value="de">
        <span slot="prefix">🇩🇪</span>
        Germany
      </sando-option>
      <sando-option value="fr">
        <span slot="prefix">🇫🇷</span>
        France
      </sando-option>
    </sando-option-group>
    <sando-option-group label="Asia Pacific">
      <sando-option value="jp">
        <span slot="prefix">🇯🇵</span>
        Japan
      </sando-option>
      <sando-option value="au">
        <span slot="prefix">🇦🇺</span>
        Australia
      </sando-option>
    </sando-option-group>
  `,
  parameters: {
    docs: {
      description: {
        story: 'A real-world example of grouping countries by region.'
      }
    }
  }
};

/**
 * All states comparison
 */
export const AllStates: Story = {
  tags: DOCS_ONLY,
  decorators: [], // Remove default decorator
  render: () => html`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
      <!-- Enabled Group -->
      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #78716c;">Enabled</h4>
        <div
          role="listbox"
          style="width: 250px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;"
        >
          <sando-option-group label="Fruits">
            <sando-option value="apple">Apple</sando-option>
            <sando-option value="banana" selected>Banana</sando-option>
            <sando-option value="orange">Orange</sando-option>
          </sando-option-group>
        </div>
      </div>

      <!-- Disabled Group -->
      <div>
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; color: #78716c;">Disabled</h4>
        <div
          role="listbox"
          style="width: 250px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;"
        >
          <sando-option-group label="Fruits" disabled>
            <sando-option value="apple">Apple</sando-option>
            <sando-option value="banana">Banana</sando-option>
            <sando-option value="orange">Orange</sando-option>
          </sando-option-group>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Complete showcase of all option group features
 */
export const AllExamples: Story = {
  tags: DOCS_ONLY,
  decorators: [], // Remove default decorator
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Basic Groups -->
      <section>
        <h3 style="margin: 0 0 0.75rem 0; font-size: 1rem;">Basic Groups</h3>
        <div
          role="listbox"
          style="max-width: 300px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;"
        >
          <sando-option-group label="Fruits">
            <sando-option value="apple">Apple</sando-option>
            <sando-option value="banana">Banana</sando-option>
          </sando-option-group>
          <sando-option-group label="Vegetables">
            <sando-option value="carrot">Carrot</sando-option>
            <sando-option value="broccoli">Broccoli</sando-option>
          </sando-option-group>
        </div>
      </section>

      <!-- Mixed States -->
      <section>
        <h3 style="margin: 0 0 0.75rem 0; font-size: 1rem;">Mixed States</h3>
        <div
          role="listbox"
          style="max-width: 300px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;"
        >
          <sando-option-group label="Available">
            <sando-option value="opt1" selected>Selected Option</sando-option>
            <sando-option value="opt2">Normal Option</sando-option>
          </sando-option-group>
          <sando-option-group label="Unavailable" disabled>
            <sando-option value="opt3">Disabled by Group</sando-option>
            <sando-option value="opt4">Also Disabled</sando-option>
          </sando-option-group>
        </div>
      </section>

      <!-- With Rich Content -->
      <section>
        <h3 style="margin: 0 0 0.75rem 0; font-size: 1rem;">With Rich Content</h3>
        <div
          role="listbox"
          style="max-width: 300px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;"
        >
          <sando-option-group label="Premium Plans">
            <sando-option value="pro">
              <span slot="prefix">⭐</span>
              Pro
              <span slot="suffix" style="font-size: 12px; color: #64748b;">$10/mo</span>
            </sando-option>
            <sando-option value="team">
              <span slot="prefix">👥</span>
              Team
              <span slot="suffix" style="font-size: 12px; color: #64748b;">$50/mo</span>
            </sando-option>
          </sando-option-group>
        </div>
      </section>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
