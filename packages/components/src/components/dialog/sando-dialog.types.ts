/**
 * Dialog type — controls ARIA role
 * - `dialog`: Standard dismissible dialog
 * - `alert`: Alertdialog, not dismissible via Escape/backdrop
 */
export type DialogType = 'dialog' | 'alert';

/**
 * Dialog size variants
 */
export type DialogSize = 'sm' | 'md' | 'lg' | 'full';

/**
 * Source of a close action
 */
export type DialogCloseSource = 'escape' | 'backdrop' | 'close-button' | 'api';

/**
 * Source of a request-close action (only user-initiated)
 */
export type DialogRequestCloseSource = 'escape' | 'backdrop' | 'close-button';

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
  /** Width size variant */
  size?: DialogSize;
  /** Hides header visually — requires aria-label for a11y */
  noHeader?: boolean;
  /** Whether Escape / backdrop click close the dialog. Forced false when type="alert" */
  dismissible?: boolean;
}
