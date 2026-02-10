import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-label.js';
import '../input/sando-input.js';

// Extended args interface for stories (includes slot content)
interface LabelStoryArgs {
  for?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  weight?: 'normal' | 'medium' | 'semibold';
  helperText?: string;
  tooltip?: string;
  srOnly?: boolean;
  label?: string; // Slot content
}

/**
 * Labels provide text identification for form controls. They use native `<label>`
 * elements for proper accessibility and form association.
 *
 * ## Features
 *
 * - **Native `<label>`**: Proper form association via `for` attribute
 * - **Required/Optional Indicators**: Visual cues for field requirements
 * - **Helper Text**: Additional context below the label
 * - **Tooltip Support**: Info icon with tooltip for extra information
 * - **Screen Reader Only**: Visually hidden but accessible labels
 * - **Size Variants**: sm, md, lg to match form components
 * - **Weight Variants**: normal, medium, semibold
 *
 * ## Accessibility
 *
 * - Uses native `<label>` with `for` attribute for form association
 * - Required indicator is decorative (`aria-hidden="true"`)
 * - Screen reader only mode uses standard visually-hidden pattern
 * - Helper text provides additional context for all users
 */
const meta: Meta<LabelStoryArgs> = {
  title: 'Components/Label',
  component: 'sando-label',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-label
      for=${args.for || ''}
      ?required=${args.required}
      ?optional=${args.optional}
      ?disabled=${args.disabled}
      size=${args.size}
      weight=${args.weight}
      helper-text=${args.helperText || ''}
      tooltip=${args.tooltip || ''}
      ?sr-only=${args.srOnly}
    >
      ${args.label}
    </sando-label>
  `,
  argTypes: {
    for: {
      control: 'text',
      description: 'ID of the associated form element (for native label association)',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Shows required indicator (*) after the label text',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    optional: {
      control: 'boolean',
      description: 'Shows "(optional)" text after the label',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled visual state (reduces visual prominence)',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the label (should match associated form component)',
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' }
      }
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold'],
      description: 'Font weight variant',
      table: {
        category: 'Appearance',
        type: { summary: "'normal' | 'medium' | 'semibold'" },
        defaultValue: { summary: 'medium' }
      }
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the label',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text (shows help icon when provided)',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    srOnly: {
      control: 'boolean',
      description: 'Visually hides the label but keeps it accessible to screen readers',
      table: {
        category: 'Accessibility',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    label: {
      control: 'text',
      description: 'Label text content (default slot)',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    }
  },
  args: {
    size: 'md',
    weight: 'medium',
    required: false,
    optional: false,
    disabled: false,
    srOnly: false,
    label: 'Email Address'
  }
};

export default meta;
type Story = StoryObj<LabelStoryArgs>;

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default label with medium size and medium weight.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 */
export const Playground: Story = {
  args: {
    label: 'Customize me!'
  }
};

// ============================================================================
// WITH FORM ASSOCIATION
// ============================================================================

/**
 * Label associated with an input using the `for` attribute.
 * Clicking the label focuses the input.
 */
export const WithFor: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <sando-label for="email-input">Email Address</sando-label>
      <sando-input id="email-input" type="email" placeholder="you@example.com"></sando-input>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// REQUIRED / OPTIONAL
// ============================================================================

/**
 * Label with required indicator (*).
 * The asterisk is decorative and hidden from screen readers.
 */
export const Required: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sando-label required>Full Name</sando-label>
      <sando-label required>Email Address</sando-label>
      <sando-label required>Password</sando-label>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Label with optional indicator "(optional)".
 * Use to explicitly mark fields that are not required.
 */
export const Optional: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sando-label optional>Nickname</sando-label>
      <sando-label optional>Phone Number</sando-label>
      <sando-label optional>Company Name</sando-label>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// HELPER TEXT
// ============================================================================

/**
 * Label with helper text providing additional context.
 * Helper text appears below the label.
 */
export const WithHelperText: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <sando-label helper-text="We'll never share your email with anyone.">
        Email Address
      </sando-label>
      <sando-label helper-text="Must be at least 8 characters with one number.">
        Password
      </sando-label>
      <sando-label helper-text="Enter your username or email address.">Login</sando-label>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// TOOLTIP
// ============================================================================

/**
 * Label with tooltip icon for additional information.
 * Hover over the icon to see the tooltip.
 */
export const WithTooltip: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <sando-label tooltip="We need this to verify your identity">
        Social Security Number
      </sando-label>
      <sando-label tooltip="Used for shipping and billing purposes">Address</sando-label>
      <sando-label tooltip="Your primary contact number">Phone Number</sando-label>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// SIZES
// ============================================================================

/**
 * All size variants side by side.
 * Sizes should match the associated form component.
 */
export const Sizes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <sando-label size="sm">Small Label</sando-label>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">size="sm"</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <sando-label size="md">Medium Label</sando-label>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">size="md"</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <sando-label size="lg">Large Label</sando-label>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">size="lg"</span>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// WEIGHTS
// ============================================================================

/**
 * All font weight variants side by side.
 */
export const Weights: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <sando-label weight="normal">Normal Weight</sando-label>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);"
          >weight="normal"</span
        >
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <sando-label weight="medium">Medium Weight</sando-label>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);"
          >weight="medium"</span
        >
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <sando-label weight="semibold">Semibold Weight</sando-label>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);"
          >weight="semibold"</span
        >
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// DISABLED
// ============================================================================

/**
 * Disabled state reduces visual prominence.
 * Use when the associated form control is disabled.
 */
export const Disabled: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          Normal vs Disabled
        </h4>
        <div style="display: flex; gap: 2rem;">
          <sando-label>Normal Label</sando-label>
          <sando-label disabled>Disabled Label</sando-label>
        </div>
      </div>

      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          Disabled with Features
        </h4>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <sando-label disabled required>Required Field (Disabled)</sando-label>
          <sando-label disabled helper-text="This field is currently unavailable">
            With Helper Text (Disabled)
          </sando-label>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// SCREEN READER ONLY
// ============================================================================

/**
 * Screen reader only mode hides the label visually but keeps it accessible.
 * The input below has a visually hidden label - inspect with screen reader.
 */
export const ScreenReaderOnly: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          Search Input with Hidden Label
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <sando-label for="search-input" sr-only>Search</sando-label>
          <sando-input id="search-input" type="search" placeholder="Search..."></sando-input>
        </div>
        <p
          style="margin: 0.75rem 0 0 0; font-size: 0.75rem; color: var(--sando-color-text-caption);"
        >
          The label "Search" is visually hidden but accessible to screen readers.
        </p>
      </div>

      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          Icon Button with Hidden Label
        </h4>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <sando-label for="filter-input" sr-only>Filter results</sando-label>
          <sando-input id="filter-input" placeholder="Filter..."></sando-input>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// CUSTOM INDICATORS
// ============================================================================

/**
 * Custom required and optional indicators using slots.
 */
export const CustomIndicators: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          Custom Required Indicator
        </h4>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <sando-label required>
            Full Name
            <span slot="required-indicator" style="color: var(--sando-color-state-danger-text);">
              (required)
            </span>
          </sando-label>
          <sando-label required>
            Email
            <span
              slot="required-indicator"
              style="color: var(--sando-color-state-danger-text); font-weight: bold;"
            >
              !
            </span>
          </sando-label>
        </div>
      </div>

      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          Custom Optional Indicator
        </h4>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <sando-label optional>
            Nickname
            <span
              slot="optional-indicator"
              style="font-style: italic; color: var(--sando-color-text-muted);"
            >
              - not required
            </span>
          </sando-label>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// WITH FORM FIELD
// ============================================================================

/**
 * Real-world example: Label paired with sando-input component.
 * Demonstrates proper form field composition.
 */
export const WithFormField: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 400px;">
      <!-- Basic form field -->
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <sando-label for="name-input" required>Full Name</sando-label>
        <sando-input id="name-input" placeholder="Enter your full name"></sando-input>
      </div>

      <!-- With helper text -->
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <sando-label for="email-field" required helper-text="We'll never share your email.">
          Email Address
        </sando-label>
        <sando-input id="email-field" type="email" placeholder="you@example.com"></sando-input>
      </div>

      <!-- With tooltip -->
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <sando-label for="password-field" required tooltip="Must be at least 8 characters">
          Password
        </sando-label>
        <sando-input id="password-field" type="password" placeholder="Enter password"></sando-input>
      </div>

      <!-- Optional field -->
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <sando-label for="company-input" optional>Company Name</sando-label>
        <sando-input id="company-input" placeholder="Your company (if applicable)"></sando-input>
      </div>

      <!-- Disabled field -->
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <sando-label for="readonly-input" disabled>Account ID</sando-label>
        <sando-input id="readonly-input" value="ACC-12345" disabled></sando-input>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// ALL STATES
// ============================================================================

/**
 * Complete matrix showing all combinations of size, weight, and states.
 * Useful for visual testing and design review.
 */
export const AllStates: Story = {
  tags: DOCS_ONLY,
  render: () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    const weights = ['normal', 'medium', 'semibold'] as const;

    return html`
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Size × Weight Matrix -->
        <section>
          <h3 style="margin: 0 0 1rem 0; font-size: 1rem; color: var(--sando-color-text-heading);">
            Size × Weight Matrix
          </h3>
          <div style="display: grid; grid-template-columns: auto repeat(3, 1fr); gap: 1rem;">
            <!-- Header row -->
            <div></div>
            ${sizes.map(
              (size) => html`
                <div
                  style="font-size: 0.75rem; font-weight: 600; color: var(--sando-color-text-muted); text-align: center;"
                >
                  ${size.toUpperCase()}
                </div>
              `
            )}

            <!-- Weight rows -->
            ${weights.map(
              (weight) => html`
                <div
                  style="font-size: 0.75rem; font-weight: 600; color: var(--sando-color-text-muted);"
                >
                  ${weight}
                </div>
                ${sizes.map(
                  (size) => html`
                    <sando-label size="${size}" weight="${weight}">Label Text</sando-label>
                  `
                )}
              `
            )}
          </div>
        </section>

        <!-- States -->
        <section>
          <h3 style="margin: 0 0 1rem 0; font-size: 1rem; color: var(--sando-color-text-heading);">
            States
          </h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
              <sando-label>Default</sando-label>
              <sando-label required>Required</sando-label>
              <sando-label optional>Optional</sando-label>
              <sando-label disabled>Disabled</sando-label>
            </div>
          </div>
        </section>

        <!-- With Features -->
        <section>
          <h3 style="margin: 0 0 1rem 0; font-size: 1rem; color: var(--sando-color-text-heading);">
            With Features
          </h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <sando-label helper-text="Helper text provides additional context">
              With Helper Text
            </sando-label>
            <sando-label tooltip="This is tooltip information">With Tooltip</sando-label>
            <sando-label required helper-text="This field is required" tooltip="Important field">
              All Features Combined
            </sando-label>
          </div>
        </section>
      </div>
    `;
  },
  parameters: { controls: { disable: true } }
};

// ============================================================================
// USE CASES
// ============================================================================

/**
 * Real-world form examples showing common label use cases.
 */
export const UseCases: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2.5rem; max-width: 500px;">
      <!-- Login Form -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: var(--sando-color-text-heading);">
          Login Form
        </h4>
        <div
          style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1.5rem; border: 1px solid var(--sando-color-border-default); border-radius: 8px;"
        >
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <sando-label for="login-email" required>Email</sando-label>
            <sando-input id="login-email" type="email" placeholder="you@example.com"></sando-input>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <sando-label for="login-password" required>Password</sando-label>
            <sando-input
              id="login-password"
              type="password"
              placeholder="Enter password"
            ></sando-input>
          </div>
        </div>
      </div>

      <!-- Registration Form -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: var(--sando-color-text-heading);">
          Registration Form
        </h4>
        <div
          style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1.5rem; border: 1px solid var(--sando-color-border-default); border-radius: 8px;"
        >
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <sando-label for="reg-name" required weight="semibold">Full Name</sando-label>
            <sando-input id="reg-name" placeholder="John Doe"></sando-input>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <sando-label
              for="reg-email"
              required
              weight="semibold"
              helper-text="We'll send a verification email"
            >
              Email Address
            </sando-label>
            <sando-input id="reg-email" type="email" placeholder="you@example.com"></sando-input>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <sando-label for="reg-phone" optional weight="semibold">Phone Number</sando-label>
            <sando-input id="reg-phone" type="tel" placeholder="+1 (555) 000-0000"></sando-input>
          </div>
        </div>
      </div>

      <!-- Settings Form -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: var(--sando-color-text-heading);">
          Settings Form
        </h4>
        <div
          style="display: flex; flex-direction: column; gap: 1.5rem; padding: 1.5rem; border: 1px solid var(--sando-color-border-default); border-radius: 8px;"
        >
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <sando-label for="settings-username" tooltip="Your public username visible to others">
              Username
            </sando-label>
            <sando-input id="settings-username" value="johndoe"></sando-input>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <sando-label for="settings-bio" optional helper-text="Max 160 characters"
              >Bio</sando-label
            >
            <sando-input id="settings-bio" placeholder="Tell us about yourself"></sando-input>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <sando-label for="settings-id" disabled>Account ID</sando-label>
            <sando-input id="settings-id" value="USR-ABC123" disabled></sando-input>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
