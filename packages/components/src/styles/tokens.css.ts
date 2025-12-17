/**
 * Design Tokens - Complete Import
 *
 * This file imports all token layers (Ingredients, Flavors, Recipes)
 * enabling the theming system to work properly in Web Components.
 *
 * Import this in your components to enable flavor switching:
 * ```ts
 * import { tokenStyles } from '../../styles/tokens.css.js';
 *
 * static styles = [tokenStyles, yourComponentStyles];
 * ```
 */

import { css, unsafeCSS } from 'lit';

// Import all token CSS files
import ingredientsAnimation from '@sando/tokens/css/ingredients/animation.css?inline';
import ingredientsBorder from '@sando/tokens/css/ingredients/border.css?inline';
import ingredientsColor from '@sando/tokens/css/ingredients/color.css?inline';
import ingredientsElevation from '@sando/tokens/css/ingredients/elevation.css?inline';
import ingredientsFont from '@sando/tokens/css/ingredients/font.css?inline';
import ingredientsOpacity from '@sando/tokens/css/ingredients/opacity.css?inline';
import ingredientsSpace from '@sando/tokens/css/ingredients/space.css?inline';
import ingredientsZIndex from '@sando/tokens/css/ingredients/z-index.css?inline';

// Import all flavor modes (base + variants)
// Note: Only Original flavor is imported here. Other flavors (strawberry, ocean, forest, sunset)
// are loaded globally in Storybook/app and inherited via CSS custom properties
import flavorOriginal from '@sando/tokens/css/flavors/original/flavor.css?inline';
import flavorOriginalDark from '@sando/tokens/css/flavors/original/flavor-dark.css?inline';
import flavorOriginalHighContrast from '@sando/tokens/css/flavors/original/flavor-high-contrast.css?inline';
import flavorOriginalForcedColors from '@sando/tokens/css/flavors/original/flavor-forced-colors.css?inline';
import flavorOriginalMotionReduce from '@sando/tokens/css/flavors/original/flavor-motion-reduce.css?inline';

// Import all recipes
import recipeButton from '@sando/tokens/css/recipes/button.css?inline';
import recipeIcon from '@sando/tokens/css/recipes/icon.css?inline';
import recipeInput from '@sando/tokens/css/recipes/input.css?inline';

/**
 * Combined token styles for Web Components
 * Includes all layers: Ingredients, Flavors (original only), and Recipes
 *
 * Note: Other flavors (strawberry, ocean, forest, sunset) are loaded globally
 * and their CSS custom properties inherit into the Shadow DOM automatically
 */
export const tokenStyles = css`
  /* ========================================
     INGREDIENTS LAYER - Primitives
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
     FLAVORS LAYER - Original Flavor (All Modes)
     All modes are automatic via @media queries
     ======================================== */
  /* Base/Light mode */
  ${unsafeCSS(flavorOriginal)}

  /* Dark mode (@media prefers-color-scheme: dark) */
  ${unsafeCSS(flavorOriginalDark)}

  /* High Contrast mode (@media prefers-contrast: more) */
  ${unsafeCSS(flavorOriginalHighContrast)}

  /* Forced Colors mode (@media forced-colors: active) */
  ${unsafeCSS(flavorOriginalForcedColors)}

  /* Motion Reduce mode (@media prefers-reduced-motion: reduce) */
  ${unsafeCSS(flavorOriginalMotionReduce)}

  /* ========================================
     RECIPES LAYER - Component Tokens
     ======================================== */
  ${unsafeCSS(recipeButton)}
  ${unsafeCSS(recipeIcon)}
  ${unsafeCSS(recipeInput)}
`;
