/**
 * Sando Design System — Storybook Preview Configuration
 *
 * Customizations:
 * - Flavor switcher in the toolbar (sets data-flavor on <html>)
 * - storybook-dark-mode toggle (sets data-color-mode on <html>)
 *
 * The dark/light toggle uses the addon's default themes so the iframe
 * canvas background follows it automatically (stylePreview: true).
 *
 * @type { import('@storybook/web-components').Preview }
 */

import { addons } from "@storybook/preview-api";
import { GLOBALS_UPDATED } from "@storybook/core-events";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { themes } from "@storybook/theming";

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

const channel = addons.getChannel();

// Sync dark-mode addon → data-color-mode on <html>
channel.on(DARK_MODE_EVENT_NAME, (isDark) => {
  document.documentElement.setAttribute(
    "data-color-mode",
    isDark ? "dark" : "light",
  );
});

// Apply default flavor on load so MDX docs (which don't run decorators) get it too
const DEFAULT_FLAVOR = "sando";
if (typeof document !== "undefined") {
  document.documentElement.setAttribute("data-flavor", DEFAULT_FLAVOR);
}

// Sync flavor toolbar → data-flavor on <html> (covers MDX docs as well as stories)
channel.on(GLOBALS_UPDATED, ({ globals }) => {
  if (globals?.flavor === undefined) return;
  const flavor = globals.flavor;
  if (flavor === "original") {
    document.documentElement.removeAttribute("data-flavor");
  } else {
    document.documentElement.setAttribute("data-flavor", flavor);
  }
});

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

    // Dark-mode addon: provide the toggle button + event, but keep the
    // Manager UI (sidebar/toolbar) on the default light theme always by
    // pointing both modes at the same theme. The iframe canvas background
    // is handled via CSS in preview-head.html that reacts to data-color-mode.
    darkMode: {
      dark: themes.light,
      light: themes.light,
      stylePreview: false,
      classTarget: "html",
      darkClass: "dark",
      lightClass: "light",
    },

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
    flavor: { table: { disable: true } },
  },

  globalTypes: {
    flavor: {
      name: "Flavor",
      description: "Design system flavor/theme",
      toolbar: {
        title: "Flavor",
        items: [
          { value: "sando", title: "Sando" },
          { value: "nori", title: "Nori" },
          { value: "original", title: "Original" },
          { value: "strawberry", title: "Strawberry" },
          { value: "tonkatsu", title: "Tonkatsu" },
          { value: "kiwi", title: "Kiwi" },
          { value: "egg-salad", title: "Egg Salad" },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (storyFn, context) => {
      const flavor = context.globals.flavor || "sando";
      if (flavor === "original") {
        document.documentElement.removeAttribute("data-flavor");
      } else {
        document.documentElement.setAttribute("data-flavor", flavor);
      }
      return storyFn();
    },
  ],

  initialGlobals: {
    flavor: "sando",
  },
};

export default preview;
