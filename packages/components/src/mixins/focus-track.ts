/**
 * FocusTrack Mixin
 *
 * Provides `_focused` reactive state and `_handleFocus`/`_handleBlur` arrow
 * function handlers for consistent focus ring visibility across form components.
 *
 * @example
 * ```typescript
 * class SandoCheckbox extends FocusTrackMixin(FlavorableMixin(LitElement)) {
 *   render() {
 *     return html`
 *       <input
 *         @focus=${this._handleFocus}
 *         @blur=${this._handleBlur}
 *       />
 *       <span class="box ${this._focused ? 'focused' : ''}"></span>
 *     `;
 *   }
 * }
 * ```
 */

import { LitElement } from 'lit';
import { state } from 'lit/decorators.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

/**
 * Public interface for FocusTrack mixin consumers.
 * Protected members are exposed here for clean declaration emit (no TS4094).
 *
 * @internal Members prefixed with `_` are internal use only.
 */
export interface FocusTrackInterface {
  /** @internal Whether the native input is currently focused */
  _focused: boolean;
  /** @internal Native input focus handler — subclasses may override */
  _handleFocus: () => void;
  /** @internal Native input blur handler — subclasses may override */
  _handleBlur: () => void;
}

/**
 * FocusTrack Mixin
 *
 * Provides reactive focus state tracking with `_focused`, `_handleFocus`,
 * and `_handleBlur`. Components attach these handlers to their native inputs.
 *
 * @param Base - Base class (LitElement or subclass)
 * @returns Class with FocusTrack functionality
 */
export const FocusTrackMixin = <T extends Constructor<LitElement>>(Base: T) => {
  class FocusTrack extends Base {
    /**
     * Whether the component's native input is currently focused.
     * Used to apply `.focused` CSS class for visible focus ring.
     * @protected
     */
    @state() protected _focused = false;

    /**
     * Handle native input focus event.
     * Override in subclasses to add extra behavior (e.g. dispatching events).
     * @protected
     */
    protected _handleFocus = (): void => {
      this._focused = true;
    };

    /**
     * Handle native input blur event.
     * Override in subclasses to add extra behavior (e.g. dispatching events).
     * @protected
     */
    protected _handleBlur = (): void => {
      this._focused = false;
    };
  }

  return FocusTrack as unknown as Constructor<FocusTrackInterface> & T;
};

export type FocusTrackMixinReturn = ReturnType<typeof FocusTrackMixin>;
