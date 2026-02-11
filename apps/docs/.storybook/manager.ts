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
 * - Manual theme toggle with keyboard shortcut (Ctrl+Shift+T)
 * - Supports: System (auto), Light, Dark modes
 * - Preference stored in localStorage
 * - Custom Sando themes for both modes
 * - Tag badges for component status (stable, beta, new, deprecated)
 */

// ============================================================================
// Theme Management
// ============================================================================

const THEME_STORAGE_KEY = "sando-storybook-ui-theme";
type ThemePreference = "system" | "light" | "dark";

/**
 * Get saved theme preference from localStorage
 */
const getSavedTheme = (): ThemePreference => {
  if (typeof window === "undefined") return "system";
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === "light" || saved === "dark" || saved === "system") {
    return saved;
  }
  return "system";
};

/**
 * Save theme preference to localStorage
 */
const saveTheme = (theme: ThemePreference): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

/**
 * Detect system color scheme preference
 */
const systemPrefersDark = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

/**
 * Determine if dark mode should be active based on preference
 */
const isDarkMode = (preference: ThemePreference): boolean => {
  if (preference === "system") {
    return systemPrefersDark();
  }
  return preference === "dark";
};

/**
 * Get the appropriate Storybook theme based on preference
 */
const getTheme = (preference: ThemePreference) => {
  return isDarkMode(preference) ? sandoDarkTheme : sandoLightTheme;
};

/**
 * Get the appropriate palette for tag badges based on preference
 */
const getPalette = (preference: ThemePreference) => {
  return isDarkMode(preference) ? darkPalette : lightPalette;
};

/**
 * Apply theme to document
 */
const applyTheme = (preference: ThemePreference): void => {
  if (typeof document === "undefined") return;

  const dark = isDarkMode(preference);
  document.documentElement.setAttribute(
    "data-sb-theme",
    dark ? "dark" : "light",
  );
  // Also keep data-theme for backwards compatibility with existing CSS
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
};

/**
 * Cycle to next theme in sequence: system → light → dark → system
 */
const cycleTheme = (): ThemePreference => {
  const current = getSavedTheme();
  const next: ThemePreference =
    current === "system" ? "light" : current === "light" ? "dark" : "system";
  saveTheme(next);
  return next;
};

/**
 * Show a brief toast notification for theme change
 */
const showThemeToast = (preference: ThemePreference): void => {
  const labels: Record<ThemePreference, string> = {
    system: "🌓 System (Auto)",
    light: "☀️ Light",
    dark: "🌙 Dark",
  };

  // Remove existing toast
  const existing = document.getElementById("sando-theme-toast");
  if (existing) existing.remove();

  // Create toast
  const toast = document.createElement("div");
  toast.id = "sando-theme-toast";
  toast.textContent = labels[preference];
  toast.setAttribute(
    "style",
    `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--sando-sb-content-bg, #1c1917);
    color: var(--sando-sb-text-primary, #fafaf9);
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    z-index: 99999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: opacity 0.3s ease;
    pointer-events: none;
  `,
  );

  document.body.appendChild(toast);

  // Fade out and remove
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 1500);
};

// Get current preference and palette
const currentPreference = getSavedTheme();
const palette = getPalette(currentPreference);

// Initialize theme on load
if (typeof window !== "undefined") {
  // Apply initial theme
  applyTheme(currentPreference);

  // Listen for system preference changes (only matters when preference is "system")
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const pref = getSavedTheme();
      if (pref === "system") {
        applyTheme("system");
        // Reload to update Storybook theme (CSS props handle most, but theme object needs reload)
        window.location.reload();
      }
    });

  // Keyboard shortcut: Ctrl+Shift+T to toggle theme
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "T") {
      e.preventDefault();
      const newPref = cycleTheme();
      applyTheme(newPref);
      showThemeToast(newPref);
      // Reload after a short delay to let user see the toast
      setTimeout(() => window.location.reload(), 800);
    }
  });
}

addons.setConfig({
  theme: getTheme(currentPreference),
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
