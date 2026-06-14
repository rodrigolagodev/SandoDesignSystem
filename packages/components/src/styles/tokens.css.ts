/**
 * Design Tokens - Shadow DOM Import
 *
 * This file imports only the token layers needed inside Web Component Shadow DOM:
 * - Ingredients (primitives) - base values that never change
 * - Recipes (component tokens) - component-specific tokens that reference Flavors
 *
 * IMPORTANT: Flavors are NOT imported here.
 * Flavors must be loaded globally in the Light DOM (app/Storybook) to enable:
 * - Flavor inheritance from ancestor elements
 * - Mixing different flavors in the same view
 * - Dynamic flavor switching via data-flavor attribute
 *
 * CSS custom properties naturally inherit from Light DOM to Shadow DOM,
 * so Flavor tokens defined globally will be available to components.
 *
 * Uses the auto-generated `index.css` barrels from `@sando-ds/tokens` so any
 * new ingredient or recipe added to the token build is picked up automatically
 * without touching this file. Vite's CSS pipeline resolves the `@import`
 * directives inside the barrels when imported with the `?inline` query.
 *
 * @example Component usage
 * ```ts
 * import { tokenStyles } from '../../styles/tokens.css.js';
 *
 * static styles = [tokenStyles, yourComponentStyles];
 * ```
 *
 * @example App/Storybook setup (Light DOM)
 * ```ts
 * // Load all flavors globally
 * import '@sando-ds/tokens/css/flavors/original/flavor.css';
 * import '@sando-ds/tokens/css/flavors/strawberry/flavor.css';
 * // ... etc
 * ```
 */

import { css, unsafeCSS } from 'lit';

import ingredients from '@sando-ds/tokens/css/ingredients/index.css?inline';
import recipes from '@sando-ds/tokens/css/recipes/index.css?inline';

/**
 * Combined token styles for Web Components Shadow DOM
 *
 * Includes:
 * - Ingredients (primitives) - base values
 * - Recipes (component tokens) - reference Flavor tokens
 *
 * Does NOT include:
 * - Flavors - must be loaded globally in Light DOM for proper inheritance
 */
export const tokenStyles = css`
  ${unsafeCSS(ingredients)}
  ${unsafeCSS(recipes)}
`;
