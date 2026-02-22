/**
 * Sando Design System Storybook Preview Configuration
 *
 * Configuration decisions:
 * - YES global flavor switcher - uses globalTypes + custom decorator with data-flavor attribute
 * - YES color mode switcher - uses storybook-dark-mode addon
 * - MDX docs always use light mode for readability
 *
 * Architecture: storybook-dark-mode addon
 * =======================================
 * The addon provides a toggle button in the toolbar that controls BOTH:
 * - Manager UI (sidebar, toolbar) → via addon's built-in theme switching
 * - Preview Canvas (components) → via DARK_MODE_EVENT_NAME event
 *
 * Our token system uses [data-color-mode="dark/light"] selectors, so we
 * listen for the addon's event and set the attribute accordingly.
 *
 * Flavor Switcher Implementation:
 * We use globalTypes with a custom decorator that wraps stories in a div with data-flavor.
 * The "original" flavor uses :root styles (no wrapper), while other flavors use a wrapper
 * div with [data-flavor="name"] to ensure the CSS selector hierarchy works correctly:
 *   :root[data-color-mode="dark"] [data-flavor="strawberry"] { ... }
 *
 * @type { import('@storybook/web-components').Preview }
 */

import { html } from "lit";
import { addons } from "@storybook/preview-api";
import { DOCS_RENDERED, GLOBALS_UPDATED } from "@storybook/core-events";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import mermaid from "mermaid";

/**
 * Mermaid Theme Configuration
 *
 * We define separate theme configurations for light and dark modes.
 * Colors are designed to:
 * - Meet WCAG AA contrast requirements (4.5:1 for text)
 * - Maintain Sando brand feel (warm tones, orange accents)
 * - Provide clear visual hierarchy
 *
 * Theme colors reference Sando's neutralWarm and brand palettes.
 */
const mermaidThemes = {
  light: {
    // Node backgrounds - light, warm tones
    primaryColor: "#fef3e2", // Warm cream (orange-50 equivalent)
    primaryTextColor: "#1c1917", // neutralWarm-950 - high contrast text
    primaryBorderColor: "#ea580c", // orange-600 - stronger border for contrast

    secondaryColor: "#dcfce7", // Light green
    secondaryTextColor: "#14532d", // green-900 - high contrast
    secondaryBorderColor: "#16a34a", // green-600

    tertiaryColor: "#fef9c3", // Light yellow
    tertiaryTextColor: "#713f12", // yellow-900 - high contrast
    tertiaryBorderColor: "#ca8a04", // yellow-600

    // Lines and connectors
    lineColor: "#57534e", // neutralWarm-600 - good contrast on light

    // General text
    textColor: "#1c1917", // neutralWarm-950

    // Note/label backgrounds
    noteBkgColor: "#f5f5f4", // neutralWarm-100
    noteTextColor: "#292524", // neutralWarm-800
    noteBorderColor: "#d6d3d1", // neutralWarm-300

    // Actor/participant styling (sequence diagrams)
    actorBkg: "#fed7aa", // orange-200
    actorTextColor: "#1c1917", // neutralWarm-950
    actorBorder: "#ea580c", // orange-600
    actorLineColor: "#78716c", // neutralWarm-500

    // Signal/message lines
    signalColor: "#57534e", // neutralWarm-600
    signalTextColor: "#1c1917", // neutralWarm-950

    // Labels
    labelBoxBkgColor: "#fef3e2", // orange-50
    labelBoxBorderColor: "#ea580c", // orange-600
    labelTextColor: "#1c1917", // neutralWarm-950

    // Flowchart specific
    edgeLabelBackground: "#ffffff",
    clusterBkg: "#f5f5f4", // neutralWarm-100
    clusterBorder: "#a8a29e", // neutralWarm-400
    titleColor: "#1c1917", // neutralWarm-950 - cluster/subgraph titles

    // State diagram
    fillType0: "#fef3e2",
    fillType1: "#dcfce7",
    fillType2: "#fef9c3",
  },
  dark: {
    // Node backgrounds - dark, muted tones
    primaryColor: "#431407", // orange-950 - dark orange
    primaryTextColor: "#fafaf9", // neutralWarm-50 - light text
    primaryBorderColor: "#f97316", // orange-500 - visible border

    secondaryColor: "#052e16", // green-950
    secondaryTextColor: "#f0fdf4", // green-50
    secondaryBorderColor: "#22c55e", // green-500

    tertiaryColor: "#422006", // yellow-950
    tertiaryTextColor: "#fefce8", // yellow-50
    tertiaryBorderColor: "#eab308", // yellow-500

    // Lines and connectors
    lineColor: "#a8a29e", // neutralWarm-400 - visible on dark

    // General text
    textColor: "#fafaf9", // neutralWarm-50

    // Note/label backgrounds
    noteBkgColor: "#292524", // neutralWarm-800
    noteTextColor: "#e7e5e4", // neutralWarm-200
    noteBorderColor: "#57534e", // neutralWarm-600

    // Actor/participant styling (sequence diagrams)
    actorBkg: "#7c2d12", // orange-900
    actorTextColor: "#fafaf9", // neutralWarm-50
    actorBorder: "#f97316", // orange-500
    actorLineColor: "#a8a29e", // neutralWarm-400

    // Signal/message lines
    signalColor: "#a8a29e", // neutralWarm-400
    signalTextColor: "#fafaf9", // neutralWarm-50

    // Labels
    labelBoxBkgColor: "#431407", // orange-950
    labelBoxBorderColor: "#f97316", // orange-500
    labelTextColor: "#fafaf9", // neutralWarm-50

    // Flowchart specific
    edgeLabelBackground: "#1c1917", // neutralWarm-900
    clusterBkg: "#292524", // neutralWarm-800
    clusterBorder: "#57534e", // neutralWarm-600
    titleColor: "#fafaf9", // neutralWarm-50 - cluster/subgraph titles

    // State diagram
    fillType0: "#431407",
    fillType1: "#052e16",
    fillType2: "#422006",
  },
};

