/**
 * Sando Design System Storybook Preview Configuration
 *
 * Configuration decisions:
 * - NO global flavor switcher - flavors are set per-component in individual stories
 * - YES color mode switcher - uses @storybook/addon-themes for flicker-free switching
 * - MDX docs always use light mode for readability
 *
 * Color Mode Implementation:
 * We use @storybook/addon-themes with withThemeByDataAttribute to set
 * data-color-mode on the html element. This prevents flickering by applying
 * themes at the correct point in Storybook's lifecycle (before story render).
 *
 * For "Auto" mode (follow system preference), we use an empty string value
 * which effectively removes the attribute, letting CSS @media queries work.
 *
 * @see https://storybook.js.org/addons/@storybook/addon-themes
 * @see https://github.com/storybookjs/storybook/blob/main/code/addons/themes/docs/api.md
 *
 * @type { import('@storybook/web-components').Preview }
 */

import { withThemeByDataAttribute } from "@storybook/addon-themes";

// Import design tokens CSS - Ingredients (primitives, always loaded)
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/color.css";
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/space.css";
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/font.css";
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/border.css";
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/elevation.css";
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/opacity.css";
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/animation.css";
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/z-index.css";

// Import Recipes (component tokens, always loaded)
import "../../../packages/tokens/dist/sando-tokens/css/recipes/button.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/icon.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/input.css";

// Import ALL Flavors with mode support
// Original (Default flavor - base theme)
import "../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-motion-reduce.css";

// Strawberry (Orange-based)
import "../../../packages/tokens/dist/sando-tokens/css/flavors/strawberry/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/strawberry/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/strawberry/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/strawberry/flavor-motion-reduce.css";

// Ocean (Blue-based)
import "../../../packages/tokens/dist/sando-tokens/css/flavors/ocean/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/ocean/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/ocean/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/ocean/flavor-motion-reduce.css";

// Forest (Green-based)
import "../../../packages/tokens/dist/sando-tokens/css/flavors/forest/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/forest/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/forest/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/forest/flavor-motion-reduce.css";

// Sunset (Orange + Warm neutrals)
import "../../../packages/tokens/dist/sando-tokens/css/flavors/sunset/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/sunset/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/sunset/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/sunset/flavor-motion-reduce.css";

// Import Storybook preview global styles LAST
// This file contains manual color mode overrides (html[data-color-mode="..."])
// that must come AFTER all @media (prefers-color-scheme) rules to ensure
// higher cascade priority when manually switching themes
import "./preview-styles.css";

const preview = {
  // Global tags for all stories
  tags: ["autodocs"],

  parameters: {
    // Control matchers for automatic control types
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // Backgrounds addon disabled - our token system handles backgrounds
    backgrounds: {
      disable: true,
    },

    // Docs configuration
    docs: {
      toc: true,
    },
  },

  // Global argTypes to hide internal props
  argTypes: {
    // Hide internal properties from controls
    ref: { table: { disable: true } },
    class: { table: { disable: true } },
    style: { table: { disable: true } },
  },

  /**
   * Decorators - Using @storybook/addon-themes for color mode switching
   *
   * withThemeByDataAttribute applies the theme at the correct point in
   * Storybook's lifecycle, BEFORE the story renders. This eliminates
   * the flickering that occurs with custom decorators that manipulate
   * DOM attributes during the render cycle.
   *
   * Theme values:
   * - "auto": Empty string - removes attribute, CSS @media queries take over
   * - "light": Sets data-color-mode="light" - forces light mode
   * - "dark": Sets data-color-mode="dark" - forces dark mode
   * - "high-contrast": Sets data-color-mode="high-contrast" - forces high contrast
   */
  decorators: [
    withThemeByDataAttribute({
      themes: {
        // Auto mode: Empty value removes the attribute entirely
        // This lets CSS @media (prefers-color-scheme) queries work naturally
        auto: "",
        // Light mode: Explicit light override
        light: "light",
        // Dark mode: Sets data-color-mode="dark"
        dark: "dark",
        // High contrast mode: Sets data-color-mode="high-contrast"
        "high-contrast": "high-contrast",
      },
      defaultTheme: "auto",
      attributeName: "data-color-mode",
      // Apply to html element where our CSS selectors target
      parentSelector: "html",
    }),
  ],

  /**
   * Initial global values
   */
  initialGlobals: {
    // The addon uses 'theme' as the global key
    theme: "auto",
  },
};

export default preview;
