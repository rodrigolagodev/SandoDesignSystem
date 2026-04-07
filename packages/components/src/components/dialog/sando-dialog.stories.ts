/**
 * Sando Dialog Component Stories
 *
 * Modal dialog component with focus management, scroll locking, backdrop,
 * close button, and CSS animations. Implements WCAG 2.1 AA with:
 * - role="dialog" / role="alertdialog" with aria-modal="true"
 * - aria-labelledby and aria-describedby for accessible names/descriptions
 * - Focus trap using `inert` on sibling elements
 * - Focus restoration on close
 * - Keyboard dismissal (Escape)
 *
 * ## Features
 * - **4 size variants**: sm, md, lg, full for flexible layouts
 * - **2 dialog types**: dialog (dismissible) and alert (non-dismissible)
 * - **Rich content**: slots for title, description, body, and actions
 * - **Dismissible**: Close via Escape key, backdrop click, or × button
 * - **Animation**: Smooth enter/exit with sando-open, sando-after-open, sando-close, sando-after-close events
 * - **Accessibility**: WCAG 2.1 AA with focus management and inert siblings
 * - **CSS Parts**: Customize backdrop, panel, header, title, description, close-button, body, footer
 *
 * ## Use Cases
 * - Confirm destructive actions (delete, permanent changes)
 * - Alert dialogs for critical information
 * - Forms in modal context
 * - Long-form content with scroll
 *
 * @see sando-dialog.ts for full component documentation
 */

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './sando-dialog.js';

/**
 * Meta configuration for Storybook — includes:
 * - render function for Web Components attribute binding
 * - argTypes mapping for controls panel
 * - default args
 */