/**
 * Initialize Mermaid with theme-appropriate colors
 * @param {boolean} isDark - Whether dark mode is active
 */
const initializeMermaid = (isDark = false) => {
  const theme = isDark ? mermaidThemes.dark : mermaidThemes.light;

  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    themeVariables: theme,
    securityLevel: "loose",
    fontFamily: "DM Sans, system-ui, sans-serif",
  });
};

// Initialize with light mode by default
initializeMermaid(false);

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

// Sando (Brand identity - Warm Precision with Kohaku amber accents)
import "../../../packages/tokens/dist/sando-tokens/css/flavors/sando/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/sando/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/sando/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/sando/flavor-motion-reduce.css";

// Brutalist (Japanese brutalist - pure neutrals with red accent)
import "../../../packages/tokens/dist/sando-tokens/css/flavors/brutalist/flavor.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/brutalist/flavor-dark.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/brutalist/flavor-high-contrast.css";
import "../../../packages/tokens/dist/sando-tokens/css/flavors/brutalist/flavor-motion-reduce.css";

// Import Washi paper texture for Sando flavor
import "../../../packages/tokens/src/css/washi-texture.css";

// Import Storybook preview global styles LAST
// All token overrides come from generated CSS, this file only contains
// Storybook-specific layout and MDX documentation styles
import "./preview-styles.css";

// Import Sando themes for dark mode addon
import { sandoLightTheme, sandoDarkTheme } from "./themes";

// Get the channel to listen for dark mode events
const channel = addons.getChannel();

// Track if we've set up the listener (to avoid duplicates on HMR)
let darkModeListenerSetup = false;

// Track current dark mode state for Mermaid re-rendering
let currentIsDark = false;

/**
 * Set up dark mode listener for data-color-mode attribute
 * This syncs the addon's toggle with our token system AND updates Mermaid diagrams
 */
const setupDarkModeListener = () => {
  if (darkModeListenerSetup) return;
  darkModeListenerSetup = true;

  channel.on(DARK_MODE_EVENT_NAME, (isDark) => {
    const colorMode = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-color-mode", colorMode);

    // Only re-render Mermaid diagrams if mode actually changed
    if (currentIsDark !== isDark) {
      currentIsDark = isDark;

      // Re-initialize Mermaid with new theme colors
      initializeMermaid(isDark);

      // Re-render all existing Mermaid diagrams with new colors
      reRenderMermaidDiagrams();
    }
  });
};

