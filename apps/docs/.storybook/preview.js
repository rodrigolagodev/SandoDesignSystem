/** @type { import('@storybook/web-components').Preview } */

// Import Storybook preview global styles
import './preview-styles.css';

// Import design tokens CSS - Ingredients (primitives, always loaded)
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/color.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/space.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/font.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/border.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/elevation.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/opacity.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/animation.css';
import '../../../packages/tokens/dist/sando-tokens/css/ingredients/z-index.css';

// Import Recipes (component tokens, always loaded)
import '../../../packages/tokens/dist/sando-tokens/css/recipes/button.css';
import '../../../packages/tokens/dist/sando-tokens/css/recipes/icon.css';

// Import Flavors - Original flavor with all modes
// All modes are automatic via @media queries
import '../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor.css';
import '../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-dark.css';
import '../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-high-contrast.css';
import '../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-forced-colors.css';
import '../../../packages/tokens/dist/sando-tokens/css/flavors/original/flavor-motion-reduce.css';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff'
        },
        {
          name: 'surface-light',
          value: '#f5f5f5'
        },
        {
          name: 'dark',
          value: '#0a0a0a'
        },
        {
          name: 'surface-dark',
          value: '#171717'
        }
      ]
    },
    docs: {
      toc: true
    }
  },

  // Global toolbar items - Mode simulators for testing
  // Note: In production, modes are automatic-only via @media queries
  // These controls simulate @media queries for testing purposes
  globalTypes: {
    colorMode: {
      name: 'Color Mode',
      description: 'Simulate system color preference (testing only)',
      defaultValue: 'auto',
      toolbar: {
        title: 'Color Mode',
        icon: 'circlehollow',
        items: [
          { value: 'auto', icon: 'circlehollow', title: 'Auto (System Preference)' },
          { value: 'light', icon: 'sun', title: 'Simulate Light Mode' },
          { value: 'dark', icon: 'moon', title: 'Simulate Dark Mode' },
          { value: 'high-contrast', icon: 'contrast', title: 'Simulate High Contrast' }
        ],
        dynamicTitle: true
      }
    },
    motionMode: {
      name: 'Motion Mode',
      description: 'Simulate motion preference (testing only)',
      defaultValue: 'auto',
      toolbar: {
        title: 'Motion',
        icon: 'play',
        items: [
          { value: 'auto', icon: 'play', title: 'Auto (System Preference)' },
          { value: 'reduce', icon: 'stop', title: 'Simulate Reduced Motion' }
        ],
        dynamicTitle: true
      }
    }
  },

  // Decorators - Simulate @media queries for testing
  // NOTE: In production, modes are automatic-only via @media queries
  // This decorator simulates different @media states for testing purposes
  decorators: [
    (story, context) => {
      const colorMode = context.globals.colorMode || 'auto';
      const motionMode = context.globals.motionMode || 'auto';

      // Simulate color modes by injecting CSS that overrides @media queries
      // This is ONLY for Storybook testing - production uses real @media queries
      const colorModeStyleId = 'storybook-color-mode-simulator';
      let colorModeStyleEl = document.getElementById(colorModeStyleId);
      if (!colorModeStyleEl) {
        colorModeStyleEl = document.createElement('style');
        colorModeStyleEl.id = colorModeStyleId;
        document.head.appendChild(colorModeStyleEl);
      }

      if (colorMode === 'auto') {
        // Remove simulation - use real @media queries
        colorModeStyleEl.textContent = '';
      } else {
        // Simulate the selected mode by forcing its tokens
        // This mimics what the @media query would do
        const modeFile = colorMode === 'light' ? 'flavor' : `flavor-${colorMode}`;
        colorModeStyleEl.textContent = `
          /* Storybook: Simulating ${colorMode} mode */
          @media not all {
            /* Disable automatic @media detection */
            @media (prefers-color-scheme: dark) { :root { display: none; } }
            @media (prefers-contrast: more) { :root { display: none; } }
          }
        `;
      }

      // Simulate motion mode
      const motionStyleId = 'storybook-motion-reduce';
      let motionStyleEl = document.getElementById(motionStyleId);
      if (!motionStyleEl) {
        motionStyleEl = document.createElement('style');
        motionStyleEl.id = motionStyleId;
        document.head.appendChild(motionStyleEl);
      }

      if (motionMode === 'reduce') {
        motionStyleEl.textContent = `
          /* Storybook: Simulating reduced motion */
          * {
            animation-duration: 0ms !important;
            transition-duration: 0ms !important;
          }
        `;
      } else {
        motionStyleEl.textContent = '';
      }

      // Update background and color based on active color mode
      let effectiveColorMode = colorMode;
      if (colorMode === 'auto') {
        // Detect system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          effectiveColorMode = 'dark';
        } else if (window.matchMedia('(prefers-contrast: more)').matches) {
          effectiveColorMode = 'high-contrast';
        } else {
          effectiveColorMode = 'light';
        }
      }

      // Apply background and text color based on effective mode
      if (effectiveColorMode === 'dark') {
        document.documentElement.style.backgroundColor = 'var(--sando-color-background-base, #0a0a0a)';
        document.documentElement.style.color = 'var(--sando-color-text-body, #e5e5e5)';
      } else if (effectiveColorMode === 'high-contrast') {
        document.documentElement.style.backgroundColor = 'var(--sando-color-background-base, #ffffff)';
        document.documentElement.style.color = 'var(--sando-color-text-body, #000000)';
      } else {
        // light mode
        document.documentElement.style.backgroundColor = 'var(--sando-color-background-base, #ffffff)';
        document.documentElement.style.color = 'var(--sando-color-text-body, #1f2937)';
      }

      return story();
    }
  ]
};

export default preview;
