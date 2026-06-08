/**
 * Sando Design System — Storybook Preview Configuration
 *
 * Two independent toolbar switchers, each implemented as a globalType +
 * a decorator that writes a data attribute on <html>:
 *
 *   - Color mode → data-color-mode ("light" | "dark")
 *   - Flavor     → data-flavor (one of the 7 flavor slugs, empty for "original")
 *
 * The token CSS (imported below) reacts to those attributes via
 * :root[data-color-mode="..."] and :root[data-flavor="..."] selectors,
 * so theming "just works" without listeners or external addons.
 *
 * @type { import('@storybook/web-components').Preview }
 */

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

const FLAVORS = [
  "sando",
  "nori",
  "original",
  "strawberry",
  "tonkatsu",
  "kiwi",
  "egg-salad",
];

const setAttr = (name, value) => {
  if (typeof document === "undefined") return;
  if (value) {
    document.documentElement.setAttribute(name, value);
  } else {
    document.documentElement.removeAttribute(name);
  }
};

// Apply defaults immediately so MDX docs pages (which don't run decorators) get them too.
setAttr("data-color-mode", "light");
setAttr("data-flavor", "sando");

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

  globalTypes: {
    colorMode: {
      name: "Mode",
      description: "Light or dark color mode",
      defaultValue: "light",
      toolbar: {
        title: "Mode",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
    flavor: {
      name: "Flavor",
      description: "Design system flavor / theme",
      defaultValue: "sando",
      toolbar: {
        title: "Flavor",
        icon: "paintbrush",
        items: FLAVORS.map((f) => ({ value: f, title: f })),
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (storyFn, context) => {
      setAttr("data-color-mode", context.globals.colorMode || "light");
      const flavor = context.globals.flavor || "sando";
      // "original" uses :root defaults — remove the attribute entirely.
      setAttr("data-flavor", flavor === "original" ? "" : flavor);
      return storyFn();
    },
  ],

  initialGlobals: {
    colorMode: "light",
    flavor: "sando",
  },
};

export default preview;
