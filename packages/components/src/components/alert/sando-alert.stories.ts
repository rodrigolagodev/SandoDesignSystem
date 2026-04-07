/**
 * Sando Alert Component Stories
 *
 * Inline alert component for displaying informational, success, warning, or
 * destructive messages with optional title, dismissible close button, and action slots.
 *
 * ## Features
 *
 * - **4 semantic statuses**: info, success, warning, destructive with automatic icons
 * - **2 appearances**: outline (low emphasis) and solid (high emphasis)
 * - **Optional title**: Display a bold title above the description
 * - **Dismissible**: Show a close button with exit animation and Escape key support
 * - **Action slot**: Include buttons or action links
 * - **Custom icons**: Override default status icon via icon slot
 * - **Accessibility**: WCAG 2.1 AA compliant with aria-live regions
 * - **Keyboard support**: Dismiss via Escape key when dismissible
 *
 * ## Use Cases
 *
 * - Form validation feedback (errors, success messages)
 * - System notifications (warnings, informational updates)
 * - In-page alerts with actions (retry buttons, undo actions)
 * - Toast-style notifications
 *
 * @see sando-alert.ts for full component documentation
 */

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './sando-alert.js';

/**
 * Meta configuration for Storybook — includes:
 * - render function for Web Components attribute binding
 * - argTypes mapping for controls panel
 * - default args
 */
