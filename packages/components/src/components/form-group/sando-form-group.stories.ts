import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './sando-form-group';

/**
 * # Form Group Component
 *
 * The Form Group component provides consistent layout and labeling for form controls.
 * It supports labels, helper text, error messages, and required field indicators.
 *
 * ## Usage
 *
 * Use Form Group to:
 * - Provide accessible labels for form inputs
 * - Display validation errors
 * - Show helpful guidance text
 * - Indicate required fields
 * - Maintain consistent form field spacing
 *
 * ## Accessibility
 *
 * - Labels are properly associated with form controls
 * - Error messages use `role="alert"` and `aria-live="polite"`
 * - Required fields are indicated with visual asterisk
 * - Helper text provides additional context for users
 * - Keyboard navigation works seamlessly with slotted controls
 */
const meta: Meta = {
  title: 'Components/Form Group',
  component: 'sando-form-group',
  tags: ['autodocs', 'beta'],
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
      description: 'Label text for the form field',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the field',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    // 3. State
    error: {
      control: 'text',
      description: 'Error message to display (shows error state)',
      table: {
        category: 'State',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required (shows asterisk)',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  },
  args: {
    flavor: 'original',
    label: 'Email',
    helperText: '',
    error: '',
    required: false
  }
};

export default meta;
type Story = StoryObj;

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default form group with label and input
 */
export const Default: Story = {
  render: (args) => html`
    <sando-form-group
      flavor="${args.flavor || 'original'}"
      label=${args.label || ''}
      ?required=${args.required}
    >
      <input type="text" placeholder="Enter text..." />
    </sando-form-group>
  `
};

/**
 * Interactive playground to explore all properties
 */
export const Playground: Story = {
  render: (args) => html`
    <sando-form-group
      flavor="${args.flavor || 'original'}"
      label=${args.label || ''}
      helperText=${args.helperText || ''}
      error=${args.error || ''}
      ?required=${args.required}
    >
      <input type="text" placeholder="Enter text..." />
    </sando-form-group>
  `
};

/**
 * Form group with helper text providing guidance
 */
export const WithHelperText: Story = {
  render: () => html`
    <sando-form-group label="Username" helperText="Choose a unique username (4-20 characters)">
      <input type="text" placeholder="username" />
    </sando-form-group>
  `
};

/**
 * Form group showing error state with validation message
 */
export const WithError: Story = {
  render: () => html`
    <sando-form-group label="Email" error="Please enter a valid email address">
      <input type="email" value="invalid-email" aria-invalid="true" />
    </sando-form-group>
  `
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * Required field with asterisk indicator
 */
export const Required: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-form-group label="Password" helperText="Must be at least 8 characters" required>
      <input type="password" required />
    </sando-form-group>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Using custom slots for advanced layouts
 */
export const WithSlots: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-form-group>
      <div slot="label">
        <strong>Custom Label</strong>
        <em style="font-size: 0.875em; color: #666;">(optional)</em>
      </div>
      <input type="text" placeholder="Enter text..." />
      <div slot="helper-text" style="font-style: italic;">
        This is custom helper text with <strong>HTML formatting</strong>
      </div>
    </sando-form-group>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Different form control types
 */
export const DifferentInputTypes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <sando-form-group label="Text Input">
        <input type="text" placeholder="Enter text..." />
      </sando-form-group>

      <sando-form-group label="Email">
        <input type="email" placeholder="email@example.com" />
      </sando-form-group>

      <sando-form-group label="Select">
        <select>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </sando-form-group>

      <sando-form-group label="Textarea">
        <textarea rows="3" placeholder="Enter description..."></textarea>
      </sando-form-group>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All states comparison
 */
export const AllStates: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <sando-form-group label="Default">
        <input type="text" placeholder="Normal input" />
      </sando-form-group>

      <sando-form-group label="With Helper" helperText="This is helpful guidance text">
        <input type="text" placeholder="With helper text" />
      </sando-form-group>

      <sando-form-group label="Required" required>
        <input type="text" placeholder="Required field" />
      </sando-form-group>

      <sando-form-group label="With Error" error="This field has an error">
        <input type="text" value="Invalid value" aria-invalid="true" />
      </sando-form-group>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Complete form example
 */
export const CompleteForm: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <form style="max-width: 400px;">
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <sando-form-group label="Full Name" required>
          <input type="text" required />
        </sando-form-group>

        <sando-form-group label="Email" helperText="We'll never share your email" required>
          <input type="email" required />
        </sando-form-group>

        <sando-form-group label="Password" helperText="Must be at least 8 characters" required>
          <input type="password" required />
        </sando-form-group>

        <sando-form-group label="Bio">
          <textarea rows="4" placeholder="Tell us about yourself..."></textarea>
        </sando-form-group>

        <button
          type="submit"
          style="padding: 12px 24px; background: var(--sando-color-brand-500, #f97316); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;"
        >
          Submit
        </button>
      </div>
    </form>
  `,
  parameters: { controls: { disable: true } }
};
