import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-checkbox.js';

/**
 * # Checkbox Component
 *
 * A fully accessible checkbox component with multiple variants, sizes, and states.
 * Supports checked, indeterminate, and disabled states with helper/error text.
 *
 * ## Features
 * - **2 Variants**: solid, outline
 * - **3 Sizes**: sm, md, lg
 * - **States**: checked, indeterminate, disabled, error, required
 * - **Helper/Error Text**: Contextual messaging below checkbox
 * - **Form Integration**: Works with native form validation
 *
 * ## Accessibility
 * - Full keyboard navigation (Space/Enter to toggle)
 * - ARIA attributes for screen readers
 * - Visible focus indicators
 * - Error states announced via role="alert"
 * - Indeterminate state uses aria-checked="mixed"
 */
const meta: Meta = {
  title: 'Components/Checkbox',
  component: 'sando-checkbox',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-checkbox
      variant="${args.variant}"
      size="${args.size}"
      flavor="${args.flavor || 'original'}"
      ?checked="${args.checked}"
      ?indeterminate="${args.indeterminate}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      name="${args.name || ''}"
      value="${args.value || 'on'}"
      label="${args.label || ''}"
      helper-text="${args.helperText || ''}"
      error-text="${args.errorText || ''}"
    ></sando-checkbox>
  `,
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
      options: ['solid', 'outline'],
      description: 'Visual style variant',
      table: {
        category: 'Appearance',
        type: { summary: "'solid' | 'outline'" },
        defaultValue: { summary: 'solid' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox',
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' }
      }
    },
    // 3. Content
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the checkbox',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    errorText: {
      control: 'text',
      description: 'Error message displayed when error is true',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    // 4. State
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state (partial selection)',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required for form validation',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    error: {
      control: 'boolean',
      description: 'Whether the checkbox is in error state',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    // 5. Form
    name: {
      control: 'text',
      description: 'Form field name',
      table: {
        category: 'Form',
        type: { summary: 'string' }
      }
    },
    value: {
      control: 'text',
      description: 'Value when checked',
      table: {
        category: 'Form',
        type: { summary: 'string' },
        defaultValue: { summary: 'on' }
      }
    }
  },
  args: {
    variant: 'solid',
    size: 'md',
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
    error: false,
    value: 'on',
    label: 'Accept terms and conditions',
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
 * Default checkbox with label.
 */
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions'
  }
};

/**
 * Interactive playground - use controls to customize.
 */
export const Playground: Story = {
  args: {
    label: 'Customize me!'
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * All variant styles comparison.
 */
export const Variants: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <h4 style="margin: 0; font-size: 0.875rem; color: #78716c;">Solid (default)</h4>
        <sando-checkbox variant="solid" label="Unchecked"></sando-checkbox>
        <sando-checkbox variant="solid" label="Checked" checked></sando-checkbox>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <h4 style="margin: 0; font-size: 0.875rem; color: #78716c;">Outline</h4>
        <sando-checkbox variant="outline" label="Unchecked"></sando-checkbox>
        <sando-checkbox variant="outline" label="Checked" checked></sando-checkbox>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All size options comparison.
 */
export const Sizes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: center;">
      <sando-checkbox size="sm" label="Small" checked></sando-checkbox>
      <sando-checkbox size="md" label="Medium" checked></sando-checkbox>
      <sando-checkbox size="lg" label="Large" checked></sando-checkbox>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All interactive states comparison.
 */
export const States: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sando-checkbox label="Default (unchecked)"></sando-checkbox>
      <sando-checkbox label="Checked" checked></sando-checkbox>
      <sando-checkbox label="Indeterminate" indeterminate></sando-checkbox>
      <sando-checkbox label="Disabled" disabled></sando-checkbox>
      <sando-checkbox label="Disabled + Checked" disabled checked></sando-checkbox>
      <sando-checkbox label="Error" error></sando-checkbox>
      <sando-checkbox label="Error + Checked" error checked></sando-checkbox>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Checkbox with helper text for additional context.
 */
export const WithHelperText: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <sando-checkbox
        label="Subscribe to newsletter"
        helper-text="Get weekly updates about new features and tips."
      ></sando-checkbox>
      <sando-checkbox
        label="Enable notifications"
        helper-text="Receive push notifications for important updates."
        checked
      ></sando-checkbox>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Checkbox with error state and error message.
 */
export const WithErrorText: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <sando-checkbox
        label="Accept terms and conditions"
        error
        error-text="You must accept the terms and conditions to continue."
      ></sando-checkbox>
      <sando-checkbox
        label="Confirm your age (18+)"
        error
        error-text="You must confirm you are 18 or older."
        checked
      ></sando-checkbox>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Required checkbox with indicator.
 */
export const Required: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <sando-checkbox
        label="I agree to the Privacy Policy"
        required
        helper-text="This field is required to proceed."
      ></sando-checkbox>
      <sando-checkbox label="I accept the Terms of Service" required></sando-checkbox>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Multiple checkboxes as a group for visual demonstration.
 */
export const InGroup: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <fieldset
      style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; max-width: 400px;"
    >
      <legend style="font-weight: 600; padding: 0 0.5rem;">Notification Preferences</legend>
      <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
        <sando-checkbox
          name="notifications"
          value="email"
          label="Email notifications"
          helper-text="Receive updates via email"
          checked
        ></sando-checkbox>
        <sando-checkbox
          name="notifications"
          value="sms"
          label="SMS notifications"
          helper-text="Receive updates via text message"
        ></sando-checkbox>
        <sando-checkbox
          name="notifications"
          value="push"
          label="Push notifications"
          helper-text="Receive browser push notifications"
          checked
        ></sando-checkbox>
        <sando-checkbox
          name="notifications"
          value="marketing"
          label="Marketing communications"
          helper-text="Receive promotional offers and news"
        ></sando-checkbox>
      </div>
    </fieldset>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Checkbox inside a form with submit button (interactive demo).
 */
export const FormIntegration: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <form
      @submit=${(e: Event) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const terms = formData.get('terms');
        const newsletter = formData.get('newsletter');
        alert(
          `Form submitted!\nTerms accepted: ${terms ? 'Yes' : 'No'}\nNewsletter: ${newsletter ? 'Yes' : 'No'}`
        );
      }}
      style="max-width: 400px; display: flex; flex-direction: column; gap: 1.5rem;"
    >
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <sando-checkbox
          name="terms"
          value="accepted"
          label="I accept the Terms and Conditions"
          required
          helper-text="Required to create an account"
        ></sando-checkbox>
        <sando-checkbox
          name="newsletter"
          value="subscribed"
          label="Subscribe to our newsletter"
          helper-text="Optional - unsubscribe anytime"
        ></sando-checkbox>
      </div>
      <div style="display: flex; gap: 1rem;">
        <button
          type="submit"
          style="padding: 12px 24px; background: var(--sando-color-brand-500, #f97316); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; font-weight: 500;"
        >
          Create Account
        </button>
        <button
          type="reset"
          style="padding: 12px 24px; background: transparent; color: #64748b; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer; font-size: 1rem;"
        >
          Reset
        </button>
      </div>
    </form>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Complete showcase of all checkbox features.
 */
export const AllExamples: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2.5rem;">
      <!-- Variants -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Variants</h3>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          <sando-checkbox variant="solid" label="Solid" checked></sando-checkbox>
          <sando-checkbox variant="outline" label="Outline" checked></sando-checkbox>
        </div>
      </section>

      <!-- Sizes -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Sizes</h3>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: center;">
          <sando-checkbox size="sm" label="Small" checked></sando-checkbox>
          <sando-checkbox size="md" label="Medium" checked></sando-checkbox>
          <sando-checkbox size="lg" label="Large" checked></sando-checkbox>
        </div>
      </section>

      <!-- States -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">States</h3>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          <sando-checkbox label="Unchecked"></sando-checkbox>
          <sando-checkbox label="Checked" checked></sando-checkbox>
          <sando-checkbox label="Indeterminate" indeterminate></sando-checkbox>
          <sando-checkbox label="Disabled" disabled></sando-checkbox>
          <sando-checkbox label="Error" error></sando-checkbox>
        </div>
      </section>

      <!-- With Helper Text -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">With Helper Text</h3>
        <sando-checkbox
          label="Enable dark mode"
          helper-text="Switch to dark theme for better readability at night."
          checked
        ></sando-checkbox>
      </section>

      <!-- With Error -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">With Error</h3>
        <sando-checkbox
          label="Accept privacy policy"
          error
          error-text="You must accept the privacy policy to continue."
        ></sando-checkbox>
      </section>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
