/**
 * Sando Design System Storybook Preview Configuration
 *
 * Configuration decisions:
 * - YES global flavor switcher - uses globalTypes + custom decorator with data-flavor attribute
 * - YES color mode switcher - uses @storybook/addon-themes for flicker-free switching
 * - MDX docs always use light mode for readability
 *
 * Flavor Switcher Implementation:
 * We use globalTypes with a custom decorator to set data-flavor on the html element.
 * The "original" flavor applies to :root by default, while other flavors use
 * [data-flavor="name"] selectors.
 *
 * Color Mode Implementation:
 * We use @storybook/addon-themes with withThemeByDataAttribute to set
 * data-color-mode on the html element.
 *
 * The token system generates CSS that supports both:
 * 1. @media queries (automatic, follows system preference)
 * 2. [data-color-mode] selectors (manual override for UI switches)
 *
 * When "Auto" mode is selected, we remove the data-color-mode attribute
 * (empty string value), letting CSS @media queries take over.
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
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/scale.css";

// Import Recipes (component tokens, always loaded)
import "../../../packages/tokens/dist/sando-tokens/css/recipes/button.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/checkbox.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/form-group.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/icon.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/input.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/select.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/skeleton.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/spinner.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/tag.css";

// Import ALL Flavors with mode support
// Original (Default flavor - base theme)
import "../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-motion-reduce.css";

// Strawberry (Red tones)
import "../../../packages/tokens/dist/sando-tokens/css/flavors/strawberry/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/strawberry/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/strawberry/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/strawberry/flavor-motion-reduce.css";

// Tonkatsu (Brown tones - breaded cutlet)
import "../../../packages/tokens/dist/sando-tokens/css/flavors/tonkatsu/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/tonkatsu/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/tonkatsu/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/tonkatsu/flavor-motion-reduce.css";

// Kiwi (Green tones - kiwi fruit)
import "../../../packages/tokens/dist/sando-tokens/css/flavors/kiwi/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/kiwi/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/kiwi/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/kiwi/flavor-motion-reduce.css";

// Egg Salad (Yellow tones - egg yolk)
import "../../../packages/tokens/dist/sando-tokens/css/flavors/egg-salad/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/egg-salad/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/egg-salad/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/egg-salad/flavor-motion-reduce.css";

// Import Storybook preview global styles LAST
// All token overrides come from generated CSS, this file only contains
// Storybook-specific layout and MDX documentation styles
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

    // Story ordering configuration
    options: {
      storySort: {
        order: [
          "Welcome",
          "Getting Started",
          ["Introduction", "Quick Start", "Theming", "Best Practices"],
          "Ingredients",
          [
            "Overview",
            "Color",
            "Typography",
            "Spacing",
            "Border",
            "Elevation",
            "Animation",
            "Opacity",
            "Z-Index",
          ],
          "Flavors",
          [
            "Overview",
            "Color Roles",
            "Spacing Roles",
            "Typography Roles",
            "Recipes",
          ],
          "Components",
          ["Overview", "Status", "Button", "Input", "Icon", "Form Group", "*"],
          "Resources",
          ["Accessibility", "Changelog", "Contributing"],
          "*",
        ],
      },
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
   * Global Types - Flavor switcher in toolbar
   *
   * This creates a dropdown in the Storybook toolbar to switch between flavors.
   * The selected flavor is applied via a custom decorator that sets data-flavor
   * on the html element.
   */
  globalTypes: {
    flavor: {
      name: "Flavor",
      description: "Design system flavor/theme",
      toolbar: {
        // No icon - emoji in title is sufficient
        title: "Flavor",
        items: [
          { value: "original", title: "🍞 Original", right: "Default" },
          { value: "strawberry", title: "🍓 Strawberry", right: "Red tones" },
          { value: "tonkatsu", title: "🍖 Tonkatsu", right: "Brown tones" },
          { value: "kiwi", title: "🥝 Kiwi", right: "Green tones" },
          { value: "egg-salad", title: "🥚 Egg Salad", right: "Yellow tones" },
        ],
        dynamicTitle: true,
      },
    },
  },

  /**
   * Decorators - Flavor switcher (custom) + Color mode switcher (addon-themes)
   *
   * Flavor Switcher (custom decorator):
   * - "original": Default flavor (no data-flavor attribute, uses :root styles)
   * - "strawberry": Red tones (data-flavor="strawberry")
   * - "tonkatsu": Brown tones (data-flavor="tonkatsu")
   * - "kiwi": Green tones (data-flavor="kiwi")
   * - "egg-salad": Yellow tones (data-flavor="egg-salad")
   *
   * Color Mode Switcher (addon-themes):
   * - "auto": Empty string - removes attribute, CSS @media queries take over
   * - "light": Sets data-color-mode="light" - forces light mode
   * - "dark": Sets data-color-mode="dark" - forces dark mode
   * - "high-contrast": Sets data-color-mode="high-contrast" - forces high contrast
   */
  decorators: [
    // Flavor switcher - custom decorator that sets data-flavor attribute
    (storyFn, context) => {
      const flavor = context.globals.flavor || "original";
      const htmlElement = document.documentElement;

      // Original flavor uses :root styles (no attribute needed)
      // Other flavors use [data-flavor="name"] selectors
      if (flavor === "original") {
        htmlElement.removeAttribute("data-flavor");
      } else {
        htmlElement.setAttribute("data-flavor", flavor);
      }

      return storyFn();
    },
    // Color mode switcher - sets data-color-mode attribute
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
    // Flavor switcher default
    flavor: "original",
  },
};

export default preview;
