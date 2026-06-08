/**
 * Sando Storybook Manager Theme
 *
 * Customizes the Storybook chrome (sidebar, toolbar, brand mark).
 * The API is intentionally narrow — keep it that way. For anything
 * beyond what `create()` exposes, prefer Storybook defaults over CSS
 * overrides.
 *
 * Docs: https://storybook.js.org/docs/configure/user-interface/theming
 */

import { create } from "@storybook/theming";

export default create({
  base: "light",
  brandTitle: "Sando Design System",
  brandUrl: "https://sando.rlago.com",
  colorPrimary: "#b45600",
  colorSecondary: "#b45600",
  fontBase: '"Source Sans 3", system-ui, sans-serif',
  fontCode: '"Fira Code", monospace',
});
