/**
 * Tooltip placement options
 */
export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left';

/**
 * Tooltip component props interface
 */
export interface SandoTooltipProps {
  /** Tooltip text content */
  content?: string;
  /** Preferred placement relative to the trigger */
  placement?: TooltipPlacement;
  /** Whether the tooltip is visible */
  open?: boolean;
  /** Gap in px between trigger and tooltip bubble */
  distance?: number;
  /** Delay in ms before showing on hover */
  delay?: number;
  /** After a tooltip closes, if another opens within this ms, skip the delay */
  skipDelayDuration?: number;
}

/**
 * Detail payload for sando-show / sando-hide events
 */
export interface TooltipVisibilityEventDetail {
  [key: string]: never;
}

/**
 * sando-show event type
 */
export type TooltipShowEvent = CustomEvent<TooltipVisibilityEventDetail>;

/**
 * sando-hide event type
 */
export type TooltipHideEvent = CustomEvent<TooltipVisibilityEventDetail>;
