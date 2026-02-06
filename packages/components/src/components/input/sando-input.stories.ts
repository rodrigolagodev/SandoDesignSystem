import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-input.js';
import '../icon/sando-icon.ts';

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
  title: 'Components/Input',
  component: 'sando-input',
  tags: ['autodocs', 'stable'],
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
    // 2. Appearance
    variant: {
      control: 'select',
      options: ['outlined', 'filled'],
      description: 'Visual style of the input',
      table: {
        category: 'Appearance',
        type: { summary: "'outlined' | 'filled'" },
        defaultValue: { summary: 'filled' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' }
      }
    },
    // 3. Content
    label: {
      control: 'text',
      description: 'Accessible label for the input',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    value: {
      control: 'text',
      description: 'Input value',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below input',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    errorText: {
      control: 'text',
      description: 'Error message when error is true',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    // 4. State
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the input is readonly',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    error: {
      control: 'boolean',
      description: 'Whether the input has an error',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    // 5. HTML
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'HTML input type',
      table: {
        category: 'HTML',
        type: { summary: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'" },
        defaultValue: { summary: 'text' }
      }
    }
  },
  args: {
    variant: 'filled',
    size: 'md',
    type: 'text',
    label: 'Label',
    placeholder: 'Enter text...',
    flavor: 'original'
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
      flavor="${args.flavor || 'original'}"
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
 * Input with prefix icon (search example)
 */
export const WithPrefix: Story = {
  render: () => html`
    <sando-input label="Search" placeholder="Search...">
      <sando-icon slot="prefix" name="search" size="small" color="muted"></sando-icon>
    </sando-input>
  `
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

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * All variants side by side
 */
export const AllVariants: Story = {
  tags: DOCS_ONLY,
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
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap;">
      <sando-input size="sm" label="Small" value="Small input"></sando-input>
      <sando-input size="md" label="Medium" value="Medium input"></sando-input>
      <sando-input size="lg" label="Large" value="Large input"></sando-input>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All interactive states comparison
 */
export const AllStates: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start;">
      <sando-input label="Default" value="Normal input"></sando-input>
      <sando-input label="Disabled" value="Disabled input" disabled></sando-input>
      <sando-input label="Readonly" value="Readonly input" readonly></sando-input>
      <sando-input label="Required" placeholder="Required field" required></sando-input>
      <sando-input
        label="Error"
        value="Invalid value"
        error
        error-text="This field has an error"
      ></sando-input>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Input with helper text
 */
export const WithHelperText: Story = {
  tags: DOCS_ONLY,
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters'
  }
};

/**
 * Required field with indicator
 */
export const Required: Story = {
  tags: DOCS_ONLY,
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
  tags: DOCS_ONLY,
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
  tags: DOCS_ONLY,
  args: {
    label: 'Company Name',
    value: 'Acme Corporation',
    readonly: true,
    helperText: 'This field cannot be edited'
  }
};

/**
 * Input with suffix button
 */
export const WithSuffix: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-input label="Search" value="sample query">
      <button
        slot="suffix"
        style="border: none; background: none; cursor: pointer; padding: 4px; display: flex; align-items: center;"
        aria-label="Clear search"
      >
        <sando-icon name="x" size="small" color="muted"></sando-icon>
      </button>
    </sando-input>
  `
};

/**
 * Input with both prefix and suffix
 */
export const WithPrefixAndSuffix: Story = {
  tags: DOCS_ONLY,
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
  tags: DOCS_ONLY,
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
  tags: DOCS_ONLY,
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
        style="padding: 12px 24px; background: var(--sando-color-brand-500, #f97316); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;"
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
  tags: DOCS_ONLY,
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
