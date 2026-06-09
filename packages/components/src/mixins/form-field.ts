/**
 * FormField Mixin
 *
 * Provides shared form field behavior:
 * - `helperText`, `errorText`, `reserveErrorSpace` properties
 * - `_inputId` lazy-initialized unique ID per component instance
 * - `_getHelpTextContext()` compute messaging state variables
 * - `_renderHelpText()` render the <sando-help-text> element
 *
 * Subclasses MUST override `_componentPrefix` getter (e.g. `'sando-input'`).
 * Subclasses MUST import `'../help-text/sando-help-text.js'` for _renderHelpText().
 *
 * @example
 * ```typescript
 * class SandoInput extends FormFieldMixin(FlavorableMixin(LitElement)) {
 *   protected override get _componentPrefix() { return 'sando-input'; }
 *
 *   render() {
 *     const { describedBy } = this._getHelpTextContext();
 *     return html`
 *       <input id="${this._inputId}" aria-describedby="${describedBy || ''}">
 *       ${this._renderHelpText()}
 *     `;
 *   }
 * }
 * ```
 */

import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

/**
 * Public interface for FormField mixin consumers.
 * Protected members are exposed as public in the interface
 * to enable clean TypeScript declaration emit (avoiding TS4094).
 * They are prefixed with `_` and tagged `@internal` to signal internal use.
 */
export interface FormFieldInterface {
  helperText?: string;
  errorText?: string;
  reserveErrorSpace: boolean;
  /** @internal Component prefix for unique ID generation — subclasses override this */
  _componentPrefix: string;
  /** @internal Unique ID for label/input association and ARIA describedby */
  _inputId: string;
  /** @internal Compute messaging state for render() */
  _getHelpTextContext(): {
    messageText: string | undefined;
    describedBy: string | undefined;
    hasMessage: boolean;
  };
  /** @internal Render the <sando-help-text> element */
  _renderHelpText(): TemplateResult<1>;
}

/**
 * FormField Mixin
 *
 * @param Base - Base class (LitElement or subclass)
 * @returns Class with FormField functionality
 */
export const FormFieldMixin = <T extends Constructor<LitElement>>(Base: T) => {
  class FormField extends Base {
    /**
     * Component prefix for unique ID generation.
     * Subclasses MUST override: `protected override get _componentPrefix() { return 'sando-input'; }`
     * @protected
     */
    protected get _componentPrefix(): string {
      return 'sando-field';
    }

    /**
     * Lazy backing field for the generated unique ID.
     * @private
     */
    private _inputIdValue = '';

    /**
     * Unique ID for label/input association and ARIA describedby.
     * Generated once on first access using the `_componentPrefix` getter.
     * @protected
     */
    protected get _inputId(): string {
      if (!this._inputIdValue) {
        this._inputIdValue = `${this._componentPrefix}-${Math.random().toString(36).substring(2, 11)}`;
      }
      return this._inputIdValue;
    }

    /**
     * Helper text displayed below the field (when not in error state)
     */
    @property({ reflect: true, attribute: 'helper-text' })
    helperText?: string;

    /**
     * Error message displayed when `error` is true
     */
    @property({ reflect: true, attribute: 'error-text' })
    errorText?: string;

    /**
     * Whether to reserve space for error messages to prevent layout shift.
     * @default true
     */
    @property({ type: Boolean, attribute: 'reserve-error-space' })
    reserveErrorSpace = true;

    /**
     * Compute messaging state for use in render().
     *
     * Returns `{ messageText, describedBy, hasMessage }`.
     * Requires the consuming class to have an `error` property.
     * @protected
     */
    protected _getHelpTextContext(): {
      messageText: string | undefined;
      describedBy: string | undefined;
      hasMessage: boolean;
    } {
      const self = this as unknown as { error?: boolean };
      const hasHelperText = Boolean(this.helperText && !self.error);
      const hasErrorText = Boolean(this.errorText && self.error);
      const hasMessage = hasHelperText || hasErrorText;
      const messageText = hasErrorText ? this.errorText : this.helperText;
      const describedBy = hasMessage ? `${this._inputId}-description` : undefined;
      return { messageText, describedBy, hasMessage };
    }

    /**
     * Render the <sando-help-text> element.
     * Requires: `import '../help-text/sando-help-text.js'` in consuming component.
     * @protected
     */
    protected _renderHelpText() {
      const { messageText } = this._getHelpTextContext();
      const self = this as unknown as { error?: boolean };
      return html`
        <sando-help-text
          id="${this._inputId}-description"
          variant=${self.error ? 'error' : 'default'}
          ?show-icon=${self.error}
          reserve-space=${this.reserveErrorSpace ? 'true' : 'false'}
        >
          ${messageText || nothing}
        </sando-help-text>
      `;
    }
  }

  return FormField as unknown as Constructor<FormFieldInterface> & T;
};

export type FormFieldMixinReturn = ReturnType<typeof FormFieldMixin>;
