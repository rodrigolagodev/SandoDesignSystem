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
import { html, nothing } from 'lit';

import './sando-dialog.js';
import '../button/sando-button.js';

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
      ?open=${args.open}
      type=${args.type}
      size=${args.size}
      variant=${args.variant}
      ?no-header=${args.noHeader}
      .dismissible=${args.dismissible}
      confirm-label=${args.confirmLabel}
      confirm-variant=${args.confirmVariant}
      confirm-status=${args.confirmStatus}
      .showConfirm=${args.showConfirm}
      cancel-label=${args.cancelLabel}
      cancel-variant=${args.cancelVariant}
      cancel-status=${args.cancelStatus}
      .showCancel=${args.showCancel}
    >
      <span slot="title">${args.title}</span>
      ${args.description ? html`<span slot="description">${args.description}</span>` : nothing}
      <p>${args.content}</p>
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
    variant: {
      control: 'select',
      options: ['elevated', 'outlined'],
      description: 'Surface variant — elevated (with shadow) or outlined (with border)',
      table: {
        category: 'Appearance',
        type: { summary: "'elevated' | 'outlined'" },
        defaultValue: { summary: 'elevated' }
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
    showConfirm: {
      control: 'boolean',
      description: 'Whether to show the built-in confirm button',
      table: {
        category: 'Actions',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    confirmLabel: {
      control: 'text',
      description: 'Label for the built-in confirm button',
      table: {
        category: 'Actions',
        type: { summary: 'string' },
        defaultValue: { summary: 'Confirm' }
      }
    },
    confirmVariant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'text'],
      description: 'Variant for the built-in confirm button',
      table: {
        category: 'Actions',
        type: { summary: "'solid' | 'outline' | 'ghost' | 'text'" },
        defaultValue: { summary: 'solid' }
      }
    },
    confirmStatus: {
      control: 'select',
      options: ['default', 'success', 'destructive'],
      description: 'Status/color for the built-in confirm button',
      table: {
        category: 'Actions',
        type: { summary: "'default' | 'success' | 'destructive'" },
        defaultValue: { summary: 'default' }
      }
    },
    showCancel: {
      control: 'boolean',
      description: 'Whether to show the built-in cancel button',
      table: {
        category: 'Actions',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    cancelLabel: {
      control: 'text',
      description: 'Label for the built-in cancel button',
      table: {
        category: 'Actions',
        type: { summary: 'string' },
        defaultValue: { summary: 'Cancel' }
      }
    },
    cancelVariant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'text'],
      description: 'Variant for the built-in cancel button',
      table: {
        category: 'Actions',
        type: { summary: "'solid' | 'outline' | 'ghost' | 'text'" },
        defaultValue: { summary: 'outline' }
      }
    },
    cancelStatus: {
      control: 'select',
      options: ['default', 'success', 'destructive'],
      description: 'Status/color for the built-in cancel button',
      table: {
        category: 'Actions',
        type: { summary: "'default' | 'success' | 'destructive'" },
        defaultValue: { summary: 'default' }
      }
    }
  },

  args: {
    open: false,
    type: 'dialog',
    size: 'md',
    variant: 'elevated',
    noHeader: false,
    dismissible: true,
    title: 'Confirm Action',
    description: 'This action will permanently remove the selected items.',
    content: 'Are you sure you want to proceed with this action?',
    showConfirm: true,
    confirmLabel: 'Confirm',
    confirmVariant: 'solid',
    confirmStatus: 'default',
    showCancel: true,
    cancelLabel: 'Cancel',
    cancelVariant: 'outline',
    cancelStatus: 'default'
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
 * Simplest possible dialog — trigger button opens it with full backdrop.
 * Click "Open Dialog" to see the dialog with the backdrop overlay.
 */
export const Default: Story = {
  args: {
    open: false
  },
  render: (args) => html`
    <sando-button
      @click=${() => {
        const d = document.getElementById('dialog-default') as any;
        d?.show();
      }}
    >
      Open Dialog
    </sando-button>

    <sando-dialog
      id="dialog-default"
      ?open=${args.open}
      type=${args.type}
      size=${args.size}
      variant=${args.variant}
      ?no-header=${args.noHeader}
      .dismissible=${args.dismissible}
      confirm-label=${args.confirmLabel}
      confirm-variant=${args.confirmVariant}
      confirm-status=${args.confirmStatus}
      .showConfirm=${args.showConfirm}
      cancel-label=${args.cancelLabel}
      cancel-variant=${args.cancelVariant}
      cancel-status=${args.cancelStatus}
      .showCancel=${args.showCancel}
    >
      <span slot="title">${args.title}</span>
      ${args.description ? html`<span slot="description">${args.description}</span>` : nothing}
      <p>${args.content}</p>
    </sando-dialog>
  `
};

/**
 * Interactive playground — all controls exposed for exploration.
 * Click "Open Dialog" to open the dialog with the full backdrop.
 * Use the controls panel to customize type, size, dismissibility, and content.
 */
export const Playground: Story = {
  args: {
    open: false,
    content: 'Customize me! Use the controls panel to change type, size, dismissible, and content.'
  },
  render: (args) => html`
    <sando-button
      @click=${() => {
        const d = document.getElementById('dialog-playground') as any;
        d?.show();
      }}
    >
      Open Dialog
    </sando-button>

    <sando-dialog
      id="dialog-playground"
      ?open=${args.open}
      type=${args.type}
      size=${args.size}
      variant=${args.variant}
      ?no-header=${args.noHeader}
      .dismissible=${args.dismissible}
      confirm-label=${args.confirmLabel}
      confirm-variant=${args.confirmVariant}
      confirm-status=${args.confirmStatus}
      .showConfirm=${args.showConfirm}
      cancel-label=${args.cancelLabel}
      cancel-variant=${args.cancelVariant}
      cancel-status=${args.cancelStatus}
      .showCancel=${args.showCancel}
    >
      <span slot="title">${args.title}</span>
      ${args.description ? html`<span slot="description">${args.description}</span>` : nothing}
      <p>${args.content}</p>
    </sando-dialog>
  `
};

// ============================================================================
// VARIANTS
// ============================================================================

/**
 * All 2 variant types (elevated, outlined) shown side-by-side with labels.
 * Demonstrates the surface styling differences.
 */
export const Variants: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          Elevated (elevated)
        </h4>
        <sando-dialog open variant="elevated" size="md">
          <span slot="title">Elevated Dialog</span>
          <p>This dialog uses the elevated variant with shadow.</p>
        </sando-dialog>
      </div>

      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          Outlined (outlined)
        </h4>
        <sando-dialog open variant="outlined" size="md">
          <span slot="title">Outlined Dialog</span>
          <p>This dialog uses the outlined variant with border.</p>
        </sando-dialog>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
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
    <sando-dialog
      open
      type="alert"
      confirm-label="Delete"
      confirm-status="destructive"
      cancel-label="Keep"
    >
      <span slot="title">Confirm Delete</span>
      <p style="margin-bottom: 1rem;">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
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
    <sando-dialog open size="lg" confirm-label="Confirm Payment" confirm-status="success">
      <span slot="title">Payment Confirmation</span>
      <span slot="description">Please review the details before confirming your payment</span>
      <div style="margin: 1rem 0;">
        <p><strong>Amount:</strong> $99.99</p>
        <p><strong>Card:</strong> •••• •••• •••• 4242</p>
        <p><strong>Date:</strong> March 15, 2024</p>
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
 * Uses sando-button in the slot with custom configurations.
 */
export const WithActions: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Basic Save/Cancel with custom buttons -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Basic Save/Cancel with Slotted Actions
        </h4>
        <sando-dialog open size="md" .showConfirm=${false} .showCancel=${false}>
          <span slot="title">Save Changes</span>
          <p>Do you want to save your changes before leaving?</p>
          <sando-button slot="actions" variant="outline">Don't Save</sando-button>
          <sando-button slot="actions" variant="solid">Save</sando-button>
        </sando-dialog>
      </div>

      <!-- Multiple custom actions -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Multiple Custom Actions
        </h4>
        <sando-dialog open size="lg" .showConfirm=${false} .showCancel=${false}>
          <span slot="title">Delete Account</span>
          <p style="margin-bottom: 1rem;">
            Deleting your account will permanently remove all data. Choose an action:
          </p>
          <sando-button slot="actions" variant="outline">Keep Account</sando-button>
          <sando-button slot="actions" variant="solid" status="destructive">
            Permanently Delete
          </sando-button>
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
    <sando-dialog
      open
      .dismissible=${false}
      size="md"
      confirm-label="I Understand"
      .showCancel=${false}
    >
      <span slot="title">Important Notice</span>
      <p>This dialog cannot be dismissed by pressing Escape or clicking the backdrop.</p>
      <p>You must click a button to proceed.</p>
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
    <sando-dialog
      open
      ?no-header="${true}"
      aria-label="Sign up for newsletter"
      size="md"
      confirm-label="Subscribe"
    >
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
    <sando-dialog open size="lg" confirm-label="Accept" cancel-label="Decline">
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

      <sando-button id="trigger-btn">Open Dialog</sando-button>

      <sando-dialog id="programmatic-dialog" size="md" .showCancel=${false} confirm-label="Close">
        <span slot="title">Programmatically Opened</span>
        <p>This dialog was opened via the show() method.</p>
      </sando-dialog>

      <script>
        const dialog = document.getElementById('programmatic-dialog');
        const triggerBtn = document.getElementById('trigger-btn');

        if (dialog && triggerBtn) {
          triggerBtn.addEventListener('click', () => {
            dialog.show();
          });

          dialog.addEventListener('sando-confirm', () => {
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

      <sando-dialog
        id="intercept-dialog"
        open
        size="md"
        confirm-label="Save & Close"
        cancel-label="Discard"
      >
        <span slot="title">Unsaved Changes</span>
        <p>You have unsaved changes. Are you sure you want to close?</p>
      </sando-dialog>

      <script>
        const dialog = document.getElementById('intercept-dialog');

        if (dialog) {
          dialog.addEventListener('sando-request-close', (e) => {
            // Prevent close on Escape/backdrop
            if (e.detail.source === 'escape' || e.detail.source === 'backdrop') {
              e.preventDefault();
            }
          });

          dialog.addEventListener('sando-confirm', () => {
            dialog.hide();
          });

          dialog.addEventListener('sando-close', () => {
            dialog.hide();
          });
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
 * Complete matrix of variant × size combinations.
 * Useful for visual testing and design review.
 */
export const AllCombinations: Story = {
  tags: DOCS_ONLY,
  render: () => {
    const variants = ['elevated', 'outlined'] as const;
    const sizes = ['sm', 'md', 'lg', 'full'] as const;

    return html`
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        ${variants.map(
          (variant) => html`
            <div>
              <h4
                style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted); text-transform: capitalize;"
              >
                variant="${variant}"
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
                      <sando-dialog open variant="${variant}" size="${size}">
                        <span slot="title">${variant} - ${size}</span>
                        <p>Dialog with variant="${variant}" and size="${size}"</p>
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
        <sando-dialog
          open
          type="alert"
          size="md"
          confirm-label="Delete Project"
          confirm-status="destructive"
          cancel-label="Cancel"
        >
          <span slot="title">Delete Project</span>
          <span slot="description">This action cannot be undone</span>
          <p>Are you sure you want to delete the project "Summer Campaign 2024"?</p>
        </sando-dialog>
      </div>

      <!-- Form in Dialog -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: var(--sando-color-text-body);">
          Form Dialog
        </h4>
        <sando-dialog open size="lg" confirm-label="Create Team" cancel-label="Cancel">
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
        </sando-dialog>
      </div>

      <!-- Alert / Warning -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: var(--sando-color-text-body);">
          Session Expiration Alert
        </h4>
        <sando-dialog
          open
          type="alert"
          size="md"
          confirm-label="Extend Session"
          cancel-label="Log Out"
        >
          <span slot="title">Session Expiring</span>
          <p>
            Your session will expire in 5 minutes due to inactivity. Would you like to extend it?
          </p>
        </sando-dialog>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
