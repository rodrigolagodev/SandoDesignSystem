import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import './sando-form.js';
import '../input/sando-input.js';
import '../button/sando-button.js';
import '../checkbox/sando-checkbox.js';
import '../select/sando-select.js';
import '../textarea/sando-textarea.js';
import '../radio-group/sando-radio-group.js';
import '../radio/sando-radio.js';
import '../badge/sando-badge.js';
import type { SandoForm } from './sando-form.js';
import type { FormSubmitEventDetail, FormInvalidEventDetail } from './sando-form.types.js';

/**
 * # Form Component
 *
 * A smart form wrapper that handles form submission, validation coordination,
 * and provides easy access to form data. Renders a native `<form>` element
 * for progressive enhancement and accessibility.
 *
 * ## Features
 *
 * - **Smart data collection**: Automatically collects values from all named form controls
 * - **Validation coordination**: Validates all fields before submission
 * - **Loading state**: Disables all child controls when `loading` is true
 * - **Progressive enhancement**: Uses native `<form>` with optional action/method
 * - **Event-driven**: Emits `sando-submit`, `sando-invalid`, and `sando-reset` events
 *
 * ## Usage
 *
 * ```html
 * <sando-form @sando-submit=${handleSubmit}>
 *   <sando-input name="email" label="Email" required></sando-input>
 *   <sando-button type="submit">Submit</sando-button>
 * </sando-form>
 * ```
 */
