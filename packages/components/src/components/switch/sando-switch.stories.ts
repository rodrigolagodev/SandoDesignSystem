import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-switch.js';

/**
 * # Switch Component
 *
 * A fully accessible toggle switch component for on/off states.
 * Uses role="switch" for proper ARIA semantics, distinguishing it from a checkbox.
 *
 * ## Features
 * - **2 Variants**: solid, outline
 * - **3 Sizes**: sm, md, lg
 * - **States**: checked, disabled, error, required
 * - **Helper/Error Text**: Contextual messaging below switch
 * - **Form Integration**: Works with native form validation
 *
 * ## Accessibility
 * - Full keyboard navigation (Space/Enter to toggle)
 * - ARIA role="switch" for proper semantics
 * - Visible focus indicators
 * - Error states announced via role="alert"
 * - Focus delegation to internal input element
 */
const meta: Meta = {
  title: 'Components/Switch',
  component: 'sando-switch',
  tags: ['autodocs'],
  render: (args) => html`
    <sando-switch
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
    ></sando-switch>
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
      description: 'Size of the switch',
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' }
      }
    },
    // 3. Content
    label: {
      control: 'text',
      description: 'Label text for the switch',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the switch',
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
      description: 'Whether the switch is on',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Whether the switch is required for form validation',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    error: {
      control: 'boolean',
      description: 'Whether the switch is in error state',
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
    disabled: false,
    required: false,
    error: false,
    value: 'on',
    label: 'Enable notifications',
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
 * Default switch with label.
 */
export const Default: Story = {
  args: {
    label: 'Enable notifications'
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
 * Solid vs Outline variant comparison.
 */
export const Variants: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <h4 style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Solid (default)
        </h4>
        <sando-switch variant="solid" label="Unchecked"></sando-switch>
        <sando-switch variant="solid" label="Checked" checked></sando-switch>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <h4 style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Outline
        </h4>
        <sando-switch variant="outline" label="Unchecked"></sando-switch>
        <sando-switch variant="outline" label="Checked" checked></sando-switch>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All size options comparison (sm, md, lg).
 */
export const Sizes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: center;">
      <sando-switch size="sm" label="Small" checked></sando-switch>
      <sando-switch size="md" label="Medium" checked></sando-switch>
      <sando-switch size="lg" label="Large" checked></sando-switch>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All interactive states shown together.
 */
export const States: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sando-switch label="Default (unchecked)"></sando-switch>
      <sando-switch label="Checked" checked></sando-switch>
      <sando-switch label="Disabled" disabled></sando-switch>
      <sando-switch label="Disabled + Checked" disabled checked></sando-switch>
      <sando-switch label="Error" error></sando-switch>
      <sando-switch label="Error + Checked" error checked></sando-switch>
      <sando-switch label="Required" required></sando-switch>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Switch with helper text for additional context.
 */
export const WithHelperText: Story = {
  tags: DOCS_ONLY,
  args: {
    label: 'Dark mode',
    helperText: 'Enable dark theme for better readability at night.'
  }
};

/**
 * Switch with error state and error message.
 */
export const WithErrorText: Story = {
  tags: DOCS_ONLY,
  args: {
    label: 'Accept terms',
    error: true,
    errorText: 'You must accept the terms to continue.'
  }
};

/**
 * Required switch with asterisk indicator.
 */
export const Required: Story = {
  tags: DOCS_ONLY,
  args: {
    label: 'I agree to the Privacy Policy',
    required: true,
    helperText: 'This field is required to proceed.'
  }
};

/**
 * Switch inside a form demonstrating form integration.
 */
export const FormIntegration: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <form
      @submit=${(e: Event) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const notifications = formData.get('notifications');
        const marketing = formData.get('marketing');
        const darkMode = formData.get('darkMode');
        alert(
          `Form submitted!\nNotifications: ${notifications ? 'On' : 'Off'}\nMarketing: ${marketing ? 'On' : 'Off'}\nDark Mode: ${darkMode ? 'On' : 'Off'}`
        );
      }}
      style="max-width: 400px; display: flex; flex-direction: column; gap: 1.5rem;"
    >
      <fieldset
        style="border: 1px solid var(--sando-color-border-default); border-radius: 8px; padding: 1.5rem;"
      >
        <legend style="font-weight: 600; padding: 0 0.5rem;">Notification Settings</legend>
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
          <sando-switch
            name="notifications"
            value="enabled"
            label="Push notifications"
            helper-text="Receive push notifications for important updates."
            checked
          ></sando-switch>
          <sando-switch
            name="marketing"
            value="enabled"
            label="Marketing emails"
            helper-text="Receive promotional offers and news."
          ></sando-switch>
          <sando-switch
            name="darkMode"
            value="enabled"
            label="Dark mode"
            helper-text="Enable dark theme for better readability at night."
          ></sando-switch>
        </div>
      </fieldset>
      <div style="display: flex; gap: 1rem;">
        <button
          type="submit"
          style="padding: 12px 24px; background: var(--sando-color-action-solid-background-default); color: var(--sando-color-action-solid-text-default); border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; font-weight: 500;"
        >
          Save Settings
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
 * Complete showcase of all switch features.
 */
export const AllExamples: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2.5rem;">
      <!-- Variants -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Variants</h3>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          <sando-switch variant="solid" label="Solid" checked></sando-switch>
          <sando-switch variant="outline" label="Outline" checked></sando-switch>
        </div>
      </section>

      <!-- Sizes -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Sizes</h3>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: center;">
          <sando-switch size="sm" label="Small" checked></sando-switch>
          <sando-switch size="md" label="Medium" checked></sando-switch>
          <sando-switch size="lg" label="Large" checked></sando-switch>
        </div>
      </section>

      <!-- States -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">States</h3>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          <sando-switch label="Unchecked"></sando-switch>
          <sando-switch label="Checked" checked></sando-switch>
          <sando-switch label="Disabled" disabled></sando-switch>
          <sando-switch label="Error" error></sando-switch>
        </div>
      </section>

      <!-- With Helper Text -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">With Helper Text</h3>
        <sando-switch
          label="Auto-save"
          helper-text="Automatically save changes as you type."
          checked
        ></sando-switch>
      </section>

      <!-- With Error -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">With Error</h3>
        <sando-switch
          label="Accept terms"
          error
          error-text="You must accept the terms to continue."
        ></sando-switch>
      </section>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Display switch across different flavor themes.
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
          <sando-switch label="Off"></sando-switch>
          <sando-switch label="On" checked></sando-switch>
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
          <sando-switch label="Off"></sando-switch>
          <sando-switch label="On" checked></sando-switch>
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
          <sando-switch label="Off"></sando-switch>
          <sando-switch label="On" checked></sando-switch>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