// Set up listener immediately
setupDarkModeListener();

/**
 * Apply default flavor immediately on load
 * This ensures sando tokens are applied even before any story renders,
 * which is important for MDX docs pages that don't trigger decorators.
 */
const DEFAULT_FLAVOR = "sando";
if (typeof document !== "undefined") {
  document.documentElement.setAttribute("data-flavor", DEFAULT_FLAVOR);
}

/**
 * Listen for flavor changes from toolbar
 * When user changes the flavor via toolbar dropdown, update the document attribute.
 * This complements the decorator (which only runs for stories, not MDX docs).
 */
let flavorListenerSetup = false;
const setupFlavorListener = () => {
  if (flavorListenerSetup) return;
  flavorListenerSetup = true;

  channel.on(GLOBALS_UPDATED, ({ globals }) => {
    if (globals?.flavor !== undefined) {
      const flavor = globals.flavor;
      if (flavor === "original") {
        document.documentElement.removeAttribute("data-flavor");
      } else {
        document.documentElement.setAttribute("data-flavor", flavor);
      }
    }
  });
};

// Set up flavor listener immediately
setupFlavorListener();

/**
 * Render Mermaid diagrams in the page
 * Storybook renders ```mermaid code blocks as <div class="language-mermaid">
 * We find these and render them with Mermaid.js
 *
 * This implementation handles:
 * 1. Initial page load (docs already rendered)
 * 2. SPA navigation (DOCS_RENDERED event)
 * 3. Dynamic content changes (MutationObserver as fallback)
 */
const renderMermaidDiagrams = async () => {
  try {
    // Find all mermaid code blocks (Storybook MDX format)
    // Check both in main document and inside Storybook's docs container
    const codeBlocks = document.querySelectorAll(".language-mermaid");

    if (codeBlocks.length === 0) return;

    // Process each code block
    const renderPromises = Array.from(codeBlocks).map(async (codeBlock) => {
      // Skip if already processed
      if (codeBlock.dataset.mermaidProcessed === "true") return;

      // Get the diagram definition
      const diagramDef = codeBlock.textContent?.trim();
      if (!diagramDef) return;

      // Mark as processed immediately to prevent duplicate processing
      codeBlock.dataset.mermaidProcessed = "true";

      // Determine background color based on current color mode
      const isDark =
        document.documentElement.getAttribute("data-color-mode") === "dark";
      const bgColor = isDark ? "#0F0F0F" : "#FAF9F6";

      // Create a container for the rendered diagram
      const container = document.createElement("div");
      container.className = "mermaid-diagram";
      container.style.cssText = `display: flex; justify-content: center; padding: 1.5rem; background: ${bgColor}; border-radius: 0.5rem; margin: 1rem 0; overflow: auto;`;

      // Store the original diagram definition for re-rendering on theme change
      container.dataset.mermaidDef = diagramDef;

      // Generate unique ID (must be alphanumeric, start with letter)
      const id = `mermaid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      try {
        // Render the diagram
        const { svg } = await mermaid.render(id, diagramDef);
        container.innerHTML = svg;

        // Replace the pre>code structure with the rendered diagram
        const preElement = codeBlock.closest("pre");
        if (preElement && preElement.parentNode) {
          preElement.parentNode.replaceChild(container, preElement);
        } else if (codeBlock.parentNode) {
          codeBlock.parentNode.replaceChild(container, codeBlock);
        }
      } catch (renderError) {
        console.warn("Mermaid render error for diagram:", renderError);
        // Show error inline
        container.innerHTML = `<div style="color: #dc2626; padding: 1rem; background: #fef2f2; border-radius: 0.25rem; font-family: monospace; font-size: 0.875rem;">
          <strong>Diagram Error:</strong> ${renderError.message || "Failed to render"}
          <pre style="margin-top: 0.5rem; white-space: pre-wrap;">${diagramDef.substring(0, 200)}...</pre>
        </div>`;
        const preElement = codeBlock.closest("pre");
        if (preElement && preElement.parentNode) {
          preElement.parentNode.insertBefore(container, preElement);
        }
      }
    });

    // Wait for all diagrams to render
    await Promise.all(renderPromises);
  } catch (error) {
    console.warn("Mermaid rendering error:", error);
  }
};

/**
 * Re-render all existing Mermaid diagrams (for theme changes)
 *
 * When dark mode is toggled, we need to re-render all diagrams with new colors.
 * This function finds all rendered diagrams, extracts their original definition
 * (stored as data attribute), and re-renders them.
 */
const reRenderMermaidDiagrams = async () => {
  try {
    // Find all rendered mermaid diagrams
    const renderedDiagrams = document.querySelectorAll(".mermaid-diagram");

    if (renderedDiagrams.length === 0) return;

    // Determine current color mode for background
    const isDark =
      document.documentElement.getAttribute("data-color-mode") === "dark";
    const bgColor = isDark ? "#0F0F0F" : "#FAF9F6";

    // Process each rendered diagram
    const reRenderPromises = Array.from(renderedDiagrams).map(
      async (container) => {
        // Get the original diagram definition stored as data attribute
        const diagramDef = container.dataset.mermaidDef;
        if (!diagramDef) return;

        // Update container background for the current mode
        container.style.background = bgColor;

        // Generate new unique ID
        const id = `mermaid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        try {
          // Re-render with new theme
          const { svg } = await mermaid.render(id, diagramDef);
          container.innerHTML = svg;
        } catch (renderError) {
          console.warn("Mermaid re-render error:", renderError);
          // Keep the existing SVG rather than showing an error
        }
      },
    );

    await Promise.all(reRenderPromises);
  } catch (error) {
    console.warn("Mermaid re-rendering error:", error);
  }
};

