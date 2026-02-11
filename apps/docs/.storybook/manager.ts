import { addons } from "@storybook/manager-api";
import {
  defaultConfig,
  type TagBadgeParameters,
} from "storybook-addon-tag-badges";
import {
  sandoLightTheme,
  sandoDarkTheme,
  lightPalette,
  darkPalette,
} from "./themes";
import "./manager.css";

/**
 * Sando Design System Storybook Manager Configuration
 *
 * Features:
 * - Automatic dark/light mode based on system preference
 * - Custom Sando themes for both modes
 * - Tag badges for component status (stable, beta, new, deprecated)
 */

/**
 * Detect system color scheme preference
 * Returns true if user prefers dark mode
 */
const prefersDarkMode = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

/**
 * Get the appropriate theme based on system preference
 */
const getTheme = () => {
  return prefersDarkMode() ? sandoDarkTheme : sandoLightTheme;
};

/**
 * Get the appropriate palette for tag badges based on system preference
 */
const getPalette = () => {
  return prefersDarkMode() ? darkPalette : lightPalette;
};

// Get current palette for badge colors
const palette = getPalette();

/**
 * Apply theme data attribute to document for CSS targeting
 */
if (typeof window !== "undefined") {
  const applyThemeAttribute = (isDark: boolean) => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
  };

  // Apply initial theme
  applyThemeAttribute(prefersDarkMode());

  // Listen for system preference changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      applyThemeAttribute(e.matches);
      // Note: Storybook theme requires page reload for full update
      // The CSS custom properties will handle most visual changes
    });
}

addons.setConfig({
  theme: getTheme(),
  tagBadges: [
    // Stable - Production-ready components
    {
      tags: "stable",
      badge: {
        text: "Stable",
        bgColor: palette.success,
        fgColor: palette.successText,
      },
      display: {
        sidebar: ["component", "docs", "group"],
        toolbar: true,
      },
    },
    // Beta - Components in testing phase
    {
      tags: "beta",
      badge: {
        text: "Beta",
        bgColor: palette.warning,
        fgColor: palette.warningText,
      },
      display: {
        sidebar: ["component", "docs", "group"],
        toolbar: true,
      },
    },
    // New - Recently added components
    {
      tags: "new",
      badge: {
        text: "New",
        bgColor: palette.info,
        fgColor: palette.infoText,
      },
      display: {
        sidebar: ["component", "docs", "group"],
        toolbar: true,
      },
    },
    // Deprecated - Components scheduled for removal
    {
      tags: "deprecated",
      badge: {
        text: "Deprecated",
        bgColor: palette.error,
        fgColor: palette.errorText,
      },
      display: {
        sidebar: ["component", "docs", "group"],
        toolbar: true,
      },
    },
    // Updated - Recently modified components
    {
      tags: "updated",
      badge: {
        text: "Updated",
        bgColor: palette.purple,
        fgColor: palette.purpleText,
      },
      display: {
        sidebar: ["component", "docs", "group"],
        toolbar: true,
      },
    },
    // Include default config for other tags
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
});