const meta: Meta = {
  title: 'Components/Alert',
  component: 'sando-alert',
  tags: ['autodocs', 'stable'],

  render: (args) => html`
    <sando-alert
      status="${args.status}"
      appearance="${args.appearance}"
      title="${args.title}"
      ?dismissible="${args.dismissible}"
      ?open="${args.open}"
      ?hide-icon="${args.hideIcon}"
      role="${args.role}"
    >
      ${args.description}
    </sando-alert>
  `,

  argTypes: {
    status: {
      control: 'select',
      options: ['info', 'success', 'warning', 'destructive'],
      description: 'Semantic status — controls icon, colors, and ARIA meaning',
      table: {
        category: 'Appearance',
        type: { summary: "'info' | 'success' | 'warning' | 'destructive'" },
        defaultValue: { summary: 'info' }
      }
    },
    appearance: {
      control: 'select',
      options: ['outline', 'solid'],
      description: 'Visual style — outline (low emphasis) or solid (high emphasis)',
      table: {
        category: 'Appearance',
        type: { summary: "'outline' | 'solid'" },
        defaultValue: { summary: 'outline' }
      }
    },
    title: {
      control: 'text',
      description: 'Optional title displayed above the description',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    dismissible: {
      control: 'boolean',
      description: 'Show a close button and allow dismissal via Escape key',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    open: {
      control: 'boolean',
      description: 'Whether the alert is visible',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    hideIcon: {
      control: 'boolean',
      description: 'Hide the automatic status icon',
      table: {
        category: 'Content',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    role: {
      control: 'select',
      options: ['alert', 'status', 'none'],
      description: 'ARIA live region role — "alert" for urgent, "status" for polite updates',
      table: {
        category: 'Accessibility',
        type: { summary: "'alert' | 'status' | 'none'" },
        defaultValue: { summary: 'status' }
      }
    },
    description: {
      control: 'text',
      description: 'Alert description / body content',
      table: {
        category: 'Content'
      }
    }
  },

  args: {
    status: 'info',
    appearance: 'outline',
    title: '',
    dismissible: false,
    open: true,
    hideIcon: false,
    role: 'status',
    description: 'Your changes have been saved.'
  }
};

export default meta;
type Story = StoryObj;

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

// ============================================================================
// PUBLIC STORIES
// ============================================================================

/**
 * Default info alert with outline appearance — simple description, all controls active.
 */
export const Default: Story = {};

/**
 * Interactive playground — customize all properties using the controls panel.
 */
export const Playground: Story = {
  args: {
    description: 'Customize me! Change the status, appearance, title, and dismissible options.'
  }
};

// ============================================================================
// STATUS VARIANTS
// ============================================================================

/**
 * All four semantic statuses in outline appearance.
 * Each status has a distinct color and icon.
 */
export const StatusVariants: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sando-alert status="info" open>
        <strong>Info:</strong> This is an informational message.
      </sando-alert>

      <sando-alert status="success" open>
        <strong>Success:</strong> Your action was completed successfully.
      </sando-alert>

      <sando-alert status="warning" open>
        <strong>Warning:</strong> Please review this warning before proceeding.
      </sando-alert>

      <sando-alert status="destructive" open>
        <strong>Destructive:</strong> This action cannot be undone.
      </sando-alert>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All four semantic statuses in solid appearance.
 * Solid provides higher visual emphasis than outline.
 */
export const SolidVariants: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sando-alert status="info" appearance="solid" open>
        <strong>Info:</strong> This is an informational message.
      </sando-alert>

      <sando-alert status="success" appearance="solid" open>
        <strong>Success:</strong> Your action was completed successfully.
      </sando-alert>

      <sando-alert status="warning" appearance="solid" open>
        <strong>Warning:</strong> Please review this warning before proceeding.
      </sando-alert>

      <sando-alert status="destructive" appearance="solid" open>
        <strong>Destructive:</strong> This action cannot be undone.
      </sando-alert>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// WITH TITLE
// ============================================================================

/**
 * Alert with title displayed above the description.
 * Titles provide context and hierarchy for longer messages.
 */
export const WithTitle: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sando-alert status="success" title="Payment Confirmed" open>
        Your payment of $99.99 was processed successfully on March 15, 2024.
      </sando-alert>

      <sando-alert status="warning" title="Session Expiring" appearance="solid" open>
        Your session will expire in 5 minutes due to inactivity. Click "Extend session" to continue.
      </sando-alert>

      <sando-alert status="destructive" title="Delete Account?" open>
        This action will permanently delete your account and all associated data. This cannot be
        reversed.
      </sando-alert>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// DISMISSIBLE WITH INTERACTION
// ============================================================================

// ============================================================================
// DISMISSIBLE WITH INTERACTION
// ============================================================================

/**
 * Dismissible alert with close button — click the × button or press Escape to dismiss.
 * Demonstrates the sando-dismiss event and exit animation.
 */
export const Dismissible: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-alert status="info" dismissible open>
      You can dismiss this alert by clicking the × button or pressing Escape.
    </sando-alert>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Dismissible alert with title and description — interactive example.
 */
export const DismissibleWithTitle: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-alert status="warning" title="Browser Update Available" dismissible open>
      A new version of your browser is available. Update now to get the latest features and security
      improvements.
    </sando-alert>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// WITH ACTIONS
// ============================================================================

/**
 * Alert with action buttons in the actions slot.
 * Useful for alerts that require user action (retry, undo, confirm, etc).
 */
export const WithActions: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <!-- Simple action -->
      <sando-alert status="warning" title="Connection Lost" open>
        We lost connection to the server. Your changes are saved locally.
        <button slot="actions" style="padding: 0.5rem 1rem; margin-top: 0.5rem;">
          Retry Connection
        </button>
      </sando-alert>

      <!-- Multiple actions -->
      <sando-alert status="destructive" title="Item Deleted" open>
        The file "document.pdf" was moved to trash.
        <div
          slot="actions"
          style="display: flex; gap: 0.75rem; margin-top: 0.5rem; flex-wrap: wrap;"
        >
          <button style="padding: 0.5rem 1rem;">Undo</button>
          <button style="padding: 0.5rem 1rem;">View Trash</button>
        </div>
      </sando-alert>

      <!-- With dismiss + actions -->
      <sando-alert status="success" title="Upgrade Complete" dismissible open>
        Your account has been upgraded to Premium. Enjoy unlimited features!
        <button slot="actions" style="padding: 0.5rem 1rem; margin-top: 0.5rem;">
          View New Features
        </button>
      </sando-alert>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// WITH CUSTOM ICON
// ============================================================================

/**
 * Alert with custom icon via the icon slot.
 * Override the default status icon with your own SVG or element.
 */
export const WithCustomIcon: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-alert status="success" open>
      <span slot="icon" style="font-size: 1.5rem;" aria-hidden="true">🎉</span>
      Congratulations! You've completed all onboarding steps.
    </sando-alert>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// HIDE ICON
// ============================================================================

/**
 * Alert with icon hidden — useful for alerts where the color conveys enough meaning
 * or when space is constrained.
 */
export const HideIcon: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sando-alert status="info" hide-icon open>
        This is an informational message without an icon.
      </sando-alert>

      <sando-alert status="success" hide-icon open>
        Success: Your changes have been saved without the icon.
      </sando-alert>

      <sando-alert status="warning" hide-icon open>
        Warning: Please review this message without the icon.
      </sando-alert>

      <sando-alert status="destructive" hide-icon open>
        Destructive action alert without the icon.
      </sando-alert>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// CONTROLLED OPEN STATE
// ============================================================================

/**
 * Alert with open=false — demonstrates how to control visibility programmatically.
 * The alert element is not visible but still in the DOM.
 */
export const ControlledOpen: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <p style="font-size: 0.875rem; color: var(--sando-color-text-caption);">
        These alerts have open=false, so they are hidden:
      </p>

      <sando-alert status="info" open> This alert is visible (open=true). </sando-alert>

      <sando-alert status="success" ?open="${false}">
        This alert is hidden (open=false).
      </sando-alert>

      <sando-alert status="warning" ?open="${false}">
        This alert is also hidden (open=false).
      </sando-alert>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// ACCESSIBILITY ROLES
// ============================================================================

/**
 * Different ARIA roles for different contexts:
 * - role="status" (default): polite updates, no interruption
 * - role="alert": urgent messages, interrupts screen reader
 * - role="none": for custom implementations or styling-only alerts
 */
export const AccessibilityRoles: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          role="status" (default — polite, non-interrupting)
        </h4>
        <sando-alert status="info" role="status" open>
          Background sync completed. Latest updates are now available.
        </sando-alert>
      </div>

      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          role="alert" (urgent, interrupts screen reader)
        </h4>
        <sando-alert status="destructive" role="alert" open>
          Critical error: Your session has expired. Please log in again.
        </sando-alert>
      </div>

      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          role="none" (no ARIA live region — for styling only)
        </h4>
        <sando-alert status="warning" role="none" open>
          This alert has no aria-live region — useful if you're implementing custom behavior.
        </sando-alert>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// ALL COMBINATIONS
// ============================================================================

/**
 * Complete matrix of all status × appearance combinations.
 * Useful for visual testing and design review.
 */
export const AllCombinations: Story = {
  tags: DOCS_ONLY,
  render: () => {
    const statuses = ['info', 'success', 'warning', 'destructive'] as const;
    const appearances = ['outline', 'solid'] as const;

    return html`
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        ${appearances.map(
          (appearance) => html`
            <div>
              <h4
                style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted); text-transform: capitalize;"
              >
                ${appearance}
              </h4>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${statuses.map(
                  (status) => html`
                    <sando-alert status="${status}" appearance="${appearance}" open>
                      ${status.charAt(0).toUpperCase() + status.slice(1)} alert in ${appearance}
                      appearance.
                    </sando-alert>
                  `
                )}
              </div>
            </div>
          `
        )}
      </div>
    `;
  },
  parameters: { controls: { disable: true } }
};

// ============================================================================
// REAL-WORLD USE CASES
// ============================================================================

/**
 * Common real-world patterns and use cases.
 */
export const UseCases: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Form Validation -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: var(--sando-color-text-body);">
          Form Validation
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <sando-alert status="destructive" title="Validation Error" open>
            Please correct the following errors:
            <ul style="margin: 0.5rem 0 0 0; padding-left: 1.25rem;">
              <li>Email address is invalid</li>
              <li>Password must be at least 8 characters</li>
            </ul>
          </sando-alert>

          <sando-alert status="success" title="All Good!" open>
            Your profile information is complete and valid.
          </sando-alert>
        </div>
      </div>

      <!-- System Status -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: var(--sando-color-text-body);">
          System Status Updates
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <sando-alert status="warning" title="Maintenance Scheduled" open>
            We'll be performing scheduled maintenance on March 20 from 2:00 AM to 4:00 AM EST.
            During this time, the service will be unavailable.
          </sando-alert>

          <sando-alert status="info" title="New Features Available" open>
            We've released 3 new features! Check out the announcement for details.
            <button slot="actions" style="padding: 0.5rem 1rem; margin-top: 0.5rem;">
              View Announcement
            </button>
          </sando-alert>
        </div>
      </div>

      <!-- User Actions -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: var(--sando-color-text-body);">
          User Actions & Confirmations
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <sando-alert status="destructive" title="Item Deleted" dismissible open>
            The file "budget_2024.xlsx" was permanently deleted.
            <button slot="actions" style="padding: 0.5rem 1rem; margin-top: 0.5rem;">Undo</button>
          </sando-alert>

          <sando-alert status="success" appearance="solid" title="Import Complete" dismissible open>
            Successfully imported 247 contacts from your CSV file.
          </sando-alert>
        </div>
      </div>

      <!-- Dismissible Notifications -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: var(--sando-color-text-body);">
          Dismissible Notifications
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <sando-alert status="info" dismissible open>
            Tip: You can customize your dashboard layout by dragging cards around.
          </sando-alert>

          <sando-alert status="warning" dismissible open>
            Your API key will expire in 7 days. Generate a new one in the settings.
          </sando-alert>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