/**
 * Debounced render function to avoid excessive calls
 */
let renderTimeout = null;
const debouncedRenderMermaid = (delay = 50) => {
  if (renderTimeout) clearTimeout(renderTimeout);
  renderTimeout = setTimeout(() => {
    renderMermaidDiagrams();
  }, delay);
};

/**
 * Polling mechanism for cases where events don't fire reliably
 * Stops once all diagrams on the page are processed
 */
let pollCount = 0;
const MAX_POLLS = 20;
const pollForMermaid = () => {
  pollCount++;
  const unprocessed = document.querySelectorAll(
    ".language-mermaid:not([data-mermaid-processed='true'])",
  );

  if (unprocessed.length > 0) {
    renderMermaidDiagrams();
  }

  // Continue polling for a bit to catch late-rendered content
  if (pollCount < MAX_POLLS) {
    requestAnimationFrame(() => {
      setTimeout(pollForMermaid, 100 * pollCount); // Increasing delay
    });
  }
};

/**
 * Set up Mermaid rendering with multiple trigger mechanisms
 * This ensures diagrams render regardless of how content is loaded
 */
if (typeof window !== "undefined") {
  // 1. Listen to Storybook's DOCS_RENDERED event (most reliable for SPA navigation)
  try {
    channel.on(DOCS_RENDERED, () => {
      // Reset poll count for new page
      pollCount = 0;
      // Use requestAnimationFrame to ensure DOM is painted
      requestAnimationFrame(() => {
        debouncedRenderMermaid(50);
        // Also start polling as fallback
        setTimeout(pollForMermaid, 200);
      });
    });
  } catch (e) {
    // Channel might not be ready in some edge cases
    console.warn("Could not attach DOCS_RENDERED listener:", e);
  }

  // 2. MutationObserver for dynamic content changes
  const observer = new MutationObserver((mutations) => {
    // Check if any mutation added mermaid code blocks or their parent elements
    let shouldRender = false;

    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== 1) continue;

        // Check if the added node is or contains mermaid code
        if (
          node.matches?.(".language-mermaid") ||
          node.matches?.("pre") ||
          node.querySelector?.(".language-mermaid")
        ) {
          shouldRender = true;
          break;
        }

        // Also check for Storybook's docs content containers
        if (
          node.classList?.contains("sbdocs") ||
          node.classList?.contains("sb-unstyled") ||
          node.querySelector?.(".sbdocs")
        ) {
          shouldRender = true;
          break;
        }
      }
      if (shouldRender) break;
    }

    if (shouldRender) {
      debouncedRenderMermaid(50);
    }
  });

  // 3. Start observing and do initial render when DOM is ready
  const initMermaid = () => {
    // Start observing for new content
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Initial render with delay to catch already-rendered content
    // Use requestIdleCallback if available for better performance
    if ("requestIdleCallback" in window) {
      requestIdleCallback(
        () => {
          debouncedRenderMermaid(0);
          // Start polling as extra safety net
          setTimeout(pollForMermaid, 300);
        },
        { timeout: 1000 },
      );
    } else {
      setTimeout(() => {
        debouncedRenderMermaid(0);
        // Start polling as extra safety net
        setTimeout(pollForMermaid, 300);
      }, 200);
    }
  };

  if (document.body) {
    initMermaid();
  } else {
    document.addEventListener("DOMContentLoaded", initMermaid);
  }
}

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

    // storybook-dark-mode configuration
    darkMode: {
      // Use our custom Sando themes for Manager UI
      dark: sandoDarkTheme,
      light: sandoLightTheme,
      // Initial theme (follows system preference by default)
      // current: 'light', // Uncomment to force a default
      // Apply classes to preview iframe (we use data attribute instead via decorator)
      stylePreview: true,
      classTarget: "html",
      darkClass: "dark",
      lightClass: "light",
    },

    // Story ordering configuration
    // Matches simplified structure: Welcome → Ingredients → Flavors → Components
    options: {
      storySort: {
        order: [
          "Welcome",
          "Ingredients",
          [
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
          ["Color Roles", "Spacing Roles", "Typography Roles"],
          "Components",
          ["Status", "Button", "Input", "Icon", "Form Group", "*"],
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
    // Flavor is controlled via toolbar, hide from Controls panel
    flavor: { table: { disable: true } },
  },

  /**
   * Global Types - Flavor switcher in toolbar
   *
   * Flavor: Creates a dropdown to switch between flavor themes.
   * Note: Color mode is now handled by storybook-dark-mode addon's toggle button.
   */
  globalTypes: {
    flavor: {
      name: "Flavor",
      description: "Design system flavor/theme",
      toolbar: {
        // No icon - emoji in title is sufficient
        title: "Flavor:",
        items: [
          { value: "sando", title: "Sando", right: "Warm Precision + Washi" },
          { value: "brutalist", title: "Brutalist", right: "Japanese Minimal" },
          { value: "original", title: "Original", right: "Neutral" },
          { value: "strawberry", title: "Strawberry", right: "Red tones" },
          { value: "tonkatsu", title: "Tonkatsu", right: "Brown tones" },
          { value: "kiwi", title: "Kiwi", right: "Green tones" },
          { value: "egg-salad", title: "Egg Salad", right: "Yellow tones" },
        ],
        dynamicTitle: true,
      },
    },
  },

  /**
   * Decorators - Flavor switcher only
   *
   * Flavor Switcher:
   * - "sando": Warm Precision + Washi (data-flavor="sando") - DEFAULT
   * - "brutalist": Japanese Minimal (data-flavor="brutalist")
   * - "original": Neutral tones (no data-flavor attribute, uses :root styles)
   * - "strawberry": Red tones (data-flavor="strawberry")
   * - "tonkatsu": Brown tones (data-flavor="tonkatsu")
   * - "kiwi": Green tones (data-flavor="kiwi")
   * - "egg-salad": Yellow tones (data-flavor="egg-salad")
   *
   * Color Mode:
   * Now handled by storybook-dark-mode addon via DARK_MODE_EVENT_NAME
   * The listener sets data-color-mode attribute on html element
   *
   * Flavor Architecture:
   * The decorator applies data-flavor directly to document.documentElement (html)
   * so flavor tokens override :root defaults throughout the entire document.
   * - "original" flavor: no data-flavor attribute (uses :root defaults)
   * - Other flavors: data-flavor="<flavor>" on html element
   */
  decorators: [
    // Flavor switcher - applies data-flavor to document root
    (storyFn, context) => {
      const flavor = context.globals.flavor || "sando";

      // Apply flavor to document root so it affects everything
      if (flavor === "original") {
        document.documentElement.removeAttribute("data-flavor");
      } else {
        document.documentElement.setAttribute("data-flavor", flavor);
      }

      return storyFn();
    },
  ],

  /**
   * Initial global values
   */
  initialGlobals: {
    // Flavor switcher default - Sando (Warm Precision + Washi)
    flavor: "sando",
  },
};

export default preview;