const meta: Meta = {
  title: 'Components/Form',
  component: 'sando-form',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-form
      flavor="${args.flavor || 'original'}"
      name="${ifDefined(args.name)}"
      action="${ifDefined(args.action)}"
      method="${args.method || 'post'}"
      ?loading="${args.loading}"
      ?novalidate="${args.novalidate}"
      @sando-submit="${action('sando-submit')}"
      @sando-invalid="${action('sando-invalid')}"
      @sando-reset="${action('sando-reset')}"
    >
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <sando-input name="email" label="Email" type="email" required></sando-input>
        <sando-input name="password" label="Password" type="password" required></sando-input>
        <div style="display: flex; gap: 8px;">
          <sando-button type="submit" variant="solid">Submit</sando-button>
          <sando-button type="reset" variant="outline">Reset</sando-button>
        </div>
      </div>
    </sando-form>
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
    // 2. Form attributes
    name: {
      control: 'text',
      description: 'Form name attribute',
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    action: {
      control: 'text',
      description: 'Form action URL (for progressive enhancement)',
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    method: {
      control: 'select',
      options: ['get', 'post'],
      description: 'Form method',
      table: {
        category: 'Attributes',
        type: { summary: "'get' | 'post'" },
        defaultValue: { summary: "'post'" }
      }
    },
    enctype: {
      control: 'select',
      options: ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'],
      description: 'Form encoding type for file uploads',
      table: {
        category: 'Attributes',
        type: {
          summary: "'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'"
        },
        defaultValue: { summary: 'undefined' }
      }
    },
    // 3. State
    loading: {
      control: 'boolean',
      description: 'When true, disables all child form controls',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    novalidate: {
      control: 'boolean',
      description: 'Skip native HTML validation',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
    // Note: Events (sando-submit, sando-invalid, sando-reset) are handled via
    // action() handlers in render functions, not as argTypes (Web Components pattern)
  },
  args: {
    flavor: 'original',
    loading: false,
    novalidate: false,
    method: 'post'
  }
};

export default meta;
type Story = StoryObj;

// Action handlers for Storybook Actions panel (used in custom render stories)
const onSandoSubmit = action('sando-submit');
const onSandoInvalid = action('sando-invalid');

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default form with basic inputs
 */
export const Default: Story = {};

/**
 * Interactive playground to explore all properties
 */
export const Playground: Story = {
  args: {
    name: 'login-form'
  }
};

/**
 * Form in loading state - all controls disabled
 */
export const LoadingState: Story = {
  args: {
    loading: true
  },
  render: (args) => html`
    <sando-form
      flavor="${args.flavor || 'original'}"
      ?loading="${args.loading}"
      ?novalidate="${args.novalidate}"
      @sando-submit="${onSandoSubmit}"
    >
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <sando-input name="email" label="Email" value="user@example.com"></sando-input>
        <sando-input
          name="password"
          label="Password"
          type="password"
          value="********"
        ></sando-input>
        <sando-button type="submit">Submitting...</sando-button>
      </div>
    </sando-form>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'When `loading` is true, all child form controls are automatically disabled and a visual overlay indicates the loading state.'
      }
    }
  }
};

/**
 * Form with validation
 */
export const WithValidation: Story = {
  render: (args) => html`
    <sando-form
      flavor="${args.flavor || 'original'}"
      ?loading="${args.loading}"
      ?novalidate="${args.novalidate}"
      @sando-submit="${onSandoSubmit}"
      @sando-invalid="${onSandoInvalid}"
    >
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <sando-input
          name="email"
          label="Email"
          type="email"
          required
          helper-text="Required field"
          error-text="Please enter a valid email"
        ></sando-input>
        <sando-input
          name="age"
          label="Age"
          type="number"
          min="18"
          max="120"
          helper-text="Must be 18 or older"
          error-text="Age must be between 18 and 120"
        ></sando-input>
        <sando-button type="submit">Submit</sando-button>
      </div>
    </sando-form>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'The form validates all child controls before submission. If validation fails, it emits `sando-invalid` with detailed error information and automatically sets `error=true` on invalid Sando controls to show visual feedback.'
      }
    }
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * Complete login form example
 */
export const LoginForm: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-form @sando-submit="${onSandoSubmit}">
      <div
        style="display: flex; flex-direction: column; gap: 20px; max-width: 360px; padding: 24px; border: 1px solid #e5e5e5; border-radius: 8px;"
      >
        <h2 style="margin: 0; font-size: 1.5rem;">Sign In</h2>
        <sando-input name="email" label="Email" type="email" required></sando-input>
        <sando-input name="password" label="Password" type="password" required></sando-input>
        <sando-checkbox name="remember">Remember me</sando-checkbox>
        <sando-button type="submit" variant="solid" style="width: 100%;">Sign In</sando-button>
      </div>
    </sando-form>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Registration form with multiple fields
 */
export const RegistrationForm: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-form @sando-submit="${onSandoSubmit}">
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 500px;">
        <h2 style="margin: 0;">Create Account</h2>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <sando-input name="firstName" label="First Name" required></sando-input>
          <sando-input name="lastName" label="Last Name" required></sando-input>
        </div>

        <sando-input name="email" label="Email" type="email" required></sando-input>
        <sando-input
          name="password"
          label="Password"
          type="password"
          required
          helper-text="Must be at least 8 characters"
        ></sando-input>
        <sando-input
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          required
        ></sando-input>

        <sando-checkbox name="terms" required>
          I agree to the Terms of Service and Privacy Policy
        </sando-checkbox>

        <sando-button type="submit" variant="solid">Create Account</sando-button>
      </div>
    </sando-form>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Form with native HTML elements
 */
export const WithNativeElements: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-form @sando-submit="${onSandoSubmit}">
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <label for="native-name" style="display: block; margin-bottom: 4px;"
            >Name (native input)</label
          >
          <input
            type="text"
            id="native-name"
            name="name"
            style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <div>
          <label for="native-country" style="display: block; margin-bottom: 4px;"
            >Country (native select)</label
          >
          <select
            id="native-country"
            name="country"
            style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
          >
            <option value="">Select a country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
          </select>
        </div>

        <div>
          <label style="display: flex; align-items: center; gap: 8px;">
            <input type="checkbox" name="newsletter" value="yes" />
            Subscribe to newsletter
          </label>
        </div>

        <sando-button type="submit">Submit</sando-button>
      </div>
    </sando-form>
  `,
  parameters: {
    docs: {
      description: {
        story: 'The form works with both Sando components and native HTML form elements.'
      }
    },
    controls: { disable: true }
  }
};

/**
 * Using programmatic methods
 */
export const ProgrammaticMethods: Story = {
  tags: DOCS_ONLY,
  render: () => {
    const handleGetData = () => {
      const form = document.querySelector<SandoForm>('#programmatic-form');
      if (form) {
        const json = form.getJson();
        alert(`Form data:\n${JSON.stringify(json, null, 2)}`);
      }
    };

    const handleValidate = () => {
      const form = document.querySelector<SandoForm>('#programmatic-form');
      if (form) {
        const isValid = form.validate();
        alert(`Form is ${isValid ? 'valid' : 'invalid'}`);
      }
    };

    const handleReset = () => {
      const form = document.querySelector<SandoForm>('#programmatic-form');
      if (form) {
        form.reset();
      }
    };

    return html`
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <sando-form id="programmatic-form" novalidate>
          <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
            <sando-input
              name="email"
              label="Email"
              type="email"
              required
              value="test@example.com"
            ></sando-input>
            <sando-input name="message" label="Message"></sando-input>
          </div>
        </sando-form>

        <div style="display: flex; gap: 8px;">
          <sando-button @click=${handleGetData}>Get Data</sando-button>
          <sando-button @click=${handleValidate}>Validate</sando-button>
          <sando-button @click=${handleReset}>Reset</sando-button>
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `getJson()`, `getFormData()`, `validate()`, `reset()`, and `submit()` methods programmatically.'
      }
    },
    controls: { disable: true }
  }
};

