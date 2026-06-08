/**
 * Sando Design System — Storybook Preview Configuration
 *
 * Customization is intentionally limited to two toolbar switchers, both
 * wired through @storybook/addon-themes:
 *
 *   - Color mode → data-color-mode on <html> ("light" | "dark")
 *   - Flavor    → data-flavor    on <html> (one of the 7 flavor slugs)
 *
 * The token CSS (imported below) reacts to those attributes. There is
 * no manual event listener, no custom theme files, no preview-styles.css.
 *
 * @type { import('@storybook/web-components').Preview }
 */

import { withThemeByDataAttribute } from "@storybook/addon-themes";

// Design token CSS — Ingredients (primitives)
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/color.css";
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/space.css";
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/font.css";
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/border.css";
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/elevation.css";
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/opacity.css";
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/animation.css";
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/z-index.css";
import "../../../packages/tokens/dist/sando-tokens/css/ingredients/scale.css";

// Design token CSS — Recipes (component tokens)
import "../../../packages/tokens/dist/sando-tokens/css/recipes/button.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/checkbox.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/form-group.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/icon.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/input.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/select.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/skeleton.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/spinner.css";
import "../../../packages/tokens/dist/sando-tokens/css/recipes/tag.css";

// Design token CSS — Flavors (all variants, including dark/high-contrast/motion-reduce)
import "../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-motion-reduce.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/strawberry/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/strawberry/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/strawberry/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/strawberry/flavor-motion-reduce.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/tonkatsu/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/tonkatsu/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/tonkatsu/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/tonkatsu/flavor-motion-reduce.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/kiwi/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/kiwi/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/kiwi/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/kiwi/flavor-motion-reduce.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/egg-salad/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/egg-salad/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/egg-salad/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/egg-salad/flavor-motion-reduce.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/sando/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/sando/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/sando/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/sando/flavor-motion-reduce.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/nori/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/nori/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/nori/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/nori/flavor-motion-reduce.css";

const preview = {
  tags: ["autodocs"],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    docs: { toc: true },

    options: {
      storySort: {
        order: [
          "Welcome",
          "Getting Started",
          [
            "Introduction",
            "Installation",
            "Quick Start",
            "Theming",
            "Dependencies",
          ],
          "Guides",
          [
            "Architecture",
            "Flavor Philosophy",
            "Accessibility",
            "Browser Support",
            "Contributing",
          ],
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
            "Nori",
          ],
          "Recipes",
          ["Overview", "Testing"],
          "Components",
          ["Status", "Button", "Input", "Icon", "Form Group", "*"],
          "*",
        ],
      },
    },
  },

  argTypes: {
    ref: { table: { disable: true } },
    class: { table: { disable: true } },
    style: { table: { disable: true } },
  },

  decorators: [
    withThemeByDataAttribute({
      attributeName: "data-color-mode",
      defaultTheme: "light",
      themes: {
        light: "light",
        dark: "dark",
      },
      parentSelector: "html",
    }),
    withThemeByDataAttribute({
      attributeName: "data-flavor",
      defaultTheme: "sando",
      themes: {
        sando: "sando",
        nori: "nori",
        original: "",
        strawberry: "strawberry",
        tonkatsu: "tonkatsu",
        kiwi: "kiwi",
        "egg-salad": "egg-salad",
      },
      parentSelector: "html",
    }),
  ],
};

export default preview;
