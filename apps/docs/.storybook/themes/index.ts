/**
 * Sando Design System - Storybook Themes
 *
 * Export all themes and variables for use in manager.ts
 */

// Theme objects
export { sandoLightTheme } from "./sando-light";
export { sandoDarkTheme } from "./sando-dark";

// Default exports for convenience
export { default as lightTheme } from "./sando-light";
export { default as darkTheme } from "./sando-dark";

// Variables for custom styling
export {
  lightPalette,
  darkPalette,
  typography,
  layout,
  timing,
  type ColorPalette,
} from "./variables";