/**
 * Progressive enhancement with action
 */
export const ProgressiveEnhancement: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-form action="/api/contact" method="post" @sando-submit="${onSandoSubmit}">
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <p style="margin: 0; color: #666; font-size: 0.875rem;">
          This form has <code>action="/api/contact"</code> and <code>method="post"</code> for
          progressive enhancement. Without JavaScript, the form would submit normally.
        </p>
        <sando-input name="email" label="Email" type="email" required></sando-input>
        <sando-textarea name="message" label="Message" required></sando-textarea>
        <sando-button type="submit">Send Message</sando-button>
      </div>
    </sando-form>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All form events demonstration
 */
export const FormEvents: Story = {
  tags: DOCS_ONLY,
  render: () => {
    const handleSubmit = (e: CustomEvent<FormSubmitEventDetail>) => {
      const logElement = document.querySelector('#event-log');
      if (logElement) {
        logElement.textContent = `sando-submit: ${JSON.stringify(e.detail.json, null, 2)}`;
      }
    };

    const handleInvalid = (e: CustomEvent<FormInvalidEventDetail>) => {
      const logElement = document.querySelector('#event-log');
      if (logElement) {
        logElement.textContent = `sando-invalid: ${e.detail.errors.map((err) => `${err.name}: ${err.message}`).join(', ')}`;
      }
    };

    const handleReset = () => {
      const logElement = document.querySelector('#event-log');
      if (logElement) {
        logElement.textContent = 'sando-reset: Form was reset';
      }
    };

    return html`
      <div style="display: flex; gap: 24px;">
        <sando-form
          @sando-submit=${handleSubmit}
          @sando-invalid=${handleInvalid}
          @sando-reset=${handleReset}
          style="flex: 1;"
        >
          <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
            <sando-input name="name" label="Name" required></sando-input>
            <sando-input name="email" label="Email" type="email" required></sando-input>
            <div style="display: flex; gap: 8px;">
              <sando-button type="submit">Submit</sando-button>
              <sando-button type="reset" variant="outline">Reset</sando-button>
            </div>
          </div>
        </sando-form>

        <div style="flex: 1; padding: 16px; background: #f5f5f5; border-radius: 8px;">
          <strong>Event Log:</strong>
          <pre id="event-log" style="margin: 8px 0 0; white-space: pre-wrap; font-size: 0.875rem;">
Interact with the form to see events...</pre
          >
        </div>
      </div>
    `;
  },
  parameters: { controls: { disable: true } }
};

/**
 * Demonstrates dirty/pristine state tracking
 */
