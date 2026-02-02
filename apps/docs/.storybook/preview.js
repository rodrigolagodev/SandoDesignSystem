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
 * data-color-mode on the html element.
 *
 * For "Auto" mode (follow system preference), we use an empty string value
 * which effectively removes the attribute, letting CSS @media queries work.
 *
 * Flicker Prevention:
 * A preload script in preview-head.html reads the persisted theme from
 * localStorage and applies it BEFORE React/Storybook hydrates, preventing
 * the flash that occurs when useEffect applies the theme after render.
 *
 * @see https://storybook.js.org/addons/@storybook/addon-themes
 * @see https://github.com/storybookjs/storybook/blob/main/code/addons/themes/docs/api.md
 * @see https://github.com/storybookjs/storybook/issues/31625 (known flickering issue)
 *
 * @type { import('@storybook/web-components').Preview }
 */

import { withThemeByDataAttribute } from "@storybook/addon-themes";

/**
 * Storage key for persisting theme preference
 * Must match the key used in preview-head.html preload script
 */
const THEME_STORAGE_KEY = "@storybook/manager/globals";

/**
 * Track the last persisted theme to avoid redundant writes
 */
let lastPersistedTheme = null;

/**
 * Persist theme to localStorage for the preload script
 * This runs on every story render but only writes when theme changes
 */
function persistTheme(theme) {
  if (theme === lastPersistedTheme) return;

  try {
    // Read existing globals or create new object
    const existingData = localStorage.getItem(THEME_STORAGE_KEY);
    let globals = {};

    if (existingData) {
      try {
        globals = JSON.parse(existingData);
      } catch (e) {
        // Invalid JSON, start fresh
      }
    }

    // Update theme in globals
    globals.theme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(globals));
    lastPersistedTheme = theme;
  } catch (e) {
    // localStorage not available, ignore
    console.debug("[Sando Theme] Could not persist theme:", e);
  }
}

/**
 * Custom decorator that persists theme changes to localStorage
 * This enables the preload script to read the theme on page load
 */
const withThemePersistence = (storyFn, context) => {
  const theme = context.globals?.theme || "auto";
  persistTheme(theme);
  return storyFn();
};

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
   * Order matters:
   * 1. withThemePersistence - Saves theme to localStorage for preload script
   * 2. withThemeByDataAttribute - Applies theme via data attribute
   *
   * Theme values:
   * - "auto": Empty string - removes attribute, CSS @media queries take over
   * - "light": Sets data-color-mode="light" - forces light mode
   * - "dark": Sets data-color-mode="dark" - forces dark mode
   * - "high-contrast": Sets data-color-mode="high-contrast" - forces high contrast
   */
  decorators: [
    // Persist theme to localStorage for the preload script
    withThemePersistence,
    // Apply theme via data attribute
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
