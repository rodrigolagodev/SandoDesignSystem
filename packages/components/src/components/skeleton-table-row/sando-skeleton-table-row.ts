/**
 * Sando Skeleton Table Row Component
 *
 * A preset skeleton for table row layouts. Provides a quick way to
 * create loading states for tabular data with configurable columns.
 *
 * @element sando-skeleton-table-row
 *
 * @cssprop --sando-skeleton-spacing-gap-md - Gap between cells
 * @cssprop --sando-skeleton-spacing-gap-sm - Vertical padding
 *
 * @example Basic usage
 * <sando-skeleton-table-row></sando-skeleton-table-row>
 *
 * @example Custom column count
 * <sando-skeleton-table-row columns="6"></sando-skeleton-table-row>
 *
 * @example Custom column widths
 * <sando-skeleton-table-row column-widths="20%,30%,30%,20%"></sando-skeleton-table-row>
 *
 * @example With checkbox column
 * <sando-skeleton-table-row show-checkbox></sando-skeleton-table-row>
 *
 * @example Table with multiple rows
 * <sando-skeleton-composer>
 *   <sando-skeleton-table-row show-checkbox></sando-skeleton-table-row>
 *   <sando-skeleton-table-row show-checkbox></sando-skeleton-table-row>
 *   <sando-skeleton-table-row show-checkbox></sando-skeleton-table-row>
 * </sando-skeleton-composer>
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';

import '../skeleton-composer/sando-skeleton-composer.js';
import '../skeleton/sando-skeleton.js';
import '../skeleton/sando-skeleton-text.js';

import type { SkeletonEffect } from '../skeleton/sando-skeleton.types.js';

/**
 * Default values
 */
const DEFAULT_COLUMNS = 4;

@customElement('sando-skeleton-table-row')
export class SandoSkeletonTableRow extends FlavorableMixin(LitElement) {
  /**
   * Number of columns to display
   * @default 4
   */
  @property({ type: Number })
  columns: number = DEFAULT_COLUMNS;

  /**
   * Comma-separated column widths (e.g., '20%,30%,30%,20%')
   * When not provided, columns have equal widths
   */
  @property({ attribute: 'column-widths' })
  columnWidths?: string;

  /**
   * Show a checkbox column as the first column
   * @default false
   */
  @property({ type: Boolean, attribute: 'show-checkbox' })
  showCheckbox = false;

  /**
   * Animation effect applied to all inner skeleton elements
   * @default 'shimmer'
   */
  @property({ reflect: true })
  effect: SkeletonEffect = 'shimmer';

  /**
   * Component styles
   */
  static styles = [
    resetStyles,
    tokenStyles,
    css`
      /* ============================================
         HOST
         ============================================ */

      :host {
        display: block;
      }

      /* ============================================
         ROW LAYOUT
         ============================================ */

      .row {
        display: flex;
        align-items: center;
        gap: var(--sando-skeleton-spacing-gap-md);
        padding: var(--sando-skeleton-spacing-gap-sm) 0;
      }

      /* ============================================
         CELLS
         ============================================ */

      .cell {
        min-width: 0;
      }

      .checkbox {
        flex: 0 0 24px;
      }
    `
  ];

  /**
   * Get the column widths array
   * If columnWidths is provided, parse it
   * Otherwise, create equal widths for the number of columns
   */
  private _getWidths(): string[] {
    if (this.columnWidths) {
      return this.columnWidths.split(',').map((w) => w.trim());
    }
    // Equal widths by default
    const width = `${100 / this.columns}%`;
    return Array(this.columns).fill(width);
  }

  /**
   * Render the skeleton table row
   */
  render() {
    const widths = this._getWidths();

    return html`
      <sando-skeleton-composer>
        <div class="row">
          ${this.showCheckbox
            ? html`
                <div class="checkbox">
                  <sando-skeleton
                    shape="rounded"
                    width="16px"
                    height="16px"
                    effect=${this.effect}
                  ></sando-skeleton>
                </div>
              `
            : nothing}
          ${widths.map((width, index) => {
            // Vary the text width a bit for visual interest
            const textWidth = index === 0 ? '80%' : index === widths.length - 1 ? '60%' : '70%';

            return html`
              <div class="cell" style="flex: 0 0 ${width};">
                <sando-skeleton-text width=${textWidth} effect=${this.effect}></sando-skeleton-text>
              </div>
            `;
          })}
        </div>
      </sando-skeleton-composer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton-table-row': SandoSkeletonTableRow;
  }
}
