import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-help-text.js';

/**
 * # Help Text Component
 *
 * An internal component used by form components to display helper, error, success,
 * or warning messages below form fields.
 *
 * ## Primary Purpose
 *
 * Prevent layout shift when messages appear by reserving vertical space even when
 * no message is displayed. This ensures a stable UI during form validation.
 *
 * ## Typography
 *
 * Uses fixed caption size regardless of parent form component size (industry standard
 * per Carbon, MUI, Chakra, etc.). Helper text should maintain consistent readability
 * and not scale with input size.
 *
 * ## Usage
 *
 * While primarily used internally by form components, it can be used directly for:
 * - Custom form layouts
 * - Validation messages
 * - Contextual hints
 *
 * ## Accessibility
 *
 * - Error variant uses `role="alert"` with `aria-live="assertive"`
 * - Other variants use `role="status"` with `aria-live="polite"`
 * - Icons are decorative and hidden from screen readers
 */
const meta: Meta = {
  title: 'Components/HelpText',
  component: 'sando-help-text',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-help-text
      variant="${args.variant}"
      ?show-icon="${args.showIcon}"
      reserve-space="${args.reserveSpace}"
    >
      ${args.content}
    </sando-help-text>
  `,
  argTypes: {
    // Appearance
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
      description: 'Visual variant determining color and icon style',
      table: {
        category: 'Appearance',
        type: { summary: "'default' | 'error' | 'success' | 'warning'" },
        defaultValue: { summary: 'default' }
      }
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show an icon based on variant',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    // Behavior
    reserveSpace: {
      control: 'select',
      options: ['true', 'false'],
      description: 'Whether to reserve vertical space to prevent layout shift',
      table: {
        category: 'Behavior',
        type: { summary: "'true' | 'false'" },
        defaultValue: { summary: 'true' }
      }
    },
    // Content
    content: {
      control: 'text',
      description: 'Help text message (slot content)',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    }
  },
  args: {
    variant: 'default',
    showIcon: false,
    reserveSpace: 'true',
    content: 'Enter your email address'
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
 * Default help text with standard configuration.
 * Used to provide contextual hints below form fields.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 */
export const Playground: Story = {
  args: {
    content: 'Customize me using the controls!'
  }
};

/**
 * Error variant with icon - commonly used for validation errors.
 */
export const Error: Story = {
  args: {
    variant: 'error',
    showIcon: true,
    content: 'This field is required'
  }
};

/**
 * Success variant with icon - used for successful validation.
 */
export const Success: Story = {
  args: {
    variant: 'success',
    showIcon: true,
    content: 'Email address is valid'
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * All variant styles comparison.
 * Each variant has a distinct color to communicate different message types.
 */
export const Variants: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <span
          style="font-size: 0.75rem; color: var(--sando-color-text-muted); display: block; margin-bottom: 0.25rem;"
          >default</span
        >
        <sando-help-text variant="default">This is a default helper message</sando-help-text>
      </div>
      <div>
        <span
          style="font-size: 0.75rem; color: var(--sando-color-text-muted); display: block; margin-bottom: 0.25rem;"
          >error</span
        >
        <sando-help-text variant="error">This field has an error</sando-help-text>
      </div>
      <div>
        <span
          style="font-size: 0.75rem; color: var(--sando-color-text-muted); display: block; margin-bottom: 0.25rem;"
          >success</span
        >
        <sando-help-text variant="success">Input is valid</sando-help-text>
      </div>
      <div>
        <span
          style="font-size: 0.75rem; color: var(--sando-color-text-muted); display: block; margin-bottom: 0.25rem;"
          >warning</span
        >
        <sando-help-text variant="warning">This action cannot be undone</sando-help-text>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Help text with icons enabled.
 * Icons provide visual reinforcement of the message type.
 */
export const WithIcon: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sando-help-text variant="default" show-icon>Default with info icon</sando-help-text>
      <sando-help-text variant="error" show-icon>Error with alert icon</sando-help-text>
      <sando-help-text variant="success" show-icon>Success with check icon</sando-help-text>
      <sando-help-text variant="warning" show-icon>Warning with triangle icon</sando-help-text>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Demonstrates the reserve-space behavior.
 * When reserve-space is true (default), vertical space is maintained even without content,
 * preventing layout shift during form validation.
 */
export const ReserveSpace: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem;">
      <div
        style="border: 1px dashed var(--sando-color-border-muted); padding: 1rem; border-radius: 8px;"
      >
        <div style="font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">
          reserve-space="true" (default)
        </div>
        <div
          style="background: var(--sando-color-background-surface); padding: 0.5rem; border-radius: 4px;"
        >
          <div
            style="height: 40px; background: var(--sando-color-background-muted); border-radius: 4px; margin-bottom: 0.25rem;"
          ></div>
          <sando-help-text reserve-space="true"></sando-help-text>
        </div>
        <div
          style="background: var(--sando-color-background-surface); padding: 0.5rem; border-radius: 4px; margin-top: 0.5rem;"
        >
          <div
            style="height: 40px; background: var(--sando-color-background-muted); border-radius: 4px; margin-bottom: 0.25rem;"
          ></div>
          <sando-help-text reserve-space="true">Helper text here</sando-help-text>
        </div>
        <p style="font-size: 0.75rem; color: var(--sando-color-text-muted); margin: 0.5rem 0 0 0;">
          Notice the consistent spacing below both inputs
        </p>
      </div>
      <div
        style="border: 1px dashed var(--sando-color-border-muted); padding: 1rem; border-radius: 8px;"
      >
        <div style="font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">
          reserve-space="false"
        </div>
        <div
          style="background: var(--sando-color-background-surface); padding: 0.5rem; border-radius: 4px;"
        >
          <div
            style="height: 40px; background: var(--sando-color-background-muted); border-radius: 4px; margin-bottom: 0.25rem;"
          ></div>
          <sando-help-text reserve-space="false"></sando-help-text>
        </div>
        <div
          style="background: var(--sando-color-background-surface); padding: 0.5rem; border-radius: 4px; margin-top: 0.5rem;"
        >
          <div
            style="height: 40px; background: var(--sando-color-background-muted); border-radius: 4px; margin-bottom: 0.25rem;"
          ></div>
          <sando-help-text reserve-space="false">Helper text here</sando-help-text>
        </div>
        <p style="font-size: 0.75rem; color: var(--sando-color-text-muted); margin: 0.5rem 0 0 0;">
          Layout shifts when text appears/disappears
        </p>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Empty help text with reserved space.
 * Shows how the component maintains layout stability even without content.
 */
export const Empty: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <div style="font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">
          Empty with reserved space
        </div>
        <div style="border: 1px dashed var(--sando-color-border-muted); padding: 0.5rem;">
          <sando-help-text reserve-space="true"></sando-help-text>
        </div>
        <p style="font-size: 0.75rem; color: var(--sando-color-text-muted); margin: 0.25rem 0 0 0;">
          Space is reserved for consistent layout
        </p>
      </div>
      <div>
        <div style="font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">
          Empty without reserved space
        </div>
        <div style="border: 1px dashed var(--sando-color-border-muted); padding: 0.5rem;">
          <sando-help-text reserve-space="false"></sando-help-text>
        </div>
        <p style="font-size: 0.75rem; color: var(--sando-color-text-muted); margin: 0.25rem 0 0 0;">
          No space reserved, collapses completely
        </p>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Realistic form context example.
 * Shows help-text used below form inputs as it would be in a real application.
 */
export const InFormContext: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <form style="max-width: 400px; display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- Field with default helper -->
      <div>
        <label
          style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;"
        >
          Email Address
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          aria-describedby="email-help"
          style="width: 100%; padding: 0.75rem; border: 1px solid var(--sando-color-border-default); border-radius: 6px; font-size: 1rem; box-sizing: border-box;"
        />
        <sando-help-text id="email-help">We'll never share your email with anyone</sando-help-text>
      </div>

      <!-- Field with error -->
      <div>
        <label
          style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;"
        >
          Username
        </label>
        <input
          type="text"
          value="admin"
          aria-describedby="username-error"
          aria-invalid="true"
          style="width: 100%; padding: 0.75rem; border: 1px solid var(--sando-color-feedback-error-text); border-radius: 6px; font-size: 1rem; box-sizing: border-box;"
        />
        <sando-help-text id="username-error" variant="error" show-icon
          >This username is already taken</sando-help-text
        >
      </div>

      <!-- Field with success -->
      <div>
        <label
          style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;"
        >
          Password
        </label>
        <input
          type="password"
          value="SecureP@ss123"
          aria-describedby="password-success"
          style="width: 100%; padding: 0.75rem; border: 1px solid var(--sando-color-feedback-success-text); border-radius: 6px; font-size: 1rem; box-sizing: border-box;"
        />
        <sando-help-text id="password-success" variant="success" show-icon
          >Password meets all requirements</sando-help-text
        >
      </div>

      <!-- Field with warning -->
      <div>
        <label
          style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;"
        >
          API Key
        </label>
        <input
          type="text"
          value="sk-xxxx-xxxx-xxxx"
          aria-describedby="apikey-warning"
          style="width: 100%; padding: 0.75rem; border: 1px solid var(--sando-color-feedback-warning-text); border-radius: 6px; font-size: 1rem; box-sizing: border-box;"
        />
        <sando-help-text id="apikey-warning" variant="warning" show-icon
          >This key will expire in 7 days</sando-help-text
        >
      </div>
    </form>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All variants with icons in a grid.
 * Complete visual reference for all configurations.
 */
export const AllVariantsWithIcons: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">
      ${(['default', 'error', 'success', 'warning'] as const).map(
        (variant) => html`
          <div>
            <strong style="display: block; margin-bottom: 8px; text-transform: capitalize;"
              >${variant}</strong
            >
            <sando-help-text variant=${variant} show-icon>
              ${variant} message with icon
            </sando-help-text>
          </div>
        `
      )}
    </div>
  `,
  parameters: { controls: { disable: true } }
};
