import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

import './sando-radio-group.js';
import '../radio/sando-radio.js';
import '../form-group/sando-form-group.js';

import type { SandoRadioGroupProps } from './sando-radio-group.types.js';

/**
 * # Radio Group Component
 *
 * A container that groups sando-radio elements with proper ARIA radiogroup semantics,
 * roving tabindex for keyboard navigation, and shared label/helper/error support.
 *
 * ## Features
 * - **2 Orientations**: vertical (default), horizontal
 * - **States**: disabled, error, required
 * - **Helper/Error Text**: Contextual messaging below group
 * - **Keyboard Navigation**: Arrow keys with roving tabindex (per WAI-ARIA)
 * - **Form Integration**: Works with native form validation
 *
 * ## Accessibility
 * - Proper `role="radiogroup"` with `aria-labelledby`
 * - Roving tabindex for keyboard navigation (Arrow keys move and select)
 * - Error states announced via `role="alert"` and `aria-live="polite"`
 * - Required state indicated visually and via `aria-required`
 * - Disabled state propagates to child radios
 */
const meta: Meta<SandoRadioGroupProps> = {
  title: 'Components/Radio Group',
  component: 'sando-radio-group',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-radio-group
      name="${args.name}"
      label="${args.label || ''}"
      value="${args.value || ''}"
      helper-text="${args.helperText || ''}"
      error-text="${args.errorText || ''}"
      orientation="${args.orientation}"
      flavor="${args.flavor || 'original'}"
      ?required="${args.required}"
      ?disabled="${args.disabled}"
      ?error="${args.error}"
      @sando-change="${action('sando-change')}"
    >
      <sando-radio value="option1" label="Option 1"></sando-radio>
      <sando-radio value="option2" label="Option 2"></sando-radio>
      <sando-radio value="option3" label="Option 3"></sando-radio>
    </sando-radio-group>
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
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation of the radio group',
      table: {
        category: 'Appearance',
        type: { summary: "'vertical' | 'horizontal'" },
        defaultValue: { summary: 'vertical' }
      }
    },
    // 3. Content
    label: {
      control: 'text',
      description: 'Group label text',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the group',
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
    value: {
      control: 'text',
      description: 'Currently selected value',
      table: {
        category: 'State',
        type: { summary: 'string' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the entire group is disabled',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Whether a selection is required',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    error: {
      control: 'boolean',
      description: 'Whether the group is in error state',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    // 5. Form
    name: {
      control: 'text',
      description: 'Name attribute for all child radios (auto-propagated)',
      table: {
        category: 'Form',
        type: { summary: 'string' }
      }
    }
  },
  args: {
    name: 'demo-group',
    label: 'Select an option',
    orientation: 'vertical',
    disabled: false,
    required: false,
    error: false,
    flavor: 'original'
  }
};

export default meta;
type Story = StoryObj<SandoRadioGroupProps>;

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default radio group with three options.
 */
export const Default: Story = {
  args: {
    name: 'default-group',
    label: 'Select an option'
  }
};

/**
 * Interactive playground - use controls to customize.
 */
export const Playground: Story = {
  args: {
    name: 'playground-group',
    label: 'Customize me!'
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * Radio group with a visible label.
 */
export const WithLabel: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-radio-group name="label-demo" label="Choose your favorite color">
      <sando-radio value="red" label="Red"></sando-radio>
      <sando-radio value="green" label="Green"></sando-radio>
      <sando-radio value="blue" label="Blue"></sando-radio>
    </sando-radio-group>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Radio group with helper text providing additional context.
 */
export const WithHelperText: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-radio-group
      name="helper-demo"
      label="Notification preferences"
      helper-text="Choose how you'd like to receive updates from us."
    >
      <sando-radio value="email" label="Email notifications"></sando-radio>
      <sando-radio value="sms" label="SMS notifications"></sando-radio>
      <sando-radio value="push" label="Push notifications"></sando-radio>
    </sando-radio-group>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Radio group in error state with error message.
 */
export const WithError: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-radio-group
      name="error-demo"
      label="Select a plan"
      error
      error-text="Please select a subscription plan to continue."
    >
      <sando-radio value="free" label="Free Plan"></sando-radio>
      <sando-radio value="pro" label="Pro Plan"></sando-radio>
      <sando-radio value="enterprise" label="Enterprise Plan"></sando-radio>
    </sando-radio-group>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Radio group with required indicator.
 */
export const Required: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-radio-group
      name="required-demo"
      label="Payment method"
      required
      helper-text="Select how you would like to pay."
    >
      <sando-radio value="card" label="Credit Card"></sando-radio>
      <sando-radio value="paypal" label="PayPal"></sando-radio>
      <sando-radio value="bank" label="Bank Transfer"></sando-radio>
    </sando-radio-group>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Disabled radio group - all child radios are disabled.
 */
export const Disabled: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-radio-group name="disabled-demo" label="Shipping method" disabled value="standard">
      <sando-radio value="standard" label="Standard Shipping"></sando-radio>
      <sando-radio value="express" label="Express Shipping"></sando-radio>
      <sando-radio value="overnight" label="Overnight Shipping"></sando-radio>
    </sando-radio-group>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Horizontal orientation for inline layouts.
 */
export const Horizontal: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-radio-group name="horizontal-demo" label="Gender" orientation="horizontal">
      <sando-radio value="male" label="Male"></sando-radio>
      <sando-radio value="female" label="Female"></sando-radio>
      <sando-radio value="other" label="Other"></sando-radio>
    </sando-radio-group>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Radio group with a pre-selected value.
 */
export const PreSelected: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-radio-group name="preselected-demo" label="Preferred contact time" value="afternoon">
      <sando-radio value="morning" label="Morning (9am - 12pm)"></sando-radio>
      <sando-radio value="afternoon" label="Afternoon (12pm - 5pm)"></sando-radio>
      <sando-radio value="evening" label="Evening (5pm - 8pm)"></sando-radio>
    </sando-radio-group>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Showcasing different radio sizes within a group.
 */
export const Sizes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Small -->
      <sando-radio-group name="sizes-sm" label="Small size (sm)">
        <sando-radio value="a" label="Option A" size="sm"></sando-radio>
        <sando-radio value="b" label="Option B" size="sm"></sando-radio>
        <sando-radio value="c" label="Option C" size="sm"></sando-radio>
      </sando-radio-group>

      <!-- Medium (default) -->
      <sando-radio-group name="sizes-md" label="Medium size (md)">
        <sando-radio value="a" label="Option A" size="md"></sando-radio>
        <sando-radio value="b" label="Option B" size="md"></sando-radio>
        <sando-radio value="c" label="Option C" size="md"></sando-radio>
      </sando-radio-group>

      <!-- Large -->
      <sando-radio-group name="sizes-lg" label="Large size (lg)">
        <sando-radio value="a" label="Option A" size="lg"></sando-radio>
        <sando-radio value="b" label="Option B" size="lg"></sando-radio>
        <sando-radio value="c" label="Option C" size="lg"></sando-radio>
      </sando-radio-group>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Comparing solid and outline radio variants within groups.
 */
export const Variants: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Solid variant -->
      <sando-radio-group name="variants-solid" label="Solid variant (default)">
        <sando-radio value="a" label="Option A" variant="solid" checked></sando-radio>
        <sando-radio value="b" label="Option B" variant="solid"></sando-radio>
        <sando-radio value="c" label="Option C" variant="solid"></sando-radio>
      </sando-radio-group>

      <!-- Outline variant -->
      <sando-radio-group name="variants-outline" label="Outline variant">
        <sando-radio value="a" label="Option A" variant="outline" checked></sando-radio>
        <sando-radio value="b" label="Option B" variant="outline"></sando-radio>
        <sando-radio value="c" label="Option C" variant="outline"></sando-radio>
      </sando-radio-group>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Radio group inside a form-group component (composition pattern).
 */
export const WithFormGroup: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <form style="max-width: 500px;">
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- Text input in form-group -->
        <sando-form-group label="Full Name" required>
          <input type="text" placeholder="Enter your name" />
        </sando-form-group>

        <!-- Radio group standalone (has its own label) -->
        <sando-radio-group
          name="subscription"
          label="Subscription Plan"
          required
          helper-text="Choose the plan that best fits your needs."
        >
          <sando-radio value="monthly" label="Monthly - $9.99/mo"></sando-radio>
          <sando-radio value="annual" label="Annual - $99.99/yr (Save 17%)"></sando-radio>
          <sando-radio value="lifetime" label="Lifetime - $299.99 (One-time)"></sando-radio>
        </sando-radio-group>

        <!-- Radio group for billing cycle -->
        <sando-radio-group
          name="billing"
          label="Billing Cycle"
          orientation="horizontal"
          value="start"
        >
          <sando-radio value="start" label="Bill at start"></sando-radio>
          <sando-radio value="end" label="Bill at end"></sando-radio>
        </sando-radio-group>

        <!-- Submit button -->
        <button
          type="submit"
          style="padding: 12px 24px; background: var(--sando-color-action-solid-background-default); color: var(--sando-color-action-solid-text-default); border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; font-weight: 500; width: fit-content;"
        >
          Subscribe
        </button>
      </div>
    </form>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All states comparison for documentation.
 */
export const AllStates: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Default -->
      <sando-radio-group name="states-default" label="Default">
        <sando-radio value="a" label="Option A"></sando-radio>
        <sando-radio value="b" label="Option B"></sando-radio>
      </sando-radio-group>

      <!-- With selection -->
      <sando-radio-group name="states-selected" label="With Selection" value="a">
        <sando-radio value="a" label="Option A (selected)"></sando-radio>
        <sando-radio value="b" label="Option B"></sando-radio>
      </sando-radio-group>

      <!-- Required -->
      <sando-radio-group name="states-required" label="Required" required>
        <sando-radio value="a" label="Option A"></sando-radio>
        <sando-radio value="b" label="Option B"></sando-radio>
      </sando-radio-group>

      <!-- With helper text -->
      <sando-radio-group
        name="states-helper"
        label="With Helper Text"
        helper-text="Additional context for the user."
      >
        <sando-radio value="a" label="Option A"></sando-radio>
        <sando-radio value="b" label="Option B"></sando-radio>
      </sando-radio-group>

      <!-- Error state -->
      <sando-radio-group
        name="states-error"
        label="Error State"
        error
        error-text="Please make a selection."
      >
        <sando-radio value="a" label="Option A"></sando-radio>
        <sando-radio value="b" label="Option B"></sando-radio>
      </sando-radio-group>

      <!-- Disabled -->
      <sando-radio-group name="states-disabled" label="Disabled" disabled value="a">
        <sando-radio value="a" label="Option A (selected)"></sando-radio>
        <sando-radio value="b" label="Option B"></sando-radio>
      </sando-radio-group>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Display radio groups across different flavor themes.
 */
export const Flavors: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Original flavor -->
      <div
        flavor="original"
        style="padding: 1.5rem; border-radius: 8px; background: var(--sando-color-background-base);"
      >
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Original
        </h4>
        <sando-radio-group name="flavor-original" label="Select option" orientation="horizontal">
          <sando-radio value="a" label="Option A" checked></sando-radio>
          <sando-radio value="b" label="Option B"></sando-radio>
        </sando-radio-group>
      </div>

      <!-- Strawberry flavor -->
      <div
        flavor="strawberry"
        style="padding: 1.5rem; border-radius: 8px; background: var(--sando-color-background-base);"
      >
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Strawberry
        </h4>
        <sando-radio-group name="flavor-strawberry" label="Select option" orientation="horizontal">
          <sando-radio value="a" label="Option A" checked></sando-radio>
          <sando-radio value="b" label="Option B"></sando-radio>
        </sando-radio-group>
      </div>

      <!-- Tonkatsu flavor -->
      <div
        flavor="tonkatsu"
        style="padding: 1.5rem; border-radius: 8px; background: var(--sando-color-background-base);"
      >
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Tonkatsu
        </h4>
        <sando-radio-group name="flavor-tonkatsu" label="Select option" orientation="horizontal">
          <sando-radio value="a" label="Option A" checked></sando-radio>
          <sando-radio value="b" label="Option B"></sando-radio>
        </sando-radio-group>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Complete showcase of all radio group features.
 */
export const AllExamples: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2.5rem;">
      <!-- Orientations -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Orientations</h3>
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <sando-radio-group name="ex-vertical" label="Vertical (default)" value="a">
            <sando-radio value="a" label="Option A"></sando-radio>
            <sando-radio value="b" label="Option B"></sando-radio>
            <sando-radio value="c" label="Option C"></sando-radio>
          </sando-radio-group>

          <sando-radio-group
            name="ex-horizontal"
            label="Horizontal"
            orientation="horizontal"
            value="a"
          >
            <sando-radio value="a" label="Option A"></sando-radio>
            <sando-radio value="b" label="Option B"></sando-radio>
            <sando-radio value="c" label="Option C"></sando-radio>
          </sando-radio-group>
        </div>
      </section>

      <!-- States -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">States</h3>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          <sando-radio-group name="ex-required" label="Required" required>
            <sando-radio value="a" label="Option A"></sando-radio>
            <sando-radio value="b" label="Option B"></sando-radio>
          </sando-radio-group>

          <sando-radio-group name="ex-disabled" label="Disabled" disabled value="a">
            <sando-radio value="a" label="Option A"></sando-radio>
            <sando-radio value="b" label="Option B"></sando-radio>
          </sando-radio-group>

          <sando-radio-group name="ex-error" label="Error" error error-text="Selection required">
            <sando-radio value="a" label="Option A"></sando-radio>
            <sando-radio value="b" label="Option B"></sando-radio>
          </sando-radio-group>
        </div>
      </section>

      <!-- With Helper/Error Text -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">With Helper/Error Text</h3>
        <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
          <sando-radio-group
            name="ex-helper"
            label="With Helper Text"
            helper-text="This provides additional context for the selection."
          >
            <sando-radio value="a" label="Option A"></sando-radio>
            <sando-radio value="b" label="Option B"></sando-radio>
          </sando-radio-group>

          <sando-radio-group
            name="ex-error-msg"
            label="With Error Message"
            error
            error-text="Please select an option to continue."
          >
            <sando-radio value="a" label="Option A"></sando-radio>
            <sando-radio value="b" label="Option B"></sando-radio>
          </sando-radio-group>
        </div>
      </section>

      <!-- Real-world example -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Real-World Example</h3>
        <sando-radio-group
          name="ex-realworld"
          label="Shipping Method"
          required
          helper-text="Select your preferred shipping option."
          value="standard"
          style="max-width: 400px;"
        >
          <sando-radio value="standard" label="Standard Shipping (5-7 days) - Free"></sando-radio>
          <sando-radio value="express" label="Express Shipping (2-3 days) - $9.99"></sando-radio>
          <sando-radio value="overnight" label="Overnight Shipping (1 day) - $24.99"></sando-radio>
        </sando-radio-group>
      </section>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
