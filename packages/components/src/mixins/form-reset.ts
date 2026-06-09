/**
 * FormReset Mixin
 *
 * Automatically wires form reset listeners in connectedCallback/disconnectedCallback.
 * Subclasses override `_handleFormReset` with component-specific reset logic.
 *
 * @example
 * ```typescript
 * class SandoInput extends FormResetMixin(FlavorableMixin(LitElement)) {
 *   protected override _handleFormReset = (): void => {
 *     this.value = '';
 *     this.error = false;
 *   };
 * }
 * ```
 */

import { LitElement } from 'lit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

/**
 * Public interface for FormReset mixin consumers.
 * Protected members are exposed here for clean declaration emit (no TS4094).
 *
 * @internal Members prefixed with `_` are internal use only.
 */
export interface FormResetInterface {
  /** @internal Handle form reset event — subclasses override with reset logic */
  _handleFormReset: () => void;
}

/**
 * FormReset Mixin
 *
 * Provides automatic form reset listener wiring.
 * Components override `_handleFormReset` with their specific reset behavior.
 *
 * @param Base - Base class (LitElement or subclass)
 * @returns Class with FormReset functionality
 */
export const FormResetMixin = <T extends Constructor<LitElement>>(Base: T) => {
  class FormReset extends Base {
    /**
     * Handle form reset event.
     * Override in subclasses to implement component-specific reset behavior.
     * @protected
     */
    protected _handleFormReset = (): void => {};

    /**
     * Lifecycle: attach form reset listener when added to DOM
     */
    override connectedCallback() {
      super.connectedCallback();
      const form = this.closest('form');
      if (form) {
        form.addEventListener('reset', this._handleFormReset);
      }
    }

    /**
     * Lifecycle: detach form reset listener when removed from DOM
     */
    override disconnectedCallback() {
      super.disconnectedCallback();
      const form = this.closest('form');
      if (form) {
        form.removeEventListener('reset', this._handleFormReset);
      }
    }
  }

  return FormReset as unknown as Constructor<FormResetInterface> & T;
};

export type FormResetMixinReturn = ReturnType<typeof FormResetMixin>;
