import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-input.js';

/**
 * # Input Component
 *
 * The Input component provides a fully accessible text input with multiple variants,
 * sizes, and states. It supports validation, helper text, and customizable prefix/suffix content.
 *
 * ## Usage
 *
 * Use inputs to collect user text data:
 * - Form fields (email, password, text)
 * - Search interfaces
 * - Filter controls
 * - Any user text input
 *
 * ## Accessibility
 *
 * - All inputs have visible focus indicators
 * - Disabled inputs are not focusable
 * - Error states are announced to screen readers
 * - Helper text is properly associated
 * - Required fields have visual and semantic indicators
 */
const meta: Meta = {
  title: 'Components/Inputs/Input',
  component: 'sando-input',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled'],
      description: 'Visual style of the input',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'filled' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the input',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'medium' }
      }
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'HTML input type',
      table: {
        category: 'Content',
        defaultValue: { summary: 'text' }
      }
    },
    value: {
      control: 'text',
      description: 'Input value',
      table: {
        category: 'Content'
      }
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        category: 'Content'
      }
    },
    label: {
      control: 'text',
      description: 'Accessible label for the input',
      table: {
        category: 'Content'
      }
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below input',
      table: {
        category: 'Content'
      }
    },
    errorText: {
      control: 'text',
      description: 'Error message when error is true',
      table: {
        category: 'Content'
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the input is readonly',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' }
      }
    },
    error: {
      control: 'boolean',
      description: 'Whether the input has an error',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' }
      }
    }
  },
  args: {
    variant: 'filled',
    size: 'medium',
    type: 'text',
    label: 'Label',
    placeholder: 'Enter text...'
  }
};

export default meta;
type Story = StoryObj;

/**
 * Default input with standard configuration
 */
export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email'
  }
};

/**
 * Interactive playground to test all properties
 */
export const Playground: Story = {
  render: (args) => html`
    <sando-input
      variant="${args.variant}"
      size="${args.size}"
      type="${args.type}"
      value="${args.value || ''}"
      placeholder="${args.placeholder || ''}"
      label="${args.label || ''}"
      helper-text="${args.helperText || ''}"
      error-text="${args.errorText || ''}"
      ?disabled="${args.disabled}"
      ?readonly="${args.readonly}"
      ?required="${args.required}"
      ?error="${args.error}"
    ></sando-input>
  `
};

/**
 * All variants side by side
 */
export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; flex-wrap: wrap;">
      <sando-input variant="outlined" label="Outlined" value="Sample text"></sando-input>
      <sando-input variant="filled" label="Filled" value="Sample text"></sando-input>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap;">
      <sando-input size="small" label="Small" value="Small input"></sando-input>
      <sando-input size="medium" label="Medium" value="Medium input"></sando-input>
      <sando-input size="large" label="Large" value="Large input"></sando-input>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Input with helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters'
  }
};

/**
 * Input with error state
 */
export const WithError: Story = {
  args: {
    label: 'Username',
    type: 'text',
    error: true,
    errorText: 'Username is already taken',
    value: 'john_doe'
  }
};

/**
 * Required field with indicator
 */
export const Required: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    required: true,
    helperText: 'We will never share your email'
  }
};

/**
 * Disabled input
 */
export const Disabled: Story = {
  args: {
    label: 'Account ID',
    value: 'ACC-12345',
    disabled: true
  }
};

/**
 * Readonly input
 */
export const Readonly: Story = {
  args: {
    label: 'Company Name',
    value: 'Acme Corporation',
    readonly: true,
    helperText: 'This field cannot be edited'
  }
};

/**
 * Input with prefix icon
 */
export const WithPrefix: Story = {
  render: () => html`
    <sando-input label="Search" placeholder="Search...">
      <span slot="prefix" style="opacity: 0.6;">🔍</span>
    </sando-input>
  `
};

/**
 * Input with suffix button
 */
export const WithSuffix: Story = {
  render: () => html`
    <sando-input label="Search" value="sample query">
      <button
        slot="suffix"
        style="border: none; background: none; cursor: pointer; padding: 4px;"
        aria-label="Clear search"
      >
        ✕
      </button>
    </sando-input>
  `
};

/**
 * Input with both prefix and suffix
 */
export const WithPrefixAndSuffix: Story = {
  render: () => html`
    <sando-input label="Amount" type="number" value="100">
      <span slot="prefix" style="opacity: 0.8; font-weight: 500;">$</span>
      <span slot="suffix" style="opacity: 0.6;">.00</span>
    </sando-input>
  `
};

/**
 * Different input types
 */
export const InputTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <sando-input label="Text" type="text" value="Plain text"></sando-input>
      <sando-input label="Email" type="email" value="user@example.com"></sando-input>
      <sando-input label="Password" type="password" value="secret"></sando-input>
      <sando-input label="Number" type="number" value="42"></sando-input>
      <sando-input label="Tel" type="tel" value="+1-555-0100"></sando-input>
      <sando-input label="URL" type="url" value="https://example.com"></sando-input>
      <sando-input label="Search" type="search" placeholder="Search..."></sando-input>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Form example with multiple inputs
 */
export const FormExample: Story = {
  render: () => html`
    <form style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
      <sando-input label="Full Name" type="text" required placeholder="John Doe"></sando-input>

      <sando-input
        label="Email"
        type="email"
        required
        placeholder="john@example.com"
        helper-text="We'll never share your email"
      ></sando-input>

      <sando-input label="Phone" type="tel" placeholder="+1 (555) 000-0000"></sando-input>

      <sando-input
        label="Password"
        type="password"
        required
        helper-text="Must be at least 8 characters"
      ></sando-input>

      <button
        type="submit"
        style="padding: 12px 24px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;"
      >
        Submit
      </button>
    </form>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Validation states example
 */
export const ValidationStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <sando-input
        label="Valid Email"
        type="email"
        value="user@example.com"
        helper-text="Email format is correct"
      ></sando-input>

      <sando-input
        label="Invalid Email"
        type="email"
        value="invalid-email"
        error
        error-text="Please enter a valid email address"
      ></sando-input>

      <sando-input
        label="Required Field"
        required
        error
        error-text="This field is required"
      ></sando-input>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
