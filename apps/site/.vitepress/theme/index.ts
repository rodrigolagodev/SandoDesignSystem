// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

/**
 * Sando Design System Tokens
 *
 * Import order matters:
 * 1. Ingredients (primitives) - base color values, spacing, typography
 * 2. Style.css - VitePress variable mappings to Sando tokens
 *
 * The Sando flavor tokens are mapped directly in style.css to VitePress
 * variables, ensuring both Storybook and VitePress use the same colors.
 */

// Ingredients Layer - Base token values (primitives)
import "../../../../packages/tokens/dist/sando-tokens/css/ingredients/color.css";
import "../../../../packages/tokens/dist/sando-tokens/css/ingredients/space.css";
import "../../../../packages/tokens/dist/sando-tokens/css/ingredients/font.css";
import "../../../../packages/tokens/dist/sando-tokens/css/ingredients/border.css";
import "../../../../packages/tokens/dist/sando-tokens/css/ingredients/elevation.css";
import "../../../../packages/tokens/dist/sando-tokens/css/ingredients/opacity.css";
import "../../../../packages/tokens/dist/sando-tokens/css/ingredients/animation.css";
import "../../../../packages/tokens/dist/sando-tokens/css/ingredients/z-index.css";
import "../../../../packages/tokens/dist/sando-tokens/css/ingredients/scale.css";

// Import Washi paper texture for Sando brand identity
import "../../../../packages/tokens/src/css/washi-texture.css";

// Sando Flavor - Semantic tokens (font-family-heading, font-family-body, etc.)
import "../../../../packages/tokens/dist/sando-tokens/css/flavors/sando/flavor.css";

// VitePress theme styles with Sando token mappings
import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    // Set default flavor to "sando" for washi texture application
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-flavor", "sando");
    }
  },
} satisfies Theme;
