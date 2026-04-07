/**
 * Dialog type — controls ARIA role
 * - `dialog`: Standard dismissible dialog
 * - `alert`: Alertdialog, not dismissible via Escape/backdrop
 */
export type DialogType = 'dialog' | 'alert';

/**
 * Dialog surface variant
 * - `elevated`: shadow-based depth (default)
 * - `outlined`: border-based separation
 */
export type DialogVariant = 'elevated' | 'outlined';

/**
 * Dialog size variants
 */
export type DialogSize = 'sm' | 'md' | 'lg' | 'full';

/**
 * Button variant options available in the built-in action buttons
 */
export type DialogButtonVariant = 'solid' | 'outline' | 'ghost' | 'text';

/**
 * Button status options available in the built-in action buttons
 */
export type DialogButtonStatus = 'default' | 'success' | 'destructive';

/**
 * Source of a close action
 */
export type DialogCloseSource = 'escape' | 'backdrop' | 'close-button' | 'cancel-button' | 'api';

/**
 * Source of a request-close action (only user-initiated)
 */
export type DialogRequestCloseSource = 'escape' | 'backdrop' | 'close-button' | 'cancel-button';

/**
 * Detail payload for sando-open event
 */
export interface DialogOpenEventDetail {
  // no extra detail needed
}

/**
 * Detail payload for sando-after-open event
 */
export interface DialogAfterOpenEventDetail {
  // no extra detail needed
}

/**
 * Detail payload for sando-close event
 */
export interface DialogCloseEventDetail {
  /** What triggered the close */
  source: DialogCloseSource;
}

/**
 * Detail payload for sando-after-close event
 */
export interface DialogAfterCloseEventDetail {
  /** What triggered the close */
  source: DialogCloseSource;
}

/**
 * Detail payload for sando-request-close event (cancelable)
 */
export interface DialogRequestCloseEventDetail {
  /** What triggered the close request */
  source: DialogRequestCloseSource;
}

/**
 * sando-open event type
 */
export type DialogOpenEvent = CustomEvent<DialogOpenEventDetail>;

/**
 * sando-after-open event type
 */
export type DialogAfterOpenEvent = CustomEvent<DialogAfterOpenEventDetail>;

/**
 * sando-close event type
 */
export type DialogCloseEvent = CustomEvent<DialogCloseEventDetail>;

/**
 * sando-after-close event type
 */
export type DialogAfterCloseEvent = CustomEvent<DialogAfterCloseEventDetail>;

/**
 * sando-request-close event type (cancelable)
 */
export type DialogRequestCloseEvent = CustomEvent<DialogRequestCloseEventDetail>;

/**
 * Dialog component props interface
 */
export interface SandoDialogProps {
  /** Controls dialog visibility */
  open?: boolean;
  /** ARIA role: dialog (dismissible) vs alertdialog (not) */
  type?: DialogType;
  /** Surface variant: elevated (shadow) or outlined (border) */
  variant?: DialogVariant;
  /** Width size variant */
  size?: DialogSize;
  /** Hides header visually — requires aria-label for a11y */
  noHeader?: boolean;
  /** Whether Escape / backdrop click close the dialog. Forced false when type="alert" */
  dismissible?: boolean;
  /** Label for the built-in confirm button */
  confirmLabel?: string;
  /** Variant for the built-in confirm button */
  confirmVariant?: DialogButtonVariant;
  /** Status for the built-in confirm button */
  confirmStatus?: DialogButtonStatus;
  /** Whether to show the built-in confirm button */
  showConfirm?: boolean;
  /** Label for the built-in cancel button */
  cancelLabel?: string;
  /** Variant for the built-in cancel button */
  cancelVariant?: DialogButtonVariant;
  /** Status for the built-in cancel button */
  cancelStatus?: DialogButtonStatus;
  /** Whether to show the built-in cancel button */
  showCancel?: boolean;
}