export const DirtyStateTracking: Story = {
  render: (args) => {
    const updateStatus = () => {
      const form = document.querySelector<SandoForm>('#dirty-form');
      const badge = document.querySelector('#dirty-status');
      if (form && badge) {
        badge.textContent = form.dirty ? 'Unsaved changes' : 'Pristine';
        badge.setAttribute('color', form.dirty ? 'warning' : 'success');
      }
    };

    const handleSave = (e: CustomEvent) => {
      const badge = document.querySelector('#dirty-status');
      const form = document.querySelector<SandoForm>('#dirty-form');

      if (badge) {
        badge.textContent = 'Saved!';
        badge.setAttribute('color', 'success');
      }

      // Mark form as pristine with current values as new initial values
      if (form) {
        form.markAsPristine();

        // Show "saved" message for 2 seconds, then update status
        setTimeout(() => {
          updateStatus();
        }, 2000);
      }

      // Log to actions panel
      onSandoSubmit(e);
    };

    return html`
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <sando-badge
          id="dirty-status"
          color="success"
          variant="soft"
          size="md"
          flavor="${args.flavor || 'original'}"
        >
          Pristine
        </sando-badge>

        <sando-form
          id="dirty-form"
          flavor="${args.flavor || 'original'}"
          ?loading="${args.loading}"
          ?novalidate="${args.novalidate}"
          @sando-submit=${handleSave}
          @sando-change=${updateStatus}
          @sando-reset=${updateStatus}
        >
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <sando-input name="name" label="Name" value="John Doe"></sando-input>
            <sando-input name="email" label="Email" value="john@example.com"></sando-input>
            <div style="display: flex; gap: 8px;">
              <sando-button type="submit">Save Changes</sando-button>
              <sando-button type="reset" variant="outline">Discard</sando-button>
            </div>
          </div>
        </sando-form>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story:
          'The form tracks whether any field has been modified. Use `dirty` and `pristine` properties to show unsaved changes warnings.'
      }
    }
  }
};

/**
 * Custom validation with password confirmation
 */
export const CustomValidation: Story = {
  render: (args) => {
    const handleValidate = (e: CustomEvent) => {
      const { json, addError } = e.detail;

      // Custom validation: passwords must match
      if (json.password !== json.confirmPassword) {
        addError('confirmPassword', 'Passwords do not match');
        e.preventDefault();
      }

      // Custom validation: password strength
      if (json.password && (json.password as string).length < 8) {
        addError('password', 'Password must be at least 8 characters');
        e.preventDefault();
      }
    };

    return html`
      <sando-form
        flavor="${args.flavor || 'original'}"
        ?loading="${args.loading}"
        ?novalidate="${args.novalidate}"
        @sando-submit="${onSandoSubmit}"
        @sando-invalid="${onSandoInvalid}"
        @sando-validate="${handleValidate}"
      >
        <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
          <sando-input
            name="email"
            label="Email"
            type="email"
            required
            error-text="Please enter a valid email"
          ></sando-input>
          <sando-input
            name="password"
            label="Password"
            type="password"
            required
            helper-text="Must be at least 8 characters"
            error-text="Password is required"
          ></sando-input>
          <sando-input
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            required
            error-text="Please confirm your password"
          ></sando-input>
          <sando-button type="submit">Create Account</sando-button>
        </div>
      </sando-form>
    `;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use the `sando-validate` event to add custom validation logic like password confirmation. Call `addError(fieldName, message)` and `e.preventDefault()` to block submission.'
      }
    }
  }
};

/**
 * Form with required checkbox (terms acceptance)
 */
export const RequiredCheckbox: Story = {
  render: (args) => html`
    <sando-form
      flavor="${args.flavor || 'original'}"
      ?loading="${args.loading}"
      ?novalidate="${args.novalidate}"
      @sando-submit="${onSandoSubmit}"
      @sando-invalid="${onSandoInvalid}"
    >
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <sando-input
          name="email"
          label="Email"
          type="email"
          required
          error-text="Email is required"
        ></sando-input>
        <sando-checkbox name="terms" required error-text="You must accept the terms">
          I agree to the Terms of Service and Privacy Policy
        </sando-checkbox>
        <sando-checkbox name="newsletter"> Subscribe to newsletter (optional) </sando-checkbox>
        <sando-button type="submit">Sign Up</sando-button>
      </div>
    </sando-form>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Required checkboxes are properly validated. The form will not submit until the required checkbox is checked.'
      }
    }
  }
};

/**
 * Form with required radio group
 */
export const RadioGroupValidation: Story = {
  render: (args) => html`
    <sando-form
      flavor="${args.flavor || 'original'}"
      ?loading="${args.loading}"
      ?novalidate="${args.novalidate}"
      @sando-submit="${onSandoSubmit}"
      @sando-invalid="${onSandoInvalid}"
    >
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <sando-input name="name" label="Name" required error-text="Name is required"></sando-input>

        <sando-radio-group
          name="plan"
          label="Select a plan"
          required
          error-text="Please select a plan"
        >
          <sando-radio value="free" label="Free - $0/month"></sando-radio>
          <sando-radio value="pro" label="Pro - $9/month"></sando-radio>
          <sando-radio value="enterprise" label="Enterprise - $29/month"></sando-radio>
        </sando-radio-group>

        <sando-button type="submit">Continue</sando-button>
      </div>
    </sando-form>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Radio groups with `required` attribute are validated - at least one option must be selected.'
      }
    }
  }
};
