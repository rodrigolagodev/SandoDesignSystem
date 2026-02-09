import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-radio.js';

/**
 * # Radio Component
 *
 * A fully accessible radio button component with multiple variants, sizes, and states.
 * Radio buttons with the same `name` attribute form a mutually exclusive group.
 *
 * ## Features
 * - **2 Variants**: solid, outline
 * - **3 Sizes**: sm, md, lg
 * - **States**: checked, disabled, error, required
 * - **Helper/Error Text**: Contextual messaging below radio
 * - **Radio Groups**: Multiple radios with same name for mutual exclusion
 * - **Form Integration**: Works with native form validation
 *
 * ## Accessibility
 * - Full keyboard navigation (Space/Enter to select, Arrow keys in groups)
 * - ARIA attributes for screen readers
 * - Visible focus indicators
 * - Error states announced via role="alert"
 */
const meta: Meta = {
  title: 'Components/Radio',
  component: 'sando-radio',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-radio
      variant="${args.variant}"
      size="${args.size}"
      flavor="${args.flavor || 'original'}"
      ?checked="${args.checked}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      name="${args.name || ''}"
      value="${args.value || 'on'}"
      label="${args.label || ''}"
      helper-text="${args.helperText || ''}"
      error-text="${args.errorText || ''}"
    ></sando-radio>
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
      description: 'Size of the radio button',
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' }
      }
    },
    // 3. Content
    label: {
      control: 'text',
      description: 'Label text for the radio button',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the radio',
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
      description: 'Whether the radio is checked/selected',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Whether the radio is required for form validation',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    error: {
      control: 'boolean',
      description: 'Whether the radio is in error state',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    // 5. Form
    name: {
      control: 'text',
      description: 'Form field name (radios with same name form a group)',
      table: {
        category: 'Form',
        type: { summary: 'string' }
      }
    },
    value: {
      control: 'text',
      description: 'Value when selected',
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
    disabled: false,
    required: false,
    error: false,
    value: 'on',
    label: 'Select this option',
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
 * Default radio button with label.
 */
export const Default: Story = {
  args: {
    label: 'Select this option'
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
        <h4 style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Solid (default)
        </h4>
        <sando-radio variant="solid" label="Unchecked" name="variant-solid-demo"></sando-radio>
        <sando-radio
          variant="solid"
          label="Checked"
          name="variant-solid-demo-2"
          checked
        ></sando-radio>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <h4 style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Outline
        </h4>
        <sando-radio variant="outline" label="Unchecked" name="variant-outline-demo"></sando-radio>
        <sando-radio
          variant="outline"
          label="Checked"
          name="variant-outline-demo-2"
          checked
        ></sando-radio>
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
      <sando-radio size="sm" label="Small" name="sizes-demo-1" checked></sando-radio>
      <sando-radio size="md" label="Medium" name="sizes-demo-2" checked></sando-radio>
      <sando-radio size="lg" label="Large" name="sizes-demo-3" checked></sando-radio>
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
      <sando-radio label="Default (unchecked)" name="states-default"></sando-radio>
      <sando-radio label="Checked" name="states-checked" checked></sando-radio>
      <sando-radio label="Disabled" name="states-disabled" disabled></sando-radio>
      <sando-radio
        label="Disabled + Checked"
        name="states-disabled-checked"
        disabled
        checked
      ></sando-radio>
      <sando-radio label="Error" name="states-error" error></sando-radio>
      <sando-radio label="Required" name="states-required" required></sando-radio>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Radio with helper text for additional context.
 */
export const WithHelperText: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <sando-radio
        name="helper-1"
        label="Standard shipping"
        helper-text="Free delivery in 5-7 business days."
      ></sando-radio>
      <sando-radio
        name="helper-2"
        label="Express shipping"
        helper-text="Delivery in 1-2 business days for an additional fee."
        checked
      ></sando-radio>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Radio with error state and error message.
 */
export const WithErrorText: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <sando-radio
        name="error-1"
        label="Payment method"
        error
        error-text="Please select a payment method to continue."
      ></sando-radio>
      <sando-radio
        name="error-2"
        label="Shipping address"
        error
        error-text="A shipping address is required."
        checked
      ></sando-radio>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Radio group demonstrating mutual exclusion behavior.
 * Only one radio in a group with the same name can be selected at a time.
 */
export const RadioGroup: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <fieldset
      style="border: 1px solid var(--sando-color-border-default); border-radius: 8px; padding: 1.5rem; max-width: 400px;"
    >
      <legend style="font-weight: 600; padding: 0 0.5rem;">Select a plan</legend>
      <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
        <sando-radio
          name="plan"
          value="free"
          label="Free Plan"
          helper-text="Basic features, up to 5 projects"
        ></sando-radio>
        <sando-radio
          name="plan"
          value="pro"
          label="Pro Plan"
          helper-text="All features, unlimited projects"
          checked
        ></sando-radio>
        <sando-radio
          name="plan"
          value="enterprise"
          label="Enterprise Plan"
          helper-text="Custom solutions, dedicated support"
        ></sando-radio>
      </div>
    </fieldset>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Multiple radio groups in a form.
 */
export const MultipleGroups: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 500px;">
      <!-- Shipping Method Group -->
      <fieldset
        style="border: 1px solid var(--sando-color-border-default); border-radius: 8px; padding: 1.5rem;"
      >
        <legend style="font-weight: 600; padding: 0 0.5rem;">Shipping Method</legend>
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
          <sando-radio
            name="shipping"
            value="standard"
            label="Standard Shipping"
            helper-text="5-7 business days (Free)"
            checked
          ></sando-radio>
          <sando-radio
            name="shipping"
            value="express"
            label="Express Shipping"
            helper-text="1-2 business days ($9.99)"
          ></sando-radio>
          <sando-radio
            name="shipping"
            value="overnight"
            label="Overnight Shipping"
            helper-text="Next business day ($24.99)"
          ></sando-radio>
        </div>
      </fieldset>

      <!-- Payment Method Group -->
      <fieldset
        style="border: 1px solid var(--sando-color-border-default); border-radius: 8px; padding: 1.5rem;"
      >
        <legend style="font-weight: 600; padding: 0 0.5rem;">Payment Method</legend>
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
          <sando-radio
            name="payment"
            value="card"
            label="Credit Card"
            helper-text="Visa, Mastercard, Amex"
            checked
          ></sando-radio>
          <sando-radio
            name="payment"
            value="paypal"
            label="PayPal"
            helper-text="Pay with your PayPal account"
          ></sando-radio>
          <sando-radio
            name="payment"
            value="bank"
            label="Bank Transfer"
            helper-text="Direct bank transfer (may take 2-3 days)"
          ></sando-radio>
        </div>
      </fieldset>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Display radio buttons across different flavor themes.
 */
export const Flavors: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Original flavor -->
      <div
        flavor="original"
        style="padding: 1rem; border-radius: 8px; background: var(--sando-color-background-base);"
      >
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Original
        </h4>
        <div style="display: flex; gap: 2rem;">
          <sando-radio name="flavor-original" label="Option A" checked></sando-radio>
          <sando-radio name="flavor-original" label="Option B"></sando-radio>
        </div>
      </div>

      <!-- Strawberry flavor -->
      <div
        flavor="strawberry"
        style="padding: 1rem; border-radius: 8px; background: var(--sando-color-background-base);"
      >
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Strawberry
        </h4>
        <div style="display: flex; gap: 2rem;">
          <sando-radio name="flavor-strawberry" label="Option A" checked></sando-radio>
          <sando-radio name="flavor-strawberry" label="Option B"></sando-radio>
        </div>
      </div>

      <!-- Tonkatsu flavor -->
      <div
        flavor="tonkatsu"
        style="padding: 1rem; border-radius: 8px; background: var(--sando-color-background-base);"
      >
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Tonkatsu
        </h4>
        <div style="display: flex; gap: 2rem;">
          <sando-radio name="flavor-tonkatsu" label="Option A" checked></sando-radio>
          <sando-radio name="flavor-tonkatsu" label="Option B"></sando-radio>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Radio inside a form with submit button (interactive demo).
 */
export const FormIntegration: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <form
      @submit=${(e: Event) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const selectedPlan = formData.get('subscription');
        const selectedBilling = formData.get('billing');
        alert(
          `Form submitted!\nPlan: ${selectedPlan || 'None selected'}\nBilling: ${selectedBilling || 'None selected'}`
        );
      }}
      style="max-width: 400px; display: flex; flex-direction: column; gap: 1.5rem;"
    >
      <fieldset
        style="border: 1px solid var(--sando-color-border-default); border-radius: 8px; padding: 1rem;"
      >
        <legend style="font-weight: 600; padding: 0 0.5rem;">Subscription Plan</legend>
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
          <sando-radio
            name="subscription"
            value="monthly"
            label="Monthly ($9.99/mo)"
            required
          ></sando-radio>
          <sando-radio
            name="subscription"
            value="annual"
            label="Annual ($99.99/yr - Save 17%)"
            required
          ></sando-radio>
        </div>
      </fieldset>

      <fieldset
        style="border: 1px solid var(--sando-color-border-default); border-radius: 8px; padding: 1rem;"
      >
        <legend style="font-weight: 600; padding: 0 0.5rem;">Billing Cycle</legend>
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem;">
          <sando-radio
            name="billing"
            value="start"
            label="Bill at start of period"
            checked
          ></sando-radio>
          <sando-radio name="billing" value="end" label="Bill at end of period"></sando-radio>
        </div>
      </fieldset>

      <div style="display: flex; gap: 1rem;">
        <button
          type="submit"
          style="padding: 12px 24px; background: var(--sando-color-action-solid-background-default); color: var(--sando-color-action-solid-text-default); border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; font-weight: 500;"
        >
          Subscribe
        </button>
        <button
          type="reset"
          style="padding: 12px 24px; background: transparent; color: var(--sando-color-text-muted); border: 1px solid var(--sando-color-border-default); border-radius: 6px; cursor: pointer; font-size: 1rem;"
        >
          Reset
        </button>
      </div>
    </form>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Complete showcase of all radio features.
 */
export const AllExamples: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2.5rem;">
      <!-- Variants -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Variants</h3>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          <sando-radio variant="solid" label="Solid" name="all-variant-1" checked></sando-radio>
          <sando-radio variant="outline" label="Outline" name="all-variant-2" checked></sando-radio>
        </div>
      </section>

      <!-- Sizes -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Sizes</h3>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: center;">
          <sando-radio size="sm" label="Small" name="all-size-1" checked></sando-radio>
          <sando-radio size="md" label="Medium" name="all-size-2" checked></sando-radio>
          <sando-radio size="lg" label="Large" name="all-size-3" checked></sando-radio>
        </div>
      </section>

      <!-- States -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">States</h3>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          <sando-radio label="Unchecked" name="all-state-1"></sando-radio>
          <sando-radio label="Checked" name="all-state-2" checked></sando-radio>
          <sando-radio label="Disabled" name="all-state-3" disabled></sando-radio>
          <sando-radio label="Error" name="all-state-4" error></sando-radio>
        </div>
      </section>

      <!-- Radio Group -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Radio Group (Mutual Exclusion)</h3>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <sando-radio name="all-group" value="a" label="Option A" checked></sando-radio>
          <sando-radio name="all-group" value="b" label="Option B"></sando-radio>
          <sando-radio name="all-group" value="c" label="Option C"></sando-radio>
        </div>
      </section>

      <!-- With Helper Text -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">With Helper Text</h3>
        <sando-radio
          name="all-helper"
          label="Enable dark mode"
          helper-text="Switch to dark theme for better readability at night."
          checked
        ></sando-radio>
      </section>

      <!-- With Error -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">With Error</h3>
        <sando-radio
          name="all-error"
          label="Accept privacy policy"
          error
          error-text="You must select an option to continue."
        ></sando-radio>
      </section>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
