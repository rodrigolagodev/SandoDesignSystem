/**
 * Type definitions for sando-skeleton-table-row component
 * Preset skeleton for table row layouts
 */

/**
 * Props for the SandoSkeletonTableRow component
 */
export interface SandoSkeletonTableRowProps {
  /**
   * Number of columns to display
   * @default 4
   */
  columns?: number;

  /**
   * Comma-separated column widths (e.g., '20%,30%,30%,20%')
   * When not provided, columns have equal widths
   */
  columnWidths?: string;

  /**
   * Show a checkbox column as the first column
   * @default false
   */
  showCheckbox?: boolean;
}
