/**
 * Alert status variants — semantic meaning of the message
 */
export type AlertStatus = 'info' | 'success' | 'warning' | 'destructive';

/**
 * Alert appearance variants — visual treatment
 */
export type AlertAppearance = 'outline' | 'solid';

/**
 * Alert ARIA role options
 */
export type AlertRole = 'alert' | 'status' | 'none';

/**
 * Detail payload for sando-dismiss event
 */
export interface AlertDismissEventDetail {
  /** What triggered the dismissal */
  source: 'close-button' | 'programmatic';
}

/**
 * Detail payload for sando-open-change event
 */
export interface AlertOpenChangeEventDetail {
  /** New open state */
  open: boolean;
}

/**
 * sando-dismiss event type
 */
export type AlertDismissEvent = CustomEvent<AlertDismissEventDetail>;

/**
 * sando-open-change event type
 */
export type AlertOpenChangeEvent = CustomEvent<AlertOpenChangeEventDetail>;

/**
 * Alert component props interface
 */
export interface SandoAlertProps {
  /** Semantic status variant */
  status?: AlertStatus;
  /** Visual appearance variant */
  appearance?: AlertAppearance;
  /** Optional title text */
  title?: string;
  /** Whether the close button is shown */
  dismissible?: boolean;
  /** Whether the alert is visible */
  open?: boolean;
  /** Whether to hide the status icon */
  hideIcon?: boolean;
  /** ARIA live region role */
  role?: AlertRole;
}
