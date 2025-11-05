/**
 * Flavorable Mixin
 *
 * Adds flavor inheritance functionality to Sando Web Components.
 * This mixin enables components to inherit flavor from ancestor elements,
 * implementing the core "flavor philosophy" of the Sando Design System.
 *
 * @example
 * ```typescript
 * import { LitElement } from 'lit';
 * import { customElement, property } from 'lit/decorators.js';
 * import { FlavorableMixin } from '../../mixins/flavorable.js';
 *
 * @customElement('my-component')
 * export class MyComponent extends FlavorableMixin(LitElement) {
 *   // Component automatically has flavor property and inheritance
 * }
 * ```
 *
 * @example HTML Usage
 * ```html
 * <!-- Global flavor -->
 * <html flavor="dark">
 *   <!-- Inherits dark -->
 *   <my-component></my-component>
 *
 *   <!-- Override to strawberry -->
 *   <my-component flavor="strawberry"></my-component>
 *
 *   <!-- Section flavor -->
 *   <div flavor="ocean">
 *     <!-- Inherits ocean -->
 *     <my-component></my-component>
 *   </div>
 * </html>
 * ```
 */

import { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * Type for constructor that accepts LitElement or any subclass
 */
type Constructor<T = object> = new (...args: any[]) => T;

/**
 * Interface for Flavorable components
 */
export interface FlavorableInterface {
  /**
   * Design system flavor/theme
   * @default 'original'
   */
  flavor: string;

  /**
   * Get the effective flavor (explicit or inherited)
   */
  readonly effectiveFlavor: string;
}

/**
 * Flavorable Mixin
 *
 * Adds flavor property with automatic inheritance from ancestor elements.
 * Components can override the inherited flavor by setting an explicit flavor attribute.
 *
 * **Inheritance Rules:**
 * 1. Explicit `flavor` attribute on component (highest priority)
 * 2. Inherited `flavor` from nearest ancestor with `[flavor]` attribute
 * 3. Default `'original'` flavor (fallback)
 *
 * @param Base - Base class (usually LitElement or subclass)
 * @returns Class with Flavorable functionality
 */
export const FlavorableMixin = <T extends Constructor<LitElement>>(Base: T) => {
  class Flavorable extends Base implements FlavorableInterface {
    /**
     * Design system flavor/theme
     *
     * If not explicitly set, will inherit from nearest ancestor with `[flavor]` attribute.
     * Falls back to 'original' if no ancestor flavor is found.
     *
     * @default 'original'
     * @example
     * ```html
     * <!-- Explicit flavor -->
     * <sando-button flavor="strawberry">Strawberry</sando-button>
     *
     * <!-- Inherited flavor -->
     * <div flavor="dark">
     *   <sando-button>Inherits dark</sando-button>
     * </div>
     * ```
     */
    @property({ reflect: true })
    flavor = 'original';

    /**
     * Internal: Inherited flavor from ancestor element
     * @private
     */
    private _inheritedFlavor?: string;

    /**
     * Internal: Whether flavor was explicitly set by user
     * @private
     */
    private _hasExplicitFlavor = false;

    /**
     * Get the effective flavor (explicit or inherited)
     *
     * Returns the flavor that's actually being used by the component:
     * - Explicit flavor if set
     * - Inherited flavor from ancestor if no explicit flavor
     * - 'original' as fallback
     *
     * @readonly
     * @example
     * ```typescript
     * // In component
     * console.log(this.effectiveFlavor); // 'dark' (inherited)
     * this.flavor = 'strawberry';
     * console.log(this.effectiveFlavor); // 'strawberry' (explicit)
     * ```
     */
    get effectiveFlavor(): string {
      if (this._hasExplicitFlavor) {
        return this.flavor;
      }
      return this._inheritedFlavor || this.flavor;
    }

    /**
     * Lifecycle: Called when element is added to DOM
     * Sets up flavor inheritance from ancestors
     */
    override connectedCallback() {
      super.connectedCallback();
      this._setupFlavorInheritance();
    }

    /**
     * Lifecycle: Called when properties change
     * Updates explicit flags
     */
    override updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);

      if (changedProperties.has('flavor')) {
        // Check if flavor was explicitly set via attribute
        this._hasExplicitFlavor = this.hasAttribute('flavor');
      }
    }

    /**
     * Setup flavor inheritance from ancestor elements
     *
     * Walks up the DOM tree to find the nearest ancestor with a `[flavor]` attribute.
     * If found, stores the inherited flavor value.
     *
     * @private
     */
    private _setupFlavorInheritance() {
      // Check if component has explicit flavor attribute
      if (this.hasAttribute('flavor')) {
        this._hasExplicitFlavor = true;
        return; // Don't inherit if explicit flavor is set
      }

      // Find nearest ancestor with [flavor] attribute
      const ancestorWithFlavor = this._findAncestorWithFlavor();

      if (ancestorWithFlavor) {
        const inheritedFlavor = ancestorWithFlavor.getAttribute('flavor');
        if (inheritedFlavor) {
          this._inheritedFlavor = inheritedFlavor;
          // CRITICAL FIX: Don't modify this.flavor - it removes the attribute
          // The effectiveFlavor getter will return the inherited value
          // But the DOM attribute stays empty, allowing CSS inheritance to work
          this._hasExplicitFlavor = false; // Mark as inherited, not explicit
        }
      }
    }

    /**
     * Find the nearest ancestor element with a [flavor] attribute
     *
     * Walks up the DOM tree (including through Shadow DOM boundaries)
     * to find the first element with a flavor attribute.
     *
     * @private
     * @returns Element with flavor attribute, or null if not found
     */
    private _findAncestorWithFlavor(): Element | null {
      let current: Node | null = this.parentNode;

      while (current) {
        // Check if current node is an Element and has flavor attribute
        if (current instanceof Element && current.hasAttribute('flavor')) {
          return current;
        }

        // Move to parent (handles both regular DOM and Shadow DOM)
        if (current instanceof ShadowRoot) {
          current = current.host;
        } else if (current instanceof Element) {
          current = current.parentNode;
        } else {
          break;
        }
      }

      return null;
    }

    /**
     * Manually update inherited flavor
     *
     * Useful for programmatic flavor changes or when ancestor flavor changes dynamically.
     * Most users won't need this - inheritance happens automatically.
     *
     * @param newFlavor - New flavor to inherit
     * @example
     * ```typescript
     * // Usually not needed, but available if required
     * button.updateInheritedFlavor('dark');
     * ```
     */
    public updateInheritedFlavor(newFlavor: string) {
      if (!this._hasExplicitFlavor) {
        this._inheritedFlavor = newFlavor;
        this.flavor = newFlavor;
        this.requestUpdate();
      }
    }
  }

  return Flavorable as Constructor<FlavorableInterface> & T;
};

/**
 * Type helper for components using FlavorableMixin
 *
 * @example
 * ```typescript
 * export class MyButton extends FlavorableMixin(LitElement) {
 *   // TypeScript knows about flavor property and effectiveFlavor getter
 * }
 *
 * // Type assertion helper
 * const button = document.querySelector('my-button') as Flavorable<MyButton>;
 * console.log(button.effectiveFlavor);
 * ```
 */
export type Flavorable<T = LitElement> = T & FlavorableInterface;
