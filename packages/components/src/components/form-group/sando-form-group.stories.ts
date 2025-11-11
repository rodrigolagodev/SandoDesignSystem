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
 * - ✅ Labels are properly associated with form controls
 * - ✅ Error messages use `role="alert"` and `aria-live="polite"`
 * - ✅ Required fields are indicated with visual asterisk
 * - ✅ Helper text provides additional context for users
 * - ✅ Keyboard navigation works seamlessly with slotted controls
 */
const meta: Meta = {
  title: 'Components/Form Group',
  component: 'sando-form-group',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the form field',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' }
      }
    },
    error: {
      control: 'text',
      description: 'Error message to display (shows error state)',
      table: {
        category: 'State',
        defaultValue: { summary: 'undefined' }
      }
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the field',
      table: {
        category: 'Content',
        defaultValue: { summary: 'undefined' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required (shows asterisk)',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' }
      }
    }
  },
  args: {
    label: 'Email',
    helperText: '',
    error: '',
    required: false
  }
};

export default meta;
type Story = StoryObj;

/**
 * Default form group with label and input
 */
export const Default: Story = {
  render: (args) => html`
    <sando-form-group label=${args.label || ''} ?required=${args.required}>
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
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Form group showing error state with validation message
 */
export const WithError: Story = {
  render: () => html`
    <sando-form-group label="Email" error="Please enter a valid email address">
      <input type="email" value="invalid-email" aria-invalid="true" />
    </sando-form-group>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Required field with asterisk indicator
 */
export const Required: Story = {
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
 * Complete form example
 */
export const CompleteForm: Story = {
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

        <button type="submit">Submit</button>
      </div>
    </form>
  `,
  parameters: { controls: { disable: true } }
};
