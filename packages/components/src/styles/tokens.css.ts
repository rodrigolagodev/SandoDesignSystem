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
 * import '@sando/tokens/css/flavors/original/flavor.css';
 * import '@sando/tokens/css/flavors/strawberry/flavor.css';
 * // ... etc
 * ```
 */

import { css, unsafeCSS } from 'lit';

// ============================================================================
// INGREDIENTS LAYER - Primitives
// These are base values (colors, spacing, typography) that never change.
// Safe to include in Shadow DOM as they don't vary by flavor.
// ============================================================================
import ingredientsAnimation from '@sando/tokens/css/ingredients/animation.css?inline';
import ingredientsBorder from '@sando/tokens/css/ingredients/border.css?inline';
import ingredientsColor from '@sando/tokens/css/ingredients/color.css?inline';
import ingredientsElevation from '@sando/tokens/css/ingredients/elevation.css?inline';
import ingredientsFont from '@sando/tokens/css/ingredients/font.css?inline';
import ingredientsOpacity from '@sando/tokens/css/ingredients/opacity.css?inline';
import ingredientsSpace from '@sando/tokens/css/ingredients/space.css?inline';
import ingredientsZIndex from '@sando/tokens/css/ingredients/z-index.css?inline';

// ============================================================================
// RECIPES LAYER - Component Tokens
// These reference Flavor tokens (e.g., var(--sando-color-text-body)).
// The actual values come from Flavors loaded in the Light DOM.
// ============================================================================
import recipeButton from '@sando/tokens/css/recipes/button.css?inline';
import recipeCheckbox from '@sando/tokens/css/recipes/checkbox.css?inline';
import recipeFormGroup from '@sando/tokens/css/recipes/form-group.css?inline';
import recipeIcon from '@sando/tokens/css/recipes/icon.css?inline';
import recipeInput from '@sando/tokens/css/recipes/input.css?inline';

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
  /* ========================================
     INGREDIENTS LAYER - Primitives
     Base values that never change by flavor
     ======================================== */
  ${unsafeCSS(ingredientsAnimation)}
  ${unsafeCSS(ingredientsBorder)}
  ${unsafeCSS(ingredientsColor)}
  ${unsafeCSS(ingredientsElevation)}
  ${unsafeCSS(ingredientsFont)}
  ${unsafeCSS(ingredientsOpacity)}
  ${unsafeCSS(ingredientsSpace)}
  ${unsafeCSS(ingredientsZIndex)}

  /* ========================================
     RECIPES LAYER - Component Tokens
     Reference Flavor tokens from Light DOM
     ======================================== */
  ${unsafeCSS(recipeButton)}
  ${unsafeCSS(recipeCheckbox)}
  ${unsafeCSS(recipeFormGroup)}
  ${unsafeCSS(recipeIcon)}
  ${unsafeCSS(recipeInput)}
`;