const meta: Meta = {
  title: 'Components/Dialog',
  component: 'sando-dialog',
  tags: ['autodocs', 'stable'],

  render: (args) => html`
    <sando-dialog
      ?open="${args.open}"
      type="${args.type}"
      size="${args.size}"
      ?no-header="${args.noHeader}"
      ?dismissible="${args.dismissible}"
    >
      <span slot="title">${args.title}</span>
      ${args.description ? html`<span slot="description">${args.description}</span>` : ''}
      <p>${args.content}</p>
      ${args.actions
        ? html`
            <div slot="actions" style="display: flex; gap: 0.75rem;">
              <button style="padding: 0.5rem 1rem;">Cancel</button>
              <button
                style="padding: 0.5rem 1rem; background: var(--sando-color-interactive-danger, #ef4444);"
              >
                Confirm
              </button>
            </div>
          `
        : ''}
    </sando-dialog>
  `,

  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls dialog visibility — true to show, false to hide',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    type: {
      control: 'select',
      options: ['dialog', 'alert'],
      description:
        'Dialog type — "dialog" (dismissible via Escape/backdrop) or "alert" (non-dismissible, requires action)',
      table: {
        category: 'Appearance',
        type: { summary: "'dialog' | 'alert'" },
        defaultValue: { summary: 'dialog' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Width size variant — sm (small), md (medium), lg (large), full (100% width)',
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg' | 'full'" },
        defaultValue: { summary: 'md' }
      }
    },
    noHeader: {
      control: 'boolean',
      description:
        'Hides header visually — requires aria-label on the element for accessibility (screen readers)',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    dismissible: {
      control: 'boolean',
      description:
        'Whether Escape key and backdrop click close the dialog — forced false when type="alert"',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    title: {
      control: 'text',
      description: 'Dialog title text (slot)',
      table: {
        category: 'Content'
      }
    },
    description: {
      control: 'text',
      description: 'Optional description text below title (slot)',
      table: {
        category: 'Content'
      }
    },
    content: {
      control: 'text',
      description: 'Main dialog body content (default slot)',
      table: {
        category: 'Content'
      }
    },
    actions: {
      control: 'boolean',
      description: 'Show action buttons in footer (actions slot)',
      table: {
        category: 'Content',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  },

  args: {
    open: true,
    type: 'dialog',
    size: 'md',
    noHeader: false,
    dismissible: true,
    title: 'Confirm Action',
    description: '',
    content: 'Are you sure you want to proceed with this action?',
    actions: false
  }
};

export default meta;
type Story = StoryObj;

// Tag constant for documentation-only stories (no controls in interactions tab)
const DOCS_ONLY = ['!dev', '!autodocs'];

// ============================================================================
// CORE STORIES
// ============================================================================

/**
 * Simplest possible dialog — open=true, basic title + content.
 * This is the minimal configuration needed for a functional dialog.
 */
export const Default: Story = {};

/**
 * Interactive playground — all controls exposed for exploration.
 * Use the controls panel to customize type, size, dismissibility, and content.
 */
export const Playground: Story = {
  args: {
    content: 'Customize me! Use the controls panel to change type, size, dismissible, and content.'
  }
};

// ============================================================================
// SIZE VARIANTS
// ============================================================================

/**
 * All 4 size variants (sm, md, lg, full) shown side-by-side with labels.
 * Demonstrates the width range from small to full-screen.
 */
export const Sizes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          Small (sm)
        </h4>
        <sando-dialog open size="sm">
          <span slot="title">Small Dialog</span>
          <p>This dialog has a sm size variant.</p>
        </sando-dialog>
      </div>

      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          Medium (md) — default
        </h4>
        <sando-dialog open size="md">
          <span slot="title">Medium Dialog</span>
          <p>This dialog has a md size variant (default).</p>
        </sando-dialog>
      </div>

      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          Large (lg)
        </h4>
        <sando-dialog open size="lg">
          <span slot="title">Large Dialog</span>
          <p>This dialog has a lg size variant.</p>
        </sando-dialog>
      </div>

      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          Full (full)
        </h4>
        <sando-dialog open size="full">
          <span slot="title">Full Width Dialog</span>
          <p>This dialog has a full size variant (100% width).</p>
        </sando-dialog>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// ALERT DIALOG
// ============================================================================

/**
 * Alert dialog (type="alert") with destructive action.
 * Alert dialogs are non-dismissible (Escape/backdrop don't close).
 * Useful for critical operations like delete confirmations.
 */
export const AlertDialog: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-dialog open type="alert">
      <span slot="title">Confirm Delete</span>
      <p style="margin-bottom: 1rem;">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
      <div slot="actions" style="display: flex; gap: 0.75rem;">
        <button
          style="padding: 0.5rem 1rem; background: var(--sando-color-interactive-base, #0ea5e9);"
        >
          Cancel
        </button>
        <button
          style="padding: 0.5rem 1rem; background: var(--sando-color-interactive-danger, #ef4444); color: white;"
        >
          Delete
        </button>
      </div>
    </sando-dialog>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// WITH DESCRIPTION
// ============================================================================

/**
 * Dialog with both title and description slots.
 * Description provides secondary context below the title.
 */
export const WithDescription: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-dialog open size="lg">
      <span slot="title">Payment Confirmation</span>
      <span slot="description">Please review the details before confirming your payment</span>
      <div style="margin: 1rem 0;">
        <p><strong>Amount:</strong> $99.99</p>
        <p><strong>Card:</strong> •••• •••• •••• 4242</p>
        <p><strong>Date:</strong> March 15, 2024</p>
      </div>
      <div slot="actions" style="display: flex; gap: 0.75rem;">
        <button style="padding: 0.5rem 1rem;">Cancel</button>
        <button
          style="padding: 0.5rem 1rem; background: var(--sando-color-interactive-success, #10b981); color: white;"
        >
          Confirm Payment
        </button>
      </div>
    </sando-dialog>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// WITH ACTIONS
// ============================================================================

/**
 * Dialog with action buttons in the footer slot.
 * Shows typical button patterns (Cancel + Primary action).
 */
export const WithActions: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Basic actions -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Basic Save/Cancel
        </h4>
        <sando-dialog open size="md">
          <span slot="title">Save Changes</span>
          <p>Do you want to save your changes before leaving?</p>
          <div slot="actions" style="display: flex; gap: 0.75rem;">
            <button style="padding: 0.5rem 1rem;">Don't Save</button>
            <button
              style="padding: 0.5rem 1rem; background: var(--sando-color-interactive-base, #0ea5e9); color: white;"
            >
              Save
            </button>
          </div>
        </sando-dialog>
      </div>

      <!-- Multiple actions -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Multiple Actions
        </h4>
        <sando-dialog open size="lg">
          <span slot="title">Delete Account</span>
          <p style="margin-bottom: 1rem;">
            Deleting your account will permanently remove all data. Choose an action:
          </p>
          <div slot="actions" style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
            <button style="padding: 0.5rem 1rem;">Keep Account</button>
            <button
              style="padding: 0.5rem 1rem; background: var(--sando-color-interactive-warning, #f59e0b); color: white;"
            >
              Deactivate
            </button>
            <button
              style="padding: 0.5rem 1rem; background: var(--sando-color-interactive-danger, #ef4444); color: white;"
            >
              Permanently Delete
            </button>
          </div>
        </sando-dialog>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// DISMISSIBLE BEHAVIOR
// ============================================================================

/**
 * Dialog with dismissible=false.
 * User cannot close via Escape or backdrop click (close button is hidden).
 * Useful when explicit action is required.
 */
export const NotDismissible: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-dialog open ?dismissible="${false}" size="md">
      <span slot="title">Important Notice</span>
      <p>This dialog cannot be dismissed by pressing Escape or clicking the backdrop.</p>
      <p>You must click a button to proceed.</p>
      <div slot="actions" style="display: flex; gap: 0.75rem;">
        <button style="padding: 0.5rem 1rem;">I Understand</button>
      </div>
    </sando-dialog>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// NO HEADER
// ============================================================================

/**
 * Dialog with noHeader=true (header visually hidden).
 * Must include aria-label on the element for accessibility.
 */
export const NoHeader: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-dialog open ?no-header="${true}" aria-label="Sign up for newsletter" size="md">
      <div style="text-align: center;">
        <h3 style="margin: 0 0 0.5rem 0;">Stay Updated</h3>
        <p style="margin: 0 0 1rem 0; color: var(--sando-color-text-muted);">
          Subscribe to our newsletter for the latest news and updates.
        </p>
        <input
          type="email"
          placeholder="your@email.com"
          style="width: 100%; padding: 0.5rem; margin-bottom: 1rem;"
        />
        <div slot="actions" style="display: flex; gap: 0.75rem;">
          <button style="padding: 0.5rem 1rem;">Cancel</button>
          <button
            style="padding: 0.5rem 1rem; background: var(--sando-color-interactive-base, #0ea5e9); color: white;"
          >
            Subscribe
          </button>
        </div>
      </div>
    </sando-dialog>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// LONG SCROLLABLE CONTENT
// ============================================================================

/**
 * Dialog with long scrollable body content.
 * Demonstrates header/footer sticky behavior and scroll management.
 */
export const LongContent: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-dialog open size="lg">
      <span slot="title">Terms and Conditions</span>
      <div>
        <h4 style="margin: 1rem 0 0.5rem 0; font-weight: 600;">1. Acceptance of Terms</h4>
        <p>
          By accessing and using this service, you accept and agree to be bound by the terms and
          provision of this agreement. If you do not agree to abide by the above, please do not use
          this service.
        </p>

        <h4 style="margin: 1rem 0 0.5rem 0; font-weight: 600;">2. Use License</h4>
        <p>
          Permission is granted to temporarily download one copy of the materials (information or
          software) on our service for personal, non-commercial transitory viewing only. This is the
          grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose or for any public display</li>
          <li>Attempt to decompile or reverse engineer any software contained on the service</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
          <li>
            Transfer the materials to another person or "mirror" the materials on any other server
          </li>
        </ul>

        <h4 style="margin: 1rem 0 0.5rem 0; font-weight: 600;">3. Disclaimer</h4>
        <p>
          The materials on our service are provided on an 'as is' basis. We make no warranties,
          expressed or implied, and hereby disclaim and negate all other warranties including,
          without limitation, implied warranties or conditions of merchantability, fitness for a
          particular purpose, or non-infringement of intellectual property or other violation of
          rights.
        </p>

        <h4 style="margin: 1rem 0 0.5rem 0; font-weight: 600;">4. Limitations</h4>
        <p>
          In no event shall our company or its suppliers be liable for any damages (including,
          without limitation, damages for loss of data or profit, or due to business interruption)
          arising out of the use or inability to use the materials on our service, even if we or our
          authorized representative has been notified orally or in writing of the possibility of
          such damage.
        </p>

        <h4 style="margin: 1rem 0 0.5rem 0; font-weight: 600;">5. Accuracy of Materials</h4>
        <p>
          The materials appearing on our service could include technical, typographical, or
          photographic errors. Our company does not warrant that any of the materials on our service
          are accurate, complete, or current. Our company may make changes to the materials
          contained on our service at any time without notice.
        </p>
      </div>
      <div slot="actions" style="display: flex; gap: 0.75rem;">
        <button style="padding: 0.5rem 1rem;">Decline</button>
        <button
          style="padding: 0.5rem 1rem; background: var(--sando-color-interactive-base, #0ea5e9); color: white;"
        >
          Accept
        </button>
      </div>
    </sando-dialog>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// PROGRAMMATIC CONTROL
// ============================================================================

/**
 * Demonstrates programmatic control of dialog via show() and hide() methods.
 * Shows how to use these APIs to open/close the dialog programmatically.
 */
export const ControlledOpen: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div>
      <p style="margin-bottom: 1rem; font-size: 0.875rem; color: var(--sando-color-text-muted);">
        This dialog is initially closed. Click the button to open it via show() method.
      </p>

      <button
        id="trigger-btn"
        style="padding: 0.75rem 1.5rem; cursor: pointer; margin-bottom: 1rem;"
      >
        Open Dialog
      </button>

      <sando-dialog id="programmatic-dialog" size="md">
        <span slot="title">Programmatically Opened</span>
        <p>This dialog was opened via the show() method.</p>
        <div slot="actions">
          <button id="close-btn" style="padding: 0.5rem 1rem; cursor: pointer;">Close</button>
        </div>
      </sando-dialog>

      <script>
        const dialog = document.getElementById('programmatic-dialog');
        const triggerBtn = document.getElementById('trigger-btn');
        const closeBtn = document.getElementById('close-btn');

        if (dialog && triggerBtn && closeBtn) {
          triggerBtn.addEventListener('click', () => {
            dialog.show();
          });
          closeBtn.addEventListener('click', () => {
            dialog.hide();
          });
        }
      </script>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// REQUEST CLOSE INTERCEPTION
// ============================================================================

/**
 * Demonstrates sando-request-close event interception.
 * Shows how to prevent dialog closure when there are unsaved changes.
 */
export const RequestCloseIntercept: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div>
      <p style="margin-bottom: 1rem; font-size: 0.875rem; color: var(--sando-color-text-muted);">
        Try pressing Escape or clicking the backdrop — the dialog will prevent close via
        event.preventDefault().
      </p>

      <sando-dialog id="intercept-dialog" open size="md">
        <span slot="title">Unsaved Changes</span>
        <p>You have unsaved changes. Are you sure you want to close?</p>
        <div slot="actions" style="display: flex; gap: 0.75rem;">
          <button id="discard-btn" style="padding: 0.5rem 1rem; cursor: pointer;">Discard</button>
          <button
            id="save-btn"
            style="padding: 0.5rem 1rem; background: var(--sando-color-interactive-base, #0ea5e9); color: white; cursor: pointer;"
          >
            Save & Close
          </button>
        </div>
      </sando-dialog>

      <script>
        const dialog = document.getElementById('intercept-dialog');
        const discardBtn = document.getElementById('discard-btn');
        const saveBtn = document.getElementById('save-btn');

        if (dialog) {
          dialog.addEventListener('sando-request-close', (e) => {
            // Prevent close on Escape/backdrop
            if (e.detail.source === 'escape' || e.detail.source === 'backdrop') {
              e.preventDefault();
            }
          });

          if (discardBtn) {
            discardBtn.addEventListener('click', () => {
              dialog.hide();
            });
          }
          if (saveBtn) {
            saveBtn.addEventListener('click', () => {
              dialog.hide();
            });
          }
        }
      </script>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// ALL COMBINATIONS
// ============================================================================

/**
 * Complete matrix of type × size combinations.
 * Useful for visual testing and design review.
 */
export const AllCombinations: Story = {
  tags: DOCS_ONLY,
  render: () => {
    const types = ['dialog', 'alert'] as const;
    const sizes = ['sm', 'md', 'lg', 'full'] as const;

    return html`
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        ${types.map(
          (type) => html`
            <div>
              <h4
                style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted); text-transform: capitalize;"
              >
                type="${type}"
              </h4>
              <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                ${sizes.map(
                  (size) => html`
                    <div>
                      <p
                        style="margin: 0 0 0.5rem 0; font-size: 0.75rem; color: var(--sando-color-text-muted);"
                      >
                        size="${size}"
                      </p>
                      <sando-dialog open type="${type}" size="${size}">
                        <span slot="title">${type} - ${size}</span>
                        <p>Dialog with type="${type}" and size="${size}"</p>
                      </sando-dialog>
                    </div>
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
      <!-- Delete Confirmation -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: var(--sando-color-text-body);">
          Delete Confirmation
        </h4>
        <sando-dialog open type="alert" size="md">
          <span slot="title">Delete Project</span>
          <span slot="description">This action cannot be undone</span>
          <p>Are you sure you want to delete the project "Summer Campaign 2024"?</p>
          <div slot="actions" style="display: flex; gap: 0.75rem;">
            <button style="padding: 0.5rem 1rem;">Cancel</button>
            <button
              style="padding: 0.5rem 1rem; background: var(--sando-color-interactive-danger, #ef4444); color: white;"
            >
              Delete Project
            </button>
          </div>
        </sando-dialog>
      </div>

      <!-- Form in Dialog -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: var(--sando-color-text-body);">
          Form Dialog
        </h4>
        <sando-dialog open size="lg">
          <span slot="title">Create New Team</span>
          <form style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;"
                >Team Name</label
              >
              <input
                type="text"
                placeholder="e.g., Engineering"
                style="width: 100%; padding: 0.5rem; border: 1px solid var(--sando-color-border-base, #d1d5db); border-radius: 4px;"
              />
            </div>
            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;"
                >Description</label
              >
              <textarea
                placeholder="What does this team do?"
                style="width: 100%; padding: 0.5rem; border: 1px solid var(--sando-color-border-base, #d1d5db); border-radius: 4px; min-height: 100px;"
              ></textarea>
            </div>
          </form>
          <div slot="actions" style="display: flex; gap: 0.75rem;">
            <button style="padding: 0.5rem 1rem;">Cancel</button>
            <button
              style="padding: 0.5rem 1rem; background: var(--sando-color-interactive-base, #0ea5e9); color: white;"
            >
              Create Team
            </button>
          </div>
        </sando-dialog>
      </div>

      <!-- Alert / Warning -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: var(--sando-color-text-body);">
          Session Expiration Alert
        </h4>
        <sando-dialog open type="alert" size="md">
          <span slot="title">Session Expiring</span>
          <p>
            Your session will expire in 5 minutes due to inactivity. Would you like to extend it?
          </p>
          <div slot="actions" style="display: flex; gap: 0.75rem;">
            <button
              style="padding: 0.5rem 1rem; background: var(--sando-color-interactive-base, #0ea5e9); color: white;"
            >
              Extend Session
            </button>
            <button style="padding: 0.5rem 1rem;">Log Out</button>
          </div>
        </sando-dialog>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
